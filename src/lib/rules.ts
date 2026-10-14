import type { Answer, PublicQuestion, Question } from "./content-types";
export function assessmentResult(
  scores: (number | null)[],
  expectedCount = 15,
) {
  if (!Number.isInteger(expectedCount) || expectedCount < 1)
    throw new Error("Invalid question count");
  if (
    scores.some((n) => n !== null && (!Number.isInteger(n) || n < 0 || n > 4))
  )
    throw new Error("Invalid rubric score");
  const points = scores.reduce<number>((sum, n) => sum + (n ?? 0), 0);
  const status =
    scores.length !== expectedCount
      ? "incomplete"
      : scores.some((n) => n === null)
        ? "pending"
        : "final";
  return {
    status,
    points,
    maxPoints: expectedCount * 4,
    percent: (points / (expectedCount * 4)) * 100,
    passed: status === "final" && points * 10 >= expectedCount * 4 * 9,
  };
}
export function gradeObjective(q: Question, answer: Answer): number | null {
  if (q.kind === "open") return null;
  if (q.kind === "choice")
    return typeof answer === "string" && answer === q.correct ? 4 : 0;
  if (typeof answer === "string") return 0;
  const pairs = q.matches ?? [];
  return pairs.length
    ? Math.round(
        (4 * pairs.filter((p) => answer[p.left] === p.right).length) /
          pairs.length,
      )
    : 0;
}
export function publicQuestion(q: Question): PublicQuestion {
  const { correct, matches, exemplar, explanation, rubric, ...safe } = q;
  void correct;
  void exemplar;
  void explanation;
  void rubric;
  return {
    ...safe,
    ...(matches
      ? {
          left: matches.map((p) => p.left),
          right: matches.map((p) => p.right).sort(),
        }
      : {}),
  };
}
export function validAnswer(q: Question, answer: unknown): answer is Answer {
  if (q.kind === "match")
    return (
      !!answer &&
      typeof answer === "object" &&
      !Array.isArray(answer) &&
      (q.matches ?? []).every(
        (p) =>
          typeof (answer as Record<string, unknown>)[p.left] === "string" &&
          (q.matches ?? []).some(
            (pair) => pair.right === (answer as Record<string, string>)[p.left],
          ),
      )
    );
  if (typeof answer !== "string" || !answer.trim() || answer.length > 5000)
    return false;
  return q.kind === "open" || !!q.choices?.includes(answer);
}

export function validDraft(q: Question, answer: unknown): answer is Answer {
  if (q.kind === "match")
    return (
      !!answer &&
      typeof answer === "object" &&
      !Array.isArray(answer) &&
      Object.entries(answer).every(
        ([left, right]) =>
          (q.matches ?? []).some((pair) => pair.left === left) &&
          typeof right === "string" &&
          (right === "" ||
            (q.matches ?? []).some((pair) => pair.right === right)),
      )
    );
  return (
    typeof answer === "string" &&
    answer.length <= 5000 &&
    (q.kind === "open" || answer === "" || !!q.choices?.includes(answer))
  );
}
