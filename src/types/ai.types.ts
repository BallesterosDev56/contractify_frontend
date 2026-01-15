/**
 * Tipos relacionados con generación de documentos mediante IA
 */

export interface GenerateContractRequest {
  contractType: string;
  formData: Record<string, unknown>;
  context?: GenerationContext;
}

export interface GenerationContext {
  jurisdiction?: string;
  language?: string;
  additionalClauses?: string[];
  customInstructions?: string;
}

export interface GenerateContractResponse {
  content: string; // HTML content
  htmlContent: string; // Formatted HTML
  metadata: GenerationMetadata;
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
  formData: Record<string, unknown>;
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
  instructions?: string;
  regenerateSection?: string;
}

export interface RegenerateResponse {
  content: string;
  htmlContent: string;
  version: number;
}
