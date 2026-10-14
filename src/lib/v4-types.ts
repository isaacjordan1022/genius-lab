import type { Question, TeachingBlock } from "./content-types";

export type ChoiceSpec = {
  objective: string;
  prompt: string;
  correct: string;
  wrong: [string, string, string];
  explanation: string;
};

export type OpenSpec = {
  objective: string;
  prompt: string;
  exemplar: string;
  rubric: [string, string, string, string];
  explanation: string;
};

export type MatchSpec = {
  objective: string;
  prompt: string;
  matches: [
    { left: string; right: string },
    { left: string; right: string },
    { left: string; right: string },
    { left: string; right: string },
  ];
  explanation: string;
};

export type ChunkBlueprint = {
  idSuffix: string;
  title: string;
  subjects: string[];
  objectives: string[];
  teaching: TeachingBlock[];
  form1: {
    c1: ChoiceSpec;
    o1: OpenSpec;
    m1: MatchSpec;
    c2: ChoiceSpec;
    o2: OpenSpec;
  };
  form2: {
    c1: ChoiceSpec;
    o1: OpenSpec;
    m1: MatchSpec;
    c2: ChoiceSpec;
    o2: OpenSpec;
  };
};

export type DayBlueprint = {
  order: number;
  title: string;
  readingPassage: {
    title: string;
    text: string;
    words: { word: string; meaning: string; example: string }[];
  };
  chunks: [ChunkBlueprint, ChunkBlueprint, ChunkBlueprint];
};

export function placeCorrect(
  correct: string,
  wrong: [string, string, string],
  slot: number,
): string[] {
  const list = [...wrong];
  list.splice(slot % 4, 0, correct);
  return list;
}

export function buildChunkQuestions(
  lessonId: string,
  chunkIndex: number,
  formIndex: number,
  spec: ChunkBlueprint["form1"],
): Question[] {
  const base = chunkIndex * 5;
  const slotA = (chunkIndex * 2 + formIndex) % 4;
  const slotB = (chunkIndex * 2 + formIndex + 2) % 4;

  const items: Omit<Question, "id">[] = [
    {
      kind: "choice",
      objective: spec.c1.objective,
      points: 4,
      prompt: spec.c1.prompt,
      correct: spec.c1.correct,
      choices: placeCorrect(spec.c1.correct, spec.c1.wrong, slotA),
      explanation: spec.c1.explanation,
    },
    {
      kind: "open",
      objective: spec.o1.objective,
      points: 4,
      prompt: spec.o1.prompt,
      exemplar: spec.o1.exemplar,
      rubric: spec.o1.rubric,
      explanation: spec.o1.explanation,
    },
    {
      kind: "match",
      objective: spec.m1.objective,
      points: 4,
      prompt: spec.m1.prompt,
      matches: spec.m1.matches,
      explanation: spec.m1.explanation,
    },
    {
      kind: "choice",
      objective: spec.c2.objective,
      points: 4,
      prompt: spec.c2.prompt,
      correct: spec.c2.correct,
      choices: placeCorrect(spec.c2.correct, spec.c2.wrong, slotB),
      explanation: spec.c2.explanation,
    },
    {
      kind: "open",
      objective: spec.o2.objective,
      points: 4,
      prompt: spec.o2.prompt,
      exemplar: spec.o2.exemplar,
      rubric: spec.o2.rubric,
      explanation: spec.o2.explanation,
    },
  ];

  return items.map((q, i) => ({
    ...q,
    id: `${lessonId}-f${formIndex + 1}-q${base + i + 1}`,
  }));
}
