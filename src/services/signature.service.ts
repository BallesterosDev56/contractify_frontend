/**
 * Servicio de firmas electrónicas
 *
 * Maneja todas las operaciones relacionadas con firmas:
 * - Firma de contratos por usuarios autenticados
 * - Firma de contratos por invitados (guest)
 * - Validación de tokens de firma
 * - Gestión de evidencia de firma
 */

import { apiPost, apiGet } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  SignRequest,
  SignResponse,
  SignGuestRequest,
  SignGuestResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
  Signature,
  SignatureToken,
} from '@/types';

/**
 * Firma un contrato como usuario autenticado
 * TODO: Capturar IP y User-Agent automáticamente
 * TODO: Implementar consentimiento explícito antes de firmar
 */
export const signContractService = (data: SignRequest): Promise<SignResponse> => {
  return apiPost<SignResponse>(API_ENDPOINTS.SIGNATURES.SIGN, data);
};

/**
 * Firma un contrato como invitado usando un token
 * TODO: Validar token antes de mostrar formulario
 */
export const signGuestService = (data: SignGuestRequest): Promise<SignGuestResponse> => {
  return apiPost<SignGuestResponse>(API_ENDPOINTS.SIGNATURES.SIGN_GUEST, data);
};

/**
 * Valida un token de firma de invitado
 */
export const validateTokenService = (data: ValidateTokenRequest): Promise<ValidateTokenResponse> => {
  return apiPost<ValidateTokenResponse>(API_ENDPOINTS.SIGNATURES.VALIDATE_TOKEN, data);
};

/**
 * Obtiene todas las firmas de un contrato
 */
export const getContractSignaturesService = (contractId: string): Promise<Signature[]> => {
  return apiGet<Signature[]>(API_ENDPOINTS.SIGNATURES.LIST(contractId));
};

/**
 * Crea un token de firma para un invitado
 * TODO: Implementar expiración configurable
 */
export const createSignatureTokenService = (contractId: string, partyId: string): Promise<SignatureToken> => {
  return apiPost<SignatureToken>(API_ENDPOINTS.SIGNATURES.CREATE_TOKEN, { contractId, partyId });
};
