/**
 * Vista ResetPassword
 *
 * @description Página de recuperación de contraseña con Firebase Auth
 * - Validación de email con React Hook Form + Zod
 * - Envío de email de recuperación con Firebase
 * - Confirmación de envío exitoso
 * - Enlace de retorno al login
 */

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useResetPassword } from '@/hooks/api/useResetPassword';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ROUTES } from '@/constants/app.constants';

const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPassword = () => {
  const { resetPassword, isLoading, error, success } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const successResult = await resetPassword(data.email);
    if (successResult) {
      // Resetear el formulario después de un envío exitoso
      reset();
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">Recuperar contraseña</h2>
          <p className="mt-2 text-center text-gray-600">
            Ingresa tu email y te enviaremos un link para recuperar tu contraseña
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Email enviado</p>
            <p className="text-sm mt-1">
              Si el email está registrado, recibirás un enlace para restablecer tu contraseña.
              Revisa tu bandeja de entrada y spam.
            </p>
          </div>
        )}

        {error && !success && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            {...register('email')}
            error={errors.email?.message}
            disabled={success}
          />

          <Button type="submit" fullWidth isLoading={isLoading} disabled={success}>
            Enviar link de recuperación
          </Button>
        </form>

        <div className="text-center">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
