/**
 * Hook para obtener el schema de formulario de un tipo de contrato
 */

import { useState, useEffect } from 'react';
import { getContractTypeSchemaService } from '@/services/contracts.service';
import type { ContractFormSchema } from '@/types';

export const useGetContractTypeSchema = (type: string | null) => {
  const [schema, setSchema] = useState<ContractFormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!type) return;

    const fetchSchema = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getContractTypeSchemaService(type);
        setSchema(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al obtener schema';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchema();
  }, [type]);

  return { schema, isLoading, error };
};
