import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { CHUNKS, WEEK_TITLE, WEEK_OBJECTIVES } from "./content";
import {
  assessmentResult,
  gradeObjective,
  publicQuestion,
  validAnswer,
  validDraft,
} from "./rules";
import type { Answer } from "./content-types";

export type Attempt = {
  id: string;
  chunkId: string;
  form: number;
  startedAt: string;
  taught: boolean;
  answers: Record<string, Answer>;
  scores: Record<string, number | null>;
  submittedAt?: string;
  result?: ReturnType<typeof assessmentResult>;
};
type LedgerEntry = {
  id: string;
  event: string;
  amount: number;
  kind: "earned" | "purchase";
  at: string;
};
export type Order = {
  id: string;
  prizeId: string;
  title: string;
  cost: number;
  at: string;
  status: "confirmed";
  checkoutId: string;
};
export type StoreState = {
  revision: number;
  activeId?: string;
  attempts: Attempt[];
  passed: string[];
  balance: number;
  lifetime: number;
  ledger: LedgerEntry[];
  orders: Order[];
  notifications: { id: string; text: string; at: string }[];
  gameRuns: { id: string; game: string; score: number; at: string }[];
};
export const PRIZES = [
  {
    id: "art-kit",
    title: "Mini art kit",
    description: "A little box of creative possibilities.",
    cost: 100,
    icon: "palette",
  },
  {
    id: "lunch",
    title: "Lunch with a parent",
    description: "Your choice of conversation. Extra time together.",
    cost: 250,
    icon: "utensils",
  },
  {
    id: "building",
    title: "The big building set",
    description: "A longer-term saving goal.",
    cost: 1200,
    icon: "blocks",
  },
];
const initial = (): StoreState => ({
  revision: 0,
  attempts: [],
  passed: [],
  balance: 0,
  lifetime: 0,
  ledger: [],
  orders: [],
  notifications: [],
  gameRuns: [],
});
function database(path?: string) {
  if (process.env.VERCEL)
    throw new Error(
      "Local pilot storage is disabled on Vercel. Connect the production database first.",
    );
  const file =
    path ??
    process.env.ARCADE_DB_PATH ??
    join(process.cwd(), "data", "arcade.sqlite");
  if (file !== ":memory:") mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(
    "PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS pilot (id TEXT PRIMARY KEY, body TEXT NOT NULL)",
  );
  db.prepare("INSERT OR IGNORE INTO pilot(id,body) VALUES (?,?)").run(
    "family",
    JSON.stringify(initial()),
  );
  return db;
}
export function createStore(path?: string) {
  const db = database(path);
  function read(): StoreState {
    return JSON.parse(
      (
        db.prepare("SELECT body FROM pilot WHERE id=?").get("family") as {
          body: string;
        }
      ).body,
    );
  }
  function transact<T>(fn: (state: StoreState) => T): T {
    db.exec("BEGIN IMMEDIATE");
    try {
      const s = read(),
        result = fn(s);
      s.revision++;
      db.prepare("UPDATE pilot SET body=? WHERE id=?").run(
        JSON.stringify(s),
        "family",
      );
      db.exec("COMMIT");
      return result;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  }
  function chunk(id: string) {
    const c = CHUNKS.find((c) => c.id === id);
    if (!c) throw new Error("Unknown chunk");
    return c;
  }
  function attempt(s: StoreState, id: string) {
    const a = s.attempts.find((a) => a.id === id);
    if (!a) throw new Error("Attempt not found");
    return a;
  }
  function finalize(s: StoreState, a: Attempt) {
    const qs = chunk(a.chunkId).forms[a.form];
    a.result = assessmentResult(qs.map((q) => a.scores[q.id] ?? null));
    if (a.result.passed && !s.passed.includes(a.chunkId)) {
      s.passed.push(a.chunkId);
      s.balance += 100;
      s.lifetime += 100;
      s.ledger.push({
        id: randomUUID(),
        event: `pass:${a.chunkId}`,
        amount: 100,
        kind: "earned",
        at: new Date().toISOString(),
      });
    }
  }
  return {
    read,
    close: () => db.close(),
    start: (chunkId: string) =>
      transact((s) => {
        const c = chunk(chunkId);
        const previous = CHUNKS.filter((v) => v.order < c.order);
        if (previous.some((p) => !s.passed.includes(p.id)))
          throw new Error("Pass the earlier chunks first.");
        if (s.passed.includes(chunkId))
          throw new Error("This chunk is already passed.");
        const existing = s.attempts.find(
          (a) => a.chunkId === chunkId && !a.submittedAt,
        );
        if (existing) {
          s.activeId = existing.id;
          return existing.id;
        }
        if (
          s.attempts.some(
            (a) => a.chunkId === chunkId && a.result?.status === "pending",
          )
        )
          throw new Error("Your written answers are waiting for review.");
        const used = s.attempts.filter((a) => a.chunkId === chunkId).length;
        if (used >= c.forms.length)
          throw new Error(
            "Both sample forms are complete. A parent can add a fresh form for another check.",
          );
        const a: Attempt = {
          id: randomUUID(),
          chunkId,
          form: used,
          startedAt: new Date().toISOString(),
          taught: false,
          answers: {},
          scores: {},
        };
        s.attempts.push(a);
        s.activeId = a.id;
        return a.id;
      }),
    taught: (id: string) =>
      transact((s) => {
        const a = attempt(s, id);
        if (a.submittedAt)
          throw new Error("This attempt is already submitted.");
        a.taught = true;
      }),
    save: (id: string, questionId: string, answer: Answer, revision: number) =>
      transact((s) => {
        if (s.revision !== revision)
          throw new Error(
            "Progress changed in another window. Refresh before saving.",
          );
        const a = attempt(s, id);
        if (a.submittedAt || !a.taught)
          throw new Error("This answer cannot be changed now.");
        const q = chunk(a.chunkId).forms[a.form].find(
          (q) => q.id === questionId,
        );
        if (!q) throw new Error("Question not found.");
        if (!validDraft(q, answer))
          throw new Error("This draft contains an invalid answer.");
        a.answers[q.id] = answer;
      }),
    submit: (id: string) =>
      transact((s) => {
        const a = attempt(s, id);
        if (a.submittedAt) return;
        if (!a.taught) throw new Error("Finish the teaching first.");
        const questions = chunk(a.chunkId).forms[a.form];
        if (!questions.every((q) => validAnswer(q, a.answers[q.id])))
          throw new Error("Answer all 15 questions before submitting.");
        a.submittedAt = new Date().toISOString();
        for (const q of questions)
          a.scores[q.id] = gradeObjective(q, a.answers[q.id]);
        finalize(s, a);
      }),
    grade: (id: string, questionId: string, points: number) =>
      transact((s) => {
        const a = attempt(s, id),
          q = chunk(a.chunkId).forms[a.form].find((q) => q.id === questionId);
        if (
          !a.submittedAt ||
          q?.kind !== "open" ||
          a.scores[questionId] !== null
        )
          throw new Error("This response is not awaiting review.");
        if (!Number.isInteger(points) || points < 0 || points > 4)
          throw new Error("Use 0–4 rubric points.");
        a.scores[questionId] = points;
        finalize(s, a);
      }),
    checkout: (prizeId: string, expectedCost: number, checkoutId: string) =>
      transact((s) => {
        const old = s.orders.find((o) => o.checkoutId === checkoutId);
        if (old) return old;
        if (!/^[\w-]{12,80}$/.test(checkoutId))
          throw new Error("Invalid checkout.");
        const prize = PRIZES.find((p) => p.id === prizeId);
        if (!prize || prize.cost !== expectedCost)
          throw new Error("The prize price changed. Please confirm it again.");
        if (s.balance < prize.cost)
          throw new Error("You need more tickets for this prize.");
        const now = new Date().toISOString(),
          order: Order = {
            id: randomUUID(),
            prizeId,
            title: prize.title,
            cost: prize.cost,
            at: now,
            status: "confirmed",
            checkoutId,
          };
        s.balance -= prize.cost;
        s.orders.push(order);
        s.ledger.push({
          id: randomUUID(),
          event: `order:${order.id}`,
          amount: -prize.cost,
          kind: "purchase",
          at: now,
        });
        s.notifications.push({
          id: randomUUID(),
          text: `Aharon Zev ordered ${prize.title}.`,
          at: now,
        });
        return order;
      }),
    saveRun: (game: string, score: number, runId: string) =>
      transact((s) => {
        if (!s.passed.length)
          throw new Error("Pass a chunk to unlock the arcade.");
        if (
          !["snake", "match", "rally"].includes(game) ||
          !Number.isFinite(score) ||
          score < 0 ||
          score > 100000
        )
          throw new Error("Invalid game result.");
        if (s.gameRuns.some((r) => r.id === runId)) return;
        s.gameRuns.push({
          id: runId,
          game,
          score: Math.round(score),
          at: new Date().toISOString(),
        });
      }),
    view: () => {
      const s = read(),
        activeAttempt = s.attempts.find((a) => a.id === s.activeId);
      return {
        ...s,
        weekTitle: WEEK_TITLE,
        weekObjectives: WEEK_OBJECTIVES,
        prizes: PRIZES,
        profile: { id: "aharon", name: "Aharon Zev", age: 10, grade: 5 },
        siblings: [
          { name: "Tobi", earned: 0 },
          { name: "Ezra", earned: 0 },
        ],
        chunks: CHUNKS.map((c) => ({
          id: c.id,
          order: c.order,
          title: c.title,
          subjects: c.subjects,
          objectives: c.objectives,
          teaching: c.teaching,
          questionCount: c.forms[0]?.length ?? 0,
        })),
        active: activeAttempt
          ? {
              ...activeAttempt,
              questions: chunk(activeAttempt.chunkId).forms[
                activeAttempt.form
              ].map((q) => ({
                ...publicQuestion(q),
                ...(activeAttempt.submittedAt
                  ? { explanation: q.explanation }
                  : {}),
              })),
            }
          : null,
      };
    },
    reviews: () => {
      const s = read();
      return {
        notifications: s.notifications,
        pending: s.attempts
          .filter((a) => a.submittedAt && a.result?.status === "pending")
          .flatMap((a) =>
            chunk(a.chunkId)
              .forms[a.form].filter(
                (q) => q.kind === "open" && a.scores[q.id] === null,
              )
              .map((q) => ({
                attemptId: a.id,
                chunkTitle: chunk(a.chunkId).title,
                question: q,
                answer: a.answers[q.id],
              })),
          ),
      };
    },
  };
}
type Store = ReturnType<typeof createStore>;
const globalStore = globalThis as typeof globalThis & { arcadeStore?: Store };
export function getStore() {
  return (globalStore.arcadeStore ??= createStore());
}
export type AppState = ReturnType<Store["view"]>;

export type ParentReviews = ReturnType<Store["reviews"]>;
