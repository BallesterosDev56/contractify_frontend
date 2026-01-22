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

// GenerateContractResponse alineado con OpenAPI AIGenerateResponse
export interface GenerateContractResponse {
  content: string; // Generated HTML content
  placeholders?: Record<string, string>; // default: {}
  metadata_?: AIGenerateMetadata; // nullable
}

// AIGenerateMetadata alineado con OpenAPI
export interface AIGenerateMetadata {
  model?: string; // nullable
  promptVersion?: string; // nullable
  confidenceScore?: number; // nullable
}

export interface ValidateInputRequest {
  contractType: string;
  inputs: Record<string, unknown>; // Backend espera 'inputs', no 'formData'
}

// ValidateInputResponse alineado con OpenAPI
export interface ValidateInputResponse {
  valid: boolean;
  warnings?: string[]; // Array de strings, default: []
  errors?: string[]; // Array de strings, default: []
}

export interface RegenerateRequest {
  contractId: string;
  feedback: string; // Backend espera 'feedback', no 'instructions'
  preserveStructure?: boolean; // Opcional
}

// RegenerateResponse usa AIGenerateResponse según OpenAPI
export interface RegenerateResponse {
  content: string; // Generated HTML content
  placeholders?: Record<string, string>; // default: {}
  metadata_?: AIGenerateMetadata; // nullable
}
