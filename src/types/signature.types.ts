/**
 * Tipos relacionados con firmas electrónicas
 */

import type { Signature, SignatureCertificate, Contract, Party } from './contract.types';

export interface SignRequest {
  contractId: string;
  partyId: string;
  consent: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface SignResponse {
  signature: Signature;
  certificate: SignatureCertificate;
  documentHash: string;
}

export interface SignGuestRequest {
  token: string;
  name: string;
  email: string;
  consent: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface SignGuestResponse {
  signature: Signature;
  certificate: SignatureCertificate;
  contract: Contract;
}

export interface SignatureToken {
  token: string;
  contractId: string;
  partyId: string;
  email: string;
  expiresAt: string;
  used: boolean;
}

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  valid: boolean;
  contract?: Contract;
  party?: Party;
  expiresAt?: string;
}

export interface SignatureEvidence {
  signatureId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  documentHash: string;
  certificate: SignatureCertificate;
}
