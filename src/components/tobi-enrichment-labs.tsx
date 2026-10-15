"use client";

import { useState } from "react";
import type { DiagramKind } from "../lib/content-types";

function TobiWoolSpinningLab() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [twisted, setTwisted] = useState(true);

  const stages = [
    {
      label: "1. Shearing & Brushing",
      title: "Stage 1: A Gentle Spring Haircut & Brushing into a Cloud",
      text: "In spring, the farmer clips off the sheep's heavy wool coat (fleece) just like a haircut. After washing away mud, wire brushes comb the tangled curls into a soft, fluffy cloud!",
    },
    {
      label: "2. Spinning Into Yarn",
      title: "Stage 2: Twisting Short Hairs so Tiny Scales Lock Together",
      text: "One wool hair by itself is short and weak. But when a spinning wheel twists lots of hairs together, microscopic scales on each hair grip onto their neighbors—turning a fluffy cloud into strong yarn!",
    },
    {
      label: "3. Knitted Air Pockets",
      title: "Stage 3: How Knitted Loops Trap Warm Air Like a Blanket",
      text: "Knitting needles loop the yarn into rows of stretchy V-shapes. Those fuzzy loops trap millions of tiny pockets of still air warmed by your body so cold wind can't steal your heat!",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🧶 Interactive Wool-to-Sweater Lab</span>
        <span className="enrichment-visual-hint">Tap each step below to see inside the wool!</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 260" role="img" aria-label={stages[step].title}>
          <rect x="0" y="0" width="680" height="260" fill="#fffbeb" />
          {step === 0 && (
            <g>
              {/* Fluffy Sheep + Wire Carding Brushes */}
              <rect x="30" y="28" width="290" height="204" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
              <text x="175" y="60" textAnchor="middle" fill="#78350f" fontSize="19" fontWeight="700">
                ① Fluffy Sheep Fleece
              </text>
              <circle cx="145" cy="135" r="42" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <circle cx="185" cy="125" r="40" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <circle cx="215" cy="142" r="34" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <circle cx="110" cy="128" r="24" fill="#451a03" />
              <circle cx="103" cy="122" r="5" fill="#ffffff" />
              <text x="175" y="210" textAnchor="middle" fill="#92400e" fontSize="17" fontWeight="600">
                Gentle spring haircut = 1 big fleece!
              </text>

              <rect x="350" y="28" width="300" height="204" rx="18" fill="#ffffff" stroke="#f59e0b" strokeWidth="3" />
              <text x="500" y="60" textAnchor="middle" fill="#78350f" fontSize="19" fontWeight="700">
                ② Wire Brushes (Carding)
              </text>
              <rect x="395" y="88" width="90" height="32" rx="8" fill="#b45309" />
              <rect x="515" y="88" width="90" height="32" rx="8" fill="#b45309" />
              <path d="M405 145 Q500 125 595 145 M405 165 Q500 145 595 165 M405 185 Q500 165 595 185" fill="none" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
              <text x="500" y="214" textAnchor="middle" fill="#92400e" fontSize="17" fontWeight="600">
                Combs messy curls into aligned fibers
              </text>
            </g>
          )}
          {step === 1 && (
            <g>
              <rect x="36" y="26" width="608" height="208" rx="18" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
              <text x="340" y="60" textAnchor="middle" fill="#78350f" fontSize="20" fontWeight="700">
                {twisted
                  ? "Magnifying Glass: Twisted Yarn Locks Tight!"
                  : "Magnifying Glass: Untwisted Hairs Slip Right Apart!"}
              </text>
              {twisted ? (
                <g>
                  <path d="M90 125 C160 85, 230 165, 300 125 C370 85, 440 165, 510 125 C550 105, 580 140, 600 125" fill="none" stroke="#d97706" strokeWidth="16" strokeLinecap="round" />
                  <path d="M90 145 C160 185, 230 105, 300 145 C370 185, 440 105, 510 145 C550 165, 580 120, 600 145" fill="none" stroke="#92400e" strokeWidth="14" strokeLinecap="round" />
                  <text x="340" y="210" textAnchor="middle" fill="#15803d" fontSize="18" fontWeight="700">
                    ✓ Tiny scales grip each other so the yarn is super strong!
                  </text>
                </g>
              ) : (
                <g>
                  <line x1="95" y1="115" x2="290" y2="115" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
                  <line x1="390" y1="115" x2="585" y2="115" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
                  <line x1="115" y1="145" x2="310" y2="145" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                  <line x1="370" y1="145" x2="565" y2="145" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                  <text x="340" y="210" textAnchor="middle" fill="#b91c1c" fontSize="18" fontWeight="700">
                    ✗ Without twisting, short wool hairs slide apart when pulled!
                  </text>
                </g>
              )}
            </g>
          )}
          {step === 2 && (
            <g>
              <rect x="36" y="26" width="608" height="208" rx="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
              <text x="340" y="58" textAnchor="middle" fill="#fef3c7" fontSize="20" fontWeight="700">
                Inside a Knitted Sweater: Loops Trap Golden Pockets of Warm Air!
              </text>
              {[130, 235, 340, 445, 550].map((cx) => (
                <g key={cx}>
                  <path
                    d={`M${cx - 38} 165 Q${cx} 75 ${cx + 38} 165`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <circle cx={cx} cy="142" r="18" fill="#fde047" className="anim-pulse-glow" />
                  <text x={cx} y="148" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="700">
                    WARM
                  </text>
                </g>
              ))}
              <text x="340" y="212" textAnchor="middle" fill="#fde68a" fontSize="18" fontWeight="600">
                Glowing yellow circles = warm air pockets held snug next to your skin!
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Wool lab steps">
        {stages.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={step === i}
            onClick={() => setStep(i as 0 | 1 | 2)}
          >
            {s.label}
          </button>
        ))}
        {step === 1 && (
          <button
            type="button"
            className="enrichment-action-btn"
            aria-pressed={!twisted}
            onClick={() => setTwisted(!twisted)}
          >
            {twisted ? "Test Untwisted Hairs" : "Twist Into Strong Yarn!"}
          </button>
        )}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{stages[step].title}</strong>
        <p data-narration-text>{stages[step].text}</p>
      </div>
    </div>
  );
}

function TobiUmbrellaRaincoatLab() {
  const [fabric, setFabric] = useState<"umbrella" | "cotton">("umbrella");

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">☔ Raindrop Bounce Tester · Umbrella vs. Cotton</span>
        <span className="enrichment-visual-hint">Switch fabrics to see what happens when rain falls!</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 250" role="img" aria-label="Umbrella waterproof canopy vs cotton shirt">
          <rect x="0" y="0" width="680" height="250" fill="#0f172a" />
          {fabric === "umbrella" ? (
            <g>
              {/* Curved Dome Canopy + Bouncing Round Water Beads */}
              <path d="M90 175 Q340 55 590 175" fill="#eab308" stroke="#fef08a" strokeWidth="6" />
              <line x1="340" y1="112" x2="340" y2="235" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
              <line x1="340" y1="158" x2="210" y2="132" stroke="#cbd5e1" strokeWidth="4" />
              <line x1="340" y1="158" x2="470" y2="132" stroke="#cbd5e1" strokeWidth="4" />
              {[180, 260, 340, 420, 500].map((rx, i) => (
                <circle
                  key={rx}
                  cx={rx}
                  cy={115 - (i === 2 ? 18 : i === 1 || i === 3 ? 8 : -8)}
                  r="13"
                  fill="#38bdf8"
                  stroke="#e0f2fe"
                  strokeWidth="3"
                  className="anim-ball-flight"
                />
              ))}
              <text x="340" y="42" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="700">
                💧 Tightly Woven + Waxy Shield: Raindrops Bead Up & Roll Off!
              </text>
              <text x="340" y="225" textAnchor="middle" fill="#fef08a" fontSize="18" fontWeight="600">
                Metal stretcher ribs push the dome tight so zero puddles form on top!
              </text>
            </g>
          ) : (
            <g>
              {/* Flat Loose Cotton Weave Soaking Up Water */}
              <rect x="110" y="110" width="460" height="36" rx="10" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="16 12" />
              <rect x="150" y="110" width="380" height="75" rx="16" fill="#0284c7" opacity="0.75" />
              <text x="340" y="52" textAnchor="middle" fill="#fca5a5" fontSize="20" fontWeight="700">
                🧽 Ordinary Cotton T-Shirt: Loose Threads Drink Up Water!
              </text>
              <text x="340" y="220" textAnchor="middle" fill="#e2e8f0" fontSize="18" fontWeight="600">
                Wide gaps between thirsty cotton fibers let raindrops soak right through.
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Fabric choice">
        <button
          type="button"
          aria-pressed={fabric === "umbrella"}
          onClick={() => setFabric("umbrella")}
        >
          1. Test Waxy Umbrella Dome (Repels Water!)
        </button>
        <button
          type="button"
          aria-pressed={fabric === "cotton"}
          onClick={() => setFabric("cotton")}
        >
          2. Test Cotton T-Shirt (Absorbs Like a Sponge!)
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {fabric === "umbrella"
            ? "Why Raindrops Roll Off an Umbrella Canopy"
            : "Why a Cotton Shirt Gets Soggy in the Rain"}
        </strong>
        <p data-narration-text>
          {fabric === "umbrella"
            ? "An umbrella keeps you dry in two ways: first, its metal ribs stretch the canopy into a curved dome; second, its tightly woven fabric has a waxy coating that repels water so drops curl into round beads and slide right off!"
            : "Cotton threads have tiny spaces in between and love to soak up water (absorb). That's great for a bath towel, but in a rainstorm it lets water seep straight through to your shoulders!"}
        </p>
      </div>
    </div>
  );
}

function TobiHoneycombWaxLab() {
  const [shape, setShape] = useState<"hexagon" | "circle">("hexagon");

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🐝 Beehive Shape Builder · Hexagons vs. Circles</span>
        <span className="enrichment-visual-hint">Compare why bees build 6-sided hexagons instead of round cups!</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 250" role="img" aria-label="Honeycomb hexagon vs circle comparison">
          <rect x="0" y="0" width="680" height="250" fill="#fffbeb" />
          {shape === "hexagon" ? (
            <g>
              {[
                [230, 95],
                [310, 95],
                [390, 95],
                [270, 160],
                [350, 160],
                [430, 160],
              ].map(([cx, cy], idx) => (
                <polygon
                  key={idx}
                  points={`${cx},${cy - 42} ${cx + 38},${cy - 20} ${cx + 38},${cy + 20} ${cx},${cy + 42} ${cx - 38},${cy + 20} ${cx - 38},${cy - 20}`}
                  fill="#fbbf24"
                  stroke="#92400e"
                  strokeWidth="5"
                />
              ))}
              <text x="340" y="36" textAnchor="middle" fill="#15803d" fontSize="20" fontWeight="700">
                ✓ 6-Sided Hexagons Lock Together with ZERO Wasted Gaps!
              </text>
              <text x="340" y="232" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="600">
                Every single wax wall is shared by two neighbor cells—saving precious beeswax!
              </text>
            </g>
          ) : (
            <g>
              {[
                [240, 100],
                [320, 100],
                [400, 100],
                [240, 175],
                [320, 175],
                [400, 175],
              ].map(([cx, cy], idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="36"
                  fill="#fde047"
                  stroke="#92400e"
                  strokeWidth="5"
                />
              ))}
              <circle cx="280" cy="138" r="10" fill="#ef4444" />
              <circle cx="360" cy="138" r="10" fill="#ef4444" />
              <text x="340" y="36" textAnchor="middle" fill="#b91c1c" fontSize="20" fontWeight="700">
                ✗ Round Circles Leave Red Empty Gaps In Between!
              </text>
              <text x="340" y="232" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="600">
                Bees would have to make twice as much wax to fill the gaps between round tubes!
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Comb shape">
        <button
          type="button"
          aria-pressed={shape === "hexagon"}
          onClick={() => setShape("hexagon")}
        >
          1. Build 6-Sided Hexagons (Bee Winner!)
        </button>
        <button
          type="button"
          aria-pressed={shape === "circle"}
          onClick={() => setShape("circle")}
        >
          2. Try Round Circles (See the Wasted Gaps!)
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {shape === "hexagon"
            ? "Why Every Honeycomb Cell Has Exactly 6 Sides"
            : "What Happens If You Push Round Cups Together"}
        </strong>
        <p data-narration-text>
          {shape === "hexagon"
            ? "A hexagon has six equal sides. When honeybees build six-sided wax rooms side by side, every wall is shared by two neighbors with zero empty spaces left over! That holds the most golden honey using the least wax."
            : "Push four round cups together on a table and look in the middle—there's a diamond-shaped gap of wasted space! Bees are smart builders, so they mold six-sided hexagons instead."}
        </p>
      </div>
    </div>
  );
}

function TobiPianoStringsLab() {
  const [note, setNote] = useState<"high" | "low">("high");

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🎹 Piano Hammer & String Wiggle Lab</span>
        <span className="enrichment-visual-hint">Strike the High Bird String or the Low Bear String!</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 250" role="img" aria-label="Piano hammer and vibrating strings">
          <rect x="0" y="0" width="680" height="250" fill="#1e293b" />
          {/* Left Felt Hammer Action */}
          <rect x="35" y="155" width="130" height="32" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
          <text x="100" y="177" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="700">
            PIANO KEY
          </text>
          <line x1="150" y1="155" x2="215" y2="95" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="225" cy="88" rx="22" ry="16" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
          <text x="145" y="65" textAnchor="middle" fill="#fde68a" fontSize="17" fontWeight="700">
            Soft Felt Hammer Bounces Off!
          </text>

          {/* Right Vibrating String */}
          {note === "high" ? (
            <g>
              <path
                d="M250 88 Q285 62 320 88 T390 88 T460 88 T530 88"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                className="anim-wind-stream"
              />
              <text x="435" y="145" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="700">
                🐦 Short, Thin, Tight String = Fast Wiggles!
              </text>
              <text x="435" y="178" textAnchor="middle" fill="#e0f2fe" fontSize="18">
                Fast vibrations make a HIGH, bright musical note!
              </text>
            </g>
          ) : (
            <g>
              <path
                d="M250 92 Q355 135 460 92 T640 92"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <text x="435" y="155" textAnchor="middle" fill="#fbbf24" fontSize="20" fontWeight="700">
                🐻 Long, Thick Copper String = Slow Wiggles!
              </text>
              <text x="435" y="188" textAnchor="middle" fill="#fef3c7" fontSize="18">
                Slow, heavy vibrations make a LOW, booming bass note!
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Piano string pitch">
        <button
          type="button"
          aria-pressed={note === "high"}
          onClick={() => setNote("high")}
        >
          🐦 Play Short Thin String (High Note!)
        </button>
        <button
          type="button"
          aria-pressed={note === "low"}
          onClick={() => setNote("low")}
        >
          🐻 Play Long Thick String (Low Note!)
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {note === "high"
            ? "Fast Wiggles Make High Notes!"
            : "Slow Wiggles Make Low Booming Notes!"}
        </strong>
        <p data-narration-text>
          {note === "high"
            ? "When the felt hammer taps a short, thin string on the right side of the piano and bounces off, the string vibrates (wiggles) super fast—sending high chirping sound waves to your ears!"
            : "On the left side of the piano, the strings are extra long and wrapped in heavy copper wire. When tapped, they wiggle back and forth more slowly—making a deep, rumbling bear note!"}
        </p>
      </div>
    </div>
  );
}

function TobiBalloonHotAirLab() {
  const [heated, setHeated] = useState(true);

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🎈 Hot-Air Balloon Flight Simulator</span>
        <span className="enrichment-visual-hint">Turn the burner flame ON or OFF to watch the air particles!</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 260" role="img" aria-label="Hot air balloon particle density simulator">
          <rect x="0" y="0" width="680" height="260" fill="#e0f2fe" />
          {/* Outside Cool Air Dots */}
          {[60, 95, 75, 115, 55, 105, 580, 615, 595, 630, 575, 620].map((x, idx) => (
            <circle key={idx} cx={x} cy={55 + (idx % 6) * 32} r="8" fill="#0284c7" />
          ))}
          <text x="90" y="235" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="700">
            Cool Air (Crowded)
          </text>

          {/* Balloon Envelope */}
          <g transform={heated ? "translate(0, -14)" : "translate(0, 18)"}>
            <circle cx="340" cy="110" r="76" fill={heated ? "#f97316" : "#fb923c"} stroke="#9a3412" strokeWidth="4" />
            {heated ? (
              <g>
                {/* Spread-out fast bouncing red air particles */}
                {[
                  [310, 82],
                  [372, 86],
                  [340, 122],
                  [305, 138],
                  [378, 136],
                ].map(([cx, cy], idx) => (
                  <circle key={idx} cx={cx} cy={cy} r="10" fill="#fef08a" stroke="#b91c1c" strokeWidth="3" />
                ))}
                {/* Burner flame */}
                <path d="M328 196 Q340 162 352 196 Z" fill="#fde047" stroke="#ef4444" strokeWidth="3" />
              </g>
            ) : (
              <g>
                {/* Crowded cool particles inside */}
                {[305, 328, 352, 375, 312, 338, 365, 308, 340, 370].map((cx, idx) => (
                  <circle key={idx} cx={cx} cy={80 + (idx % 3) * 28} r="8" fill="#bae6fd" />
                ))}
              </g>
            )}
            <rect x="320" y="202" width="40" height="28" rx="6" fill="#92400e" stroke="#451a03" strokeWidth="3" />
          </g>
          <text x="535" y="110" textAnchor="middle" fill="#7c2d12" fontSize="18" fontWeight="700">
            {heated ? "⬆️ Warm Air Spreads Out!" : "⬇️ Cooled Air Crowds Back In"}
          </text>
          <text x="535" y="138" textAnchor="middle" fill="#9a3412" fontSize="16">
            {heated ? "Lighter than cool air → Floats UP!" : "Top vent opens → Floats DOWN!"}
          </text>
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Balloon controls">
        <button
          type="button"
          aria-pressed={heated}
          onClick={() => setHeated(true)}
        >
          🔥 Fire the Burner Flame (Float UP!)
        </button>
        <button
          type="button"
          aria-pressed={!heated}
          onClick={() => setHeated(false)}
        >
          🪂 Open Top Vent & Cool Air (Float DOWN!)
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {heated
            ? "Why Heating the Air Makes the Giant Balloon Rise"
            : "How the Pilot Floats Gently Back to the Grass"}
        </strong>
        <p data-narration-text>
          {heated
            ? "When the burner flame warms the air inside the envelope, the invisible air particles bounce faster and spread far apart! Because the warm air inside is less crowded (lighter) than the cool air outside, the balloon floats up into the sky!"
            : "To land, the pilot lets the air cool or pulls a cord to open the parachute vent at the top—letting hot air out so the balloon settles softly onto its stretchy wicker basket."}
        </p>
      </div>
    </div>
  );
}

function TobiStoryCardLab({
  badge,
  steps,
}: {
  badge: string;
  steps: { label: string; title: string; text: string; icon: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const current = steps[idx] ?? steps[0];
  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">{badge}</span>
        <span className="enrichment-visual-hint">Tap each step to explore!</span>
      </div>
      <div className="enrichment-controls" role="group" aria-label={badge}>
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={idx === i}
            onClick={() => setIdx(i)}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {current.icon} {current.title}
        </strong>
        <p data-narration-text>{current.text}</p>
      </div>
    </div>
  );
}

export function renderTobiEnrichmentLab(kind: DiagramKind): React.ReactNode {
  switch (kind) {
    case "tobi-wool-spinning-lab":
      return <TobiWoolSpinningLab />;
    case "tobi-umbrella-raincoat-lab":
      return <TobiUmbrellaRaincoatLab />;
    case "tobi-honeycomb-wax-lab":
      return <TobiHoneycombWaxLab />;
    case "tobi-piano-strings-lab":
      return <TobiPianoStringsLab />;
    case "tobi-balloon-hotair-lab":
      return <TobiBalloonHotAirLab />;
    case "tobi-bereishis-days-explorer":
      return (
        <TobiStoryCardLab
          badge="🌍 Interactive 7-Day Creation & Shabbos Explorer"
          steps={[
            {
              icon: "☀️",
              label: "Days 1–3: Building the Spaces",
              title: "Days 1 to 3: Light, Sky, Dry Land & Trees",
              text: "Hashem first prepared the spaces of the world: Day 1—Light; Day 2—The sky; Day 3—Dry land, seas, grass, and fruit trees!",
            },
            {
              icon: "🐦",
              label: "Days 4–6: Filling the Spaces",
              title: "Days 4 to 6: Sun & Stars, Fish & Birds, Animals & People",
              text: "Next, Hashem filled each space: Day 4—Sun, moon, and stars; Day 5—Fish and birds; Day 6—Land animals and Adam & Chava!",
            },
            {
              icon: "🕯️",
              label: "Day 7: Shabbos Menucha!",
              title: "Day 7: The Crown of Peaceful Rest (Menucha)",
              text: "Rashi explains that when Shabbos arrived on the seventh day, the world received Menucha—peaceful rest that completed Creation!",
            },
          ]}
        />
      );
    case "tobi-akiva-water-stone":
      return (
        <TobiStoryCardLab
          badge="💧 Interactive Water-on-Stone Lab · Rabbi Akiva"
          steps={[
            {
              icon: "🐑",
              label: "1. Shepherd at 40",
              title: "Akiva the Shepherd Wonders If It Is Too Late",
              text: "At 40 years old, Akiva did not yet know how to read the Alef-Beis. He thought his heart was already too hard like a rock to learn all of Torah.",
            },
            {
              icon: "💧",
              label: "2. The Carved Rock",
              title: "How Gentle Water Drops Carved Solid Stone",
              text: "Beside a spring, Akiva saw a smooth hollow carved deep into a hard boulder. People told him: 'The gentle water that drips on it every single day carved that stone!'",
            },
            {
              icon: "📖",
              label: "3. Alef-Beis Drop by Drop",
              title: "Learning One Letter & One Mitzvah at a Time!",
              text: "Akiva realized: 'If soft water can carve hard stone drop by drop, Torah words can surely shape my heart!' He learned Alef-Beis with his son and became Rabbi Akiva!",
            },
          ]}
        />
      );
    case "tobi-shabbos-candles-kiddush":
      return (
        <TobiStoryCardLab
          badge="🕯️ Interactive Shabbos Table Explorer"
          steps={[
            {
              icon: "🕯️",
              label: "1. Two Candles",
              title: "Lighting Before Sunset: Zachor & Shamor",
              text: "We light Shabbos candles 18 minutes before sunset to bring Shalom Bayit (peace in the home) and honor Zachor ('Remember') and Shamor ('Keep')!",
            },
            {
              icon: "🍷",
              label: "2. Kiddush Cup",
              title: "Declaring Shabbos Holy Over Grape Juice or Wine",
              text: "We fill a special Kiddush cup to the brim and thank Hashem for creating the world in six days and resting on Shabbos.",
            },
            {
              icon: "🍞",
              label: "3. Two Challot (Lechem Mishneh)",
              title: "Why Two Whole Loaves Sit Under the Cover",
              text: "We hold two whole braided Challot (Lechem Mishneh) to remember the double portion of Manna that fell from heaven every Friday!",
            },
          ]}
        />
      );
    case "tobi-noach-rainbow-ark":
      return (
        <TobiStoryCardLab
          badge="🌈 Interactive Teivah Kindness & Rainbow Lab"
          steps={[
            {
              icon: "🦁",
              label: "1. Feeding the Animals",
              title: "Noach's 12 Months of Non-Stop Kindness (Chesed)",
              text: "Inside the Teivah, Noach and his family stayed awake day and night serving every animal and bird its exact favorite food at the right hour!",
            },
            {
              icon: "🕊️",
              label: "2. The Dove's Olive Leaf",
              title: "A Green Olive Leaf in the Dove's Beak",
              text: "When the white Dove returned at evening holding a fresh olive leaf, Noach knew the floodwaters had dropped below the treetops!",
            },
            {
              icon: "🌈",
              label: "3. The Rainbow (Keshet)",
              title: "Sunlight + Raindrops = Hashem's Promise of Peace",
              text: "Hashem placed the colorful Rainbow (Keshet) in the clouds as a loving promise never again to bring a Flood upon the whole earth.",
            },
          ]}
        />
      );
    case "tobi-shabbos-treasure-sorting":
      return (
        <TobiStoryCardLab
          badge="🍓 Shabbos Detective Game · Picking Treats & Muktzeh"
          steps={[
            {
              icon: "🍓",
              label: "1. Pick What You Want",
              title: "Fruit Salad Rule: Take the Good Piece You Want Now!",
              text: "When strawberries and melon are mixed in a bowl, use your hand or fork to pick out the strawberry you want to eat right now—leave the rest in the bowl!",
            },
            {
              icon: "📚",
              label: "2. Shabbos Treasures",
              title: "Permitted Items We Can Freely Move",
              text: "Your Siddur, storybook, Kiddush cup, fork, and Shabbos games are permitted vessels—you can carry and enjoy them inside the home all Shabbos!",
            },
            {
              icon: "🪨",
              label: "3. Resting Muktzeh",
              title: "Coins, Rocks & Crayons Take a Shabbos Rest",
              text: "Coins, backyard pebbles, scissors, and crayons are Muktzeh—we leave them untouched until Havdalah on Saturday night!",
            },
          ]}
        />
      );
    default:
      return null;
  }
}
