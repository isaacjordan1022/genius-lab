"use client";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import type { AppState } from "@/lib/store";
import type { Answer, PublicQuestion } from "@/lib/content-types";
import TeachingCards from "./teaching-cards";
import ConnectorMatch from "./connector-match";
import ReadAlong from "./read-along";
import SpeakAnswer from "./speak-answer";
import { ChunkBonus } from "./bonus-learning";
import { Check, LockKeyhole, Sparkles } from "lucide-react";
import { simpleTopics } from "@/lib/week-plan";
import { assessmentResult } from "@/lib/rules";
import "./lesson-player.css";

type Props = {
  state: AppState;
  onAction: (body: Record<string, unknown>) => Promise<AppState | null>;
  onPlan: () => void;
  onWeek: () => void;
  leaveGuard: MutableRefObject<null | (() => Promise<boolean>)>;
};
const ready = (q: PublicQuestion, answer: Answer | undefined) =>
  q.kind === "match"
    ? typeof answer === "object" && (q.left ?? []).every((key) => !!answer[key])
    : typeof answer === "string" && !!answer.trim();
export default function LessonPlayer({
  state,
  onAction,
  onWeek,
  leaveGuard,
}: Props) {
  const attempt = state.active!;
  const lesson = [...state.chunks, ...(state.discovery ? [state.discovery] : []), ...state.archivedLessons].find(
    (c) => c.id === attempt.chunkId,
  )!;
  const sections = lesson.chunks;
  const firstUnfinished = sections.findIndex(
    (c) => !attempt.submittedChunkIds?.includes(c.id),
  );
  const [sectionIndex, setSectionIndex] = useState(
    Math.max(0, firstUnfinished),
  );
  const section = sections[sectionIndex];
  const questions = section
    ? attempt.questions.filter((q) =>
        section.questionIds[attempt.form].includes(q.id),
      )
    : attempt.questions;
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      questions.findIndex((q) => !ready(q, attempt.answers[q.id])),
    ),
  );
  const q = questions[index] ?? questions[0];
  const answerTickets = state.rewardPolicy === "correct-answers";
  const quizEvents = new Set(questions.map(item => `answer:${lesson.id}:${attempt.questions.findIndex(q => q.id === item.id)}`));
  const quizTickets = state.ledger.filter(entry => answerTickets ? quizEvents.has(entry.event) : entry.event === `chunk-pass:${section?.id}`).reduce((sum, entry) => sum + entry.amount, 0);
  const lessonTickets = state.ledger.filter(entry => entry.event === `pass:${lesson.id}` || entry.event.startsWith(`answer:${lesson.id}:`) || sections.some(c => entry.event === `chunk-pass:${c.id}`)).reduce((sum, entry) => sum + entry.amount, 0);
  const locked =
    !!attempt.submittedAt ||
    !!(section && attempt.submittedChunkIds?.includes(section.id));
  const taught = lesson.assessmentOnly
    ? attempt.taught
    : !!(section && attempt.taughtChunkIds?.includes(section.id));
  const [draft, setDraft] = useState<{ id: string; answer: Answer }>({
    id: q.id,
    answer: attempt.answers[q.id] ?? (q.kind === "match" ? {} : ""),
  });
  const [saving, setSaving] = useState("Saved");
  const [working, setWorking] = useState(false);
  const [voiceBusy, setVoiceBusy] = useState(false);
  const [bonusBusy, setBonusBusy] = useState(false);
  const [showMaterialDrawer, setShowMaterialDrawer] = useState(false);
  const bonusLeaveGuard = useRef<null | (() => Promise<boolean>)>(null);
  const [review, setReview] = useState(locked);
  const current = useRef({ attempt, q, draft, locked, taught, voiceBusy, bonusBusy });
  current.current = { attempt, q, draft, locked, taught, voiceBusy, bonusBusy };
  useEffect(() => {
    setDraft({
      id: q.id,
      answer: attempt.answers[q.id] ?? (q.kind === "match" ? {} : ""),
    });
    setSaving("Saved");
  }, [q.id, attempt.id]); // Server saves must not overwrite newer typing.
  async function flush() {
    const {
      attempt: a,
      q: item,
      draft: d,
      locked: l,
      taught: t,
    } = current.current;
    if (
      !t ||
      l ||
      d.id !== item.id ||
      JSON.stringify(a.answers[item.id]) === JSON.stringify(d.answer)
    )
      return true;
    setSaving("Saving…");
    const result = await onAction({
      action: "save",
      attemptId: a.id,
      questionId: item.id,
      answer: d.answer,
    });
    setSaving(result ? "Saved" : "Not saved — try again");
    return !!result;
  }
  useEffect(() => {
    leaveGuard.current = async () => {
      if (current.current.voiceBusy || current.current.bonusBusy) return false;
      setWorking(true);
      try {
        if (bonusLeaveGuard.current && !await bonusLeaveGuard.current()) return false;
        return await flush();
      } finally { setWorking(false); }
    };
    return () => {
      leaveGuard.current = null;
    };
  });
  useEffect(() => {
    if (
      !taught ||
      locked ||
      draft.id !== q.id ||
      JSON.stringify(attempt.answers[q.id]) === JSON.stringify(draft.answer)
    )
      return;
    setSaving("Saving…");
    const timer = setTimeout(() => {
      void flush();
    }, 500);
    return () => clearTimeout(timer);
  }, [draft, q.id, locked, taught]);
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      const c = current.current;
      if (
        c.taught &&
        !c.locked &&
        c.draft.id === c.q.id &&
        JSON.stringify(c.attempt.answers[c.q.id]) !==
          JSON.stringify(c.draft.answer)
      ) {
        event.preventDefault();
      }
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  async function changeQuestion(next: number) {
    setWorking(true);
    try {
      if (await flush()) setIndex(next);
    } finally {
      setWorking(false);
    }
  }
  async function changeSection(next: number) {
    if (voiceBusy || bonusBusy) return;
    setWorking(true);
    try {
      if (bonusLeaveGuard.current && !await bonusLeaveGuard.current()) return;
      if (await flush()) {
        setSectionIndex(next);
        setIndex(0);
        setReview(!!attempt.submittedChunkIds?.includes(sections[next].id));
      }
    } finally {
      setWorking(false);
    }
  }
  async function advance() {
    if (working || voiceBusy || !ready(q, draft.answer)) return;
    setWorking(true);
    try {
      if (!(await flush())) return;
      if (index < questions.length - 1) setIndex(index + 1);
      else {
        const result = await onAction({
          action: section ? "submitChunk" : "submit",
          attemptId: attempt.id,
          ...(section ? { chunkId: section.id } : {}),
        });
        if (result) setReview(true);
      }
    } finally {
      setWorking(false);
    }
  }
  const total = attempt.result;
  return (
    <section className="lesson-player">
      <div className="lesson-breadcrumb">
        <button onClick={onWeek} disabled={working || voiceBusy || bonusBusy}>
          ← Weekly plan
        </button>

        <span className="lesson-save" aria-live="polite">
          {saving}
        </span>
      </div>
      <header className="lesson-heading">
        <p className="eyebrow">
          {lesson.assessmentOnly
            ? "Weekly test · take your time"
            : lesson.order === 0
              ? "How things work"
              : `Day ${lesson.order}`}
        </p>
        <h1>{lesson.title.replace(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\s*·\s*/, "")}</h1>
        {lesson.assessmentOnly && (
          <p>Try it without your notes. Take your time.</p>
        )}
      </header>
      {!!sections.length && (
        <nav className="lesson-route" aria-label="Lesson chunks">
          {sections.map((c, i) => {
            const submitted = attempt.submittedChunkIds?.includes(c.id);
            const ids = c.questionIds[attempt.form];
            const result = submitted ? assessmentResult(ids.map(id => attempt.scores[id] ?? null), ids.length) : null;
            const current = sectionIndex === i;
            const unavailable = i > 0 && !attempt.submittedChunkIds?.includes(sections[i - 1].id);
            const subject = simpleTopics(c.subjects)[0] ?? c.title;
            return (
              <button key={c.id}
                disabled={working || voiceBusy || bonusBusy || unavailable}
                aria-current={current ? "step" : undefined}
                aria-label={`${c.title}${result?.status === "final" ? `, ${result.percent}%` : ""}`}
                onClick={() => void changeSection(i)}>
                <span className="lesson-route-node" aria-hidden="true">
                  {result?.passed ? <Check size={21} /> : unavailable ? <LockKeyhole size={19} /> : i + 1}
                </span>
                <span className="lesson-route-label">{subject}
                  <small>{result?.status === "final" ? `${result.percent}%` : submitted ? "Checking…" : current ? "You’re here" : unavailable ? "Up next" : "Ready"}</small>
                </span>
              </button>
            );
          })}
        </nav>
      )}
      {attempt.submittedAt && (
        <div className="lesson-day-result" role="status">
          <h2>
            {total?.status === "pending"
              ? "Your ideas are ready for review."
              : total?.passed
                ? "Nicely done!"
                : "A few ideas need another look."}
          </h2>
          <p>
            {total?.status === "pending"
              ? "Your written answers are being reviewed."
              : `Learning score: ${total?.points} / ${total?.maxPoints} (${total?.percent.toFixed(1)}%).`}
          </p>
          {total?.passed && lesson.order > 0 && (
            <strong>{lessonTickets} tickets earned for this lesson!</strong>
          )}
          {total?.status === "final" && !total.passed && (
            <button
              disabled={working || attempt.form >= 1}
              onClick={() =>
                void onAction({ action: "start", chunkId: lesson.id })
              }
            >
              {attempt.form >= 1
                ? "Practice sets complete"
                : "Try again"}
            </button>
          )}
          <button onClick={() => void onAction({ action: "enter" })}>
            Refresh score
          </button>
        </div>
      )}
      {!taught && !locked ? (
        <div className="lesson-teach">
          <div className="section-heading">
            <h2>{section ? section.title : "Ready for your weekly test?"}</h2>
            {!section && <span>{questions.length} mixed activities</span>}
          </div>
          {section && (
            <TeachingCards key={section.id} blocks={section.teaching} />
          )}
          <button
            className="primary"
            disabled={working || voiceBusy || bonusBusy}
            onClick={async () => {
              setWorking(true);
              try {
                await onAction({
                  action: "taught",
                  attemptId: attempt.id,
                  ...(section ? { chunkId: section.id } : {}),
                });
              } finally {
                setWorking(false);
              }
            }}
          >
            {section ? "Try it" : "Begin"}
          </button>
        </div>
      ) : locked && review ? (
        <div className="chunk-review">
          <h2>
            {section ? "See what clicked!" : "Your test is saved."}
          </h2>
          {quizTickets > 0 ? <strong className="quiz-ticket-reward">🎟 {quizTickets} tickets earned!</strong> : <p>{answerTickets ? "Each correct answer earns 5 tickets." : lesson.version === 3 && section ? "90% earns 30 tickets." : "These points show your understanding."}</p>}
          {questions.map((item, i) => (
            <article className="answer-reflection" key={item.id}>
              <div className="reflection-topline">
                <span className="reflection-number">Question {i + 1}</span>
                <span className="reflection-score">
                  {attempt.scores[item.id] === 4 && <Sparkles size={20} aria-hidden="true" />}
                  {attempt.scores[item.id] == null ? "Checking…" : `${attempt.scores[item.id]} / 4 points`}
                </span>
              </div>
              <h3>{item.prompt}</h3>
              <div className="response-recap">
                <b className="response-label">Your answer</b>
                {typeof attempt.answers[item.id] === "string"
                  ? (attempt.answers[item.id] as string)
                  : Object.entries(attempt.answers[item.id] ?? {}).map(
                      ([left, right]) => (
                        <p key={left}>
                          {left} → {right}
                        </p>
                      ),
                    )}
              </div>
              <div className="reflection-squiggle" aria-hidden="true" />
              {item.explanation && (
                <p className="answer-explanation">
                  <b>
                    {attempt.scores[item.id] === 4
                      ? "Why it works: "
                      : "Let's unpack it: "}
                  </b>
                  {item.explanation}
                </p>
              )}
              {item.rubric && (
                <details>
                  <summary>What good thinking includes</summary>
                  <ul>
                    {item.rubric.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </details>
              )}
            </article>
          ))}

          {attempt.aiStatus === "pending" && <div role="status"><p>{attempt.aiMessage}</p><button disabled={working} onClick={async () => { setWorking(true); try { await onAction({ action: "retryAI", attemptId: attempt.id }); } finally { setWorking(false); } }}>{working ? "Checking…" : "Check again"}</button></div>}
          {section && <ChunkBonus key={section.id} state={state} attemptId={attempt.id} chunkId={section.id} onAction={onAction} leaveGuard={bonusLeaveGuard} onBusy={setBonusBusy} />}
          {sectionIndex < sections.length - 1 && (
            <button
              className="primary"
              disabled={working || voiceBusy || bonusBusy}
              onClick={() => void changeSection(sectionIndex + 1)}
            >
              Continue
            </button>
          )}
        </div>
      ) : (
        <div className="lesson-activity" data-narration-scope>
          <div className="quiz-exit-controls">
            {!lesson.assessmentOnly && (
              <button
                type="button"
                className="back-to-material-btn"
                disabled={working || voiceBusy || bonusBusy}
                onClick={async () => {
                  setWorking(true);
                  window.dispatchEvent(new Event("arcade-stop-audio"));
                  try {
                    if (!(await flush())) return;
                    await onAction({
                      action: "reopenTeaching",
                      attemptId: attempt.id,
                      ...(section ? { chunkId: section.id } : {}),
                    });
                  } finally {
                    setWorking(false);
                  }
                }}
              >
                ← Back to story &amp; material
              </button>
            )}
            {section && section.teaching.length > 0 && (
              <button
                type="button"
                aria-pressed={showMaterialDrawer}
                disabled={working || voiceBusy || bonusBusy}
                onClick={() => setShowMaterialDrawer(!showMaterialDrawer)}
              >
                {showMaterialDrawer ? "Hide story & diagrams" : "📖 Peek at story & diagrams"}
              </button>
            )}
            <button disabled={working || voiceBusy || bonusBusy} onClick={onWeek}>Quit</button>
            <button disabled={working || voiceBusy || bonusBusy} onClick={async () => {
              setWorking(true);
              window.dispatchEvent(new Event("arcade-stop-audio"));
              try {
                if (!await flush()) return;
                const result = await onAction({ action: "restartQuiz", attemptId: attempt.id, ...(section ? { chunkId: section.id } : {}) });
                if (result) { setIndex(0); const first = questions[0]; setDraft({ id: first.id, answer: first.kind === "match" ? {} : "" }); setSaving("Saved"); }
              } finally { setWorking(false); }
            }}>Restart quiz</button>
          </div>
          {showMaterialDrawer && section && section.teaching.length > 0 && (
            <div className="quiz-material-drawer">
              <TeachingCards key={`${section.id}-drawer`} blocks={section.teaching} compact />
            </div>
          )}
          <div className="activity-topline">
            <span className="eyebrow">
              Question {index + 1} of {questions.length} ·{" "}
              {q.kind === "choice"
                ? "Make a choice"
                : q.kind === "match"
                  ? "Make connections"
                  : "Explain your thinking"}
            </span>
            <span>Worth 4 learning points</span>
          </div>
          <div className="activity-dots" aria-label="Question progress">
            {questions.map((item, i) => (
              <button
                key={item.id}
                disabled={working || voiceBusy || bonusBusy}
                aria-label={`Question ${i + 1}`}
                aria-current={i === index ? "step" : undefined}
                onClick={() => void changeQuestion(i)}
              >
                {ready(item, attempt.answers[item.id]) ? "✓" : i + 1}
              </button>
            ))}
          </div>
          <h2 data-narration-text>{q.prompt}</h2>
          {q.kind !== "open" && <ReadAlong key={q.id + "voice"} text={[q.prompt, ...(q.choices ?? [])].join("\n")} />}
          <ActivityInput
            key={`${q.id}-${attempt.quizRestarts?.length ?? 0}`}
            question={q}
            onVoiceBusy={setVoiceBusy}
            answer={
              draft.id === q.id ? draft.answer : (attempt.answers[q.id] ?? "")
            }
            disabled={working || locked}
            onChange={(answer) => setDraft({ id: q.id, answer })}
          />
          <div className="lesson-controls">
            <button
              disabled={working || voiceBusy || index === 0}
              onClick={() => void changeQuestion(index - 1)}
            >
              Back
            </button>
            <button
              className="primary"
              disabled={working || voiceBusy || !ready(q, draft.answer)}
              onClick={() => void advance()}
            >
              {index === questions.length - 1 ? "Save & see feedback" : "Next"}
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
function ActivityInput({
  question: q,
  answer,
  onChange,
  disabled,
  onVoiceBusy,
}: {
  question: PublicQuestion;
  answer: Answer;
  onChange: (a: Answer) => void;
  disabled: boolean;
  onVoiceBusy: (busy: boolean) => void;
}) {
  const [recordingBusy, setRecordingBusy] = useState(false);
  if (q.kind === "match")
    return (
      <ConnectorMatch
        question={q}
        answer={answer}
        onChange={onChange}
        disabled={disabled}
      />
    );
  if (q.kind === "choice")
    return (
      <div className="choices">
        {q.choices?.map((choice, i) => (
          <label
            className={`choice ${answer === choice ? "selected" : ""}`}
            key={choice}
          >
            <input
              type="radio"
              name={q.id}
              checked={answer === choice}
              disabled={disabled}
              onChange={() => onChange(choice)}
            />
            <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
            <span data-narration-text>{choice}</span>
          </label>
        ))}
      </div>
    );
  return (
    <div className="thinking-input">
      <div className="voice-controls"><ReadAlong text={q.prompt} disabled={recordingBusy} /><SpeakAnswer disabled={disabled} onText={onChange} onBusy={busy => { setRecordingBusy(busy); onVoiceBusy(busy); }} /></div>
      <label htmlFor={`answer-${q.id}`}>Your ideas + your reasons</label>
      <textarea
        id={`answer-${q.id}`}
        value={typeof answer === "string" ? answer : ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        maxLength={5000}
        rows={5}
        placeholder="I think… My reason is… A detail that helps me is…"
      />
      <small>
        Give your idea and a reason. There can be more than one good answer.
      </small>
    </div>
  );
}
