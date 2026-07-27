import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import type { Activity, DailyCapacity, Booking } from '../types';

/* ────────────────────────────
   ACTIVIDADES
   ──────────────────────────── */

const activitiesCol = () => collection(db, 'activities');

/** Obtener todas las actividades activas */
export async function getActivities(): Promise<Activity[]> {
  const q = query(
    activitiesCol(),
    where('active', '==', true),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Activity, 'id'>) }));
}

/** Obtener una actividad por slug */
export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const q = query(activitiesCol(), where('slug', '==', slug), where('active', '==', true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Omit<Activity, 'id'>) };
}

/** Obtener una actividad por ID */
export async function getActivity(id: string): Promise<Activity | null> {
  const d = await getDoc(doc(db, 'activities', id));
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as Omit<Activity, 'id'>) };
}

/** Crear o actualizar una actividad (admin) */
export async function saveActivity(activity: Omit<Activity, 'id'> & { id?: string }): Promise<string> {
  const id = activity.id ?? doc(collection(db, 'activities')).id;
  const ref = doc(db, 'activities', id);
  const now = Date.now();
  const data = {
    ...activity,
    id,
    createdAt: activity.createdAt ?? now,
    updatedAt: now,
  };
  await setDoc(ref, data, { merge: true });
  return id;
}

/** Eliminar una actividad (admin) */
export async function deleteActivity(id: string): Promise<void> {
  await deleteDoc(doc(db, 'activities', id));
  // También eliminar capacidades asociadas
  const caps = await getCapacitiesForActivity(id);
  for (const cap of caps) {
    await deleteDoc(doc(db, 'dailyCapacities', cap.id));
  }
}

/* ────────────────────────────
   CAPACIDADES DIARIAS
   ──────────────────────────── */

const capacitiesCol = () => collection(db, 'dailyCapacities');

/** Obtener la capacidad para una actividad en una fecha específica */
export async function getCapacity(
  activityId: string,
  date: string,
): Promise<DailyCapacity | null> {
  const id = `${activityId}_${date}`;
  const d = await getDoc(doc(db, 'dailyCapacities', id));
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as Omit<DailyCapacity, 'id'>) };
}

/** Obtener todas las capacidades de una actividad */
export async function getCapacitiesForActivity(activityId: string): Promise<DailyCapacity[]> {
  const q = query(capacitiesCol(), where('activityId', '==', activityId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<DailyCapacity, 'id'>) }));
}

/** Establecer la capacidad para una actividad en una fecha */
export async function setCapacity(
  activityId: string,
  date: string,
  capacity: number,
): Promise<void> {
  const id = `${activityId}_${date}`;
  const ref = doc(db, 'dailyCapacities', id);
  await setDoc(
    ref,
    {
      id,
      activityId,
      date,
      capacity,
    },
    { merge: true },
  );
}

/* ────────────────────────────
   RESERVAS / BOOKINGS
   ──────────────────────────── */

const bookingsCol = () => collection(db, 'bookings');

/** Crear una reserva (estado pending) */
export async function createBooking(booking: Omit<Booking, 'id'>): Promise<string> {
  const id = doc(collection(db, 'bookings')).id;
  const ref = doc(db, 'bookings', id);
  await setDoc(ref, { ...booking, id });
  return id;
}

/** Obtener reservas de un usuario */
export async function getUserBookings(userId: string): Promise<Booking[]> {
  const q = query(
    bookingsCol(),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
}

/** Obtener una reserva por ID */
export async function getBooking(id: string): Promise<Booking | null> {
  const d = await getDoc(doc(db, 'bookings', id));
  if (!d.exists()) return null;
  return { id: d.id, ...(d.data() as Omit<Booking, 'id'>) };
}

/** Actualizar el estado de una reserva */
export async function updateBookingStatus(
  id: string,
  status: Booking['status'],
  paymentId?: string | null,
  paymentStatus?: Booking['paymentStatus'],
): Promise<void> {
  const ref = doc(db, 'bookings', id);
  const data: Record<string, unknown> = {
    status,
    updatedAt: Date.now(),
  };
  if (paymentId !== undefined) data.paymentId = paymentId;
  if (paymentStatus !== undefined) data.paymentStatus = paymentStatus;
  await updateDoc(ref, data as any);
}

/** Contar cuántas personas están reservadas para una actividad en una fecha */
export async function getBookedGuests(
  activityId: string,
  date: string,
): Promise<number> {
  const q = query(
    bookingsCol(),
    where('activityId', '==', activityId),
    where('date', '==', date),
    where('status', 'in', ['pending', 'paid']),
  );
  const snap = await getDocs(q);
  let total = 0;
  snap.forEach((d) => {
    total += (d.data() as Booking).guests;
  });
  return total;
}

/** Obtener todas las reservas (admin) */
export async function getAllBookings(): Promise<Booking[]> {
  const q = query(bookingsCol(), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Booking, 'id'>) }));
}

/* ────────────────────────────
   VERIFICACIÓN DE DISPONIBILIDAD
   ──────────────────────────── */

/**
 * Verifica si hay cupo disponible para una actividad en una fecha.
 * Devuelve { available, capacity, booked }
 */
export async function checkAvailability(
  activityId: string,
  date: string,
  guests: number,
): Promise<{ available: boolean; capacity: number; booked: number }> {
  const activity = await getActivity(activityId);
  const defaultCapacity = activity?.defaultCapacity ?? 20;

  const cap = await getCapacity(activityId, date);
  const capacity = cap?.capacity ?? defaultCapacity;

  const booked = await getBookedGuests(activityId, date);
  const available = capacity - booked >= guests;

  return { available, capacity, booked };
}
