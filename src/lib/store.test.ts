import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "./store";
import { CHUNKS } from "./content";
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
  const s = createStore(":memory:");
  try {
    assert.throws(
      () => s.checkout("art-kit", 100, "first-purchase-001"),
      /more tickets/,
    );
    assert.equal(s.read().orders.length, 0);
    const id = completeFirst(s);
    for (const q of CHUNKS[0].forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    assert.throws(
      () => s.checkout("art-kit", 1, "first-purchase-001"),
      /price changed/,
    );
    assert.equal(s.read().balance, 100);
    const order = s.checkout("art-kit", 100, "first-purchase-001");
    assert.equal(s.checkout("art-kit", 100, "first-purchase-001").id, order.id);
    assert.equal(s.read().balance, 0);
    assert.equal(s.read().lifetime, 100);
    assert.equal(s.read().orders.length, 1);
    assert.equal(s.read().notifications.length, 1);
    assert.equal(s.read().ledger.length, 2);
    assert.throws(
      () => s.checkout("art-kit", 100, "second-purchase-001"),
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
    assert.throws(() => s.start(CHUNKS[0].id), /waiting for review/);
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
