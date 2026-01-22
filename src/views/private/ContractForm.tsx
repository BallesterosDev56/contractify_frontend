/**
 * Vista ContractForm
 *
 * @description Formulario guiado para crear un contrato
 * TODO: Implementar formulario dinámico basado en schema
 * TODO: Implementar auto-guardado cada 30 segundos
 * TODO: Implementar validación en tiempo real
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetContractTypeSchema } from '@/hooks/api/useGetContractTypeSchema';
import { useCreateContract } from '@/hooks/api/useCreateContract';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ROUTES } from '@/constants/app.constants';

export const ContractForm = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { isLoading: schemaLoading } = useGetContractTypeSchema(type || null);
  const { createContract, isLoading: isCreating } = useCreateContract();

  // TODO: Generar schema de Zod dinámicamente basado en el schema del tipo
  const formSchema = z.object({
    // Placeholder - debe generarse dinámicamente
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });


  // TODO: Implementar auto-guardado
  // useAutoSave(() => {
  //   // Guardar borrador
  // }, formData);

  const onSubmit = async () => {
    // CreateContractRequest alineado con OpenAPI: title, templateId, contractType
    // TODO: Obtener templateId real del tipo de contrato seleccionado
    // TODO: Obtener title del formulario dinámico basado en schema
    const contract = await createContract({
      title: 'Nuevo contrato', // TODO: Obtener del formulario
      templateId: type || 'default', // TODO: Obtener templateId correcto del tipo
      contractType: type || '', // contractType es el tipo de contrato
    });

    if (contract) {
      navigate(ROUTES.CONTRACT_PREVIEW.replace(':id', contract.id));
    }
  };

  if (schemaLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Crear contrato</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card title="Información del contrato">
          {/* TODO: Renderizar campos dinámicamente basado en schema */}
           <Input label="Título" {...register('title')} error={errors.title?.message as string} />
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isCreating}>
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};
