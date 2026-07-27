import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHATSAPP_URL } from '../data/content';
import { Wine, Shield, Star } from 'lucide-react';

export function BodegasPage() {
  const bodegas = [
    {
      id: '1',
      title: 'Bodegas Premium del Valle de Uco',
      description: 'Descubrí las bodegas más exclusivas del Valle de Uco, reconocidas internacionalmente por la calidad de sus vinos.',
      icon: Wine,
      features: ['Degustaciones premium', 'Viñedos panorámicos', 'Almuerzo maridaje'],
    },
    {
      id: '2',
      title: 'Bodegas Boutique de Maipú',
      description: 'Experiencias íntimas en bodegas familiares con historia y tradición en el corazón de Maipú.',
      icon: Wine,
      features: ['Bodegas familiares', 'Producción artesanal', 'Historia y tradición'],
    },
    {
      id: '3',
      title: 'Experiencias de Enoturismo',
      description: 'Paquetes completos de enoturismo con alojamiento, cenas y visitas a múltiples bodegas.',
      icon: Wine,
      features: ['Paquetes completos', 'Alojamiento incluido', 'Cenas con maridaje'],
    },
  ];

  return (
    <div className="pt-36 pb-16">
      <div className="section-container">
        <SectionHeader
          title="Experiencias en Bodegas"
          subtitle="Recorré las mejores bodegas de Mendoza con degustaciones exclusivas y experiencias únicas."
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-12">
          {bodegas.map((bodega, index) => (
            <motion.div
              key={bodega.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <bodega.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {bodega.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {bodega.description}
              </p>
              <ul className="mt-4 space-y-2">
                {bodega.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                    <Star className="h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20sobre%20${encodeURIComponent(bodega.title)}`}
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