import type { DatabaseSync as SQLiteDatabase } from "node:sqlite";
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { HOW_THINGS_WORK } from "./how-things-work";
import { missionReviewBank } from "./mission-review";
import { WEEK_START } from "./week-plan";
import { CHUNKS } from "./content";
import { getPrizeRoomPrizes, type RoomPrize } from "./prize-room";
import { LESSONS as LESSONS_V2 } from "./lesson-content";
import {
  LESSONS_V3 as LESSONS,
  LESSONS_V3,
  WEEK_TITLE_V3 as WEEK_TITLE,
  WEEK_OBJECTIVES_V3 as WEEK_OBJECTIVES,
} from "./lesson-content-v3";
import { LESSONS_V4 } from "./lesson-content-v4";
import { TOBI_DAY_ONE, TOBI_LESSONS_V4 } from "./tobi-curriculum";
import {
  createLearningAI,
  AI_PENDING_MESSAGE,
  type LearningAI,
  type AIGrade,
} from "./learning-ai";
import type { BonusRecord, BonusTest } from "./bonus-types";
import {
  assessmentResult,
  gradeObjective,
  publicQuestion,
  validAnswer,
  validDraft,
} from "./rules";
import type {
  Answer,
  Chunk,
  DailyLesson,
  LearningChunk,
  TeachingBlock,
} from "./content-types";

export type Attempt = {
  id: string;
  chunkId: string;
  form: number;
  startedAt: string;
  taught: boolean;
  contentVersion?: number;
  taughtChunkIds?: string[];
  submittedChunkIds?: string[];
  answers: Record<string, Answer>;
  scores: Record<string, number | null>;
  aiGrades?: Record<string, AIGrade>;
  aiStatus?: "pending" | "complete";
  aiMessage?: string;
  quizRestarts?: { chunkId?: string; at: string; answers: Record<string, Answer> }[];
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
  productUrl?: string;
  retailer?: string;
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
  bonusBank?: BonusRecord[];
  bonusTests?: BonusTest[];
  gameRuns: { id: string; game: string; score: number; at: string }[];
};
// Historical orders keep their saved title/cost; retired demo items are not republished.
export const initialState = (): StoreState => ({
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
  const { DatabaseSync } = createRequire(import.meta.url)("node:sqlite") as typeof import("node:sqlite");
  const db = new DatabaseSync(file);
  db.exec(
    "PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS pilot (id TEXT PRIMARY KEY, body TEXT NOT NULL)",
  );
  db.prepare("INSERT OR IGNORE INTO pilot(id,body) VALUES (?,?)").run(
    "family",
    JSON.stringify(initialState()),
  );
  return db;
}
export type StoreCatalog = {
  lessons: DailyLesson[];
  discovery?: DailyLesson;
  weekTitle: string;
  weekObjectives: string[];
  profile: { id: string; name: string; age: number; grade: number };
  publishedDays?: number;
};
export type StoreOptions = { seed?: StoreState; catalog?: StoreCatalog; answerTickets?: boolean; bonusSeed?: (chunkId:string) => TeachingBlock | undefined };
export function createStore(
  path?: string,
  prizeSource: () => RoomPrize[] = getPrizeRoomPrizes,
  ai: LearningAI = createLearningAI(),
  options: StoreOptions = {},
) {
  const db: SQLiteDatabase | undefined = options.seed ? undefined : database(path);
  let memory = options.seed ? structuredClone(options.seed) : undefined;
  const catalog = options.catalog;
  const lessons = catalog?.lessons ?? LESSONS;
  const discovery = catalog ? catalog.discovery : HOW_THINGS_WORK;
  const profile = catalog?.profile ?? { id: "aharon", name: "Aharon Zev", age: 10, grade: 5 };
  const weekTitle = catalog?.weekTitle ?? WEEK_TITLE;
  const weekObjectives = catalog?.weekObjectives ?? WEEK_OBJECTIVES;
  function read(): StoreState {
    if (!db) return structuredClone(memory!);
    return JSON.parse(
      (
        db.prepare("SELECT body FROM pilot WHERE id=?").get("family") as {
          body: string;
        }
      ).body,
    );
  }
  function transact<T>(fn: (state: StoreState) => T): T {
    if (!db) {
      const draft = read();
      const result = fn(draft);
      draft.revision++;
      memory = draft;
      return result;
    }
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
    const c: Chunk | DailyLesson | undefined = [
      ...lessons,
      ...(discovery ? [discovery] : []),
      ...LESSONS_V4,
      ...TOBI_LESSONS_V4,
      TOBI_DAY_ONE,
      ...LESSONS_V3,
      ...LESSONS_V2,
      HOW_THINGS_WORK,
      ...CHUNKS,
    ].find((c) => c.id === id);
    if (!c) throw new Error("Unknown lesson");
    return c;
  }
  function attempt(s: StoreState, id: string) {
    const a = s.attempts.find((a) => a.id === id);
    if (!a) throw new Error("Attempt not found");
    return a;
  }
  function learningChunks(c: Chunk | DailyLesson): LearningChunk[] {
    return "version" in c && !c.assessmentOnly ? c.chunks : [];
  }
  function questionChunk(a: Attempt, questionId: string) {
    return learningChunks(chunk(a.chunkId)).find((c) =>
      c.questionIds[a.form]?.includes(questionId),
    );
  }
  function isLocked(a: Attempt, questionId: string) {
    return (
      !!a.submittedAt ||
      !!a.submittedChunkIds?.includes(questionChunk(a, questionId)?.id ?? "")
    );
  }
  function finalize(s: StoreState, a: Attempt) {
    const lesson = chunk(a.chunkId);
    const qs = lesson.forms[a.form];
    const sections = learningChunks(lesson);
    if (options.answerTickets) {
      for (const q of qs) {
        if (!isLocked(a, q.id) || a.scores[q.id] !== 4) continue;
        // Logical position deduplicates across the alternate retry forms.
        reward(s, `answer:${a.chunkId}:${qs.indexOf(q)}`, 5);
      }
    }
    const incremental = !options.answerTickets && "version" in lesson && Number(lesson.version) >= 3 && sections.length > 0;
    // Preserve old awards. Each published learning chunk pays at most once,
    // across retries, and only after all of its submitted answers are graded.
    if (incremental && !s.passed.includes(a.chunkId)) {
      for (const section of sections) {
        if (!a.submittedChunkIds?.includes(section.id)) continue;
        const ids = section.questionIds[a.form];
        const result = assessmentResult(ids.map(id => a.scores[id] ?? null), ids.length);
        if (result.passed) reward(s, `chunk-pass:${section.id}`, 30);
      }
    }
    const result = assessmentResult(qs.map(q => a.scores[q.id] ?? null), qs.length);
    a.result = a.submittedAt ? result : { ...result, status: "incomplete", passed: false };
    if (a.result.passed && !s.passed.includes(a.chunkId)) {
      s.passed.push(a.chunkId);
      const chunkEvents = new Set(sections.map(section => `chunk-pass:${section.id}`));
      const alreadyEarned = incremental ? s.ledger.filter(e => chunkEvents.has(e.event)).reduce((sum,e) => sum + e.amount, 0) : 0;
      const answerEarned = options.answerTickets ? s.ledger.filter(e => e.event.startsWith(`answer:${a.chunkId}:`)).reduce((sum,e) => sum + e.amount, 0) : 0;
      reward(s, `pass:${a.chunkId}`, a.chunkId === HOW_THINGS_WORK.id ? 0 : Math.max(0, 100 - alreadyEarned - answerEarned));
    }
  }
  function publicSections(c: Chunk | DailyLesson, s: StoreState) {
    return learningChunks(c).map((section) => ({
      ...section,
      ticketsEarned: s.ledger.filter(entry => {
        if (options.answerTickets) {
          const positions = section.questionIds[0].map(id => c.forms[0].findIndex(q => q.id === id));
          return positions.some(position => entry.event === `answer:${c.id}:${position}`);
        }
        return entry.event === `chunk-pass:${section.id}`;
      }).reduce((sum,entry) => sum + entry.amount,0),
      teaching:
        !("version" in c && Number(c.version) >= 4) &&
        s.attempts.some(
          (a) =>
            a.chunkId === c.id &&
            a.taughtChunkIds?.includes(section.id) &&
            !a.submittedChunkIds?.includes(section.id),
        )
          ? []
          : section.teaching,
    }));
  }
  function lessonMeta(c: Chunk | DailyLesson) {
    const s = read();
    const sections = publicSections(c, s);
    const hidden =
      !("version" in c && Number(c.version) >= 4) &&
      s.attempts.some(
        (a) => a.chunkId === c.id && a.taught && !a.submittedAt,
      );

    return {
      id: c.id,
      order: c.order,
      title: c.title,
      subjects: c.subjects,
      objectives: c.objectives,
      teaching: hidden ? [] : c.teaching,
      questionCount: c.forms[0]?.length ?? 0,
      version: "version" in c ? c.version : 1,
      assessmentOnly:
        "assessmentOnly" in c ? !!c.assessmentOnly : c.order === 6,
      chunks: sections,
    };
  }
  function reward(s: StoreState, event: string, amount: number) {
    if (!amount || s.ledger.some((e) => e.event === event)) return;
    s.balance += amount;
    s.lifetime += amount;
    s.ledger.push({
      id: randomUUID(),
      event,
      amount,
      kind: "earned",
      at: new Date().toISOString(),
    });
  }
  async function gradePending(id: string) {
    const a = attempt(read(), id),
      lesson = chunk(a.chunkId);
    const items = lesson.forms[a.form]
      .filter(
        (q) =>
          q.kind === "open" && isLocked(a, q.id) && a.scores[q.id] === null,
      )
      .map((question) => ({
        question,
        answer: a.answers[question.id],
        teaching: questionChunk(a, question.id)?.teaching ?? lesson.teaching,
      }));
    if (!items.length) return;
    try {
      const grades = await ai.grade(items);
      transact((s) => {
        const current = attempt(s, id);
        current.aiGrades ??= {};
        for (const g of grades)
          if (
            current.scores[g.questionId] === null &&
            isLocked(current, g.questionId)
          ) {
            current.scores[g.questionId] = g.points;
            current.aiGrades[g.questionId] = g;
          }
        current.aiStatus = lesson.forms[current.form].some(
          (q) => isLocked(current, q.id) && current.scores[q.id] === null,
        )
          ? "pending"
          : "complete";
        delete current.aiMessage;
        finalize(s, current);
      });
    } catch {
      transact((s) => {
        const current = attempt(s, id);
        if (
          lesson.forms[current.form].some(
            (q) => isLocked(current, q.id) && current.scores[q.id] === null,
          )
        ) {
          current.aiStatus = "pending";
          current.aiMessage = AI_PENDING_MESSAGE;
        }
      });
    }
  }
  function publicBonus(b: BonusRecord) {
    return {
      id: b.id,
      week: b.week,
      attemptId: b.attemptId,
      chunkId: b.chunkId,
      lessonId: b.lessonId,
      title: b.title,
      createdAt: b.createdAt,
      question: publicQuestion(b.question),
      answer: b.answer,
      submittedAt: b.submittedAt,
      grade: b.grade,
      error: b.error,
      ticketsEarned: b.ticketsEarned,
      ...(b.grade ? { explanation: b.question.explanation } : {}),
    };
  }
  function publicBonusTest(t: BonusTest) {
    return {
      id: t.id,
      week: t.week,
      createdAt: t.createdAt,
      bonusIds: t.bonusIds,
      questions: t.questions.map((q) => ({
        ...publicQuestion(q),
        ...(t.grades[q.id] ? { explanation: t.grades[q.id].feedback } : {}),
      })),
      answers: t.answers,
      grades: t.grades,
      submittedAt: t.submittedAt,
      result: t.result,
      error: t.error,
      ticketsEarned: t.ticketsEarned,
    };
  }
  async function gradeBonus(id: string) {
    const b = read().bonusBank?.find((b) => b.id === id);
    if (!b || !b.submittedAt || b.grade) return;
    try {
      const [grade] = await ai.grade([
        { question: b.question, answer: b.answer!, teaching: b.teaching },
      ]);
      transact((s) => {
        const current = s.bonusBank!.find((b) => b.id === id)!;
        if (current.grade) return;
        current.grade = grade;
        delete current.error;
        current.ticketsEarned = grade.points === 4 ? 5 : 0;
        reward(s, `bonus:${id}`, current.ticketsEarned);
      });
    } catch {
      transact((s) => {
        const current = s.bonusBank!.find((b) => b.id === id)!;
        if (!current.grade) current.error = AI_PENDING_MESSAGE;
      });
    }
  }
  async function gradeBonusTest(id: string) {
    const t = read().bonusTests?.find((t) => t.id === id);
    if (!t?.submittedAt) return;
    const items = t.questions
      .filter((q) => !t.grades[q.id])
      .map((question) => ({
        question,
        answer: t.answers[question.id],
        teaching: [],
      }));
    if (!items.length) return;
    try {
      const grades = await ai.grade(items);
      transact((s) => {
        const current = s.bonusTests!.find((t) => t.id === id)!;
        for (const g of grades) current.grades[g.questionId] ??= g;
        delete current.error;
        current.result = assessmentResult(
          current.questions.map((q) => current.grades[q.id]?.points ?? null),
          current.questions.length,
        );
        if (current.result.status === "final") {
          current.ticketsEarned =
            current.questions.filter((q) => current.grades[q.id]?.points === 4)
              .length * 5;
          reward(s, `bonus-test:${current.week}`, current.ticketsEarned);
        }
      });
    } catch {
      transact((s) => {
        const current = s.bonusTests!.find((t) => t.id === id)!;
        if (current.result?.status !== "final")
          current.error = AI_PENDING_MESSAGE;
      });
    }
  }
  return {
    read,
    gradePending,
    async generateBonus(id: string, chunkId: string) {
      const s = read(),
        a = attempt(s, id),
        section = learningChunks(chunk(a.chunkId)).find(
          (c) => c.id === chunkId,
        );
      if (!section || !a.submittedChunkIds?.includes(chunkId))
        throw new Error("Finish this chunk before opening its bonus.");
      const existing = s.bonusBank?.find(
        (b) => b.week === WEEK_START && b.chunkId === chunkId,
      );
      if (existing) return existing.id;
      let generated;
      try {
        generated = await ai.bonus({
          title: section.title,
          seed: options.bonusSeed?.(chunkId),
          objectives: section.objectives,
          teaching: section.teaching,
          recentScores: chunk(a.chunkId)
            .forms[a.form].filter((q) =>
              section.questionIds[a.form].includes(q.id),
            )
            .map((q) => ({
              objective: q.objective,
              points: a.scores[q.id] ?? null,
            })),
          previousPrompts: (s.bonusBank ?? []).map((b) => b.question.prompt),
        });
      } catch {
        throw new Error(
          "The bonus question could not load. Your lesson is saved; try again in a moment.",
        );
      }
      return transact((s) => {
        s.bonusBank ??= [];
        const old = s.bonusBank.find(
          (b) => b.week === WEEK_START && b.chunkId === chunkId,
        );
        if (old) return old.id;
        const bonusId = randomUUID();
        s.bonusBank.push({
          id: bonusId,
          week: WEEK_START,
          attemptId: id,
          lessonId: a.chunkId,
          chunkId,
          title: section.title,
          question: { ...generated.question, id: bonusId },
          teaching: section.teaching,
          model: generated.model,
          createdAt: new Date().toISOString(),
          ticketsEarned: 0,
        });
        return bonusId;
      });
    },
    saveBonus: (id: string, answer: Answer) =>
      transact((s) => {
        const b = s.bonusBank?.find((b) => b.id === id);
        if (!b || b.submittedAt)
          throw new Error("This bonus answer cannot be changed.");
        if (!validDraft(b.question, answer)) throw new Error("Invalid answer.");
        b.answer = answer;
      }),
    async answerBonus(id: string, answer: Answer) {
      transact((s) => {
        const b = s.bonusBank?.find((b) => b.id === id);
        if (!b) throw new Error("Bonus not found.");
        if (b.submittedAt) return;
        if (!validAnswer(b.question, answer))
          throw new Error("Add your answer first.");
        b.answer = answer;
        b.submittedAt = new Date().toISOString();
      });
      await gradeBonus(id);
    },
    retryBonus: gradeBonus,
    startBonusTest: () =>
      transact((s) => {
        s.bonusTests ??= [];
        const old = s.bonusTests.find((t) => t.week === WEEK_START);
        if (old) return old.id;
        if ((catalog?.publishedDays ?? 5) < 5) throw new Error("Your weekly bonus review opens after five lessons.");
        if (
          lessons.filter((l) => !l.assessmentOnly).some(
            (l) => !s.passed.includes(l.id),
          )
        )
          throw new Error(
            "Pass all five daily lessons before starting your weekly bonus review.",
          );
        const bank = (s.bonusBank ?? []).filter(
          (b) => b.week === WEEK_START && b.grade,
        );
        if (!bank.length)
          throw new Error(
            "Answer a bonus question before starting the bonus review.",
          );
        const id = randomUUID();
        s.bonusTests.push({
          id,
          week: WEEK_START,
          createdAt: new Date().toISOString(),
          bonusIds: bank.map((b) => b.id),
          questions: bank.map((b) => structuredClone(b.question)),
          answers: {},
          grades: {},
          ticketsEarned: 0,
        });
        return id;
      }),
    saveBonusTest: (id: string, questionId: string, answer: Answer) =>
      transact((s) => {
        const t = s.bonusTests?.find((t) => t.id === id),
          q = t?.questions.find((q) => q.id === questionId);
        if (!t || !q || t.submittedAt)
          throw new Error("This bonus review answer cannot be changed.");
        if (!validDraft(q, answer)) throw new Error("Invalid answer.");
        t.answers[questionId] = answer;
      }),
    async submitBonusTest(id: string) {
      transact((s) => {
        const t = s.bonusTests?.find((t) => t.id === id);
        if (!t) throw new Error("Bonus review not found.");
        if (t.submittedAt) return;
        if (!t.questions.every((q) => validAnswer(q, t.answers[q.id])))
          throw new Error("Answer every bonus review question first.");
        t.submittedAt = new Date().toISOString();
        t.result = assessmentResult(
          t.questions.map(() => null),
          t.questions.length,
        );
      });
      await gradeBonusTest(id);
    },
    retryBonusTest: gradeBonusTest,
    reconcileRewards: () => transact(s => {
      for (const a of s.attempts) if ((a.contentVersion ?? 0) >= 3) finalize(s, a);
      if (s.activeId) {
        const activeAttempt = s.attempts.find(a => a.id === s.activeId);
        const inCurrentCatalog = activeAttempt && (
          lessons.some(l => l.id === activeAttempt.chunkId) ||
          discovery?.id === activeAttempt.chunkId
        );
        if (!inCurrentCatalog) {
          const latestCurrent = s.attempts
            .filter(a => lessons.some(l => l.id === a.chunkId) && !a.submittedAt)
            .at(-1);
          s.activeId = latestCurrent?.id;
        }
      }
    }),
    close: () => db?.close(),
    resume: (attemptId: string) =>
      transact((s) => {
        attempt(s, attemptId);
        s.activeId = attemptId;
      }),
    start: (chunkId: string) =>
      transact((s) => {
        const c = chunk(chunkId);
        const curriculum =
          "version" in c ? (Number(c.version) >= 3 ? lessons : LESSONS_V2) : CHUNKS;
        const previous = curriculum.filter((v) => v.order < c.order);
        if (previous.some((p) => !s.passed.includes(p.id)))
          throw new Error("Pass the earlier daily lessons first.");
        if (s.passed.includes(chunkId))
          throw new Error("This daily lesson is already passed.");
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
          throw new Error("Your saved answers need to finish checking first.");
        const used = s.attempts.filter((a) => a.chunkId === chunkId).length;
        if (used >= c.forms.length)
          throw new Error(
            "Both practice forms are complete. A fresh lesson will be needed for another check.",
          );
        const a: Attempt = {
          id: randomUUID(),
          chunkId,
          form: used,
          startedAt: new Date().toISOString(),
          taught: false,
          contentVersion: "version" in c ? Number(c.version) : 1,
          taughtChunkIds: [],
          submittedChunkIds: [],
          answers: {},
          scores: {},
        };
        s.attempts.push(a);
        s.activeId = a.id;
        return a.id;
      }),
    restartQuiz: (id: string, learningChunkId?: string, revision?: number) =>
      transact((s) => {
        if (s.revision !== revision) throw new Error("Progress changed in another window. Refresh before restarting.");
        const a = attempt(s, id), lesson = chunk(a.chunkId), sections = learningChunks(lesson);
        if (a.submittedAt) throw new Error("Submitted quizzes stay locked.");
        const section = sections.find(c => c.id === learningChunkId);
        if (sections.length && (!section || !a.taughtChunkIds?.includes(section.id))) throw new Error("Start this quiz before restarting it.");
        if (section && a.submittedChunkIds?.includes(section.id)) throw new Error("Submitted quizzes stay locked.");
        if (!a.taught) throw new Error("Start this quiz before restarting it.");
        const ids = section ? section.questionIds[a.form] : lesson.forms[a.form].map(q => q.id);
        a.quizRestarts ??= [];
        a.quizRestarts.push({ chunkId: section?.id, at: new Date().toISOString(), answers: Object.fromEntries(ids.filter(q => a.answers[q] !== undefined).map(q => [q, a.answers[q]])) });
        for (const q of ids) { delete a.answers[q]; delete a.scores[q]; }
        // Restart questions, not the teaching: there is no reference toggle during a quiz.
        s.activeId = a.id;
      }),
    reopenTeaching: (id: string, learningChunkId?: string) =>
      transact((s) => {
        const a = attempt(s, id),
          lesson = chunk(a.chunkId),
          sections = learningChunks(lesson);
        if (a.submittedAt)
          throw new Error("This attempt is already submitted.");
        if (sections.length && learningChunkId) {
          if (a.submittedChunkIds?.includes(learningChunkId))
            throw new Error("Submitted chunks stay locked.");
          a.taughtChunkIds = (a.taughtChunkIds ?? []).filter(
            (cid) => cid !== learningChunkId,
          );
          if (!a.taughtChunkIds.length && !(a.submittedChunkIds?.length)) {
            a.taught = false;
          }
        } else {
          a.taught = false;
        }
        s.activeId = a.id;
      }),
    taught: (id: string, learningChunkId?: string) =>
      transact((s) => {
        const a = attempt(s, id),
          lesson = chunk(a.chunkId);
        if (a.submittedAt)
          throw new Error("This attempt is already submitted.");
        const sections = learningChunks(lesson);
        const isV4 = "version" in lesson && Number(lesson.version) >= 4;
        if (sections.length) {
          const index = sections.findIndex((c) => c.id === learningChunkId);
          if (index < 0) throw new Error("Choose the teaching chunk first.");
          if (
            !isV4 &&
            sections
              .slice(0, index)
              .some((c) => !a.submittedChunkIds?.includes(c.id))
          )
            throw new Error("Submit the earlier learning chunks first.");
          a.taughtChunkIds ??= [];
          if (!a.taughtChunkIds.includes(learningChunkId!))
            a.taughtChunkIds.push(learningChunkId!);
        }
        a.taught = true;
      }),
    save: (id: string, questionId: string, answer: Answer, revision: number) =>
      transact((s) => {
        if (s.revision !== revision)
          throw new Error(
            "Progress changed in another window. Refresh before saving.",
          );
        const a = attempt(s, id);
        if (isLocked(a, questionId) || !a.taught)
          throw new Error("This answer cannot be changed now.");
        const q = chunk(a.chunkId).forms[a.form].find(
          (q) => q.id === questionId,
        );
        if (!q) throw new Error("Question not found.");
        const section = questionChunk(a, q.id);
        if (
          learningChunks(chunk(a.chunkId)).length &&
          (!section || !a.taughtChunkIds?.includes(section.id))
        )
          throw new Error("Read this chunk's teaching before answering.");
        if (!validDraft(q, answer))
          throw new Error("This draft contains an invalid answer.");
        a.answers[q.id] = answer;
      }),
    submitChunk: (id: string, learningChunkId: string) =>
      transact((s) => {
        const a = attempt(s, id),
          lesson = chunk(a.chunkId),
          sections = learningChunks(lesson);
        const isV4 = "version" in lesson && Number(lesson.version) >= 4;
        const index = sections.findIndex((c) => c.id === learningChunkId);
        if (index < 0) throw new Error("Unknown learning chunk.");
        if (a.submittedChunkIds?.includes(learningChunkId)) return;
        if (a.submittedAt)
          throw new Error("This attempt is already submitted.");
        if (
          !isV4 &&
          sections
            .slice(0, index)
            .some((c) => !a.submittedChunkIds?.includes(c.id))
        )
          throw new Error("Submit the earlier learning chunks first.");
        if (!a.taughtChunkIds?.includes(learningChunkId))
          throw new Error("Finish this chunk's teaching first.");
        const questionIds = sections[index].questionIds[a.form];
        const questions = lesson.forms[a.form].filter((q) =>
          questionIds.includes(q.id),
        );
        if (
          !questions.length ||
          questions.length !== questionIds.length ||
          !questions.every((q) => validAnswer(q, a.answers[q.id]))
        )
          throw new Error(
            `Answer all ${questionIds.length} questions in this chunk before submitting.`,
          );
        for (const q of questions)
          a.scores[q.id] = gradeObjective(q, a.answers[q.id]);
        a.submittedChunkIds ??= [];
        a.submittedChunkIds.push(learningChunkId);
        if (sections.every((c) => a.submittedChunkIds!.includes(c.id)))
          a.submittedAt = new Date().toISOString();
        if (Object.values(a.scores).some((score) => score === null))
          a.aiStatus = "pending";
        finalize(s, a);
      }),
    submit: (id: string) =>
      transact((s) => {
        const a = attempt(s, id);
        if (a.submittedAt) return;
        if (learningChunks(chunk(a.chunkId)).length)
          throw new Error("Submit each learning chunk separately.");
        if (!a.taught) throw new Error("Finish the teaching first.");
        const questions = chunk(a.chunkId).forms[a.form];
        if (!questions.every((q) => validAnswer(q, a.answers[q.id])))
          throw new Error(
            `Answer all ${questions.length} questions before submitting.`,
          );
        a.submittedAt = new Date().toISOString();
        for (const q of questions)
          a.scores[q.id] = gradeObjective(q, a.answers[q.id]);
        if (Object.values(a.scores).some((score) => score === null))
          a.aiStatus = "pending";
        finalize(s, a);
      }),
    grade: (id: string, questionId: string, points: number) =>
      transact((s) => {
        const a = attempt(s, id),
          q = chunk(a.chunkId).forms[a.form].find((q) => q.id === questionId);
        if (
          !isLocked(a, questionId) ||
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
        const prize = prizeSource().find((p) => p.id === prizeId);
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
            ...(prize.productUrl
              ? { productUrl: prize.productUrl, retailer: prize.retailer }
              : {}),
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
          text: `${profile.name} ordered ${prize.title}.`,
          at: now,
        });
        return order;
      }),
    saveRun: (game: string, score: number, runId: string) =>
      transact((s) => {
        if (
          ![...lessons, ...LESSONS_V4, ...LESSONS_V3, ...LESSONS_V2, ...CHUNKS].some((c) =>
            s.passed.includes(c.id),
          )
        )
          throw new Error("Pass a daily lesson to unlock the arcade.");
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
        bonusBank: (s.bonusBank ?? []).map(publicBonus),
        bonusTests: (s.bonusTests ?? []).map(publicBonusTest),
        missionQuestions: missionReviewBank(s.attempts.flatMap(a =>
          chunk(a.chunkId).forms[a.form].filter(q => isLocked(a, q.id) && a.scores[q.id] != null)
        )),
        weekTitle,
        weekStartDate: WEEK_START,
        discovery: discovery ? lessonMeta(discovery) : null,
        weekObjectives,
        publishedDays: catalog?.publishedDays ?? 5,
        rewardPolicy: options.answerTickets ? "correct-answers" as const : "chunk-mastery" as const,
        prizes: prizeSource().map(({ productUrl, retailer, ...childPrize }) => {
          void productUrl;
          void retailer;
          return childPrize;
        }),
        profile,
        siblings: [
          { name: "Tobi", earned: 0 },
          { name: "Ezra", earned: 0 },
        ],
        chunks: lessons.map(lessonMeta),
        archivedLessons: [TOBI_DAY_ONE, ...LESSONS_V3, ...LESSONS_V2, ...CHUNKS]
          .filter((c) => !lessons.some((l) => l.id === c.id) && s.attempts.some((a) => a.chunkId === c.id))
          .map(lessonMeta),
        active: activeAttempt
          ? {
              ...activeAttempt,
              learningChunks: publicSections(chunk(activeAttempt.chunkId), s),
              questions: chunk(activeAttempt.chunkId).forms[
                activeAttempt.form
              ].map((q) => ({
                ...publicQuestion(q),
                ...(isLocked(activeAttempt, q.id)
                  ? {
                      explanation:
                        activeAttempt.aiGrades?.[q.id]?.feedback ??
                        q.explanation,
                      rubric: q.rubric,
                    }
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
        pending: s.attempts.flatMap((a) =>
          chunk(a.chunkId)
            .forms[a.form].filter(
              (q) =>
                q.kind === "open" &&
                isLocked(a, q.id) &&
                a.scores[q.id] === null,
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
export type Store = ReturnType<typeof createStore>;
const globalStore = globalThis as typeof globalThis & {
  arcadeStore?: Store;
  arcadeStoreVersion?: number;
};
export function getStore() {
  // HMR can retain a v1 service object. Reopen its connection without changing saved state.
  if (!globalStore.arcadeStore || globalStore.arcadeStoreVersion !== 6) {
    globalStore.arcadeStore?.close();
    globalStore.arcadeStore = createStore();
    globalStore.arcadeStoreVersion = 6;
  }
  return globalStore.arcadeStore;
}
export type AppState = ReturnType<Store["view"]>;

export type ParentReviews = ReturnType<Store["reviews"]>;
