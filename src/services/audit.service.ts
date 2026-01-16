/**
 * Servicio de auditoría
 *
 * Maneja operaciones relacionadas con auditoría:
 * - Obtener trail de auditoría de contratos
 * - Exportar trail de auditoría
 */

import { apiGet } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';

/**
 * Obtiene el trail de auditoría de un contrato
 */
export const getTrailService = async (contractId: string): Promise<unknown[]> => {
  const response = await apiGet<unknown[]>(API_ENDPOINTS.AUDIT.TRAIL(contractId));
  return Array.isArray(response) ? response : [];
};

/**
 * Exporta el trail de auditoría de un contrato
 */
export const exportTrailService = (contractId: string): Promise<Blob> => {
  // Note: This may need special handling for blob responses
  return apiGet<Blob>(API_ENDPOINTS.AUDIT.EXPORT(contractId));
};
