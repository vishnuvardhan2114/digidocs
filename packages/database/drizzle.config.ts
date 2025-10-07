import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: "../../.env.local" }); 

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle", 
  dialect: "postgresql",
  driver: "pg",
  verbose: true,
  strict: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} as any);