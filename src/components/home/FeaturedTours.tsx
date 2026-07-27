import { motion } from 'framer-motion';
import { Clock, MapPin, Check } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { featuredTours } from '../../data/content';

export function FeaturedTours() {
  return (
    <section id="tours" className="py-16 lg:py-24">
      <div className="section-container">
        <SectionHeader
          title="Las experiencias más elegidas en Mendoza"
          subtitle="Tours seleccionados por nuestros expertos locales para que vivas lo mejor de la región."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredTours.map((tour, index) => (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-900/60 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-lg bg-brand px-3 py-1 text-sm font-bold text-warm-900">
                  {tour.priceLabel}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-warm-900">
                  {tour.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-warm-500">
                  {tour.shortDescription}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-warm-600">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-brand" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand" />
                    {tour.location}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {tour.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-warm-600"
                    >
                      <Check className="h-4 w-4 shrink-0 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    to={`/tour/${tour.slug}`}
                    variant="secondary"
                    size="md"
                    className="w-full"
                  >
                    Ver tour
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
