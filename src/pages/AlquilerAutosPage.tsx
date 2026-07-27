import { motion } from 'framer-motion';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { WHATSAPP_URL } from '../data/content';
import { Car, Shield, Star } from 'lucide-react';

export function AlquilerAutosPage() {
  const autos = [
    {
      id: '1',
      title: 'Autos Económicos',
      description: 'Vehículos compactos y económicos ideales para desplazamientos por la ciudad.',
      icon: Car,
      features: ['Ahorro de combustible', 'Ideal para ciudad', 'Seguro básico incluido'],
    },
    {
      id: '2',
      title: 'SUVs y 4x4',
      description: 'Vehículos todoterreno para aventuras por caminos rurales y montaña.',
      icon: Car,
      features: ['Tracción 4x4', 'Espacio amplio', 'Ideal para rutas rurales'],
    },
    {
      id: '3',
      title: 'Autos Premium',
      description: 'Vehículos de gama alta para mayor confort y estilo en tu viaje.',
      icon: Car,
      features: ['Alta gama', 'Confort premium', 'Servicio personalizado'],
    },
  ];

  return (
    <div className="pt-36 pb-16">
      <div className="section-container">
        <SectionHeader
          title="Alquiler de Autos"
          subtitle="Descubrí Mendoza a tu propio ritmo con nuestra flota de vehículos seleccionados."
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-12">
          {autos.map((auto, index) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10">
                <auto.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-display text-xl font-semibold text-warm-900">
                {auto.title}
              </h3>
              <p className="mt-2 text-warm-500 leading-relaxed">
                {auto.description}
              </p>
              <ul className="mt-4 space-y-2">
                {auto.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-warm-600">
                    <Star className="h-4 w-4 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20alquiler%20${encodeURIComponent(auto.title)}`}
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