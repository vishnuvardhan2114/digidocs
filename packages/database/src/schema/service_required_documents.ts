import { pgTable, text, timestamp, uuid, integer, boolean, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { documentServices } from './document_services';

/**
 * Service Required Documents table
 * Defines what documents users must upload for each service
 */
export const serviceRequiredDocuments = pgTable('service_required_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Parent service
  documentServiceId: uuid('document_service_id')
    .references(() => documentServices.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Document requirement info
  name: text('name').notNull(), // e.g., "Passport Size Photo", "Aadhar Card"
  description: text('description'), // Plain text instructions (no HTML)
  
  // Upload configuration
  allowedFileTypes: text('allowed_file_types').array().default(sql`ARRAY['pdf','jpg','png']`).notNull(),
  maxFileSize: integer('max_file_size').default(5242880).notNull(), // 5MB in bytes
  maxFiles: integer('max_files').default(1).notNull(), // How many files user can upload
  isMandatory: boolean('is_mandatory').default(true).notNull(),
  
  // Sample file
  sampleFileUrl: text('sample_file_url'), // Optional example file URL
  
  // Configuration
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  serviceIdIdx: index('service_required_documents_service_id_idx').on(table.documentServiceId),
  isActiveIdx: index('service_required_documents_is_active_idx').on(table.isActive),
  displayOrderIdx: index('service_required_documents_display_order_idx')
    .on(table.documentServiceId, table.displayOrder),
}));

// Export types for type safety
export type ServiceRequiredDocument = typeof serviceRequiredDocuments.$inferSelect;
export type NewServiceRequiredDocument = typeof serviceRequiredDocuments.$inferInsert;

