"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Square, RotateCcw, Check, LoaderCircle } from "lucide-react";
import "./voice.css";

export default function SpeakAnswer({ disabled, onText, onBusy }: { disabled: boolean; onText: (text: string) => void; onBusy?: (busy: boolean) => void }) {
  const [mode, setMode] = useState<"idle" | "acquiring" | "recording" | "transcribing" | "review" | "done">("idle");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const recorder = useRef<MediaRecorder | null>(null);
  const acquiring = useRef(false);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abort = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const latest = useRef({ disabled, onText, onBusy, mode });
  latest.current = { disabled, onText, onBusy, mode };
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      abort.current?.abort();
      if (recorder.current?.state === "recording") { recorder.current.onstop = null; recorder.current.stop(); }
      stream.current?.getTracks().forEach(t => t.stop());
      latest.current.onBusy?.(false);
    };
  }, []);
  useEffect(() => {
    if (mode !== "review") return;
    const interval = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [mode]);
  useEffect(() => { if (mode === "review" && seconds === 0) setMode("done"); }, [seconds, mode]);
  async function begin() {
    if (acquiring.current || latest.current.disabled || !["idle", "review"].includes(latest.current.mode)) return;
    acquiring.current = true; setMode("acquiring");
    setError("");
    latest.current.onBusy?.(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error("This browser can’t record. You can type your answer instead.");
      window.dispatchEvent(new Event("arcade-stop-audio"));
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mounted.current) { media.getTracks().forEach(t => t.stop()); return; }
      stream.current = media;
      const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find(t => MediaRecorder.isTypeSupported(t));
      const device = new MediaRecorder(media, mimeType ? { mimeType } : undefined);
      const pieces: BlobPart[] = [];
      device.ondataavailable = event => { if (event.data.size) pieces.push(event.data); };
      device.onstop = async () => {
        if (timer.current) clearTimeout(timer.current);
        media.getTracks().forEach(t => t.stop());
        if (!mounted.current) return;
        setMode("transcribing");
        const controller = new AbortController(); abort.current = controller;
        try {
          const form = new FormData();
          form.append("file", new Blob(pieces, { type: device.mimeType || "audio/webm" }), device.mimeType.includes("mp4") ? "answer.m4a" : "answer.webm");
          const response = await fetch("/api/voice/transcribe", { method: "POST", body: form, signal: controller.signal });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "I couldn’t hear that. Try again.");
          if (!mounted.current) return;
          latest.current.onText(data.text); setSeconds(5); setMode("review");
        } catch (e) {
          if (!mounted.current) return;
          setError(e instanceof Error ? e.message : "Please try again."); setMode("idle");
        } finally { if (mounted.current) latest.current.onBusy?.(false); }
      };
      recorder.current = device; device.start(); acquiring.current = false; setMode("recording");
      timer.current = setTimeout(() => { if (device.state === "recording") device.stop(); }, 120000);
    } catch (e) {
      acquiring.current = false;
      stream.current?.getTracks().forEach(t => t.stop());
      if (!mounted.current) return;
      setError(e instanceof DOMException && e.name === "NotAllowedError" ? "Microphone access is off. Allow it in your browser, or type your answer." : e instanceof Error ? e.message : "Could not start the microphone.");
      setMode("idle"); latest.current.onBusy?.(false);
    }
  }
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if (e.altKey && e.code === "Space" && !e.repeat) {
        e.preventDefault();
        if (latest.current.mode === "recording") recorder.current?.stop();
        else void begin();
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  return <div className="speak-answer">
    {mode === "recording" ? <button type="button" className="recording" onClick={() => recorder.current?.stop()}><Square size={20} aria-hidden="true"/> Finish speaking</button> :
      <button type="button" disabled={disabled || mode === "acquiring" || mode === "transcribing" || mode === "done"} onClick={() => void begin()}>{mode === "acquiring" || mode === "transcribing" ? <LoaderCircle size={21} aria-hidden="true"/> : mode === "review" ? <RotateCcw size={21} aria-hidden="true"/> : mode === "done" ? <Check size={21} aria-hidden="true"/> : <Mic size={21} aria-hidden="true"/>}{mode === "acquiring" ? "Opening microphone…" : mode === "transcribing" ? "Listening back…" : mode === "review" ? `Say it again (${seconds})` : mode === "done" ? "Voice answer ready" : "Speak"}</button>}
    {(mode === "idle" || mode === "recording") && <span>Alt + Space</span>}
    {mode === "review" && <p>Check the words below. You have {seconds} seconds to say it again.</p>}
    {mode === "done" && <p>Fix any words the microphone misheard, then continue.</p>}
    {error && <p role="status">{error}</p>}
  </div>;
}
