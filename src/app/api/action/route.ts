import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { fail, localOnly } from "@/lib/http";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  try {
    localOnly(req);
    const body = await req.json();
    const store = getStore();
    switch (body.action) {
      case "start":
        store.start(body.chunkId);
        break;
      case "taught":
        store.taught(body.attemptId);
        break;
      case "save":
        store.save(body.attemptId, body.questionId, body.answer, body.revision);
        break;
      case "submit":
        store.submit(body.attemptId);
        break;
      case "checkout":
        store.checkout(body.prizeId, body.cost, body.checkoutId);
        break;
      case "game":
        store.saveRun(body.game, body.score, body.runId);
        break;
      case "enter":
        break;
      default:
        throw new Error("Unknown action.");
    }
    const response = NextResponse.json(store.view());
    if (body.action === "enter")
      response.cookies.set("arcade-parent", "", {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });
    return response;
  } catch (e) {
    return fail(e);
  }
}
