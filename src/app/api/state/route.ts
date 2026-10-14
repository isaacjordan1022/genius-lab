import { NextRequest, NextResponse } from "next/server";
import { withRequestStore } from "@/lib/request-store";
import { fail } from "@/lib/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(await withRequestStore(req, store => store.view()), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return fail(e);
  }
}
