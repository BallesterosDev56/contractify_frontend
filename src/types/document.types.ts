/**
 * Tipos relacionados con documentos y archivos
 */

export interface Document {
  id: string;
  contractId: string;
  type: 'draft' | 'final' | 'signed';
  format: 'html' | 'pdf';
  url: string;
  hash: string;
  size: number;
  createdAt: string;
}

export interface GeneratePDFRequest {
  contractId: string;
  includeWatermark?: boolean;
  includeSignatures?: boolean;
}

export interface GeneratePDFResponse {
  documentId: string;
  url: string;
  hash: string;
  size: number;
}

export interface DownloadRequest {
  contractId: string;
  format: 'html' | 'pdf';
  version?: number;
}

export interface BulkDownloadRequest {
  contractIds: string[];
  format: 'html' | 'pdf';
}

export interface BulkDownloadResponse {
  downloadId: string;
  url: string;
  expiresAt: string;
}
