import { pgTable, text, timestamp, uuid, integer, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users';

/**
 * Documents table - Admin managed document types
 * Represents the main service categories (e.g., Passport, PAN Card, E-Stamp)
 */
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Document info
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  category: text('category').notNull(), // "government", "legal", "identity", "business"
  
  // Media
  image: text('image'), 
  
  // Configuration
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  
  // Audit
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
}, (table) => ({
  slugIdx: index('documents_slug_idx').on(table.slug),
  categoryIdx: index('documents_category_idx').on(table.category),
  isActiveIdx: index('documents_is_active_idx').on(table.isActive),
  displayOrderIdx: index('documents_display_order_idx').on(table.displayOrder),
}));

// Export types for type safety
export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

