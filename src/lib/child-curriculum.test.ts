import test from "node:test";
import assert from "node:assert/strict";
import {
  getBonusSeedForChunk,
  getCurriculumForChild,
} from "./child-curriculum";
import { LESSONS_V4 } from "./lesson-content-v4";
import {
  TOBI_DAY_ONE,
  TOBI_LESSONS_V4,
  TOBI_READING,
  TOBI_READING_PASSAGES_V4,
} from "./tobi-curriculum";
import { gradeObjective, publicQuestion, validAnswer } from "./rules";
import { createLearningAI } from "./learning-ai";

test("child catalog isolates Tobi’s v4 visual curriculum with 5 days, weekly challenge, and zero math", () => {
  const a = getCurriculumForChild("aharon");
  const t = getCurriculumForChild("tobi");
  assert.equal(a.profile.name, "Aharon Zev");
  assert.equal(a.profile.age, 10);
  assert.equal(a.lessons, LESSONS_V4);
  assert.equal(a.publishedDays, 5);
  assert.equal(t.profile.name, "Tobi");
  assert.equal(t.profile.grade, 2);
  assert.equal(t.profile.age, 7);
  assert.equal(t.publishedDays, 5);
  assert.equal(t.lessons, TOBI_LESSONS_V4);
  assert.equal(t.lessons.length, 6);
  assert.equal(t.lessons[0].order, 1);
  assert.equal(t.lessons[5].assessmentOnly, true);
  assert.equal(t.discovery, undefined);
  assert.equal(TOBI_READING_PASSAGES_V4.length, 5);
  for (let i = 0; i < 5; i++) {
    const day = t.lessons[i];
    assert.equal(day.version, 4);
    assert.ok(
      !day.subjects.some((s) => /math|fraction/i.test(s)),
      "Zero math subjects in Tobi v4",
    );
    assert.ok(
      day.teaching.every((b) => !b.fractionModel),
      "Zero fraction models in Tobi v4",
    );
    // Every chunk in Tobi's v4 lessons has an interactive visual diagram
    assert.ok(
      day.chunks.every((c) => c.teaching.some((b) => !!b.diagram)),
      `All chunks in Tobi Day ${i + 1} have interactive diagrams`,
    );
  }
  assert.ok(
    t.lessons.every((l) => !a.lessons.some((other) => other.id === l.id)),
  );
  assert.throws(() => getCurriculumForChild("unknown" as "tobi"));
});

test("Tobi reading and quizzes assess taught reasoning with two complete, distinct forms", () => {
  const lesson = TOBI_DAY_ONE;
  const count = TOBI_READING.split(/\s+/).length;
  assert.ok(count >= 200 && count <= 300, `${count} passage words`);
  assert.equal(TOBI_READING.split("\n\n").length, 5);
  assert.equal(lesson.chunks[0].teaching[1].terms?.length, 4);
  assert.deepEqual(
    lesson.chunks.map((c) =>
      c.teaching.some((b) => b.diagram || b.fractionModel),
    ),
    [false, true, true],
  );
  const allIds = new Set<string>();
  for (const [f, form] of lesson.forms.entries()) {
    assert.equal(form.length, 15);
    assert.deepEqual(
      lesson.chunks.flatMap((c) => c.questionIds[f]),
      form.map((q) => q.id),
    );
    for (const chunk of lesson.chunks)
      assert.deepEqual(
        chunk.questionIds[f].map((id) => form.find((q) => q.id === id)?.kind),
        ["choice", "open", "match", "choice", "open"],
      );
    for (const q of form) {
      assert.ok(!allIds.has(q.id));
      allIds.add(q.id);
      assert.ok(q.explanation && q.objective);
      if (q.kind === "choice") {
        assert.equal(new Set(q.choices).size, 4);
        assert.ok(q.correct);
        assert.ok(validAnswer(q, q.correct));
        assert.equal(gradeObjective(q, q.correct!), 4);
      } else if (q.kind === "match") {
        assert.equal(q.matches?.length, 4);
        assert.equal(new Set(q.matches?.map((p) => p.right)).size, 4);
        const answer = Object.fromEntries(
          q.matches!.map((p) => [p.left, p.right]),
        );
        assert.ok(validAnswer(q, answer));
        assert.equal(gradeObjective(q, answer), 4);
      } else {
        assert.equal(q.rubric?.length, 4);
        assert.ok(q.exemplar);
      }
      const safe = publicQuestion(q);
      assert.equal("correct" in safe, false);
      assert.equal("exemplar" in safe, false);
      assert.equal("rubric" in safe, false);
    }
  }
  for (const i of [0, 1, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14])
    assert.notEqual(lesson.forms[0][i].prompt, lesson.forms[1][i].prompt);
});

test("bonus concepts are separate from core teaching and sourced for each child", () => {
  const t = getBonusSeedForChunk("tobi", TOBI_DAY_ONE.chunks[0].id)!;
  assert.match(t.text, /simile/);
  assert.ok(t.sources?.[0].url.startsWith("https://"));
  assert.ok(
    !TOBI_DAY_ONE.chunks[0].teaching.some((b) => b.text.includes("simile")),
  );
  assert.match(
    getBonusSeedForChunk("aharon", "lesson-v3-1-chunk-1")!.text,
    /metaphor/,
  );
});

test("AI uses Tobi’s age for grading and new bonus generation without hard-coded older-child expectations", async () => {
  const previous = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-placeholder";
  const bodies: Record<string, unknown>[] = [];
  const q = TOBI_DAY_ONE.forms[0][1];
  try {
    const fetcher: typeof fetch = async (_url, init) => {
      const body = JSON.parse(init!.body as string);
      bodies.push(body);
      return Response.json({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify(
                  bodies.length === 1
                    ? {
                        grades: [
                          {
                            questionId: q.id,
                            points: 4,
                            feedback: "You used a clear story clue.",
                          },
                        ],
                      }
                    : {
                        prompt:
                          "A simile uses like or as. Make a comparison for a tiny rabbit and say why it fits.",
                        exemplar:
                          "The rabbit is like a button because it is small.",
                        rubric: [
                          "Makes a comparison",
                          "Explains a shared feature",
                        ],
                        explanation:
                          "A simile helps a reader picture a shared quality.",
                        objective: "simile-application",
                      },
                ),
              },
            ],
          },
        ],
      });
    };
    const ai = createLearningAI(fetcher, { age: 7, grade: 2 });
    await ai.grade([
      {
        question: q,
        answer: "She tries it again to check.",
        teaching: TOBI_DAY_ONE.chunks[0].teaching,
      },
    ]);
    const seed = getBonusSeedForChunk("tobi", TOBI_DAY_ONE.chunks[0].id);
    await ai.bonus({
      title: "Rabbit",
      objectives: ["Use evidence"],
      teaching: [],
      recentScores: [],
      previousPrompts: [],
      seed,
    });
    assert.equal(JSON.parse(bodies[0].input as string).age, 7);
    assert.equal(JSON.parse(bodies[0].input as string).grade, 2);
    assert.match(bodies[1].instructions as string, /aged 7 in grade 2/);
    assert.match(
      bodies[1].instructions as string,
      /one or two simple sentences/,
    );
    assert.equal(JSON.parse(bodies[1].input as string).seed.title, seed!.title);
    assert.doesNotMatch(
      bodies[0].instructions as string,
      /grade-five|ten-year-old/,
    );
  } finally {
    if (previous === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previous;
  }
});

test("Tobi answer positions cover every slot without a second-option shortcut", () => {
  const positions = TOBI_DAY_ONE.forms.map((form) =>
    form
      .filter((q) => q.kind === "choice")
      .map((q) => q.choices!.indexOf(q.correct!)),
  );
  for (const form of positions) {
    assert.deepEqual([...new Set(form)].sort(), [0, 1, 2, 3]);
    assert.ok(
      [0, 1, 2, 3].every(
        (slot) => form.filter((value) => value === slot).length <= 2,
      ),
    );
  }
  assert.ok(positions[0].every((slot, index) => slot !== positions[1][index]));
});
