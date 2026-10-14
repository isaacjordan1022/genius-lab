import { randomBytes } from "node:crypto";
import type { NextRequest } from "next/server";
import { cloudEnabled, ensureSchema, pool, transaction } from "./account-database";
import { tokenHash, verifyPassword } from "./passwords";
import { localOnly } from "./http";

export const SESSION_COOKIE = "genius-session";
export const SESSION_SECONDS = 7 * 24 * 60 * 60;
export type ChildAccount = { id: string; name: string; age: number; grade: number };
export class AuthError extends Error { constructor(message = "Sign in to Genius Lab.", public status = 401) { super(message); } }
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host") ?? req.nextUrl.host;
  let originHost: string | undefined;
  try { originHost = origin ? new URL(origin).host : undefined; }
  catch { throw new AuthError("This request must come from Genius Lab.", 403); }
  if (req.headers.get("sec-fetch-site") === "cross-site" || (originHost && originHost !== host))
    throw new AuthError("This request must come from Genius Lab.", 403);
}
export async function requireChild(req: NextRequest): Promise<ChildAccount | null> {
  sameOrigin(req);
  if (!cloudEnabled()) {
    if (process.env.VERCEL) throw new AuthError("The learning database is not connected yet.", 503);
    localOnly(req);
    return null;
  }
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) throw new AuthError();
  await ensureSchema();
  const result = await pool().query<ChildAccount>(`SELECT c.id, c.display_name AS name, c.age, c.grade
    FROM genius_sessions s JOIN genius_children c ON c.id=s.child_id
    WHERE s.token_hash=$1 AND s.expires_at>now()`, [tokenHash(token)]);
  if (!result.rows[0]) throw new AuthError();
  return result.rows[0];
}
export async function login(req: NextRequest, username: unknown, password: unknown) {
  sameOrigin(req);
  if (typeof username !== "string" || username.length > 80 || typeof password !== "string" || password.length > 256)
    throw new AuthError("That username or password did not match.");
  const normalized = username.trim().toLowerCase();
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  // Shared persistent throttles work across serverless instances and unknown usernames.
  const limited = await transaction(async client => {
    await client.query("DELETE FROM genius_login_limits WHERE expires_at<now()");
    let blocked = false;
    for (const [key, max] of [[`account:${normalized}`, 8], [`ip:${ip}`, 30]] as const) {
      const result = await client.query(`INSERT INTO genius_login_limits(key,attempts,expires_at) VALUES($1,1,now()+interval '10 minutes')
        ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN genius_login_limits.expires_at<now() THEN 1 ELSE genius_login_limits.attempts+1 END,
        expires_at=CASE WHEN genius_login_limits.expires_at<now() THEN now()+interval '10 minutes' ELSE genius_login_limits.expires_at END RETURNING attempts`, [tokenHash(key)]);
      if (result.rows[0].attempts > max) blocked = true;
    }
    return blocked;
  });
  if (limited) throw new AuthError("Too many tries. Please wait ten minutes.", 429);
  const result = await pool().query(`SELECT id,display_name AS name,age,grade,password_hash FROM genius_children WHERE username=$1`, [normalized]);
  const row = result.rows[0];
  // Spend the same password-hash work for an unknown username.
  const fake = `scrypt:00000000000000000000000000000000:${"00".repeat(64)}`;
  if (!verifyPassword(password, row?.password_hash ?? fake) || !row)
    throw new AuthError("That username or password did not match.");
  const token = randomBytes(32).toString("hex");
  await transaction(async client => {
    await client.query("DELETE FROM genius_sessions WHERE expires_at<now()");
    await client.query("INSERT INTO genius_sessions(token_hash,child_id,expires_at) VALUES($1,$2,now()+interval '7 days')", [tokenHash(token),row.id]);
    await client.query("DELETE FROM genius_login_limits WHERE key=$1", [tokenHash(`account:${normalized}`)]);
  });
  const profile: ChildAccount = { id: row.id, name: row.name, age: row.age, grade: row.grade };
  return { token, profile };
}
export async function logout(req: NextRequest) {
  sameOrigin(req);
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (cloudEnabled() && token) {
    await ensureSchema();
    await pool().query("DELETE FROM genius_sessions WHERE token_hash=$1", [tokenHash(token)]);
  }
}
