import { NextRequest, NextResponse } from "next/server";
import { fail } from "@/lib/http";
import { transcribe } from "@/lib/voice";
import { requireChild } from "@/lib/auth";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(req: NextRequest) {
  try {
    await requireChild(req);
    if (Number(req.headers.get("content-length")) > 11 * 1024 * 1024) throw new Error("That recording is too long.");
    const file = (await req.formData()).get("file");
    if (!(file instanceof File)) throw new Error("Record an answer first.");
    return NextResponse.json(await transcribe(file), { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return fail(e, 503); }
}
