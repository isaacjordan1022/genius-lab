import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { fail, localOnly } from "@/lib/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(req: NextRequest) {
  try {
    localOnly(req);
    return NextResponse.json(getStore().view(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return fail(e);
  }
}
