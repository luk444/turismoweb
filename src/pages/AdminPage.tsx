import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AdminRoute } from '../components/auth/ProtectedRoute';
import { ActivityForm } from '../components/admin/ActivityForm';
import { CapacityManager } from '../components/admin/CapacityManager';
import {
  getActivities,
  deleteActivity,
  getAllBookings,
  getActivity,
} from '../firebase/firestore';
import type { Activity, Booking } from '../types';

type Tab = 'activities' | 'bookings';

export function AdminPage() {
  return (
    <AdminRoute>
      <AdminPageContent />
    </AdminRoute>
  );
}

function AdminPageContent() {
  const [tab, setTab] = useState<Tab>('activities');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [acts, books] = await Promise.all([
      getActivities(),
      getAllBookings(),
    ]);
    // Also get inactive activities for admin view
    const allActs = await getActivities();
    setActivities(allActs);
    setBookings(books);
    setLoading(false);
  };

  const handleEdit = async (id: string) => {
    const activity = await getActivity(id);
    if (activity) {
      setEditingActivity(activity);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Estás seguro de eliminar "${title}"?`)) return;
    await deleteActivity(id);
    loadData();
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingActivity(null);
    loadData();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingActivity(null);
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: Booking['status']) => {
    switch (status) {
      case 'paid':
        return 'Pagada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      case 'expired':
        return 'Expirada';
      default:
        return status;
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-warm-50 pt-20">
        <div className="section-container py-8">
          <ActivityForm
            activity={editingActivity}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    );
  }

  if (selectedActivityId) {
    return (
      <div className="min-h-screen bg-warm-50 pt-20">
        <div className="section-container py-8">
          <button
            onClick={() => setSelectedActivityId(null)}
            className="mb-4 text-sm text-warm-500 hover:text-brand"
          >
            ← Volver a actividades
          </button>
          <CapacityManager activityId={selectedActivityId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50 pt-20">
      <div className="section-container py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-warm-900">
            Panel de administración
          </h1>
          <Button
            onClick={() => {
              setEditingActivity(null);
              setShowForm(true);
            }}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva actividad
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl bg-warm-100 p-1">
          <button
            onClick={() => setTab('activities')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === 'activities'
                ? 'bg-white text-brand shadow-sm'
                : 'text-warm-600 hover:text-warm-900'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Actividades ({activities.length})
          </button>
          <button
            onClick={() => setTab('bookings')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === 'bookings'
                ? 'bg-white text-brand shadow-sm'
                : 'text-warm-600 hover:text-warm-900'
            }`}
          >
            <Users className="h-4 w-4" />
            Reservas ({bookings.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
            <p className="mt-2 text-sm text-warm-500">Cargando...</p>
          </div>
        ) : tab === 'activities' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white shadow-card"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 font-medium text-warm-600">
                      Actividad
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Tipo
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Precio
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Cupo/día
                    </th>
                    <th className="text-center py-3 font-medium text-warm-600">
                      Estado
                    </th>
                    <th className="text-center py-3 font-medium text-warm-600">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id} className="border-b border-warm-100">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-warm-900">
                              {activity.title}
                            </p>
                            <p className="text-xs text-warm-500">
                              {activity.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-warm-600">{activity.type}</td>
                      <td className="py-3">
                        <span className="flex items-center gap-1 text-warm-900">
                          <DollarSign className="h-4 w-4 text-brand" />
                          {activity.price.toLocaleString('es-AR')}
                        </span>
                      </td>
                      <td className="py-3 text-warm-600">
                        {activity.defaultCapacity ?? 20}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            activity.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {activity.active ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => setSelectedActivityId(activity.id)}
                            className="rounded p-1 text-warm-400 hover:text-brand"
                            aria-label="Gestionar cupos"
                            title="Gestionar cupos"
                          >
                            <Calendar className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(activity.id)}
                            className="rounded p-1 text-warm-400 hover:text-brand"
                            aria-label="Editar"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(activity.id, activity.title)
                            }
                            className="rounded p-1 text-warm-400 hover:text-red-500"
                            aria-label="Eliminar"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {activities.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-warm-500">
                  No hay actividades. ¡Creá tu primera actividad!
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white shadow-card"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 font-medium text-warm-600">
                      Fecha
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Actividad
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Usuario
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Personas
                    </th>
                    <th className="text-left py-3 font-medium text-warm-600">
                      Total
                    </th>
                    <th className="text-center py-3 font-medium text-warm-600">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-warm-100">
                      <td className="py-3">{booking.date}</td>
                      <td className="py-3 text-warm-600">{booking.activityId}</td>
                      <td className="py-3">{booking.userEmail}</td>
                      <td className="py-3">{booking.guests}</td>
                      <td className="py-3">
                        ${booking.totalPrice.toLocaleString('es-AR')}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            booking.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {getStatusIcon(booking.status)}
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {bookings.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-warm-500">No hay reservas todavía.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
