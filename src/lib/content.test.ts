import test from "node:test";
import assert from "node:assert/strict";
import { CHUNKS, WEEK_OBJECTIVES, WEEK_TITLE } from "./content";

test("a complete five-day week and cumulative test have 60-point parallel forms", () => {
  assert.ok(WEEK_TITLE.length > 10);
  assert.ok(WEEK_OBJECTIVES.length >= 6);
  assert.equal(CHUNKS.length, 6);
  assert.deepEqual(
    CHUNKS.map((c) => c.order),
    [1, 2, 3, 4, 5, 6],
  );
  assert.equal(CHUNKS[5].id, "weekly-test");
  const ids = new Set<string>();
  for (const chunk of CHUNKS) {
    assert.equal(chunk.forms.length, 2);
    for (const form of chunk.forms) {
      assert.equal(form.length, 15, chunk.id);
      assert.equal(
        form.reduce((sum, q) => sum + q.points, 0),
        60,
      );
      assert.ok(form.filter((q) => q.kind === "open").length >= 2);
      assert.ok(form.filter((q) => q.kind === "match").length >= 2);
      for (const q of form) {
        assert.ok(!ids.has(q.id), `duplicate question ${q.id}`);
        ids.add(q.id);
        assert.ok(
          q.prompt.trim() && q.explanation.trim() && q.objective.trim(),
        );
        if (q.kind === "choice") {
          assert.equal(q.choices?.length, 4);
          assert.equal(new Set(q.choices).size, 4);
          assert.equal(q.choices?.filter((c) => c === q.correct).length, 1);
        } else if (q.kind === "match") {
          assert.equal(q.matches?.length, 4);
          assert.equal(new Set(q.matches?.map((p) => p.left)).size, 4);
          assert.equal(new Set(q.matches?.map((p) => p.right)).size, 4);
        } else {
          assert.equal(q.rubric?.length, 4);
          assert.equal(new Set(q.rubric).size, 4);
          assert.ok(q.exemplar);
        }
      }
    }
  }
});

test("retry forms use fresh problems and equivalent objective coverage", () => {
  for (const chunk of CHUNKS) {
    const [first, second] = chunk.forms;
    const firstPrompts = new Set(first.map((q) => q.prompt));
    assert.ok(
      second.every((q) => !firstPrompts.has(q.prompt)),
      chunk.id,
    );
    assert.deepEqual(
      first.map((q) => q.objective),
      second.map((q) => q.objective),
    );
    assert.deepEqual(
      first.map((q) => q.kind),
      second.map((q) => q.kind),
    );
    assert.ok(
      first.filter((q, i) => q.correct && q.correct !== second[i].correct)
        .length >= 6,
      `${chunk.id} must change problems, not just rearrange answers`,
    );
  }
});

test("weekly assessment does not repeat daily prompts or reveal teaching before its test", () => {
  const dailyPrompts = new Set(
    CHUNKS.slice(0, 5).flatMap((c) =>
      c.forms.flatMap((f) => f.map((q) => q.prompt)),
    ),
  );
  const weekly = CHUNKS[5];
  assert.equal(weekly.teaching.length, 0);
  assert.ok(weekly.forms.flat().every((q) => !dailyPrompts.has(q.prompt)));
  assert.ok(CHUNKS.slice(0, 5).every((c) => c.teaching.length >= 3));
});

test("source boundaries are visible and all eight target words are taught", () => {
  const teaching = CHUNKS.flatMap((c) => c.teaching.map((t) => t.text)).join(
    " ",
  );
  for (const word of [
    "infer",
    "evidence",
    "reluctant",
    "resourceful",
    "contrast",
    "texture",
    "composition",
    "subtle",
  ]) {
    assert.match(teaching, new RegExp(`\\b${word}\\b`, "i"));
  }
  assert.match(teaching, /https:\/\/www\.metmuseum\.org\//);
  assert.match(teaching, /https:\/\/www\.sefaria\.org\/Pirkei_Avot\.1\.6/);
  assert.match(teaching, /fictional/i);
  assert.match(teaching, /not a halachic ruling/i);
});
