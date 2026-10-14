import { test } from "node:test";
import assert from "node:assert/strict";
import { createLearningAI, GRADING_INSTRUCTIONS } from "./learning-ai";
import type { Question } from "./content-types";
const question: Question = {
  id: "why",
  kind: "open",
  points: 4,
  prompt: "Why did she cover the seedlings?",
  exemplar: "To protect them from frost.",
  rubric: ["Recognizes risk of freezing", "Explains the protection"],
  explanation: "The cover trapped warmth and protected the seedlings.",
  objective: "Infer cause from evidence",
};
test("grading sends meaning-based rubric and context, accepts provider credit for a paraphrase", async () => {
  const old = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-placeholder";
  try {
    let sent: Record<string, unknown> = {};
    const ai = createLearningAI(async (_url, init) => {
      sent = JSON.parse(init!.body as string);
      return Response.json({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  grades: [
                    {
                      questionId: "why",
                      points: 4,
                      feedback:
                        "Yes. Keeping the tiny plants warm stopped the cold from harming them.",
                    },
                  ],
                }),
              },
            ],
          },
        ],
      });
    });
    const answer =
      "So the little plants would stay warm through the icy night.";
    const [grade] = await ai.grade([
      {
        question,
        answer,
        teaching: [
          {
            title: "Cold night",
            text: "Frost was expected. She draped a cloth over her seedlings.",
          },
        ],
      },
    ]);
    assert.equal(grade.points, 4);
    assert.match(grade.feedback, /plants/);
    assert.equal(sent.store, false);
    assert.match(sent.input as string, /icy night/);
    assert.match(sent.input as string, /Frost was expected/);
    assert.equal(sent.instructions, GRADING_INSTRUCTIONS);
    assert.match(GRADING_INSTRUCTIONS, /NEVER keyword overlap/);
  } finally {
    if (old === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = old;
  }
});
test("malformed and duplicate model scores are rejected rather than accepted as grades", async () => {
  const old = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-placeholder";
  try {
    const ai = createLearningAI(async () =>
      Response.json({
        status: "completed",
        output: [
          {
            content: [
              {
                type: "output_text",
                text: JSON.stringify({
                  grades: [{ questionId: "why", points: 9, feedback: "ok" }],
                }),
              },
            ],
          },
        ],
      }),
    );
    await assert.rejects(() =>
      ai.grade([{ question, answer: "frost", teaching: [] }]),
    );
  } finally {
    if (old === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = old;
  }
});
