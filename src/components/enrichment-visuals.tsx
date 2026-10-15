"use client";

import { useState } from "react";
import type { DiagramKind } from "../lib/content-types";
import RealWorldGallery from "./real-world-gallery";
import { renderTobiEnrichmentLab } from "./tobi-enrichment-labs";
import "./enrichment-visuals.css";

function LeatherTanningLab() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [tannedView, setTannedView] = useState(true);

  const steps = [
    {
      label: "1. Raw Hide & Collagen",
      title: "Stage 1: Cleaning the Raw Hide",
      text: "A raw cattle hide is mostly water and microscopic protein ropes called collagen. After removing hair and flesh, the hide is still perishable—if it dries out now, the fibers glue themselves into stiff, brittle rawhide; if it stays wet, bacteria break it down.",
    },
    {
      label: "2. The Tannin Drum",
      title: "Stage 2: Tumbling in Oak-Bark Tannins",
      text: "Inside a giant rotating drum, the hide tumbles in water rich with tannins (originally extracted from oak and chestnut tree bark). The tumbling motion pushes tannin molecules deep between every bundle of collagen fibers.",
    },
    {
      label: "3. Cross-Linked Leather",
      title: "Stage 3: Locking the Fiber Bridges",
      text: "Tannin molecules act like tiny chemical bridges (cross-links) between collagen strands. They push water out and keep the fibers spaced apart so they can slide and flex millions of times without rotting or cracking!",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">⚙️ Interactive Motion Lab · How Leather Is Made</span>
        <span className="enrichment-visual-hint">Tap each stage to inspect the process</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg
          viewBox="0 0 680 280"
          role="img"
          aria-label={`Leather making diagram showing ${steps[step].title}`}
        >
          <rect x="0" y="0" width="680" height="280" fill="#fdf8f0" />
          {/* Top Pipeline Bar */}
          <line x1="120" y1="36" x2="560" y2="36" stroke="#d6c5b3" strokeWidth="6" strokeLinecap="round" />
          {[120, 340, 560].map((cx, i) => (
            <g key={cx}>
              <circle
                cx={cx}
                cy="36"
                r="16"
                fill={step === i ? "#8c3d19" : "#e5d5c3"}
                stroke="#5c2810"
                strokeWidth="3"
              />
              <text
                x={cx}
                y="42"
                textAnchor="middle"
                fill={step === i ? "#fff" : "#5c2810"}
                fontSize="16"
                fontWeight="700"
              >
                {i + 1}
              </text>
            </g>
          ))}

          {step === 0 && (
            <g>
              {/* Raw Hide Sheet & Magnified Loose Collagen */}
              <rect x="48" y="78" width="250" height="162" rx="18" fill="#f3e5d0" stroke="#8b5a2b" strokeWidth="3" />
              <text x="173" y="108" textAnchor="middle" fill="#603813" fontSize="18" fontWeight="700">
                Raw Uncured Hide
              </text>
              {/* Loose wavy collagen strands + water droplets */}
              <path d="M78 140 Q120 120 165 142 T260 138" fill="none" stroke="#b47b48" strokeWidth="6" strokeLinecap="round" />
              <path d="M78 175 Q125 195 170 170 T260 178" fill="none" stroke="#b47b48" strokeWidth="6" strokeLinecap="round" />
              <path d="M78 210 Q130 190 175 212 T260 205" fill="none" stroke="#b47b48" strokeWidth="6" strokeLinecap="round" />
              {[110, 190, 235, 145].map((wx, idx) => (
                <circle key={idx} cx={wx} cy={152 + (idx % 2) * 32} r="9" fill="#38bdf8" className="anim-pulse-glow" />
              ))}
              {/* Right Panel Explanation */}
              <rect x="335" y="78" width="295" height="162" rx="18" fill="#fffdf9" stroke="#cbd5e1" strokeWidth="2" />
              <text x="358" y="114" fill="#0f172a" fontSize="18" fontWeight="700">
                Microscope View:
              </text>
              <circle cx="368" cy="148" r="8" fill="#b47b48" />
              <text x="386" y="154" fill="#334155" fontSize="18">
                Collagen protein ropes
              </text>
              <circle cx="368" cy="184" r="8" fill="#38bdf8" />
              <text x="386" y="190" fill="#334155" fontSize="18">
                Trapped water (rots if untreated)
              </text>
              <text x="358" y="224" fill="#9a3412" fontSize="18" fontWeight="600">
                Dries into stiff rawhide board!
              </text>
            </g>
          )}

          {step === 1 && (
            <g>
              {/* Spinning Wooden Tannery Drum */}
              <g className="anim-drum-spin">
                <circle cx="340" cy="155" r="86" fill="#d97706" stroke="#78350f" strokeWidth="7" />
                <circle cx="340" cy="155" r="68" fill="#fef3c7" stroke="#92400e" strokeWidth="4" />
                {/* Paddles inside the drum */}
                <line x1="340" y1="87" x2="340" y2="112" stroke="#78350f" strokeWidth="6" />
                <line x1="340" y1="198" x2="340" y2="223" stroke="#78350f" strokeWidth="6" />
                <line x1="272" y1="155" x2="297" y2="155" stroke="#78350f" strokeWidth="6" />
                <line x1="383" y1="155" x2="408" y2="155" stroke="#78350f" strokeWidth="6" />
                {/* Tumbling hide ribbon */}
                <path
                  d="M300 145 C320 115, 360 185, 380 145"
                  fill="none"
                  stroke="#9a3412"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                {/* Tannin particles */}
                <circle cx="322" cy="132" r="6" fill="#15803d" />
                <circle cx="358" cy="172" r="6" fill="#15803d" />
                <circle cx="352" cy="128" r="6" fill="#15803d" />
                <circle cx="318" cy="175" r="6" fill="#15803d" />
              </g>
              {/* Stand */}
              <path d="M250 250 L285 170 M430 250 L395 170" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
              {/* Callouts Left & Right */}
              <rect x="28" y="92" width="195" height="125" rx="14" fill="#ecfdf5" stroke="#15803d" strokeWidth="2" />
              <text x="44" y="124" fill="#14532d" fontSize="18" fontWeight="700">
                Oak-Bark Tannin
              </text>
              <text x="44" y="154" fill="#166534" fontSize="17">
                Natural plant molecules
              </text>
              <text x="44" y="180" fill="#166534" fontSize="17">
                soak into the hide pores.
              </text>

              <rect x="456" y="92" width="195" height="125" rx="14" fill="#fffbeb" stroke="#b45309" strokeWidth="2" />
              <text x="472" y="124" fill="#78350f" fontSize="18" fontWeight="700">
                Rotating Drum
              </text>
              <text x="472" y="154" fill="#92400e" fontSize="17">
                Constant tumbling flexes
              </text>
              <text x="472" y="180" fill="#92400e" fontSize="17">
                fibers so tannins reach all!
              </text>
            </g>
          )}

          {step === 2 && (
            <g>
              <rect x="44" y="74" width="592" height="174" rx="18" fill="#fffdf9" stroke="#78350f" strokeWidth="3" />
              <text x="340" y="106" textAnchor="middle" fill="#78350f" fontSize="19" fontWeight="700">
                {tannedView
                  ? "Tanned Leather: Tannin Bridges Lock & Cushion Collagen Ropes"
                  : "Untanned Rawhide: Fibers Stick & Collapse Together When Dry"}
              </text>
              {tannedView ? (
                <g>
                  {/* 3 spaced flexible collagen ropes with green tannin cross-link rungs */}
                  <path d="M90 140 Q215 122 340 140 T590 140" fill="none" stroke="#9a3412" strokeWidth="9" strokeLinecap="round" />
                  <path d="M90 180 Q215 162 340 180 T590 180" fill="none" stroke="#9a3412" strokeWidth="9" strokeLinecap="round" />
                  <path d="M90 220 Q215 202 340 220 T590 220" fill="none" stroke="#9a3412" strokeWidth="9" strokeLinecap="round" />
                  {[140, 220, 300, 380, 460, 540].map((x) => (
                    <g key={x}>
                      <line x1={x} y1="138" x2={x} y2="180" stroke="#15803d" strokeWidth="5" />
                      <line x1={x + 25} y1="180" x2={x + 25} y2="220" stroke="#15803d" strokeWidth="5" />
                      <circle cx={x} cy="159" r="6" fill="#22c55e" />
                      <circle cx={x + 25} cy="200" r="6" fill="#22c55e" />
                    </g>
                  ))}
                </g>
              ) : (
                <g>
                  {/* Clumped stiff fibers */}
                  <line x1="90" y1="168" x2="590" y2="168" stroke="#a16207" strokeWidth="12" />
                  <line x1="90" y1="182" x2="590" y2="182" stroke="#854d0e" strokeWidth="12" />
                  <line x1="90" y1="196" x2="590" y2="196" stroke="#713f12" strokeWidth="12" />
                  <text x="340" y="232" textAnchor="middle" fill="#b91c1c" fontSize="18" fontWeight="600">
                    No tannin bridges → fibers glue together into a rigid board!
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Tanning process steps">
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={step === i}
            onClick={() => setStep(i as 0 | 1 | 2)}
          >
            {s.label}
          </button>
        ))}
        {step === 2 && (
          <button
            type="button"
            className="enrichment-action-btn"
            aria-pressed={!tannedView}
            onClick={() => setTannedView(!tannedView)}
          >
            {tannedView ? "Compare Untanned Rawhide" : "Show Tanned Cross-Links"}
          </button>
        )}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{steps[step].title}</strong>
        <p data-narration-text>{steps[step].text}</p>
      </div>
    </div>
  );
}

function HideLayersExplorer() {
  const [layer, setLayer] = useState<0 | 1 | 2>(0);
  const [pullTest, setPullTest] = useState(false);

  const layers = [
    {
      name: "1. Full-Grain Top Layer",
      title: "Full-Grain Leather (The Pro Glove Armor)",
      desc: "The outermost layer right below the hair. Its collagen fibers are woven super tightly in every direction. It keeps natural breathing pores, resists tearing under 90-mph baseball impacts, and develops a rich shine called patina over time.",
    },
    {
      name: "2. The Splitting Blade",
      title: "Slicing the Hide Horizontally",
      desc: "Because cattle hide is too thick (up to 10 mm!) for a comfortable glove or shoe, a razor-sharp horizontal band knife slices the hide into a tough top layer (full-grain) and a softer bottom layer (the split).",
    },
    {
      name: "3. Bottom Split (Suede)",
      title: "Split Leather / Suede (Fuzzy & Soft)",
      desc: "The lower layer underneath the cut has looser, horizontal fibers with a fuzzy nap on both sides—that's suede! It feels soft right away, but stretches out and tears much more easily than full-grain leather.",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🔬 Cross-Section Explorer · Full-Grain vs. Suede</span>
        <span className="enrichment-visual-hint">Tap a layer or run the Pull Test</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 270" role="img" aria-label={layers[layer].title}>
          <rect x="0" y="0" width="680" height="270" fill="#f8fafc" />
          {/* Top Full-Grain Layer */}
          <g transform={pullTest ? "scale(1.02, 1) translate(-6, 0)" : undefined}>
            <rect
              x="70"
              y="32"
              width="540"
              height="84"
              rx="12"
              fill={layer === 0 ? "#b45309" : "#d97706"}
              stroke="#78350f"
              strokeWidth="4"
            />
            {/* Tightly woven crisscross fiber mesh */}
            <path
              d="M90 55 L590 55 M90 78 L590 78 M90 98 L590 98 M130 36 L150 112 M210 36 L190 112 M290 36 L310 112 M370 36 L350 112 M450 36 L470 112 M530 36 L510 112"
              stroke="#fef3c7"
              strokeWidth="3"
              opacity="0.65"
            />
            <text x="340" y="80" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="700">
              FULL-GRAIN LAYER (Tight Interlocking Fiber Weave)
            </text>
          </g>

          {/* Horizontal Band-Knife Splitter */}
          <g>
            <line
              x1="35"
              y1="136"
              x2="645"
              y2="136"
              stroke={layer === 1 ? "#dc2626" : "#475569"}
              strokeWidth="5"
              strokeDasharray="12 6"
            />
            <rect x="245" y="121" width="190" height="30" rx="8" fill={layer === 1 ? "#dc2626" : "#334155"} />
            <text x="340" y="142" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700">
              ✂️ Splitting Band Knife
            </text>
          </g>

          {/* Bottom Split / Suede Layer */}
          <g transform={pullTest ? "scale(1.08, 0.92) translate(-26, 14)" : undefined}>
            <rect
              x="70"
              y="158"
              width="540"
              height="82"
              rx="12"
              fill={layer === 2 ? "#d97706" : "#f59e0b"}
              stroke="#92400e"
              strokeWidth="3"
              strokeDasharray="6 4"
            />
            <path
              d="M95 182 Q150 172 210 185 M260 212 Q340 200 410 215 M460 182 Q520 195 580 180"
              stroke="#78350f"
              strokeWidth="3"
              fill="none"
            />
            <text x="340" y="205" textAnchor="middle" fill="#451a03" fontSize="20" fontWeight="700">
              BOTTOM SPLIT / SUEDE (Looser, Fuzzy Fibers)
            </text>
          </g>

          {pullTest && (
            <g>
              <text x="340" y="22" textAnchor="middle" fill="#b91c1c" fontSize="18" fontWeight="700">
                ⬅️ 90-MPH IMPACT TENSION TEST: Full-Grain holds firm; Split stretches! ➡️
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Hide layers">
        {layers.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={layer === i}
            onClick={() => setLayer(i as 0 | 1 | 2)}
          >
            {item.name}
          </button>
        ))}
        <button
          type="button"
          className="enrichment-action-btn"
          aria-pressed={pullTest}
          onClick={() => setPullTest(!pullTest)}
        >
          {pullTest ? "Reset Tension Test" : "Run 90-mph Pull Test"}
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{layers[layer].title}</strong>
        <p data-narration-text>{layers[layer].desc}</p>
      </div>
    </div>
  );
}

function GloveAnatomyLab() {
  const [selected, setSelected] = useState(0);
  const [catchBall, setCatchBall] = useState(false);

  const parts = [
    {
      name: "1. The Web",
      title: "The Web (Shock-Absorbing Net)",
      desc: "Bridges the gap between the thumb and index finger. It traps fast-moving balls and flexes backward so the ball doesn't bounce out.",
    },
    {
      name: "2. The Pocket",
      title: "The Deep Pocket (Impact Cradle)",
      desc: "Positioned right below the web where the full-grain steerhide is pounded into a bowl shape. Catching here stings least and secures the ball.",
    },
    {
      name: "3. Rawhide Laces",
      title: "Rawhide Lacing (Structural Tension Cables)",
      desc: "While the glove shell is soft tanned leather, the laces are stiff untanned rawhide! When a ball hits the web, the laces spread the force across the whole glove so no single stitch rips.",
    },
    {
      name: "4. Heel & Palm Pad",
      title: "Heel & Palm Padding (Hand Armor)",
      desc: "Layered felt and leather at the base of the glove that cushions your palm bones and forms the hinge where your thumb and pinky close together.",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">⚾ Pro Glove Engineering Blueprint</span>
        <span className="enrichment-visual-hint">Tap glove parts or test a fastball catch</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 290" role="img" aria-label={parts[selected].title}>
          <rect x="0" y="0" width="680" height="290" fill="#f1f5f9" />
          {/* Left Blueprint Illustration of Baseball Glove */}
          <g transform="translate(45, 18)">
            {/* Glove outer silhouette */}
            <path
              d="M95 235 C40 215, 25 140, 48 85 C62 55, 88 62, 95 105 C102 52, 128 24, 152 28 C168 30, 174 62, 168 95 C180 42, 206 18, 228 24 C245 30, 244 70, 234 102 C250 55, 276 38, 294 48 C310 58, 302 105, 286 142 C305 100, 328 92, 340 106 C352 120, 332 195, 290 232 C245 262, 145 260, 95 235 Z"
              fill="#b45309"
              stroke="#451a03"
              strokeWidth="4"
            />
            {/* 1. The Web (between thumb and index) */}
            <g onClick={() => setSelected(0)} style={{ cursor: "pointer" }}>
              <path
                d="M72 82 L144 48 L152 124 L92 135 Z"
                fill={selected === 0 ? "#fbbf24" : "#92400e"}
                stroke="#451a03"
                strokeWidth="3"
              />
              <line x1="82" y1="106" x2="148" y2="84" stroke="#fef3c7" strokeWidth="4" />
              <line x1="108" y1="66" x2="122" y2="128" stroke="#fef3c7" strokeWidth="4" />
            </g>

            {/* 2. The Pocket */}
            <g onClick={() => setSelected(1)} style={{ cursor: "pointer" }}>
              <ellipse
                cx="168"
                cy="152"
                rx="54"
                ry="38"
                fill={selected === 1 ? "#fde047" : "#78350f"}
                stroke="#451a03"
                strokeWidth="3"
              />
              <text x="168" y="157" textAnchor="middle" fill={selected === 1 ? "#451a03" : "#fde68a"} fontSize="15" fontWeight="700">
                POCKET
              </text>
            </g>

            {/* 3. Rawhide Laces */}
            <g onClick={() => setSelected(2)} style={{ cursor: "pointer" }}>
              {[
                [148, 34, 198, 30],
                [224, 30, 272, 46],
                [288, 56, 326, 100],
                [75, 86, 142, 48],
              ].map(([x1, y1, x2, y2], idx) => (
                <line
                  key={idx}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={selected === 2 || catchBall ? "#38bdf8" : "#fef3c7"}
                  strokeWidth={selected === 2 || catchBall ? "6" : "4"}
                  strokeDasharray="6 4"
                />
              ))}
            </g>

            {/* 4. Heel & Palm Pad */}
            <g onClick={() => setSelected(3)} style={{ cursor: "pointer" }}>
              <path
                d="M102 205 Q185 232 272 204 Q252 246 185 248 Q122 246 102 205 Z"
                fill={selected === 3 ? "#fbbf24" : "#d97706"}
                stroke="#451a03"
                strokeWidth="3"
              />
              <text x="186" y="234" textAnchor="middle" fill="#451a03" fontSize="14" fontWeight="700">
                HEEL HINGE PAD
              </text>
            </g>

            {/* Animated Baseball Catch & Shockwave */}
            {catchBall && (
              <g className="anim-ball-flight">
                <circle cx="168" cy="145" r="46" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />
                <circle cx="168" cy="145" r="24" fill="#ffffff" stroke="#b91c1c" strokeWidth="3" />
                <path d="M152 132 Q168 145 152 158 M184 132 Q168 145 184 158" fill="none" stroke="#dc2626" strokeWidth="2.5" />
              </g>
            )}
          </g>

          {/* Right Info Blueprint Card */}
          <rect x="415" y="28" width="238" height="232" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <text x="435" y="64" fill="#0f172a" fontSize="18" fontWeight="700">
            Inside-Out Secret:
          </text>
          <text x="435" y="94" fill="#334155" fontSize="16">
            30+ die-cut leather pieces
          </text>
          <text x="435" y="118" fill="#334155" fontSize="16">
            are sewn together inside-out,
          </text>
          <text x="435" y="142" fill="#334155" fontSize="16">
            steamed soft, then flipped
          </text>
          <text x="435" y="166" fill="#334155" fontSize="16">
            right-side-out before lacing!
          </text>
          <rect x="435" y="186" width="198" height="54" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="534" y="210" textAnchor="middle" fill="#1d4ed8" fontSize="15" fontWeight="700">
            {catchBall ? "⚡ Laces share the shock!" : "Tap Fastball Test below"}
          </text>
          <text x="534" y="230" textAnchor="middle" fill="#1e40af" fontSize="14">
            {catchBall ? "Pocket traps the spin" : "to trace impact tension"}
          </text>
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Glove parts">
        {parts.map((p, i) => (
          <button
            key={p.name}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            {p.name}
          </button>
        ))}
        <button
          type="button"
          className="enrichment-action-btn"
          aria-pressed={catchBall}
          onClick={() => setCatchBall(!catchBall)}
        >
          {catchBall ? "Reset Ball" : "⚾ Throw 85-mph Fastball!"}
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{parts[selected].title}</strong>
        <p data-narration-text>{parts[selected].desc}</p>
      </div>
    </div>
  );
}

function GloveBreakinSimulator() {
  const [method, setMethod] = useState<0 | 1 | 2>(0);

  const methods = [
    {
      label: "🔨 Mallet + Light Balm (Pro Way)",
      title: "Method 1: Wooden Mallet & Light Conditioner",
      desc: "Pounding the pocket and heel hinges with a rounded wooden mallet loosens the collagen cross-links only where the glove needs to fold, while keeping the fingers supportive. A tiny drop of lanolin or balm replaces natural oils without clogging pores.",
      flex: 92,
      strength: 98,
      weight: "Light & Crisp (100%)",
      color: "#16a34a",
    },
    {
      label: "🪣 Soak in a Water Bucket",
      title: "Method 2: Dunking the Glove in Water",
      desc: "Water floods the microscopic spaces between collagen fibers. As it evaporates, it pulls natural oils out with it—leaving the leather heavy at first, then stiff, stretched-out, and floppy once dry.",
      flex: 60,
      strength: 52,
      weight: "Waterlogged → Floppy",
      color: "#d97706",
    },
    {
      label: "🔥 Bake in a Hot Oven",
      title: "Method 3: Heating the Glove in an Oven",
      desc: "High heat is the worst enemy of leather! Heat permanently shrinks and 'cooks' collagen protein chains, turning tough full-grain steerhide brittle so the laces and palm crack under impact.",
      flex: 25,
      strength: 20,
      weight: "Cooked & Brittle!",
      color: "#dc2626",
    },
  ];

  const current = methods[method];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🧪 Break-In Lab · Training Collagen Fibers</span>
        <span className="enrichment-visual-hint">Compare how each break-in method changes the leather</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 230" role="img" aria-label={current.title}>
          <rect x="0" y="0" width="680" height="230" fill="#0f172a" />
          {/* Left: Glove Pocket Hinge Schematic */}
          <rect x="24" y="20" width="300" height="190" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <text x="174" y="48" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="700">
            Pocket Hinge Cross-Section
          </text>
          {method === 0 && (
            <g>
              <path
                d="M60 155 Q174 88 288 155"
                fill="none"
                stroke="#22c55e"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="174" cy="108" r="22" fill="#f8fafc" stroke="#ef4444" strokeWidth="3" />
              <text x="174" y="190" textAnchor="middle" fill="#86efac" fontSize="16" fontWeight="600">
                Crisp Bowl Pocket · Hinges Flex Cleanly
              </text>
            </g>
          )}
          {method === 1 && (
            <g>
              <path
                d="M55 162 C110 185, 230 185, 292 162"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="130" cy="135" r="7" fill="#38bdf8" />
              <circle cx="175" cy="142" r="7" fill="#38bdf8" />
              <circle cx="218" cy="135" r="7" fill="#38bdf8" />
              <text x="174" y="194" textAnchor="middle" fill="#fde68a" fontSize="16" fontWeight="600">
                Waterlogged → Stretches Flat & Floppy
              </text>
            </g>
          )}
          {method === 2 && (
            <g>
              <path
                d="M65 150 L138 132 L174 156 L214 130 L282 150"
                fill="none"
                stroke="#ef4444"
                strokeWidth="10"
                strokeLinejoin="bevel"
              />
              <line x1="138" y1="120" x2="145" y2="148" stroke="#fca5a5" strokeWidth="3" />
              <line x1="214" y1="118" x2="208" y2="146" stroke="#fca5a5" strokeWidth="3" />
              <text x="174" y="194" textAnchor="middle" fill="#fca5a5" fontSize="16" fontWeight="600">
                Shrunken & Cracked Under Heat!
              </text>
            </g>
          )}

          {/* Right: Microscopic Collagen Fiber Weave */}
          <rect x="348" y="20" width="308" height="190" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <text x="502" y="48" textAnchor="middle" fill="#f8fafc" fontSize="17" fontWeight="700">
            Microscopic Collagen Matrix (200x)
          </text>
          {method === 0 && (
            <g>
              <path d="M380 95 Q440 80 502 95 T624 95" fill="none" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
              <path d="M380 135 Q440 120 502 135 T624 135" fill="none" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
              {[415, 475, 535, 590].map((x) => (
                <line key={x} x1={x} y1="92" x2={x} y2="138" stroke="#22c55e" strokeWidth="4" />
              ))}
              <text x="502" y="188" textAnchor="middle" fill="#86efac" fontSize="15" fontWeight="600">
                Cross-links intact + lubricated with balm
              </text>
            </g>
          )}
          {method === 1 && (
            <g>
              <path d="M380 90 Q440 115 502 88 T624 105" fill="none" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
              <path d="M380 145 Q440 165 502 140 T624 152" fill="none" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
              <text x="502" y="188" textAnchor="middle" fill="#fde68a" fontSize="15" fontWeight="600">
                Water strips natural oils as it evaporates
              </text>
            </g>
          )}
          {method === 2 && (
            <g>
              <line x1="385" y1="100" x2="485" y2="100" stroke="#dc2626" strokeWidth="8" />
              <line x1="515" y1="100" x2="618" y2="100" stroke="#dc2626" strokeWidth="8" />
              <line x1="385" y1="138" x2="495" y2="138" stroke="#dc2626" strokeWidth="8" />
              <line x1="525" y1="138" x2="618" y2="138" stroke="#dc2626" strokeWidth="8" />
              <text x="502" y="188" textAnchor="middle" fill="#fca5a5" fontSize="15" fontWeight="600">
                Denatured protein fibers snap & fracture
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Break-in methods">
        {methods.map((m, i) => (
          <button
            key={m.label}
            type="button"
            aria-pressed={method === i}
            onClick={() => setMethod(i as 0 | 1 | 2)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{current.title}</strong>
        <p data-narration-text>{current.desc}</p>
        <div className="enrichment-meters">
          <div className="enrichment-meter-card">
            <span>Pocket Shape & Memory: {current.flex}%</span>
            <div className="enrichment-meter-bar">
              <div
                className="enrichment-meter-fill"
                style={{ width: `${current.flex}%`, background: current.color }}
              />
            </div>
          </div>
          <div className="enrichment-meter-card">
            <span>Collagen Fiber Strength: {current.strength}%</span>
            <div className="enrichment-meter-bar">
              <div
                className="enrichment-meter-fill"
                style={{ width: `${current.strength}%`, background: current.color }}
              />
            </div>
          </div>
          <div className="enrichment-meter-card">
            <span>Resulting Feel</span>
            <strong style={{ color: current.color, fontSize: "18px" }}>{current.weight}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function BaseballSeamWindtunnel() {
  const [mode, setMode] = useState<"pattern" | "wind">("pattern");

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🌬️ 108 Stitches & Aerodynamics Lab</span>
        <span className="enrichment-visual-hint">Switch between the 2D Leather Pattern and the Wind Tunnel</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 260" role="img" aria-label="Baseball leather cover and wind tunnel">
          <rect x="0" y="0" width="680" height="260" fill="#0f172a" />
          {mode === "pattern" ? (
            <g>
              {/* Two Figure-8 Saddle Panels + Assembled Ball */}
              <path
                d="M75 75 C115 45, 165 45, 195 75 C175 110, 175 150, 195 185 C165 215, 115 215, 75 185 C95 150, 95 110, 75 75 Z"
                fill="#f8fafc"
                stroke="#ef4444"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
              <path
                d="M235 75 C275 45, 325 45, 355 75 C335 110, 335 150, 355 185 C325 215, 275 215, 235 185 C255 150, 255 110, 235 75 Z"
                fill="#f8fafc"
                stroke="#ef4444"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
              <text x="215" y="138" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="700">
                +
              </text>
              <text x="415" y="138" textAnchor="middle" fill="#fbbf24" fontSize="28" fontWeight="700">
                =
              </text>
              <circle cx="535" cy="130" r="72" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="4" />
              <path
                d="M485 78 Q535 130 485 182 M585 78 Q535 130 585 182"
                fill="none"
                stroke="#dc2626"
                strokeWidth="5"
                strokeDasharray="8 5"
              />
              <text x="215" y="240" textAnchor="middle" fill="#e2e8f0" fontSize="18">
                Two flat figure-8 alum-tanned cowhide panels
              </text>
              <text x="535" y="240" textAnchor="middle" fill="#fca5a5" fontSize="18" fontWeight="700">
                108 raised red double-stitches
              </text>
            </g>
          ) : (
            <g>
              {/* Wind Tunnel Streamlines + Spinning Baseball */}
              <path
                d="M40 70 Q240 70 330 60 T620 95"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                className="anim-wind-stream"
              />
              <path
                d="M40 130 Q210 130 270 100 M270 160 Q380 205 620 215"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                className="anim-wind-stream"
              />
              <path
                d="M40 190 Q240 190 340 205 T620 235"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                className="anim-wind-stream"
              />
              <g className="anim-drum-spin">
                <circle cx="340" cy="145" r="58" fill="#ffffff" stroke="#e2e8f0" strokeWidth="4" />
                <path
                  d="M300 105 Q340 145 300 185 M380 105 Q340 145 380 185"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="5"
                  strokeDasharray="7 4"
                />
              </g>
              {/* Downward Magnus Force Arrow */}
              <line x1="455" y1="105" x2="455" y2="195" stroke="#fbbf24" strokeWidth="6" />
              <polygon points="443,188 467,188 455,212" fill="#fbbf24" />
              <text x="555" y="150" textAnchor="middle" fill="#fbbf24" fontSize="18" fontWeight="700">
                Seam Drag + Spin
              </text>
              <text x="555" y="176" textAnchor="middle" fill="#fde68a" fontSize="17">
                pushes curveball down!
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Baseball lab mode">
        <button
          type="button"
          aria-pressed={mode === "pattern"}
          onClick={() => setMode("pattern")}
        >
          1. Two Figure-Eight Leather Panels
        </button>
        <button
          type="button"
          aria-pressed={mode === "wind"}
          onClick={() => setMode("wind")}
        >
          2. Spin in the Wind Tunnel (Magnus Force)
        </button>
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>
          {mode === "pattern"
            ? "How Two Flat Leather Pieces Wrap a Sphere"
            : "Why a Smooth Ball Wouldn't Curve the Same Way"}
        </strong>
        <p data-narration-text>
          {mode === "pattern"
            ? "A baseball cover isn't stretched from one sheet—it's cut into two figure-eight panels of white alum-tanned leather, dampened so they stretch snugly around the core, and hand-sewn with 88 inches of waxed red thread into exactly 108 double stitches."
            : "As the ball spins through the air, those 108 raised red leather seams catch a thin boundary layer of air. With topspin, the seams whip air downward behind the ball, creating a pressure difference (the Magnus effect) that makes a curveball dive right before the plate!"}
        </p>
      </div>
    </div>
  );
}

function TeivahBlueprintExplorer() {
  const [deck, setDeck] = useState<0 | 1 | 2 | 3>(0);

  const decks = [
    {
      label: "Deck 3: People & Tzohar",
      title: "Top Deck: Noach's Family & The Glowing Tzohar",
      desc: "Chazal (quoted by Rashi on Bereishis 6:16) teach that the top level housed Noach and his family. Above them shone the Tzohar—either a skylight window or a radiant precious stone that glowed so they could tell day from night even when storm clouds covered the sky.",
    },
    {
      label: "Deck 2: The Animals",
      title: "Middle Deck: Quarters for Every Species",
      desc: "The middle deck sheltered the animals and birds, along with the food stored for each species. Noach and his sons worked around the clock feeding each creature at its exact natural feeding time—an extraordinary masterclass in Chessed!",
    },
    {
      label: "Deck 1: Storage & Hull",
      title: "Bottom Deck: Ballast & Storage",
      desc: "The lowest deck kept waste and heavy storage low in the hull, helping the massive 300-amah-long wooden vessel stay balanced and upright in turbulent floodwaters.",
    },
    {
      label: "Kofer Pitch & 120 Years",
      title: "Sealed with Kofer (Pitch) Inside & Out",
      desc: "Hashem commanded Noach to coat the gopher-wood beams with Kofer (waterproof pitch/tar) both inside and outside. And why did Hashem have Noach spend 120 years planting cedars and building slowly? So people would ask what he was building and have every chance to do Teshuvah!",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">📜 Parshat Noach · 3-Deck Teivah Blueprint</span>
        <span className="enrichment-visual-hint">Tap each deck of the Teivah (300 × 50 × 30 Amos)</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 270" role="img" aria-label={decks[deck].title}>
          <rect x="0" y="0" width="680" height="270" fill="#1e293b" />
          {/* Waves at bottom */}
          <path d="M0 225 Q85 205 170 225 T340 225 T510 225 T680 225 L680 270 L0 270 Z" fill="#0284c7" />
          {/* Sloped Roof (1 Amah peak) + Glowing Tzohar */}
          <polygon points="110,68 340,24 570,68" fill="#78350f" stroke="#fbbf24" strokeWidth="3" />
          <circle cx="340" cy="46" r="14" fill="#fde047" className="anim-pulse-glow" />
          <text x="385" y="48" fill="#fef08a" fontSize="16" fontWeight="700">
            ✨ Tzohar Light
          </text>

          {/* Outer Kofer Pitch Hull Border */}
          <rect
            x="110"
            y="68"
            width="460"
            height="156"
            rx="10"
            fill="#451a03"
            stroke={deck === 3 ? "#38bdf8" : "#d97706"}
            strokeWidth={deck === 3 ? "6" : "4"}
          />

          {/* Deck 3 (Top) */}
          <rect
            x="122"
            y="76"
            width="436"
            height="44"
            rx="6"
            fill={deck === 0 ? "#fef3c7" : "#92400e"}
            onClick={() => setDeck(0)}
            style={{ cursor: "pointer" }}
          />
          <text
            x="340"
            y="104"
            textAnchor="middle"
            fill={deck === 0 ? "#451a03" : "#fde68a"}
            fontSize="18"
            fontWeight="700"
          >
            TOP DECK (3): Humans & Glowing Tzohar
          </text>

          {/* Deck 2 (Middle) */}
          <rect
            x="122"
            y="126"
            width="436"
            height="44"
            rx="6"
            fill={deck === 1 ? "#fef3c7" : "#78350f"}
            onClick={() => setDeck(1)}
            style={{ cursor: "pointer" }}
          />
          <text
            x="340"
            y="154"
            textAnchor="middle"
            fill={deck === 1 ? "#451a03" : "#fde68a"}
            fontSize="18"
            fontWeight="700"
          >
            MIDDLE DECK (2): Animals, Birds & Food Stores
          </text>

          {/* Deck 1 (Bottom) */}
          <rect
            x="122"
            y="176"
            width="436"
            height="40"
            rx="6"
            fill={deck === 2 ? "#fef3c7" : "#5c2810"}
            onClick={() => setDeck(2)}
            style={{ cursor: "pointer" }}
          />
          <text
            x="340"
            y="202"
            textAnchor="middle"
            fill={deck === 2 ? "#451a03" : "#fde68a"}
            fontSize="18"
            fontWeight="700"
          >
            BOTTOM DECK (1): Storage & Ballast
          </text>
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Teivah decks">
        {decks.map((d, i) => (
          <button
            key={d.label}
            type="button"
            aria-pressed={deck === i}
            onClick={() => setDeck(i as 0 | 1 | 2 | 3)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{decks[deck].title}</strong>
        <p data-narration-text>{decks[deck].desc}</p>
      </div>
    </div>
  );
}

function SalanterStorybook() {
  const [scene, setScene] = useState<0 | 1 | 2>(0);

  const scenes = [
    {
      label: "Scene 1: Late Night in Vilna",
      title: "A Flickering Light in the Cobbler's Window",
      desc: "On a freezing winter night in 19th-century Vilna, Rav Yisroel Salanter walked home past dark, silent houses. Suddenly, one tiny basement window glowed: inside sat a shoemaker hammering leather soles by a melting stub of candle wax.",
    },
    {
      label: "Scene 2: The Shoemaker's Answer",
      title: "“As Long as the Candle Is Burning…”",
      desc: "Rav Yisroel knocked and asked, 'Why are you still working? Your candle is almost out!' The cobbler smiled and answered in Yiddish: 'As long as the candle is still burning, it is still possible to mend and repair!'",
    },
    {
      label: "Scene 3: The Mussar Lesson",
      title: "Fixing Our Middos & Caring for Others",
      desc: "Rav Yisroel repeated the cobbler's words with awe: as long as the candle of our neshama shines, it is never too late to improve our middos (character)! He also taught that 'another person's physical needs are my spiritual responsibility.'",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🕯️ Gadol Storyboard · Rav Yisroel Salanter</span>
        <span className="enrichment-visual-hint">Step through the 3 scenes of the story</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 250" role="img" aria-label={scenes[scene].title}>
          <rect x="0" y="0" width="680" height="250" fill="#1e1b4b" />
          {/* Stars */}
          <circle cx="80" cy="40" r="3" fill="#fef08a" />
          <circle cx="580" cy="35" r="3" fill="#fef08a" />
          <circle cx="490" cy="65" r="2.5" fill="#fef08a" />
          {/* Warm Cobbler Window */}
          <rect x="120" y="42" width="210" height="165" rx="14" fill="#451a03" stroke="#d97706" strokeWidth="5" />
          <rect x="134" y="56" width="182" height="137" rx="8" fill="#fef3c7" />
          {/* Candle on workbench */}
          <rect x="198" y="152" width="24" height="32" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <path
            d="M210 120 C222 136, 220 150, 210 152 C200 150, 198 136, 210 120 Z"
            fill="#f59e0b"
            className="anim-candle-flame"
          />
          <circle cx="210" cy="138" r="32" fill="#fde047" opacity="0.3" className="anim-pulse-glow" />
          {/* Leather Boot on Workbench */}
          <path d="M250 140 L272 140 L275 168 L296 172 L296 184 L248 184 Z" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />

          {/* Right Quote Banner */}
          <rect x="365" y="48" width="275" height="154" rx="16" fill="#312e81" stroke="#818cf8" strokeWidth="3" />
          <text x="502" y="92" textAnchor="middle" fill="#fde047" fontSize="19" fontWeight="700">
            {scene === 0
              ? "Midnight in Vilna"
              : scene === 1
                ? "“While the candle burns,"
                : "Mussar in Action:"}
          </text>
          <text x="502" y="124" textAnchor="middle" fill="#e0e7ff" fontSize="18">
            {scene === 0
              ? "One shoemaker's window"
              : scene === 1
                ? "we can still mend"
                : "Mend our own middos &"}
          </text>
          <text x="502" y="154" textAnchor="middle" fill="#e0e7ff" fontSize="18">
            {scene === 0
              ? "still glows with work."
              : scene === 1
                ? "and repair!”"
                : "guard others' dignity."}
          </text>
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Story scenes">
        {scenes.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={scene === i}
            onClick={() => setScene(i as 0 | 1 | 2)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{scenes[scene].title}</strong>
        <p data-narration-text>{scenes[scene].desc}</p>
      </div>
    </div>
  );
}

function ShabbosBorerLab() {
  const [scenario, setScenario] = useState<0 | 1 | 2>(0);

  const scenarios = [
    {
      label: "Case 1: Take Almonds Now",
      title: "Taking the Almonds You Want to Eat Right Now",
      ochel: true,
      yad: true,
      miyad: true,
      verdict: "✅ Permitted! All 3 Golden Keys of Borer (אי״ד) are met.",
      desc: "You reach into a mixed bowl of nuts and raisins with your hand (B'Yad) and pick out the almonds you want to eat (Ochel) right now (Miyad).",
    },
    {
      label: "Case 2: Remove Disliked Onions",
      title: "Picking Out the Onions You Don't Want from a Salad",
      ochel: false,
      yad: true,
      miyad: true,
      verdict: "❌ Forbidden (Borer)! Taking the unwanted item (Psolet) from the wanted food breaks Key #1.",
      desc: "Even if you use your hand or fork right before eating, pulling the unwanted onions out of the salad is removing Psolet from Ochel. Instead, scoop the salad pieces you DO want onto your plate!",
    },
    {
      label: "Case 3: Sort Forks for Later",
      title: "Sorting Mixed Forks & Spoons Now for a Later Meal",
      ochel: true,
      yad: true,
      miyad: false,
      verdict: "❌ Forbidden (Borer)! Sorting items in advance for later breaks Key #3 (Miyad).",
      desc: "The laws of Borer apply to non-food items like cutlery, books, and toys too! You may pick out the forks you need right before setting the table for the current meal, not hours earlier.",
    },
  ];

  const current = scenarios[scenario];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">✡️ Hilchot Shabbos · The 3 Golden Keys of Borer (אי״ד)</span>
        <span className="enrichment-visual-hint">Test each Shabbos table case against the 3 keys</span>
      </div>
      <div className="enrichment-meters" style={{ marginBottom: "16px" }}>
        <div
          className="enrichment-meter-card"
          style={{
            borderColor: current.ochel ? "#16a34a" : "#dc2626",
            background: current.ochel ? "#f0fdf4" : "#fef2f2",
          }}
        >
          <span>א · 1. Ochel (Wanted)</span>
          <strong style={{ color: current.ochel ? "#15803d" : "#b91c1c" }}>
            {current.ochel ? "✓ Takes the wanted item" : "✗ Takes the unwanted (Psolet)"}
          </strong>
        </div>
        <div
          className="enrichment-meter-card"
          style={{
            borderColor: current.yad ? "#16a34a" : "#dc2626",
            background: current.yad ? "#f0fdf4" : "#fef2f2",
          }}
        >
          <span>י · 2. B&apos;Yad (By Hand)</span>
          <strong style={{ color: current.yad ? "#15803d" : "#b91c1c" }}>
            {current.yad ? "✓ By hand / eating fork" : "✗ Uses a strainer/sorter"}
          </strong>
        </div>
        <div
          className="enrichment-meter-card"
          style={{
            borderColor: current.miyad ? "#16a34a" : "#dc2626",
            background: current.miyad ? "#f0fdf4" : "#fef2f2",
          }}
        >
          <span>ד · 3. Miyad (Right Now)</span>
          <strong style={{ color: current.miyad ? "#15803d" : "#b91c1c" }}>
            {current.miyad ? "✓ For immediate use now" : "✗ Stored for later"}
          </strong>
        </div>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Borer scenarios">
        {scenarios.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={scenario === i}
            onClick={() => setScenario(i as 0 | 1 | 2)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{current.verdict}</strong>
        <p data-narration-text>{current.desc}</p>
      </div>
    </div>
  );
}

function NoachWindowTimeline() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(2);

  const events = [
    {
      label: "1. The Raven (Orev)",
      title: "Mission 1: The Raven Circles the Teivah",
      desc: "First Noach opened the window of the Teivah and sent out the raven (Orev), which flew back and forth around the Ark until the waters dried from the earth.",
    },
    {
      label: "2. Dove's 1st Flight",
      title: "Mission 2: No Resting Place Yet",
      desc: "Next Noach sent out the dove (Yonah) to see if the waters had eased. Finding no dry resting place for the sole of its foot, the tired dove returned, and Noach stretched out his hand to bring it gently back inside.",
    },
    {
      label: "3. The Olive Leaf",
      title: "Mission 3: A Fresh Olive Leaf at Evening",
      desc: "Seven days later, Noach sent the dove again. Toward evening it returned holding a freshly plucked olive leaf (aleh zayis) in its beak! Rashi explains the dove's message: 'Better that my food be bitter as an olive from Hashem's hand than sweet as honey from flesh and blood.'",
    },
    {
      label: "4. The Rainbow (Keshes)",
      title: "Mission 4: Dry Land & The Rainbow Covenant",
      desc: "After another seven days, the dove went out and did not return—showing the earth was ready. When Noach's family stepped out, Hashem placed the rainbow (Keshes) in the clouds as an everlasting sign never again to bring a flood to destroy all life.",
    },
  ];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🕊️ Parshat Noach · From the Window of the Teivah</span>
        <span className="enrichment-visual-hint">Explore the 4 stages after the storm</span>
      </div>
      <div className="enrichment-stage-canvas">
        <svg viewBox="0 0 680 240" role="img" aria-label={events[step].title}>
          <rect x="0" y="0" width="680" height="240" fill="#e0f2fe" />
          {/* Rainbow in Step 3 */}
          {step === 3 && (
            <g>
              <path d="M120 220 A220 180 0 0 1 560 220" fill="none" stroke="#ef4444" strokeWidth="10" opacity="0.8" />
              <path d="M132 220 A208 168 0 0 1 548 220" fill="none" stroke="#f59e0b" strokeWidth="10" opacity="0.8" />
              <path d="M144 220 A196 156 0 0 1 536 220" fill="none" stroke="#22c55e" strokeWidth="10" opacity="0.8" />
              <path d="M156 220 A184 144 0 0 1 524 220" fill="none" stroke="#3b82f6" strokeWidth="10" opacity="0.8" />
            </g>
          )}
          {/* Water & Mountain Peak */}
          <polygon points="460,210 535,105 610,210" fill="#64748b" />
          {step >= 2 && (
            <g>
              <line x1="535" y1="105" x2="535" y2="75" stroke="#78350f" strokeWidth="5" />
              <circle cx="525" cy="75" r="14" fill="#16a34a" />
              <circle cx="545" cy="72" r="14" fill="#15803d" />
            </g>
          )}
          <path d="M0 195 Q110 180 220 195 T440 195 T680 195 L680 240 L0 240 Z" fill="#0284c7" />
          {/* Teivah Left Side */}
          <rect x="36" y="88" width="165" height="112" rx="10" fill="#78350f" stroke="#451a03" strokeWidth="4" />
          <rect x="145" y="108" width="36" height="36" rx="6" fill="#fef08a" stroke="#451a03" strokeWidth="3" />
          {/* Bird in flight */}
          <g transform="translate(310, 88)">
            <ellipse cx="0" cy="0" rx="34" ry="18" fill={step === 0 ? "#1e293b" : "#ffffff"} stroke="#334155" strokeWidth="3" />
            <path d="M-10 -8 L-28 -36 L12 -14 Z" fill={step === 0 ? "#334155" : "#f1f5f9"} stroke="#334155" strokeWidth="2.5" />
            <circle cx="20" cy="-4" r="3.5" fill={step === 0 ? "#fbbf24" : "#0f172a"} />
            <polygon points="32,-4 46,0 32,5" fill="#f59e0b" />
            {step === 2 && (
              <g>
                <line x1="42" y1="0" x2="66" y2="-12" stroke="#15803d" strokeWidth="3.5" />
                <ellipse cx="58" cy="-14" rx="10" ry="5" transform="rotate(-25 58 -14)" fill="#16a34a" />
                <ellipse cx="66" cy="-6" rx="9" ry="5" transform="rotate(15 66 -6)" fill="#15803d" />
              </g>
            )}
          </g>
        </svg>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Noach timeline steps">
        {events.map((e, i) => (
          <button
            key={e.label}
            type="button"
            aria-pressed={step === i}
            onClick={() => setStep(i as 0 | 1 | 2 | 3)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{events[step].title}</strong>
        <p data-narration-text>{events[step].desc}</p>
      </div>
    </div>
  );
}

function ShabbosMuktzehExplorer() {
  const [item, setItem] = useState<0 | 1 | 2>(0);

  const items = [
    {
      label: "📖 Siddur & Kiddush Cup",
      category: "Kli Shemelachto L'Heter (Permitted Utensil)",
      rule: "✅ May be moved freely for any Shabbos purpose (to use it, clear the table, or protect it from getting dirty).",
      desc: "Because a Siddur, drinking glass, or fork has a permitted normal job on Shabbos, it is not Muktzeh. You still shouldn't carry it with no purpose at all, but any normal need is completely permitted.",
    },
    {
      label: "🔨 Hammer on a Chair",
      category: "Kli Shemelachto L'Issur (Weekday Work Tool)",
      rule: "⚠️ Permitted ONLY L'tzorech Gufo (to use its body, like cracking a nut) or L'tzorech Mekomo (you need the chair it's sitting on)!",
      desc: "A hammer's main job—building—is forbidden on Shabbos. However, because it is still a usable tool (a Kli), Chazal permitted moving it if you need to use the hammer for a permitted action (like cracking a hard coconut) or if you need the space where it is lying! You may NOT move it just to protect the hammer itself.",
    },
    {
      label: "🪨 Smooth Stone / Raw Hide / Coins",
      category: "Muktzeh Machmas Gufo (Intrinsic Muktzeh)",
      rule: "❌ Strict Muktzeh! Cannot be moved even to use as a paperweight or to clear its space.",
      desc: "Rocks, coins, sticks, and untanned raw hides are not utensils (Keilim) and not food. Therefore, they are Muktzeh Machmas Gufo and may not be picked up by hand even if you want their spot or want to prop open a door.",
    },
  ];

  const current = items[item];

  return (
    <div className="enrichment-visual">
      <div className="enrichment-visual-header">
        <span className="enrichment-visual-badge">🕯️ Hilchot Shabbos · Interactive Muktzeh Inspector</span>
        <span className="enrichment-visual-hint">Tap an object on the Shabbos table to check its Halacha</span>
      </div>
      <div className="enrichment-controls" role="group" aria-label="Muktzeh objects">
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            aria-pressed={item === i}
            onClick={() => setItem(i as 0 | 1 | 2)}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="enrichment-callout" aria-live="polite">
        <strong data-narration-text>{current.category}</strong>
        <p data-narration-text style={{ fontWeight: 600, marginBottom: "8px" }}>
          {current.rule}
        </p>
        <p data-narration-text>{current.desc}</p>
      </div>
    </div>
  );
}

export function VocabQuickGame({
  terms,
}: {
  terms: { word: string; meaning: string; example: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  if (!terms.length) return null;
  const target = terms[idx % terms.length];
  const isCorrect = picked === target.word;

  return (
    <div className="vocab-mini-game" aria-label="Quick word challenge">
      <div className="vocab-mini-header">
        <h4>⚡ Quick Word Lightning Check ({idx + 1} of {terms.length})</h4>
        {picked && (
          <button
            type="button"
            onClick={() => {
              setPicked(null);
              setIdx((idx + 1) % terms.length);
            }}
          >
            Next word →
          </button>
        )}
      </div>
      <div className="vocab-mini-Clue" data-narration-text>
        <strong>Which word matches this meaning?</strong> “{target.meaning}”
      </div>
      <div className="vocab-mini-choices" role="group" aria-label="Choose matching word">
        {terms.map((t) => {
          const selected = picked === t.word;
          const stateClass = selected
            ? t.word === target.word
              ? "is-correct"
              : "is-wrong"
            : "";
          return (
            <button
              key={t.word}
              type="button"
              className={stateClass}
              aria-pressed={selected}
              onClick={() => setPicked(t.word)}
            >
              {t.word}
            </button>
          );
        })}
      </div>
      {picked && (
        <p className="vocab-mini-feedback" role="status">
          {isCorrect
            ? `Spot on! “${target.word}” in action: ${target.example}`
            : `Not quite—try another word above!`}
        </p>
      )}
    </div>
  );
}

export default function EnrichmentVisual({ kind }: { kind: DiagramKind }) {
  let lab: React.ReactNode = null;
  switch (kind) {
    case "leather-tanning-lab":
      lab = <LeatherTanningLab />;
      break;
    case "hide-layers-explorer":
      lab = <HideLayersExplorer />;
      break;
    case "glove-anatomy-lab":
      lab = <GloveAnatomyLab />;
      break;
    case "glove-breakin-simulator":
      lab = <GloveBreakinSimulator />;
      break;
    case "baseball-seam-windtunnel":
      lab = <BaseballSeamWindtunnel />;
      break;
    case "teivah-blueprint-explorer":
      lab = <TeivahBlueprintExplorer />;
      break;
    case "salanter-storybook":
      lab = <SalanterStorybook />;
      break;
    case "shabbos-borer-lab":
      lab = <ShabbosBorerLab />;
      break;
    case "noach-window-timeline":
      lab = <NoachWindowTimeline />;
      break;
    case "shabbos-muktzeh-explorer":
      lab = <ShabbosMuktzehExplorer />;
      break;
    default:
      lab = renderTobiEnrichmentLab(kind);
      if (!lab) return null;
      break;
  }

  return (
    <div className="enrichment-visual-stack">
      <RealWorldGallery kind={kind} />
      {lab}
    </div>
  );
}
