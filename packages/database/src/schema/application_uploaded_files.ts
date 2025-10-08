import { pgTable, text, timestamp, uuid, integer, index } from 'drizzle-orm/pg-core';
import { applications } from './applications';
import { serviceRequiredDocuments } from './service_required_documents';
import { users } from './users';

/**
 * Application Uploaded Files table
 * Tracks all files uploaded by users for their applications
 * Files are stored in Cloudflare R2
 */
export const applicationUploadedFiles = pgTable('application_uploaded_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Parent application
  applicationId: uuid('application_id')
    .references(() => applications.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Which requirement this file fulfills
  serviceRequiredDocumentId: uuid('service_required_document_id')
    .references(() => serviceRequiredDocuments.id, { onDelete: 'restrict' })
    .notNull(),
  
  // File information
  fileName: text('file_name').notNull(), // User's original filename
  fileSize: integer('file_size').notNull(), // Size in bytes
  mimeType: text('mime_type').notNull(), // e.g., 'image/jpeg', 'application/pdf'
  
  // Cloudflare R2 storage
  r2Url: text('r2_url').notNull(), // Public R2 URL (CDN URL if configured)
  r2Key: text('r2_key').notNull(), // R2 object key (for deletion/management)
  r2Bucket: text('r2_bucket').notNull(), // Bucket name
  
  // File metadata
  fileIndex: integer('file_index').default(1).notNull(), // For multiple files (1, 2 for front/back)
  fileLabel: text('file_label'), // Optional label like "Front", "Back", "Page 1"
  
  // Audit
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
  uploadedBy: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
}, (table) => ({
  applicationIdIdx: index('application_uploaded_files_application_id_idx').on(table.applicationId),
  serviceRequiredDocIdIdx: index('application_uploaded_files_service_req_doc_id_idx')
    .on(table.serviceRequiredDocumentId),
  uploadedAtIdx: index('application_uploaded_files_uploaded_at_idx').on(table.uploadedAt),
  r2KeyIdx: index('application_uploaded_files_r2_key_idx').on(table.r2Key),
  // Composite index for finding files by application and requirement
  applicationRequirementIdx: index('application_uploaded_files_app_req_idx')
    .on(table.applicationId, table.serviceRequiredDocumentId),
}));

// Export types for type safety
export type ApplicationUploadedFile = typeof applicationUploadedFiles.$inferSelect;
export type NewApplicationUploadedFile = typeof applicationUploadedFiles.$inferInsert;

