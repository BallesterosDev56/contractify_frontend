/**
 * Tipos relacionados con notificaciones
 */

export interface SendInvitationRequest {
  contractId: string;
  partyId: string;
  email: string;
  message?: string;
  templateId?: string;
}

export interface SendInvitationResponse {
  invitationId: string;
  sentAt: string; // ISO date-time string
}

export interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
}

export interface NotificationSettings {
  email: boolean;
  contractUpdates: boolean;
  signatureReminders: boolean;
  reminderFrequency?: 'daily' | 'weekly' | 'custom';
}
