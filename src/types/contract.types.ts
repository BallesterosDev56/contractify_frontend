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
  metadata: ContractMetadata;
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

export interface Party {
  id: string;
  name: string;
  email: string;
  role: 'signer' | 'viewer' | 'creator';
  signedAt?: string;
  signatureOrder?: number; // Para firmas secuenciales
}

export interface Signature {
  id: string;
  contractId: string;
  partyId: string;
  partyEmail: string;
  signedAt: string;
  ipAddress: string;
  userAgent: string;
  documentHash: string;
  certificate?: SignatureCertificate;
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

export interface CreateContractRequest {
  type: ContractType;
  title: string;
  parties: Omit<Party, 'id' | 'signedAt'>[];
  formData: Record<string, unknown>;
  metadata?: Partial<ContractMetadata>;
}

export interface UpdateContractRequest {
  title?: string;
  content?: string;
  parties?: Omit<Party, 'id' | 'signedAt'>[];
  metadata?: Partial<ContractMetadata>;
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

export interface ContractStats {
  total: number;
  draft: number;
  pending: number;
  partial: number;
  completed: number;
  cancelled: number;
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
