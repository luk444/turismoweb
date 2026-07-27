import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, DollarSign, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getBooking } from '../firebase/firestore';
import type { Booking } from '../types';

export function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  // MercadoPago redirige con ?preference_id=...&payment_id=...&status=...
  // También podemos usar el query param booking_id si lo pasamos
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('payment_id') || searchParams.get('payment');
  const preferenceId = searchParams.get('preference_id');

  useEffect(() => {
    // Si tenemos un payment_id, podemos buscar la reserva
    // Por ahora, mostramos el mensaje de éxito genérico
    // El webhook de MercadoPago actualizará el estado de la reserva
    setLoading(false);
  }, [paymentId, preferenceId]);

  return (
    <div className="min-h-screen bg-warm-50 pt-20">
      <div className="section-container py-12">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-8 shadow-card text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <CheckCircle className="h-10 w-10 text-green-500" />
            </motion.div>

            <h1 className="font-display text-3xl font-bold text-warm-900">
              ¡Reserva confirmada!
            </h1>

            <p className="mt-4 text-lg text-warm-600">
              Tu pago se ha procesado correctamente. La reserva de tu actividad
              está confirmada y el cupo está reservado para ti.
            </p>

            {paymentId && (
              <div className="mt-6 rounded-xl bg-warm-100 p-4 text-left">
                <p className="mb-2 text-sm font-medium text-warm-700">
                  Detalles del pago
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-warm-400" />
                    <span className="text-warm-600">
                      ID de pago: {paymentId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-warm-400" />
                    <span className="text-warm-600">
                      Estado: Aprobado
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700">
                <Mail className="h-4 w-4 inline mr-1" />
                Recibirás un email de confirmación con los detalles de tu
                reserva y la información del tour.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button to="/" size="lg">
                Volver al inicio
              </Button>
              <Button to="/login" variant="outline" size="lg">
                Ver mis reservas
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
