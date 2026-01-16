/**
 * Vista Register
 *
 * @description Página de registro de nuevos usuarios con Firebase Auth
 * - Validación completa con React Hook Form + Zod
 * - Registro con Firebase Authentication
 * - Redirección al dashboard tras registro exitoso
 */

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Chrome } from 'lucide-react';
import { useRegister, useGoogleLogin } from '@/hooks/api';
import { useAuth } from '@/hooks/utils/useAuth';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/constants/app.constants';

const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre es muy largo'),
    lastName: z
      .string()
      .min(1, 'El apellido es requerido')
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido es muy largo'),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
      .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error } = useRegister();
  const { login: loginWithGoogle, isLoading: isGoogleLoading, error: googleError } = useGoogleLogin();
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    const success = await registerUser(registerData);
    if (success) {
      // Redirigir al dashboard tras registro exitoso
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  const handleGoogleRegister = async () => {
    const success = await loginWithGoogle();
    if (success) {
      // Con Google, si el usuario es nuevo se crea automáticamente
      // Si ya existe, simplemente inicia sesión
      // La navegación se manejará automáticamente mediante el useEffect
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  };

  const displayError = error || googleError;

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Completa tus datos para comenzar
          </p>
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
          onClick={handleGoogleRegister}
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
            <span className="px-2 bg-white text-gray-500">O regístrate con email</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nombre"
            autoComplete="given-name"
            placeholder="Juan"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label="Apellido"
            autoComplete="family-name"
            placeholder="Pérez"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
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
          autoComplete="new-password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
          helperText="Mínimo 8 caracteres, una mayúscula, una minúscula y un número"
        />

        <Input
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Registrarse
        </Button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-800 underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
