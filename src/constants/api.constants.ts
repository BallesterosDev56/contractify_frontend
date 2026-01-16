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
    SESSIONS: '/users/me/sessions',
    DELETE_SESSION: (sessionId: string) => `/users/me/sessions/${sessionId}`,
    PREFERENCES: '/users/me/preferences',
  },

  // Contracts
  CONTRACTS: {
    LIST: '/contracts',
    CREATE: '/contracts',
    GET: (contractId: string) => `/contracts/${contractId}`,
    UPDATE: (contractId: string) => `/contracts/${contractId}`,
    DELETE: (contractId: string) => `/contracts/${contractId}`,
    CONTENT: (contractId: string) => `/contracts/${contractId}/content`,
    STATUS: (contractId: string) => `/contracts/${contractId}/status`,
    TRANSITIONS: (contractId: string) => `/contracts/${contractId}/transitions`,
    PARTIES: (contractId: string) => `/contracts/${contractId}/parties`,
    PARTY: (contractId: string, partyId: string) => `/contracts/${contractId}/parties/${partyId}`,
    HISTORY: (contractId: string) => `/contracts/${contractId}/history`,
    DUPLICATE: (contractId: string) => `/contracts/${contractId}/duplicate`,
    RECENT: '/contracts/recent',
    STATS: '/contracts/stats',
    PENDING: '/contracts/pending',
    PUBLIC: (contractId: string, token?: string) =>
      token ? `/contracts/${contractId}/public?token=${token}` : `/contracts/${contractId}/public`,
    VERSIONS: (contractId: string) => `/contracts/${contractId}/versions`,
    TYPES: '/contracts/types',
    TEMPLATES: '/contracts/templates',
    TEMPLATE: (templateId: string) => `/contracts/templates/${templateId}`,
    TYPE_SCHEMA: (type: string) => `/contracts/types/${type}/schema`,
    BULK_DOWNLOAD: '/contracts/bulk-download',
  },

  // AI
  AI: {
    GENERATE: '/ai/generate-contract',
    REGENERATE: '/ai/regenerate',
    VALIDATE_INPUT: '/ai/validate-input',
    JOB: (jobId: string) => `/ai/jobs/${jobId}`,
  },

  // Signatures
  SIGNATURES: {
    SIGN: '/signatures/sign',
    SIGN_GUEST: '/signatures/sign-guest',
    VALIDATE_TOKEN: (token: string) => `/signatures/validate-token?token=${token}`,
    EVIDENCE: (signatureId: string) => `/signatures/${signatureId}/evidence`,
    CERTIFICATE: (signatureId: string) => `/signatures/${signatureId}/certificate`,
    LIST: (contractId: string) => `/contracts/${contractId}/signatures`,
    CREATE_TOKEN: '/signatures/create-token',
  },

  // Notifications
  NOTIFICATIONS: {
    SEND_INVITATION: '/notifications/send-invitation',
    TEMPLATES: '/notifications/templates',
    CANCEL_INVITATION: (invitationId: string) => `/notifications/invitations/${invitationId}/cancel`,
    RESEND_INVITATION: (invitationId: string) => `/notifications/invitations/${invitationId}/resend`,
    SCHEDULE_REMINDER: '/notifications/reminders',
  },

  // Documents
  DOCUMENTS: {
    GENERATE_PDF: '/documents/generate-pdf',
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
    VERIFY: (documentId: string) => `/documents/${documentId}/verify`,
    JOB: (jobId: string) => `/documents/jobs/${jobId}`,
  },

  // Audit
  AUDIT: {
    TRAIL: (contractId: string) => `/audit/contracts/${contractId}/trail`,
    EXPORT: (contractId: string) => `/audit/contracts/${contractId}/export`,
  },
} as const;
