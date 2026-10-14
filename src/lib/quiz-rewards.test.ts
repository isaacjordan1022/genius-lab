import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store";
import { LESSONS_V3 } from "./lesson-content-v3";
import type { LearningAI } from "./learning-ai";
const ai: LearningAI = {
  async grade(items) {
    return items.map(({ question }) => ({
      questionId: question.id,
      points: 4,
      feedback: "A clear explanation.",
      model: "test",
      gradedAt: new Date().toISOString(),
    }));
  },
  async bonus() {
    throw new Error("not used");
  },
};
const lesson = LESSONS_V3[0];
function fill(s: ReturnType<typeof createStore>, id: string, index: number) {
  const section = lesson.chunks[index];
  s.taught(id, section.id);
  for (const q of lesson.forms[0].filter((q) =>
    section.questionIds[0].includes(q.id),
  ))
    s.save(
      id,
      q.id,
      q.kind === "choice"
        ? q.correct!
        : q.kind === "match"
          ? Object.fromEntries(q.matches!.map((p) => [p.left, p.right]))
          : "A reasoned answer.",
      s.read().revision,
    );
  s.submitChunk(id, section.id);
}
test("v3 quizzes pay only after grading, once per chunk, with a 100 ticket day total", async () => {
  const s = createStore(":memory:", () => [], ai);
  try {
    const id = s.start(lesson.id);
    fill(s, id, 0);
    assert.equal(s.read().balance, 0);
    await Promise.all([s.gradePending(id), s.gradePending(id)]);
    assert.equal(s.read().balance, 30);
    assert.equal(s.read().passed.length, 0);
    s.reconcileRewards();
    assert.equal(s.read().balance, 30);
    fill(s, id, 1);
    await s.gradePending(id);
    assert.equal(s.read().balance, 60);
    fill(s, id, 2);
    await s.gradePending(id);
    assert.equal(s.read().balance, 100);
    assert.equal(
      s.read().ledger.find((e) => e.event === `pass:${lesson.id}`)?.amount,
      10,
    );
    s.reconcileRewards();
    s.submitChunk(id, lesson.chunks[0].id);
    await s.gradePending(id);
    assert.equal(s.read().balance, 100);
    assert.equal(s.read().lifetime, 100);
    assert.equal(
      s.read().ledger.filter((e) => e.event.startsWith("chunk-pass:")).length,
      3,
    );
  } finally {
    s.close();
  }
});
test("restarting saves abandoned drafts and never changes submitted chunks, gates or tickets", async () => {
  const s = createStore(":memory:", () => [], ai);
  try {
    const id = s.start(lesson.id),
      first = lesson.chunks[0],
      q = lesson.forms[0][0];
    s.taught(id, first.id);
    s.save(id, q.id, q.correct!, s.read().revision);
    assert.throws(
      () => s.restartQuiz(id, first.id, s.read().revision - 1),
      /another window/,
    );
    s.restartQuiz(id, first.id, s.read().revision);
    assert.deepEqual(s.read().attempts[0].answers, {});
    assert.equal(
      s.read().attempts[0].quizRestarts![0].answers[q.id],
      q.correct,
    );
    assert.equal(s.read().balance, 0);
    assert.equal(s.read().attempts.length, 1);
    assert.deepEqual(s.view().active!.learningChunks[0].teaching, []);
    fill(s, id, 0);
    await s.gradePending(id);
    const answers = { ...s.read().attempts[0].answers };
    assert.throws(
      () => s.restartQuiz(id, first.id, s.read().revision),
      /stay locked/,
    );
    const second = lesson.chunks[1];
    s.taught(id, second.id);
    s.restartQuiz(id, second.id, s.read().revision);
    assert.deepEqual(s.read().attempts[0].answers, answers);
    assert.equal(s.read().balance, 30);
    assert.throws(() => s.start(LESSONS_V3[1].id), /earlier/);
  } finally {
    s.close();
  }
});

test("mission checkpoint pool cannot reveal unfinished lesson answers", async () => {
  const s = createStore(":memory:", () => [], ai);
  try {
    const id = s.start(lesson.id);
    assert.deepEqual(s.view().missionQuestions, []);
    fill(s, id, 0);
    await s.gradePending(id);
    const before = s.view().missionQuestions.map((q) => q.id);
    const math = lesson.chunks[1];
    s.taught(id, math.id);
    const question = lesson.forms[0].find(
      (q) => math.questionIds[0].includes(q.id) && q.kind === "choice",
    )!;
    s.save(id, question.id, question.correct!, s.read().revision);
    assert.deepEqual(
      s.view().missionQuestions.map((q) => q.id),
      before,
    );
    fill(s, id, 1);
    await s.gradePending(id);
    assert.ok(s.view().missionQuestions.some((q) => q.id === question.id));
    assert.ok(
      s
        .view()
        .missionQuestions.every(
          (q) => s.read().attempts[0].scores[q.id] != null,
        ),
    );
  } finally {
    s.close();
  }
});
