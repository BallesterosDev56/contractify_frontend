/**
 * Tipos relacionados con firmas electrónicas
 */

export interface SignRequest {
  contractId: string;
  partyId: string;
  evidence?: SignatureEvidence; // Opcional según OpenAPI
}

// SignResponse alineado con OpenAPI SignatureResponse
export interface SignResponse {
  signatureId: string;
  documentHash?: string; // nullable
  signedAt: string; // ISO date-time
  certificateUrl?: string; // nullable
}

export interface SignGuestRequest {
  token: string;
  evidence?: SignatureEvidence; // Opcional según OpenAPI
}

// SignGuestResponse es el mismo que SignatureResponse según OpenAPI
// Ambos endpoints retornan SignatureResponse
export interface SignGuestResponse {
  signatureId: string;
  documentHash?: string; // nullable
  signedAt: string; // ISO date-time
  certificateUrl?: string; // nullable
}

export interface SignatureToken {
  token: string;
  signUrl: string;
  expiresAt: string;
}

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  contractId?: string;
  partyId?: string;
  expiresAt?: string;
}

export interface SignatureEvidence {
  ipAddress?: string;
  userAgent?: string;
  geolocation?: string;
  signedAt?: string; // ISO date-time string
}
