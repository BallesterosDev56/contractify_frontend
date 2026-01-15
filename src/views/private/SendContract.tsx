/**
 * Vista SendContract
 *
 * @description Envío de invitaciones para firmar contrato
 * TODO: Implementar formulario de envío
 * TODO: Implementar selección de plantilla de email
 * TODO: Implementar personalización de mensaje
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetContract } from '@/hooks/api/useGetContract';
import { useSendInvitation } from '@/hooks/api/useSendInvitation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const SendContract = () => {
  const { id } = useParams<{ id: string }>();
  const { contract, isLoading } = useGetContract(id || null);
  const { sendInvitation, isSending } = useSendInvitation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!contract || !email) return;

    // TODO: Obtener partyId del email
    await sendInvitation({
      contractId: contract.id,
      partyId: '', // TODO
      email,
      message,
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Enviar contrato</h1>

      <Card title={`Enviar: ${contract?.title}`}>
        <div className="space-y-4">
          <Input
            label="Email del firmante"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje personalizado (opcional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <Button fullWidth isLoading={isSending} onClick={handleSend}>
            Enviar invitación
          </Button>
        </div>
      </Card>
    </div>
  );
};
