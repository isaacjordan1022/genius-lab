import { test } from "node:test";
import assert from "node:assert/strict";
import { missionReviewBank } from "./mission-review";
import { LESSONS_V3 } from "./lesson-content-v3";

test("mission review includes only supplied standalone choice questions, with valid answers and no duplicates", () => {
  const supplied = LESSONS_V3[0].forms[0];
  const result = missionReviewBank([...supplied, ...supplied]);
  assert.ok(result.length > 0);
  assert.equal(new Set(result.map((q) => q.id)).size, result.length);
  for (const item of result) {
    const original = supplied.find((q) => q.id === item.id)!;
    assert.equal(item.choices[item.correct], original.correct);
    assert.doesNotMatch(item.prompt, /paragraph|passage|in [“"]|story/i);
  }
  assert.deepEqual(missionReviewBank([]), []);
});
