"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, LoaderCircle } from "lucide-react";
import { wordTimings } from "@/lib/voice-alignment";
import "./voice.css";

type TextSegment = { node: Text; start: number; end: number };
function visibleNarration(root: Element | null, fallback: string) {
  const segments: TextSegment[] = [];
  let text = "";
  root?.querySelectorAll("[data-narration-text]").forEach(element => {
    if (!element.getClientRects().length) return;
    if (text) text += "\n\n";
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const value = node.textContent ?? "";
      segments.push({ node: node as Text, start: text.length, end: text.length + value.length });
      text += value;
    }
  });
  return { text: text || fallback, segments };
}
function clearHighlight() { if (typeof CSS !== "undefined" && CSS.highlights) CSS.highlights.delete("narration-word"); }

export default function ReadAlong({ text, disabled = false }: { text: string; disabled?: boolean }) {
  const controls = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const controller = useRef<AbortController | null>(null);
  const frame = useRef(0);
  const sync = useRef<(() => void) | null>(null);
  const loadedText = useRef("");
  const [status, setStatus] = useState<"idle" | "loading" | "playing" | "paused">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    function stopOthers() {
      controller.current?.abort(); audio.current?.pause(); cancelAnimationFrame(frame.current); clearHighlight();
      setStatus(s => s === "playing" ? "paused" : s === "loading" ? "idle" : s);
    }
    window.addEventListener("arcade-stop-audio", stopOthers);
    return () => { stopOthers(); audio.current = null; window.removeEventListener("arcade-stop-audio", stopOthers); };
  }, [text]);
  async function play() {
    setError("");
    if (status === "playing") { audio.current?.pause(); cancelAnimationFrame(frame.current); clearHighlight(); setStatus("paused"); return; }
    window.dispatchEvent(new Event("arcade-stop-audio"));
    const material = visibleNarration(controls.current?.closest("[data-narration-scope]") ?? null, text);
    if (audio.current && loadedText.current === material.text) {
      try { await audio.current.play(); setStatus("playing"); sync.current?.(); } catch { setError("Tap Listen again to start the audio."); }
      return;
    }
    audio.current = null;
    setStatus("loading");
    const abort = new AbortController(); controller.current = abort;
    try {
      const response = await fetch("/api/voice/narrate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: material.text }), signal: abort.signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Listening is unavailable. Please try again.");
      if (abort.signal.aborted) return;
      let cursor = 0;
      const words = wordTimings(data.alignment).map(word => {
        const start = material.text.indexOf(word.text, cursor);
        const end = start + word.text.length;
        if (start >= 0) cursor = end;
        return { ...word, from: start, to: end };
      });
      const player = new Audio(`data:audio/mpeg;base64,${data.audio_base64}`);
      audio.current = player; loadedText.current = material.text;
      let previous = -1;
      const tick = () => {
        const index = words.findIndex(w => player.currentTime >= w.start && player.currentTime < w.end);
        if (index !== previous) {
          previous = index; clearHighlight();
          const word = words[index];
          if (word && word.from >= 0 && CSS.highlights && typeof Highlight !== "undefined") {
            const first = material.segments.find(n => n.start <= word.from && n.end > word.from);
            const last = material.segments.find(n => n.start < word.to && n.end >= word.to);
            if (first?.node.isConnected && last?.node.isConnected) {
              const range = new Range();
              range.setStart(first.node, word.from - first.start);
              range.setEnd(last.node, word.to - last.start);
              CSS.highlights.set("narration-word", new Highlight(range));
            }
          }
        }
        if (!player.paused && !player.ended) frame.current = requestAnimationFrame(tick);
      };
      sync.current = () => { previous = -1; tick(); };
      player.onended = () => { clearHighlight(); setStatus("paused"); };
      player.onerror = () => { clearHighlight(); setError("This audio could not play. Try again."); setStatus("idle"); audio.current = null; };
      await player.play(); setStatus("playing"); sync.current();
    } catch (e) {
      if (abort.signal.aborted) return;
      setError(e instanceof Error ? e.message : "Listening is unavailable."); setStatus("idle");
    }
  }
  return <div className="read-along" ref={controls}>
    <button type="button" disabled={disabled || status === "loading"} onClick={() => void play()} aria-label={status === "playing" ? "Pause narration" : "Listen to this text"}>
      {status === "loading" ? <LoaderCircle size={21} aria-hidden="true"/> : status === "playing" ? <Pause size={21} aria-hidden="true"/> : <Volume2 size={21} aria-hidden="true"/>}
      {status === "loading" ? "Preparing voice…" : status === "playing" ? "Pause" : "Listen"}
    </button>
    {error && <p role="status">{error}</p>}
  </div>;
}
