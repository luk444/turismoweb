import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { WHATSAPP_URL } from '../../data/content';

const ctaImage =
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80';

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0">
        <img
          src={ctaImage}
          alt="Montañas de Mendoza"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-900/75" />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            ¿Listo para conocer Mendoza?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
            Creamos tu experiencia perfecta.
          </p>
          <div className="mt-8">
            <Button
              href={`${WHATSAPP_URL}?text=Hola!%20Quiero%20armar%20mi%20viaje%20a%20Mendoza`}
              external
              size="lg"
            >
              Hablar con un asesor
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
