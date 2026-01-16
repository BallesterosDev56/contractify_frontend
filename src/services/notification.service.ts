/**
 * Servicio de notificaciones
 *
 * Maneja el envío de notificaciones:
 * - Invitaciones para firmar contratos
 * - Recordatorios
 * - Notificaciones de estado
 */

import { apiPost, apiGet } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  SendInvitationRequest,
  SendInvitationResponse,
  NotificationTemplate,
} from '@/types';

/**
 * Envía una invitación para firmar un contrato
 * TODO: Implementar personalización de mensaje
 * TODO: Implementar programación de recordatorios
 */
export const sendInvitationService = (data: SendInvitationRequest): Promise<SendInvitationResponse> => {
  return apiPost<SendInvitationResponse>(API_ENDPOINTS.NOTIFICATIONS.SEND_INVITATION, data);
};

/**
 * Obtiene las plantillas de notificaciones disponibles
 */
export const getNotificationTemplatesService = (): Promise<NotificationTemplate[]> => {
  return apiGet<NotificationTemplate[]>(API_ENDPOINTS.NOTIFICATIONS.TEMPLATES);
};

/**
 * Cancela una invitación
 */
export const cancelInvitationService = (invitationId: string): Promise<unknown> => {
  return apiPost<unknown>(API_ENDPOINTS.NOTIFICATIONS.CANCEL_INVITATION(invitationId));
};

/**
 * Reenvía una invitación
 */
export const resendInvitationService = (invitationId: string): Promise<unknown> => {
  return apiPost<unknown>(API_ENDPOINTS.NOTIFICATIONS.RESEND_INVITATION(invitationId));
};

/**
 * Programa un recordatorio
 */
export const scheduleReminderService = (
  contractId: string,
  partyId: string,
  scheduleAt: string
): Promise<unknown> => {
  return apiPost<unknown>(API_ENDPOINTS.NOTIFICATIONS.SCHEDULE_REMINDER, {
    contractId,
    partyId,
    scheduleAt
  });
};
