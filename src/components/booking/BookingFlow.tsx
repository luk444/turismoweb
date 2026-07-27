import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { checkAvailability } from '../../firebase/firestore';
import {
  createPaymentPreference,
  redirectToMercadoPago,
} from '../../firebase/mercadopago';
import type { Activity } from '../../types';

interface BookingFlowProps {
  activity: Activity;
  date: string;
  guests: number;
}

export function BookingFlow({ activity, date, guests }: BookingFlowProps) {
  const { user } = useAuth();
  const [availability, setAvailability] = useState<{
    available: boolean;
    capacity: number;
    booked: number;
  } | null>(null);
  const [checking, setChecking] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = activity.price * guests;
  const formattedPrice = totalPrice.toLocaleString('es-AR');

  // Verificar disponibilidad cuando cambie la fecha o cantidad
  useEffect(() => {
    if (!date) {
      setAvailability(null);
      return;
    }

    const check = async () => {
      setChecking(true);
      setError('');
      try {
        const result = await checkAvailability(activity.id, date, guests);
        setAvailability(result);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Error al verificar disponibilidad';
        setError(msg);
        setAvailability(null);
      } finally {
        setChecking(false);
      }
    };

    check();
  }, [activity.id, date, guests]);

  const handleReserve = async () => {
    if (!user) {
      // Redirigir a login
      window.location.href = '/login';
      return;
    }

    if (!date) {
      setError('Seleccioná una fecha');
      return;
    }

    if (!availability?.available) {
      setError('No hay cupo disponible para la cantidad seleccionada');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const successUrl = `${window.location.origin}/booking/success`;
      const cancelUrl = `${window.location.origin}/booking/cancel`;

      const result = await createPaymentPreference({
        activityId: activity.id,
        date,
        guests,
        totalPrice,
        userEmail: user.email ?? '',
        userName: user.displayName ?? user.email ?? 'Usuario',
        successUrl,
        cancelUrl,
      });

      // Redirigir a MercadoPago
      redirectToMercadoPago(result.initPoint);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al procesar el pago';
      setError(msg);
    } finally {
      setProcessing(false);
    }
  };

  const availableSpots = availability ? availability.capacity - availability.booked : 0;

  return (
    <div className="space-y-4">
      {/* Estado de disponibilidad */}
      <AnimatePresence>
        {date && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-warm-200 bg-warm-50 p-4"
          >
            {checking ? (
              <div className="flex items-center gap-2 text-sm text-warm-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verificando disponibilidad...
              </div>
            ) : availability ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warm-700">
                    Cupo disponible
                  </p>
                  <p className="text-2xl font-bold text-warm-900">
                    {availableSpots} / {availability.capacity}
                  </p>
                  <p className="text-xs text-warm-500">
                    {availability.booked} reservado{availability.booked !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {availability.available ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-green-700">
                        Disponible
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium text-red-700">
                        Completo
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Total */}
      <div className="rounded-xl bg-warm-100 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-warm-600">
            {guests} persona{guests !== 1 ? 's' : ''} × ${activity.price.toLocaleString('es-AR')}
          </span>
          <span className="font-display text-2xl font-bold text-warm-900">
            ${formattedPrice}
          </span>
        </div>
      </div>

      {/* Botón de reserva */}
      <Button
        onClick={handleReserve}
        disabled={processing || !date || !availability?.available || checking}
        size="lg"
        className="w-full"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Procesando pago...
          </>
        ) : !user ? (
          'Iniciá sesión para reservar'
        ) : !date ? (
          'Seleccioná una fecha'
        ) : !availability?.available ? (
          'Sin cupo disponible'
        ) : (
          'Reservar y pagar con MercadoPago'
        )}
      </Button>

      {/* Nota informativa */}
      <p className="text-center text-xs text-warm-400">
        Al reservar, serás redirigido a MercadoPago para completar el pago.
        La reserva se confirma automáticamente al procesarse el pago.
      </p>
    </div>
  );
}
