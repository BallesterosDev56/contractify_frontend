/**
 * Hook para crear un nuevo contrato
 *
 * @description Maneja la creación de contratos:
 * - Validación de datos antes de enviar
 * - Creación del contrato
 * - Redirección después de crear
 *
 * TODO: Implementar validación de datos antes de enviar
 * TODO: Implementar manejo de errores específicos por campo
 */

import { useState } from 'react';
import { createContractService } from '@/services/contracts.service';
import type { CreateContractRequest, Contract } from '@/types';

export const useCreateContract = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContract = async (data: CreateContractRequest): Promise<Contract | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const contract = await createContractService(data);
      return contract;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear contrato';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createContract, isLoading, error };
};
