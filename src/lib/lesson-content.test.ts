import test from "node:test";
import assert from "node:assert/strict";
import { LESSONS, WEEK_OBJECTIVES_V2 } from "./lesson-content";
import { CHUNKS } from "./content";

test("v2 has five daily lessons and an independent larger weekly test", () => {
  assert.equal(LESSONS.length, 6);
  assert.deepEqual(
    LESSONS.map((x) => x.order),
    [1, 2, 3, 4, 5, 6],
  );
  for (const lesson of LESSONS.slice(0, 5)) {
    assert.equal(lesson.version, 2);
    assert.equal(lesson.forms.length, 2);
    assert.equal(lesson.chunks.length, 3);
    assert.ok(lesson.subjects.length >= 2);
    for (const [f, form] of lesson.forms.entries()) {
      assert.equal(form.length, 15);
      assert.equal(form.filter((q) => q.kind === "open").length, 6);
      const membership = lesson.chunks.flatMap((c) => c.questionIds[f]);
      assert.deepEqual(
        membership,
        form.map((q) => q.id),
      );
      assert.equal(new Set(membership).size, 15);
      for (const chunk of lesson.chunks) {
        assert.equal(chunk.questionIds[f].length, 5);
        assert.ok(chunk.teaching.length >= 2);
        assert.ok(chunk.teaching.every((b) => b.kind && b.text.length < 650));
        assert.deepEqual(
          chunk.questionIds[f].map((id) => form.find((q) => q.id === id)?.kind),
          ["choice", "open", "match", "choice", "open"],
        );
      }
    }
  }
  const testLesson = LESSONS[5];
  assert.equal(testLesson.assessmentOnly, true);
  assert.equal(testLesson.id, "weekly-test-v2");
  assert.equal(testLesson.teaching.length, 0);
  assert.deepEqual(
    testLesson.forms.map((f) => f.length),
    [24, 24],
  );
  assert.ok(WEEK_OBJECTIVES_V2.length >= 8);
});

test("v2 keys, rubrics and matching relationships are complete and unambiguous", () => {
  const ids: string[] = [];
  for (const lesson of LESSONS)
    for (const form of lesson.forms)
      for (const q of form) {
        ids.push(q.id);
        assert.equal(q.points, 4);
        assert.ok(q.explanation && q.objective);
        if (q.kind === "choice") {
          assert.equal(q.choices?.length, 4);
          assert.equal(new Set(q.choices).size, 4);
          assert.ok(q.choices?.includes(q.correct!));
        } else if (q.kind === "match") {
          assert.equal(q.matches?.length, 4);
          assert.equal(new Set(q.matches?.map((p) => p.left)).size, 4);
          assert.equal(new Set(q.matches?.map((p) => p.right)).size, 4);
        } else {
          assert.equal(q.rubric?.length, 4);
          assert.ok(q.exemplar && q.exemplar.length > 30);
        }
      }
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.every((id) => id.includes("v2")));
});

test("weekly test prompts are fresh rather than copied from daily practice", () => {
  const practice = new Set(
    LESSONS.slice(0, 5).flatMap((l) =>
      l.forms.flatMap((f) => f.map((q) => q.prompt)),
    ),
  );
  for (const form of LESSONS[5].forms) {
    assert.equal(form.filter((q) => q.kind === "open").length, 8);
    assert.equal(form.filter((q) => q.kind === "match").length, 5);
    for (const q of form) assert.ok(!practice.has(q.prompt), q.prompt);
    for (let i = 2; i < form.length; i++)
      assert.ok(
        !(
          form[i].kind === "choice" &&
          form[i - 1].kind === "choice" &&
          form[i - 2].kind === "choice"
        ),
      );
  }
});

test("v2 does not rename or mutate legacy content and preserves historical assessment forms", () => {
  assert.equal(CHUNKS[0].id, "chunk-1");
  assert.equal(CHUNKS[0].forms[0][0].id, "chunk-1-1-1");
  assert.equal(CHUNKS[5].id, "weekly-test");
  assert.deepEqual(
    CHUNKS[5].forms.map((f) => f.length),
    [15, 15],
  );
  const sharedQuestion = LESSONS[0].forms[0][0];
  assert.notEqual(sharedQuestion, CHUNKS[0].forms[0][0]);
  assert.notEqual(sharedQuestion.choices, CHUNKS[0].forms[0][0].choices);
});
