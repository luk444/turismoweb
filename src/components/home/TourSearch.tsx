import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { destinations } from '../../data/content';

export function TourSearch() {
  const [destination, setDestination] = useState(destinations[0]);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = () => {
    // Construir parámetros de búsqueda
    const params = new URLSearchParams();
    if (destination) params.set('destino', destination);
    if (date) params.set('fecha', date);
    if (guests) params.set('personas', guests.toString());

    // Navegar a la página de tours con los parámetros
    window.location.href = `/tours?${params.toString()}`;
  };

  return (
    <section id="buscador" className="py-16 lg:py-20">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-white p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
            <SearchField
              icon={<MapPin className="h-5 w-5 text-brand" />}
              label="Destino"
            >
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-warm-900 focus:outline-none"
              >
                {destinations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </SearchField>

            <SearchField
              icon={<Calendar className="h-5 w-5 text-brand" />}
              label="Fecha"
            >
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-warm-900 focus:outline-none"
              />
            </SearchField>

            <SearchField
              icon={<Users className="h-5 w-5 text-brand" />}
              label="Personas"
            >
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-transparent text-warm-900 focus:outline-none"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </SearchField>

            <Button size="lg" onClick={handleSearch} className="w-full lg:w-auto">
              <Search className="h-5 w-5" />
              Buscar experiencias
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SearchField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-warm-200 bg-warm-50 px-4 py-3 transition-colors focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
      <label className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-warm-500">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
