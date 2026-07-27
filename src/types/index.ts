export interface Tour {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  type: string;
  duration: string;
  location: string;
  languages: string[];
  price: number;
  priceLabel: string;
  includes: string[];
  excludes: string[];
  faqs: { question: string; answer: string }[];
  cancellationPolicy: string;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  location: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  href: string;
}

export type Language = 'ES' | 'EN' | 'PT';
export type Currency = 'ARS' | 'USD';

/* ────────────────────────────
   Sistema de reservas (Firebase)
   ──────────────────────────── */

export interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  type: string;
  duration: string;
  location: string;
  languages: string[];
  price: number;
  priceLabel: string;
  includes: string[];
  excludes: string[];
  faqs: { question: string; answer: string }[];
  cancellationPolicy: string;
  features: string[];
  /** Cupo máximo por día (si no se especifica, usa el default del admin) */
  defaultCapacity?: number;
  /** Si la actividad está activa o no */
  active: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface DailyCapacity {
  /** ID del documento: `${activityId}_${dateISO}` */
  id: string;
  activityId: string;
  /** Fecha en formato YYYY-MM-DD */
  date: string;
  /** Cupo disponible para ese día */
  capacity: number;
}

export type BookingStatus = 'pending' | 'paid' | 'cancelled' | 'expired';

export interface Booking {
  id: string;
  activityId: string;
  userId: string;
  userEmail: string;
  userName: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentId: string | null;
  paymentStatus: 'pending' | 'approved' | 'failed' | 'cancelled' | 'pending';
  createdAt: number;
  updatedAt: number;
}

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
  createdAt: number;
}
