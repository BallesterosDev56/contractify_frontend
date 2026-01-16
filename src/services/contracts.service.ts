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
import { toBackend, toFrontend, adaptFilters, extractPaginated, toBackendStatus } from '@/utils/contractAdapters';
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
 * Retorna items y paginación
 */
export const getContractsService = async (filters?: ContractFilters): Promise<{ items: Contract[]; pagination: unknown | null }> => {
  const adaptedFilters = adaptFilters((filters || {}) as Record<string, unknown>);
  const response = await apiGet<{ data: Contract[]; pagination?: unknown } | Contract[]>(API_ENDPOINTS.CONTRACTS.LIST, adaptedFilters);
  const { items, pagination } = extractPaginated<Contract>(response);
  return { items: items.map(toFrontend) as Contract[], pagination };
};

/**
 * Obtiene un contrato por su ID
 */
export const getContractService = async (contractId: string): Promise<Contract> => {
  const response = await apiGet<Contract>(API_ENDPOINTS.CONTRACTS.GET(contractId));
  return toFrontend(response) as Contract;
};

/**
 * Crea un nuevo contrato
 * TODO: Validar datos antes de enviar
 */
export const createContractService = async (data: CreateContractRequest): Promise<Contract> => {
  const response = await apiPost<Contract>(API_ENDPOINTS.CONTRACTS.CREATE, toBackend(data));
  return toFrontend(response) as Contract;
};

/**
 * Actualiza un contrato existente
 */
export const updateContractService = async (contractId: string, data: UpdateContractRequest): Promise<Contract> => {
  const response = await apiPatch<Contract>(API_ENDPOINTS.CONTRACTS.UPDATE(contractId), toBackend(data));
  return toFrontend(response) as Contract;
};

/**
 * Elimina un contrato
 * TODO: Implementar confirmación antes de eliminar
 */
export const deleteContractService = (contractId: string): Promise<void> => {
  return apiDelete<void>(API_ENDPOINTS.CONTRACTS.DELETE(contractId));
};

/**
 * Actualiza el contenido de un contrato (reemplaza saveDraft)
 * @param contractId ID del contrato
 * @param content Contenido del contrato
 * @param source Origen del cambio ('USER' | 'AI') - Backend solo acepta USER o AI
 */
export const updateContentService = async (
  contractId: string,
  content: string,
  source: 'USER' | 'AI' = 'USER'
): Promise<Contract> => {
  const response = await apiPatch<Contract>(API_ENDPOINTS.CONTRACTS.CONTENT(contractId), { content, source });
  return toFrontend(response) as Contract;
};

/**
 * @deprecated Use updateContentService instead
 * Guarda un borrador de contrato (mantenido por compatibilidad)
 */
export const saveDraftService = async (contractId: string, data: Partial<UpdateContractRequest>): Promise<Contract> => {
  const content = data.content || '';
  return updateContentService(contractId, content, 'USER');
};

/**
 * Duplica un contrato existente
 */
export const duplicateContractService = async (contractId: string): Promise<Contract> => {
  const response = await apiPost<Contract>(API_ENDPOINTS.CONTRACTS.DUPLICATE(contractId));
  return toFrontend(response) as Contract;
};

/**
 * Obtiene los contratos recientes del usuario
 */
export const getRecentContractsService = async (limit?: number): Promise<Contract[]> => {
  const filters = limit ? { pageSize: limit } : {};
  const response = await apiGet<{ data: Contract[]; pagination?: unknown } | Contract[]>(API_ENDPOINTS.CONTRACTS.RECENT, filters);
  const { items } = extractPaginated<Contract>(response);
  return items.map(toFrontend) as Contract[];
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
export const getPendingContractsService = async (): Promise<Contract[]> => {
  const response = await apiGet<{ data: Contract[]; pagination?: unknown } | Contract[]>(API_ENDPOINTS.CONTRACTS.PENDING);
  const { items } = extractPaginated<Contract>(response);
  return items.map(toFrontend) as Contract[];
};

/**
 * Obtiene un contrato público (para firmas de invitados)
 * Requiere token como query parameter según OpenAPI spec
 */
export const getPublicContractService = async (contractId: string, token: string): Promise<Contract> => {
  const response = await apiGet<Contract>(API_ENDPOINTS.CONTRACTS.PUBLIC(contractId, token));
  return toFrontend(response) as Contract;
};

/**
 * Obtiene el historial de versiones de un contrato
 */
export const getContractVersionsService = async (contractId: string): Promise<Contract[]> => {
  const response = await apiGet<{ data: Contract[]; pagination?: unknown } | Contract[]>(API_ENDPOINTS.CONTRACTS.VERSIONS(contractId));
  const { items } = extractPaginated<Contract>(response);
  return items.map(toFrontend) as Contract[];
};

/**
 * Actualiza el estado de un contrato
 */
export const updateStatusService = async (
  contractId: string,
  status: string,
  reason?: string
): Promise<Contract> => {
  const response = await apiPatch<Contract>(API_ENDPOINTS.CONTRACTS.STATUS(contractId), {
    status: toBackendStatus(status),
    ...(reason && { reason })
  });
  return toFrontend(response) as Contract;
};

/**
 * Obtiene las partes (parties) de un contrato
 */
export const getPartiesService = async (contractId: string): Promise<unknown[]> => {
  const response = await apiGet<unknown[]>(API_ENDPOINTS.CONTRACTS.PARTIES(contractId));
  return Array.isArray(response) ? response : [];
};

/**
 * Agrega una parte (party) a un contrato
 */
export const addPartyService = async (contractId: string, party: unknown): Promise<unknown> => {
  const adaptedParty = toBackend({ parties: [party] } as { parties: unknown[] });
  const adaptedParties = adaptedParty && typeof adaptedParty === 'object' && 'parties' in adaptedParty
    ? (adaptedParty as { parties: unknown[] }).parties
    : [party];
  return apiPost<unknown>(API_ENDPOINTS.CONTRACTS.PARTIES(contractId), adaptedParties[0]);
};

/**
 * Elimina una parte (party) de un contrato
 */
export const removePartyService = (contractId: string, partyId: string): Promise<void> => {
  return apiDelete<void>(API_ENDPOINTS.CONTRACTS.PARTY(contractId, partyId));
};

/**
 * Obtiene el historial de cambios de un contrato
 */
export const getHistoryService = async (contractId: string): Promise<unknown[]> => {
  const response = await apiGet<unknown[]>(API_ENDPOINTS.CONTRACTS.HISTORY(contractId));
  return Array.isArray(response) ? response : [];
};

/**
 * Obtiene las transiciones de estado válidas para un contrato
 */
export const getContractTransitionsService = async (contractId: string): Promise<{ currentStatus: string; allowedTransitions: string[] }> => {
  return apiGet<{ currentStatus: string; allowedTransitions: string[] }>(API_ENDPOINTS.CONTRACTS.TRANSITIONS(contractId));
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
export const getContractTemplatesService = (filters?: { category?: string; jurisdiction?: string }): Promise<Contract[]> => {
  return apiGet<Contract[]>(API_ENDPOINTS.CONTRACTS.TEMPLATES, filters);
};

/**
 * Obtiene los detalles de una plantilla específica
 */
export const getContractTemplateService = (templateId: string): Promise<Contract> => {
  return apiGet<Contract>(API_ENDPOINTS.CONTRACTS.TEMPLATE(templateId));
};

/**
 * Obtiene el schema del formulario para un tipo de contrato específico
 */
export const getContractTypeSchemaService = (type: string): Promise<ContractFormSchema> => {
  return apiGet<ContractFormSchema>(API_ENDPOINTS.CONTRACTS.TYPE_SCHEMA(type));
};

/**
 * Descarga múltiples contratos en un archivo comprimido (ZIP)
 * Backend retorna application/zip según OpenAPI spec
 */
export const bulkDownloadContractsService = (contractIds: string[]): Promise<Blob> => {
  return apiPost<Blob>(API_ENDPOINTS.CONTRACTS.BULK_DOWNLOAD, { contractIds });
};
