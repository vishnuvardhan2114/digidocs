import { pgTable, text, timestamp, uuid, integer, boolean, index } from 'drizzle-orm/pg-core';
import { documents } from './documents';

/**
 * Document Services table - Specific services for each document type
 * Represents individual services like "New Application", "Renewal", "Correction"
 */
export const documentServices = pgTable('document_services', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Parent document
  documentId: uuid('document_id')
    .references(() => documents.id, { onDelete: 'cascade' })
    .notNull(),
  
  // Service info
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  
  // Pricing (stored in smallest currency unit - paise for INR)
  governmentFee: integer('government_fee').notNull().default(0),
  serviceFee: integer('service_fee').notNull().default(0),
  totalAmount: integer('total_amount').notNull().default(0),
  
  // Processing time
  estimatedDays: integer('estimated_days'), // Estimated completion time
  
  // Dynamic form configuration
  formFields: text('form_fields'), // JSON string defining form schema
  
  // Configuration
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  documentIdIdx: index('document_services_document_id_idx').on(table.documentId),
  slugIdx: index('document_services_slug_idx').on(table.slug),
  isActiveIdx: index('document_services_is_active_idx').on(table.isActive),
  documentSlugIdx: index('document_services_document_slug_idx').on(table.documentId, table.slug),
}));

// Export types for type safety
export type DocumentService = typeof documentServices.$inferSelect;
export type NewDocumentService = typeof documentServices.$inferInsert;

