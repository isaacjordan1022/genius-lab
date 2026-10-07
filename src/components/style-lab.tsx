"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  LockKeyhole,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import "./style-lab.css";

type Palette = {
  name: string;
  bg: string;
  light: string;
  dark: string;
  accent: string;
  use: string;
};
const palettes: Palette[] = [
  {
    name: "Cobalt",
    bg: "#2345BC",
    light: "#E1E8FF",
    dark: "#12256B",
    accent: "#AFC3FF",
    use: "Your next lesson",
  },
  {
    name: "Plum",
    bg: "#672479",
    light: "#F5DDFC",
    dark: "#3B1047",
    accent: "#DBA8EC",
    use: "Words & storytelling",
  },
  {
    name: "Coral",
    bg: "#AF352F",
    light: "#FFE6DC",
    dark: "#65221B",
    accent: "#FFAF98",
    use: "Daily challenges",
  },
  {
    name: "Teal",
    bg: "#07615B",
    light: "#D7F9E9",
    dark: "#043D39",
    accent: "#8DD7BF",
    use: "Discovery & ideas",
  },
  {
    name: "Gold",
    bg: "#805300",
    light: "#FFF0B9",
    dark: "#493200",
    accent: "#F4CB5C",
    use: "Tickets & prizes",
  },
];
const pairings = [
  {
    display: "Lilita One",
    body: "Atkinson Hyperlegible",
    word: "Good thinking!",
    mood: "Chunky arcade lettering + a calm, clear reader.",
    source: "Lilita+One",
    file: "lilitaone-LilitaOne-Regular.ttf",
    license: "lilitaone",
    weight: 400,
  },
  {
    display: "Fredoka",
    body: "Nunito",
    word: "What if…",
    mood: "Round, curious, and friendly across all three ages.",
    source: "Fredoka",
    file: "fredoka-Fredoka-wdth-wght.ttf",
    license: "fredoka",
    weight: 700,
  },
  {
    display: "Bungee",
    body: "Atkinson Hyperlegible",
    word: "LEVEL UP",
    mood: "A proper arcade marquee. Best in short bursts.",
    source: "Bungee",
    file: "bungee-Bungee-Regular.ttf",
    license: "bungee",
    weight: 400,
  },
  {
    display: "Baloo 2",
    body: "Lexend",
    word: "Aha! I get it.",
    mood: "Soft, lively shapes with a steady reading rhythm.",
    source: "Baloo+2",
    file: "baloo2-Baloo2-wght.ttf",
    license: "baloo2",
    weight: 800,
  },
  {
    display: "Coiny",
    body: "Nunito",
    word: "Big ideas!",
    mood: "Puffy, playful letters made for outlined headings.",
    source: "Coiny",
    file: "coiny-Coiny-Regular.ttf",
    license: "coiny",
    weight: 400,
  },
  {
    display: "DynaPuff",
    body: "Lexend",
    word: "Plot twist!",
    mood: "A little eccentric, with a storybook personality.",
    source: "DynaPuff",
    file: "dynapuff-DynaPuff-wdth-wght.ttf",
    license: "dynapuff",
    weight: 700,
  },
];
const directions = [
  {
    name: "Pocket Arcade",
    label: "Our starting favorite",
    theme: 0,
    font: 0,
    title: "Think big.\nPlay bright.",
    copy: "Cobalt cabinets, paper workbooks, bold ticket rewards. Grown-up enough for Aharon Zev; joyful enough for Ezra.",
    colors: ["#2345BC", "#E1E8FF", "#AF352F", "#FFF0B9"],
    className: "pocket",
  },
  {
    name: "Wonder Workshop",
    label: "Softer & curious",
    theme: 3,
    font: 1,
    title: "What will\nyou discover?",
    copy: "Teal, mint, and warm paper. Rounded type and friendly shapes make room for careful thinking.",
    colors: ["#07615B", "#D7F9E9", "#805300", "#F5DDFC"],
    className: "wonder",
  },
  {
    name: "Prize Parade",
    label: "The bolder option",
    theme: 1,
    font: 4,
    title: "A little\nmore WOW.",
    copy: "Plum, lilac, and golden ticket details. Big puffy headlines give the prize counter a personality of its own.",
    colors: ["#672479", "#F5DDFC", "#AF352F", "#F4CB5C"],
    className: "parade",
  },
];
function luminance(hex: string) {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const first = luminance(a),
    second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}
function themeStyle(p: Palette): CSSProperties {
  return {
    "--sl-bg": p.bg,
    "--sl-light": p.light,
    "--sl-dark": p.dark,
    "--sl-accent": p.accent,
  } as CSSProperties;
}
function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M30 0 36 21 56 11 43 29 60 38 38 38 36 60 26 41 8 54 18 34 0 26 22 24Z" />
    </svg>
  );
}
function TicketGraphic({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`sl-ticket ${small ? "sl-ticket-small" : ""}`}
      aria-label="Sample ticket balance: 1,240 tickets"
    >
      <span className="sl-ticket-serial" aria-hidden="true">
        ✦ 017 ✦
      </span>
      <div>
        <span className="sl-ticket-label">Good thinking pays off</span>
        <strong>1,240</strong>
        <span className="sl-ticket-unit">tickets earned</span>
      </div>
      <div className="sl-ticket-stub" aria-hidden="true">
        ★
        <span>
          KEEP
          <br />
          GOING!
        </span>
      </div>
    </div>
  );
}

export default function StyleLab() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [directionIndex, setDirectionIndex] = useState(0);
  const [fill, setFill] = useState(palettes[0].light);
  const [outline, setOutline] = useState(palettes[0].dark);
  const [stroke, setStroke] = useState(3);
  const [sample, setSample] = useState("Good thinking!");
  const [burst, setBurst] = useState(0);
  const [saved, setSaved] = useState(false);
  const palette = palettes[paletteIndex],
    pairing = pairings[fontIndex];
  function selectPalette(index: number) {
    setPaletteIndex(index);
    setFill(palettes[index].light);
    setOutline(palettes[index].dark);
    setSaved(false);
  }
  function selectDirection(index: number) {
    setDirectionIndex(index);
    selectPalette(directions[index].theme);
    setFontIndex(directions[index].font);
  }
  function saveChoice() {
    try {
      localStorage.setItem(
        "learning-arcade-design-choice",
        JSON.stringify({
          direction: directions[directionIndex].name,
          palette: palette.name,
          headline: pairing.display,
          body: pairing.body,
          fill,
          outline,
          stroke,
        }),
      );
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }
  const headingStyle: CSSProperties = {
    fontFamily: `'${pairing.display}', sans-serif`,
    fontWeight: pairing.weight,
    color: fill,
    WebkitTextStroke: `${stroke}px ${outline}`,
    paintOrder: "stroke fill",
  };
  const customContrast = contrast(fill, palette.bg);
  return (
    <main className="style-lab">
      <nav className="sl-nav" aria-label="Design lab navigation">
        <a href="/" className="sl-back">
          <ArrowLeft size={18} /> Back to the prototype
        </a>
        <a href="#type">Type playground</a>
        <a href="#colors">Color studio</a>
        <a href="#avatars">Meet the avatars</a>
      </nav>
      <header className="sl-intro">
        <div className="sl-intro-copy">
          <span className="sl-project-label">
            <span className="sl-status-dot" /> Learning arcade / design lab
          </span>
          <h1>
            Serious learning.
            <br />
            <span>
              Ridiculous amounts
              <br className="sl-mobile-break" /> of fun.
            </span>
          </h1>
          <p>
            A hands-on mood board for our family’s learning arcade. Try the
            lettering, mix the colors, and find its personality.
          </p>
          <div className="sl-intro-links">
            <a href="#directions" className="sl-paper-button">
              Explore three directions <ChevronRight size={18} />
            </a>
            <span>Everything here is a design sample.</span>
          </div>
        </div>
        <div className="sl-intro-art">
          <Star className="sl-hero-star" />
          <span className="sl-hand-note">
            The little wins
            <br />
            should feel BIG.
          </span>
          <TicketGraphic />
          <span className="sl-doodle-arrow" aria-hidden="true">
            ⤴
          </span>
          <div className="sl-sticker">
            Aha!<span>That’s the feeling.</span>
          </div>
        </div>
      </header>

      <section id="directions" className="sl-section">
        <div className="sl-section-heading">
          <div>
            <h2>Three ways to play it.</h2>
            <p>Same learning experience. Three different personalities.</p>
          </div>
          <span className="sl-small-note">Choose one to try it below.</span>
        </div>
        <div className="sl-directions">
          {directions.map((direction, index) => (
            <button
              key={direction.name}
              aria-pressed={directionIndex === index}
              className={`sl-direction ${direction.className} ${directionIndex === index ? "is-selected" : ""}`}
              onClick={() => selectDirection(index)}
              style={
                {
                  ...themeStyle(palettes[direction.theme]),
                  "--sl-direction-font": `'${pairings[direction.font].display}'`,
                } as CSSProperties
              }
            >
              <span className="sl-direction-top">
                <span>{direction.label}</span>
                <span className="sl-select-indicator">
                  {directionIndex === index ? <Check size={16} /> : "+"}
                </span>
              </span>
              <span className="sl-direction-title">{direction.title}</span>
              <span className="sl-direction-swatch">
                {direction.colors.map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </span>
              <span className="sl-direction-name">{direction.name}</span>
              <span className="sl-direction-copy">{direction.copy}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="colors" className="sl-section">
        <div className="sl-section-heading">
          <div>
            <h2>One color. Lots of character.</h2>
            <p>
              Deep backgrounds, pale matching type, solid shadows. Paper gives
              the eyes a break.
            </p>
          </div>
        </div>
        <div className="sl-palette-picker" aria-label="Choose a color family">
          {palettes.map((p, index) => (
            <button
              key={p.name}
              className={index === paletteIndex ? "is-selected" : ""}
              aria-pressed={index === paletteIndex}
              onClick={() => selectPalette(index)}
            >
              <span
                className="sl-color-chip"
                style={{ background: p.bg, color: p.light }}
              >
                <span>Aa</span>
                {index === paletteIndex && <Check size={15} />}
              </span>
              <strong>{p.name}</strong>
              <span>{contrast(p.bg, p.light).toFixed(1)}:1 contrast</span>
            </button>
          ))}
        </div>
        <div className="sl-live-studio" style={themeStyle(palette)}>
          <div className="sl-arcade-cabinet">
            <div className="sl-cabinet-top">
              <span>
                <i /> Wednesday’s lesson
              </span>
              <span>Design sample</span>
            </div>
            <div className="sl-cabinet-content">
              <span className="sl-progress-pill">
                Step 3 of 5 · Look a little closer
              </span>
              <h3 className="sl-live-heading" style={headingStyle}>
                {sample || "Good thinking!"}
              </h3>
              <p
                className="sl-reader-sample"
                style={{ fontFamily: `'${pairing.body}', sans-serif` }}
              >
                A metaphor borrows an idea to help you see something
                differently. “The classroom was a zoo” probably doesn’t mean
                your teacher brought a giraffe. Probably.
              </p>
              <div className="sl-sample-actions">
                <button
                  className="sl-depth-button"
                  onClick={() => setBurst((value) => value + 1)}
                >
                  <Play size={17} fill="currentColor" /> Try the button
                  <span className="sl-button-shine" aria-hidden="true" />
                </button>
                <span className="sl-quiet-icon">
                  <Volume2 size={20} /> Read-along style
                </span>
              </div>
              <div className="sl-burst-zone" aria-live="polite">
                {burst > 0 && (
                  <span key={burst} className="sl-test-burst">
                    <Sparkles size={19} /> Nice click!
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                )}
              </div>
              <div
                className="sl-segment-track"
                aria-label="Sample lesson progress: 3 of 5 steps"
              >
                <span />
                <span />
                <span />
                <i />
                <i />
              </div>
            </div>
          </div>
          <aside className="sl-studio-controls">
            <h3>Make it your own.</h3>
            <label>
              Headline
              <select
                value={fontIndex}
                onChange={(e) => {
                  setFontIndex(Number(e.target.value));
                  setSaved(false);
                }}
              >
                {pairings.map((p, i) => (
                  <option key={p.display} value={i}>
                    {p.display}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Try your own words
              <input
                type="text"
                value={sample}
                maxLength={38}
                onChange={(e) => setSample(e.target.value)}
              />
            </label>
            <div className="sl-color-controls">
              <label>
                Inside color
                <input
                  type="color"
                  value={fill}
                  onChange={(e) => {
                    setFill(e.target.value);
                    setSaved(false);
                  }}
                />
              </label>
              <label>
                Outline color
                <input
                  type="color"
                  value={outline}
                  onChange={(e) => {
                    setOutline(e.target.value);
                    setSaved(false);
                  }}
                />
              </label>
            </div>
            <label>
              Outline thickness <span>{stroke}px</span>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={stroke}
                onChange={(e) => {
                  setStroke(Number(e.target.value));
                  setSaved(false);
                }}
              />
            </label>
            <p
              className={`sl-contrast-note ${customContrast < 3 ? "needs-care" : ""}`}
            >
              Headline fill: {customContrast.toFixed(1)}:1 against the panel.{" "}
              {customContrast >= 3
                ? "Meets 3:1 for large text."
                : "Low contrast: use a lighter fill."}{" "}
              Body text stays at{" "}
              {contrast(palette.bg, palette.light).toFixed(1)}:1.
            </p>
            <button onClick={saveChoice} className="sl-paper-button">
              {saved ? (
                <>
                  <Check size={17} /> Choice saved on this device
                </>
              ) : (
                "Save this combination"
              )}
            </button>
            <p className="sl-control-note">
              For our design review. This won’t change the grayscale prototype.
            </p>
          </aside>
        </div>
        <div className="sl-color-rules">
          <div>
            <span
              className="sl-rule-swatch"
              style={{ background: palette.bg, color: palette.light }}
            >
              Aa
            </span>
            <div>
              <strong>{palette.name} field</strong>
              <span>
                {palette.bg} + {palette.light}
              </span>
              <p>One saturated surface per main activity.</p>
            </div>
          </div>
          <div>
            <span className="sl-rule-swatch sl-paper-swatch">Aa</span>
            <div>
              <strong>Warm graph paper</strong>
              <span>#F7F5ED + #273329</span>
              <p>Reading, navigation, and breathing room.</p>
            </div>
          </div>
          <div>
            <span
              className="sl-rule-swatch"
              style={{
                background: palette.light,
                color: palette.dark,
                boxShadow: `0 5px 0 ${palette.dark}`,
              }}
            >
              Go!
            </span>
            <div>
              <strong>Matching buttons</strong>
              <span>
                {palette.light} + {palette.dark}
              </span>
              <p>Depth shows what can be pressed.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="type" className="sl-section">
        <div className="sl-section-heading">
          <div>
            <h2>Six pairs. Six personalities.</h2>
            <p>
              Real fonts, locally installed. Outlined display type up top;
              comfortable lesson reading below.
            </p>
          </div>
          <span className="sl-small-note">
            All six are free to use under the OFL.
          </span>
        </div>
        <div className="sl-font-grid">
          {pairings.map((p, index) => {
            const theme = palettes[index % palettes.length];
            return (
              <article
                key={p.display}
                className="sl-font-card"
                style={themeStyle(theme)}
              >
                <div className="sl-font-title">
                  <span>{p.display}</span>
                  <span>+ {p.body}</span>
                </div>
                <div
                  className="sl-font-sample"
                  style={{
                    fontFamily: `'${p.display}', sans-serif`,
                    fontWeight: p.weight,
                  }}
                >
                  {p.word}
                </div>
                <div
                  className="sl-font-body"
                  style={{ fontFamily: `'${p.body}', sans-serif` }}
                >
                  <p>
                    Look closely. What detail in the painting makes the room
                    feel quiet? Tell us what you notice and why it matters.
                  </p>
                  <span>Aa Bb Gg Ii Ll · 0123456789</span>
                </div>
                <p className="sl-font-description">{p.mood}</p>
                <div className="sl-font-links">
                  <button
                    onClick={() => {
                      setFontIndex(index);
                      selectPalette(index % palettes.length);
                      document.getElementById("colors")?.scrollIntoView({
                        behavior: window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches
                          ? "instant"
                          : "smooth",
                      });
                    }}
                  >
                    Try this pair <ArrowUpRight size={15} />
                  </button>
                  <a href={`/design/fonts/${p.file}`} download>
                    Download
                  </a>
                  <a
                    href={`https://fonts.google.com/specimen/${p.source}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sl-section sl-details-section">
        <div className="sl-section-heading">
          <div>
            <h2>The good bits deserve a little flair.</h2>
            <p>
              Graphics with a job: show a reward, mark progress, celebrate an
              achievement.
            </p>
          </div>
        </div>
        <div className="sl-detail-grid">
          <article className="sl-ticket-specimen">
            <span className="sl-specimen-label">
              Tickets should feel collectible.
            </span>
            <TicketGraphic small />
            <p>
              A physical ticket shape, a clear number, and a tiny bit of
              swagger. No confusing coins-versus-points wallet.
            </p>
          </article>
          <article className="sl-prize-specimen">
            <span className="sl-specimen-label">A shelf worth saving for.</span>
            <div className="sl-prize-box">
              <span className="sl-prize-flag">Dream prize</span>
              <svg
                viewBox="0 0 160 130"
                aria-label="Illustration of a toy rocket"
                role="img"
              >
                <ellipse cx="80" cy="116" rx="45" ry="8" fill="#C6A2DB" />
                <path
                  d="M66 83 58 108 80 99 102 108 95 83"
                  fill="#AF352F"
                  stroke="#511B67"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M80 8C52 29 57 73 63 92h34c7-21 9-63-17-84Z"
                  fill="#FFF4DA"
                  stroke="#511B67"
                  strokeWidth="4"
                />
                <path
                  d="M80 8c-9 7-15 16-18 27h36C94 24 89 15 80 8Z"
                  fill="#EDA18B"
                  stroke="#511B67"
                  strokeWidth="4"
                />
                <circle
                  cx="80"
                  cy="55"
                  r="12"
                  fill="#AFC3FF"
                  stroke="#511B67"
                  strokeWidth="4"
                />
                <path
                  d="M74 100 80 122 87 100"
                  fill="#F4CB5C"
                  stroke="#511B67"
                  strokeWidth="3"
                />
                <path
                  d="m33 38 3 8 8 3-8 3-3 8-3-8-8-3 8-3Zm92 19 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"
                  fill="#FFF4DA"
                />
              </svg>
              <h3>Build a rocket</h3>
              <strong>2,000 tickets</strong>
              <div
                className="sl-prize-progress"
                role="img"
                aria-label="Sample progress: 1,240 out of 2,000 tickets"
              >
                <span />
              </div>
              <p>760 more tickets to go</p>
            </div>
            <p>
              A framed object, clear price, and visible progress. Sample artwork
              and price only.
            </p>
          </article>
          <article className="sl-flair-notes">
            <span className="sl-specimen-label">Our visual rules</span>
            <div>
              <Check />
              <p>
                <strong>Arcade edges</strong>Double borders and inset rims make
                activities feel like little cabinets.
              </p>
            </div>
            <div>
              <Check />
              <p>
                <strong>A flash when you earn it</strong>A brief gloss sweep or
                star burst answers a click or achievement.
              </p>
            </div>
            <div>
              <Check />
              <p>
                <strong>Big type, quiet reading</strong>Save the outlines for
                headlines. Passages get clear letters and generous space.
              </p>
            </div>
            <div>
              <LockKeyhole />
              <p>
                <strong>Always readable</strong>Color never carries progress
                alone. Motion can be reduced. No looping flashes.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="sl-section sl-premium">
        <div>
          <h2>Two paid fonts worth a look.</h2>
          <p>
            The free options are strong enough to build with. These are optional
            foundry references, not installed samples.
          </p>
        </div>
        <div className="sl-premium-options">
          <a
            href="https://ohnotype.co/fonts/obviously"
            target="_blank"
            rel="noreferrer"
          >
            <strong>
              Obviously <ArrowUpRight size={20} />
            </strong>
            <span>OH no Type Company</span>
            <p>
              Broad, powerful lettering for an older-kid arcade identity.
              Explore the Wide and Extended families.
            </p>
            <span className="sl-premium-price">
              Listed: $30 individual style / $119 width family*
            </span>
          </a>
          <a
            href="https://ohnotype.co/fonts/softie"
            target="_blank"
            rel="noreferrer"
          >
            <strong>
              Ohno Softie <ArrowUpRight size={20} />
            </strong>
            <span>OH no Type Company</span>
            <p>
              Extra-rounded letters for a softer, more unusual identity. Worth
              comparing with Fredoka and Coiny.
            </p>
            <span className="sl-premium-price">Listed: $99 family*</span>
          </a>
        </div>
        <p className="sl-source-note">
          *Foundry listings checked October 7, 2026. The final price depends on
          selected styles and web licensing; these are not checkout quotes. No
          paid fonts have been downloaded or purchased.
        </p>
      </section>
      <footer className="sl-footer">
        <div>
          <strong>Keep the joy. Protect the reading.</strong>
          <p>
            Our recommended starting point: Pocket Arcade, Lilita One headlines,
            Atkinson Hyperlegible passages, and calm paper between colorful
            moments.
          </p>
        </div>
        <div className="sl-footer-links">
          <a href="#avatars">
            Next: avatar workshop <ChevronRight size={17} />
          </a>
          <a href="#directions">
            <RotateCcw size={15} /> Compare again
          </a>
        </div>
        <p className="sl-license-note">
          Fonts from the{" "}
          <a
            href="https://github.com/google/fonts"
            target="_blank"
            rel="noreferrer"
          >
            official Google Fonts repository
          </a>
          . SIL Open Font License files are included with each family:{" "}
          {pairings.map((p, index) => (
            <span key={p.license}>
              {index > 0 ? " · " : ""}
              <a
                href={`/design/fonts/${p.license}-OFL.txt`}
                target="_blank"
                rel="noreferrer"
              >
                {p.display}
              </a>
            </span>
          ))}
          . Lettering effects, graphics, and palette proposals are original to
          this project.
        </p>
      </footer>
    </main>
  );
}
