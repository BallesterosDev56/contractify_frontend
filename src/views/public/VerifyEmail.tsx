/**
 * Vista VerifyEmail
 *
 * @description Página de verificación de email
 * TODO: Implementar formulario de verificación
 * TODO: Implementar reenvío de email
 */

import { useState } from 'react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const VerifyEmail = () => {
  const [token, setToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    // TODO: Implementar verificación de token
    setIsVerifying(true);
    // await verifyEmailService({ token });
    setIsVerifying(false);
  };

  const handleResend = async () => {
    // TODO: Implementar reenvío de email
    setIsResending(true);
    // await resendVerificationService();
    setIsResending(false);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center">Verifica tu email</h2>
          <p className="mt-2 text-center text-gray-600">
            Ingresa el código que enviamos a tu correo electrónico
          </p>
        </div>

        <Input
          label="Código de verificación"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="123456"
        />

        <Button fullWidth isLoading={isVerifying} onClick={handleVerify}>
          Verificar
        </Button>

        <Button variant="ghost" fullWidth isLoading={isResending} onClick={handleResend}>
          Reenviar código
        </Button>
      </div>
    </AuthLayout>
  );
};
