import type { Question } from "./content-types";

export type MissionReview = {
  id: string;
  prompt: string;
  choices: string[];
  correct: number;
  why: string;
};

// Only previously submitted questions are eligible. Passage-dependent prompts
// stay in lessons, where the reader has the original text and enough time.
export function missionReviewBank(questions: Question[]): MissionReview[] {
  const seen = new Set<string>();
  return questions
    .flatMap((q) => {
      if (
        q.kind !== "choice" ||
        !q.choices ||
        !q.correct ||
        seen.has(q.id) ||
        q.prompt.length > 180 ||
        /paragraph|passage|in [“"]|story|picture above/i.test(q.prompt)
      )
        return [];
      const correct = q.choices.indexOf(q.correct);
      if (correct < 0) return [];
      seen.add(q.id);
      return [
        {
          id: q.id,
          prompt: q.prompt,
          choices: q.choices,
          correct,
          why: q.explanation ?? "",
        },
      ];
    })
    .slice(-24);
}
