/**
 * Configuración de Axios para la aplicación
 *
 * Incluye interceptores para:
 * - Autenticación automática con tokens de Firebase
 * - Manejo de errores centralizado
 * - Configuración base de la API
 */

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE } from '@/constants/api.constants';
import { firebaseAuth } from '@/auth/firebase';

/**
 * Instancia de Axios configurada para la API
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de solicitudes
 * Agrega automáticamente el token de autenticación de Firebase
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Obtener token de Firebase si hay un usuario autenticado
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        const token = await user.getIdToken();
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error obteniendo token de Firebase:', error);
      }
    }

    // Para requests blob, remover Content-Type solo si ya está configurado como blob
    // El responseType debe ser configurado en la llamada individual, no aquí
    if (config.responseType === 'blob' && config.headers) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas
 * Maneja errores de forma centralizada
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Manejar errores específicos de Axios
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const status = error.response.status;

      // Si la respuesta es un blob (error en descarga), intentar leer el mensaje de error
      if (error.response.data instanceof Blob) {
        try {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          const errorMessage = json?.message || json?.error || `Error ${status}: ${error.response.statusText}`;
          return Promise.reject(new Error(errorMessage));
        } catch {
          // Si no se puede parsear, usar el mensaje genérico
          return Promise.reject(new Error(`Error ${status}: ${error.response.statusText}`));
        }
      }

      // Para respuestas JSON normales
      const data = error.response.data as { message?: string; error?: string };
      const errorMessage =
        data?.message ||
        data?.error ||
        `Error ${status}: ${error.response.statusText}`;

      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      return Promise.reject(new Error('Error de conexión. Verifica tu internet'));
    } else {
      // Algo pasó al configurar la solicitud
      return Promise.reject(error);
    }
  }
);
