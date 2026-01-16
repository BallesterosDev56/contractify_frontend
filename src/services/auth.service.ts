/**
 * Servicio de autenticación
 *
 * Maneja todas las operaciones relacionadas con autenticación:
 * - Login
 * - Registro
 * - Recuperación de contraseña
 * - Gestión de sesiones
 */

import { apiPost, apiGet, apiPatch, apiDelete } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ConfirmResetPasswordRequest,
  ChangePasswordRequest,
  User,
  Session,
} from '@/types';

/**
 * Inicia sesión con email y contraseña
 * TODO: Implementar integración con Azure AD B2C OAuth
 * TODO: Manejar refresh token automático
 */
export const loginService = (credentials: LoginRequest): Promise<LoginResponse> => {
  return apiPost<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);
};

/**
 * Registra un nuevo usuario
 * TODO: Validar formato de email antes de enviar
 * TODO: Implementar verificación de fortaleza de contraseña
 */
export const registerService = (data: RegisterRequest): Promise<RegisterResponse> => {
  return apiPost<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
};

/**
 * Cierra sesión del usuario actual
 * TODO: Invalidar token en el backend
 * TODO: Limpiar datos locales
 */
export const logoutService = (): Promise<void> => {
  return apiPost<void>(API_ENDPOINTS.AUTH.LOGOUT);
};

/**
 * Solicita recuperación de contraseña
 */
export const resetPasswordService = (data: ResetPasswordRequest): Promise<{ success: boolean }> => {
  return apiPost<{ success: boolean }>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
};

/**
 * Confirma la recuperación de contraseña con el token
 */
export const confirmResetPasswordService = (data: ConfirmResetPasswordRequest): Promise<{ success: boolean }> => {
  return apiPost<{ success: boolean }>(API_ENDPOINTS.AUTH.CONFIRM_RESET, data);
};

/**
 * Obtiene la información del usuario actual
 */
export const getCurrentUserService = (): Promise<User> => {
  return apiGet<User>(API_ENDPOINTS.USERS.ME);
};

/**
 * Actualiza la información del usuario actual
 */
export const updateUserService = (data: Partial<User>): Promise<User> => {
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
