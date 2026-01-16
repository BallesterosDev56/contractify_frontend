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
 * Backend usa GET con query parameter, no POST con body
 */
export const validateTokenService = (token: string): Promise<ValidateTokenResponse> => {
  return apiGet<ValidateTokenResponse>(API_ENDPOINTS.SIGNATURES.VALIDATE_TOKEN(token));
};

/**
 * Obtiene todas las firmas de un contrato
 */
export const getContractSignaturesService = (contractId: string): Promise<Signature[]> => {
  return apiGet<Signature[]>(API_ENDPOINTS.SIGNATURES.LIST(contractId));
};

/**
 * Crea un token de firma para un invitado
 * @param expiresInMinutes Opcional, default: 1440 (24 horas)
 */
export const createSignatureTokenService = (
  contractId: string,
  partyId: string,
  expiresInMinutes?: number
): Promise<SignatureToken> => {
  return apiPost<SignatureToken>(API_ENDPOINTS.SIGNATURES.CREATE_TOKEN, {
    contractId,
    partyId,
    ...(expiresInMinutes && { expiresInMinutes })
  });
};

/**
 * Obtiene la evidencia de una firma
 */
export const getEvidenceService = async (signatureId: string): Promise<unknown> => {
  return apiGet<unknown>(API_ENDPOINTS.SIGNATURES.EVIDENCE(signatureId));
};

/**
 * Almacena evidencia de una firma
 */
export const storeEvidenceService = (signatureId: string, evidence: unknown): Promise<unknown> => {
  return apiPost<unknown>(API_ENDPOINTS.SIGNATURES.EVIDENCE(signatureId), evidence);
};

/**
 * Obtiene el certificado de una firma
 */
export const getCertificateService = (signatureId: string): Promise<Blob> => {
  // Note: This may need special handling for blob responses
  return apiGet<Blob>(API_ENDPOINTS.SIGNATURES.CERTIFICATE(signatureId));
};
