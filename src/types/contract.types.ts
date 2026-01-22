/**
 * Tipos relacionados con contratos
 */

export type ContractType =
  | 'service'
  | 'employment'
  | 'nda'
  | 'partnership'
  | 'supplier'
  | 'client'
  | 'lease'
  | 'custom';

export type ContractStatus =
  | 'draft'
  | 'pending'
  | 'partial'
  | 'completed'
  | 'cancelled'
  | 'expired';

export interface Contract {
  id: string;
  type: ContractType;
  title: string;
  status: ContractStatus;
  content: string; // HTML content
  htmlContent?: string; // Formatted HTML
  parties: Party[];
  signatures: Signature[];
  metadata_: ContractMetadata;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // User ID
  version: number;
  versions?: ContractVersion[];
  // Campos adicionales de ContractDetail según OpenAPI spec
  documentUrl?: string; // URL del documento PDF generado
  documentHash?: string; // Hash del documento para verificación
  templateId?: string; // ID de la plantilla usada
  contractType?: string; // Tipo de contrato (backend field)
  ownerUserId?: string; // ID del propietario del contrato
  signedAt?: string; // Fecha de firma completa
}

// Party alineado con OpenAPI ContractParty
export interface Party {
  id: string;
  role: 'HOST' | 'GUEST' | 'WITNESS'; // Backend usa estos valores
  name: string;
  email: string; // format: email
  signatureStatus?: 'PENDING' | 'INVITED' | 'SIGNED'; // SignatureStatus del backend
  signedAt?: string; // ISO date-time, nullable
  order?: number; // Signing order (1-based), nullable, default: 1
}

// Request para agregar una party - alineado con AddPartyRequest
export interface AddPartyRequest {
  role: 'HOST' | 'GUEST' | 'WITNESS';
  name: string;
  email: string;
  order?: number; // Opcional, default: 1
}

// Signature alineado con OpenAPI app__modules__contracts__schemas__Signature
export interface Signature {
  id: string;
  partyId: string;
  partyName?: string; // nullable
  role?: string; // nullable
  signedAt?: string; // nullable, ISO date-time
  ipAddress?: string; // nullable
  documentHash?: string; // nullable
}

export interface SignatureCertificate {
  hash: string;
  timestamp: string;
  issuer: string;
}

export interface ContractMetadata {
  templateId?: string;
  tags?: string[];
  notes?: string;
  expirationDate?: string;
  autoExpire?: boolean;
}

export interface ContractVersion {
  version: number;
  content: string;
  source?: 'AI' | 'USER'; // Origen del cambio según OpenAPI spec
  createdAt: string;
  createdBy: string;
}

// CreateContractRequest alineado con OpenAPI
export interface CreateContractRequest {
  title: string; // Requerido, minLength: 3
  templateId: string; // Requerido
  contractType: string; // Requerido (backend usa string, no enum)
}

// UpdateContractRequest alineado con OpenAPI
export interface UpdateContractRequest {
  title?: string; // Opcional, nullable
}

export interface ContractFilters {
  status?: ContractStatus[];
  type?: ContractType[];
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number; // Backend retorna 'totalItems', no 'total'
  totalPages: number;
}

// ContractStats alineado con OpenAPI
export interface ContractStats {
  total: number;
  byStatus: Record<string, number>; // Mapa de status -> count
  pendingSignatures: number;
  signedThisMonth: number;
}

export interface ContractTypeDefinition {
  id: ContractType;
  name: string;
  description: string;
  icon?: string;
  schema: ContractFormSchema;
}

export interface ContractFormSchema {
  fields: FormField[];
  required: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: FieldValidation;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}
