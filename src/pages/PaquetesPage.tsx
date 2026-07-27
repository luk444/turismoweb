import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHATSAPP_URL } from '../data/content';
import { Star, Shield, Check } from 'lucide-react';

export function PaquetesPage() {
  const paquetes = [
    {
      id: '1',
      title: 'Paquete Vino y Relax',
      description: '2 noches en hotel boutique + tour de vinos premium + spa y cena maridaje.',
      icon: Star,
      features: ['2 noches de alojamiento', 'Tour de vinos premium', 'Cena con maridaje', 'Spa incluido'],
      price: 'Desde $250.000',
    },
    {
      id: '2',
      title: 'Paquete Aventura Extrema',
      description: '3 días de adrenalina con rafting, trekking y alojamiento en montaña.',
      icon: Star,
      features: ['3 días de aventura', 'Rafting + Trekking', 'Alojamiento en montaña', 'Equipamiento incluido'],
      price: 'Desde $320.000',
    },
    {
      id: '3',
      title: 'Paquete Romántico',
      description: 'Escapada romántica con hotel premium, cena especial y tour privado por viñedos.',
      icon: Star,
      features: ['2 noches premium', 'Cena romántica', 'Tour privado', 'Flores y champagne'],
      price: 'Desde $280.000',
    },
  ];

  return (
    <div className="pt-36 pb-16">
      <div className="section-container">
        <SectionHeader
          title="Paquetes Turísticos"
          subtitle="Experiencias completas diseñadas para que vivas Mendoza de la manera más cómoda y memorable."
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-12">
          {paquetes.map((paquete, index) => (
            <motion.div
              key={paquete.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <paquete.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {paquete.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {paquete.description}
              </p>
              <ul className="mt-4 space-y-2">
                {paquete.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-warm-500 mb-3">{paquete.price}</p>
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20paquete%20${encodeURIComponent(paquete.title)}`}
                  external
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  Consultar
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}