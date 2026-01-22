/**
 * Adaptadores de datos entre frontend y backend
 *
 * Convierte estructuras de datos entre el formato del frontend (minúsculas, camelCase)
 * y el formato del backend (MAYÚSCULAS para estados, snake_case para algunos campos)
 */

/**
 * Convierte estado del frontend al formato del backend
 */
export const toBackendStatus = (status: string): string => {
  const map: Record<string, string> = {
    'draft': 'DRAFT',
    'pending': 'SIGNING',
    'partial': 'SIGNING',
    'completed': 'SIGNED',
    'cancelled': 'CANCELLED',
    'expired': 'EXPIRED'
  };
  return map[status.toLowerCase()] || status.toUpperCase();
};

/**
 * Convierte estado del backend al formato del frontend
 */
export const toFrontendStatus = (status: string): string => {
  const map: Record<string, string> = {
    'DRAFT': 'draft',
    'GENERATED': 'draft',
    'SIGNING': 'pending',
    'SIGNED': 'completed',
    'CANCELLED': 'cancelled',
    'EXPIRED': 'expired'
  };
  return map[status.toUpperCase()] || status.toLowerCase();
};

/**
 * DEPRECATED: Los roles ahora se usan directamente en formato backend (HOST, GUEST, WITNESS)
 * El frontend debe usar los valores del backend directamente según OpenAPI
 */
export const toBackendRole = (role: string): string => {
  // Ya no necesitamos conversión, los tipos están alineados
  return role;
};

/**
 * DEPRECATED: Los roles ahora se usan directamente en formato backend (HOST, GUEST, WITNESS)
 * El frontend debe usar los valores del backend directamente según OpenAPI
 */
export const toFrontendRole = (role: string): string => {
  // Ya no necesitamos conversión, los tipos están alineados
  return role;
};

/**
 * Convierte datos del frontend al formato del backend
 * NOTA: Los roles ya no se convierten porque el frontend ahora usa los valores correctos del backend
 */
export const toBackend = <T>(data: T | null | undefined): T | null | undefined => {
  if (!data || typeof data !== 'object') return data;

  const obj = data as Record<string, unknown> & { type?: string; status?: string; parties?: Array<{ role?: string }> };
  const { type, status, parties, ...rest } = obj;

  return {
    ...rest,
    ...(type && { contractType: type }),
    ...(status && { status: toBackendStatus(status) }),
    ...(parties && { parties }) // Ya no necesitamos convertir roles
  } as T;
};

/**
 * Convierte datos del backend al formato del frontend
 * NOTA: Los roles ya no se convierten porque el frontend ahora usa los valores correctos del backend
 */
export const toFrontend = <T>(data: T | null | undefined): T | null | undefined => {
  if (!data || typeof data !== 'object') return data;

  const obj = data as Record<string, unknown> & { contractType?: string; status?: string; parties?: Array<{ role?: string }> };
  const { contractType, status, parties, ...rest } = obj;

  return {
    ...rest,
    ...(contractType && { type: contractType }),
    ...(status && { status: toFrontendStatus(status) }),
    ...(parties && { parties }) // Ya no necesitamos convertir roles
  } as T;
};

/**
 * Extrae datos paginados de la respuesta del backend
 */
export const extractPaginated = <T>(response: { data?: T[]; pagination?: unknown } | T[] | T): { items: T[]; pagination: unknown | null } => {
  if (Array.isArray(response)) {
    return { items: response, pagination: null };
  }

  if (response && typeof response === 'object' && 'data' in response) {
    const resp = response as { data?: T[]; pagination?: unknown };
    return {
      items: Array.isArray(resp.data) ? resp.data : resp.data ? [resp.data] : [],
      pagination: resp.pagination || null
    };
  }

  return { items: [response as T], pagination: null };
};

/**
 * Adapta filtros del frontend al formato del backend
 */
export const adaptFilters = (filters: Record<string, unknown>): Record<string, unknown> => {
  const { limit, dateFrom, dateTo, type, status, sortBy, sortOrder, ...rest } = filters;

  const adapted: Record<string, unknown> = { ...rest };

  if (limit !== undefined) {
    adapted.pageSize = limit;
  }

  if (dateFrom !== undefined) {
    adapted.fromDate = dateFrom;
  }

  if (dateTo !== undefined) {
    adapted.toDate = dateTo;
  }

  if (status !== undefined) {
    if (Array.isArray(status)) {
      adapted.status = status.map(toBackendStatus);
    } else {
      adapted.status = toBackendStatus(status as string);
    }
  }

  // Agregar sortBy y sortOrder si existen
  if (sortBy !== undefined) {
    adapted.sortBy = sortBy;
  }

  if (sortOrder !== undefined) {
    adapted.sortOrder = sortOrder;
  }

  // Eliminar 'type' del filtro si existe (según requerimientos)
  // No se incluye en adapted

  return adapted;
};
