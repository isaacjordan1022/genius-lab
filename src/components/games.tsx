"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./games.css";

type Game = "snake" | "match" | "rally";
type Props = {
  game: Game;
  onFinish: (score: number, runId: string) => Promise<boolean>;
};
const NAMES = {
  snake: "Snake Trail",
  match: "Match Studio",
  rally: "Rally Run",
};

function useHidden() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    change();
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  return hidden;
}
type SaveStatus = "idle" | "saving" | "saved" | "failed";
function useReport(done: boolean, score: number, onFinish: Props["onFinish"]) {
  const started = useRef(false);
  const pending = useRef(false);
  const saved = useRef(false);
  const runId = useRef<string | null>(null);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const retry = useCallback(async () => {
    if (!done || pending.current || saved.current) return;
    // Keep the same key after a lost response so a retry cannot duplicate a run.
    runId.current ??= crypto.randomUUID();
    pending.current = true;
    setStatus("saving");
    try {
      const confirmed = await onFinish(score, runId.current);
      saved.current = confirmed;
      setStatus(confirmed ? "saved" : "failed");
    } catch {
      setStatus("failed");
    } finally {
      pending.current = false;
    }
  }, [done, score, onFinish]);
  useEffect(() => {
    if (done && !started.current) {
      started.current = true;
      void retry();
    }
  }, [done, retry]);
  return { status, retry };
}
function Score({
  score,
  label = "Run score",
}: {
  score: number;
  label?: string;
}) {
  return (
    <div className="g-score">
      <span>{label}</span>
      <strong>{score.toLocaleString()}</strong>
    </div>
  );
}
function End({
  score,
  restart,
  report,
}: {
  score: number;
  restart: () => void;
  report: ReturnType<typeof useReport>;
}) {
  return (
    <div className="g-end" role="status" aria-live="polite">
      <strong>Run complete · {score} points</strong>
      <p>
        {report.status === "saved"
          ? "Your run score is saved in your score history."
          : report.status === "failed"
            ? "Your score has not been confirmed saved. Retry to save this same run."
            : "Saving your run score…"}{" "}
        These are practice points, not prize tickets.
      </p>
      {report.status === "failed" && (
        <button onClick={() => void report.retry()}>Retry saving score</button>
      )}
      {report.status === "saved" && (
        <button onClick={restart}>Play again ↗</button>
      )}
    </div>
  );
}

export default function GameRoom({ game, onFinish }: Props) {
  const [run, setRun] = useState(0);
  const restart = () => setRun((v) => v + 1);
  return (
    <section className="game-room" aria-label={NAMES[game]}>
      <div className="g-eyebrow">PLAYABLE PROTOTYPE · PRACTICE POINTS</div>
      <h2>{NAMES[game]}</h2>
      {game === "snake" ? (
        <Snake key={`snake-${run}`} onFinish={onFinish} restart={restart} />
      ) : game === "match" ? (
        <Match key={`match-${run}`} onFinish={onFinish} restart={restart} />
      ) : (
        <Rally key={`rally-${run}`} onFinish={onFinish} restart={restart} />
      )}
    </section>
  );
}
type RunProps = { onFinish: Props["onFinish"]; restart: () => void };
type Point = { x: number; y: number };
const DIRECTIONS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
function nextFood(body: Point[], round: number): Point {
  const free: Point[] = [];
  for (let y = 0; y < 12; y++)
    for (let x = 0; x < 12; x++)
      if (!body.some((p) => p.x === x && p.y === y)) free.push({ x, y });
  return free[(round * 37 + 13) % free.length] ?? { x: -1, y: -1 };
}
function Snake({ onFinish, restart }: RunProps) {
  const hidden = useHidden();
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState({
    body: [
      { x: 4, y: 6 },
      { x: 3, y: 6 },
      { x: 2, y: 6 },
    ],
    food: { x: 8, y: 6 },
    score: 0,
    steps: 0,
    done: false,
  });
  const direction = useRef<Point>({ x: 1, y: 0 });
  const pending = useRef<Point>({ x: 1, y: 0 });
  const turn = useCallback((key: string) => {
    const d = DIRECTIONS[key];
    if (d && !(d.x === -direction.current.x && d.y === -direction.current.y))
      pending.current = d;
  }, []);
  useEffect(() => {
    if (!started || state.done || paused || hidden) return;
    const key = (e: KeyboardEvent) => {
      if (DIRECTIONS[e.key]) {
        e.preventDefault();
        turn(e.key);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [started, state.done, paused, hidden, turn]);
  useEffect(() => {
    if (!started || state.done || paused || hidden) return;
    const timer = setInterval(() => {
      const d = pending.current;
      direction.current = d;
      setState((s) => {
        if (s.done) return s;
        const head = { x: s.body[0].x + d.x, y: s.body[0].y + d.y };
        const eats = head.x === s.food.x && head.y === s.food.y;
        const obstacle = eats ? s.body : s.body.slice(0, -1);
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= 12 ||
          head.y >= 12 ||
          obstacle.some((p) => p.x === head.x && p.y === head.y)
        )
          return { ...s, done: true };
        const body = [head, ...s.body];
        if (!eats) body.pop();
        const steps = s.steps + 1;
        return {
          body,
          food: eats ? nextFood(body, s.score / 20 + 1) : s.food,
          score: s.score + (eats ? 20 : 0),
          steps,
          done: steps >= 240 || body.length === 144,
        };
      });
    }, 250);
    return () => clearInterval(timer);
  }, [started, state.done, paused, hidden]);
  const report = useReport(state.done, state.score, onFinish);
  return (
    <>
      <p className="g-rules">
        Collect the striped tokens. Each is worth 20 points. Steer with arrow
        keys or the buttons. Avoid the walls and your own tail. You have 60
        seconds.
      </p>
      <div className="g-toolbar">
        <Score score={state.score} />
        <span>{Math.max(0, 60 - Math.floor(state.steps / 4))} seconds</span>
        {started && !state.done && (
          <button onClick={() => setPaused((v) => !v)}>
            {paused ? "Resume" : "Pause"}
          </button>
        )}
      </div>
      <div className="g-snake-wrap">
        <svg
          className="g-snake"
          viewBox="0 0 240 240"
          role="img"
          aria-label={`Snake board. Head column ${state.body[0].x + 1}, row ${state.body[0].y + 1}. Token column ${state.food.x + 1}, row ${state.food.y + 1}.`}
        >
          <defs>
            <pattern
              id="snake-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="20"
                height="20"
                fill="#f5f5f3"
                stroke="#d7d7d2"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect width="240" height="240" fill="url(#snake-grid)" />
          {state.food.x >= 0 && (
            <g
              transform={`translate(${state.food.x * 20 + 3} ${state.food.y * 20 + 3})`}
            >
              <rect
                width="14"
                height="14"
                rx="3"
                fill="white"
                stroke="#202020"
                strokeWidth="2"
              />
              <path d="M4 2v10M9 2v10" stroke="#202020" />
            </g>
          )}
          {state.body.map((p, i) => (
            <rect
              key={`${p.x}-${p.y}`}
              x={p.x * 20 + 2}
              y={p.y * 20 + 2}
              width="16"
              height="16"
              rx={i === 0 ? 5 : 3}
              fill={i === 0 ? "#111" : "#737373"}
            />
          ))}
          <circle
            cx={state.body[0].x * 20 + 7}
            cy={state.body[0].y * 20 + 7}
            r="2"
            fill="white"
          />
        </svg>
        {(!started || paused || hidden) && !state.done && (
          <div className="g-overlay">
            {!started ? (
              <button onClick={() => setStarted(true)}>
                Start Snake Trail
              </button>
            ) : (
              <strong>{hidden ? "Paused while away" : "Paused"}</strong>
            )}
          </div>
        )}
      </div>
      <div className="g-dpad" aria-label="Snake steering">
        <button
          className="g-up"
          aria-label="Turn up"
          onClick={() => turn("ArrowUp")}
          disabled={!started || state.done || paused || hidden}
        >
          ↑
        </button>
        <button
          className="g-left"
          aria-label="Turn left"
          onClick={() => turn("ArrowLeft")}
          disabled={!started || state.done || paused || hidden}
        >
          ←
        </button>
        <button
          className="g-down"
          aria-label="Turn down"
          onClick={() => turn("ArrowDown")}
          disabled={!started || state.done || paused || hidden}
        >
          ↓
        </button>
        <button
          className="g-right"
          aria-label="Turn right"
          onClick={() => turn("ArrowRight")}
          disabled={!started || state.done || paused || hidden}
        >
          →
        </button>
      </div>
      {state.done && (
        <End score={state.score} restart={restart} report={report} />
      )}
    </>
  );
}

const PAIRS = [
  { left: "A character’s reason for acting", right: "Motivation" },
  { left: "“The moon was a silver coin.”", right: "Metaphor" },
  { left: "A clue that hints at what happens later", right: "Foreshadowing" },
  { left: "A conclusion supported by clues", right: "Inference" },
  { left: "“The wind whispered a warning.”", right: "Personification" },
  { left: "The struggle that drives a story", right: "Conflict" },
];
const RIGHT_ORDER = [3, 0, 5, 1, 4, 2];
function Match({ onFinish, restart }: RunProps) {
  const hidden = useHidden();
  const [left, setLeft] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState(
    "Choose one clue and one writing concept.",
  );
  const done = matched.length === PAIRS.length;
  const score = Math.max(0, matched.length * 30 - mistakes * 5);
  const report = useReport(done, score, onFinish);
  const connect = () => {
    if (left === null || right === null || hidden || done) return;
    if (left === right) {
      setMatched((m) => [...m, left]);
      setFeedback(`Connected! ${PAIRS[left].right} fits that clue.`);
    } else {
      setMistakes((m) => m + 1);
      setFeedback(
        "Those ideas do not connect yet. Try another pairing. −5 practice points.",
      );
    }
    setLeft(null);
    setRight(null);
  };
  return (
    <>
      <p className="g-rules">
        Find the connection between a clue and a writing concept. Select one
        from each column, then connect them. Each correct pair earns 30 points;
        a mismatch costs 5. This is a practice set, separate from your weekly
        lesson.
      </p>
      <div className="g-toolbar">
        <Score score={score} />
        <span>
          {matched.length} / {PAIRS.length} connected
        </span>
      </div>
      {hidden && <p role="status">Paused while away.</p>}
      <div className="g-match">
        <div aria-label="Clues">
          {PAIRS.map((pair, i) => (
            <button
              key={pair.left}
              className={`${left === i ? "selected" : ""} ${matched.includes(i) ? "matched" : ""}`}
              disabled={done || hidden || matched.includes(i)}
              aria-pressed={left === i}
              onClick={() => setLeft(i)}
            >
              {matched.includes(i) ? "✓ " : ""}
              {pair.left}
            </button>
          ))}
        </div>
        <div aria-label="Writing concepts">
          {RIGHT_ORDER.map((i) => (
            <button
              key={PAIRS[i].right}
              className={`${right === i ? "selected" : ""} ${matched.includes(i) ? "matched" : ""}`}
              disabled={done || hidden || matched.includes(i)}
              aria-pressed={right === i}
              onClick={() => setRight(i)}
            >
              {matched.includes(i) ? "✓ " : ""}
              {PAIRS[i].right}
            </button>
          ))}
        </div>
      </div>
      <div className="g-match-footer">
        <p role="status">{feedback}</p>
        {!done && (
          <button
            disabled={left === null || right === null || hidden}
            onClick={connect}
          >
            Connect ideas →
          </button>
        )}
      </div>
      {done && <End score={score} restart={restart} report={report} />}
    </>
  );
}

const CHECKPOINTS = [
  {
    prompt: "Which fraction is equal to one half?",
    choices: ["2/4", "1/4", "3/4"],
    correct: 0,
    why: "Two of four equal parts is one half.",
  },
  {
    prompt: "What does a thermometer measure?",
    choices: ["Distance", "Temperature", "Mass"],
    correct: 1,
    why: "A thermometer measures temperature.",
  },
  {
    prompt: "In “the classroom was a zoo,” which technique is used?",
    choices: ["A literal description", "A question", "A metaphor"],
    correct: 2,
    why: "It compares the classroom to a zoo without using “like” or “as.”",
  },
];
const TRACK_ITEMS = Array.from({ length: 27 }, (_, i) => ({
  id: i,
  spawn: i * 0.92 + 0.4,
  lane: (i * 7 + Math.floor(i / 3)) % 3,
  kind: i % 3 === 2 ? "obstacle" : "gold",
}));
type RaceState = {
  elapsed: number;
  lane: number;
  score: number;
  done: boolean;
  checkpoint: number | null;
  nextCheckpoint: number;
  questionSeconds: number;
  feedback: string;
  feedbackSeconds: number;
  hit: number[];
};
function Rally({ onFinish, restart }: RunProps) {
  const hidden = useHidden();
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [state, setState] = useState<RaceState>({
    elapsed: 0,
    lane: 1,
    score: 0,
    done: false,
    checkpoint: null,
    nextCheckpoint: 0,
    questionSeconds: 0,
    feedback: "",
    feedbackSeconds: 0,
    hit: [],
  });
  const steer = useCallback(
    (delta: number) =>
      setState((s) =>
        s.done || s.checkpoint !== null
          ? s
          : { ...s, lane: Math.max(0, Math.min(2, s.lane + delta)) },
      ),
    [],
  );
  useEffect(() => {
    if (!started || state.done || paused || hidden) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        steer(e.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [started, state.done, paused, hidden, steer]);
  useEffect(() => {
    if (!started || state.done || paused || hidden) return;
    let last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.2);
      last = now;
      setState((s) => {
        if (s.done) return s;
        if (s.checkpoint !== null) {
          if (s.feedback) {
            const feedbackSeconds = s.feedbackSeconds + dt;
            return feedbackSeconds >= 1.6
              ? { ...s, checkpoint: null, feedback: "", feedbackSeconds: 0 }
              : { ...s, feedbackSeconds };
          }
          const questionSeconds = s.questionSeconds + dt;
          return questionSeconds >= 12
            ? {
                ...s,
                questionSeconds: 12,
                score: Math.max(0, s.score - 15),
                feedback: `Time! ${CHECKPOINTS[s.checkpoint].why}`,
                feedbackSeconds: 0,
              }
            : { ...s, questionSeconds };
        }
        const elapsed = Math.min(30, s.elapsed + dt);
        const crossed = TRACK_ITEMS.filter(
          (item) => item.spawn + 2.4 > s.elapsed && item.spawn + 2.4 <= elapsed,
        );
        const hits = crossed.filter((item) => item.lane === s.lane);
        const score = Math.max(
          0,
          s.score +
            hits.reduce(
              (sum, item) => sum + (item.kind === "gold" ? 15 : -20),
              0,
            ),
        );
        const checkpoint =
          s.nextCheckpoint < 3 && elapsed >= (s.nextCheckpoint + 1) * 8
            ? s.nextCheckpoint
            : null;
        return {
          ...s,
          elapsed,
          score,
          done: elapsed >= 30,
          checkpoint,
          nextCheckpoint: s.nextCheckpoint + (checkpoint !== null ? 1 : 0),
          questionSeconds: 0,
          hit: [...s.hit, ...hits.map((item) => item.id)],
        };
      });
    }, 50);
    return () => clearInterval(timer);
  }, [started, state.done, paused, hidden]);
  const report = useReport(state.done, state.score, onFinish);
  const answer = (choice: number) =>
    setState((s) => {
      if (s.checkpoint === null || s.feedback || s.done || paused || hidden)
        return s;
      const question = CHECKPOINTS[s.checkpoint];
      const correct = choice === question.correct;
      const bonus = 40 + Math.max(0, Math.floor((12 - s.questionSeconds) * 2));
      return {
        ...s,
        score: Math.max(0, s.score + (correct ? bonus : -15)),
        feedback: correct
          ? `Correct! +${bonus} points. ${question.why}`
          : `−15 points. ${question.why}`,
        feedbackSeconds: 0,
      };
    });
  const visible = TRACK_ITEMS.filter(
    (item) =>
      state.elapsed >= item.spawn &&
      state.elapsed < item.spawn + 2.65 &&
      !state.hit.includes(item.id),
  );
  const checkpoint =
    state.checkpoint === null ? null : CHECKPOINTS[state.checkpoint];
  return (
    <>
      <p className="g-rules">
        A 30-second drive with three review stops. Steer left and right, collect
        tokens (+15), and avoid barriers (−20). At a checkpoint, the car
        freezes: choose a correct answer for 40 points plus a speed bonus. A
        wrong answer or timeout costs 15 run points. Your ticket wallet stays
        safe.
      </p>
      <p className="g-sample-note">
        Prototype checkpoints use three sample questions. Your saved lesson
        knowledge will power the real daily mission.
      </p>
      <div className="g-toolbar">
        <Score score={state.score} />
        <span>
          {Math.max(0, 30 - Math.floor(state.elapsed))} driving seconds
        </span>
        {started && !state.done && (
          <button onClick={() => setPaused((v) => !v)}>
            {paused ? "Resume" : "Pause"}
          </button>
        )}
      </div>
      <div className="g-rally">
        <div className="g-track" aria-hidden="true">
          <div className="g-lane-line g-line-one" />
          <div className="g-lane-line g-line-two" />
          {visible.map((item) => (
            <div
              key={item.id}
              className={`g-track-item g-${item.kind}`}
              style={{
                left: `${((item.lane + 0.5) * 100) / 3}%`,
                top: `${((state.elapsed - item.spawn) / 2.4) * 82}%`,
              }}
            >
              {item.kind === "gold" ? "✦" : "▰"}
            </div>
          ))}
          <div
            className="g-car"
            style={{ left: `${((state.lane + 0.5) * 100) / 3}%` }}
          >
            ▤<span>● ●</span>
          </div>
          <div className="g-finish-line" />
        </div>
        <span className="g-visually-hidden" role="status">
          Lane {state.lane + 1} of 3.
        </span>
        {(!started || paused || hidden) && !state.done ? (
          <div className="g-overlay">
            {!started ? (
              <button onClick={() => setStarted(true)}>Start Rally Run</button>
            ) : (
              <strong>{hidden ? "Paused while away" : "Paused"}</strong>
            )}
          </div>
        ) : checkpoint && !state.done ? (
          <div className="g-checkpoint">
            <div className="g-eyebrow">
              REVIEW STOP {(state.checkpoint ?? 0) + 1} / 3
            </div>
            <h3>{checkpoint.prompt}</h3>
            <p>
              {state.feedback
                ? "Answer recorded"
                : `${Math.max(0, Math.ceil(12 - state.questionSeconds))} seconds · car paused`}
            </p>
            {state.feedback ? (
              <p className="g-answer-feedback" role="status">
                {state.feedback}
              </p>
            ) : (
              <div>
                {checkpoint.choices.map((choice, i) => (
                  <button key={choice} onClick={() => answer(i)}>
                    {choice}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="g-steering">
        <button
          onClick={() => steer(-1)}
          disabled={
            !started ||
            state.done ||
            paused ||
            hidden ||
            state.checkpoint !== null ||
            state.lane === 0
          }
          aria-label="Steer left"
        >
          ← Left
        </button>
        <span>Lane {state.lane + 1}</span>
        <button
          onClick={() => steer(1)}
          disabled={
            !started ||
            state.done ||
            paused ||
            hidden ||
            state.checkpoint !== null ||
            state.lane === 2
          }
          aria-label="Steer right"
        >
          Right →
        </button>
      </div>
      {state.done && (
        <End score={state.score} restart={restart} report={report} />
      )}
    </>
  );
}
