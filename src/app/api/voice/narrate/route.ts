import { NextRequest, NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { narrate } from "@/lib/voice";
import { requireChild } from "@/lib/auth";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  try {
    await requireChild(req);
    if (Number(req.headers.get("content-length")) > 60000) throw new Error("That text is too long.");
    const { text } = await req.json();
    return NextResponse.json(await narrate(text), { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return fail(e, 503); }
}
