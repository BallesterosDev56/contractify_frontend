/**
 * Hook para obtener la lista de contratos
 *
 * @description Maneja la obtención de contratos:
 * - Listado con filtros
 * - Paginación
 * - Actualización automática
 *
 * TODO: Implementar paginación
 * TODO: Implementar caché de resultados
 * TODO: Implementar actualización automática cuando cambian los filtros
 */

import { useState, useEffect } from 'react';
import { getContractsService } from '@/services/contracts.service';
import type { Contract, ContractFilters } from '@/types';

export const useGetContracts = (filters?: ContractFilters) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getContractsService(filters);
      setContracts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener contratos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [filters]);

  return { contracts, isLoading, error, refetch: fetchContracts };
};
