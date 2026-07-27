import { motion } from 'framer-motion';
import { Star, Users, Headphones } from 'lucide-react';
import { Button } from '../ui/Button';

const heroImage =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Cordillera de Los Andes y viñedos de Mendoza"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/90 via-warm-900/70 to-warm-900/40" />
      </div>

      <div className="section-container relative z-10 flex items-center py-12 lg:py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-brand text-brand" />
                <span className="text-sm font-semibold text-white">4.9</span>
              </div>
              <div className="flex text-brand">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-sm">
                    {s}
                  </span>
                ))}
              </div>
              <span className="text-xs text-white/70">Google</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Viví Mendoza como nunca antes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl"
          >
            Excursiones, vinos, aventura y experiencias únicas diseñadas por
            expertos locales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="#tours" size="lg">
              Explorar tours
            </Button>
            <Button href="#buscador" variant="outline" size="lg">
              Armá tu viaje
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            <Stat icon={<Users className="h-5 w-5 text-brand" />} text="+1000 viajeros felices" />
            <Stat
              icon={<Headphones className="h-5 w-5 text-brand" />}
              text="Atención personalizada"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
        {icon}
      </div>
      <span className="text-sm font-medium text-white/90">{text}</span>
    </div>
  );
}
