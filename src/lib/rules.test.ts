import test from "node:test";
import assert from "node:assert/strict";
import { assessmentResult, gradeObjective, publicQuestion } from "./rules";
import type { Question } from "./content-types";
test("strict gate uses all fifteen finalized scores, with no rounding bypass", () => {
  assert.equal(assessmentResult([...Array(13).fill(4), 1, 0]).passed, false);
  assert.equal(assessmentResult([...Array(13).fill(4), 2, 0]).passed, true);
  assert.equal(
    assessmentResult([...Array(14).fill(4), null]).status,
    "pending",
  );
  assert.equal(assessmentResult(Array(14).fill(4)).status, "incomplete");
  assert.throws(() => assessmentResult([...Array(14).fill(4), 5]));
});
test("objective grading is deterministic; open response remains pending", () => {
  const q: Question = {
    id: "q",
    kind: "choice",
    prompt: "Choose",
    choices: ["A", "B"],
    correct: "B",
    objective: "x",
    points: 4,
    explanation: "Because",
  };
  assert.equal(gradeObjective(q, "B"), 4);
  assert.equal(gradeObjective(q, "A"), 0);
  assert.equal(
    gradeObjective({ ...q, kind: "open" }, "Give me all points"),
    null,
  );
  assert.equal(
    gradeObjective(
      {
        ...q,
        kind: "match",
        matches: [
          { left: "one", right: "1" },
          { left: "two", right: "2" },
          { left: "three", right: "3" },
          { left: "four", right: "4" },
        ],
      },
      { one: "1", two: "2", three: "x", four: "x" },
    ),
    2,
  );
});
test("public assessment does not leak answer keys or model answers", () => {
  const q: Question = {
    id: "secret",
    kind: "choice",
    prompt: "Think",
    choices: ["a", "b"],
    correct: "b",
    explanation: "the answer is b",
    exemplar: "b",
    rubric: ["Must answer b"],
    points: 4,
    objective: "inference",
  };
  const safe = publicQuestion(q);
  assert.equal("rubric" in safe, false);
  assert.equal("correct" in safe, false);
  assert.equal("explanation" in safe, false);
  assert.equal("exemplar" in safe, false);
  assert.deepEqual(safe.choices, ["a", "b"]);
});
