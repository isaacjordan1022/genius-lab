import { NextRequest, NextResponse } from "next/server";
import { randomBytes, timingSafeEqual } from "node:crypto";
const g = globalThis as typeof globalThis & {
  parentToken?: string;
  parentFailures?: number;
  parentBlockedUntil?: number;
};
export function localOnly(req: NextRequest) {
  if (
    process.env.VERCEL ||
    !["127.0.0.1", "localhost", "[::1]"].includes(req.nextUrl.hostname)
  )
    throw new Error(
      "This is a local pilot. Production accounts are not connected.",
    );
  const host = req.headers.get("host") ?? req.nextUrl.host;
  const localUrl = new URL(`${req.nextUrl.protocol}//${host}`);
  if (!["127.0.0.1", "localhost", "[::1]"].includes(localUrl.hostname))
    throw new Error("This is a local pilot.");
  const origin = req.headers.get("origin");
  if (origin && origin !== localUrl.origin)
    throw new Error("This request must come from the app.");
}
export function isParent(req: NextRequest) {
  const token = req.cookies.get("arcade-parent")?.value;
  return !!g.parentToken && token === g.parentToken;
}
export function parentLogin(pin: unknown) {
  if (Date.now() < (g.parentBlockedUntil ?? 0))
    throw new Error("Please wait a minute before trying again.");
  const expected = Buffer.from(process.env.DEMO_PARENT_PIN ?? "2468"),
    received = Buffer.from(typeof pin === "string" ? pin : "");
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    g.parentFailures = (g.parentFailures ?? 0) + 1;
    if (g.parentFailures >= 5) {
      g.parentBlockedUntil = Date.now() + 60000;
      g.parentFailures = 0;
    }
    throw new Error("That PIN did not match.");
  }
  g.parentFailures = 0;
  g.parentToken = randomBytes(32).toString("hex");
  return g.parentToken;
}
export function fail(e: unknown, status = 400) {
  return NextResponse.json(
    { error: e instanceof Error ? e.message : "Something went wrong." },
    { status },
  );
}
