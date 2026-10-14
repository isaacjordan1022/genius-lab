import test from "node:test";
import assert from "node:assert/strict";
import { LESSONS_V4, READING_PASSAGES_V4 } from "./lesson-content-v4";
import { gradeObjective, publicQuestion, validAnswer } from "./rules";

test("v4 publishes concise 3-paragraph analytical passages, 4 vocabulary terms per day, and zero math", () => {
  assert.equal(READING_PASSAGES_V4.length, 5);
  for (const [i, p] of READING_PASSAGES_V4.entries()) {
    const words = p.text.trim().split(/\s+/).length;
    assert.ok(words >= 110 && words <= 220, `${p.title}: ${words} words`);
    assert.equal(p.text.split(/\n\s*\n/).length, 3);
    assert.equal(p.words.length, 4);
    const lesson = LESSONS_V4[i];
    assert.equal(lesson.version, 4);
    assert.equal(lesson.chunks.length, 3);
    assert.equal(lesson.chunks[0].teaching[0].kind, "vocabulary");
    assert.equal(lesson.chunks[0].teaching[0].terms?.length, 4);
    assert.equal(lesson.chunks[0].teaching[1].kind, "passage");
    assert.equal(lesson.chunks[0].teaching[1].text, p.text);
    // Chunk 2 is How Things Work with an interactive diagram
    assert.equal(lesson.chunks[1].teaching[0].kind, "mechanism");
    assert.ok(lesson.chunks[1].teaching[0].diagram);
    assert.ok(lesson.chunks[1].teaching[0].terms?.length === 3);
    // Chunk 3 is Torah / Gadol / Halacha with an interactive diagram and verified sources
    assert.ok(
      ["torah", "gadol", "halacha"].includes(
        lesson.chunks[2].teaching[0].kind ?? "",
      ),
    );
    assert.ok(lesson.chunks[2].teaching[0].diagram);
    assert.ok(lesson.chunks[2].teaching[0].sources?.length);
    // Zero math across the entire lesson
    assert.ok(
      !lesson.subjects.some((s) => /math|fraction/i.test(s)),
      "No math subjects in v4",
    );
    assert.ok(
      lesson.teaching.every((b) => !b.fractionModel),
      "No fraction models in v4",
    );
  }
});

test("v4 daily lessons and 24-question weekly challenge have complete valid two-form question sets", () => {
  assert.equal(LESSONS_V4.length, 6);
  const allIds = new Set<string>();
  for (const [i, lesson] of LESSONS_V4.entries()) {
    assert.equal(lesson.version, 4);
    assert.equal(
      lesson.id,
      i === 5 ? "weekly-test-v4" : `lesson-v4-${i + 1}`,
    );
    for (const [f, form] of lesson.forms.entries()) {
      assert.equal(form.length, i === 5 ? 24 : 15);
      if (i < 5) {
        assert.deepEqual(
          lesson.chunks.flatMap((c) => c.questionIds[f]),
          form.map((q) => q.id),
        );
        for (const chunk of lesson.chunks) {
          assert.deepEqual(
            chunk.questionIds[f].map(
              (id) => form.find((q) => q.id === id)?.kind,
            ),
            ["choice", "open", "match", "choice", "open"],
          );
        }
      }
      for (const q of form) {
        assert.ok(q.id.includes("v4"));
        assert.ok(!allIds.has(q.id), `Duplicate question ID: ${q.id}`);
        allIds.add(q.id);
        assert.equal(q.points, 4);
        assert.ok(q.objective && q.explanation);
        if (q.kind === "choice") {
          assert.equal(q.choices?.length, 4);
          assert.equal(new Set(q.choices).size, 4);
          assert.ok(q.choices?.includes(q.correct!));
          assert.ok(validAnswer(q, q.correct!));
          assert.equal(gradeObjective(q, q.correct!), 4);
        } else if (q.kind === "match") {
          assert.equal(q.matches?.length, 4);
          assert.equal(new Set(q.matches?.map((m) => m.right)).size, 4);
          const ans = Object.fromEntries(
            q.matches!.map((m) => [m.left, m.right]),
          );
          assert.ok(validAnswer(q, ans));
          assert.equal(gradeObjective(q, ans), 4);
        } else {
          assert.equal(q.rubric?.length, 4);
          assert.ok(q.exemplar);
        }
        const pub = publicQuestion(q);
        assert.equal("correct" in pub, false);
        assert.equal("exemplar" in pub, false);
        assert.equal("rubric" in pub, false);
      }
    }
  }
});

test("reopenTeaching lets a learner exit an active quiz back to the story/material while keeping draft answers", async () => {
  const { createStore } = await import("./store");
  const { getCurriculumForChild } = await import("./child-curriculum");
  const store = createStore(":memory:", () => [], undefined, {
    catalog: getCurriculumForChild("aharon"),
  });
  try {
    const activeId = store.start("lesson-v4-1");
    const chunkId = LESSONS_V4[0].chunks[0].id;

    // Complete teaching so the quiz opens
    store.taught(activeId, chunkId);
    const inQuizView = store.view();
    assert.ok(inQuizView.active?.taughtChunkIds?.includes(chunkId));
    // v4 keeps teaching cards available during quiz for the inline peek drawer
    assert.ok((inQuizView.chunks[0].chunks[0].teaching.length ?? 0) > 0);

    // Save a draft answer in the quiz
    const firstQ = inQuizView.active!.questions[0];
    const validDraft =
      firstQ.kind === "choice" ? firstQ.choices![0] : "Draft answer while in quiz";
    store.save(activeId, firstQ.id, validDraft, store.read().revision);

    // Exit quiz back to story/material
    store.reopenTeaching(activeId, chunkId);
    const backToStoryView = store.view();
    assert.equal(
      backToStoryView.active?.taughtChunkIds?.includes(chunkId) ?? false,
      false,
      "Chunk should return to teaching mode",
    );
    assert.equal(
      backToStoryView.active?.answers[firstQ.id],
      validDraft,
      "Saved draft answer should be preserved when exiting back to material",
    );
  } finally {
    store.close();
  }
});



