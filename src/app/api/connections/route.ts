import { NextRequest, NextResponse } from "next/server";
import { localOnly, fail } from "@/lib/http";
export const runtime = "nodejs";
export async function GET(req: NextRequest) {
  try {
    localOnly(req);
    return NextResponse.json({ openai: !!process.env.OPENAI_API_KEY, elevenlabs: !!process.env.ELEVENLABS_API_KEY, voice: !!process.env.ELEVENLABS_VOICE_ID }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return fail(e); }
}
export async function POST(req: NextRequest) {
  try {
    localOnly(req);
    const results = await Promise.all([
      verify("https://api.openai.com/v1/models", process.env.OPENAI_API_KEY, "Authorization", "Bearer "),
      verify("https://api.elevenlabs.io/v1/voices", process.env.ELEVENLABS_API_KEY, "xi-api-key", ""),
    ]);
    return NextResponse.json({ openai: results[0].status, elevenlabs: results[1].status, voices: results[1].data?.voices?.map((voice: { voice_id: string; name: string }) => ({ id: voice.voice_id, name: voice.name })) ?? [], selectedVoice: process.env.ELEVENLABS_VOICE_ID || null }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) { return fail(e); }
}
async function verify(url: string, key: string | undefined, header: string, prefix: string) {
  if (!key) return { status: "Missing key", data: null };
  try {
    const response = await fetch(url, { headers: { [header]: prefix + key }, signal: AbortSignal.timeout(15000) });
    if (!response.ok) return { status: `Connection rejected (${response.status})`, data: null };
    return { status: "Credential verified", data: await response.json() };
  } catch { return { status: "Could not reach service", data: null }; }
}
