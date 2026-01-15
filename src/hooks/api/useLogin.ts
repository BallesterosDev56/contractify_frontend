/**
 * Hook para gestionar el inicio de sesión
 *
 * @description Maneja el flujo de autenticación:
 * - Validación de credenciales
 * - Almacenamiento de token y datos de usuario
 * - Manejo de errores de autenticación
 *
 * TODO: Implementar integración con Azure AD B2C
 * TODO: Implementar refresh token automático
 * TODO: Implementar manejo de sesiones múltiples
 */

import { useState } from 'react';
import { loginService } from '@/services/auth.service';
import { STORAGE_KEYS } from '@/constants/app.constants';
import type { LoginRequest, LoginResponse } from '@/types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginService(credentials);

      // TODO: Guardar token y refresh token en localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
