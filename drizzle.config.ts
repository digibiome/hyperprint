import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// Next loads .env.local for the app; drizzle-kit doesn't, so load it here for local runs.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

/** `pnpm db:generate` writes SQL to db/migrations; `pnpm db:migrate` applies it to DATABASE_URL (Neon). */
export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
