import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/content';

export function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="section-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/10]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-900/90 via-warm-900/40 to-warm-900/20 transition-opacity group-hover:from-warm-900/95" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  {category.title}
                </h3>
                <span className="mt-2 flex items-center gap-2 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Explorar
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
