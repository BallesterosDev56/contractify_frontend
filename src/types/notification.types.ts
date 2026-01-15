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
  success: boolean;
  token: string;
  expiresAt: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'signature_invitation' | 'reminder' | 'completed' | 'expired';
}

export interface NotificationSettings {
  email: boolean;
  contractUpdates: boolean;
  signatureReminders: boolean;
  reminderFrequency?: 'daily' | 'weekly' | 'custom';
}
