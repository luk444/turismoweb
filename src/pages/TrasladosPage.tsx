import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHATSAPP_URL } from '../data/content';
import { Car, Shield, Clock } from 'lucide-react';

export function TrasladosPage() {
  const traslados = [
    {
      id: '1',
      title: 'Traslado Aeropuerto - Hotel',
      description: 'Servicio de traslado privado desde el aeropuerto internacional de Mendoza hasta tu alojamiento.',
      icon: Car,
      features: ['Vehículo cómodo y seguro', 'Chofer profesional', 'Seguimiento de vuelos'],
    },
    {
      id: '2',
      title: 'Traslado a Bodegas',
      description: 'Transporte privado para visitar las mejores bodegas de la región con total comodidad.',
      icon: Car,
      features: ['Vehículo climatizado', 'Chofer bilingüe', 'Flexibilidad horaria'],
    },
    {
      id: '3',
      title: 'Traslado a Sitios Turísticos',
      description: 'Llevamos a los principales atractivos turísticos de Mendoza y alrededores.',
      icon: Car,
      features: ['Rutas panorámicas', 'Paradas fotográficas', 'Conocimiento local'],
    },
  ];

  return (
    <div className="pt-36 pb-16">
      <div className="section-container">
        <SectionHeader
          title="Servicios de Traslado"
          subtitle="Transporte privado y seguro para que te muevas por Mendoza sin preocupaciones."
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-12">
          {traslados.map((traslado, index) => (
            <motion.div
              key={traslado.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <traslado.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {traslado.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {traslado.description}
              </p>
              <ul className="mt-4 space-y-2">
                {traslado.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                    <Shield className="h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20sobre%20${encodeURIComponent(traslado.title)}`}
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