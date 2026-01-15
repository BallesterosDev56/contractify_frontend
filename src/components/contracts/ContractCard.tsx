/**
 * Componente ContractCard
 *
 * @description Tarjeta para mostrar información de un contrato en listados
 * TODO: Implementar diseño visual completo
 * TODO: Agregar acciones (ver, editar, eliminar)
 */

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Contract } from '@/types';
import { CONTRACT_STATUS_LABELS } from '@/constants/app.constants';
import { Card } from '@/components/ui/Card';

export interface ContractCardProps {
  contract: Contract;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ContractCard: FC<ContractCardProps> = ({ contract, onView, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <Link
            to={`/contracts/${contract.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
          >
            {contract.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Tipo: {contract.type} • Estado: {CONTRACT_STATUS_LABELS[contract.status]}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Creado: {new Date(contract.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          {onView && (
            <button
              onClick={() => onView(contract.id)}
              className="text-blue-600 hover:text-blue-800"
            >
              Ver
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(contract.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
