/**
 * Vista VerifyEmail
 *
 * @description Página de verificación de email con Firebase Auth
 * - Verificación automática del estado del email
 * - Reenvío de email de verificación
 * - Información clara sobre el proceso de verificación
 * - Redirección automática cuando el email está verificado
 */

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEmailVerification } from '@/hooks/api/useEmailVerification';
import { useAuth } from '@/hooks/utils/useAuth';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/app.constants';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { emailVerified, email, resendVerification, checkVerificationStatus, isLoading, error, success } =
    useEmailVerification();
  const { isAuthenticated } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  // Verificar estado periódicamente si el email no está verificado
  useEffect(() => {
    if (!emailVerified && isAuthenticated) {
      const interval = setInterval(async () => {
        await checkVerificationStatus();
      }, 5000); // Verificar cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [emailVerified, isAuthenticated, checkVerificationStatus]);

  // Redirigir si el email está verificado
  useEffect(() => {
    if (emailVerified && isAuthenticated) {
      const timeout = setTimeout(() => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [emailVerified, isAuthenticated, navigate]);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleResend = async () => {
    await resendVerification();
  };

  const handleCheckStatus = async () => {
    setIsChecking(true);
    await checkVerificationStatus();
    setIsChecking(false);
  };

  // Mostrar estado de verificación exitosa
  if (emailVerified) {
    return (
      <AuthLayout>
        <div className="space-y-6 text-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="font-medium text-lg">¡Email verificado exitosamente!</p>
            <p className="text-sm mt-1">Serás redirigido al dashboard en unos momentos...</p>
          </div>
          <Link
            to={ROUTES.DASHBOARD}
            className="inline-block text-blue-600 hover:text-blue-800 underline"
          >
            Ir al dashboard ahora
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">Verifica tu email</h2>
          <p className="mt-2 text-center text-gray-600">
            Te hemos enviado un email de verificación a
          </p>
          {email && (
            <p className="mt-1 text-center font-medium text-gray-900">{email}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
          <p className="text-sm">
            <strong>¿Qué hacer ahora?</strong>
          </p>
          <ol className="list-decimal list-inside mt-2 text-sm space-y-1">
            <li>Revisa tu bandeja de entrada</li>
            <li>Busca el email de verificación de Contractify</li>
            <li>Haz clic en el enlace de verificación</li>
            <li>Vuelve aquí para continuar</li>
          </ol>
          <p className="text-sm mt-2">
            <strong>Nota:</strong> Si no ves el email, revisa tu carpeta de spam.
          </p>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Email reenviado</p>
            <p className="text-sm mt-1">
              Te hemos enviado un nuevo email de verificación. Revisa tu bandeja de entrada.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <Button
            fullWidth
            isLoading={isLoading}
            onClick={handleResend}
            disabled={success}
          >
            Reenviar email de verificación
          </Button>

          <Button
            variant="outline"
            fullWidth
            isLoading={isChecking}
            onClick={handleCheckStatus}
          >
            Verificar estado
          </Button>
        </div>

        <div className="text-center">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Cambiar de cuenta
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};
