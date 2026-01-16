/**
 * Hook de utilidad para gestión de autenticación con Firebase
 *
 * @description Proporciona funcionalidades de autenticación:
 * - Escucha el estado de autenticación de Firebase
 * - Verificación de usuario autenticado
 * - Obtención de token
 * - Logout
 * - Refresh automático de token
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { firebaseAuth } from '@/auth/firebase';
import { logoutUser, getIdToken, mapFirebaseUserToAppUser } from '@/services/firebase.auth.service';
import type { User } from '@/types';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser: FirebaseUser | null) => {
      setIsLoading(true);

      if (firebaseUser) {
        // Usuario autenticado
        const appUser = mapFirebaseUserToAppUser(firebaseUser);
        setUser(appUser);
        setIsAuthenticated(true);

        // Obtener token de Firebase
        try {
          const idToken = await getIdToken();
          setToken(idToken);
        } catch (error) {
          console.error('Error obteniendo token:', error);
          setToken(null);
        }
      } else {
        // Usuario no autenticado
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
      }

      setIsLoading(false);
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      // El estado se actualizará automáticamente mediante onAuthStateChanged
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const newToken = await getIdToken(true);
      setToken(newToken);
      return newToken;
    } catch (error) {
      console.error('Error refrescando token:', error);
      return null;
    }
  };

  return { isAuthenticated, user, token, isLoading, logout, refreshToken };
};
