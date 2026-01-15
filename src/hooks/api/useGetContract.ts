/**
 * Hook para obtener un contrato específico por ID
 *
 * @description Maneja la obtención de un contrato:
 * - Carga de datos del contrato
 * - Manejo de estados de carga y error
 *
 * TODO: Implementar caché de contratos individuales
 * TODO: Implementar actualización en tiempo real si el contrato cambia
 */

import { useState, useEffect } from 'react';
import { getContractService } from '@/services/contracts.service';
import type { Contract } from '@/types';

export const useGetContract = (contractId: string | null) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContract = async () => {
    if (!contractId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getContractService(contractId);
      setContract(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener contrato';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContract();
  }, [contractId]);

  return { contract, isLoading, error, refetch: fetchContract };
};
