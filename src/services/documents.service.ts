/**
 * Servicio de documentos
 *
 * Maneja operaciones relacionadas con documentos:
 * - Generación de PDFs
 * - Descarga de documentos
 * - Descarga masiva
 */

import { apiPost, apiGet } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  GeneratePDFRequest,
  GeneratePDFResponse,
  BulkDownloadRequest,
} from '@/types';

/**
 * Polling para verificar el estado de un job de documentos
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
        API_ENDPOINTS.DOCUMENTS.JOB(jobId)
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
 * Genera un PDF a partir de un contrato
 * Soporta jobs asíncronos con polling automático
 * Backend retorna 202 con jobId cuando es asíncrono
 */
export const generatePDFService = async (
  data: GeneratePDFRequest,
  onProgress?: (progress: number) => void
): Promise<GeneratePDFResponse> => {
  const res = await apiPost<GeneratePDFResponse | { jobId: string; status?: string; pollUrl?: string }>(API_ENDPOINTS.DOCUMENTS.GENERATE_PDF, data);

  // Si retorna jobId (202 Accepted), hacer polling
  if (res && typeof res === 'object' && 'jobId' in res) {
    const result = await pollJob((res as { jobId: string }).jobId, onProgress);
    return result as GeneratePDFResponse;
  }

  return res as GeneratePDFResponse;
};

/**
 * Descarga un documento específico
 * TODO: Manejar diferentes formatos (HTML, PDF)
 */
export const downloadDocumentService = (documentId: string): Promise<Blob> => {
  // TODO: Implementar descarga de archivo binario
  return apiGet<Blob>(API_ENDPOINTS.DOCUMENTS.DOWNLOAD(documentId));
};

/**
 * Descarga múltiples documentos en un archivo comprimido (ZIP)
 * Backend retorna application/zip según OpenAPI spec
 */
export const bulkDownloadService = (data: BulkDownloadRequest): Promise<Blob> => {
  return apiPost<Blob>(API_ENDPOINTS.CONTRACTS.BULK_DOWNLOAD, data);
};

/**
 * Verifica un documento (integridad y firmas)
 * Backend espera POST según OpenAPI spec
 */
export const verifyDocumentService = (documentId: string): Promise<unknown> => {
  return apiPost<unknown>(API_ENDPOINTS.DOCUMENTS.VERIFY(documentId));
};
