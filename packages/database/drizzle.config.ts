import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Only load .env in non-production environments
if (process.env.NODE_ENV !== "production") {
  config({ path: "../../.env.local" });
}

export default defineConfig({
  schema: "./src/schema/*.ts",
  out: "./drizzle",
  dialect: "postgresql", // Changed from driver: "pg"
  dbCredentials: {
    url: process.env.DATABASE_URL || "", // Changed from connectionString
  },
});
