/**
 * Servicio de generación de documentos mediante IA
 *
 * Maneja todas las operaciones relacionadas con IA:
 * - Generación de contratos
 * - Regeneración de contenido
 * - Validación de inputs
 */

import { apiPost, apiGet } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  GenerateContractRequest,
  GenerateContractResponse,
  ValidateInputRequest,
  ValidateInputResponse,
  RegenerateRequest,
  RegenerateResponse,
} from '@/types';

/**
 * Polling para verificar el estado de un job de IA
 */
const pollJob = async (
  jobId: string,
  onProgress?: (progress: number) => void,
  maxAttempts: number = 60,
  intervalMs: number = 5000
): Promise<unknown> => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const res = await apiGet<{ status: string; progress?: number; result?: unknown; error?: string }>(
        API_ENDPOINTS.AI.JOB(jobId)
      );

      if (onProgress && res.progress !== undefined) {
        onProgress(res.progress);
      }

      if (res.status === 'COMPLETED') {
        return res.result;
      }

      if (res.status === 'FAILED') {
        throw new Error(res.error || 'Job failed');
      }

      // Si está en progreso, esperar antes del siguiente intento
      await new Promise(resolve => setTimeout(resolve, intervalMs));
      attempts++;
    } catch (error) {
      if (attempts >= maxAttempts - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
      attempts++;
    }
  }

  throw new Error('Timeout waiting for job to complete');
};

/**
 * Genera un contrato usando IA basado en el tipo y datos del formulario
 * Soporta jobs asíncronos con polling automático
 *
 * Adapta los datos del frontend al formato del backend:
 * - El frontend puede enviar formData/context, pero el backend espera inputs/jurisdiction
 */
export const generateContractService = async (
  data: GenerateContractRequest,
  onProgress?: (progress: number) => void
): Promise<GenerateContractResponse> => {
  // El tipo GenerateContractRequest ya está actualizado para coincidir con el backend
  // (contractId, templateId, contractType, jurisdiction, inputs)
  const res = await apiPost<GenerateContractResponse | { jobId: string; status?: string; pollUrl?: string }>(API_ENDPOINTS.AI.GENERATE, data);

  // Si retorna jobId (202 Accepted), hacer polling
  if (res && typeof res === 'object' && 'jobId' in res) {
    const result = await pollJob((res as { jobId: string }).jobId, onProgress);
    return result as GenerateContractResponse;
  }

  return res as GenerateContractResponse;
};

/**
 * Regenera el contenido de un contrato existente
 * Soporta jobs asíncronos con polling automático
 *
 * El tipo RegenerateRequest ya está actualizado para coincidir con el backend:
 * - feedback (no instructions)
 * - preserveStructure (opcional)
 */
export const regenerateContractService = async (
  data: RegenerateRequest,
  onProgress?: (progress: number) => void
): Promise<RegenerateResponse> => {
  // El tipo RegenerateRequest ya coincide con el backend (contractId, feedback, preserveStructure)
  const res = await apiPost<RegenerateResponse | { jobId: string; status?: string; pollUrl?: string }>(API_ENDPOINTS.AI.REGENERATE, data);

  // Si retorna jobId (202 Accepted), hacer polling
  if (res && typeof res === 'object' && 'jobId' in res) {
    const result = await pollJob((res as { jobId: string }).jobId, onProgress);
    return result as RegenerateResponse;
  }

  return res as RegenerateResponse;
};

/**
 * Valida los datos del formulario antes de generar el contrato
 * TODO: Implementar validación en tiempo real mientras el usuario escribe
 */
export const validateInputService = (data: ValidateInputRequest): Promise<ValidateInputResponse> => {
  return apiPost<ValidateInputResponse>(API_ENDPOINTS.AI.VALIDATE_INPUT, data);
};
