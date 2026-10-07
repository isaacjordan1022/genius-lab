"use client";

import { useEffect, useRef, useState } from "react";
import "./avatar-lab.css";

export type AvatarCharacter = "robot" | "comet" | "pencil";
export type AvatarMood = "idle" | "blink" | "celebrate";

const companions = {
  robot: {
    name: "Flip",
    description:
      "A ticket-machine tinkerer. Big ideas. Slightly squeaky shoes.",
    role: "The arcade companion",
    color: "#183caa",
    light: "#dbeaff",
    file: "flip-ticket-robot.svg",
  },
  comet: {
    name: "Orbit",
    description:
      "A curious little comet with an enormous appetite for questions.",
    role: "The discovery companion",
    color: "#632778",
    light: "#f8deff",
    file: "orbit-curious-comet.svg",
  },
  pencil: {
    name: "Scrib",
    description:
      "A pocket-sized explorer who always has another draft in mind.",
    role: "The creative companion",
    color: "#126347",
    light: "#dcf8b7",
    file: "scrib-pencil-explorer.svg",
  },
};

function Face({ x = 154, y = 155 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="learning-avatar__eyes" fill="currentColor">
        <rect x="-29" y="-12" width="12" height="24" rx="6" />
        <rect x="17" y="-12" width="12" height="24" rx="6" />
      </g>
      <path
        className="learning-avatar__smile"
        d="M -14 27 Q 0 41 14 27"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <g fill="currentColor" opacity=".16">
        <ellipse cx="-37" cy="22" rx="11" ry="6" />
        <ellipse cx="37" cy="22" rx="11" ry="6" />
      </g>
    </g>
  );
}

function Thumb({ x = 236, y = 161 }: { x?: number; y?: number }) {
  return (
    <>
      <g
        className="learning-avatar__resting-hand"
        transform={`translate(${x} ${y})`}
        stroke="currentColor"
        strokeWidth="5"
      >
        <rect
          x="-8"
          y="20"
          width="25"
          height="27"
          rx="11"
          fill="var(--avatar-pale)"
        />
        <path d="M 1 31 V 38" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g
        className="learning-avatar__thumb"
        transform={`translate(${x} ${y})`}
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      >
        <path
          d="M -11 42 L -11 11 C -11 3 -3 -2 1 -10 L 6 -28 C 9 -34 19 -29 18 -19 L 16 -4 L 31 -4 C 42 -4 44 4 40 11 C 44 19 38 25 38 25 C 40 33 33 38 26 39 L 9 42 Z"
          fill="var(--avatar-pale)"
        />
        <path
          d="M 20 8 L 36 8 M 20 20 L 35 20 M 20 31 L 31 31"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="-24"
          y="10"
          width="15"
          height="37"
          rx="5"
          fill="var(--avatar-bright)"
        />
      </g>
    </>
  );
}

function Robot() {
  return (
    <g stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <path
        d="M 121 240 L 116 271 L 96 271 Q 86 273 90 285 L 131 285 L 139 244 M 168 244 L 176 285 L 216 285 Q 220 273 209 271 L 190 271 L 186 240"
        fill="#a8caff"
      />
      <path
        d="M 94 193 Q 58 189 59 231 L 77 241 L 87 211 M 204 194 L 241 189"
        fill="none"
        stroke="#8cb8ff"
        strokeWidth="19"
        strokeLinecap="round"
      />
      <rect x="56" y="226" width="26" height="26" rx="10" fill="#e1eeff" />
      <path d="M 105 184 H 191 L 199 242 Q 153 257 95 242 Z" fill="#76abff" />
      <rect
        x="121"
        y="202"
        width="51"
        height="12"
        rx="5"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 130 209 H 166 V 247 L 160 243 L 154 248 L 148 243 L 142 248 L 136 243 L 130 247 Z"
        fill="#fff4be"
        strokeWidth="3"
      />
      <path
        d="M 138 222 H 158 M 138 231 H 153"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 153 90 V 63" fill="none" />
      <circle cx="153" cy="58" r="10" fill="#fff4be" />
      <rect x="75" y="130" width="21" height="44" rx="9" fill="#76abff" />
      <rect x="209" y="130" width="21" height="44" rx="9" fill="#76abff" />
      <rect x="89" y="88" width="127" height="107" rx="30" fill="#76abff" />
      <rect
        x="103"
        y="104"
        width="99"
        height="77"
        rx="23"
        fill="#e1eeff"
        strokeWidth="3"
      />
      <path
        d="M 113 96 H 165"
        stroke="#e1eeff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Face x={153} y={137} />
      <Thumb x={245} y={157} />
    </g>
  );
}

function Comet() {
  return (
    <g stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <path
        d="M 151 225 Q 213 212 242 160 Q 258 131 274 107 Q 233 120 218 147 Q 241 91 237 48 Q 216 69 190 110 Q 186 73 169 60 Q 173 106 143 132 Z"
        fill="#ed92dd"
      />
      <path
        d="M 184 155 Q 216 119 230 83"
        fill="none"
        stroke="#ffd2f3"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 113 235 L 95 258 L 113 268 L 138 237 M 164 233 L 180 258 L 198 248 L 188 221"
        fill="#ffaede"
      />
      <path
        d="M 87 188 Q 54 198 62 228"
        fill="none"
        stroke="#ffaede"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle cx="62" cy="230" r="12" fill="#f8deff" />
      <path
        d="M 192 194 L 235 190"
        stroke="#ffaede"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M 155 107 C 201 107 222 147 208 190 C 200 230 168 250 126 241 C 86 234 66 201 76 162 C 84 126 116 103 155 107 Z"
        fill="#ffaede"
      />
      <path
        d="M 94 152 C 110 127 139 121 159 124"
        fill="none"
        stroke="#ffe6f8"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="182" cy="205" r="10" fill="#ed92dd" stroke="none" />
      <circle cx="166" cy="219" r="5" fill="#ed92dd" stroke="none" />
      <Face x={140} y={163} />
      <Thumb x={244} y={158} />
      <path
        d="M 68 89 L 73 100 L 85 105 L 73 110 L 68 123 L 63 110 L 50 105 L 63 100 Z"
        fill="#fff3ba"
        strokeWidth="3"
      />
    </g>
  );
}

function Pencil() {
  return (
    <g stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <path
        d="M 128 244 L 117 277 H 90 Q 85 287 98 289 H 133 L 145 247 M 164 247 L 173 285 H 206 Q 217 280 207 273 H 188 L 184 237"
        fill="#aee99a"
      />
      <path
        d="M 107 168 Q 64 169 68 204"
        fill="none"
        stroke="#aee99a"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <circle cx="68" cy="208" r="12" fill="#e0ffc5" />
      <path
        d="M 198 161 Q 215 165 238 184"
        fill="none"
        stroke="#aee99a"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M 113 91 Q 152 59 191 91 V 211 L 152 261 L 113 211 Z"
        fill="#d3f58a"
      />
      <path
        d="M 171 91 H 191 V 211 L 152 261 L 170 205 Z"
        fill="#a8db70"
        stroke="none"
      />
      <path
        d="M 113 208 L 152 261 L 191 208 Q 178 219 170 208 Q 152 219 137 208 Q 127 217 113 208"
        fill="#ffe9c4"
      />
      <path
        d="M 140 244 L 152 261 L 166 243 Q 153 237 140 244"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M 110 82 Q 110 49 142 49 H 162 Q 194 49 194 82 V 101 H 110 Z"
        fill="#ffaeab"
      />
      <path
        d="M 121 67 Q 128 59 141 59"
        stroke="#ffe3d4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path d="M 110 89 H 194 V 114 H 110 Z" fill="#e0ffc5" />
      <path d="M 116 102 H 188" strokeWidth="3" />
      <Face x={152} y={151} />
      <Thumb x={246} y={156} />
      <path
        d="M 96 128 L 106 139 L 95 151 L 85 139 Z"
        fill="#e0ffc5"
        strokeWidth="3"
      />
    </g>
  );
}

/** Original SVG companion; mood="celebrate" reveals a positive thumbs-up pose. */
export function LearningAvatar({
  character = "robot",
  size = 320,
  mood = "idle",
}: {
  character?: AvatarCharacter;
  size?: number;
  mood?: AvatarMood;
}) {
  return (
    <svg
      className={`learning-avatar learning-avatar--${character} learning-avatar--${mood}`}
      width={size}
      height={size}
      viewBox="0 0 320 320"
      role="img"
      aria-label={`${companions[character].name}${mood === "celebrate" ? " giving a thumbs-up" : mood === "blink" ? " blinking" : " smiling"}`}
    >
      <ellipse
        cx="157"
        cy="288"
        rx="88"
        ry="12"
        fill="currentColor"
        opacity=".14"
      />
      <g className="learning-avatar__body">
        {character === "robot" ? (
          <Robot />
        ) : character === "comet" ? (
          <Comet />
        ) : (
          <Pencil />
        )}
      </g>
      <g
        className="learning-avatar__sparks"
        fill="var(--avatar-pale)"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        <path d="M 47 151 L 52 162 L 64 167 L 52 172 L 47 184 L 42 172 L 29 167 L 42 162 Z" />
        <path d="M 268 72 L 273 82 L 284 87 L 273 92 L 268 104 L 263 92 L 251 87 L 263 82 Z" />
        <path
          d="M 44 218 L 35 226 M 272 234 L 281 242 M 91 48 L 86 36"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function AvatarLab() {
  const [character, setCharacter] = useState<AvatarCharacter>("robot");
  const [mood, setMood] = useState<AvatarMood>("idle");
  const [event, setEvent] = useState(0);
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const perform = (next: AvatarMood) => {
    if (timer.current) clearTimeout(timer.current);
    setEvent((value) => value + 1);
    setMood(next);
    setStatus(
      `${companions[character].name} ${next === "blink" ? "blinked." : "gives you a thumbs-up!"}`,
    );
    timer.current = setTimeout(
      () => setMood("idle"),
      next === "blink" ? 700 : 2200,
    );
  };
  const choose = (next: AvatarCharacter) => {
    if (timer.current) clearTimeout(timer.current);
    setCharacter(next);
    setMood("idle");
    setStatus(`${companions[next].name} selected.`);
  };
  const current = companions[character];
  return (
    <section
      className="avatar-lab"
      id="avatars"
      aria-labelledby="avatar-lab-title"
    >
      <div className="avatar-lab__intro">
        <p className="avatar-lab__chapter">Companion workshop</p>
        <h2 id="avatar-lab-title">
          A little character.
          <br />A lot of personality.
        </h2>
        <p>
          Three original directions to try. Friendly enough for Ezra, with
          enough attitude for Aharon Zev.
        </p>
      </div>
      <div className="avatar-lab__workbench">
        <div className={`avatar-lab__stage avatar-lab__stage--${character}`}>
          <span className="avatar-lab__stage-sticker">Meet {current.name}</span>
          <div className="avatar-lab__portrait">
            <LearningAvatar
              key={`${character}-${event}`}
              character={character}
              size={350}
              mood={mood}
            />
          </div>
          <span className="avatar-lab__stage-caption">{current.role}</span>
        </div>
        <div className="avatar-lab__details">
          <div
            className="avatar-lab__choices"
            role="group"
            aria-label="Choose a companion"
          >
            {(Object.keys(companions) as AvatarCharacter[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={character === key}
                onClick={() => choose(key)}
              >
                <LearningAvatar character={key} size={88} />
                <span>{companions[key].name}</span>
              </button>
            ))}
          </div>
          <h3>{current.name}</h3>
          <p className="avatar-lab__description">{current.description}</p>
          <div className="avatar-lab__actions">
            <button type="button" onClick={() => perform("blink")}>
              Make {current.name} blink
            </button>
            <button type="button" onClick={() => perform("celebrate")}>
              Give a thumbs-up
            </button>
          </div>
          <p className="avatar-lab__motion-note">
            Small reactions for big moments. No bouncing while you’re trying to
            read.
          </p>
          <a
            className="avatar-lab__download"
            href={`/design/avatars/${current.file}`}
            download
          >
            Download {current.name} as SVG <span aria-hidden="true">↓</span>
          </a>
          <p className="avatar-lab__live" role="status" aria-live="polite">
            {status || "Choose a companion, then try a reaction."}
          </p>
        </div>
      </div>
      <div className="avatar-lab__notes">
        <p>
          <strong>Earned, not distracting.</strong> A thumbs-up after a chunk. A
          blink while waiting. A calm companion during a passage.
        </p>
        <p>
          <strong>Make it yours.</strong> Later, unlock a cap, glasses, or a
          colorway through learning milestones. No paid mystery boxes.
        </p>
      </div>
    </section>
  );
}
