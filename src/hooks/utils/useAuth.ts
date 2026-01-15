/**
 * Hook de utilidad para gestión de autenticación
 *
 * @description Proporciona funcionalidades de autenticación:
 * - Verificación de usuario autenticado
 * - Obtención de token
 * - Logout
 *
 * TODO: Implementar verificación de expiración de token
 * TODO: Implementar refresh automático de token
 */

import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants/app.constants';
import type { User } from '@/types';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        // TODO: Manejar error de parseo
        setIsAuthenticated(false);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return { isAuthenticated, user, token, logout };
};
