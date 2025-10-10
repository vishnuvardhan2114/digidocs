import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";
import * as relations from "./schema/relations";

// Load environment variables in non-production
if (process.env.NODE_ENV !== "production") {
  config({ path: "../../.env.local" });
}

// Lazy initialization to avoid build-time errors
let _db: ReturnType<typeof drizzle> | null = null;

function getDatabase() {
  if (_db) return _db;

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);

  _db = drizzle(sql, {
    schema: {
      ...schema,
      ...relations,
    },
  });

  return _db;
}

// Export database instance with schema and relations for type-safe queries
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get: (_, prop) => {
    return getDatabase()[prop as keyof ReturnType<typeof drizzle>];
  },
});
