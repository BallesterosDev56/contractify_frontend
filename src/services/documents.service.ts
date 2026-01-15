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
  DownloadRequest,
  BulkDownloadRequest,
  BulkDownloadResponse,
} from '@/types';

/**
 * Genera un PDF a partir de un contrato
 * TODO: Implementar opciones de personalización (watermark, firmas, etc.)
 * TODO: Implementar progreso de generación
 */
export const generatePDFService = (data: GeneratePDFRequest): Promise<GeneratePDFResponse> => {
  return apiPost<GeneratePDFResponse>(API_ENDPOINTS.DOCUMENTS.GENERATE_PDF, data);
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
 * Descarga múltiples documentos en un archivo comprimido
 * TODO: Implementar seguimiento de progreso
 */
export const bulkDownloadService = (data: BulkDownloadRequest): Promise<BulkDownloadResponse> => {
  return apiPost<BulkDownloadResponse>(API_ENDPOINTS.CONTRACTS.BULK_DOWNLOAD, data);
};
