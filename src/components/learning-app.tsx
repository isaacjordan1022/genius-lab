"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Blocks,
  Flag,
  Gamepad2,
  Gift,
  House,
  Lock,
  Palette,
  Ticket,
  Trophy,
  Utensils,
  Volume2,
  Check,
  ArrowRight,
  Mic,
  RefreshCw,
} from "lucide-react";
import type { AppState } from "@/lib/store";
import type { Answer, PublicQuestion } from "@/lib/content-types";
import GameRoom from "./games";

type Screen =
  "home" | "week" | "lesson" | "mission" | "arcade" | "prizes" | "scores";
const NAV = [
  ["home", "Dashboard", House],
  ["week", "This week's lesson", BookOpen],
  ["mission", "Daily mission", Flag],
  ["arcade", "Open play", Gamepad2],
  ["prizes", "Prize shelf", Gift],
  ["scores", "Scores & family", Trophy],
] as const;
const number = (n: number) => n.toLocaleString();
export default function LearningApp() {
  const [data, setData] = useState<AppState | null>(null),
    [screen, setScreen] = useState<Screen>("home"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [committing, setCommitting] = useState(false),
    [questionIndex, setQuestionIndex] = useState(0),
    [draftState, setDraftState] = useState<{
      questionId: string;
      answer: Answer;
    }>({ questionId: "", answer: "" }),
    [saveStatus, setSaveStatus] = useState(""),
    [checkout, setCheckout] = useState<{
      id: string;
      cost: number;
      title: string;
      key: string;
    } | null>(null),
    [game, setGame] = useState<"snake" | "match" | "rally" | null>(null);
  const checkoutDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = checkoutDialog.current;
    if (checkout && dialog) {
      dialog.showModal();
      return () => dialog.close();
    }
  }, [checkout]);
  const current = useRef<AppState | null>(null),
    queue = useRef<Promise<unknown>>(Promise.resolve());
  const update = useCallback((s: AppState) => {
    current.current = s;
    setData(s);
  }, []);
  const act = useCallback(
    (body: Record<string, unknown>): Promise<AppState | null> => {
      const task = queue.current.then(async () => {
        if (
          body.action === "save" &&
          !!current.current?.active &&
          current.current.active.id === body.attemptId &&
          JSON.stringify(
            current.current.active.answers[String(body.questionId)],
          ) === JSON.stringify(body.answer)
        )
          return current.current;
        setBusy(true);
        setError("");
        try {
          const r = await fetch("/api/action", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...body,
                ...(body.action === "save"
                  ? { revision: current.current?.revision }
                  : {}),
              }),
            }),
            json = await r.json();
          if (!r.ok) throw new Error(json.error);
          update(json);
          return json as AppState;
        } catch (e) {
          setError(
            e instanceof Error
              ? e.message
              : "Could not save. Please try again.",
          );
          return null;
        } finally {
          setBusy(false);
        }
      });
      queue.current = task;
      return task;
    },
    [update],
  );
  useEffect(() => {
    void act({ action: "enter" });
  }, [act]);
  const a = data?.active,
    q = a?.questions[questionIndex];
  const draft = draftState.answer;
  function setDraft(answer: Answer) {
    setDraftState({ questionId: q?.id ?? "", answer });
  }
  useEffect(() => {
    if (!q) return;
    setDraft(a?.answers[q.id] ?? (q.kind === "match" ? {} : ""));
    setSaveStatus("");
  }, [q?.id, a?.id]); // drafts stay local while a save is in flight
  const complete = (
    item: PublicQuestion | undefined,
    value: Answer | undefined,
  ) =>
    !!item &&
    (item.kind === "match"
      ? typeof value === "object" &&
        (item.left ?? []).every((left) => !!value[left])
      : typeof value === "string" && !!value.trim());
  useEffect(() => {
    if (
      screen !== "lesson" ||
      !a?.taught ||
      a.submittedAt ||
      !q ||
      draftState.questionId !== q.id
    ) {
      setSaveStatus("");
      return;
    }
    const existing = a.answers[q.id];
    if (JSON.stringify(existing) === JSON.stringify(draft)) {
      setSaveStatus("Saved");
      return;
    }
    setSaveStatus("Saving…");
    const timer = setTimeout(() => {
      void act({
        action: "save",
        attemptId: a.id,
        questionId: q.id,
        answer: draft,
      }).then((result) =>
        setSaveStatus(result ? "Saved" : "Not saved — please retry"),
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [
    draft,
    draftState.questionId,
    q?.id,
    a?.id,
    a?.taught,
    a?.submittedAt,
    screen,
    act,
  ]);
  async function start(chunkId: string) {
    const state = await act({ action: "start", chunkId });
    if (state) {
      setQuestionIndex(
        Math.max(
          0,
          state.active?.questions.findIndex(
            (q) => !complete(q, state.active?.answers[q.id]),
          ) ?? 0,
        ),
      );
      setScreen("lesson");
    }
  }
  async function continueLesson() {
    if (!data) return;
    const next = data.chunks.find((c) => !data.passed.includes(c.id));
    if (!next) {
      setScreen("scores");
      return;
    }
    if (a?.chunkId === next.id) {
      setQuestionIndex(
        Math.max(
          0,
          a.questions.findIndex((q) => !complete(q, a.answers[q.id])),
        ),
      );
      setScreen("lesson");
      return;
    }
    await start(next.id);
  }
  async function nextQuestion() {
    if (committing || !a || !q || !complete(q, draft)) return;
    setCommitting(true);
    try {
      const result = await act({
        action: "save",
        attemptId: a.id,
        questionId: q.id,
        answer: draft,
      });
      if (!result) return;
      if (questionIndex < 14) setQuestionIndex(questionIndex + 1);
      else await act({ action: "submit", attemptId: a.id });
    } finally {
      setCommitting(false);
    }
  }
  async function persistDraft() {
    if (
      screen === "lesson" &&
      a?.taught &&
      !a.submittedAt &&
      q &&
      draftState.questionId === q.id &&
      JSON.stringify(a.answers[q.id]) !== JSON.stringify(draft)
    )
      return !!(await act({
        action: "save",
        attemptId: a.id,
        questionId: q.id,
        answer: draft,
      }));
    return true;
  }
  async function navigate(next: Screen) {
    if (committing) return;
    setCommitting(true);
    try {
      if (!(await persistDraft())) return;
      setError("");
      setGame(null);
      setScreen(next);
    } finally {
      setCommitting(false);
    }
  }
  async function moveQuestion(index: number) {
    if (committing) return;
    setCommitting(true);
    try {
      if (await persistDraft()) setQuestionIndex(index);
    } finally {
      setCommitting(false);
    }
  }
  async function refresh() {
    try {
      const r = await fetch("/api/state", { cache: "no-store" });
      if (!r.ok) throw new Error("Could not refresh.");
      update(await r.json());
    } catch (e) {
      setError(String(e));
    }
  }
  if (!data)
    return (
      <main className="loading">
        <div className="logo-stamp">L</div>
        <h1>Opening your learning club…</h1>
        {error && (
          <>
            <p role="alert">{error}</p>
            <button onClick={() => void act({ action: "enter" })}>
              Try again
            </button>
          </>
        )}
      </main>
    );
  const chunk = data.chunks.find((c) => c.id === a?.chunkId),
    next = data.chunks.find((c) => !data.passed.includes(c.id)),
    unlocked = data.passed.length > 0,
    pending = a?.result?.status === "pending",
    passed = a?.result?.passed,
    failed = a?.result?.status === "final" && !passed,
    finished = data.passed.length === data.chunks.length;
  const nextIsActive = a?.chunkId === next?.id;
  const heading = finished
    ? "A whole week of new ideas."
    : nextIsActive && pending
      ? "Your thinking is ready for review."
      : nextIsActive && failed
        ? "A little practice. A fresh start."
        : nextIsActive
          ? "Pick up where you left off."
          : next?.id === "weekly-test"
            ? "Ready for your weekly test?"
            : "Your next adventure starts here.";
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="logo-stamp">L</span>
          <span>
            Learning
            <br />
            Club
          </span>
        </Link>
        <div className="profile">
          <div className="profile-avatar">AZ</div>
          <div>
            <strong>Aharon Zev</strong>
            <small>Grade 5</small>
          </div>
        </div>
        <nav aria-label="Main navigation">
          {NAV.map(([id, label, Icon]) => (
            <button
              key={id}
              aria-label={label}
              disabled={committing}
              className={
                screen === id || (screen === "lesson" && id === "week")
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => navigate(id)}
              aria-current={
                screen === id || (screen === "lesson" && id === "week")
                  ? "page"
                  : undefined
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {(id === "mission" || id === "arcade") && !unlocked && (
                <Lock size={12} />
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link href="/style-lab">
            <Palette size={16} /> Explore the design lab
          </Link>
          <p>First playable · local pilot</p>
        </div>
      </aside>
      <div className="main-wrap">
        <header className="app-top">
          <span>{data.weekTitle}</span>
          <span className="local-badge">Sample curriculum & rewards</span>
        </header>
        <main className="workspace">
          {error && (
            <div role="alert" className="alert">
              <strong>Let's try that again.</strong> {error}
              <button onClick={() => void refresh()} className="quiet">
                Refresh progress
              </button>
            </div>
          )}
          {screen === "home" && (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">Your next step</p>
                  <h1>Hi, Aharon Zev.</h1>
                </div>
                <TicketBalance balance={data.balance} />
              </div>
              <section className="continue-card">
                <div className="continue-copy">
                  <div className="chip">
                    <BookOpen size={15} />
                    {finished
                      ? "Week complete"
                      : next?.id === "weekly-test"
                        ? "Weekly test"
                        : `Chunk ${next?.order ?? 1} of 5`}
                  </div>
                  <h2>{heading}</h2>
                  <p>
                    {next?.title ??
                      "You passed every chunk and the weekly test. Look back at what you learned."}
                  </p>
                  <button
                    disabled={busy}
                    className="primary"
                    onClick={() => void continueLesson()}
                  >
                    {finished
                      ? "See my scores"
                      : nextIsActive && pending
                        ? "View submitted answers"
                        : nextIsActive && failed
                          ? "Review my result"
                          : nextIsActive
                            ? "Continue my lesson"
                            : next?.id === "weekly-test"
                              ? "Start weekly test"
                              : "Start my lesson"}
                    <ArrowRight size={17} />
                  </button>
                  <small>
                    {pending && nextIsActive
                      ? "Open explanations wait for parent scoring in this local pilot."
                      : "Teaching, practice, and 15 questions. Your place saves as you go."}
                  </small>
                </div>
                <div className="lesson-progress">
                  <span>
                    {data.passed.filter((id) => id !== "weekly-test").length}
                    <small>/ 5</small>
                  </span>
                  <p>daily chunks passed</p>
                  <div className="progress-dots">
                    {data.chunks.slice(0, 5).map((c) => (
                      <span
                        key={c.id}
                        className={data.passed.includes(c.id) ? "done" : ""}
                      >
                        {data.passed.includes(c.id) ? (
                          <Check size={13} />
                        ) : (
                          c.order
                        )}
                      </span>
                    ))}
                  </div>
                  <button
                    className="text-button"
                    onClick={() => navigate("week")}
                  >
                    View this week's plan
                  </button>
                </div>
              </section>
              <div className="section-heading">
                <h2>After your lesson</h2>
                <span className="fine">Pass at 90% to unlock</span>
              </div>
              <div className="two-col">
                <BonusCard
                  icon={<Flag />}
                  title={`${new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" })} Rally`}
                  text="A quick race through things you've learned. Collect gold. Think fast."
                  unlocked={unlocked}
                  action={() => navigate("mission")}
                />
                <BonusCard
                  icon={<Gamepad2 />}
                  title="Your open-play arcade"
                  text="Snake Trail, Match Studio, and Rally Run. Three ways to play."
                  unlocked={unlocked}
                  action={() => navigate("arcade")}
                />
              </div>
              <div className="home-footer">
                <span>
                  <Ticket size={18} /> {number(data.lifetime)} tickets earned so
                  far
                </span>
                <button
                  className="text-button"
                  onClick={() => navigate("prizes")}
                >
                  Take a peek at the prize shelf <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}
          {screen === "week" && (
            <>
              <PageTitle
                overline="Five chunks. One weekly test."
                title="A week of good questions."
              />
              <p className="lede">{data.weekObjectives.join(" · ")}</p>
              <div className="week-list">
                {data.chunks.map((c) => {
                  const isPassed = data.passed.includes(c.id),
                    can = data.chunks
                      .filter((p) => p.order < c.order)
                      .every((p) => data.passed.includes(p.id)),
                    attempts = data.attempts.filter((a) => a.chunkId === c.id);
                  return (
                    <article className="week-item" key={c.id}>
                      <span
                        className={"week-number " + (isPassed ? "done" : "")}
                      >
                        {isPassed ? (
                          <Check />
                        ) : c.order === 6 ? (
                          <Trophy />
                        ) : (
                          c.order
                        )}
                      </span>
                      <div>
                        <span className="eyebrow">
                          {c.order === 6
                            ? "Test day"
                            : `Daily chunk ${c.order}`}
                        </span>
                        <h3>{c.title}</h3>
                        <p>{c.subjects.join(" · ")}</p>
                        {attempts.length > 0 && (
                          <small>
                            {attempts
                              .map(
                                (at, i) =>
                                  `Attempt ${i + 1}: ${at.result?.status === "final" ? at.result.percent.toFixed(1) + "%" : at.result?.status === "pending" ? "in review" : "in progress"}`,
                              )
                              .join(" / ")}
                          </small>
                        )}
                      </div>
                      <button
                        disabled={busy || !can}
                        className={can && !isPassed ? "primary" : ""}
                        onClick={() =>
                          isPassed
                            ? navigate("scores")
                            : a?.chunkId === c.id
                              ? setScreen("lesson")
                              : void start(c.id)
                        }
                      >
                        {isPassed ? (
                          "View score"
                        ) : !can ? (
                          <>
                            <Lock size={13} /> Locked
                          </>
                        ) : a?.chunkId === c.id ? (
                          "Continue"
                        ) : (
                          "Begin"
                        )}
                      </button>
                    </article>
                  );
                })}
              </div>
              <p className="fine">
                This local pilot unlocks the next chunk immediately after a pass
                so we can test the whole week. Calendar pacing will be added to
                the live family experience.
              </p>
            </>
          )}
          {screen === "lesson" &&
            (!a ? (
              <Empty
                title="Start with your weekly plan."
                text="Choose your first available chunk to begin."
                action={() => navigate("week")}
                label="Open my plan"
              />
            ) : a.submittedAt ? (
              <>
                <PageTitle
                  overline={`${chunk?.title} · attempt ${a.form + 1}`}
                  title={
                    pending
                      ? "Your explanations are in review."
                      : passed
                        ? "You earned your next step."
                        : "Let’s strengthen a few ideas."
                  }
                />
                <section className="result-panel panel">
                  <div className="score-number">
                    {pending ? "—" : a.result?.percent.toFixed(1) + "%"}
                    <small>
                      {pending
                        ? `${Object.values(a.scores).filter((x) => x === null).length} rubric scores pending`
                        : `${a.result?.points} / 60 points · 54 needed`}
                    </small>
                  </div>
                  <div>
                    <h2>
                      {pending
                        ? "Every explanation deserves a fair score."
                        : passed
                          ? "Passed. Nice thinking."
                          : "Your original score stays saved."}
                    </h2>
                    <p>
                      {pending
                        ? "A parent can score your open answers using the four-point rubric. Live AI grading is not connected in this pilot."
                        : passed
                          ? "The next chunk and arcade are unlocked. Your one-time sample ticket reward has been saved."
                          : "Read the explanations below, then try an equivalent set of fresh questions. You need 90% to continue."}
                    </p>
                    {pending ? (
                      <button onClick={() => void refresh()}>
                        <RefreshCw size={16} /> Check for reviewed scores
                      </button>
                    ) : passed ? (
                      <button
                        className="primary"
                        onClick={() => navigate("arcade")}
                      >
                        Visit the arcade <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        className="primary"
                        disabled={busy}
                        onClick={() => void start(a.chunkId)}
                      >
                        Teach me again & start a fresh check
                      </button>
                    )}
                  </div>
                </section>
                <h2 className="section-heading">Your answers</h2>
                {a.questions.map((question, i) => (
                  <details className="answer-review" key={question.id}>
                    <summary>
                      <span>
                        {i + 1}. {question.prompt}
                      </span>
                      <strong>
                        {a.scores[question.id] === null
                          ? "Review"
                          : `${a.scores[question.id]}/4`}
                      </strong>
                    </summary>
                    <p>
                      <strong>Your response:</strong>{" "}
                      {typeof a.answers[question.id] === "string"
                        ? String(a.answers[question.id])
                        : Object.entries(a.answers[question.id] ?? {})
                            .map(([l, r]) => `${l} → ${r}`)
                            .join("; ")}
                    </p>
                    <p>{question.explanation}</p>
                  </details>
                ))}
              </>
            ) : !a.taught ? (
              <>
                <PageTitle
                  overline={`${chunk?.order === 6 ? "Weekly test" : `Chunk ${chunk?.order}`} · teach first`}
                  title={chunk?.title ?? "Your lesson"}
                />
                <div className="teaching-layout">
                  <section className="teaching-blocks">
                    {chunk?.teaching.map((block, i) => (
                      <article className="panel teaching" key={i}>
                        <span className="lesson-step">{i + 1}</span>
                        <h2>{block.title}</h2>
                        <div className="prose">
                          {block.text.split("\n").map((paragraph, j) => (
                            <p key={j}>{paragraph}</p>
                          ))}
                        </div>
                      </article>
                    ))}
                    <button
                      className="primary"
                      disabled={busy}
                      onClick={() => {
                        setQuestionIndex(0);
                        void act({ action: "taught", attemptId: a.id });
                      }}
                    >
                      I'm ready for the questions <ArrowRight size={17} />
                    </button>
                  </section>
                  <aside className="panel lesson-aside">
                    <h3>What you're working on</h3>
                    <ul>
                      {chunk?.objectives.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                    <div className="voice-placeholder">
                      <Volume2 />
                      <strong>Read aloud</strong>
                      <p>
                        ElevenLabs connection comes next. This pilot is ready to
                        read on screen.
                      </p>
                    </div>
                    <p className="fine">
                      15 questions · score 90% to pass · pause whenever you
                      need.
                    </p>
                  </aside>
                </div>
              </>
            ) : q ? (
              <>
                <div className="page-heading">
                  <PageTitle
                    overline={`Chunk ${chunk?.order} · question ${questionIndex + 1} of 15`}
                    title="Show your thinking."
                  />
                  <span className="save-state" aria-live="polite">
                    {saveStatus || "Saved progress"}
                  </span>
                </div>
                <div className="question-rail">
                  {a.questions.map((item, i) => (
                    <button
                      key={item.id}
                      aria-label={`Question ${i + 1}${complete(item, a.answers[item.id]) ? " answered" : ""}`}
                      className={
                        i === questionIndex
                          ? "current"
                          : complete(item, a.answers[item.id])
                            ? "answered"
                            : ""
                      }
                      onClick={() => void moveQuestion(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <section className="panel question-card">
                  <div className="question-meta">
                    <span>
                      {q.kind === "open"
                        ? "Explain or create"
                        : q.kind === "match"
                          ? "Find the connections"
                          : "Choose thoughtfully"}
                    </span>
                    <span>4 possible points</span>
                  </div>
                  <h2>{q.prompt}</h2>
                  <QuestionInput
                    question={q}
                    disabled={committing}
                    answer={draft}
                    onChange={setDraft}
                  />
                  {q.kind === "open" && (
                    <details className="rubric">
                      <summary>What makes a strong answer?</summary>
                      <ul>
                        {q.rubric?.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                  <div className="question-controls">
                    <button disabled className="quiet">
                      <Mic size={16} /> Speaking connects next
                    </button>
                    <button
                      className="primary"
                      disabled={busy || !complete(q, draft)}
                      onClick={() => void nextQuestion()}
                    >
                      {questionIndex === 14
                        ? "Submit all 15 answers"
                        : "Save & continue"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  <p className="fine">
                    Your answers save automatically. Feedback comes after you
                    submit the whole assessment.
                  </p>
                </section>
              </>
            ) : null)}
          {(screen === "arcade" || screen === "mission") && (
            <>
              <PageTitle
                overline={
                  screen === "mission"
                    ? "The daily review game"
                    : "You earned some play"
                }
                title={
                  screen === "mission"
                    ? `${new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" })} Rally`
                    : "Choose your next game."
                }
              />
              {!unlocked ? (
                <Empty
                  title="Your first pass opens the arcade."
                  text="Finish a chunk with 90% or better, then come back for a game."
                  action={() => void continueLesson()}
                  label="Continue my lesson"
                />
              ) : screen === "mission" || game ? (
                <>
                  <button
                    className="text-button"
                    onClick={() => {
                      setGame(null);
                      if (screen === "mission") navigate("arcade");
                    }}
                  >
                    ← Back to games
                  </button>
                  <GameRoom
                    game={screen === "mission" ? "rally" : game!}
                    onFinish={async (score: number, runId: string) => {
                      return !!(await act({
                        action: "game",
                        game: screen === "mission" ? "rally" : game,
                        score,
                        runId,
                      }));
                    }}
                  />
                  <p className="fine">
                    Game prototype: run scores save locally. Arcade ticket
                    rewards and curriculum review checkpoints are not connected
                    yet.
                  </p>
                </>
              ) : (
                <div className="game-grid">
                  {(
                    [
                      {
                        id: "snake",
                        title: "Snake Trail",
                        symbol: "↝",
                        copy: "Collect fruit. Dodge your tail. Make every turn count.",
                      },
                      {
                        id: "match",
                        title: "Match Studio",
                        symbol: "↔",
                        copy: "Find related ideas and make thoughtful connections.",
                      },
                      {
                        id: "rally",
                        title: "Rally Run",
                        symbol: "⚑",
                        copy: "Steer down the course, dodge obstacles, and collect gold.",
                      },
                    ] as const
                  ).map((g) => (
                    <article className="panel game-card" key={g.id}>
                      <div className="game-symbol">{g.symbol}</div>
                      <h2>{g.title}</h2>
                      <p>{g.copy}</p>
                      <button className="primary" onClick={() => setGame(g.id)}>
                        Play <ArrowRight size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
          {screen === "prizes" && (
            <>
              <div className="page-heading">
                <PageTitle
                  overline="The prize counter"
                  title="Good things to save for."
                />
                <TicketBalance balance={data.balance} />
              </div>
              <p className="lede">
                Choose something small, or keep saving for something big.
              </p>
              <div className="prize-grid">
                {data.prizes.map((p) => {
                  const Icon =
                    p.icon === "palette"
                      ? Palette
                      : p.icon === "utensils"
                        ? Utensils
                        : Blocks;
                  return (
                    <article className="panel prize" key={p.id}>
                      <div className="prize-art">
                        <Icon size={46} />
                      </div>
                      <h2>{p.title}</h2>
                      <p>{p.description}</p>
                      <strong className="price">
                        <Ticket size={18} />
                        {number(p.cost)} tickets
                      </strong>
                      <div
                        className="meter"
                        role="progressbar"
                        aria-label={`Savings for ${p.title}`}
                        aria-valuenow={Math.min(p.cost, data.balance)}
                        aria-valuemin={0}
                        aria-valuemax={p.cost}
                      >
                        <span
                          style={{
                            width: `${Math.min(100, (data.balance / p.cost) * 100)}%`,
                          }}
                        />
                      </div>
                      <small>
                        {data.balance >= p.cost
                          ? "Ready to order"
                          : `${number(p.cost - data.balance)} more tickets to go`}
                      </small>
                      <button
                        disabled={data.balance < p.cost}
                        onClick={() =>
                          setCheckout({ ...p, key: crypto.randomUUID() })
                        }
                      >
                        {data.balance >= p.cost
                          ? "Choose this prize"
                          : "Keep saving"}
                      </button>
                    </article>
                  );
                })}
              </div>
              {checkout && (
                <dialog
                  ref={checkoutDialog}
                  onCancel={() => setCheckout(null)}
                  aria-label="Confirm sample prize"
                  className="checkout panel"
                >
                  <h2>Make it yours?</h2>
                  <p>
                    {checkout.title} costs{" "}
                    <strong>{checkout.cost} tickets</strong>.
                  </p>
                  <p>
                    You'll have {data.balance - checkout.cost} tickets left.
                  </p>
                  <p className="fine">
                    Sample order only. The parent inbox will record it; no real
                    purchase or email is sent.
                  </p>
                  <div className="button-row">
                    <button onClick={() => setCheckout(null)}>
                      Keep saving
                    </button>
                    <button
                      className="primary"
                      disabled={busy}
                      onClick={() =>
                        void act({
                          action: "checkout",
                          prizeId: checkout.id,
                          cost: checkout.cost,
                          checkoutId: checkout.key,
                        }).then((s) => {
                          if (s) setCheckout(null);
                        })
                      }
                    >
                      Confirm order
                    </button>
                  </div>
                </dialog>
              )}
              <h2 className="section-heading">My prizes</h2>
              {data.orders.length ? (
                <div className="panel">
                  {data.orders
                    .slice()
                    .reverse()
                    .map((o) => (
                      <div className="order-row" key={o.id}>
                        <Gift />
                        <div>
                          <strong>{o.title}</strong>
                          <small>
                            {new Date(o.at).toLocaleDateString()} · {o.cost}{" "}
                            tickets
                          </small>
                        </div>
                        <span className="chip">Confirmed</span>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="empty-note">
                  Your first prize will appear here when you order it.
                </p>
              )}
              <p className="fine">
                Sample ticket prices. The real dollar conversion and prize
                budget are not set yet.
              </p>
            </>
          )}
          {screen === "scores" && (
            <>
              <PageTitle
                overline="Evidence of your progress"
                title="Every effort has a story."
              />
              <div className="two-col">
                <section className="panel">
                  <h2>Your learning record</h2>
                  {data.attempts.length ? (
                    data.attempts
                      .slice()
                      .reverse()
                      .map((at) => (
                        <div className="score-row" key={at.id}>
                          <div>
                            <strong>
                              {
                                data.chunks.find((c) => c.id === at.chunkId)
                                  ?.title
                              }
                            </strong>
                            <small>
                              Attempt {at.form + 1} ·{" "}
                              {at.result?.status === "pending"
                                ? "Parent review"
                                : at.result?.passed
                                  ? "Passed"
                                  : at.submittedAt
                                    ? "Needs practice"
                                    : "In progress"}
                            </small>
                          </div>
                          <strong>
                            {at.result?.status === "final"
                              ? `${at.result.percent.toFixed(1)}%`
                              : "—"}
                          </strong>
                        </div>
                      ))
                  ) : (
                    <p>Your first submitted chunk will start your record.</p>
                  )}
                </section>
                <section className="panel">
                  <h2>The family leaderboard</h2>
                  <p className="fine">
                    Lifetime tickets earned. Spending never lowers your place.
                  </p>
                  {[
                    { name: "Aharon Zev", earned: data.lifetime },
                    ...data.siblings,
                  ]
                    .sort((a, b) => b.earned - a.earned)
                    .map((child, i) => (
                      <div className="leader-row" key={child.name}>
                        <span className="rank">{i + 1}</span>
                        <strong>{child.name}</strong>
                        <span>
                          {number(child.earned)} <Ticket size={14} />
                        </span>
                      </div>
                    ))}
                  <p className="fine">
                    Tobi and Ezra's learning paths come after this first pilot.
                  </p>
                </section>
              </div>
              <h2 className="section-heading">Arcade personal bests</h2>
              <div className="three-col">
                {["snake", "match", "rally"].map((g) => (
                  <div className="panel" key={g}>
                    <h3>
                      {g === "snake"
                        ? "Snake Trail"
                        : g === "match"
                          ? "Match Studio"
                          : "Rally Run"}
                    </h3>
                    <strong className="game-best">
                      {data.gameRuns.some((r) => r.game === g)
                        ? Math.max(
                            ...data.gameRuns
                              .filter((r) => r.game === g)
                              .map((r) => r.score),
                          )
                        : "—"}
                    </strong>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
        <footer className="app-footer">
          Local pilot · progress saves on this computer · AI, voice, and
          production accounts are not connected.
        </footer>
      </div>
    </div>
  );
}
function PageTitle({ overline, title }: { overline: string; title: string }) {
  return (
    <div>
      <p className="eyebrow">{overline}</p>
      <h1>{title}</h1>
    </div>
  );
}
function TicketBalance({ balance }: { balance: number }) {
  return (
    <div className="ticket-balance">
      <Ticket size={27} />
      <strong>{number(balance)}</strong>
      <span>
        tickets
        <br />
        to spend
      </span>
    </div>
  );
}
function Empty({
  title,
  text,
  action,
  label,
}: {
  title: string;
  text: string;
  action: () => void;
  label: string;
}) {
  return (
    <section className="panel empty">
      <Lock size={30} />
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primary" onClick={action}>
        {label}
      </button>
    </section>
  );
}
function BonusCard({
  icon,
  title,
  text,
  unlocked,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  unlocked: boolean;
  action: () => void;
}) {
  return (
    <article className={"panel bonus " + (!unlocked ? "locked" : "")}>
      <div className="bonus-top">
        {icon}
        <span className="chip">
          {unlocked ? (
            "Unlocked"
          ) : (
            <>
              <Lock size={12} /> Locked
            </>
          )}
        </span>
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button disabled={!unlocked} onClick={action}>
        {unlocked ? "Let’s play" : "Pass a chunk to play"}
        {unlocked && <ArrowRight size={15} />}
      </button>
    </article>
  );
}
function QuestionInput({
  question: q,
  answer,
  onChange,
  disabled,
}: {
  question: PublicQuestion;
  disabled: boolean;
  answer: Answer;
  onChange: (a: Answer) => void;
}) {
  if (q.kind === "choice")
    return (
      <div className="choices">
        {q.choices?.map((choice, i) => (
          <label
            key={choice}
            className={answer === choice ? "choice selected" : "choice"}
          >
            <input
              disabled={disabled}
              type="radio"
              name={q.id}
              checked={answer === choice}
              onChange={() => onChange(choice)}
            />
            <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
            <span>{choice}</span>
          </label>
        ))}
      </div>
    );
  if (q.kind === "match")
    return (
      <div className="matches">
        {q.left?.map((left) => (
          <label key={left}>
            <strong>{left}</strong>
            <select
              disabled={disabled}
              value={typeof answer === "object" ? (answer[left] ?? "") : ""}
              onChange={(e) =>
                onChange({
                  ...(typeof answer === "object" ? answer : {}),
                  [left]: e.target.value,
                })
              }
            >
              <option value="">Choose a connection…</option>
              {q.right?.map((right) => (
                <option key={right}>{right}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
    );
  return (
    <>
      <label className="sr-only" htmlFor={q.id}>
        Your explanation
      </label>
      <textarea
        disabled={disabled}
        id={q.id}
        value={typeof answer === "string" ? answer : ""}
        maxLength={5000}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Here's what I think, and why…"
        rows={6}
      />
    </>
  );
}
