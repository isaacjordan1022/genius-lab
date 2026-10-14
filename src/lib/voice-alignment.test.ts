import { test } from "node:test";
import assert from "node:assert/strict";
import { wordTimings } from "./voice-alignment";
test("narration groups punctuation and Hebrew into timed words without losing boundaries", () => {
  const chars = [..."Hi!  שלום\nTick."];
  const words = wordTimings({ characters: chars, character_start_times_seconds: chars.map((_, i) => i / 10), character_end_times_seconds: chars.map((_, i) => (i + 1) / 10) });
  assert.deepEqual(words.map(w => w.text), ["Hi!", "שלום", "Tick."]);
  assert.equal(words[1].start, 0.5);
  assert.equal(words[1].end, 0.9);
});
