/**
 * Schema helper functions and constants
 * Provides type-safe enums and utility functions for schema operations
 */

// Application status values
export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  PENDING_PAYMENT: 'pending_payment',
  SUBMITTED: 'submitted',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

// Payment status values
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

// Payment methods
export const PAYMENT_METHOD = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet',
} as const;

export type PaymentMethod = typeof PAYMENT_METHOD[keyof typeof PAYMENT_METHOD];

// Zoho sync status
export const ZOHO_SYNC_STATUS = {
  PENDING: 'pending',
  SYNCED: 'synced',
  FAILED: 'failed',
} as const;

export type ZohoSyncStatus = typeof ZOHO_SYNC_STATUS[keyof typeof ZOHO_SYNC_STATUS];

// Document categories
export const DOCUMENT_CATEGORY = {
  GOVERNMENT: 'government',
  LEGAL: 'legal',
  IDENTITY: 'identity',
  BUSINESS: 'business',
} as const;

export type DocumentCategory = typeof DOCUMENT_CATEGORY[keyof typeof DOCUMENT_CATEGORY];

/**
 * Generate unique application number
 * Format: DGDC-YYYY-NNNNN
 */
export function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
  return `DGDC-${year}-${random}`;
}

/**
 * Convert rupees to smallest currency unit (paise)
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Convert paise to rupees
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Format currency for display
 */
export function formatCurrency(paise: number): string {
  const rupees = paiseToRupees(paise);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(rupees);
}

/**
 * Validate file type against allowed types
 */
export function isFileTypeAllowed(
  mimeType: string,
  allowedTypes: string[]
): boolean {
  const extension = mimeType.split('/')[1];
  return allowedTypes.some(allowed => 
    mimeType.includes(allowed) || extension === allowed
  );
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

