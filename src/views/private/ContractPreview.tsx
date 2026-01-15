/**
 * Vista ContractPreview
 *
 * @description Previsualización del contrato generado
 * TODO: Implementar visualización del HTML del contrato
 * TODO: Implementar botón de regenerar con IA
 * TODO: Implementar modal de firma
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetContract } from '@/hooks/api/useGetContract';
import { useGenerateContract } from '@/hooks/api/useGenerateContract';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { ROUTES } from '@/constants/app.constants';

export const ContractPreview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contract, isLoading } = useGetContract(id || null);
  const { generateContract, isGenerating } = useGenerateContract();
  const [showSignModal, setShowSignModal] = useState(false);

  const handleRegenerate = async () => {
    // TODO: Implementar regeneración
  };

  const handleSign = () => {
    setShowSignModal(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!contract) {
    return <div>Contrato no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{contract.title}</h1>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleRegenerate} isLoading={isGenerating}>
            Regenerar con IA
          </Button>
          <Button onClick={handleSign}>Firmar</Button>
        </div>
      </div>

      <Card>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: contract.content }}
        />
      </Card>

      {/* Sign Modal */}
      <Modal isOpen={showSignModal} onClose={() => setShowSignModal(false)} title="Firmar contrato">
        {/* TODO: Implementar formulario de firma */}
        <p>¿Estás seguro de que deseas firmar este contrato?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={() => setShowSignModal(false)}>
            Cancelar
          </Button>
          <Button>Confirmar firma</Button>
        </div>
      </Modal>
    </div>
  );
};
