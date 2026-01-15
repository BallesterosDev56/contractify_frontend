/**
 * Hook para obtener tipos de contrato disponibles
 */

import { useState, useEffect } from 'react';
import { getContractTypesService } from '@/services/contracts.service';
import type { ContractTypeDefinition } from '@/types';

export const useGetContractTypes = () => {
  const [types, setTypes] = useState<ContractTypeDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getContractTypesService();
        setTypes(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al obtener tipos de contrato';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, isLoading, error };
};
