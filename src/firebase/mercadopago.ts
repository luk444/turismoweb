import { getFunctions, httpsCallable } from 'firebase/functions';
import { functions } from './config';

export interface CreatePreferenceParams {
  activityId: string;
  date: string;
  guests: number;
  totalPrice: number;
  userEmail: string;
  userName: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePreferenceResult {
  bookingId: string;
  initPoint: string;
  preferenceId: string;
}

/**
 * Llama a la función de Firebase para crear una preferencia
 * de pago en MercadoPago.
 *
 * La función verifica disponibilidad, crea una reserva en
 * estado "pending" y devuelve el init_point para redirigir
 * al checkout de MercadoPago.
 */
export async function createPaymentPreference(
  params: CreatePreferenceParams,
): Promise<CreatePreferenceResult> {
  const createPreference = httpsCallable(functions, 'createPaymentPreference');
  const result = await createPreference(params);
  return result.data as CreatePreferenceResult;
}

/**
 * Redirige al usuario al checkout de MercadoPago.
 * Se usa después de crear la preferencia.
 */
export function redirectToMercadoPago(initPoint: string): void {
  window.location.href = initPoint;
}
