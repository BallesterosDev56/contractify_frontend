/**
 * Vista Login
 *
 * @description Página de inicio de sesión con Firebase Auth
 * - Validación de formulario con React Hook Form + Zod
 * - Integración con Firebase Authentication
 * - Manejo de errores de autenticación
 * - Redirección automática al dashboard tras login exitoso
 */

import { useEffect } from 'react';
import { getIdToken } from '@/services/firebase.auth.service';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Chrome } from 'lucide-react';
import { useLogin, useGoogleLogin } from '@/hooks/api';
import { useAuth } from '@/hooks/utils/useAuth';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/constants/app.constants';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
  const { login: loginWithGoogle, isLoading: isGoogleLoading, error: googleError } = useGoogleLogin();
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      // La navegación se manejará automáticamente mediante el useEffect
      //obtenemos el token de la respuesta y lo logueamos
      const token = await getIdToken();
      if (token) {
        console.log('Token:', token);
      }
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      // La navegación se manejará automáticamente mediante el useEffect
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  const displayError = error || googleError;

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
        </div>

        {displayError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {displayError}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          fullWidth
          isLoading={isGoogleLoading}
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2"
        >
          <Chrome className="w-5 h-5" />
          Continuar con Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continúa con email</span>
          </div>
        </div>

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <Link
            to={ROUTES.RESET_PASSWORD}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Iniciar sesión
        </Button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link to={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-800 underline">
            Regístrate
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
