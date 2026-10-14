import { NextRequest, NextResponse } from "next/server";
import { withRequestStore } from "@/lib/request-store";
import { fail } from "@/lib/http";
export const runtime = "nodejs";
export const maxDuration = 120;
export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get("content-length")) > 60000) throw new Error("That answer is too long.");
    const body = await req.json();
    const view = await withRequestStore(req, async store => {
    switch (body.action) {
      case "start":
        store.start(body.chunkId);
        break;
      case "restartQuiz":
        store.restartQuiz(body.attemptId, body.chunkId, body.revision);
        break;
      case "resume":
        store.resume(body.attemptId);
        break;
      case "taught":
        store.taught(body.attemptId, body.chunkId);
        break;
      case "reopenTeaching":
        store.reopenTeaching(body.attemptId, body.chunkId);
        break;
      case "save":
        store.save(body.attemptId, body.questionId, body.answer, body.revision);
        break;
      case "submitChunk":
        store.submitChunk(body.attemptId, body.chunkId);
        await store.gradePending(body.attemptId);
        break;
      case "submit":
        store.submit(body.attemptId);
        await store.gradePending(body.attemptId);
        break;
      case "retryAI":
        await store.gradePending(body.attemptId);
        break;
      case "bonus":
        await store.generateBonus(body.attemptId, body.chunkId);
        break;
      case "saveBonus":
        store.saveBonus(body.bonusId, body.answer);
        break;
      case "answerBonus":
        await store.answerBonus(body.bonusId, body.answer);
        break;
      case "retryBonus":
        await store.retryBonus(body.bonusId);
        break;
      case "bonusTest":
        store.startBonusTest();
        break;
      case "saveBonusTest":
        store.saveBonusTest(body.testId, body.questionId, body.answer);
        break;
      case "submitBonusTest":
        await store.submitBonusTest(body.testId);
        break;
      case "retryBonusTest":
        await store.retryBonusTest(body.testId);
        break;
      case "checkout":
        store.checkout(body.prizeId, body.cost, body.checkoutId);
        break;
      case "game":
        store.saveRun(body.game, body.score, body.runId);
        break;
      case "enter":
        store.reconcileRewards();
        break;
      default:
        throw new Error("Unknown action.");
    }
    return store.view();
    });
    const response = NextResponse.json(view, {headers:{"Cache-Control":"no-store"}});
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
