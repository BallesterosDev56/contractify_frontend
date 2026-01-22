/**
 * Vista Dashboard
 *
 * @description Panel principal del usuario
 * TODO: Implementar estadísticas de contratos
 * TODO: Implementar lista de contratos recientes
 * TODO: Implementar acciones rápidas
 */

import { Link } from 'react-router-dom';
import { useGetContractStats } from '@/hooks/api/useGetContractStats';
import { useGetContracts } from '@/hooks/api/useGetContracts';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ContractCard } from '@/components/contracts/ContractCard';
import { ROUTES } from '@/constants/app.constants';

export const Dashboard = () => {
  const { stats, isLoading: statsLoading } = useGetContractStats();
  const { contracts, isLoading: contractsLoading } = useGetContracts({ limit: 5 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link to={ROUTES.NEW_CONTRACT}>
          <Button>Nuevo contrato</Button>
        </Link>
      </div>

      {/* Stats */}
      {statsLoading ? (
        <LoadingSpinner />
      ) : stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">En Firma</p>
            <p className="text-2xl font-bold">{stats.byStatus['SIGNING'] || 0}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">Firmas Pendientes</p>
            <p className="text-2xl font-bold">{stats.pendingSignatures}</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600">Firmados Este Mes</p>
            <p className="text-2xl font-bold">{stats.signedThisMonth}</p>
          </Card>
        </div>
      )}

      {/* Recent Contracts */}
      <Card title="Contratos recientes">
        {contractsLoading ? (
          <LoadingSpinner />
        ) : contracts.length > 0 ? (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <ContractCard key={contract.id} contract={contract} />
            ))}
            <Link to={ROUTES.CONTRACTS} className="block text-center text-blue-600 hover:text-blue-800">
              Ver todos los contratos
            </Link>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay contratos recientes</p>
        )}
      </Card>
    </div>
  );
};
