import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store";
import { CHUNKS } from "./content";
import { LESSONS_V3 } from "./lesson-content-v3";
import type { Answer } from "./content-types";
function completeFirst(store: ReturnType<typeof createStore>) {
  const chunk = CHUNKS[0],
    id = store.start(chunk.id);
  store.taught(id);
  for (const q of chunk.forms[0]) {
    const answer: Answer =
      q.kind === "choice"
        ? q.correct!
        : q.kind === "match"
          ? Object.fromEntries(q.matches!.map((m) => [m.left, m.right]))
          : q.exemplar!;
    store.save(id, q.id, answer, store.read().revision);
  }
  store.submit(id);
  return id;
}
test("pending rubric scores cannot unlock a chunk or issue tickets; one pass pays once", () => {
  const s = createStore(":memory:");
  try {
    assert.throws(() => s.start(CHUNKS[1].id), /earlier/);
    assert.throws(() => s.saveRun("snake", 100, "run1"), /Pass/);
    const id = completeFirst(s);
    assert.equal(s.read().attempts[0].result?.status, "pending");
    assert.equal(s.read().balance, 0);
    assert.throws(() => s.start(CHUNKS[1].id), /earlier/);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    assert.equal(s.read().attempts[0].result?.percent, 100);
    assert.equal(s.read().balance, 100);
    s.submit(id);
    assert.equal(s.read().balance, 100);
    assert.equal(s.read().ledger.length, 1);
    assert.throws(
      () =>
        s.grade(id, CHUNKS[0].forms[0].find((q) => q.kind === "open")!.id, 4),
      /not awaiting/,
    );
    assert.doesNotThrow(() => s.start(CHUNKS[1].id));
  } finally {
    s.close();
  }
});
test("checkout is atomic and idempotent, preserves lifetime earnings and notifies parent", () => {
  const s = createStore(":memory:", () => [
    {
      id: "catalog-test-prize",
      title: "Researched prize",
      description: "Test fixture",
      cost: 100,
      category: "Building",
      interests: ["STEM"],
      kind: "physical",
      productUrl: "https://www.walmart.com/ip/test",
      retailer: "Walmart",
    },
  ]);
  try {
    assert.throws(
      () => s.checkout("catalog-test-prize", 100, "first-purchase-001"),
      /more tickets/,
    );
    assert.equal(s.read().orders.length, 0);
    const id = completeFirst(s);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    assert.throws(
      () => s.checkout("catalog-test-prize", 1, "first-purchase-001"),
      /price changed/,
    );
    assert.equal(s.read().balance, 100);
    const order = s.checkout("catalog-test-prize", 100, "first-purchase-001");
    assert.equal(
      s.checkout("catalog-test-prize", 100, "first-purchase-001").id,
      order.id,
    );
    assert.equal(s.read().balance, 0);
    assert.equal(s.read().lifetime, 100);
    assert.equal(s.read().orders.length, 1);
    assert.equal(s.read().notifications.length, 1);
    assert.equal(s.read().ledger.length, 2);
    assert.throws(
      () => s.checkout("catalog-test-prize", 100, "second-purchase-001"),
      /more tickets/,
    );
  } finally {
    s.close();
  }
});
test("attempts resume with saved answers, reject stale revisions and freeze after submission", () => {
  const s = createStore(":memory:");
  try {
    const id = s.start(CHUNKS[0].id),
      q = CHUNKS[0].forms[0].find((q) => q.kind === "choice")!;
    assert.throws(
      () => s.save(id, q.id, q.correct!, s.read().revision),
      /cannot be changed/,
    );
    s.taught(id);
    const rev = s.read().revision;
    s.save(id, q.id, q.correct!, rev);
    assert.throws(() => s.save(id, q.id, q.correct!, rev), /another window/);
    assert.equal(s.start(CHUNKS[0].id), id);
    assert.equal(s.read().attempts[0].answers[q.id], q.correct);
    assert.throws(() => s.submit(id), /all 15/);
    const completed = completeFirst(s);
    assert.equal(completed, id);
    assert.throws(
      () => s.save(id, q.id, q.correct!, s.read().revision),
      /cannot be changed/,
    );
    assert.throws(() => s.start(CHUNKS[0].id), /finish checking/);
  } finally {
    s.close();
  }
});
test("client payload never contains unsubmitted assessment keys; retries preserve history", () => {
  const s = createStore(":memory:");
  try {
    const id = s.start(CHUNKS[0].id),
      view = s.view();
    for (const q of view.active!.questions) {
      assert.ok(!("correct" in q));
      assert.ok(!("exemplar" in q));
      assert.ok(!("explanation" in q));
      assert.ok(!("matches" in q));
    }
    completeFirst(s);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 0);
    assert.equal(s.read().attempts[0].result?.passed, false);
    assert.equal(s.read().balance, 0);
    const retry = s.start(CHUNKS[0].id);
    assert.notEqual(retry, id);
    assert.equal(s.view().active?.form, 1);
    assert.equal(s.read().attempts.length, 2);
    assert.deepEqual(s.read().attempts[0].result?.points, 52);
  } finally {
    s.close();
  }
});

test("partial matching drafts and cleared written answers persist without becoming submittable", () => {
  const s = createStore(":memory:");
  try {
    const id = s.start(CHUNKS[0].id);
    s.taught(id);
    const match = CHUNKS[0].forms[0].find((q) => q.kind === "match")!,
      open = CHUNKS[0].forms[0].find((q) => q.kind === "open")!;
    const partial = { [match.matches![0].left]: match.matches![0].right };
    s.save(id, match.id, partial, s.read().revision);
    assert.deepEqual(s.view().active?.answers[match.id], partial);
    s.save(id, open.id, "A temporary explanation", s.read().revision);
    s.save(id, open.id, "", s.read().revision);
    assert.equal(s.view().active?.answers[open.id], "");
    assert.throws(() => s.submit(id), /all 15/);
    assert.throws(
      () => s.save(id, match.id, { unknown: "invalid" }, s.read().revision),
      /invalid answer/,
    );
  } finally {
    s.close();
  }
});

test("retrying a run report saves one score and does not award wallet tickets", () => {
  const s = createStore(":memory:");
  try {
    const id = completeFirst(s);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    s.saveRun("rally", 85, "test-stable-run-id");
    s.saveRun("rally", 85, "test-stable-run-id");
    assert.equal(s.read().gameRuns.length, 1);
    assert.equal(s.read().gameRuns[0].score, 85);
    assert.equal(s.read().balance, 100);
    assert.equal(s.read().lifetime, 100);
  } finally {
    s.close();
  }
});

// Curriculum versions coexist: historical attempts keep their own content and scores.
import { LESSONS } from "./lesson-content";
import { assessmentResult } from "./rules";
import type { DailyLesson, Question } from "./content-types";
function correctAnswer(q: Question): Answer {
  return q.kind === "choice"
    ? q.correct!
    : q.kind === "match"
      ? Object.fromEntries(q.matches!.map((m) => [m.left, m.right]))
      : q.exemplar!;
}
function fillSection(
  store: ReturnType<typeof createStore>,
  id: string,
  lesson: DailyLesson,
  sectionIndex: number,
) {
  const section = lesson.chunks[sectionIndex];
  store.taught(id, section.id);
  for (const q of lesson.forms[0].filter((q) =>
    section.questionIds[0].includes(q.id),
  ))
    store.save(id, q.id, correctAnswer(q), store.read().revision);
  store.submitChunk(id, section.id);
}

test("daily chunks teach, lock and reveal feedback separately; pending review does not block the next teaching chunk", () => {
  const s = createStore(":memory:"),
    lesson = LESSONS[0];
  try {
    const id = s.start(lesson.id),
      first = lesson.chunks[0],
      second = lesson.chunks[1];
    assert.throws(() => s.taught(id, second.id), /earlier/);
    assert.throws(() => s.submit(id), /separately/);
    s.taught(id, first.id);
    const laterQuestion = lesson.forms[0].find((q) =>
      second.questionIds[0].includes(q.id),
    )!;
    assert.throws(
      () =>
        s.save(
          id,
          laterQuestion.id,
          correctAnswer(laterQuestion),
          s.read().revision,
        ),
      /teaching/,
    );
    assert.throws(() => s.submitChunk(id, first.id), /Answer all/);
    fillSection(s, id, lesson, 0);
    assert.equal(s.read().attempts[0].submittedAt, undefined);
    assert.equal(s.read().attempts[0].result?.status, "incomplete");
    assert.equal(s.read().balance, 0);
    const locked = lesson.forms[0].find((q) =>
      first.questionIds[0].includes(q.id),
    )!;
    assert.throws(
      () => s.save(id, locked.id, correctAnswer(locked), s.read().revision),
      /cannot be changed/,
    );
    const view = s.view();
    assert.ok(
      view.active!.questions.find((q) => q.id === locked.id)!.explanation,
    );
    assert.equal(
      view.active!.questions.find((q) => q.id === laterQuestion.id)!
        .explanation,
      undefined,
    );
    const earlyReviews = s.reviews().pending;
    assert.ok(earlyReviews.length > 0);
    for (const review of earlyReviews) s.grade(id, review.question.id, 4);
    assert.equal(s.read().balance, 0);
    assert.equal(s.read().attempts[0].result?.passed, false);
    assert.doesNotThrow(() => s.taught(id, second.id));
    assert.throws(() => s.start(LESSONS[1].id), /earlier/);
    for (let i = 1; i < lesson.chunks.length; i++)
      fillSection(s, id, lesson, i);
    assert.ok(s.read().attempts[0].submittedAt);
    assert.equal(s.read().attempts[0].result?.status, "pending");
    for (const review of s.reviews().pending)
      s.grade(id, review.question.id, 4);
    assert.equal(s.read().attempts[0].result?.passed, true);
    assert.equal(s.read().balance, 100);
    s.submitChunk(id, first.id);
    assert.equal(s.read().balance, 100);
    assert.doesNotThrow(() => s.start(LESSONS[1].id));
  } finally {
    s.close();
  }
});

test("legacy history, answers and earnings remain intact when new lesson content starts", () => {
  const s = createStore(":memory:");
  try {
    const legacyId = completeFirst(s);
    for (const review of s.reviews().pending)
      s.grade(legacyId, review.question.id, 4);
    const oldAttempt = structuredClone(s.read().attempts[0]);
    assert.throws(() => s.start(LESSONS[1].id), /earlier/);
    const newId = s.start(LESSONS[0].id);
    assert.notEqual(newId, legacyId);
    assert.deepEqual(s.read().attempts[0], oldAttempt);
    assert.equal(s.read().balance, 100);
    assert.equal(s.read().lifetime, 100);
    assert.equal(
      s.view().archivedLessons.find((c) => c.id === CHUNKS[0].id)?.id,
      CHUNKS[0].id,
    );
    assert.equal(s.view().chunks[0].id, LESSONS_V3[0].id);
    assert.equal(s.view().active?.contentVersion, 2);
  } finally {
    s.close();
  }
});

test("24-question weekly tests use their actual denominator and cannot round up to a 90 percent pass", () => {
  const scores = Array<number>(24).fill(4);
  scores[0] = 0;
  scores[1] = 0;
  scores[2] = 2;
  assert.equal(assessmentResult(scores, 24).points, 86);
  assert.equal(assessmentResult(scores, 24).maxPoints, 96);
  assert.equal(assessmentResult(scores, 24).passed, false);
  scores[2] = 3;
  assert.equal(assessmentResult(scores, 24).passed, true);
  assert.equal(assessmentResult(scores.slice(1), 24).status, "incomplete");
  assert.equal(
    assessmentResult([...scores.slice(1), null], 24).status,
    "pending",
  );
});

test("weekly assessment waits for all 24 answers and rubric reviews, after five daily passes", () => {
  const s = createStore(":memory:"),
    weekly = LESSONS.find((l) => l.assessmentOnly)!;
  try {
    assert.throws(() => s.start(weekly.id), /earlier/);
    for (const lesson of LESSONS.filter((l) => !l.assessmentOnly)) {
      const id = s.start(lesson.id);
      for (let i = 0; i < lesson.chunks.length; i++)
        fillSection(s, id, lesson, i);
      for (const review of s.reviews().pending)
        s.grade(id, review.question.id, 4);
    }
    const id = s.start(weekly.id);
    s.taught(id);
    assert.equal(weekly.forms[0].length, 24);
    for (const q of weekly.forms[0].slice(0, -1))
      s.save(id, q.id, correctAnswer(q), s.read().revision);
    assert.throws(() => s.submit(id), /all 24/);
    const last = weekly.forms[0].at(-1)!;
    s.save(id, last.id, correctAnswer(last), s.read().revision);
    s.submit(id);
    assert.equal(s.read().attempts.at(-1)!.result?.status, "pending");
    assert.equal(s.read().attempts.at(-1)!.result?.maxPoints, 96);
    assert.equal(s.read().balance, 500);
    for (const review of s.reviews().pending)
      s.grade(id, review.question.id, 4);
    assert.equal(s.read().balance, 600);
    assert.equal(s.read().attempts.at(-1)!.result?.percent, 100);
  } finally {
    s.close();
  }
});

test("finished history can be reopened without issuing another reward", () => {
  const s = createStore(":memory:");
  try {
    const id = completeFirst(s);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    s.start(CHUNKS[1].id);
    s.resume(id);
    assert.equal(s.view().active?.id, id);
    assert.equal(s.read().balance, 100);
    assert.equal(s.read().attempts.length, 2);
    assert.throws(() => s.resume("missing"), /not found/);
  } finally {
    s.close();
  }
});
