import test from "node:test";
import assert from "node:assert/strict";
import { planDate, planRange } from "./week-plan";
import { HOW_THINGS_WORK } from "./how-things-work";
import { createStore } from "./store";
import { LESSONS } from "./lesson-content";
test("published week dates stay pinned and cross month/year boundaries correctly", () => {
  assert.equal(planDate(1).label, "Sunday, Oct 4");
  assert.equal(planDate(6).label, "Friday, Oct 9");
  assert.equal(planRange(), "Oct 4 – Oct 9, 2026");
  assert.equal(planDate(6, "2026-12-27").iso, "2027-01-01");
  assert.equal(planRange("2026-12-27"), "Dec 27, 2026 – Jan 1, 2027");
});
test("weekly exploration saves scored work without replacing daily progress or granting unlocks", () => {
  const s = createStore(":memory:");
  try {
    const daily = s.start(LESSONS[0].id);
    const id = s.start(HOW_THINGS_WORK.id);
    const section = HOW_THINGS_WORK.chunks[0];
    s.taught(id, section.id);
    for (const q of HOW_THINGS_WORK.forms[0])
      s.save(
        id,
        q.id,
        q.kind === "choice"
          ? q.correct!
          : q.kind === "match"
            ? Object.fromEntries(q.matches!.map((m) => [m.left, m.right]))
            : q.exemplar!,
        s.read().revision,
      );
    s.submitChunk(id, section.id);
    assert.equal(s.view().active?.result?.status, "pending");
    for (const q of HOW_THINGS_WORK.forms[0].filter((q) => q.kind === "open"))
      s.grade(id, q.id, 4);
    assert.equal(s.view().active?.result?.percent, 100);
    assert.equal(s.view().active?.result?.maxPoints, 20);
    assert.equal(s.read().balance, 0);
    assert.equal(s.read().ledger.length, 0);
    assert.throws(() => s.saveRun("snake", 10, "not-unlocked"), /Pass/);
    assert.throws(() => s.start(LESSONS[1].id), /earlier/);
    s.resume(daily);
    assert.equal(s.view().active?.chunkId, LESSONS[0].id);
    assert.equal(s.read().attempts.length, 2);
  } finally {
    s.close();
  }
});
