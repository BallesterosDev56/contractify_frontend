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
  includeAuditPage?: boolean; // Backend espera 'includeAuditPage', default: true
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
  contractIds: string[]; // Backend solo espera contractIds según OpenAPI
}

// Backend retorna application/zip (blob), no JSON según OpenAPI spec
