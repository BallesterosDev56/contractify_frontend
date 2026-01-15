/**
 * Vista NewContract
 *
 * @description Selección de tipo de contrato para crear uno nuevo
 * TODO: Implementar grid de tipos de contrato
 * TODO: Implementar búsqueda de tipos
 */

import { useNavigate } from 'react-router-dom';
import { useGetContractTypes } from '@/hooks/api/useGetContractTypes';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ROUTES } from '@/constants/app.constants';

export const NewContract = () => {
  const navigate = useNavigate();
  const { types: contractTypes, isLoading } = useGetContractTypes();

  const handleSelectType = (typeId: string) => {
    navigate(ROUTES.CONTRACT_FORM.replace(':type', typeId));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Nuevo contrato</h1>
      <p className="text-gray-600">Selecciona el tipo de contrato que deseas crear</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contractTypes.map((type) => (
          <Card
            key={type.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleSelectType(type.id)}
          >
            <h3 className="text-lg font-semibold">{type.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{type.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
