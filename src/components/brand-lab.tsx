"use client";
import Link from "next/link";
import GeniusLogo from "./genius-logo";
import { LearningAvatar } from "./avatar-lab";
import "./brand-lab.css";
const palette = [
  ["Cobalt", "#203C9E"],
  ["Sky", "#D7EDFF"],
  ["Blue", "#3976EA"],
  ["Cream", "#FFFDF4"],
  ["Midnight", "#102966"],
];
export default function BrandLab() {
  return (
    <main className="brand-lab genius-brand-sheet">
      <header className="brand-lab-header">
        <Link href="/style-lab">← Design lab</Link>
        <Link href="/login">Open the login page</Link>
      </header>
      <div className="brand-lab-intro">
        <h1>Genius Lab</h1>
        <p>
          Our chosen logo: glossy sky-blue letters with rounded cobalt depth.
          Tick is right at home.
        </p>
      </div>
      <section
        className="genius-brand-hero"
        aria-label="Genius Lab logo and Tick"
      >
        <LearningAvatar size={250} mood="celebrate" />
        <div>
          <GeniusLogo />
          <p>A place to try. A place to wonder.</p>
        </div>
      </section>
      <section className="genius-brand-assets" aria-label="Logo variations">
        <article className="genius-mark-card">
          <h2>The wordmark</h2>
          <div className="genius-mark-light">
            <GeniusLogo />
          </div>
          <p>
            DynaPuff-inspired bubble lettering, rendered in 3D with soft
            highlights and a transparent background.
          </p>
          <a href="/brand/options/genius-lab-sky-cobalt-v1.png" download>
            Download the logo PNG
          </a>
        </article>
        <article className="genius-mark-card">
          <h2>The little lab badge</h2>
          <div className="genius-icon-preview">
            <GeniusLogo icon />
            <GeniusLogo icon className="genius-icon-tiny" />
          </div>
          <p>A dimensional badge for the app and its browser tab.</p>
          <a href="/brand/genius-lab-icon.svg" download>
            Download the icon SVG
          </a>
        </article>
      </section>
      <section className="genius-brand-tokens" aria-labelledby="brand-colors">
        <h2 id="brand-colors">One cheerful family of colors.</h2>
        <div className="genius-color-strip">
          {palette.map(([name, color]) => (
            <div key={name}>
              <i style={{ background: color }} />
              <strong>{name}</strong>
              <span>{color}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="genius-brand-type">
        <div>
          <h2>Ideas have room to grow.</h2>
          <p>
            DynaPuff brings the character. Lexend keeps the reading easy.
            Headings stay soft and rounded; every lesson has space to breathe.
          </p>
        </div>
        <LearningAvatar size={170} mood="thinking" />
      </section>
    </main>
  );
}
