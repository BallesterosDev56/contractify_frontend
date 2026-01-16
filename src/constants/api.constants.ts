/**
 * Constantes relacionadas con la API
 */

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    RESET_PASSWORD: '/auth/reset-password',
    CONFIRM_RESET: '/auth/confirm-reset',
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  // Users
  USERS: {
    ME: '/users/me',
    UPDATE: '/users/me',
    CHANGE_PASSWORD: '/users/change-password',
    SESSIONS: '/users/sessions',
    DELETE_SESSION: (id: string) => `/users/sessions/${id}`,
    PREFERENCES: '/users/preferences',
  },

  // Contracts
  CONTRACTS: {
    LIST: '/contracts',
    CREATE: '/contracts',
    GET: (id: string) => `/contracts/${id}`,
    UPDATE: (id: string) => `/contracts/${id}`,
    DELETE: (id: string) => `/contracts/${id}`,
    DRAFT: (id: string) => `/contracts/${id}/draft`,
    DUPLICATE: (id: string) => `/contracts/${id}/duplicate`,
    RECENT: '/contracts/recent',
    STATS: '/contracts/stats',
    PENDING: '/contracts/pending',
    PUBLIC: (id: string) => `/contracts/${id}/public`,
    VERSIONS: (id: string) => `/contracts/${id}/versions`,
    TYPES: '/contracts/types',
    TEMPLATES: '/contracts/templates',
    TYPE_SCHEMA: (type: string) => `/contracts/types/${type}/schema`,
    BULK_DOWNLOAD: '/contracts/bulk-download',
  },

  // AI
  AI: {
    GENERATE: '/ai/generate-contract',
    REGENERATE: '/ai/regenerate',
    VALIDATE_INPUT: '/ai/validate-input',
  },

  // Signatures
  SIGNATURES: {
    SIGN: '/signatures/sign',
    SIGN_GUEST: '/signatures/sign-guest',
    VALIDATE_TOKEN: '/signatures/validate-token',
    EVIDENCE: '/signatures/evidence',
    LIST: (contractId: string) => `/contracts/${contractId}/signatures`,
    CREATE_TOKEN: '/signatures/create-token',
  },

  // Notifications
  NOTIFICATIONS: {
    SEND_INVITATION: '/notifications/send-invitation',
    TEMPLATES: '/notifications/templates',
  },

  // Documents
  DOCUMENTS: {
    GENERATE_PDF: '/documents/generate-pdf',
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
  },
} as const;
