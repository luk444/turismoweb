import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, Github, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginGoogle, loginGithub } = useAuth();

  const from =
    (location.state as LocationState | null)?.from || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await loginGoogle();
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión con Google';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGithub = async () => {
    setError('');
    setLoading(true);
    try {
      await loginGithub();
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión con GitHub';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 pt-20">
      <div className="section-container py-12">
        <div className="mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-8 shadow-card"
          >
            <h1 className="font-display text-3xl font-bold text-warm-900">
              Iniciar sesión
            </h1>
            <p className="mt-2 text-sm text-warm-500">
              Accedé a tu cuenta para gestionar tus reservas.
            </p>

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-warm-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-warm-200 pl-10 pr-4 py-3 text-warm-900 placeholder-warm-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-warm-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-warm-200 pl-10 pr-12 py-3 text-warm-900 placeholder-warm-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-warm-400 hover:text-warm-600"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-warm-200"></div>
              <span className="px-3 text-xs text-warm-400">O continuá con</span>
              <div className="flex-1 border-t border-warm-200"></div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-warm-200 bg-white px-4 py-3 text-sm font-medium text-warm-700 transition hover:bg-warm-50 disabled:opacity-50"
              >
                <Chrome className="h-5 w-5" />
                Google
              </button>
              <button
                type="button"
                onClick={handleGithub}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-warm-200 bg-white px-4 py-3 text-sm font-medium text-warm-700 transition hover:bg-warm-50 disabled:opacity-50"
              >
                <Github className="h-5 w-5" />
                GitHub
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-warm-500">
              ¿No tenés cuenta?{' '}
              <Link
                to="/register"
                state={{ from }}
                className="font-medium text-brand hover:text-brand-dark"
              >
                Registrate
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
