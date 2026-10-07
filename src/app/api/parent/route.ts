import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { fail, isParent, localOnly, parentLogin } from "@/lib/http";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export function GET(req: NextRequest) {
  try {
    localOnly(req);
    if (!isParent(req))
      return fail(new Error("Please unlock parent review."), 401);
    return NextResponse.json(getStore().reviews(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    return fail(e);
  }
}
export async function POST(req: NextRequest) {
  try {
    localOnly(req);
    const body = await req.json();
    if (body.action === "login") {
      const token = parentLogin(body.pin);
      const r = NextResponse.json({ ok: true });
      r.cookies.set("arcade-parent", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      });
      return r;
    }
    if (!isParent(req))
      return fail(new Error("Please unlock parent review."), 401);
    if (body.action !== "grade") throw new Error("Unknown action");
    getStore().grade(body.attemptId, body.questionId, body.points);
    return NextResponse.json(getStore().reviews());
  } catch (e) {
    return fail(e);
  }
}
