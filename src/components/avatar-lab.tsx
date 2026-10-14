"use client";

import { useEffect, useRef, useState } from "react";
import "./avatar-lab.css";

export type AvatarCharacter = "robot" | "comet" | "pencil";
export type AvatarMood =
  "idle" | "blink" | "celebrate" | "greeting" | "thinking" | "printing";

const companions = {
  robot: {
    name: "Tick",
    description:
      "Your little ticket-printing companion. Big ideas, warm cheers, and a pocket full of possibility.",
    role: "Your ticket-printing companion",
    color: "#183caa",
    light: "#dbeaff",
    file: "tick-ticket-robot.svg",
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

const tickPoses: {
  mood: AvatarMood;
  title: string;
  line: string;
  use: string;
}[] = [
  {
    mood: "idle",
    title: "Right here with you",
    line: "Ready when you are.",
    use: "The calm dashboard companion.",
  },
  {
    mood: "blink",
    title: "A tiny hello",
    line: "Yep, still listening!",
    use: "A small pause between ideas.",
  },
  {
    mood: "greeting",
    title: "Welcome back",
    line: "Got your thinking cap?",
    use: "A wave when a lesson begins.",
  },
  {
    mood: "thinking",
    title: "Let’s figure it out",
    line: "What clue could help?",
    use: "An invitation to explain or try again.",
  },
  {
    mood: "printing",
    title: "Fresh off the press",
    line: "You earned these!",
    use: "Tickets arrive after a learning milestone.",
  },
  {
    mood: "celebrate",
    title: "That’s the spirit",
    line: "Look how far you’ve come.",
    use: "A thumbs-up for thoughtful progress.",
  },
];

function RobotGesture() {
  return (
    <>
      <g className="learning-avatar__greeting-arm">
        <path
          d="M 205 203 L 232 207 Q 257 209 258 183 L 258 164"
          fill="none"
          strokeWidth="18"
        />
        <path
          d="M 205 203 L 232 207 Q 257 209 258 183 L 258 164"
          fill="none"
          stroke="#8bbcff"
          strokeWidth="10"
        />
        <circle cx="241" cy="204" r="7" fill="#c4dfff" strokeWidth="3" />
        <rect
          x="248"
          y="158"
          width="22"
          height="11"
          rx="4"
          fill="#5b98ed"
          strokeWidth="3"
        />
        <path
          d="M 249 158 Q 242 148 238 139 Q 235 133 240 131 Q 244 129 248 137 L 250 140 L 246 119 Q 245 113 249 112 Q 254 111 255 117 L 258 132 L 257 111 Q 257 105 262 105 Q 267 105 267 111 V 133 L 271 115 Q 272 110 277 112 Q 281 113 279 120 L 276 136 L 281 125 Q 284 120 288 123 Q 291 125 288 131 L 279 150 Q 276 159 269 162 Z"
          fill="#eef6ff"
          strokeWidth="3.5"
        />
        <path d="M 253 146 Q 260 140 267 146" fill="none" strokeWidth="2" />
        <path
          d="M 286 102 L 292 95 M 295 113 L 305 111"
          fill="none"
          stroke="#e7ad39"
          strokeWidth="3"
        />
      </g>
      <g className="learning-avatar__thinking-arm">
        <path
          d="M 205 204 Q 241 218 242 193 Q 241 181 227 175"
          fill="none"
          strokeWidth="18"
        />
        <path
          d="M 205 204 Q 241 218 242 193 Q 241 181 227 175"
          fill="none"
          stroke="#8bbcff"
          strokeWidth="10"
        />
        <circle cx="238" cy="204" r="7" fill="#c4dfff" strokeWidth="3" />
        <path
          d="M 225 166 L 233 177 L 227 185 L 217 174 Z"
          fill="#5b98ed"
          strokeWidth="3"
        />
        <path
          d="M 219 176 Q 211 179 207 173 L 200 163 Q 197 158 201 155 Q 205 152 209 158 L 214 165 L 214 150 Q 214 144 220 144 Q 225 144 224 151 V 159 Q 235 156 236 163 Q 235 168 228 170 L 225 175 Z"
          fill="#eef6ff"
          strokeWidth="3.5"
        />
        <path d="M 221 165 L 228 163" fill="none" strokeWidth="2" />
      </g>
      <g className="learning-avatar__thought">
        <circle cx="231" cy="88" r="4" fill="#fff4ce" strokeWidth="2" />
        <circle cx="243" cy="74" r="6" fill="#fff4ce" strokeWidth="2" />
        <path
          d="M 264 27 Q 284 27 287 45 Q 299 59 282 66 H 261 Q 242 67 242 49 Q 241 31 264 27 Z"
          fill="#fff4ce"
          strokeWidth="3"
        />
        <path
          d="M 260 42 Q 264 34 271 40 Q 278 47 267 52 V 55"
          fill="none"
          strokeWidth="3"
        />
        <circle cx="267" cy="61" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </>
  );
}

function Robot() {
  return (
    <g
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* Boots and knees sit behind the printer, with a single limb per side. */}
      <path
        d="M 123 243 V 267 M 181 243 V 267"
        stroke="#173465"
        strokeWidth="20"
      />
      <path
        d="M 123 247 V 268 M 181 247 V 268"
        stroke="#9bc6ff"
        strokeWidth="12"
      />
      <path
        d="M 109 265 H 130 Q 136 265 136 273 V 281 H 96 Q 91 269 109 265 Z M 174 265 H 194 Q 212 269 208 281 H 168 V 273 Q 168 265 174 265 Z"
        fill="#b8d7ff"
      />
      <path d="M 99 277 H 133 M 171 277 H 204" strokeWidth="3" />
      <path
        d="M 111 269 H 123 M 181 269 H 193"
        stroke="#f0f7ff"
        strokeWidth="3"
      />
      {/* Left arm: shoulder → elbow → cuff → mitten. */}
      <path
        d="M 102 203 Q 70 203 68 223 L 68 236"
        fill="none"
        strokeWidth="18"
      />
      <path
        d="M 102 203 Q 70 203 68 223 L 68 236"
        fill="none"
        stroke="#8bbcff"
        strokeWidth="10"
      />
      <circle cx="72" cy="216" r="7" fill="#c4dfff" strokeWidth="3" />
      <rect
        x="58"
        y="230"
        width="21"
        height="10"
        rx="4"
        fill="#5b98ed"
        strokeWidth="3"
      />
      <path
        d="M 59 238 Q 54 242 56 250 Q 58 259 67 259 Q 78 259 80 251 L 81 245 Q 81 240 76 239 Q 73 239 72 245 L 72 240 Z"
        fill="#eef6ff"
        strokeWidth="3.5"
      />
      <path d="M 62 248 V 253 M 67 249 V 254" strokeWidth="2" />
      {/* Swap the entire right arm; never layer an extra hand over a resting arm. */}
      <g className="learning-avatar__resting-arm">
        <path
          d="M 205 203 Q 237 203 241 221 L 242 236"
          fill="none"
          strokeWidth="18"
        />
        <path
          d="M 205 203 Q 237 203 241 221 L 242 236"
          fill="none"
          stroke="#8bbcff"
          strokeWidth="10"
        />
        <circle cx="237" cy="216" r="7" fill="#c4dfff" strokeWidth="3" />
        <rect
          x="232"
          y="230"
          width="21"
          height="10"
          rx="4"
          fill="#5b98ed"
          strokeWidth="3"
        />
        <path
          d="M 232 238 Q 226 240 228 246 L 230 252 Q 232 260 242 259 Q 251 259 254 250 Q 256 242 250 238 L 238 240 L 238 245 Q 236 238 232 238 Z"
          fill="#eef6ff"
          strokeWidth="3.5"
        />
        <path d="M 242 249 V 254 M 247 248 V 253" strokeWidth="2" />
      </g>
      <g className="learning-avatar__celebrating-arm">
        <path
          d="M 205 203 L 233 213 Q 249 215 251 197 L 251 183"
          fill="none"
          strokeWidth="18"
        />
        <path
          d="M 205 203 L 233 213 Q 249 215 251 197 L 251 183"
          fill="none"
          stroke="#8bbcff"
          strokeWidth="10"
        />
        <circle cx="236" cy="211" r="7" fill="#c4dfff" strokeWidth="3" />
        <rect
          x="241"
          y="180"
          width="22"
          height="11"
          rx="4"
          fill="#5b98ed"
          strokeWidth="3"
        />
        <path
          d="M 240 180 L 237 162 Q 236 156 241 152 L 248 145 L 251 127 Q 252 121 258 123 Q 264 125 263 133 L 261 148 H 273 Q 282 149 280 157 L 276 175 Q 275 181 268 182 L 244 184 Z"
          fill="#eef6ff"
          strokeWidth="3.5"
        />
        <path
          d="M 263 157 H 278 M 262 165 H 276 M 261 173 H 273 M 245 159 L 246 174"
          fill="none"
          strokeWidth="2.5"
        />
      </g>
      {/* Rounded metal printer, inset front plate, status light, and ticket roller. */}
      <rect x="98" y="175" width="110" height="80" rx="25" fill="#6faaff" />
      <path
        d="M 107 207 V 231 Q 107 246 121 247 H 187"
        stroke="#abd0ff"
        strokeWidth="5"
        fill="none"
      />
      <rect
        x="115"
        y="196"
        width="75"
        height="43"
        rx="12"
        fill="#a8cfff"
        strokeWidth="2.5"
      />
      <circle cx="196" cy="218" r="4" fill="#d2f79b" strokeWidth="2" />
      <path d="M 193 230 H 199 M 193 234 H 199" strokeWidth="2" />
      <rect
        x="121"
        y="202"
        width="63"
        height="14"
        rx="7"
        fill="#173465"
        strokeWidth="2"
      />
      <path d="M 126 207 H 179" stroke="#527dac" strokeWidth="2" />
      <g className="learning-avatar__ticket">
        <path
          d="M 131 211 H 173 V 254 L 168 251 L 163 255 L 158 251 L 153 255 L 148 251 L 143 255 L 138 251 L 131 254 Z"
          fill="#ffe3a1"
          strokeWidth="2.5"
        />
        <path
          d="M 135 216 H 169 M 135 246 H 169"
          stroke="#b98a39"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <path
          d="M 152 220 L 155 226 L 162 227 L 157 232 L 158 238 L 152 235 L 146 238 L 147 232 L 142 227 L 149 226 Z"
          fill="#edac40"
          strokeWidth="1.8"
        />
        <path
          d="M 149 229 L 152 232 L 157 226"
          stroke="#fff5dc"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 135 240 H 139 M 165 240 H 169"
          stroke="#b98a39"
          strokeWidth="1.5"
        />
      </g>
      {/* A larger head, rounded ear pods, a warm antenna, and soft screen cheeks. */}
      <path d="M 152 78 V 58" strokeWidth="6" />
      <circle cx="152" cy="49" r="11" fill="#ffdb85" strokeWidth="3.5" />
      <circle cx="149" cy="46" r="3" fill="#fff9dc" stroke="none" />
      <rect x="69" y="119" width="27" height="42" rx="12" fill="#8abaff" />
      <rect x="211" y="119" width="27" height="42" rx="12" fill="#8abaff" />
      <path
        d="M 77 132 V 148 M 230 132 V 148"
        stroke="#d9eaff"
        strokeWidth="4"
      />
      <rect x="82" y="76" width="142" height="119" rx="36" fill="#78afff" />
      <path
        d="M 99 99 Q 103 88 118 87 H 178"
        fill="none"
        stroke="#dcecff"
        strokeWidth="6"
      />
      <rect
        x="95"
        y="96"
        width="116"
        height="84"
        rx="27"
        fill="#eef7ff"
        strokeWidth="3"
      />
      <path
        d="M 106 113 Q 109 105 119 105 H 180"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
      />
      <g className="learning-avatar__eyes" stroke="none">
        <rect x="121" y="120" width="15" height="25" rx="7.5" fill="#173465" />
        <rect x="171" y="120" width="15" height="25" rx="7.5" fill="#173465" />
        <ellipse cx="126" cy="126" rx="3" ry="4" fill="#fff" />
        <ellipse cx="176" cy="126" rx="3" ry="4" fill="#fff" />
      </g>
      <g fill="#f7a79f" opacity=".7" stroke="none">
        <ellipse cx="115" cy="151" rx="10" ry="5.5" />
        <ellipse cx="191" cy="151" rx="10" ry="5.5" />
      </g>
      <path
        className="learning-avatar__happy-mouth"
        d="M 141 152 Q 153 168 166 152"
        fill="#173465"
        strokeWidth="3"
      />
      <path
        className="learning-avatar__happy-mouth"
        d="M 149 158 Q 154 155 160 158"
        stroke="#fbafb0"
        strokeWidth="3"
      />
      <path
        className="learning-avatar__thinking-mouth"
        d="M 146 156 Q 152 151 158 154"
        fill="none"
        strokeWidth="3"
      />
      <path d="M 145 182 H 162" stroke="#4d84d1" strokeWidth="2.5" />
      <g fill="#cfe4ff" strokeWidth="1.8">
        <circle cx="95" cy="179" r="3" />
        <circle cx="211" cy="179" r="3" />
      </g>
      <RobotGesture />
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

/** Original SVG companion. Each robot gesture replaces its complete right arm. */
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
      aria-label={`${companions[character].name} ${{ idle: "smiling", blink: "blinking", celebrate: "giving a thumbs-up", greeting: "waving hello", thinking: "thinking about a clue", printing: "printing earned tickets" }[mood]}`}
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
  const perform = (next: AvatarMood, speaker: AvatarCharacter = character) => {
    if (timer.current) clearTimeout(timer.current);
    setEvent((value) => value + 1);
    setMood(next);
    setStatus(
      `${companions[speaker].name}: ${tickPoses.find((pose) => pose.mood === next)?.line ?? "Ready when you are."}`,
    );
    timer.current = setTimeout(
      () => setMood("idle"),
      next === "blink" ? 700 : 3000,
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
          Meet Tick, our ticket-printing companion. He cheers you on, helps you
          think, and prints your hard-earned tickets.
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
          <details className="avatar-lab__customize">
            <summary>Explore optional companions</summary>
            <div
              className="avatar-lab__choices"
              role="group"
              aria-label="Choose an optional companion preview"
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
            <p>
              Orbit and Scrib can become choices when kids customize their
              companion. Tick is the default.
            </p>
          </details>
          <h3>{current.name}</h3>
          <p className="avatar-lab__description">{current.description}</p>
          <div className="avatar-lab__actions">
            <button type="button" onClick={() => perform("blink")}>
              Make {current.name} blink
            </button>
            <button type="button" onClick={() => perform("celebrate")}>
              Give a thumbs-up
            </button>
            {character === "robot" && (
              <>
                <button type="button" onClick={() => perform("greeting")}>
                  Wave hello
                </button>
                <button type="button" onClick={() => perform("thinking")}>
                  Find a clue
                </button>
                <button type="button" onClick={() => perform("printing")}>
                  Print a ticket
                </button>
              </>
            )}
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
            {status || "Tick is our companion. Try a blink or a thumbs-up."}
          </p>
        </div>
      </div>
      <div
        className="avatar-lab__character-sheet"
        aria-labelledby="tick-character-sheet-title"
      >
        <div className="avatar-lab__sheet-heading">
          <div>
            <p className="avatar-lab__chapter">Tick’s character sheet</p>
            <h3 id="tick-character-sheet-title">
              One companion. Six little moments.
            </h3>
          </div>
          <p>
            A friendly reaction for each part of the journey. Tap a pose to try
            it on the big stage.
          </p>
        </div>
        <div className="avatar-lab__pose-grid">
          {tickPoses.map((pose, index) => (
            <button
              type="button"
              className={`avatar-lab__pose avatar-lab__pose--${pose.mood}`}
              key={pose.mood}
              onClick={() => {
                choose("robot");
                perform(pose.mood, "robot");
              }}
            >
              <span className="avatar-lab__pose-number">
                0{index + 1} /{" "}
                {pose.mood === "celebrate" ? "thumbs-up" : pose.mood}
              </span>
              <LearningAvatar character="robot" mood={pose.mood} size={230} />
              <strong>{pose.title}</strong>
              <span className="avatar-lab__pose-line">“{pose.line}”</span>
              <span className="avatar-lab__pose-use">{pose.use}</span>
            </button>
          ))}
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
