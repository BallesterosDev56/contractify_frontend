/**
 * Servicio de autenticación
 *
 * NOTA: La autenticación se maneja completamente con Firebase Auth.
 * Este servicio solo contiene funciones relacionadas con la gestión de usuarios
 * que requieren comunicación con el BFF (como actualizar perfil, cambiar contraseña, etc.)
 *
 * Para login, registro y logout, usar los servicios de Firebase directamente:
 * - @/services/firebase.auth.service
 * - @/hooks/api/useLogin
 * - @/hooks/api/useRegister
 */

import { apiPost, apiGet, apiPatch, apiDelete } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  ChangePasswordRequest,
  User,
  Session,
} from '@/types';

// Auth endpoints removed - Firebase handles authentication directly
// The following endpoints don't exist in the OpenAPI spec (docu.yaml):
// - /auth/login
// - /auth/register
// - /auth/logout
// - /auth/reset-password
// - /auth/confirm-reset
// - /auth/refresh-token
//
// Use Firebase Auth services instead:
// - loginWithEmailAndPassword() from @/services/firebase.auth.service
// - registerWithEmailAndPassword() from @/services/firebase.auth.service
// - logoutUser() from @/services/firebase.auth.service
// - sendPasswordReset() from @/services/firebase.auth.service

/**
 * Obtiene la información del usuario actual
 */
export const getCurrentUserService = (): Promise<User> => {
  return apiGet<User>(API_ENDPOINTS.USERS.ME);
};

/**
 * Actualiza la información del usuario actual
 * Solo acepta firstName y lastName (nullable) según OpenAPI UpdateUserRequest
 */
export const updateUserService = (data: { firstName?: string; lastName?: string }): Promise<User> => {
  return apiPatch<User>(API_ENDPOINTS.USERS.UPDATE, data);
};

/**
 * Cambia la contraseña del usuario actual
 */
export const changePasswordService = (data: ChangePasswordRequest): Promise<{ success: boolean }> => {
  return apiPost<{ success: boolean }>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, data);
};

/**
 * Obtiene todas las sesiones activas del usuario
 */
export const getSessionsService = (): Promise<Session[]> => {
  return apiGet<Session[]>(API_ENDPOINTS.USERS.SESSIONS);
};

/**
 * Elimina una sesión específica
 */
export const deleteSessionService = (sessionId: string): Promise<void> => {
  return apiDelete<void>(API_ENDPOINTS.USERS.DELETE_SESSION(sessionId));
};

// Note: getUserPreferences removed - only PATCH /users/preferences exists
