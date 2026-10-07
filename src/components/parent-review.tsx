"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { ParentReviews as Reviews } from "@/lib/store";
export default function ParentReview() {
  const [data, setData] = useState<Reviews | null>(null),
    [pin, setPin] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [checked, setChecked] = useState<Record<string, boolean>>({});
  async function load() {
    const r = await fetch("/api/parent");
    if (r.ok) setData(await r.json());
  }
  useEffect(() => {
    void load();
  }, []);
  async function post(body: object) {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/parent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }),
        json = await r.json();
      if (!r.ok) throw new Error(json.error);
      if ("pending" in json) setData(json);
      else await load();
      if ("pending" in json)
        setChecked((previous) =>
          Object.fromEntries(
            Object.entries(previous).filter(([key]) =>
              (json as Reviews).pending.some((item) =>
                key.startsWith(`${item.attemptId}:${item.question.id}:`),
              ),
            ),
          ),
        );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="parent-page">
      <Link href="/" className="text-link">
        ← Back to the child experience
      </Link>
      <p className="eyebrow">Local pilot · parent area</p>
      <h1>A second pair of eyes.</h1>
      <p className="lede">
        Open answers wait here for a real rubric score. The app never pretends a
        keyword match is an AI assessment.
      </p>
      {error && (
        <div role="alert" className="alert">
          {error}
        </div>
      )}
      {!data ? (
        <form
          className="panel narrow"
          onSubmit={(e) => {
            e.preventDefault();
            void post({ action: "login", pin });
          }}
        >
          <h2>Unlock parent review</h2>
          <label htmlFor="parent-pin">Local parent PIN</label>
          <input
            id="parent-pin"
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoComplete="off"
          />
          <button className="primary" disabled={busy}>
            Unlock
          </button>
          <p className="fine">
            For this local development pilot, the setup PIN is in the README.
            Production parent login will use your account.
          </p>
        </form>
      ) : (
        <>
          <div className="parent-grid">
            <section>
              <h2>
                {data.pending.length}{" "}
                {data.pending.length === 1 ? "answer" : "answers"} to review
              </h2>
              {!data.pending.length && (
                <div className="panel">
                  <h3>All caught up.</h3>
                  <p>New submitted explanations will appear here.</p>
                </div>
              )}
              {data.pending.map((item) => (
                <article
                  className="panel review-card"
                  key={`${item.attemptId}:${item.question.id}`}
                >
                  <p className="eyebrow">{item.chunkTitle}</p>
                  <h3>{item.question.prompt}</h3>
                  <blockquote>{String(item.answer)}</blockquote>
                  <details>
                    <summary>See an example and grading guidance</summary>
                    <p>{item.question.exemplar}</p>
                    <p>{item.question.explanation}</p>
                  </details>
                  <fieldset>
                    <legend>One point for each demonstrated criterion</legend>
                    {item.question.rubric?.map((criterion, i) => {
                      const key = `${item.attemptId}:${item.question.id}:${i}`;
                      return (
                        <label className="check-row" key={key}>
                          <input
                            type="checkbox"
                            checked={!!checked[key]}
                            onChange={(e) =>
                              setChecked({
                                ...checked,
                                [key]: e.target.checked,
                              })
                            }
                          />
                          {criterion}
                        </label>
                      );
                    })}
                  </fieldset>
                  <button
                    className="primary"
                    disabled={busy}
                    onClick={() =>
                      void post({
                        action: "grade",
                        attemptId: item.attemptId,
                        questionId: item.question.id,
                        points: (item.question.rubric ?? []).filter(
                          (_, i) =>
                            checked[
                              `${item.attemptId}:${item.question.id}:${i}`
                            ],
                        ).length,
                      })
                    }
                  >
                    Save rubric score
                  </button>
                </article>
              ))}
            </section>
            <aside className="panel">
              <h2>Prize notifications</h2>
              <p className="fine">
                Orders are confirmed immediately. This local inbox works; email
                delivery is not connected.
              </p>
              {data.notifications.length ? (
                data.notifications
                  .slice()
                  .reverse()
                  .map((n) => (
                    <p key={n.id} className="notification">
                      {n.text}
                      <small>{new Date(n.at).toLocaleString()}</small>
                    </p>
                  ))
              ) : (
                <p>No sample prizes ordered yet.</p>
              )}
            </aside>
          </div>
        </>
      )}
    </main>
  );
}
