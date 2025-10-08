import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "../../.env.local" });

export default defineConfig({
   schema: "./src/schema/*.ts",
   out: "./drizzle",
   driver: "pg",
   dbCredentials: {
      connectionString: process.env.DATABASE_URL!,
   },
});
