/**
 * Hook para gestionar la recuperación de contraseña con Firebase
 *
 * @description Maneja el flujo de recuperación de contraseña:
 * - Envío de email de recuperación
 * - Manejo de errores
 */

import { useState } from 'react';
import { sendPasswordReset } from '@/services/firebase.auth.service';

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPasswordReset(email);
      // No revelar si el email existe o no por seguridad
      setSuccess(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar email de recuperación';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, error, success };
};
