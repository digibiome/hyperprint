import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/** Local Postgres in dev; Neon's pooled connection string on Vercel. */
export const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), { schema });
