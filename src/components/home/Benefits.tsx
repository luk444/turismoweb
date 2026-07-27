import { motion } from 'framer-motion';
import { Mountain, MapPin, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Mountain,
    title: 'Experiencias inolvidables',
    description: 'Excursiones diseñadas para aprovechar cada momento.',
  },
  {
    icon: MapPin,
    title: 'Somos locales',
    description: 'Conocemos Mendoza y seleccionamos los mejores lugares.',
  },
  {
    icon: MessageCircle,
    title: 'Soporte personalizado',
    description: 'Te ayudamos antes, durante y después del viaje.',
  },
];

export function Benefits() {
  return (
    <section className="relative -mt-16 z-20 pb-8">
      <div className="section-container">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <benefit.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
