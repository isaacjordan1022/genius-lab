"use client";
import { useEffect, useRef, useState } from "react";
import { Ticket, Sparkles } from "lucide-react";
import "./ticket-wallet.css";

export default function TicketWallet({ balance, lifetime }: { balance: number; lifetime: number }) {
  const previous = useRef({ balance, lifetime });
  const [display, setDisplay] = useState(balance);
  const [gain, setGain] = useState(0);
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    const earned = Math.max(0, lifetime - previous.current.lifetime);
    const from = previous.current.balance;
    previous.current = { balance, lifetime };
    if (!earned) { setDisplay(balance); return; }
    setGain(earned); setBurst(n => n + 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const started = performance.now();
    const count = (now: number) => {
      const progress = reduced ? 1 : Math.min(1, (now - started) / 700);
      setDisplay(Math.round(from + (balance - from) * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(count);
    };
    frame = requestAnimationFrame(count);
    const timer = setTimeout(() => setGain(0), 2400);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); };
  }, [balance, lifetime]);
  return <div className="ticket-wallet-wrap">
    <span className="nav-ticket" role="status" aria-live="polite" aria-atomic="true">
      <span className="wallet-sr-only">{balance.toLocaleString("en-US")} tickets in your wallet{gain ? `. ${gain} tickets earned.` : ""}</span>
      <span className="nav-ticket-seal" aria-hidden="true"><Ticket size={24} strokeWidth={1.7}/></span>
      <span className="nav-ticket-value" aria-hidden="true"><strong>{display.toLocaleString("en-US")}</strong><span>tickets</span></span>
      <span key={burst} className={`nav-ticket-shine${gain ? " is-earned" : ""}`} aria-hidden="true" />
    </span>
    {gain > 0 && <span className="ticket-gain" aria-hidden="true"><Sparkles size={18}/> +{gain}</span>}
  </div>;
}
