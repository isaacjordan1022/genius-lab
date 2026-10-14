"use client";
import { useState } from "react";
const parts = [
  {
    name: "Deck",
    description:
      "The surface you travel on. It passes the load into the beams.",
  },
  {
    name: "Beams",
    description: "The long pieces carrying the deck across the gap.",
  },
  {
    name: "Supports",
    description:
      "They carry weight down into the ground. End supports are called abutments.",
  },
  {
    name: "Span",
    description:
      "The distance between two supports. A longer span is a bigger gap to cross.",
  },
];
export default function BridgeDiagram() {
  const [part, setPart] = useState(0),
    [load, setLoad] = useState(false);
  return (
    <div className="bridge-lab">
      <svg
        viewBox="0 0 680 300"
        role="img"
        aria-label={`Side-view sketch of a beam bridge. ${parts[part].name}: ${parts[part].description}`}
      >
        <defs>
          <marker
            id="bridge-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path
              d="M0 0L6 3L0 6"
              fill="none"
              stroke="#ad4c22"
              strokeWidth="1.5"
            />
          </marker>
        </defs>
        <rect x="1" y="1" width="678" height="298" rx="24" fill="#f4f7f2" />
        <path
          d="M0 259Q60 242 112 260T225 260T338 260T451 260T564 260T680 260V300H0"
          fill="#dbeef8"
        />
        <path d="M0 255H190V298H0M490 255H680V298H490" fill="#d8dfc5" />
        <g stroke="#344c67" strokeWidth="3" strokeLinejoin="round">
          <path
            d="M112 253V163H168V253ZM512 253V163H568V253Z"
            fill={part === 2 ? "#ffc45f" : "#c3d0db"}
          />
          <path
            d="M110 143H570V169H110Z"
            fill={part === 1 ? "#ffc45f" : "#9bb4cb"}
          />
          <rect
            x="84"
            y="124"
            width="512"
            height="20"
            rx="5"
            fill={part === 0 ? "#ffc45f" : "#b0c5dc"}
          />
          <path
            d="M85 100H595M90 100v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24m50-24v24"
            fill="none"
            stroke="#718c99"
          />
        </g>
        <g transform="translate(290 55)">
          <rect
            width="108"
            height="49"
            rx="10"
            fill="#dc7853"
            stroke="#7b442f"
            strokeWidth="3"
          />
          <path
            d="M72 0h25l11 25H72Z"
            fill="#e5f3fb"
            stroke="#7b442f"
            strokeWidth="3"
          />
          <circle cx="23" cy="51" r="12" fill="#334358" />
          <circle cx="85" cy="51" r="12" fill="#334358" />
        </g>
        {part === 3 && (
          <g stroke="#bd7821" strokeWidth="4">
            <path d="M168 207H512M168 193v28M512 193v28" />
            <path d="m180 199-12 8 12 8m320-16 12 8-12 8" fill="none" />
          </g>
        )}
        {load && (
          <g
            fill="none"
            stroke="#ad4c22"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#bridge-arrow)"
          >
            <path d="M343 86V152" />
            <path d="M331 157H140V242" />
            <path d="M355 157H540V242" />
          </g>
        )}
      </svg>
      <div className="bridge-parts" aria-label="Explore bridge parts">
        {parts.map((p, i) => (
          <button
            key={p.name}
            aria-pressed={part === i}
            onClick={() => setPart(i)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="bridge-explanation" aria-live="polite">
        <strong>{parts[part].name}.</strong> {parts[part].description}
      </p>
      <button onClick={() => setLoad(!load)} aria-pressed={load}>
        {load ? "Hide the weight’s path" : "Follow the weight"}
      </button>
    </div>
  );
}
