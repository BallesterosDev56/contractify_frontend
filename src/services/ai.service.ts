/**
 * Servicio de generación de documentos mediante IA
 *
 * Maneja todas las operaciones relacionadas con IA:
 * - Generación de contratos
 * - Regeneración de contenido
 * - Validación de inputs
 */

import { apiPost } from '@/utils/api.utils';
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
 * Genera un contrato usando IA basado en el tipo y datos del formulario
 * TODO: Implementar progreso de generación (streaming si está disponible)
 * TODO: Implementar caché de respuestas similares
 */
export const generateContractService = (data: GenerateContractRequest): Promise<GenerateContractResponse> => {
  return apiPost<GenerateContractResponse>(API_ENDPOINTS.AI.GENERATE, data);
};

/**
 * Regenera el contenido de un contrato existente
 * TODO: Permitir regenerar solo secciones específicas
 */
export const regenerateContractService = (data: RegenerateRequest): Promise<RegenerateResponse> => {
  return apiPost<RegenerateResponse>(API_ENDPOINTS.AI.REGENERATE, data);
};

/**
 * Valida los datos del formulario antes de generar el contrato
 * TODO: Implementar validación en tiempo real mientras el usuario escribe
 */
export const validateInputService = (data: ValidateInputRequest): Promise<ValidateInputResponse> => {
  return apiPost<ValidateInputResponse>(API_ENDPOINTS.AI.VALIDATE_INPUT, data);
};
