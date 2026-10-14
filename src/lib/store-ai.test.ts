import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createStore } from "./store";
import { LESSONS } from "./lesson-content";
import { LESSONS_V3 } from "./lesson-content-v3";
import type { LearningAI } from "./learning-ai";
import type { Answer } from "./content-types";
const ai: LearningAI = {
  async grade(items) {
    return items.map(({ question, answer }) => ({
      questionId: question.id,
      points: answer === "an incorrect idea" ? 0 : 4,
      feedback:
        "Your reasoning connects the evidence to the conclusion. Another example helps show why it works.",
      model: "test-model",
      gradedAt: new Date().toISOString(),
    }));
  },
  async bonus() {
    return {
      question: {
        id: "generated",
        kind: "open",
        points: 4,
        prompt:
          "Explain a new situation where evidence could change your mind.",
        exemplar: "An observation gives a reason to revise an idea.",
        rubric: ["Connects evidence", "Explains a reason"],
        explanation:
          "Evidence can help us revise an idea when new facts appear.",
        objective: "Apply evidence",
      },
      model: "test-model",
    };
  },
};
function submitFirst(s: ReturnType<typeof createStore>, id: string) {
  const l = LESSONS[0],
    c = l.chunks[0];
  s.taught(id, c.id);
  for (const q of l.forms[0].filter((q) => c.questionIds[0].includes(q.id))) {
    const answer: Answer =
      q.kind === "choice"
        ? q.correct!
        : q.kind === "match"
          ? Object.fromEntries(q.matches!.map((p) => [p.left, p.right]))
          : "A meaningful explanation in my own words.";
    s.save(id, q.id, answer, s.read().revision);
  }
  s.submitChunk(id, c.id);
  return c;
}
test("AI failure preserves locked answers; retry persists semantic feedback without awarding unfinished lessons", async () => {
  let failing = true;
  const s = createStore(":memory:", () => [], {
    ...ai,
    async grade(items) {
      if (failing) throw new Error("provider secret must not leak");
      return ai.grade(items);
    },
  });
  try {
    const id = s.start(LESSONS[0].id),
      c = submitFirst(s, id),
      before = s.read().attempts[0].answers;
    await s.gradePending(id);
    assert.equal(s.view().active?.aiStatus, "pending");
    assert.doesNotMatch(s.view().active?.aiMessage ?? "", /secret/);
    assert.deepEqual(s.read().attempts[0].answers, before);
    assert.equal(s.read().balance, 0);
    assert.throws(() =>
      s.save(id, c.questionIds[0][0], "changed", s.read().revision),
    );
    failing = false;
    await Promise.all([s.gradePending(id), s.gradePending(id)]);
    assert.equal(s.view().active?.aiStatus, "complete");
    assert.equal(s.read().balance, 0);
    assert.ok(s.view().active?.aiGrades);
    assert.equal(s.read().attempts[0].result?.status, "incomplete");
  } finally {
    s.close();
  }
});
test("active quiz teaching is omitted on all current and archived public surfaces even after resuming", () => {
  const s = createStore(":memory:", () => [], ai);
  try {
    const l = LESSONS[0],
      id = s.start(l.id);
    assert.ok(s.view().active!.learningChunks[0].teaching.length);
    s.taught(id, l.chunks[0].id);
    s.resume(id);
    assert.deepEqual(s.view().active!.learningChunks[0].teaching, []);
    assert.deepEqual(
      s.view().archivedLessons.find((c) => c.id === l.id)!.chunks[0].teaching,
      [],
    );
    assert.deepEqual(
      s.view().archivedLessons.find((c) => c.id === l.id)!.teaching,
      [],
    );
  } finally {
    s.close();
  }
});
test("bonus bank is immutable, persists across restart, and both bonus and weekly test reward only once", async () => {
  const dir = mkdtempSync(join(tmpdir(), "learning-bonus-")),
    file = join(dir, "state.sqlite");
  let s = createStore(file, () => [], ai);
  try {
    const id = s.start(LESSONS[0].id),
      c = submitFirst(s, id);
    await s.gradePending(id);
    const bonusId = await s.generateBonus(id, c.id);
    assert.equal(await s.generateBonus(id, c.id), bonusId);
    s.saveBonus(bonusId, "A draft worth saving.");
    assert.equal(s.view().bonusBank[0].answer, "A draft worth saving.");
    const publicBonus = s.view().bonusBank[0];
    assert.ok(!("exemplar" in publicBonus.question));
    assert.ok(!("explanation" in publicBonus));
    await Promise.all([
      s.answerBonus(bonusId, "An observation changed my idea."),
      s.answerBonus(bonusId, "an incorrect idea"),
    ]);
    assert.equal(s.read().balance, 5);
    assert.equal(
      s.read().bonusBank![0].answer,
      "An observation changed my idea.",
    );
    await s.retryBonus(bonusId);
    assert.equal(s.read().balance, 5);
    assert.throws(() => s.startBonusTest(), /five daily/);
    for (const lesson of LESSONS_V3.filter((l) => !l.assessmentOnly)) {
      const attemptId = s.start(lesson.id);
      for (const section of lesson.chunks) {
        s.taught(attemptId, section.id);
        for (const q of lesson.forms[0].filter((q) =>
          section.questionIds[0].includes(q.id),
        )) {
          const answer: Answer =
            q.kind === "choice"
              ? q.correct!
              : q.kind === "match"
                ? Object.fromEntries(q.matches!.map((p) => [p.left, p.right]))
                : "A complete reasoned answer.";
          s.save(attemptId, q.id, answer, s.read().revision);
        }
        s.submitChunk(attemptId, section.id);
        await s.gradePending(attemptId);
      }
    }
    const testId = s.startBonusTest();
    assert.equal(s.startBonusTest(), testId);
    const q = s.view().bonusTests[0].questions[0];
    s.saveBonusTest(
      testId,
      q.id,
      "New evidence lets me make a better prediction.",
    );
    await Promise.all([s.submitBonusTest(testId), s.submitBonusTest(testId)]);
    assert.equal(s.read().balance, 510);
    assert.equal(s.view().bonusTests[0].result?.passed, true);
    assert.throws(() => s.saveBonusTest(testId, q.id, "changed"));
    const before = s.read();
    s.close();
    s = createStore(file, () => [], ai);
    assert.deepEqual(s.read(), before);
    await s.submitBonusTest(testId);
    assert.equal(s.read().balance, 510);
    assert.equal(s.read().ledger.length, 22);
  } finally {
    s.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
