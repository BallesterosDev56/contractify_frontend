/**
 * Hook para gestionar el inicio de sesión con Google
 *
 * @description Maneja el flujo de autenticación con Google:
 * - Autenticación mediante popup de Google
 * - El estado de autenticación se maneja automáticamente mediante useAuth
 * - Manejo de errores de autenticación
 */

import { useState } from 'react';
import { loginWithGoogle } from '@/services/firebase.auth.service';

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await loginWithGoogle();
      
      if (userCredential.user) {
        // El estado de autenticación se actualizará automáticamente mediante onAuthStateChanged
        // No necesitamos guardar manualmente, Firebase maneja esto
        return true;
      }
      
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión con Google';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
