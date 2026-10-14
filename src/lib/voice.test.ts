import { test } from "node:test";
import assert from "node:assert/strict";
import { narrate, transcribe } from "./voice";
import { DEFAULT_NARRATION_VOICE_ID, NARRATION_VOICES } from "./voice-options";

test("voice requires configuration, supports default and selectable voice IDs, validates uploads, and hides raw errors", async () => {
  const originalKey = process.env.ELEVENLABS_API_KEY;
  const originalVoice = process.env.ELEVENLABS_VOICE_ID;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.ELEVENLABS_API_KEY;
    delete process.env.ELEVENLABS_VOICE_ID;
    await assert.rejects(narrate("Hello"), /not connected/);
    process.env.ELEVENLABS_API_KEY = "test-secret";
    await assert.rejects(transcribe(new File(["bad"], "bad.txt", { type: "text/plain" })), /short spoken answer/);
    let calls = 0;
    const requestedUrls: string[] = [];
    globalThis.fetch = async (url, init) => {
      calls++;
      requestedUrls.push(String(url));
      assert.equal((init!.headers as Record<string, string>)["xi-api-key"], "test-secret");
      return new Response(JSON.stringify({ audio_base64: "YWJj", alignment: { characters: ["H", "i"], character_start_times_seconds: [0, 0.1], character_end_times_seconds: [0.1, 0.2] } }), { status: 200 });
    };
    await narrate("Hi");
    await narrate("Hi");
    assert.equal(calls, 1, "identical readings reuse audio");
    assert.ok(requestedUrls[0].includes(DEFAULT_NARRATION_VOICE_ID), "defaults to C1npRmjB19a6yNkEucvx when env voice is unset");

    // Switching to second voice ID (QngvLQR8bsLR5bzoa6Vv) fetches fresh audio for that voice
    await narrate("Hi", NARRATION_VOICES[1].id);
    assert.equal(calls, 2);
    assert.ok(requestedUrls[1].includes("QngvLQR8bsLR5bzoa6Vv"));

    globalThis.fetch = async () => new Response("private upstream details", { status: 403 });
    await assert.rejects(narrate("Different text"), /connection needs attention/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.ELEVENLABS_API_KEY; else process.env.ELEVENLABS_API_KEY = originalKey;
    if (originalVoice === undefined) delete process.env.ELEVENLABS_VOICE_ID; else process.env.ELEVENLABS_VOICE_ID = originalVoice;
  }
});
