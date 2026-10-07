export type Question = {
  id: string;
  kind: "choice" | "match" | "open";
  prompt: string;
  choices?: string[];
  correct?: string;
  matches?: { left: string; right: string }[];
  exemplar?: string;
  rubric?: string[];
  explanation: string;
  objective: string;
  points: 4;
};
export type TeachingBlock = { title: string; text: string };
export type Chunk = {
  id: string;
  order: number;
  title: string;
  subjects: string[];
  objectives: string[];
  teaching: TeachingBlock[];
  forms: Question[][];
};
export type Answer = string | Record<string, string>;
export type PublicQuestion = Omit<
  Question,
  "correct" | "matches" | "exemplar" | "explanation"
> & {
  left?: string[];
  right?: string[];
};
