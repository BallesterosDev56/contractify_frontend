/**
 * Utilidades para llamadas API
 */

import $ from 'jquery';
import { API_BASE } from '@/constants/api.constants';
import { STORAGE_KEYS } from '@/constants/app.constants';

/**
 * Obtiene los headers de autenticación
 * TODO: Implementar refresh token automático cuando expire
 */
export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  return {
    'Authorization': `Bearer ${token || ''}`,
    'Content-Type': 'application/json',
  };
};

/**
 * Maneja errores de respuesta de la API
 * TODO: Implementar manejo específico por código de error
 * TODO: Implementar logging de errores
 */
export const handleApiError = (error: unknown): Error => {
  // TODO: Parsear error de jQuery AJAX
  // TODO: Extraer mensaje de error del backend
  // TODO: Mapear códigos HTTP a mensajes amigables
  if (error instanceof Error) {
    return error;
  }
  return new Error('Error desconocido en la API');
};

/**
 * Wrapper genérico para llamadas AJAX GET
 * Soporta respuestas blob para descargas de archivos
 * TODO: Implementar retry logic
 * TODO: Implementar timeout configurable
 */
export const apiGet = <T>(endpoint: string, params?: Record<string, unknown>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const headers = getAuthHeaders();
    // Remover Content-Type para respuestas blob
    const isBlobRequest = endpoint.includes('/download') || endpoint.includes('/export') || endpoint.includes('/certificate');

    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: 'GET',
      data: params,
      headers: isBlobRequest ? { 'Authorization': headers['Authorization'] } : headers,
      xhrFields: isBlobRequest ? { responseType: 'blob' } : undefined,
      success: (data: T) => resolve(data),
      error: (_xhr, _status, error) => reject(handleApiError(error)),
    });
  });
};

/**
 * Wrapper genérico para llamadas AJAX POST
 * Soporta respuestas blob para descargas de archivos (ej: bulk-download)
 * TODO: Implementar validación de datos antes de enviar
 * TODO: Implementar retry logic para errores transitorios
 */
export const apiPost = <T>(endpoint: string, data?: unknown): Promise<T> => {
  return new Promise((resolve, reject) => {
    const headers = getAuthHeaders();
    const isBlobRequest = endpoint.includes('/bulk-download');

    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: 'POST',
      contentType: isBlobRequest ? undefined : 'application/json',
      data: isBlobRequest ? data : JSON.stringify(data),
      headers: isBlobRequest ? { 'Authorization': headers['Authorization'] } : headers,
      xhrFields: isBlobRequest ? { responseType: 'blob' } : undefined,
      success: (response: T) => resolve(response),
      error: (_xhr, _status, error) => reject(handleApiError(error)),
    });
  });
};

/**
 * Wrapper genérico para llamadas AJAX PATCH
 */
export const apiPatch = <T>(endpoint: string, data?: unknown): Promise<T> => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(data),
      headers: getAuthHeaders(),
      success: (response: T) => resolve(response),
      error: (_xhr, _status, error) => reject(handleApiError(error)),
    });
  });
};

/**
 * Wrapper genérico para llamadas AJAX DELETE
 */
export const apiDelete = <T>(endpoint: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${API_BASE}${endpoint}`,
      method: 'DELETE',
      headers: getAuthHeaders(),
      success: (response: T) => resolve(response),
      error: (_xhr, _status, error) => reject(handleApiError(error)),
    });
  });
};
