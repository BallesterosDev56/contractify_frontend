/**
 * Tipos relacionados con generación de documentos mediante IA
 */

export interface GenerateContractRequest {
  contractId: string; // Requerido por backend
  templateId: string; // Requerido por backend
  contractType: string; // Requerido por backend
  jurisdiction?: string; // Opcional, default: 'CO'
  inputs: Record<string, unknown>; // Backend espera 'inputs', no 'formData'
}

export interface GenerateContractResponse {
  content: string; // HTML content
  htmlContent: string; // Formatted HTML
  metadata_: GenerationMetadata;
  contractId?: string; // Si se guarda automáticamente
}

export interface GenerationMetadata {
  model: string;
  tokensUsed: number;
  generationTime: number;
  confidence?: number;
  sources?: string[];
}

export interface ValidateInputRequest {
  contractType: string;
  inputs: Record<string, unknown>; // Backend espera 'inputs', no 'formData'
}

export interface ValidateInputResponse {
  valid: boolean;
  errors: ValidationError[];
  suggestions?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface RegenerateRequest {
  contractId: string;
  feedback: string; // Backend espera 'feedback', no 'instructions'
  preserveStructure?: boolean; // Opcional
}

export interface RegenerateResponse {
  content: string;
  htmlContent: string;
  version: number;
}
