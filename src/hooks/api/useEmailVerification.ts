/**
 * Hook para gestionar la verificación de email con Firebase
 *
 * @description Maneja el flujo de verificación de email:
 * - Verificación del estado de email verificado
 * - Reenvío de email de verificación
 * - Actualización automática del estado
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '@/auth/firebase';
import { resendEmailVerification } from '@/services/firebase.auth.service';

export const useEmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  // Escuchar cambios en el estado de verificación del email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
        setEmail(user.email);
        
        // Recargar el usuario para obtener el estado actualizado
        user.reload().catch((err) => {
          console.error('Error recargando usuario:', err);
        });
      } else {
        setEmailVerified(false);
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const resendVerification = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await resendEmailVerification();
      setSuccess(true);
      
      // Resetear el mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al reenviar email de verificación';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkVerificationStatus = async (): Promise<boolean> => {
    try {
      const user = firebaseAuth.currentUser;
      if (!user) {
        return false;
      }

      // Recargar el usuario para obtener el estado más reciente
      await user.reload();
      const isVerified = user.emailVerified;
      setEmailVerified(isVerified);
      return isVerified;
    } catch (err) {
      console.error('Error verificando estado:', err);
      return false;
    }
  };

  return {
    emailVerified,
    email,
    resendVerification,
    checkVerificationStatus,
    isLoading,
    error,
    success,
  };
};
