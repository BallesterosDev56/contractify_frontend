/**
 * Tipos relacionados con firmas electrónicas
 */

import type { Signature, SignatureCertificate, Contract, Party } from './contract.types';

export interface SignRequest {
  contractId: string;
  partyId: string;
  evidence?: SignatureEvidence; // Opcional según OpenAPI
}

export interface SignResponse {
  signatureId: string;
  documentHash: string;
  signedAt: string;
  certificateUrl: string;
}

export interface SignGuestRequest {
  token: string;
  evidence?: SignatureEvidence; // Opcional según OpenAPI
}

export interface SignGuestResponse {
  signature: Signature;
  certificate: SignatureCertificate;
  contract: Contract;
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
