/**
 * Constantes generales de la aplicación
 */

export const APP_NAME = 'Contractify';

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user_data',
} as const;

export const ROUTES = {
  // Public
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_EMAIL: '/verify-email',
  RESET_PASSWORD: '/reset-password',
  SIGN_GUEST: '/sign/:token',

  // Private
  DASHBOARD: '/dashboard',
  CONTRACTS: '/contracts',
  CONTRACT_DETAIL: '/contracts/:id',
  NEW_CONTRACT: '/contracts/new',
  CONTRACT_FORM: '/contracts/new/:type/form',
  CONTRACT_PREVIEW: '/contracts/:id/preview',
  SEND_CONTRACT: '/contracts/:id/send',
  SETTINGS: '/settings',
} as const;

export const CONTRACT_STATUS_LABELS: Record<string, string> = {
  draft: 'Borrador',
  pending: 'Pendiente',
  partial: 'Parcialmente firmado',
  completed: 'Completado',
  cancelled: 'Cancelado',
  expired: 'Expirado',
};

export const CONTRACT_TYPE_LABELS: Record<string, string> = {
  service: 'Contrato de Servicios',
  employment: 'Contrato de Trabajo',
  nda: 'Acuerdo de Confidencialidad',
  partnership: 'Contrato de Asociación',
  supplier: 'Contrato con Proveedor',
  client: 'Contrato con Cliente',
  lease: 'Contrato de Arrendamiento',
  custom: 'Contrato Personalizado',
};
