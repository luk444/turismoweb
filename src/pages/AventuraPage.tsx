import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHATSAPP_URL } from '../data/content';
import { Mountain, Shield, Star } from 'lucide-react';

export function AventuraPage() {
  const aventuras = [
    {
      id: '1',
      title: 'Rafting en Potrerillos',
      description: 'Adrenalina pura en las aguas cristalinas del dique Potrerillos con guías certificados.',
      icon: Mountain,
      features: ['Equipamiento profesional', 'Guía certificado IRF', 'Seguro incluido'],
    },
    {
      id: '2',
      title: 'Trekking y Montañismo',
      description: 'Caminatas por los circuitos más impresionantes de la Cordillera de los Andes.',
      icon: Mountain,
      features: ['Guías especializados', 'Vistas panorámicas', 'Diferentes niveles'],
    },
    {
      id: '3',
      title: 'Escalada y Rappel',
      description: 'Desafiate en las paredes de roca de la montaña con equipamiento de primera calidad.',
      icon: Mountain,
      features: ['Equipo certificado', 'Instructores expertos', 'Seguridad garantizada'],
    },
  ];

  return (
    <div className="pt-36 pb-16">
      <div className="section-container">
        <SectionHeader
          title="Aventura y Adrenalina"
          subtitle="Viví experiencias únicas llenas de adrenalina en los paisajes impresionantes de Mendoza."
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-12">
          {aventuras.map((aventura, index) => (
            <motion.div
              key={aventura.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <aventura.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {aventura.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {aventura.description}
              </p>
              <ul className="mt-4 space-y-2">
                {aventura.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                    <Star className="h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20sobre%20${encodeURIComponent(aventura.title)}`}
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