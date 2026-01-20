/**
 * Utilidades para llamadas API
 *
 * Migrado a Axios para mejor manejo de errores y configuración centralizada
 */

import { apiClient } from './axios.config';
import type { AxiosRequestConfig } from 'axios';

/**
 * Maneja errores de respuesta de la API
 * Los errores ya son manejados por el interceptor de Axios, pero mantenemos esta función
 * por compatibilidad con código existente
 */
export const handleApiError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  return new Error('Error desconocido en la API');
};

/**
 * Wrapper genérico para llamadas GET
 * Soporta respuestas blob para descargas de archivos
 */
export const apiGet = <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
  const config: AxiosRequestConfig = {
    params,
  };

  // Detectar si es una petición blob
  const isBlobRequest =
    endpoint.includes('/download') ||
    endpoint.includes('/export') ||
    endpoint.includes('/certificate');

  if (isBlobRequest) {
    config.responseType = 'blob';
  }

  return apiClient.get<T>(endpoint, config).then((response) => response.data);
};

/**
 * Wrapper genérico para llamadas POST
 * Soporta respuestas blob para descargas de archivos (ej: bulk-download)
 */
export const apiPost = <T>(endpoint: string, data?: unknown): Promise<T> => {
  const isBlobRequest = endpoint.includes('/bulk-download');

  const config: AxiosRequestConfig = {};

  if (isBlobRequest) {
    config.responseType = 'blob';
    // Para bulk-download, enviar como FormData si es necesario, o como JSON
    // El interceptor ya maneja el Content-Type
  }

  return apiClient.post<T>(endpoint, data, config).then((response) => response.data);
};

/**
 * Wrapper genérico para llamadas PATCH
 */
export const apiPatch = <T>(endpoint: string, data?: unknown): Promise<T> => {
  return apiClient.patch<T>(endpoint, data).then((response) => response.data);
};

/**
 * Wrapper genérico para llamadas DELETE
 */
export const apiDelete = <T>(endpoint: string): Promise<T> => {
  return apiClient.delete<T>(endpoint).then((response) => response.data);
};
