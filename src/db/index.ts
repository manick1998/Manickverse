import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

let pool: Pool | null = null;
let dbInstance: any = null;

if (databaseUrl) {
  const globalForDb = globalThis as typeof globalThis & {
    __arenaNextJsPostgresqlPool?: Pool;
  };

  pool =
    globalForDb.__arenaNextJsPostgresqlPool ??
    new Pool({
      connectionString: databaseUrl,
    });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
  }

  dbInstance = drizzle(pool);
} else {
  // Graceful fallback dummy db when DATABASE_URL is not configured during build or local dev
  dbInstance = {
    execute: async () => Promise.resolve([{ result: 1 }]),
    insert: () => ({
      values: () => ({
        returning: async () => [{ id: Math.floor(Math.random() * 10000) }],
      }),
    }),
  };
}

export { pool };
export const db = dbInstance;
