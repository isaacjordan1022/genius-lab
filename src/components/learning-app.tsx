"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Flag,
  Gamepad2,
  Gift,
  House,
  Lock,
  Palette,
  Ticket,
  Trophy,
  Check,
  ArrowRight,
  Mic,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { topicEmoji, simpleTopics } from "@/lib/week-plan";
import type { AppState } from "@/lib/store";
import type { Answer, PublicQuestion } from "@/lib/content-types";
import GameRoom from "./games";
import LessonPlayer from "./lesson-player";
import ReadAlong from "./read-along";
import { WeeklyBonusTest } from "./bonus-learning";
import ConnectorMatch from "./connector-match";
import PrizeRoom from "./prize-room";
import { LearningAvatar } from "./avatar-lab";
import TicketDisplay from "./ticket-display";
import TicketWallet from "./ticket-wallet";
import GeniusLogo from "./genius-logo";
import "./app-skin.css";
import "./mission-shell.css";

type Screen =
  "home" | "week" | "lesson" | "mission" | "arcade" | "prizes" | "scores";
const NAV = [
  ["home", "Dashboard", House],
  ["week", "Weekly plan", BookOpen],
  ["mission", "Daily mission", Flag],
  ["arcade", "Open play", Gamepad2],
  ["prizes", "Prize Room", Gift],
  ["scores", "Scores & family", Trophy],
] as const;
const number = (n: number) => n.toLocaleString();
export default function LearningApp({
  initialScreen = "home",
}: { initialScreen?: Screen } = {}) {
  const [data, setData] = useState<AppState | null>(null),
    [screen, setScreen] = useState<Screen>(initialScreen),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [committing, setCommitting] = useState(false),
    [questionIndex, setQuestionIndex] = useState(0),
    [draftState, setDraftState] = useState<{
      questionId: string;
      answer: Answer;
    }>({ questionId: "", answer: "" }),
    [saveStatus, setSaveStatus] = useState(""),
    [game, setGame] = useState<"snake" | "match" | "rally" | null>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen]);
  const lessonLeaveGuard = useRef<null | (() => Promise<boolean>)>(null);
  const [preview, setPreview] = useState(false);
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
                ...(["save", "restartQuiz"].includes(String(body.action))
                  ? { revision: current.current?.revision }
                  : {}),
              }),
            }),
            json = await r.json();
          if (r.status === 401) {
            current.current = null;
            setData(null);
            window.location.replace("/login");
            return null;
          }
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
      (a?.contentVersion ?? 1) >= 2 ||
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
    if (lessonLeaveGuard.current && !(await lessonLeaveGuard.current())) return;
    const existing = data?.attempts
      .filter((at) => at.chunkId === chunkId)
      .at(-1);
    const state = await act(
      existing
        ? { action: "resume", attemptId: existing.id }
        : { action: "start", chunkId },
    );
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
      (a?.contentVersion ?? 1) < 2 &&
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
      if (lessonLeaveGuard.current && !(await lessonLeaveGuard.current()))
        return;
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
  async function signOut() {
    if (busy || committing) return;
    if (lessonLeaveGuard.current && !(await lessonLeaveGuard.current())) return;
    if (!(await persistDraft())) return;
    await queue.current;
    setCommitting(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok)
        throw new Error("Could not sign out. Please try again.");
      current.current = null;
      setData(null);
      window.location.replace("/login");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Could not sign out. Please try again.",
      );
      setCommitting(false);
    }
  }
  async function refresh() {
    try {
      const r = await fetch("/api/state", { cache: "no-store" });
      if (r.status === 401) {
        current.current = null;
        setData(null);
        window.location.replace("/login");
        return;
      }
      if (!r.ok) throw new Error("Could not refresh.");
      update(await r.json());
    } catch (e) {
      setError(String(e));
    }
  }
  if (!data)
    return (
      <main className="loading">
        <GeniusLogo className="genius-loading-logo" />
        <h1>Opening your lab…</h1>
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
  const chunk = [
      ...data.chunks,
      ...(data.discovery ? [data.discovery] : []),
      ...data.archivedLessons,
    ].find((c) => c.id === a?.chunkId),
    next = data.chunks.find((c) => !data.passed.includes(c.id)),
    unlocked = [...data.chunks, ...data.archivedLessons].some((c) =>
      data.passed.includes(c.id),
    ),
    pending = a?.result?.status === "pending",
    passed = a?.result?.passed,
    failed = a?.result?.status === "final" && !passed,
    finished = data.chunks.every((c) => data.passed.includes(c.id));
  const dailyLessons = data.chunks.filter((c) => !c.assessmentOnly);
  const publishedDays = dailyLessons.length;
  const publishedTopics = simpleTopics(
    data.chunks.flatMap((lesson) => lesson.subjects),
  );
  const masteredDays = dailyLessons.filter((lesson) =>
    data.passed.includes(lesson.id),
  ).length;
  const wholeWeekPublished =
    publishedDays >= 5 && data.chunks.some((c) => c.assessmentOnly);
  const lessonName = (title: string) =>
    title.replace(
      /^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Day \d+)\s*[·:—-]\s*/,
      "",
    );
  const nextIsActive = a?.chunkId === next?.id;
  const heading = finished
    ? wholeWeekPublished
      ? "A whole week of new ideas."
      : "Today’s learning is complete."
    : nextIsActive && pending
      ? "Your score is pending."
      : nextIsActive && failed
        ? "A little practice. A fresh start."
        : nextIsActive
          ? "Pick up where you left off."
          : next?.assessmentOnly
            ? "Ready for your weekly test?"
            : "Your next adventure starts here.";
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <Link
          href="/"
          className="brand genius-app-brand"
          onNavigate={(event) => {
            event.preventDefault();
            void navigate("home");
          }}
        >
          <GeniusLogo className="genius-nav-wordmark" />
          <GeniusLogo icon className="genius-nav-icon" />
        </Link>
        <div className="profile">
          <div className="profile-avatar">
            {data.profile.name
              .split(/\s+/)
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <strong>{data.profile.name}</strong>
            <small>Grade {data.profile.grade}</small>
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
          <button
            className="playground-link"
            onClick={() => {
              setPreview(true);
              void navigate("arcade");
            }}
          >
            <Gamepad2 size={18} /> Preview playground
          </button>
        </div>
        <button
          className="account-logout"
          onClick={() => void signOut()}
          disabled={busy || committing}
          aria-label="Sign out"
        >
          <LogOut size={21} />
          <span>Sign out</span>
        </button>
      </aside>
      <div className="main-wrap">
        <header className="app-top">
          <span>{data.weekTitle}</span>
          <TicketWallet balance={data.balance} lifetime={data.lifetime} />
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
                  <h1>Hi, {data.profile.name}.</h1>
                </div>
                <TicketBalance
                  balance={data.balance}
                  playerName={data.profile.name}
                />
              </div>
              <section className="continue-card">
                <div className="continue-copy">
                  <div className="chip">
                    <BookOpen size={15} />
                    {finished
                      ? wholeWeekPublished
                        ? "Week complete"
                        : "Daily lesson complete"
                      : next?.assessmentOnly
                        ? "Weekly test"
                        : `Day ${next?.order ?? 1}`}
                  </div>
                  <h2>{heading}</h2>
                  <p>
                    {next
                      ? lessonName(next.title)
                      : wholeWeekPublished
                        ? "You passed every daily lesson and the weekly test. Look back at what you learned."
                        : "Your first discoveries are saved. You can revisit your lesson or enjoy the arcade."}
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
                            ? "Continue"
                            : next?.assessmentOnly
                              ? "Begin"
                              : "Begin"}
                    <ArrowRight size={17} />
                  </button>
                  <small>
                    {pending && nextIsActive
                      ? "Score pending. Your answers are safely saved."
                      : "Your place saves as you go."}
                  </small>
                </div>
                <div className="lesson-progress">
                  <LearningAvatar
                    size={150}
                    mood={finished ? "celebrate" : "greeting"}
                  />
                  <span>
                    {masteredDays}
                    <small>/ {publishedDays}</small>
                  </span>
                  <p>
                    {publishedDays === 1
                      ? "daily lesson passed"
                      : "daily lessons passed"}
                  </p>
                  <div className="progress-dots">
                    {dailyLessons.map((c) => (
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
                    Weekly plan
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
                  Prize Room <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}
          {screen === "week" && (
            <>
              <PageTitle
                overline="Your learning journey"
                title="Your weekly plan"
              />
              <section className="week-command" aria-label="Weekly progress">
                <div>
                  <h2>Small steps. Big discoveries.</h2>
                  <p>
                    {wholeWeekPublished
                      ? "Five daily lessons, then your weekly challenge. Learn a little, try it out, and keep your ideas growing."
                      : `${publishedDays === 1 ? "Your first lesson is" : `${publishedDays} daily lessons are`} ready. Start at Day 1 and work at your own pace.`}
                  </p>
                </div>
                <div className="week-progress-summary">
                  <strong>
                    {masteredDays}
                    <span> / {publishedDays}</span>
                  </strong>
                  <span>
                    {publishedDays === 1
                      ? "daily lesson mastered"
                      : "daily lessons mastered"}
                  </span>
                  <progress
                    aria-label="Daily lessons mastered"
                    max={publishedDays}
                    value={masteredDays}
                  />
                </div>
              </section>
              <section className="week-topics" aria-label="This week's topics">
                <h2>What you’ll work on</h2>
                <div className="topic-badges">
                  {publishedTopics.map((label) => (
                    <span key={label}>
                      <span aria-hidden="true">{topicEmoji(label)}</span>{" "}
                      {label}
                    </span>
                  ))}
                </div>
              </section>
              <div className="week-list">
                {data.chunks.map((c) => {
                  const isPassed = data.passed.includes(c.id),
                    can = data.chunks
                      .filter((p) => p.order < c.order)
                      .every((p) => data.passed.includes(p.id)),
                    attempts = data.attempts.filter((a) => a.chunkId === c.id);
                  const latest = attempts.at(-1);
                  return (
                    <article
                      className={`week-item${isPassed ? " week-item--passed" : can ? " week-item--ready" : " week-item--locked"}`}
                      key={c.id}
                    >
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
                          {c.assessmentOnly ? "Weekly test" : `Day ${c.order}`}
                        </span>
                        <h3>{lessonName(c.title)}</h3>
                        <p>
                          {c.order === 6
                            ? "🏆 This week’s ideas"
                            : simpleTopics(c.subjects)
                                .map(
                                  (subject) =>
                                    `${topicEmoji(subject)} ${subject}`,
                                )
                                .join(" · ")}
                        </p>
                        {attempts.length > 0 && (
                          <small>
                            {attempts
                              .map(
                                (at, i) =>
                                  `Attempt ${i + 1}: ${at.result?.status === "final" ? at.result.percent.toFixed(1) + "%" : at.result?.status === "pending" ? "score pending" : "in progress"}`,
                              )
                              .join(" / ")}
                          </small>
                        )}
                      </div>
                      <button
                        disabled={busy || !can}
                        className={can && !isPassed ? "primary" : ""}
                        onClick={() => void start(c.id)}
                      >
                        {!can
                          ? "Locked"
                          : isPassed
                            ? "Review"
                            : latest
                              ? "Continue"
                              : "Enter"}
                        {can ? <ArrowRight size={18} /> : <Lock size={18} />}
                      </button>
                      <ol
                        className="week-inline-chunks"
                        aria-label={`${c.title} chunks`}
                      >
                        {c.chunks.map((section, index) => {
                          const ids =
                            section.questionIds[
                              (latest?.form ?? 0) % section.questionIds.length
                            ] ?? [];
                          const submitted =
                            !!latest?.submittedChunkIds?.includes(section.id) ||
                            !!latest?.submittedAt;
                          const scored =
                            submitted &&
                            ids.length > 0 &&
                            ids.every(
                              (id) => typeof latest?.scores[id] === "number",
                            );
                          const percent = scored
                            ? Math.round(
                                (ids.reduce(
                                  (total, id) =>
                                    total + (latest?.scores[id] ?? 0),
                                  0,
                                ) /
                                  (ids.length * 4)) *
                                  100,
                              )
                            : null;
                          const status =
                            percent !== null
                              ? `${percent}%`
                              : submitted
                                ? "Score pending"
                                : latest?.taughtChunkIds?.includes(section.id)
                                  ? "In progress"
                                  : !can
                                    ? "Locked"
                                    : "Ready to explore";
                          return (
                            <li
                              key={section.id}
                              className={scored ? "chunk-scored" : ""}
                            >
                              <span className="chunk-count">{index + 1}</span>
                              <div>
                                <strong>{section.title}</strong>
                                <span>
                                  {simpleTopics(section.subjects).join(" · ")}
                                </span>
                              </div>
                              <span className="chunk-status">{status}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </article>
                  );
                })}
              </div>
              {wholeWeekPublished && (
                <WeeklyBonusTest
                  state={data}
                  onAction={act}
                  leaveGuard={lessonLeaveGuard}
                />
              )}
              {data.discovery && (
                <article className="weekly-discovery">
                  <span className="discovery-icon" aria-hidden="true">
                    🌉
                  </span>
                  <div>
                    <span className="eyebrow">How things work</span>
                    <h2>What holds a bridge up?</h2>
                    <p>
                      Peek inside. Follow the weight. Think like an engineer.
                    </p>
                  </div>
                  <button
                    disabled={busy}
                    onClick={() => void start(data.discovery!.id)}
                  >
                    Enter <ArrowRight size={18} />
                  </button>
                </article>
              )}
            </>
          )}
          {screen === "lesson" && a && (a.contentVersion ?? 1) >= 2 && (
            <LessonPlayer
              key={a.id}
              state={data}
              onAction={act}
              leaveGuard={lessonLeaveGuard}
              onWeek={() => void navigate("week")}
              onPlan={() => void navigate("week")}
            />
          )}
          {screen === "lesson" &&
            (a?.contentVersion ?? 1) < 2 &&
            (!a ? (
              <Empty
                title="Start with your weekly plan."
                text="Choose your first available daily lesson to begin."
                action={() => navigate("week")}
                label="Open my plan"
              />
            ) : a.submittedAt ? (
              <>
                <PageTitle
                  overline={`${chunk?.title} · attempt ${a.form + 1}`}
                  title={
                    pending
                      ? "Your score is pending."
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
                        ? "Your answers are saved. Your score will appear here when it is ready."
                        : passed
                          ? "Your next lesson and arcade are unlocked. Your earned tickets are saved."
                          : "Read the explanations below, then try an equivalent set of fresh questions. You need 90% to continue."}
                    </p>
                    {pending ? (
                      <button onClick={() => void refresh()}>
                        <RefreshCw size={16} /> Refresh scores
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
                    <ReadAlong
                      text={
                        chunk?.teaching
                          .map((block) => block.title + ". " + block.text)
                          .join("\n\n") ?? ""
                      }
                    />
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
              {!(
                (unlocked || preview) &&
                (screen === "mission" || game === "rally")
              ) && (
                <>
                  <PageTitle
                    overline={
                      screen === "mission"
                        ? "The daily review game"
                        : preview
                          ? "Preview playground"
                          : "Your open-play arcade"
                    }
                    title={
                      screen === "mission"
                        ? `${new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" })} Rally`
                        : "Choose your next game."
                    }
                  />
                  <div className="preview-bar">
                    <div>
                      <strong>
                        {preview ? "Preview playground" : "Your earned play"}
                      </strong>
                      <p>
                        {preview
                          ? "Try every game. Preview scores, tickets and lesson progress are never saved."
                          : "Your game scores stay in your personal record."}
                      </p>
                    </div>
                    <button
                      aria-pressed={preview}
                      onClick={() => {
                        setGame(null);
                        setPreview(!preview);
                      }}
                    >
                      {preview ? "Leave preview" : "Preview all games"}
                    </button>
                  </div>
                </>
              )}
              {!unlocked && !preview ? (
                <Empty
                  title="Your first pass opens the arcade."
                  text="Finish a daily lesson with 90% or better, or try every game in the preview playground."
                  action={() => void continueLesson()}
                  label="Continue"
                />
              ) : screen === "mission" || game ? (
                <section
                  className={
                    screen === "mission" || game === "rally"
                      ? "mission-shell"
                      : "arcade-session"
                  }
                >
                  <div className="mission-shell-bar">
                    <button
                      className="text-button"
                      onClick={() => {
                        setGame(null);
                        if (screen === "mission") navigate("arcade");
                      }}
                    >
                      ← Exit
                    </button>
                    {(screen === "mission" || game === "rally") && (
                      <>
                        <h1>
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            timeZone: "America/New_York",
                          })}{" "}
                          Rally
                        </h1>
                        <span className="mission-mode">
                          {preview ? "Preview · no scores saved" : "Review run"}
                        </span>
                      </>
                    )}
                  </div>
                  <GameRoom
                    key={`${preview ? "preview" : "earned"}-${screen}-${game}`}
                    preview={preview}
                    reviewQuestions={data.missionQuestions}
                    game={screen === "mission" ? "rally" : game!}
                    onFinish={async (score: number, runId: string) => {
                      if (preview) return true;
                      return !!(await act({
                        action: "game",
                        game: screen === "mission" ? "rally" : game,
                        score,
                        runId,
                      }));
                    }}
                  />
                  <p className="fine">
                    {preview
                      ? "Preview runs are just for trying things out."
                      : "These games earn practice points. Prize tickets come from your learning."}
                  </p>
                </section>
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
            <PrizeRoom
              state={data}
              busy={busy}
              error={error}
              onOrder={async (prize, key) =>
                !!(await act({
                  action: "checkout",
                  prizeId: prize.id,
                  cost: prize.cost,
                  checkoutId: key,
                }))
              }
            />
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
                                [
                                  ...data.chunks,
                                  ...(data.discovery ? [data.discovery] : []),
                                  ...data.archivedLessons,
                                ].find((c) => c.id === at.chunkId)?.title
                              }
                            </strong>
                            <small>
                              Attempt {at.form + 1} ·{" "}
                              {at.result?.status === "pending"
                                ? "Score pending"
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
                    <p>Your first submitted lesson will start your record.</p>
                  )}
                </section>
                <section className="panel">
                  <h2>The family leaderboard</h2>
                  <p className="fine">
                    Lifetime tickets earned. Spending never lowers your place.
                  </p>
                  {[
                    { name: data.profile.name, earned: data.lifetime },
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
          One good question can open a whole new world.
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
function TicketBalance({
  balance,
  playerName,
}: {
  balance: number;
  playerName: string;
}) {
  return (
    <div className="ticket-balance ticket-balance--illustrated">
      <TicketDisplay balance={balance} playerName={playerName} />
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
        {unlocked ? "Let’s play" : "Locked"}
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
      <ConnectorMatch
        question={q}
        answer={answer}
        onChange={onChange}
        disabled={disabled}
      />
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
