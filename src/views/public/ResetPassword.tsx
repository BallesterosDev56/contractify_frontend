/**
 * Vista ResetPassword
 *
 * @description Página de recuperación de contraseña
 * TODO: Implementar formulario completo
 * TODO: Implementar confirmación de reset
 */

import { useState } from 'react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // TODO: Implementar envío de email de recuperación
    setIsLoading(true);
    // await resetPasswordService({ email });
    setIsLoading(false);
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

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button fullWidth isLoading={isLoading} onClick={handleSubmit}>
          Enviar link de recuperación
        </Button>
      </div>
    </AuthLayout>
  );
};
