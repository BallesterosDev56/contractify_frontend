/**
 * Hook para obtener el usuario actual
 *
 * @description Maneja la obtención de datos del usuario autenticado:
 * - Carga de datos del usuario
 * - Actualización cuando cambian los datos
 *
 * TODO: Implementar caché de datos del usuario
 * TODO: Implementar actualización automática cuando cambian los datos
 */

import { useState, useEffect } from 'react';
import { getCurrentUserService } from '@/services/auth.service';
import type { User } from '@/types';

export const useGetCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCurrentUserService();
      setUser(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener usuario';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, isLoading, error, refetch: fetchUser };
};
