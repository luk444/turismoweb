import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { hotels, WHATSAPP_URL } from '../../data/content';

export function Hotels() {
  return (
    <section id="hoteles" className="bg-warm-100 py-16 lg:py-24">
      <div className="section-container">
        <SectionHeader
          title="Hoteles seleccionados por expertos locales"
          subtitle="Alojamientos premium verificados por nuestro equipo para complementar tu experiencia en Mendoza."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, index) => (
            <motion.article
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <StarRating rating={hotel.stars} />
                <h3 className="mt-3 font-display text-lg font-semibold text-warm-900">
                  {hotel.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-warm-500">
                  <MapPin className="h-4 w-4 text-brand" />
                  {hotel.location}
                </p>
                <div className="mt-5">
                  <Button
                    href={`${WHATSAPP_URL}?text=Consulta%20disponibilidad%20${encodeURIComponent(hotel.name)}`}
                    external
                    variant="secondary"
                    size="md"
                    className="w-full"
                  >
                    Consultar disponibilidad
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
