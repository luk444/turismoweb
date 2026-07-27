import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TourDetail } from '../components/tour/TourDetail';
import { getActivityBySlug } from '../firebase/firestore';
import { getTourBySlug } from '../data/content';
import type { Activity } from '../types';

export function TourPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivity = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      // 1. Intentar obtener de Firebase (actividades admin)
      try {
        const act = await getActivityBySlug(slug);
        if (act) {
          setActivity(act);
          setLoading(false);
          return;
        }
      } catch {
        // Firebase no disponible, continuar con datos estáticos
      }

      // 2. Fallback: datos estáticos
      const staticTour = getTourBySlug(slug);
      if (staticTour) {
        // Convertir Tour a Activity
        const activityFromTour: Activity = {
          ...staticTour,
          defaultCapacity: 20,
          active: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setActivity(activityFromTour);
      }

      setLoading(false);
    };

    loadActivity();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
          <p className="mt-2 text-sm text-warm-500">Cargando actividad...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return <Navigate to="/" replace />;
  }

  return <TourDetail activity={activity} />;
}
