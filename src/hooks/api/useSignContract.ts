/**
 * Hook para gestionar la firma de contratos
 *
 * @description Maneja el proceso de firma:
 * - Firma de contratos por usuarios autenticados
 * - Captura de evidencia (IP, User-Agent, timestamp)
 * - Manejo de consentimiento
 *
 * TODO: Implementar captura automática de IP y User-Agent
 * TODO: Implementar validación de consentimiento antes de firmar
 * TODO: Implementar confirmación visual antes de firmar
 */

import { useState } from 'react';
import { signContractService } from '@/services/signature.service';
import type { SignRequest, SignResponse } from '@/types';

export const useSignContract = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signContract = async (request: SignRequest): Promise<SignResponse | null> => {
    setIsSigning(true);
    setError(null);

    try {
      // TODO: Capturar IP y User-Agent automáticamente
      const response = await signContractService(request);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al firmar contrato';
      setError(errorMessage);
      return null;
    } finally {
      setIsSigning(false);
    }
  };

  return { signContract, isSigning, error };
};
