/**
 * Hook para gestionar la generación de documentos legales mediante IA
 *
 * @description Maneja el flujo completo de generación:
 * - Selección de tipo de documento
 * - Envío de datos del formulario
 * - Recepción del documento generado por IA
 * - Manejo de estados de carga y errores
 *
 * TODO: Implementar lógica de retry en caso de fallo
 * TODO: Agregar validación de campos antes de enviar
 * TODO: Implementar caché de documentos generados
 * TODO: Implementar progreso de generación si el backend lo soporta
 */

import { useState } from 'react';
import { generateContractService } from '@/services/ai.service';
import type { GenerateContractRequest, GenerateContractResponse } from '@/types';

export const useGenerateContract = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedDocument, setGeneratedDocument] = useState<GenerateContractResponse | null>(null);

  const generateContract = async (request: GenerateContractRequest): Promise<GenerateContractResponse | null> => {
    setIsGenerating(true);
    setError(null);
    setGeneratedDocument(null);

    try {
      const response = await generateContractService(request);
      setGeneratedDocument(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al generar contrato';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setError(null);
    setGeneratedDocument(null);
  };

  return {
    generateContract,
    isGenerating,
    error,
    generatedDocument,
    reset
  };
};
