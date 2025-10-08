import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";
import * as relations from "./schema/relations";

config({ path: "../../.env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(process.env.DATABASE_URL);

// Export database instance with schema and relations for type-safe queries
export const db = drizzle(sql as any, { 
  schema: {
    ...schema,
    ...relations,
  }
});
