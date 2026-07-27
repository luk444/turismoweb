import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Building2,
  Globe,
  DollarSign,
  Mountain,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { navLinks, WHATSAPP_URL } from '../../data/content';

import type { Currency, Language } from '../../types';

const languages: Language[] = ['ES', 'EN', 'PT'];
const currencies: Currency[] = ['ARS', 'USD'];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  const { language, setLanguage, currency, setCurrency } = useApp();
  const { user, profile, loading, isAdmin, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const isActiveLink = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      return location.pathname === (path || '/') && location.hash === `#${hash}`;
    }
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* ========================= */}
        {/* Primera fila */}
        {/* ========================= */}
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-orange-500 flex items-center justify-center">
              <Mountain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Mendoza Experience
              </h1>
              <p className="text-xs text-gray-500">
                Turismo & Excursiones
              </p>
            </div>
          </Link>

          {/* Desktop derecha */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Carrito */}
            <Link to="/" className="relative">
              <ShoppingCart className="w-5 h-5 text-orange-500" />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Idioma */}
            <Selector
              icon={<Globe className="w-4 h-4" />}
              value={language}
              options={languages}
              onChange={(v) => setLanguage(v as Language)}
            />

            {/* Moneda */}
            <Selector
              icon={<DollarSign className="w-4 h-4" />}
              value={currency}
              options={currencies}
              onChange={(v) => setCurrency(v as Currency)}
            />

            {/* Empresas */}
            <Button
              to="/tours"
              variant="outline"
              className="rounded-full border-orange-300 text-orange-500 hover:bg-orange-50 px-5"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Empresas
            </Button>

            {/* Auth buttons */}
            {loading ? null : user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Button
                    to="/admin"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Admin
                  </Button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
                {profile?.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt={profile.displayName ?? 'Usuario'}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  to="/login"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Ingresar
                </Button>
                <Button
                  to="/register"
                  size="sm"
                  className="rounded-full"
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* ========================= */}
        {/* Segunda fila */}
        {/* ========================= */}
        <nav className="hidden lg:flex justify-center items-center gap-10 h-14 border-t border-gray-100">
          <button
            onMouseEnter={() => setToursOpen(true)}
            onMouseLeave={() => setToursOpen(false)}
            className="relative flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-orange-500 transition"
          >
            Tours
            <ChevronDown className="w-4 h-4" />

            <AnimatePresence>
              {toursOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-10 w-64 rounded-xl border border-gray-200 bg-white shadow-xl p-2"
                >
                  <Link
                    to="/tour/tour-vinos-premium"
                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    Tour de vinos
                  </Link>
                  <Link
                    to="/tour/alta-montana-aconcagua"
                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    Alta Montaña
                  </Link>
                  <Link
                    to="/tour/rafting-potrerillos"
                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    Rafting
                  </Link>
                  <Link
                    to="/tours"
                    className="block rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition"
                  >
                    Ver todos los tours
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `text-[15px] font-medium transition duration-300 ${
                  isActive || isActiveLink(link.href)
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Button
            href={WHATSAPP_URL}
            external
            className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Consultar
          </Button>
        </nav>
      </div>

      {/* ========================= */}
      {/* Mobile Menu */}
      {/* ========================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6">
              <div className="space-y-1">
                <Link
                  to="/tours"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-gray-700 hover:text-orange-500 transition"
                >
                  Tours
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-gray-700 hover:text-orange-500 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6 space-y-4">
                <Selector
                  icon={<Globe className="w-4 h-4" />}
                  value={language}
                  options={languages}
                  onChange={(v) => setLanguage(v as Language)}
                />

                <Selector
                  icon={<DollarSign className="w-4 h-4" />}
                  value={currency}
                  options={currencies}
                  onChange={(v) => setCurrency(v as Currency)}
                />

                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Panel de administración
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <LogIn className="w-4 h-4" />
                      Ingresar
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      Registrarse
                    </Link>
                  </>
                )}

                <Button
                  href={WHATSAPP_URL}
                  external
                  className="w-full rounded-full"
                >
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Selector({
  icon,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 transition hover:border-orange-300">
        <div className="text-gray-500">{icon}</div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            appearance-none
            bg-transparent
            pr-6
            text-sm
            font-medium
            text-gray-700
            outline-none
            cursor-pointer
          "
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}