/**
 * Tipos relacionados con autenticación y usuarios
 */

// User alineado con OpenAPI User schema
export interface User {
  id: string;
  email: string; // format: email
  firstName?: string; // nullable
  lastName?: string; // nullable
  role: string; // default: 'USER'
  preferences?: Record<string, unknown>; // nullable, tipo object genérico
  createdAt?: string; // nullable, ISO date-time
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  contractUpdates: boolean;
  signatureReminders: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Session alineado con OpenAPI Session schema
export interface Session {
  id: string;
  ipAddress?: string; // nullable
  userAgent?: string; // nullable
  createdAt: string; // ISO date-time
  lastActivityAt?: string; // nullable, ISO date-time
}

// UpdateUserRequest alineado con OpenAPI
export interface UpdateUserRequest {
  firstName?: string; // nullable
  lastName?: string; // nullable
}
