import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: text("email").unique().notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    isAdmin: boolean("is_admin").notNull().default(false),
    // Additional profile fields
    phone: text("phone"),
    phoneVerified: boolean("phone_verified").default(false),
    image: text("image"),

    // Profile completion tracking
    profileCompleted: boolean("profile_completed").default(false).notNull(),

    // // Zoho CRM integration fields
    zohoLeadId: text("zoho_lead_id"),
    zohoLeadCreated: boolean("zoho_lead_created").default(false),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    createdAtIdx: index("users_created_at_idx").on(table.createdAt),
    phoneIdx: index("users_phone_idx").on(table.phone),
  })
);

// Export types for type safety
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;