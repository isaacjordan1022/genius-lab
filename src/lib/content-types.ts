export type DiagramKind =
  | "beam-bridge"
  | "shadow-theatre"
  | "mondrian-study"
  | "leather-tanning-lab"
  | "hide-layers-explorer"
  | "glove-anatomy-lab"
  | "glove-breakin-simulator"
  | "baseball-seam-windtunnel"
  | "teivah-blueprint-explorer"
  | "salanter-storybook"
  | "shabbos-borer-lab"
  | "noach-window-timeline"
  | "shabbos-muktzeh-explorer";

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
export type TeachingBlock = {
  diagram?: DiagramKind;
  fractionModel?: {
    mode: "equivalence" | "compare" | "add" | "subtract" | "quantity";
    numerator: number;
    denominator: number;
    otherNumerator?: number;
    otherDenominator?: number;
    total?: number;
    steps: string[];
  };
  sources?: { label: string; url: string }[];
  title: string;
  text: string;
  kind?:
    | "vocabulary"
    | "passage"
    | "concept"
    | "example"
    | "art"
    | "mechanism"
    | "torah"
    | "gadol"
    | "halacha";
  terms?: { word: string; meaning: string; example: string }[];
  highlight?: string[];
};
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

export type LearningChunk = {
  id: string;
  title: string;
  subjects: string[];
  objectives: string[];
  teaching: TeachingBlock[];
  questionIds: string[][];
};
export type DailyLesson = Chunk & {
  version: 2 | 3 | 4;
  assessmentOnly?: boolean;
  chunks: LearningChunk[];
};
