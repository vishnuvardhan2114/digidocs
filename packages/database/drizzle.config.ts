import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env.local' }); 

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle", 
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    // @ts-ignore
    url: process.env.DATABASE_URL!,
  }
});