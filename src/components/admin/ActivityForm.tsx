import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { saveActivity } from '../../firebase/firestore';
import type { Activity } from '../../types';

interface ActivityFormProps {
  activity?: Activity | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyActivity: Omit<Activity, 'id'> = {
  slug: '',
  title: '',
  shortDescription: '',
  description: '',
  image: '',
  gallery: [],
  type: '',
  duration: '',
  location: '',
  languages: ['Español'],
  price: 0,
  priceLabel: '',
  includes: [],
  excludes: [],
  faqs: [],
  cancellationPolicy: '',
  features: [],
  defaultCapacity: 20,
  active: true,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export function ActivityForm({
  activity,
  onSuccess,
  onCancel,
}: ActivityFormProps) {
  const isEdit = !!activity;
  const [formData, setFormData] = useState<Omit<Activity, 'id'>>({
    ...emptyActivity,
    ...(activity ?? {}),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  const handleChange = (field: keyof typeof formData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: 'includes' | 'excludes' | 'features' | 'languages' | 'gallery') => {
    const value = prompt(`Agregar elemento a ${field}:`);
    if (value?.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }));
    }
  };

  const handleArrayRemove = (field: 'includes' | 'excludes' | 'features' | 'languages' | 'gallery', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  const handleFaqAdd = () => {
    const q = prompt('Pregunta:');
    const a = prompt('Respuesta:');
    if (q?.trim() && a?.trim()) {
      setFormData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, { question: q.trim(), answer: a.trim() }],
      }));
    }
  };

  const handleFaqRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!formData.title.trim() || !formData.slug.trim()) {
      setError('Título y slug son obligatorios');
      return;
    }
    if (formData.price <= 0) {
      setError('El precio debe ser mayor a 0');
      return;
    }

    setLoading(true);
    try {
      const activityData: Omit<Activity, 'id'> & { id?: string } = {
        ...formData,
        id: activity?.id,
        price: Number(formData.price),
        defaultCapacity: formData.defaultCapacity
          ? Number(formData.defaultCapacity)
          : undefined,
        updatedAt: Date.now(),
      };

      await saveActivity(activityData);
      onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al guardar';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderArrayField = (
    label: string,
    field: 'includes' | 'excludes' | 'features' | 'languages',
  ) => (
    <div className="mb-4">
      <label className="mb-2 block text-sm font-medium text-warm-700">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {(formData[field] as string[]).map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-lg bg-warm-100 px-3 py-1 text-sm text-warm-700"
          >
            {item}
            <button
              type="button"
              onClick={() => handleArrayRemove(field, i)}
              className="rounded p-0.5 text-warm-400 hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => handleArrayAdd(field)}
        className="flex items-center gap-1 rounded-lg border border-warm-200 bg-white px-3 py-1.5 text-sm text-warm-600 hover:bg-warm-50"
      >
        <Plus className="h-4 w-4" />
        Agregar
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-6 shadow-card"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-warm-900">
          {isEdit ? 'Editar actividad' : 'Nueva actividad'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-2 text-warm-400 hover:bg-warm-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              required
              placeholder="tour-de-vinos-premium"
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Descripción corta
          </label>
          <textarea
            value={formData.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Descripción completa
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Imágenes */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Imagen principal (URL)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Imagen de galería (URL)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <button
                type="button"
                onClick={() => {
                  if (galleryInput.trim()) {
                    handleChange('gallery', [...formData.gallery, galleryInput.trim()]);
                    setGalleryInput('');
                  }
                }}
                className="rounded-lg border border-warm-200 bg-white px-3 py-2 text-sm text-warm-600 hover:bg-warm-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Galería */}
        {formData.gallery.length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Galería
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.gallery.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    alt=""
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayRemove('gallery', i)}
                    className="absolute -top-1 -right-1 rounded-full bg-red-500 p-0.5 text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalles */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Tipo
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              placeholder="Naturaleza, Gastronomía, Aventura..."
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Duración
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="8 horas, 1 día..."
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Ubicación
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Precio (ARS) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              required
              min={0}
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Label de precio
            </label>
            <input
              type="text"
              value={formData.priceLabel}
              onChange={(e) => handleChange('priceLabel', e.target.value)}
              placeholder="Desde $85.000"
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-warm-700">
              Cupo máximo por día
            </label>
            <input
              type="number"
              value={formData.defaultCapacity ?? ''}
              onChange={(e) =>
                handleChange(
                  'defaultCapacity',
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              min={1}
              placeholder="20"
              className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
        </div>

        {/* Arrays */}
        {renderArrayField('Idiomas', 'languages')}
        {renderArrayField('Incluye', 'includes')}
        {renderArrayField('No incluye', 'excludes')}
        {renderArrayField('Características', 'features')}

        {/* FAQs */}
        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Preguntas frecuentes
          </label>
          <div className="mb-2 space-y-2">
            {formData.faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-warm-200 p-3">
                <p className="font-semibold text-sm">{faq.question}</p>
                <p className="text-sm text-warm-600">{faq.answer}</p>
                <button
                  type="button"
                  onClick={() => handleFaqRemove(i)}
                  className="mt-1 text-xs text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleFaqAdd}
            className="flex items-center gap-1 rounded-lg border border-warm-200 bg-white px-3 py-1.5 text-sm text-warm-600 hover:bg-warm-50"
          >
            <Plus className="h-4 w-4" />
            Agregar FAQ
          </button>
        </div>

        {/* Política de cancelación */}
        <div>
          <label className="mb-2 block text-sm font-medium text-warm-700">
            Política de cancelación
          </label>
          <textarea
            value={formData.cancellationPolicy}
            onChange={(e) => handleChange('cancellationPolicy', e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-warm-200 px-4 py-3 text-warm-900 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Estado */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={formData.active}
            onChange={(e) => handleChange('active', e.target.checked)}
            className="h-4 w-4 rounded border-warm-300 text-brand focus:ring-brand"
          />
          <label htmlFor="active" className="text-sm font-medium text-warm-700">
            Actividad activa (visible en la web)
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 border-t border-warm-200 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? (
              'Guardando...'
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEdit ? 'Actualizar' : 'Crear'}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
