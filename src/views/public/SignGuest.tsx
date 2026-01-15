/**
 * Vista SignGuest
 *
 * @description Página para que invitados firmen contratos sin autenticación
 * TODO: Implementar validación de token
 * TODO: Implementar formulario de firma
 * TODO: Implementar visualización del contrato
 */

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSignGuest } from '@/hooks/api/useSignGuest';
import { useGetContract } from '@/hooks/api/useGetContract';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const SignGuest = () => {
  const { token } = useParams<{ token: string }>();
  const { validateToken, signGuest, isValidating, isSigning, error } = useSignGuest();
  const { contract } = useGetContract(null); // TODO: Obtener contractId del token
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (token) {
      validateToken(token);
    }
  }, [token]);

  const handleSign = async () => {
    if (!token || !consent) return;

    await signGuest({
      token,
      name,
      email,
      consent,
    });
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card title="Firmar contrato">
          {/* TODO: Mostrar contenido del contrato */}
          {contract && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">{contract.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: contract.content }} />
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 mr-2"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                Acepto los términos y condiciones y confirmo que he leído el contrato completo
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button
              fullWidth
              isLoading={isSigning}
              onClick={handleSign}
              disabled={!consent || !name || !email}
            >
              Firmar contrato
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
