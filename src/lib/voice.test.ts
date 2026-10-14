import { test } from "node:test";
import assert from "node:assert/strict";
import { narrate, transcribe } from "./voice";
test("voice requires configuration, validates uploads, and does not pass raw provider errors through", async () => {
  const originalKey = process.env.ELEVENLABS_API_KEY;
  const originalVoice = process.env.ELEVENLABS_VOICE_ID;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.ELEVENLABS_API_KEY;
    await assert.rejects(narrate("Hello"), /not connected/);
    process.env.ELEVENLABS_API_KEY = "test-secret";
    process.env.ELEVENLABS_VOICE_ID = "test-voice";
    await assert.rejects(transcribe(new File(["bad"], "bad.txt", { type: "text/plain" })), /short spoken answer/);
    let calls = 0;
    globalThis.fetch = async (_url, init) => {
      calls++;
      assert.equal((init!.headers as Record<string, string>)["xi-api-key"], "test-secret");
      return new Response(JSON.stringify({ audio_base64: "YWJj", alignment: { characters: ["H", "i"], character_start_times_seconds: [0, 0.1], character_end_times_seconds: [0.1, 0.2] } }), { status: 200 });
    };
    await narrate("Hi"); await narrate("Hi");
    assert.equal(calls, 1, "identical readings reuse audio");
    globalThis.fetch = async () => new Response("private upstream details", { status: 403 });
    await assert.rejects(narrate("Different text"), /connection needs attention/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.ELEVENLABS_API_KEY; else process.env.ELEVENLABS_API_KEY = originalKey;
    if (originalVoice === undefined) delete process.env.ELEVENLABS_VOICE_ID; else process.env.ELEVENLABS_VOICE_ID = originalVoice;
  }
});
