"use client";
import { useState } from "react";
import "./discovery-diagram.css";

export default function DiscoveryDiagram({
  kind,
}: {
  kind: "shadow-theatre" | "mondrian-study";
}) {
  const [nearLight, setNearLight] = useState(false);
  if (kind === "mondrian-study")
    return (
      <figure className="discovery-diagram colour-study">
        <svg
          viewBox="0 0 480 280"
          role="img"
          aria-label="An original colour study: crossing yellow paths, red and blue blocks, and open white spaces suggest a city grid."
        >
          <rect
            x="4"
            y="4"
            width="472"
            height="272"
            rx="12"
            fill="#fffef6"
            stroke="#234771"
            strokeWidth="5"
          />
          {[60, 132, 285, 400].map((x) => (
            <rect key={x} x={x} y="8" width="14" height="264" fill="#f1c42b" />
          ))}
          {[50, 133, 222].map((y) => (
            <rect key={y} x="8" y={y} width="464" height="14" fill="#f1c42b" />
          ))}
          {[
            [60, 50],
            [285, 133],
            [400, 222],
            [132, 90],
            [210, 50],
            [350, 222],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={i === 4 ? 32 : 14}
              height={i === 3 ? 28 : 14}
              fill={i % 2 ? "#234ead" : "#d84939"}
            />
          ))}
          <rect x="163" y="163" width="43" height="35" fill="#d84939" />
          <rect x="324" y="76" width="36" height="34" fill="#234ead" />
        </svg>
        <figcaption data-narration-text>
          Our colour study · inspired by Mondrian, not an original painting
        </figcaption>
      </figure>
    );
  const x = nearLight ? 210 : 335;
  const half = nearLight ? 83 : 49;
  return (
    <figure className="discovery-diagram shadow-study">
      <svg
        viewBox="0 0 520 260"
        role="img"
        aria-label={`A flashlight shines toward a screen. A puppet ${nearLight ? "near the flashlight makes a big" : "near the screen makes a small"} shadow.`}
      >
        <rect x="4" y="4" width="512" height="252" rx="20" fill="#eaf2ff" />
        <path d="M100 128 L460 30 L460 226 Z" fill="#ffe898" />
        <rect
          x="454"
          y="20"
          width="15"
          height="216"
          rx="5"
          fill="#fffdf5"
          stroke="#365986"
          strokeWidth="3"
        />
        <path
          d={`M${x} 103 L459 ${128 - half} L459 ${128 + half} L${x} 153 Z`}
          fill="#756a97"
          opacity=".28"
        />
        <rect x="38" y="111" width="61" height="35" rx="8" fill="#3356a0" />
        <path
          d="M95 107 L111 114 L111 144 L95 151 Z"
          fill="#f4c84a"
          stroke="#3356a0"
          strokeWidth="3"
        />
        <circle cx={x} cy="128" r="25" fill="#64509a" />
        <rect x={x - 4} y="151" width="8" height="52" rx="3" fill="#9b6e42" />
        <rect
          x="453"
          y={128 - half}
          width="17"
          height={half * 2}
          rx="6"
          fill="#303854"
        />
      </svg>
      <div className="discovery-part-labels">
        <span>1. Light</span>
        <span>2. Puppet</span>
        <span>3. Screen</span>
      </div>
      <div
        className="discovery-diagram-controls"
        role="group"
        aria-label="Move the puppet"
      >
        <button
          type="button"
          aria-pressed={nearLight}
          onClick={() => setNearLight(true)}
        >
          Near the light
        </button>
        <button
          type="button"
          aria-pressed={!nearLight}
          onClick={() => setNearLight(false)}
        >
          Near the screen
        </button>
      </div>
      <figcaption aria-live="polite" data-narration-text>
        {nearLight
          ? "Near the light: a bigger shadow."
          : "Near the screen: a smaller shadow."}{" "}
        Same puppet!
      </figcaption>
    </figure>
  );
}
