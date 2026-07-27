import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function BookingCancelPage() {
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
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
            >
              <XCircle className="h-10 w-10 text-red-500" />
            </motion.div>

            <h1 className="font-display text-3xl font-bold text-warm-900">
              Reserva cancelada
            </h1>

            <p className="mt-4 text-lg text-warm-600">
              El pago no se completó o fue cancelado. No se realizaron
              cargos en tu tarjeta y la reserva no fue confirmada.
            </p>

            <div className="mt-8 rounded-xl bg-warm-100 p-4">
              <p className="text-sm text-warm-600">
                Si tuviste problemas con el pago, podés intentar nuevamente
                o contactarnos por WhatsApp para ayudarte.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button to="/" size="lg">
                Volver a explorar tours
              </Button>
              <Button
                href="https://wa.me/5492615551234"
                external
                variant="outline"
                size="lg"
              >
                Contactar por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
