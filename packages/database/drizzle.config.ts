import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Only load .env in non-production environments
if (process.env.NODE_ENV !== "production") {
   config({ path: "../../.env.local" });
}

export default defineConfig({
   schema: "./src/schema/*.ts",
   out: "./drizzle",
   driver: "pg",
   dbCredentials: {
      connectionString: process.env.DATABASE_URL || "",
   },
});
