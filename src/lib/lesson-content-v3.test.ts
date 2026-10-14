import test from "node:test";
import assert from "node:assert/strict";
import { LESSONS as V2 } from "./lesson-content";
import { LESSONS_V3, READING_PASSAGES_V3 } from "./lesson-content-v3";

test("v3 publishes substantial paragraph-based reading with questions tied to each passage", () => {
  assert.equal(READING_PASSAGES_V3.length, 5);
  for (const [i, p] of READING_PASSAGES_V3.entries()) {
    const words = p.text.trim().split(/\s+/).length;
    assert.ok(words >= 250 && words <= 400, `${p.title}: ${words} words`);
    assert.equal(p.text.split(/\n\s*\n/).length, 6);
    const lesson = LESSONS_V3[i];
    assert.equal(lesson.chunks[0].teaching[0].text, p.text);
    for (const form of lesson.forms) {
      const reading = form.slice(0, 5);
      assert.ok(reading.every((q) => q.prompt.includes(p.title)));
      assert.deepEqual(
        reading.map((q) => q.kind),
        ["choice", "open", "match", "choice", "open"],
      );
      assert.ok(
        reading
          .filter((q) => q.kind === "open")
          .every((q) => q.rubric?.length === 4 && q.exemplar),
      );
    }
    assert.notEqual(lesson.forms[0][0].prompt, lesson.forms[1][0].prompt);
    assert.notEqual(lesson.forms[0][1].prompt, lesson.forms[1][1].prompt);
  }
});

test("v3 is a separate publication preserving all archived objects and answer memberships", () => {
  const ids = new Set<string>();
  assert.equal(LESSONS_V3.length, 6);
  for (const [i, l] of LESSONS_V3.entries()) {
    assert.equal(l.version, 3);
    assert.equal(l.id, i === 5 ? "weekly-test-v3" : `lesson-v3-${i + 1}`);
    assert.notEqual(l, V2[i]);
    assert.equal(V2[i].version, 2);
    assert.ok(V2[i].id.includes("v2"));
    for (const [f, form] of l.forms.entries()) {
      assert.equal(form.length, i === 5 ? 24 : 15);
      if (i < 5)
        assert.deepEqual(
          l.chunks.flatMap((c) => c.questionIds[f]),
          form.map((q) => q.id),
        );
      for (const q of form) {
        assert.ok(q.id.includes("v3"));
        assert.ok(!ids.has(q.id));
        ids.add(q.id);
        assert.equal(q.points, 4);
        assert.ok(q.objective && q.explanation);
        if (q.kind === "choice") {
          assert.equal(q.choices?.length, 4);
          assert.equal(new Set(q.choices).size, 4);
          assert.ok(q.choices?.includes(q.correct!));
        }
        if (q.kind === "match") {
          assert.equal(q.matches?.length, 4);
          assert.equal(new Set(q.matches?.map((p) => p.right)).size, 4);
        }
        if (q.kind === "open") {
          assert.equal(q.rubric?.length, 4);
          assert.ok(q.exemplar);
        }
      }
    }
  }
  assert.equal(V2[0].chunks[0].title, "The clue desk");
  assert.equal(V2[0].chunks[0].teaching[1].title, "The suspicious windmill");
  assert.notEqual(LESSONS_V3[0].forms[0][5], V2[0].forms[0][5]);
  assert.notEqual(LESSONS_V3[0].forms[0][5].choices, V2[0].forms[0][5].choices);
});

test("visual fraction instruction covers equivalence, comparison, both operations and quantities", () => {
  const models = LESSONS_V3.flatMap((l) =>
    l.teaching.flatMap((b) => (b.fractionModel ? [b.fractionModel] : [])),
  );
  assert.deepEqual(
    new Set(models.map((m) => m.mode)),
    new Set(["equivalence", "compare", "add", "subtract", "quantity"]),
  );
  for (const m of models) {
    assert.ok(m.denominator > 0 && m.numerator <= m.denominator);
    assert.equal(m.steps.length, 4);
    if (m.mode === "quantity") assert.equal(m.total! % m.denominator, 0);
    if (m.mode === "add")
      assert.ok(
        m.numerator / m.denominator + m.otherNumerator! / m.otherDenominator! <=
          1,
      );
    if (m.mode === "subtract")
      assert.ok(
        m.numerator / m.denominator >= m.otherNumerator! / m.otherDenominator!,
      );
  }
});

test("weekly reading assessment uses new evidence and keeps teaching unavailable", () => {
  const week = LESSONS_V3[5];
  assert.equal(week.assessmentOnly, true);
  assert.equal(week.teaching.length, 0);
  for (const [f, form] of week.forms.entries()) {
    assert.notEqual(form[0].prompt, V2[5].forms[f][0].prompt);
    assert.notEqual(form[5].prompt, V2[5].forms[f][5].prompt);
    assert.notEqual(form[19].prompt, V2[5].forms[f][19].prompt);
    assert.ok(form[0].prompt.includes("new passage"));
    assert.ok(form[5].prompt.includes("Cite two actions"));
  }
  assert.notEqual(week.forms[0][0].prompt, week.forms[1][0].prompt);
});
