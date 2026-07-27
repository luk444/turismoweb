import type { ReactNode } from 'react';
import { Mountain, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../../data/content';

const footerLinks = {
  empresa: [
    { label: 'Sobre nosotros', href: '#' },
    { label: 'Nuestro equipo', href: '#' },
    { label: 'Trabajá con nosotros', href: '#' },
    { label: 'Blog de viajes', href: '#' },
  ],
  tours: [
    { label: 'Tour de vinos', href: '#tours' },
    { label: 'Alta Montaña', href: '#tours' },
    { label: 'Rafting', href: '#tours' },
    { label: 'Paquetes', href: '#tours' },
  ],
  ayuda: [
    { label: 'Preguntas frecuentes', href: '#' },
    { label: 'Política de cancelación', href: '#' },
    { label: 'Términos y condiciones', href: '#' },
    { label: 'Privacidad', href: '#' },
  ],
  contacto: [
    { label: 'Av. San Martín 1234, Mendoza', href: '#' },
    { label: '+54 261 555-1234', href: 'tel:+542615551234' },
    { label: 'info@mendozaexperience.com', href: 'mailto:info@mendozaexperience.com' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-warm-900 text-warm-300">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
                <Mountain className="h-5 w-5 text-warm-900" />
              </div>
              <div>
                <p className="font-display font-bold text-white">Mendoza Experience</p>
                <p className="text-xs text-warm-500">Turismo & Excursiones</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Agencia de turismo local especializada en experiencias premium en Mendoza,
              Argentina.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href="#" icon={<Facebook className="h-4 w-4" />} label="Facebook" />
              <SocialLink href="#" icon={<Instagram className="h-4 w-4" />} label="Instagram" />
              <SocialLink href={WHATSAPP_URL} icon={<Phone className="h-4 w-4" />} label="WhatsApp" />
            </div>
          </div>

          <FooterColumn title="Empresa" links={footerLinks.empresa} />
          <FooterColumn title="Tours" links={footerLinks.tours} />
          <FooterColumn title="Ayuda" links={footerLinks.ayuda} />
          <FooterColumn title="Contacto" links={footerLinks.contacto} icons />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-warm-500">
            © {new Date().getFullYear()} Mendoza Experience Tours. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-warm-500">
            <MapPin className="h-4 w-4" />
            Mendoza, Argentina
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  icons,
}: {
  title: string;
  links: { label: string; href: string }[];
  icons?: boolean;
}) {
  const iconMap: Record<string, ReactNode> = {
    'Av. San Martín 1234, Mendoza': <MapPin className="h-4 w-4 shrink-0" />,
    '+54 261 555-1234': <Phone className="h-4 w-4 shrink-0" />,
    'info@mendozaexperience.com': <Mail className="h-4 w-4 shrink-0" />,
  };

  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-2 text-sm transition-colors hover:text-brand"
            >
              {icons && iconMap[link.label]}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-warm-400 transition-colors hover:bg-brand hover:text-warm-900"
    >
      {icon}
    </a>
  );
}
