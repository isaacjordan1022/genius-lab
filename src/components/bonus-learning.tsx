"use client";
import { useEffect, useRef, useState, type MutableRefObject } from "react";
import type { AppState } from "@/lib/store";
import ReadAlong from "./read-along";
import SpeakAnswer from "./speak-answer";

type Action = (body: Record<string, unknown>) => Promise<AppState | null>;
type GuardProps = {
  leaveGuard?: MutableRefObject<null | (() => Promise<boolean>)>;
  onBusy?: (busy: boolean) => void;
};
type Drafts = Record<string, string>;

// Keep the acknowledged snapshot separate from incoming server renders so an
// older response cannot replace a newer local answer.
function useBonusDrafts({
  id,
  initial,
  locked,
  blocked,
  save,
  leaveGuard,
  onBusy,
}: {
  id?: string;
  initial: Drafts;
  locked: boolean;
  blocked: boolean;
  save: (key: string, value: string) => Promise<AppState | null>;
} & GuardProps) {
  const [drafts, setDrafts] = useState<Drafts>(initial);
  const [flushing, setFlushing] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const values = useRef(initial);
  const acknowledged = useRef(initial);
  const pending = useRef<Promise<boolean> | null>(null);
  const frozen = useRef(false);
  const latest = useRef({ id, locked, blocked, save });
  latest.current = { id, locked, blocked, save };
  const busyCallback = useRef(onBusy);
  busyCallback.current = onBusy;
  const isDirty = () =>
    !latest.current.locked &&
    Object.entries(values.current).some(
      ([key, value]) => value !== (acknowledged.current[key] ?? ""),
    );

  useEffect(() => {
    values.current = initial;
    acknowledged.current = initial;
    setDrafts(initial);
    setSaveStatus("Saved");
  }, [id]); // Only a different record may replace the current drafts.

  function change(key: string, value: string) {
    if (frozen.current || latest.current.locked) return;
    values.current = { ...values.current, [key]: value };
    setDrafts(values.current);
    setSaveStatus("Not saved yet");
  }
  async function flush(): Promise<boolean> {
    if (pending.current) return pending.current;
    if (latest.current.blocked) return false;
    if (!latest.current.id || latest.current.locked || !isDirty()) return true;
    frozen.current = true;
    setFlushing(true);
    setSaveStatus("Saving…");
    const recordId = latest.current.id;
    const snapshot = { ...values.current };
    const saveItem = latest.current.save;
    const run = Promise.resolve().then(async () => {
      try {
        for (const [key, value] of Object.entries(snapshot)) {
          if (value === (acknowledged.current[key] ?? "")) continue;
          if (!(await saveItem(key, value))) {
            setSaveStatus("Not saved — try again");
            return false;
          }
          if (latest.current.id !== recordId) return false;
          acknowledged.current = { ...acknowledged.current, [key]: value };
        }
        setSaveStatus("Saved");
        return true;
      } catch {
        setSaveStatus("Not saved — try again");
        return false;
      } finally {
        frozen.current = false;
        pending.current = null;
        setFlushing(false);
      }
    });
    pending.current = run;
    return run;
  }
  useEffect(() => {
    if (locked || blocked || !isDirty()) return;
    const timer = setTimeout(() => {
      void flush();
    }, 500);
    return () => clearTimeout(timer);
  }, [drafts, id, locked, blocked]);
  useEffect(() => {
    if (!leaveGuard) return;
    const guard = () =>
      latest.current.blocked ? Promise.resolve(false) : flush();
    leaveGuard.current = guard;
    return () => {
      if (leaveGuard.current === guard) leaveGuard.current = null;
    };
  });
  useEffect(() => {
    busyCallback.current?.(blocked || flushing);
  }, [blocked, flushing]);
  useEffect(() => {
    function warn(event: BeforeUnloadEvent) {
      if (isDirty() || latest.current.blocked || frozen.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", warn);
    return () => {
      window.removeEventListener("beforeunload", warn);
      busyCallback.current?.(false);
    };
  }, []);
  return { drafts, change, flush, flushing, saveStatus };
}

export function ChunkBonus({
  state,
  attemptId,
  chunkId,
  onAction,
  leaveGuard,
  onBusy,
}: {
  state: AppState;
  attemptId: string;
  chunkId: string;
  onAction: Action;
} & GuardProps) {
  const record = state.bonusBank.find((b) => b.chunkId === chunkId);
  const [busy, setBusy] = useState(false);
  const [voiceBusy, setVoiceBusy] = useState(false);
  const { drafts, change, flush, flushing, saveStatus } = useBonusDrafts({
    id: record?.id,
    initial: { answer: String(record?.answer ?? "") },
    locked: !!record?.submittedAt,
    blocked: busy || voiceBusy,
    save: (_key, answer) =>
      onAction({ action: "saveBonus", bonusId: record!.id, answer }),
    leaveGuard,
    onBusy,
  });
  const answer = drafts.answer ?? "";
  async function act(body: Record<string, unknown>) {
    if (busy || voiceBusy || !(await flush())) return;
    setBusy(true);
    try {
      await onAction(body);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="bonus-learning" data-narration-scope>
      <span className="eyebrow">★ A little extra</span>
      <h2>Bonus discovery</h2>
      {!record ? (
        <>
          <p>One new challenge. Up to 5 extra tickets.</p>
          <button
            disabled={busy}
            onClick={() => void act({ action: "bonus", attemptId, chunkId })}
          >
            {busy ? "Tick is thinking…" : "Try a bonus"}
          </button>
        </>
      ) : (
        <>
          <h3 data-narration-text>{record.question.prompt}</h3>
          {record.submittedAt && <ReadAlong text={record.question.prompt} />}
          {!record.submittedAt ? (
            <>
              <div className="voice-controls"><ReadAlong text={record.question.prompt} disabled={voiceBusy} /><SpeakAnswer
                disabled={busy || flushing}
                onText={(text) => change("answer", text)}
                onBusy={setVoiceBusy}
              /></div>
              <label htmlFor={`bonus-answer-${record.id}`}>Your idea</label>
              <textarea
                id={`bonus-answer-${record.id}`}
                value={answer}
                disabled={busy || voiceBusy || flushing}
                onChange={(e) => change("answer", e.target.value)}
                maxLength={5000}
                rows={4}
              />
              <p role="status">{saveStatus}</p>
              <button
                disabled={busy || voiceBusy || flushing || !answer.trim()}
                onClick={() =>
                  void act({
                    action: "answerBonus",
                    bonusId: record.id,
                    answer,
                  })
                }
              >
                {busy ? "Checking…" : "Check my idea"}
              </button>
            </>
          ) : (
            <>
              <p className="response-recap">{String(record.answer ?? "")}</p>
              {record.grade ? (
                <>
                  <strong>
                    {record.grade.points} of 4 learning points
                    {record.ticketsEarned
                      ? ` · +${record.ticketsEarned} tickets!`
                      : ""}
                  </strong>
                  <p>{record.grade.feedback}</p>
                  <p>{record.explanation}</p>
                  <span>Saved for your extra-credit test.</span>
                </>
              ) : (
                <>
                  <p>
                    {record.error || "Your answer is saved. Score pending."}
                  </p>
                  <button
                    disabled={busy}
                    onClick={() =>
                      void act({ action: "retryBonus", bonusId: record.id })
                    }
                  >
                    {busy ? "Checking…" : "Check again"}
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export function WeeklyBonusTest({
  state,
  onAction,
  leaveGuard,
  onBusy,
}: { state: AppState; onAction: Action } & GuardProps) {
  const test = state.bonusTests.at(-1);
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState(false);
  const { drafts, change, flush, flushing, saveStatus } = useBonusDrafts({
    id: test?.id,
    initial: Object.fromEntries(
      test?.questions.map((q) => [q.id, String(test.answers[q.id] ?? "")]) ??
        [],
    ),
    locked: !!test?.submittedAt,
    blocked: busy,
    save: (questionId, answer) =>
      onAction({
        action: "saveBonusTest",
        testId: test!.id,
        questionId,
        answer,
      }),
    leaveGuard,
    onBusy,
  });
  const eligible = state.bonusBank.filter((b) => b.grade).length;
  const weekReady = state.chunks
    .filter((c) => c.order < 6)
    .every((c) => state.passed.includes(c.id));
  async function start() {
    if (busy) return;
    setBusy(true);
    try {
      if (!test && !(await onAction({ action: "bonusTest" }))) return;
      setOpen(true);
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    if (!test || busy || !(await flush())) return;
    setBusy(true);
    try {
      await onAction({ action: "submitBonusTest", testId: test.id });
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="bonus-learning">
      <span className="eyebrow">★ Extra credit</span>
      <h2>Your bonus discoveries</h2>
      <p>
        {eligible} {eligible === 1 ? "discovery" : "discoveries"} saved this
        week.
      </p>
      {!open ? (
        <button
          disabled={busy || !eligible || !weekReady}
          onClick={() => void start()}
        >
          {!weekReady
            ? "Finish five daily lessons to unlock"
            : test
              ? "Continue extra credit"
              : "Begin extra credit"}
        </button>
      ) : (
        test && (
          <>
            {test.questions.map((q, i) => (
              <article className="bonus-test-item" key={q.id}>
                <h3>
                  {i + 1}. {q.prompt}
                </h3>
                <ReadAlong text={q.prompt} />
                {test.submittedAt ? (
                  <>
                    <p>{String(test.answers[q.id] ?? "")}</p>
                    <p>
                      {test.grades[q.id]?.feedback ||
                        "Your answer is saved. Score pending."}
                    </p>
                  </>
                ) : (
                  <>
                    <label htmlFor={`bonus-test-${q.id}`}>Your idea</label>
                    <textarea
                      id={`bonus-test-${q.id}`}
                      rows={3}
                      maxLength={5000}
                      disabled={busy || flushing}
                      value={drafts[q.id] ?? ""}
                      onChange={(e) => change(q.id, e.target.value)}
                    />
                  </>
                )}
              </article>
            ))}
            {!test.submittedAt ? (
              <>
                <p role="status">{saveStatus}</p>
                <button
                  disabled={
                    busy ||
                    flushing ||
                    test.questions.some((q) => !(drafts[q.id] ?? "").trim())
                  }
                  onClick={() => void submit()}
                >
                  {busy ? "Checking…" : "Finish extra credit"}
                </button>
              </>
            ) : test.result?.status === "final" ? (
              <strong>
                Learning score: {test.result.points} / {test.result.maxPoints} ·{" "}
                {test.ticketsEarned} tickets earned
              </strong>
            ) : (
              <>
                <p>{test.error || "Score pending."}</p>
                <button
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      await onAction({
                        action: "retryBonusTest",
                        testId: test.id,
                      });
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {busy ? "Checking…" : "Check again"}
                </button>
              </>
            )}
          </>
        )
      )}
    </section>
  );
}
