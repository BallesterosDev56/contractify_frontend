/**
 * Tipos relacionados con notificaciones
 */

// SendInvitationRequest alineado con OpenAPI
export interface SendInvitationRequest {
  contractId: string;
  partyId: string;
  message?: string; // nullable
}

export interface SendInvitationResponse {
  invitationId: string;
  sentAt: string; // ISO date-time string
}

// NotificationTemplate alineado con OpenAPI
export interface NotificationTemplate {
  id: string;
  name: string;
  description?: string; // nullable
}

export interface NotificationSettings {
  email: boolean;
  contractUpdates: boolean;
  signatureReminders: boolean;
  reminderFrequency?: 'daily' | 'weekly' | 'custom';
}
