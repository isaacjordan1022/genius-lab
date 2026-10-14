"use client";
import { useState } from "react";
type Result = { openai: string; elevenlabs: string; voices: { id: string; name: string }[]; selectedVoice: string | null };
export default function Connections() {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function verify() {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/connections", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data);
    } catch { setError("Could not check connections. Try again."); }
    finally { setBusy(false); }
  }
  return <main style={{ maxWidth: 850, margin: "60px auto", padding: 24 }}>
    <a href="/">← Back to the app</a><h1>AI & voice connections</h1>
    <p>Add your keys to the local .env.local file. Keys stay on the server.</p>
    <p>Required: OPENAI_API_KEY, ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID.</p>
    <button onClick={() => void verify()} disabled={busy}>{busy ? "Checking…" : "Check connections"}</button>
    {error && <p role="alert">{error}</p>}
    {result && <><h2>OpenAI: {result.openai}</h2><h2>ElevenLabs: {result.elevenlabs}</h2>
      <p>A credential check confirms access. A successful lesson grade, narration and transcription are separate checks.</p>
      {!!result.voices.length && <><h2>Your narration voices</h2><p>Set ELEVENLABS_VOICE_ID to the ID of your chosen voice.</p><ul>{result.voices.map(v => <li key={v.id} style={{ marginBottom: 18 }}>{v.name}{v.id === result.selectedVoice ? " · Selected" : ""}<br/><code style={{ fontSize: 18 }}>{v.id}</code></li>)}</ul></>}
    </>}
  </main>;
}
