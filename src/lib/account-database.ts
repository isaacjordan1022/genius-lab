import { Pool, type PoolClient } from "pg";

const globalDb = globalThis as typeof globalThis & { geniusPool?: Pool; geniusSchema?: Promise<void> };
export function cloudEnabled() { return !!process.env.DATABASE_URL; }
export function pool() {
  if (!process.env.DATABASE_URL) throw new Error("The learning database is not connected yet.");
  return globalDb.geniusPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 4, connectionTimeoutMillis: 15000, idleTimeoutMillis: 10000 });
}
export async function ensureSchema() {
  if (!globalDb.geniusSchema) {
    globalDb.geniusSchema = pool().query(`
      CREATE TABLE IF NOT EXISTS genius_children (
        id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL,
        display_name TEXT NOT NULL, age INTEGER NOT NULL, grade INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS genius_progress (
        child_id TEXT PRIMARY KEY REFERENCES genius_children(id), state JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS genius_sessions (
        token_hash TEXT PRIMARY KEY, child_id TEXT NOT NULL REFERENCES genius_children(id),
        expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS genius_sessions_expiry ON genius_sessions(expires_at);
      CREATE TABLE IF NOT EXISTS genius_login_limits (
        key TEXT PRIMARY KEY, attempts INTEGER NOT NULL, expires_at TIMESTAMPTZ NOT NULL
      );
    `).then(() => undefined).catch(error => { globalDb.geniusSchema = undefined; throw error; });
  }
  await globalDb.geniusSchema;
}
export async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  await ensureSchema();
  const client = await pool().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch(error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
