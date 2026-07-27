import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Save, Trash2, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import {
  getCapacity,
  setCapacity,
  getCapacitiesForActivity,
  getBookedGuests,
  getActivity,
} from '../../firebase/firestore';
import type { Activity, DailyCapacity } from '../../types';

interface CapacityManagerProps {
  activityId: string;
}

export function CapacityManager({ activityId }: CapacityManagerProps) {
  const [date, setDate] = useState('');
  const [capacity, setCapacityValue] = useState(20);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [capacities, setCapacities] = useState<DailyCapacity[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    loadActivity();
    loadCapacities();
  }, [activityId]);

  const loadActivity = async () => {
    const act = await getActivity(activityId);
    setActivity(act);
    if (act?.defaultCapacity) {
      setCapacityValue(act.defaultCapacity);
    }
  };

  const loadCapacities = async () => {
    setLoading(true);
    const caps = await getCapacitiesForActivity(activityId);
    setCapacities(caps);
    setLoading(false);
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setError('');
    setSuccess('');

    const cap = await getCapacity(activityId, selectedDate);
    if (cap) {
      setCapacityValue(cap.capacity);
    } else {
      setCapacityValue(activity?.defaultCapacity ?? 20);
    }
  };

  const handleSave = async () => {
    if (!date) {
      setError('Seleccioná una fecha');
      return;
    }
    if (capacity <= 0) {
      setError('El cupo debe ser mayor a 0');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await setCapacity(activityId, date, capacity);
      setSuccess(`Cupo establecido para el ${date}`);
      loadCapacities();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar';
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (capId: string) => {
    if (!confirm('¿Estás seguro de eliminar este cupo?')) return;
    try {
      // Import deleteDoc dynamically
      const { deleteDoc, doc } = await import('firebase/firestore');
      const { db } = await import('../../firebase/config');
      await deleteDoc(doc(db, 'dailyCapacities', capId));
      setSuccess('Cupo eliminado');
      loadCapacities();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al eliminar';
      setError(msg);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-6 shadow-card"
    >
      <h2 className="mb-4 font-display text-xl font-bold text-warm-900">
        Gestión de cupos diarios
      </h2>

      {activity && (
        <p className="mb-4 text-sm text-warm-500">
          Actividad: <strong>{activity.title}</strong> · Cupo por defecto:{' '}
          <strong>{activity.defaultCapacity ?? 20}</strong>
        </p>
      )}

      {error && (
        <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Formulario para establecer cupo */}
      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Fecha
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" />
            <input
              type="date"
              value={date}
              min={today}
              onChange={handleDateChange}
              className="w-full rounded-xl border border-warm-200 pl-10 pr-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Cupo disponible
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacityValue(Number(e.target.value))}
            min={1}
            className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleSave}
            disabled={saving || !date}
            className="w-full"
          >
            {saving ? 'Guardando...' : <><Save className="h-4 w-4 mr-2" />Guardar</>}
          </Button>
        </div>
      </div>

      {/* Lista de cupos existentes */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-warm-700">
          Cupos configurados
        </h3>
        {loading ? (
          <p className="text-sm text-warm-500">Cargando...</p>
        ) : capacities.length === 0 ? (
          <p className="text-sm text-warm-500">
            No hay cupos configurados. Establecé cupos específicos para fechas
            particulares.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-2 font-medium text-warm-600">
                    Fecha
                  </th>
                  <th className="text-left py-2 font-medium text-warm-600">
                    Cupo
                  </th>
                  <th className="text-left py-2 font-medium text-warm-600">
                    Reservado
                  </th>
                  <th className="text-left py-2 font-medium text-warm-600">
                    Disponible
                  </th>
                  <th className="text-center py-2 font-medium text-warm-600">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {capacities
                  .slice()
                  .sort((a, b) => (a.date > b.date ? 1 : -1))
                  .map((cap) => (
                    <CapacityRow
                      key={cap.id}
                      cap={cap}
                      onDelete={handleDelete}
                      onUpdate={loadCapacities}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CapacityRow({
  cap,
  onDelete,
  onUpdate,
}: {
  cap: DailyCapacity;
  onDelete: (id: string) => void;
  onUpdate: () => void;
}) {
  const [booked, setBooked] = useState(0);

  useEffect(() => {
    getBookedGuests(cap.activityId, cap.date).then(setBooked);
  }, [cap.activityId, cap.date]);

  const available = cap.capacity - booked;

  return (
    <tr className="border-b border-warm-100">
      <td className="py-2">{cap.date}</td>
      <td className="py-2">{cap.capacity}</td>
      <td className="py-2">{booked}</td>
      <td className="py-2">
        <span className={available > 0 ? 'text-green-600' : 'text-red-600'}>
          {available}
        </span>
      </td>
      <td className="py-2 text-center">
        <button
          onClick={() => onDelete(cap.id)}
          className="rounded p-1 text-warm-400 hover:text-red-500"
          aria-label="Eliminar cupo"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}
