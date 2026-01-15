/**
 * Vista ContractDetail
 *
 * @description Detalle completo de un contrato
 * TODO: Implementar tabs (Documento, Firmas, Historial)
 * TODO: Implementar acciones (editar, duplicar, eliminar, enviar)
 */

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetContract } from '@/hooks/api/useGetContract';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ContractDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { contract, isLoading } = useGetContract(id || null);
  const [activeTab, setActiveTab] = useState<'document' | 'signatures' | 'history'>('document');

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
          <Button variant="outline">Duplicar</Button>
          <Button variant="outline">Enviar</Button>
          <Button variant="danger">Eliminar</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('document')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'document'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Documento
          </button>
          <button
            onClick={() => setActiveTab('signatures')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'signatures'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Firmas
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Historial
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'document' && (
        <Card>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contract.content }}
          />
        </Card>
      )}

      {activeTab === 'signatures' && (
        <Card title="Firmas">
          {/* TODO: Mostrar lista de firmas */}
          <p className="text-gray-500">No hay firmas aún</p>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card title="Historial">
          {/* TODO: Mostrar historial de versiones */}
          <p className="text-gray-500">No hay historial disponible</p>
        </Card>
      )}
    </div>
  );
};
