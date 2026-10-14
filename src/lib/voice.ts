import { createHash } from "node:crypto";

export type Alignment = { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
export type Narration = { audio_base64: string; alignment: Alignment };
const cache = new Map<string, Narration>();
let active = 0;
function key() {
  const value = process.env.ELEVENLABS_API_KEY;
  if (!value) throw new Error("Listening is not connected yet. Your work is saved; you can keep reading and typing.");
  return value;
}
async function request(path: string, init: RequestInit) {
  if (active >= 3) throw new Error("Tick is busy speaking. Try again in a moment.");
  active++;
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/${path}`, {
      ...init, headers: { ...init.headers, "xi-api-key": key() }, signal: AbortSignal.timeout(60000),
    });
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) throw new Error("The voice connection needs attention. You can keep reading and typing.");
      if (response.status === 429) throw new Error("The voice service is busy or out of credits. Try again shortly.");
      throw new Error("The voice service could not finish. Please try again.");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error && ["TimeoutError", "AbortError", "TypeError"].includes(error.name)) throw new Error("The voice connection timed out. Please try again.");
    throw error;
  } finally { active--; }
}
export async function narrate(text: unknown): Promise<Narration> {
  if (typeof text !== "string" || !text.trim() || text.length > 12000) throw new Error("Choose a shorter piece to read aloud.");
  key();
  const voice = process.env.ELEVENLABS_VOICE_ID;
  if (!voice || !/^[a-zA-Z0-9_-]+$/.test(voice)) throw new Error("Choose Tick’s narration voice before listening.");
  const model = process.env.ELEVENLABS_TTS_MODEL || "eleven_multilingual_v2";
  const id = createHash("sha256").update(`${voice}:${model}:${text}`).digest("hex");
  const cached = cache.get(id);
  if (cached) return cached;
  const data = await request(`text-to-speech/${voice}/with-timestamps`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, model_id: model, voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
  });
  const alignment = data.alignment ?? data.normalized_alignment;
  if (!data.audio_base64 || !alignment?.characters || alignment.characters.length !== alignment.character_start_times_seconds?.length || alignment.characters.length !== alignment.character_end_times_seconds?.length) throw new Error("The narration was incomplete. Please try again.");
  const result = { audio_base64: data.audio_base64, alignment };
  if (cache.size >= 12) cache.delete(cache.keys().next().value!);
  cache.set(id, result);
  return result;
}
export async function transcribe(file: File) {
  if (!file.size || file.size > 10 * 1024 * 1024 || !/^(audio\/(webm|mp4|mpeg|wav|ogg)|video\/webm)(;.*)?$/.test(file.type)) throw new Error("Please record a short spoken answer (under two minutes).");
  const form = new FormData();
  form.append("file", file);
  form.append("model_id", process.env.ELEVENLABS_STT_MODEL || "scribe_v2");
  form.append("tag_audio_events", "false");
  const data = await request("speech-to-text", { method: "POST", body: form });
  if (typeof data.text !== "string" || !data.text.trim()) throw new Error("I didn’t catch any words. Try speaking again.");
  return { text: data.text.slice(0, 5000) };
}
