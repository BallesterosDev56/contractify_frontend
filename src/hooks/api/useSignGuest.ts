/**
 * Hook para gestionar la firma de contratos por invitados
 *
 * @description Maneja el proceso de firma para usuarios no autenticados:
 * - Validación de token
 * - Captura de datos del firmante
 * - Firma del contrato
 *
 * TODO: Implementar validación de token antes de mostrar formulario
 * TODO: Implementar captura automática de IP y User-Agent
 */

import { useState } from 'react';
import { signGuestService, validateTokenService } from '@/services/signature.service';
import type { SignGuestRequest, SignGuestResponse, ValidateTokenRequest, ValidateTokenResponse } from '@/types';

export const useSignGuest = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateToken = async (token: string): Promise<ValidateTokenResponse | null> => {
    setIsValidating(true);
    setError(null);

    try {
      const response = await validateTokenService({ token });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Token inválido o expirado';
      setError(errorMessage);
      return null;
    } finally {
      setIsValidating(false);
    }
  };

  const signGuest = async (request: SignGuestRequest): Promise<SignGuestResponse | null> => {
    setIsSigning(true);
    setError(null);

    try {
      const response = await signGuestService(request);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al firmar contrato';
      setError(errorMessage);
      return null;
    } finally {
      setIsSigning(false);
    }
  };

  return { signGuest, validateToken, isSigning, isValidating, error };
};
