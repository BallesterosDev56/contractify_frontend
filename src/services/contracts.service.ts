/**
 * Servicio de contratos
 *
 * Maneja todas las operaciones CRUD de contratos:
 * - Listado y filtrado
 * - Creación y actualización
 * - Gestión de borradores
 * - Duplicación
 * - Estadísticas
 */

import { apiGet, apiPost, apiPatch, apiDelete } from '@/utils/api.utils';
import { API_ENDPOINTS } from '@/constants/api.constants';
import type {
  Contract,
  CreateContractRequest,
  UpdateContractRequest,
  ContractFilters,
  ContractStats,
  ContractTypeDefinition,
  ContractFormSchema,
} from '@/types';

/**
 * Obtiene la lista de contratos con filtros opcionales
 * TODO: Implementar paginación
 * TODO: Implementar ordenamiento
 */
export const getContractsService = (filters?: ContractFilters): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.LIST, filters as Record<string, unknown>);
};

/**
 * Obtiene un contrato por su ID
 */
export const getContractService = (id: string): Promise<Contract> => {
  return apiGet<Contract>(API_ENDPOINTS.CONTRACTS.GET(id));
};

/**
 * Crea un nuevo contrato
 * TODO: Validar datos antes de enviar
 */
export const createContractService = (data: CreateContractRequest): Promise<Contract> => {
  return apiPost<Contract>(API_ENDPOINTS.CONTRACTS.CREATE, data);
};

/**
 * Actualiza un contrato existente
 */
export const updateContractService = (id: string, data: UpdateContractRequest): Promise<Contract> => {
  return apiPatch<Contract>(API_ENDPOINTS.CONTRACTS.UPDATE(id), data);
};

/**
 * Elimina un contrato
 * TODO: Implementar confirmación antes de eliminar
 */
export const deleteContractService = (id: string): Promise<void> => {
  return apiDelete<void>(API_ENDPOINTS.CONTRACTS.DELETE(id));
};

/**
 * Guarda un borrador de contrato
 * TODO: Implementar auto-guardado cada 30 segundos
 */
export const saveDraftService = (id: string, data: Partial<UpdateContractRequest>): Promise<Contract> => {
  return apiPatch<Contract>(API_ENDPOINTS.CONTRACTS.DRAFT(id), data);
};

/**
 * Duplica un contrato existente
 */
export const duplicateContractService = (id: string): Promise<Contract> => {
  return apiPost<Contract>(API_ENDPOINTS.CONTRACTS.DUPLICATE(id));
};

/**
 * Obtiene los contratos recientes del usuario
 */
export const getRecentContractsService = (limit?: number): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.RECENT, { limit });
};

/**
 * Obtiene estadísticas de contratos del usuario
 */
export const getContractStatsService = (): Promise<ContractStats> => {
  return apiGet<ContractStats>(API_ENDPOINTS.CONTRACTS.STATS);
};

/**
 * Obtiene contratos pendientes de firma
 */
export const getPendingContractsService = (): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.PENDING);
};

/**
 * Obtiene un contrato público (para firmas de invitados)
 */
export const getPublicContractService = (id: string): Promise<Contract> => {
  return apiGet<Contract>(API_ENDPOINTS.CONTRACTS.PUBLIC(id));
};

/**
 * Obtiene el historial de versiones de un contrato
 */
export const getContractVersionsService = (id: string): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.VERSIONS(id));
};

/**
 * Obtiene todos los tipos de contrato disponibles
 */
export const getContractTypesService = (): Promise<ContractTypeDefinition[]> => {
  return apiGet<ContractTypeDefinition[]>(API_ENDPOINTS.CONTRACTS.TYPES);
};

/**
 * Obtiene las plantillas de contratos disponibles
 */
export const getContractTemplatesService = (): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.TEMPLATES);
};

/**
 * Obtiene el schema del formulario para un tipo de contrato específico
 */
export const getContractTypeSchemaService = (type: string): Promise<ContractFormSchema> => {
  return apiGet<ContractFormSchema>(API_ENDPOINTS.CONTRACTS.TYPE_SCHEMA(type));
};

/**
 * Descarga múltiples contratos en un archivo comprimido
 * TODO: Implementar progreso de descarga
 */
export const bulkDownloadContractsService = (contractIds: string[], format: 'html' | 'pdf'): Promise<{ url: string }> => {
  return apiPost<{ url: string }>(API_ENDPOINTS.CONTRACTS.BULK_DOWNLOAD, { contractIds, format });
};
