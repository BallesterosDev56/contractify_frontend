/**
 * Vista Contracts
 *
 * @description Lista de todos los contratos del usuario
 * TODO: Implementar filtros y búsqueda
 * TODO: Implementar paginación
 * TODO: Implementar acciones masivas
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetContracts } from '@/hooks/api/useGetContracts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ContractCard } from '@/components/contracts/ContractCard';
import { ROUTES } from '@/constants/app.constants';
import type { ContractFilters } from '@/types';

export const Contracts = () => {
  const [filters, setFilters] = useState<ContractFilters>({});
  const { contracts, isLoading } = useGetContracts(filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
        <Link to={ROUTES.NEW_CONTRACT}>
          <Button>Nuevo contrato</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Buscar contratos..."
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          {/* TODO: Agregar más filtros */}
        </div>
      </Card>

      {/* Contracts List */}
      {isLoading ? (
        <LoadingSpinner />
      ) : contracts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {contracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </div>
      ) : (
        <Card>
          <p className="text-gray-500 text-center py-8">No hay contratos</p>
        </Card>
      )}
    </div>
  );
};
