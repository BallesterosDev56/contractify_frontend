/**
 * Hook para obtener estadísticas de contratos
 *
 * @description Maneja la obtención de estadísticas:
 * - Conteo por estado
 * - Actualización automática
 *
 * TODO: Implementar actualización periódica
 * TODO: Implementar caché con expiración
 */

import { useState, useEffect } from 'react';
import { getContractStatsService } from '@/services/contracts.service';
import type { ContractStats } from '@/types';

export const useGetContractStats = () => {
  const [stats, setStats] = useState<ContractStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getContractStatsService();
      setStats(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al obtener estadísticas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, isLoading, error, refetch: fetchStats };
};
