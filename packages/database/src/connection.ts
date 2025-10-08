import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";
import * as relations from "./schema/relations";

// Load environment variables only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  config({ path: "../../.env.local" });
}

// Lazy initialization - only create connection when actually used
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql as any, { 
      schema: {
        ...schema,
        ...relations,
      }
    });
  }
  return _db;
}

// Export database instance with schema and relations for type-safe queries
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});
