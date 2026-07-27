import type { Tour, Hotel, Testimonial, Category } from '../types';

export const WHATSAPP_NUMBER = '5492615551234';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const destinations = [
  'Mendoza Capital',
  'Maipú',
  'Valle de Uco',
  'Alta Montaña',
  'Las Leñas',
];

export const featuredTours: Tour[] = [
  {
    id: '1',
    slug: 'tour-vinos-premium',
    title: 'Tour de vinos premium',
    shortDescription:
      'Recorré las mejores bodegas de Mendoza con degustaciones exclusivas y un guía sommelier.',
    description:
      'Descubrí el corazón vitivinícola de Mendoza en un tour premium que combina tradición, arquitectura y los mejores vinos de la región. Visitamos bodegas boutique del Valle de Uco y Maipú, con degustaciones guiadas por expertos y almuerzo gourmet incluido.',
    image:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&q=80',
      'https://images.unsplash.com/photo-1510812431401-41e2e06971c5?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
    type: 'Gastronomía',
    duration: '8 horas',
    location: 'Valle de Uco',
    languages: ['Español', 'Inglés', 'Portugués'],
    price: 85000,
    priceLabel: 'Desde $85.000',
    features: ['Degustación', 'Traslado', 'Guía especializado'],
    includes: [
      'Traslado ida y vuelta desde tu hotel',
      'Visitas a 3 bodegas premium',
      'Degustación de 8 vinos seleccionados',
      'Almuerzo gourmet con maridaje',
      'Guía sommelier certificado',
    ],
    excludes: ['Propinas', 'Compras personales en bodegas'],
    faqs: [
      {
        question: '¿Hay límite de edad?',
        answer: 'Sí, la edad mínima es 18 años para participar en las degustaciones.',
      },
      {
        question: '¿Qué pasa si llueve?',
        answer: 'El tour se realiza normalmente. Las bodegas tienen espacios cubiertos.',
      },
    ],
    cancellationPolicy:
      'Cancelación gratuita hasta 48 horas antes. Entre 48 y 24 horas: reembolso del 50%. Menos de 24 horas: sin reembolso.',
  },
  {
    id: '2',
    slug: 'alta-montana-aconcagua',
    title: 'Alta Montaña Aconcagua',
    shortDescription:
      'Recorré la Cordillera de Los Andes hasta el mirador del Aconcagua con paisajes de ensueño.',
    description:
      'Un viaje épico por la Ruta 7 hacia la frontera con Chile. Cruzamos Potrerillos, Uspallata y el histórico Puente del Inca hasta alcanzar el mirador del Cerro Aconcagua, la montaña más alta de América.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e4376?w=1200&q=80',
    ],
    type: 'Naturaleza',
    duration: '12 horas',
    location: 'Alta Montaña',
    languages: ['Español', 'Inglés', 'Portugués'],
    price: 120000,
    priceLabel: 'Desde $120.000',
    features: ['Potrerillos', 'Uspallata', 'Puente del Inca'],
    includes: [
      'Traslado en vehículo 4x4',
      'Guía bilingüe especializado',
      'Paradas en miradores panorámicos',
      'Entrada al Parque Aconcagua',
      'Snack y bebidas',
    ],
    excludes: ['Almuerzo', 'Entradas opcionales'],
    faqs: [
      {
        question: '¿A qué altura se llega?',
        answer: 'El mirador del Aconcagua está a aproximadamente 2.950 msnm.',
      },
    ],
    cancellationPolicy:
      'Cancelación gratuita hasta 72 horas antes por condiciones climáticas adversas.',
  },
  {
    id: '3',
    slug: 'rafting-potrerillos',
    title: 'Rafting de medio día en Potrerillos',
    shortDescription:
      'Adrenalina pura en las aguas cristalinas del dique Potrerillos con guías certificados.',
    description:
      'Viví la aventura definitiva en Mendoza navegando los rápidos del río Mendoza en el imponente dique Potrerillos. Una experiencia de medio día con equipamiento de primera, instructores certificados y paisajes espectaculares de montaña.',
    image:
      'https://images.unsplash.com/photo-1530587190454-f7f9d4b5c8e8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530587190454-f7f9d4b5c8e8?w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
      'https://images.unsplash.com/photo-1527004014047-0c94de16745f?w=1200&q=80',
    ],
    type: 'Aventura',
    duration: '6 horas',
    location: 'Potrerillos',
    languages: ['Español', 'Inglés', 'Portugués'],
    price: 136200,
    priceLabel: 'Desde $136.200',
    features: ['Equipamiento', 'Seguro', 'Guía profesional'],
    includes: [
      'Traje de neoprene y chaleco salvavidas',
      'Casco y remo',
      'Guía profesional certificado IRF',
      'Seguro de accidentes personales',
      'Traslado desde Mendoza capital',
      'Snack post-actividad',
    ],
    excludes: ['Fotos y videos (disponibles como extra)', 'Propinas'],
    faqs: [
      {
        question: '¿Necesito experiencia previa?',
        answer: 'No, el tour es apto para principiantes. Se imparte una charla de seguridad previa.',
      },
      {
        question: '¿Qué debo llevar?',
        answer: 'Traje de baño, toalla, protector solar y ropa de cambio.',
      },
      {
        question: '¿Hay restricciones de edad?',
        answer: 'Edad mínima 12 años. Menores deben ir acompañados por un adulto.',
      },
    ],
    cancellationPolicy:
      'Cancelación gratuita hasta 24 horas antes. Reprogramación sin costo por condiciones climáticas.',
  },
];

export const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Hotel Raíces Aconcagua',
    stars: 4,
    location: 'Mendoza Capital',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    id: '2',
    name: 'Diplomatic Hotel',
    stars: 5,
    location: 'Mendoza Capital',
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  },
  {
    id: '3',
    name: 'NH Mendoza Cordillera',
    stars: 4,
    location: 'Mendoza Capital',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  },
];

export const categories: Category[] = [
  {
    id: '1',
    title: 'Tour de vinos',
    image:
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80',
    href: '#tours',
  },
  {
    id: '2',
    title: 'Tours aventura',
    image:
      'https://images.unsplash.com/photo-1530587190454-f7f9d4b5c8e8?w=600&q=80',
    href: '#tours',
  },
  {
    id: '3',
    title: 'Experiencias privadas',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    href: '#tours',
  },
  {
    id: '4',
    title: 'Escapadas románticas',
    image:
      'https://images.unsplash.com/photo-1527631746610-bca8a438db57?w=600&q=80',
    href: '#tours',
  },
  {
    id: '5',
    title: 'Nieve y ski',
    image:
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80',
    href: '#tours',
  },
  {
    id: '6',
    title: 'Gastronomía',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    href: '#tours',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'María González',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    comment:
      'Increíble experiencia en el tour de vinos. El guía conocía cada detalle y las bodegas fueron espectaculares. ¡Volveremos seguro!',
    date: 'Hace 2 semanas',
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    comment:
      'The Alta Montaña tour was breathtaking. Professional guides, comfortable transport, and views that photos cannot capture.',
    date: 'Hace 1 mes',
  },
  {
    id: '3',
    name: 'Ana Paula Silva',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 5,
    comment:
      'Rafting em Potrerillos foi sensacional! Equipe super profissional e segura. Recomendo muito a Mendoza Experience.',
    date: 'Hace 3 semanas',
  },
  {
    id: '4',
    name: 'Carlos Mendez',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment:
      'Atención personalizada de principio a fin. Nos armaron un paquete a medida con hoteles y tours. Excelente servicio.',
    date: 'Hace 1 semana',
  },
];

export const navLinks = [
  { label: 'Tours', href: '/tours' },
  { label: 'Hoteles', href: '/hoteles' },
  { label: 'Traslados', href: '/traslados' },
  { label: 'Bodegas', href: '/bodegas' },
  { label: 'Aventura', href: '/aventura' },
  { label: 'Alquiler de autos', href: '/alquiler-autos' },
  { label: 'Paquetes', href: '/paquetes' },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return featuredTours.find((t) => t.slug === slug);
}
