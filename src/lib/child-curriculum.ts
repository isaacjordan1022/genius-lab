import type { DailyLesson, TeachingBlock } from "./content-types";
import { HOW_THINGS_WORK } from "./how-things-work";
import {
  LESSONS_V4,
  WEEK_OBJECTIVES_V4,
  WEEK_TITLE_V4,
} from "./lesson-content-v4";
import {
  TOBI_LESSONS_V4,
  TOBI_WEEK_OBJECTIVES_V4,
  TOBI_WEEK_TITLE_V4,
} from "./tobi-curriculum";

export type ChildId = "aharon" | "tobi";
export type ChildCurriculum = {
  lessons: DailyLesson[];
  discovery: DailyLesson | undefined;
  weekTitle: string;
  weekObjectives: string[];
  profile: { id: ChildId; name: string; grade: number; age: number };
  publishedDays: number;
};
export function getCurriculumForChild(childId: ChildId): ChildCurriculum {
  if (childId === "tobi")
    return {
      lessons: TOBI_LESSONS_V4,
      discovery: undefined,
      weekTitle: TOBI_WEEK_TITLE_V4,
      weekObjectives: TOBI_WEEK_OBJECTIVES_V4,
      profile: { id: "tobi", name: "Tobi", grade: 2, age: 7 },
      publishedDays: 5,
    };
  if (childId !== "aharon") throw new Error("Unknown child curriculum");
  return {
    lessons: LESSONS_V4,
    discovery: HOW_THINGS_WORK,
    weekTitle: WEEK_TITLE_V4,
    weekObjectives: WEEK_OBJECTIVES_V4,
    profile: { id: "aharon", name: "Aharon Zev", grade: 5, age: 10 },
    publishedDays: 5,
  };
}
const metaphor: TeachingBlock = {
  kind: "concept",
  title: "A writer’s secret: metaphor",
  text: "A metaphor describes one thing as another to bring out a shared quality. “Her question was a key” can suggest that the question unlocked an understanding; the question is not a metal key. Create a new metaphor for a curious scientist and explain the shared quality. Include this new idea and an example in the bonus prompt before asking the child to apply it.",
  sources: [
    {
      label: "Poetry Foundation · Metaphor",
      url: "https://www.poetryfoundation.org/education/glossary/Metaphor",
    },
  ],
};
const simile: TeachingBlock = {
  kind: "concept",
  title: "Make a picture with words",
  text: "A simile compares two different things using like or as. “The rabbit’s shadow was like a giant umbrella” helps a reader picture something big and spreading out. Introduce this new writing tool with an example, then invite one new comparison and ask what it helps us imagine. Do not grade the example as a single correct answer.",
  sources: [
    {
      label: "Academy of American Poets · Simile",
      url: "https://poets.org/glossary/simile",
    },
  ],
};
const fable: TeachingBlock = {
  kind: "concept",
  title: "A tiny story with a big idea",
  text: "Many fables in the Aesop tradition use animal characters who speak or act like people. A fable can help us think about choices and their consequences. Introduce that idea, then ask the child to invent a very short rabbit-and-fox choice with a consequence. The lesson of the story should follow from what happens; do not require a famous moral or trivia about Aesop’s life.",
  sources: [
    {
      label: "BBC School Radio · Aesop’s Fables",
      url: "https://downloads.bbc.co.uk/schoolradio/pdfs/aesop/aesops_fables.pdf",
    },
  ],
};
const city: TeachingBlock = {
  kind: "art",
  title: "Can a painting have a beat?",
  text: "Piet Mondrian’s Broadway Boogie Woogie, painted in 1942–43, connects colour and a repeating grid with the energy of New York and boogie-woogie music. A picture can suggest rhythm through repeating shapes, even though a painting makes no sound. Introduce this fact, then ask for a visual way to show a fast or slow beat and a reason.",
  sources: [
    {
      label: "MoMA · Broadway Boogie Woogie",
      url: "https://www.moma.org/collection/works/78682",
    },
  ],
};
const biomimicry: TeachingBlock = {
  kind: "mechanism",
  title: "Nature’s engineering: Velcro and burrs",
  text: "In 1941, Swiss engineer George de Mestral noticed burdock burrs sticking to his dog’s fur with tiny microscopic hooks, inspiring the invention of hook-and-loop fasteners (Velcro). Introduce this example of learning engineering ideas from nature, then ask how natural cattle hide inspires sports gear design.",
  sources: [
    {
      label: "National Inventors Hall of Fame · George de Mestral",
      url: "https://www.invent.org/inductees/george-de-mestral",
    },
  ],
};
export function getBonusSeedForChunk(
  childId: ChildId,
  chunkId: string,
): TeachingBlock | undefined {
  if (childId === "tobi")
    return chunkId.endsWith("-chunk-1")
      ? simile
      : chunkId.endsWith("-chunk-2")
        ? fable
        : city;
  if (childId === "aharon")
    return chunkId.endsWith("-chunk-1")
      ? metaphor
      : chunkId.endsWith("-chunk-2")
        ? biomimicry
        : chunkId.endsWith("-chunk-3")
          ? city
          : undefined;
  return undefined;
}
