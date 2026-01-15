/**
 * Hook para gestionar el registro de nuevos usuarios
 *
 * @description Maneja el flujo de registro:
 * - Validación de datos del formulario
 * - Creación de cuenta
 * - Envío de email de verificación
 *
 * TODO: Implementar validación de email único antes de enviar
 * TODO: Implementar verificación de fortaleza de contraseña
 */

import { useState } from 'react';
import { registerService } from '@/services/auth.service';
import type { RegisterRequest, RegisterResponse } from '@/types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest): Promise<RegisterResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await registerService(data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};
