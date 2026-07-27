/* eslint-disable */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

admin.initializeApp();
const db = admin.firestore();

/*
 * ─────────────────────────────────────────────────────────
 * CONFIGURACIÓN DE MERCADOPAGO
 *
 * La ACCESS TOKEN debe configurarse como variable de entorno
 * en Firebase Functions:
 *
 *   firebase functions:config mp.access_token="TU_ACCESS_TOKEN"
 *   firebase functions:config mp.public_key="TU_PUBLIC_KEY"
 *
 * Para testing usá las credenciales de TEST de MercadoPago.
 * ─────────────────────────────────────────────────────────
 */

const mpAccessToken =
  functions.config().mp?.access_token ||
  process.env.MP_ACCESS_TOKEN ||
  '';

const mpPublicKey =
  functions.config().mp?.public_key ||
  process.env.MP_PUBLIC_KEY ||
  '';

const client = new MercadoPagoConfig({
  accessToken: mpAccessToken,
  options: { timeout: 5000, retry: 3 },
});

const preference = new Preference(client);
const payment = new Payment(client);

/*
 * ─────────────────────────────────────────────────────────
 * FUNCIÓN: createPaymentPreference
 *
 * Llamada desde el frontend para crear una preferencia de
 * pago en MercadoPago. Crea previamente una reserva en
 * estado "pending" y devuelve el init_point para redirigir
 * al checkout de MercadoPago.
 *
 * Parámetros (data):
 *   - activityId: string
 *   - date: string (YYYY-MM-DD)
 *   - guests: number
 *   - totalPrice: number
 *   - userId: string
 *   - userEmail: string
 *   - userName: string
 *   - successUrl: string
 *   - cancelUrl: string
 * ─────────────────────────────────────────────────────────
 */
export const createPaymentPreference = functions.https.onCall(
  async (data, context) => {
    // Verificar autenticación
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Debés iniciar sesión para reservar',
      );
    }

    const {
      activityId,
      date,
      guests,
      totalPrice,
      userEmail,
      userName,
      successUrl,
      cancelUrl,
    } = data;

    if (!activityId || !date || !guests || !totalPrice) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Faltan datos requeridos',
      );
    }

    const userId = context.auth.uid;

    try {
      // 1. Verificar disponibilidad
      const activitySnap = await db
        .collection('activities')
        .doc(activityId)
        .get();

      if (!activitySnap.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'Actividad no encontrada',
        );
      }

      const activity = activitySnap.data()!;
      const defaultCapacity = activity.defaultCapacity ?? 20;

      // Obtener capacidad del día
      const capId = `${activityId}_${date}`;
      const capSnap = await db
        .collection('dailyCapacities')
        .doc(capId)
        .get();

      const capacity = capSnap.exists
        ? capSnap.data()!.capacity
        : defaultCapacity;

      // Contar reservas existentes
      const bookingsSnap = await db
        .collection('bookings')
        .where('activityId', '==', activityId)
        .where('date', '==', date)
        .where('status', 'in', ['pending', 'paid'])
        .get();

      let bookedGuests = 0;
      bookingsSnap.forEach((doc) => {
        bookedGuests += doc.data().guests;
      });

      if (capacity - bookedGuests < guests) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          `No hay cupo disponible. Quedan ${Math.max(0, capacity - bookedGuests)} lugares.`,
        );
      }

      // 2. Crear reserva en estado "pending"
      const bookingRef = db.collection('bookings').doc();
      const booking = {
        id: bookingRef.id,
        activityId,
        userId,
        userEmail,
        userName,
        date,
        guests,
        totalPrice,
        status: 'pending',
        paymentId: null,
        paymentStatus: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await bookingRef.set(booking);

      // 3. Crear preferencia de pago en MercadoPago
      const mpPreference = {
        items: [
          {
            id: activityId,
            title: activity.title,
            description: activity.shortDescription,
            quantity: guests,
            unit_price: totalPrice / guests,
            currency_id: 'ARS',
            picture_url: activity.image,
          },
        ],
        payer: {
          email: userEmail,
          name: userName,
        },
        back_urls: {
          success: successUrl,
          failure: cancelUrl,
          pending: cancelUrl,
        },
        auto_return: 'approved',
        external_reference: bookingRef.id, // ID de la reserva
        metadata: {
          bookingId: bookingRef.id,
          activityId,
          date,
          guests,
        },
        statement_descriptor: 'Mendoza Experience',
      };

      const result = await preference.create({
        body: mpPreference,
      });

      return {
        bookingId: bookingRef.id,
        initPoint: result.init_point,
        preferenceId: result.id,
      };
    } catch (error: any) {
      if (error instanceof functions.https.HttpsError) {
        throw error;
      }
      console.error('Error creando preferencia de pago:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Error al crear la preferencia de pago',
      );
    }
  },
);

/*
 * ─────────────────────────────────────────────────────────
 * FUNCIÓN: mercadopagoWebhook
 *
 * Webhook de MercadoPago que se ejecuta cuando el pago
 * cambia de estado. Busca la reserva por external_reference
 * y actualiza su estado.
 *
 * URL: https://us-central1-TU_PROYECTO.cloudfunctions.net/mercadopagoWebhook
 * ─────────────────────────────────────────────────────────
 */
export const mercadopagoWebhook = functions.https.onRequest(
  async (req, res) => {
    try {
      const body = req.body;

      // MercadoPago envía el evento
      if (body.type === 'payment') {
        const paymentId = body.data?.id;

        if (paymentId) {
          // Obtener detalles del pago
          const paymentData = await payment.get({ id: paymentId });

          const status = paymentData.status;
          const externalReference = paymentData.external_reference;

          if (externalReference) {
            // Buscar la reserva
            const bookingRef = db
              .collection('bookings')
              .doc(externalReference);

            const bookingSnap = await bookingRef.get();

            if (bookingSnap.exists) {
              const booking = bookingSnap.data()!;

              let newStatus = 'pending';
              let paymentStatus = 'pending';

              if (status === 'approved' || status === 'authorized') {
                newStatus = 'paid';
                paymentStatus = 'approved';
              } else if (status === 'rejected' || status === 'failed') {
                newStatus = 'cancelled';
                paymentStatus = 'failed';
              } else if (status === 'cancelled') {
                newStatus = 'cancelled';
                paymentStatus = 'cancelled';
              }

              await bookingRef.update({
                status: newStatus,
                paymentId: String(paymentId),
                paymentStatus,
                updatedAt: Date.now(),
              });

              console.log(
                `Reserva ${externalReference} actualizada: ${newStatus} (payment: ${paymentStatus})`,
              );
            }
          }
        }
      }

      // Responder 200 para confirmar recepción
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error en webhook de MercadoPago:', error);
      res.status(500).json({ error: 'Error interno' });
    }
  },
);

/*
 * ─────────────────────────────────────────────────────────
 * FUNCIÓN: setAdmin
 *
 * Función helper para asignar permisos de admin a un usuario.
 * Útil para configurar el primer administrador.
 *
 * Llamada: firebase functions:call setAdmin --data '{"uid":"USER_UID"}'
 * ─────────────────────────────────────────────────────────
 */
export const setAdmin = functions.https.onCall(
  async (data, context) => {
    // Solo un admin existente puede asignar admins
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Debés ser admin',
      );
    }

    const caller = await db
      .collection('users')
      .doc(context.auth.uid)
      .get();

    if (!caller.exists || !caller.data()?.isAdmin) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Solo los administradores pueden asignar permisos de admin',
      );
    }

    const { uid } = data;

    if (!uid) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Se requiere el UID del usuario',
      );
    }

    // Actualizar claim de admin en Firebase Auth
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    // Actualizar documento en Firestore
    await db.collection('users').doc(uid).update({ isAdmin: true });

    return { success: true, uid };
  },
);

/*
 * ─────────────────────────────────────────────────────────
 * FUNCIÓN: cleanupExpiredBookings
 *
 * Tarea programada que cancela las reservas "pending" que
 * tienen más de 30 minutos sin pagar.
 *
 * Configuración: firebase functions:cron
 * Schedule: every 30 minutes
 * ─────────────────────────────────────────────────────────
 */
export const cleanupExpiredBookings = functions.pubsub
  .schedule('every 30 minutes')
  .onRun(async () => {
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;

    const snap = await db
      .collection('bookings')
      .where('status', '==', 'pending')
      .where('createdAt', '<', thirtyMinutesAgo)
      .get();

    const batch = db.batch();
    snap.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'expired',
        updatedAt: Date.now(),
      });
    });

    await batch.commit();

    console.log(`Reservas expiradas limpiadas: ${snap.size}`);
    return null;
  });
