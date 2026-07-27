import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionHeader';
import { StarRating } from '../ui/StarRating';
import { testimonials } from '../../data/content';

export function Testimonials() {
  return (
    <section className="bg-warm-100 py-16 lg:py-24">
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader title="Opiniones de viajeros" />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white px-6 py-4 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-warm-900">4.9</span>
              <div>
                <p className="font-semibold text-warm-900">Excelente</p>
                <p className="text-sm text-warm-500">+500 opiniones</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-warm-900">{testimonial.name}</p>
                  <p className="text-xs text-warm-400">{testimonial.date}</p>
                </div>
              </div>
              <div className="mt-3">
                <StarRating rating={testimonial.rating} size="sm" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-warm-600">
                {testimonial.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
