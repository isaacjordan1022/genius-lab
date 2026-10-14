"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  LockKeyhole,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import "./style-lab.css";
import TicketDisplay from "./ticket-display";

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
  {
    name: "Bubblegum",
    bg: "#9F2863",
    light: "#FFE0F0",
    dark: "#5C1539",
    accent: "#F9A6D2",
    use: "Creative thinking",
  },
  {
    name: "Tangerine",
    bg: "#984514",
    light: "#FFF0DC",
    dark: "#562607",
    accent: "#F8B66D",
    use: "Big discoveries",
  },
  {
    name: "Forest",
    bg: "#205B35",
    light: "#E0F7D7",
    dark: "#133A23",
    accent: "#A8DE99",
    use: "Science & nature",
  },
  {
    name: "Midnight",
    bg: "#263E70",
    light: "#E3EDFF",
    dark: "#152342",
    accent: "#A9C5FF",
    use: "Quiet concentration",
  },
  {
    name: "Violet",
    bg: "#5333A4",
    light: "#EFE6FF",
    dark: "#2F1B61",
    accent: "#C6ABFF",
    use: "Imagination & stories",
  },
  {
    name: "Ocean",
    bg: "#075B84",
    light: "#DDF6FF",
    dark: "#04334B",
    accent: "#94DBF3",
    use: "World explorers",
  },
  {
    name: "Olive",
    bg: "#505D16",
    light: "#F5F7C7",
    dark: "#2D350B",
    accent: "#D0DE81",
    use: "Thoughtful practice",
  },
];
const pairing = { display: "DynaPuff", body: "Lexend", weight: 500 };
const surfaces = [
  {
    name: "Soft cream",
    color: "#FAF8F0",
    ink: "#A59B7A",
    note: "Warm, soft, and a little storybook.",
    motif: "stars",
  },
  {
    name: "Cloud sage",
    color: "#F4F7F3",
    ink: "#8D9E8E",
    note: "A whisper of green for a calm learning desk.",
    motif: "pencils",
  },
  {
    name: "Pearl gray",
    color: "#F6F7F9",
    ink: "#9199AD",
    note: "Clean and airy, with tiny rounded shapes.",
    motif: "shapes",
  },
];
function surfaceStyle(surface: (typeof surfaces)[number]): CSSProperties {
  return {
    "--sl-paper": surface.color,
    "--sl-surface-pattern": 'url("/design/quiet-shapes.svg")',
  } as CSSProperties;
}
const typeScale = [
  {
    role: "Celebration",
    face: "DynaPuff",
    size: "40–64",
    weight: 500,
    leading: "1.1",
    tracking: "−0.02em",
    sample: "Good thinking!",
    className: "celebration",
    use: "A short reward or a big welcome. One per screen.",
  },
  {
    role: "Page title",
    face: "DynaPuff",
    size: "32–44",
    weight: 500,
    leading: "1.15",
    tracking: "−0.01em",
    sample: "Your weekly plan",
    className: "page",
    use: "A clear destination in 3–6 words.",
  },
  {
    role: "Activity title",
    face: "DynaPuff",
    size: "24–30",
    weight: 500,
    leading: "1.2",
    tracking: "0",
    sample: "The clue is in the details",
    className: "activity",
    use: "The beginning of a chunk, card, or game.",
  },
  {
    role: "Question",
    face: "Lexend",
    size: "20–24",
    weight: 600,
    leading: "1.5",
    tracking: "0",
    sample: "What makes you think the character is worried?",
    className: "question",
    use: "A question that is easy to find and reread.",
  },
  {
    role: "Reading",
    face: "Lexend",
    size: "18–20",
    weight: 400,
    leading: "1.8",
    tracking: "0",
    sample:
      "Milo checked the clock, then his pocket. The letter was still there. So why did he check again?",
    className: "reading",
    use: "Passages, concepts, examples, and explanations.",
  },
  {
    role: "Action",
    face: "Lexend",
    size: "18–20",
    weight: 600,
    leading: "1.4",
    tracking: "0",
    sample: "Show my thinking",
    className: "action",
    use: "Buttons and navigation. At least a 48px target.",
  },
  {
    role: "Supporting label",
    face: "Lexend",
    size: "18",
    weight: 500,
    leading: "1.5",
    tracking: "0",
    sample: "Chunk 2 of 3 · Words & stories",
    className: "label",
    use: "Progress and helpful context. Never the main lesson.",
  },
];
const directions = [
  {
    name: "Pocket Arcade",
    label: "Our selected direction",
    theme: 0,
    font: 5,
    title: "Think big.\nPlay bright.",
    copy: "Cobalt cabinets, paper workbooks, bold ticket rewards. Grown-up enough for Aharon Zev; joyful enough for Ezra.",
    colors: ["#2345BC", "#E1E8FF", "#AF352F", "#FFF0B9"],
    className: "pocket",
  },
  {
    name: "Wonder Workshop",
    label: "Softer & curious",
    theme: 3,
    font: 5,
    title: "What will\nyou discover?",
    copy: "Teal, mint, and warm paper. Rounded type and friendly shapes make room for careful thinking.",
    colors: ["#07615B", "#D7F9E9", "#805300", "#F5DDFC"],
    className: "wonder",
  },
  {
    name: "Prize Parade",
    label: "The bolder option",
    theme: 1,
    font: 5,
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
  const [print, setPrint] = useState(0);
  return (
    <div className={small ? "sl-printer sl-printer-small" : "sl-printer"}>
      <TicketDisplay key={print} balance={1240} playerName="Aharon Zev" printing={print > 0} />
      <button
        className="sl-paper-button td-print-button"
        onClick={() => setPrint((n) => n + 1)}
      >
        <RotateCcw size={14} /> Replay ticket printing
      </button>
      {small && (
        <p className="td-demo-note">
          Animation preview only. The real dashboard will show your saved ticket
          balance.
        </p>
      )}
    </div>
  );
}

export default function StyleLab() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  const [directionIndex, setDirectionIndex] = useState(0);
  const [fill, setFill] = useState(palettes[0].light);
  const [outline, setOutline] = useState(palettes[0].dark);
  const [stroke, setStroke] = useState(3);
  const [sample, setSample] = useState("Good thinking!");
  const [burst, setBurst] = useState(0);
  const [saved, setSaved] = useState(false);
  const palette = palettes[paletteIndex];
  const surface = surfaces[surfaceIndex];
  function selectPalette(index: number) {
    setPaletteIndex(index);
    setFill(palettes[index].light);
    setOutline(palettes[index].dark);
    setSaved(false);
  }
  function selectDirection(index: number) {
    setDirectionIndex(index);
    selectPalette(directions[index].theme);
  }
  function saveChoice() {
    try {
      localStorage.setItem(
        "learning-arcade-design-choice",
        JSON.stringify({
          direction: directions[directionIndex].name,
          palette: palette.name,
          surface: surface.name,
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
    <main className="style-lab" style={surfaceStyle(surface)}>
      <nav className="sl-nav" aria-label="Design lab navigation">
        <a href="/" className="sl-back">
          <ArrowLeft size={18} /> Back to the prototype
        </a>
        <a href="#type">Type & spacing</a>
        <a href="#surfaces">Light surfaces</a>
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
            Our family’s learning arcade, taking shape. DynaPuff and Lexend are
            our typefaces. Explore their sizes, the color families, and three
            quiet surfaces.
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
                  "--sl-direction-font": "DynaPuff",
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
            <div className="sl-locked-type">
              <Check size={18} />
              <div>
                <strong>DynaPuff + Lexend</strong>
                <span>Our chosen type pairing</span>
              </div>
            </div>
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
              Saves this design sample on this device. It does not change the
              learning app.
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
              <strong>{surface.name}</strong>
              <span>{surface.color} + #273329</span>
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

      <section id="surfaces" className="sl-section">
        <div className="sl-section-heading">
          <div>
            <h2>A softer place to think.</h2>
            <p>
              Almost-white surfaces, with tiny rounded details you notice only
              when you look closely. Choose one to try across this page.
            </p>
          </div>
          <span className="sl-small-note">
            Three light surfaces. No grid lines.
          </span>
        </div>
        <div className="sl-surface-options">
          {surfaces.map((option, index) => (
            <button
              type="button"
              key={option.name}
              aria-pressed={surfaceIndex === index}
              className={`sl-surface-option ${surfaceIndex === index ? "is-selected" : ""}`}
              style={surfaceStyle(option)}
              onClick={() => {
                setSurfaceIndex(index);
                setSaved(false);
              }}
            >
              <span className="sl-surface-preview">
                <span className="sl-surface-sticker">A little wonder</span>
                <span className="sl-surface-check">
                  {surfaceIndex === index ? <Check size={18} /> : "+"}
                </span>
              </span>
              <span className="sl-surface-caption">
                <strong>{option.name}</strong>
                <span>{option.color}</span>
                <p>{option.note}</p>
              </span>
            </button>
          ))}
        </div>
        <div className="sl-surface-reading" style={surfaceStyle(surface)}>
          <div>
            <span>Quiet around the lesson</span>
            <h3>Let the words do the work.</h3>
            <p>
              The tiny shapes live around the activity. Reading sits on a plain,
              almost-white card, so our eyes can settle on the story.
            </p>
          </div>
          <article>
            <h4>One small detail</h4>
            <p>
              Milo folded the letter into a tiny square. Then he unfolded it
              again. <mark>His hands wouldn’t stay still.</mark>
            </p>
            <p>What can that detail tell you about how Milo feels?</p>
          </article>
        </div>
      </section>

      <section id="type" className="sl-section">
        <div className="sl-section-heading">
          <div>
            <h2>Two voices. One clear system.</h2>
            <p>
              DynaPuff brings the delight. Lexend carries the thinking. These
              are the sizes and rhythms we’ll use across every child’s
              experience.
            </p>
          </div>
          <span className="sl-type-approved">
            <Check size={16} /> DynaPuff + Lexend
          </span>
        </div>
        <div className="sl-type-scale">
          {typeScale.map((level) => (
            <article className="sl-type-row" key={level.role}>
              <div className="sl-type-meta">
                <strong>{level.role}</strong>
                <span>
                  {level.face} · {level.weight}
                </span>
                <span>
                  {level.size}px · line height {level.leading}
                </span>
                <span>Tracking {level.tracking}</span>
              </div>
              <div>
                <p className={`sl-type-specimen sl-type-${level.className}`}>
                  {level.sample}
                </p>
                <p className="sl-type-use">{level.use}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sl-weight-guide">
          {["DynaPuff", "Lexend"].map((face) => (
            <article key={face}>
              <h3>{face}: the useful weights</h3>
              <p>
                {face === "DynaPuff"
                  ? "Locally installed variable font: 400–700. Use 400 or 500 for normal headings. Heavier weights are shown only for comparison."
                  : "Locally installed variable font: 100–900. Our interface uses 400, 500, and 600; 700 is for brief emphasis."}
              </p>
              <div>
                {[400, 500, 600, 700].map((weight) => (
                  <span key={weight}>
                    <strong style={{ fontFamily: face, fontWeight: weight }}>
                      Aa
                    </strong>
                    <small>{weight}</small>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="sl-reading-system">
          <article>
            <h3>Room for a good story.</h3>
            <p className="sl-reading-system-note">
              18px Lexend · 400 · 1.8 line height · 58ch maximum width
            </p>
            <div className="sl-reading-measure">
              <p>
                “It’s only a painting,” said Ada. Then she noticed the light. It
                slipped across the water in little broken pieces, as if someone
                had scattered coins across the pond.
              </p>
              <p>
                She leaned closer. The shapes weren’t perfectly clear. Somehow,
                that made the moment feel more alive.
              </p>
            </div>
            <p className="sl-type-use">
              Short paragraphs. A full line of space between ideas. Highlight a
              useful word or piece of evidence; leave the rest quiet.
            </p>
          </article>
          <aside>
            <h3>Small rules, big difference.</h3>
            <ul>
              <li>Passages stay within 48–60 characters per line.</li>
              <li>Use 20–22px reading text for Ezra and early readers.</li>
              <li>Question prompts get more weight, never an outline.</li>
              <li>Outlines belong on short, large DynaPuff headlines only.</li>
              <li>Use normal letter spacing for reading and buttons.</li>
              <li>Never shrink the main lesson text to make a card fit.</li>
            </ul>
            <div className="sl-type-downloads">
              <a href="/design/fonts/dynapuff-DynaPuff-wdth-wght.ttf" download>
                Download DynaPuff
              </a>
              <a href="/design/fonts/lexend-Lexend-wght.ttf" download>
                Download Lexend
              </a>
            </div>
          </aside>
        </div>
        <div className="sl-spacing-system">
          <div className="sl-section-heading">
            <div>
              <h3>Space has a rhythm, too.</h3>
              <p>
                Use the same small set of distances, so every page feels
                related.
              </p>
            </div>
          </div>
          <div className="sl-space-tokens">
            {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
              <div key={size}>
                <span style={{ height: size }} />
                <strong>{size}px</strong>
              </div>
            ))}
          </div>
          <div className="sl-spacing-examples">
            <article>
              <span className="sl-spacing-measure">
                24px card padding · 16px between ideas
              </span>
              <h4>A useful example</h4>
              <p>
                Ada noticed the broken reflections. What did those details make
                you imagine?
              </p>
              <button
                type="button"
                onClick={() => setBurst((value) => value + 1)}
              >
                Show my thinking
              </button>
              <span className="sl-spacing-button-note">
                16px × 24px button padding · 48px minimum height
              </span>
            </article>
            <div>
              <dl>
                <div>
                  <dt>Icon to label</dt>
                  <dd>8px</dd>
                </div>
                <div>
                  <dt>Heading to copy</dt>
                  <dd>12–16px</dd>
                </div>
                <div>
                  <dt>Between related cards</dt>
                  <dd>16–24px</dd>
                </div>
                <div>
                  <dt>Inside a card</dt>
                  <dd>24px desktop · 16–20px mobile</dd>
                </div>
                <div>
                  <dt>Between sections</dt>
                  <dd>48–64px desktop · 32px mobile</dd>
                </div>
                <div>
                  <dt>Main content width</dt>
                  <dd>1,200px max; reading 58ch</dd>
                </div>
              </dl>
            </div>
          </div>
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
              A real little printing moment: rollers, perforations, a gold seal,
              and a crisp ticket balance. One brief celebration when tickets
              arrive.
            </p>
          </article>
          <article className="sl-prize-specimen">
            <span className="sl-specimen-label">
              A room full of possibility.
            </span>
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

      <footer className="sl-footer">
        <div>
          <strong>Keep the joy. Protect the reading.</strong>
          <p>
            Our selected pairing: DynaPuff headlines and Lexend for reading.
            Rich color for rewards, calm paper for careful thinking.
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
          <a
            href="/design/fonts/dynapuff-OFL.txt"
            target="_blank"
            rel="noreferrer"
          >
            DynaPuff
          </a>
          {" · "}
          <a
            href="/design/fonts/lexend-OFL.txt"
            target="_blank"
            rel="noreferrer"
          >
            Lexend
          </a>
          . Lettering effects, graphics, and palette proposals are original to
          this project.
        </p>
      </footer>
    </main>
  );
}
