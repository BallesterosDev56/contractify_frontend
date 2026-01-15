/**
 * Utilidades para contratos
 *
 * @description Funciones de lógica de negocio relacionadas con contratos
 */

import type { Contract, ContractStatus } from '@/types';

/**
 * Determina el estado de un contrato basado en las firmas
 * TODO: Implementar lógica completa de estados
 */
export const getContractStatus = (contract: Contract): ContractStatus => {
  const signedCount = contract.signatures.filter(s => s.signedAt).length;
  const totalParties = contract.parties.length;

  if (signedCount === 0) return 'pending';
  if (signedCount === totalParties) return 'completed';
  if (signedCount > 0 && signedCount < totalParties) return 'partial';

  return contract.status;
};

/**
 * Formatea la fecha para mostrar
 * TODO: Implementar internacionalización
 */
export const formatContractDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Valida si un contrato puede ser firmado
 * TODO: Implementar validaciones de negocio
 */
export const canSignContract = (_contract: Contract, _userId: string): boolean => {
  // TODO: Verificar si el usuario es parte del contrato
  // TODO: Verificar si ya firmó
  // TODO: Verificar orden de firmas si aplica
  return true;
};
