/**
 * Hook para enviar invitaciones para firmar contratos
 *
 * @description Maneja el envío de invitaciones:
 * - Creación de token de firma
 * - Envío de email con link de firma
 * - Personalización de mensaje
 *
 * TODO: Implementar personalización de mensaje
 * TODO: Implementar selección de plantilla de email
 * TODO: Implementar programación de recordatorios
 */

import { useState } from 'react';
import { sendInvitationService } from '@/services/notification.service';
import type { SendInvitationRequest, SendInvitationResponse } from '@/types';

export const useSendInvitation = () => {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendInvitation = async (request: SendInvitationRequest): Promise<SendInvitationResponse | null> => {
    setIsSending(true);
    setError(null);

    try {
      const response = await sendInvitationService(request);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar invitación';
      setError(errorMessage);
      return null;
    } finally {
      setIsSending(false);
    }
  };

  return { sendInvitation, isSending, error };
};
