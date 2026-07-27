import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Globe,
  MapPin,
  Tag,
  Minus,
  Plus,
  Check,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { WHATSAPP_URL } from '../../data/content';
import { BookingFlow } from '../booking/BookingFlow';
import type { Activity } from '../../types';

type Tab = 'descripcion' | 'incluye' | 'no-incluye' | 'faq' | 'cancelacion';

const tabs: { id: Tab; label: string }[] = [
  { id: 'descripcion', label: 'Descripción' },
  { id: 'incluye', label: 'Incluye' },
  { id: 'no-incluye', label: 'No incluye' },
  { id: 'faq', label: 'Preguntas frecuentes' },
  { id: 'cancelacion', label: 'Política de cancelación' },
];

interface TourDetailProps {
  activity: Activity;
}

export function TourDetail({ activity }: TourDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('descripcion');
  const [selectedImage, setSelectedImage] = useState(0);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  const formattedPrice = activity.price.toLocaleString('es-AR');

  return (
    <div className="pt-20">
      <div className="section-container py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-warm-500 transition-colors hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a tours
        </Link>
      </div>

      <div className="section-container pb-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl font-bold text-warm-900 sm:text-4xl"
            >
              {activity.title}
            </motion.h1>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src={activity.gallery[selectedImage]}
                alt={activity.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {activity.gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                    selectedImage === i
                      ? 'ring-2 ring-brand ring-offset-2'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-20 w-28 object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <InfoBadge icon={<Tag className="h-4 w-4" />} label="Tipo" value={activity.type} />
              <InfoBadge icon={<Clock className="h-4 w-4" />} label="Duración" value={activity.duration} />
              <InfoBadge icon={<MapPin className="h-4 w-4" />} label="Ubicación" value={activity.location} />
              <InfoBadge
                icon={<Globe className="h-4 w-4" />}
                label="Idiomas"
                value={activity.languages.join(' / ')}
              />
            </div>

            <div className="mt-10">
              <div className="flex gap-1 overflow-x-auto border-b border-warm-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-brand text-brand'
                        : 'text-warm-500 hover:text-warm-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                {activeTab === 'descripcion' && (
                  <p className="leading-relaxed text-warm-600">{activity.description}</p>
                )}
                {activeTab === 'incluye' && (
                  <ul className="space-y-3">
                    {activity.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-warm-600">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'no-incluye' && (
                  <ul className="space-y-3">
                    {activity.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-warm-600">
                        <X className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {activeTab === 'faq' && (
                  <div className="space-y-6">
                    {activity.faqs.map((faq) => (
                      <div key={faq.question}>
                        <h4 className="font-semibold text-warm-900">{faq.question}</h4>
                        <p className="mt-2 text-warm-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'cancelacion' && (
                  <p className="leading-relaxed text-warm-600">{activity.cancellationPolicy}</p>
                )}
              </motion.div>
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <p className="text-sm text-warm-500">Precio por persona</p>
              <p className="mt-1 font-display text-4xl font-bold text-warm-900">
                ${formattedPrice}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-warm-700">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-warm-700">
                    Cantidad de personas
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-warm-200 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="rounded-lg p-2 text-warm-500 hover:bg-warm-100"
                      aria-label="Menos personas"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold text-warm-900">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="rounded-lg p-2 text-warm-500 hover:bg-warm-100"
                      aria-label="Más personas"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Booking Flow con disponibilidad y MercadoPago */}
              <div className="mt-6">
                <BookingFlow activity={activity} date={date} guests={guests} />
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  href={`${WHATSAPP_URL}?text=Consulta%20sobre%20${encodeURIComponent(activity.title)}`}
                  external
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  Consultar WhatsApp
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-warm-400">
                Cancelación flexible · Confirmación inmediata
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}

function InfoBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-warm-100 p-4">
      <div className="flex items-center gap-2 text-brand">{icon}</div>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-warm-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-warm-900">{value}</p>
    </div>
  );
}
