/**
 * Tipos relacionados con autenticación y usuarios
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  preferences?: UserPreferences;
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

export interface Session {
  id: string;
  device: string;
  ipAddress: string;
  lastActivity: string;
  createdAt: string;
}
