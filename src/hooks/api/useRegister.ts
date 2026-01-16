/**
 * Hook para gestionar el registro de nuevos usuarios con Firebase
 *
 * @description Maneja el flujo de registro:
 * - Validación de datos del formulario
 * - Creación de cuenta con Firebase Auth
 * - Actualización de perfil con nombre y apellido
 * - Envío automático de email de verificación
 */

import { useState } from 'react';
import { registerWithEmailAndPassword } from '@/services/firebase.auth.service';
import type { RegisterRequest } from '@/types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await registerWithEmailAndPassword(data);
      
      if (userCredential.user) {
        // El estado de autenticación se actualizará automáticamente mediante onAuthStateChanged
        // El email de verificación se envía automáticamente en el servicio
        return true;
      }
      
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
