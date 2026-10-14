import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";
export function hashPassword(password: string) {
  if (!password || password.length > 256) throw new Error("Password is required.");
  const salt = randomBytes(16).toString("hex");
  return `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function verifyPassword(password: unknown, stored: string) {
  if (typeof password !== "string" || password.length > 256) return false;
  const [scheme, salt, encoded] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !encoded) return false;
  const expected = Buffer.from(encoded, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export function tokenHash(token: string) { return createHash("sha256").update(token).digest("hex"); }
