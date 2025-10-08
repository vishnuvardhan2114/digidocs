import { pgTable, text, timestamp, uuid, integer, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { guests } from './guests';
import { documents } from './documents';
import { documentServices } from './document_services';

/**
 * Applications table - User document service requests
 * Core business entity tracking user applications from draft to completion
 */
export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Unique application identifier
  applicationNumber: text('application_number').unique().notNull(),
  
  // Ownership - one of these will be populated (guest OR user)
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  guestId: uuid('guest_id').references(() => guests.id, { onDelete: 'cascade' }),
  
  // Service selection
  documentId: uuid('document_id')
    .references(() => documents.id, { onDelete: 'restrict' })
    .notNull(),
  documentServiceId: uuid('document_service_id')
    .references(() => documentServices.id, { onDelete: 'restrict' })
    .notNull(),
  
  // Application status
  status: text('status').notNull().default('draft'),
  // Status values: 'draft', 'pending_payment', 'submitted', 'processing', 'completed', 'rejected', 'cancelled'
  
  // Form data (dynamic based on service)
  formData: text('form_data'), // JSON string of user-submitted form fields
  
  // Pricing snapshot (locked at creation time)
  governmentFee: integer('government_fee').notNull().default(0),
  serviceFee: integer('service_fee').notNull().default(0),
  totalAmount: integer('total_amount').notNull().default(0),
  
  // Payment information (Zoho Payment Gateway)
  paymentId: text('payment_id'), // Zoho payment transaction ID
  paymentStatus: text('payment_status').default('pending'), // 'pending', 'completed', 'failed'
  paymentMethod: text('payment_method'), // 'card', 'upi', 'netbanking', 'wallet'
  paidAmount: integer('paid_amount'),
  paymentCompletedAt: timestamp('payment_completed_at'),
  
  // Zoho CRM integration
  zohoLeadId: text('zoho_lead_id'), // Zoho CRM Lead ID
  zohoSyncStatus: text('zoho_sync_status').default('pending'), // 'pending', 'synced', 'failed'
  zohoSyncedAt: timestamp('zoho_synced_at'),
  zohoSyncError: text('zoho_sync_error'), // Error message if sync fails
  
  // Timeline
  createdAt: timestamp('created_at').defaultNow().notNull(),
  submittedAt: timestamp('submitted_at'), // When payment completed
  completedAt: timestamp('completed_at'), // When service delivered
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // Indexes for performance
  applicationNumberIdx: index('applications_application_number_idx').on(table.applicationNumber),
  userIdIdx: index('applications_user_id_idx').on(table.userId),
  guestIdIdx: index('applications_guest_id_idx').on(table.guestId),
  statusIdx: index('applications_status_idx').on(table.status),
  documentIdIdx: index('applications_document_id_idx').on(table.documentId),
  serviceIdIdx: index('applications_service_id_idx').on(table.documentServiceId),
  createdAtIdx: index('applications_created_at_idx').on(table.createdAt),
  submittedAtIdx: index('applications_submitted_at_idx').on(table.submittedAt),
  paymentStatusIdx: index('applications_payment_status_idx').on(table.paymentStatus),
  zohoLeadIdIdx: index('applications_zoho_lead_id_idx').on(table.zohoLeadId),
  
  // Constraint: exactly one of userId or guestId must be set
  ownershipCheck: check(
    'applications_ownership_check',
    sql`(user_id IS NOT NULL AND guest_id IS NULL) OR (user_id IS NULL AND guest_id IS NOT NULL)`
  ),
}));

// Export types for type safety
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

