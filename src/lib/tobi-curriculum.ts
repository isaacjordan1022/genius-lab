import type { DailyLesson, Question, TeachingBlock } from "./content-types";

// First publication. Never reuse these IDs for revised teaching or answer keys.
export const TOBI_DAY_ONE_ID = "tobi-week1-day1-v3";
export const TOBI_READING = `Maya had made a tiny rabbit for her puppet show. She cut it from thick card and taped it to a stick. Its ears were crooked. “Excellent,” she said. “A rabbit who listens around corners.”

She aimed a flashlight at a white wall and held the rabbit in between. A dark rabbit appeared on the wall. When Maya moved the card closer to the flashlight, the shadow grew enormous. “My rabbit has eaten the whole garden!” she cried. Her brother Ben rushed over with a carrot.

Maya felt puzzled. The card in her hand was still small. She wanted to discover why its shadow had changed. She left the flashlight on the table. First she held the rabbit near the wall. Small shadow. Then she moved it back toward the light. Giant shadow. She tried the same moves again.

“It is the distance!” Maya said. “I can change the shadow without cutting a new rabbit.” Ben suggested moving the light and the rabbit together. Maya shook her head. “Let’s change one thing at a time. Then we can see what made the difference.”

For the show, a timid rabbit hid behind a flower. Maya moved her card toward the light. The rabbit became a giant and scared away a pretend fox. Then she moved it near the wall again. The tiny rabbit bowed. Ben clapped. “A brave rabbit,” he said, “with very stretchy ears.”`;

const source = {
  shadows: {
    label: "PBS KIDS · Shadow theatre",
    url: "https://www.pbs.org/parents/crafts-and-experiments/put-on-a-shadow-play",
  },
  opacity: {
    label: "NASA · See-through materials",
    url: "https://www.nasa.gov/stem-content/visual-opacity/",
  },
  art: {
    label: "MoMA · Piet Mondrian",
    url: "https://www.moma.org/collection/works/78682",
  },
};
const choice = (
  objective: string,
  prompt: string,
  correct: string,
  wrong: string[],
  explanation: string,
): Question => ({
  id: "",
  kind: "choice",
  points: 4,
  objective,
  prompt,
  correct,
  choices: [wrong[0], correct, ...wrong.slice(1)],
  explanation,
});
const open = (
  objective: string,
  prompt: string,
  exemplar: string,
  rubric: string[],
): Question => ({
  id: "",
  kind: "open",
  points: 4,
  objective,
  prompt,
  exemplar,
  rubric,
  explanation: `One way to explain it: ${exemplar}`,
});
const match = (
  objective: string,
  prompt: string,
  pairs: [string, string][],
): Question => ({
  id: "",
  kind: "match",
  points: 4,
  objective,
  prompt,
  matches: pairs.map(([left, right]) => ({ left, right })),
  explanation: pairs.map(([a, b]) => `${a}: ${b}`).join(". "),
});
const pick = <T>(f: number, a: T, b: T): T => (f === 0 ? a : b);

const readingTeaching: TeachingBlock[] = [
  {
    kind: "passage",
    title: "The giant rabbit mystery",
    text: TOBI_READING,
    highlight: ["puzzled", "discover", "distance", "timid"],
  },
  {
    kind: "vocabulary",
    title: "Four words to keep",
    text: "Say each word. Open its card. Can you picture the moment in the story?",
    terms: [
      {
        word: "puzzled",
        meaning: "Unsure because something is hard to understand.",
        example: "Maya was puzzled: a small card made a huge shadow.",
      },
      {
        word: "discover",
        meaning: "Find out something you did not know.",
        example: "Maya wanted to discover what changed the shadow.",
      },
      {
        word: "distance",
        meaning: "The space between two things.",
        example: "She changed the distance between the rabbit and the light.",
      },
      {
        word: "timid",
        meaning: "Shy or easily frightened.",
        example: "The timid rabbit hid behind a flower.",
      },
    ],
  },
  {
    kind: "example",
    title: "A clue + your thinking",
    text: "What tells us Maya is curious? She repeats her test. That action shows she wants to understand, not just guess.\nWhen you explain a character, give an action from the story and tell what it shows.",
    highlight: ["action", "shows"],
  },
];
const readingQuestions = (f: number): Question[] => [
  choice(
    "tobi-reading-cause",
    pick(
      f,
      "In “The giant rabbit mystery,” what makes Maya puzzled?",
      "In “The giant rabbit mystery,” what does Maya discover?",
    ),
    pick(
      f,
      "Her small card makes a huge shadow.",
      "Moving the rabbit changes its shadow’s size.",
    ),
    pick(
      f,
      [
        "Her brother cannot find a carrot.",
        "The card rabbit has become a real animal.",
        "The flashlight has disappeared.",
      ],
      [
        "The card grows real fur.",
        "All rabbits are afraid of flowers.",
        "The wall moves closer by itself.",
      ],
    ),
    pick(
      f,
      "Maya sees a giant shadow, but the card in her hand stays small. That is the mystery she tests.",
      "The same card makes a small or large shadow in different positions. The rabbit itself does not grow.",
    ),
  ),
  open(
    "tobi-reading-evidence",
    pick(
      f,
      "Maya is curious. Tell one thing she does that shows this. Explain how it helps her learn.",
      "Maya does not just guess. Tell one thing she does to check her idea. What does she find?",
    ),
    pick(
      f,
      "She moves the rabbit near the wall and then toward the light. She repeats it to see how its position changes the shadow.",
      "She repeats the same moves with the light left on the table. Near the wall gives a small shadow; nearer the light gives a bigger one.",
    ),
    [
      "Names an accurate action from the story",
      "Connects the action to finding out or checking an idea",
      "Gives an accurate result or useful reason",
      "Explains the link clearly; one or two simple sentences are enough",
    ],
  ),
  match(
    "tobi-vocabulary-context",
    "Match each moment to its word.",
    pick(
      f,
      [
        ["Maya cannot explain the giant shadow.", "Puzzled"],
        ["She finds out what changes the size.", "Discover"],
        ["The space from the card to the wall.", "Distance"],
        ["The rabbit is afraid to come out.", "Timid"],
      ],
      [
        ["You feel confused by a strange noise.", "Puzzled"],
        ["You find out which toy made the noise.", "Discover"],
        ["The space between your chair and the door.", "Distance"],
        ["A shy kitten hides from visitors.", "Timid"],
      ],
    ),
  ),
  choice(
    "tobi-reading-inference",
    pick(
      f,
      "Why does Maya leave the flashlight on the table while she tests?",
      "What does Ben’s “stretchy ears” joke help us picture?",
    ),
    pick(
      f,
      "She wants to change only the rabbit’s position.",
      "The shadow getting bigger and smaller.",
    ),
    pick(
      f,
      [
        "She wants the room to be completely dark.",
        "She thinks the flashlight is a carrot.",
        "She wants to cut another rabbit.",
      ],
      [
        "The cardboard becoming rubber.",
        "The flashlight running away.",
        "The rabbit eating a real garden.",
      ],
    ),
    pick(
      f,
      "Keeping the light still lets Maya connect the changed shadow to moving the rabbit.",
      "The real card stays the same. Ben jokes about how its shadow seems to stretch.",
    ),
  ),
  open(
    "tobi-story-creation",
    pick(
      f,
      "Give the rabbit a new ending. Tell one thing Maya could do with the card and what the audience would see.",
      "Invent one new moment for the puppet show. Say where Maya moves the rabbit and what happens to its shadow.",
    ),
    pick(
      f,
      "Maya moves the rabbit toward the flashlight so it looks giant again. The fox drops its hat and runs away.",
      "She moves the rabbit near the wall. Its shadow becomes small, so it can pretend to hide in a tiny house.",
    ),
    [
      "Invents a clear event for the show",
      "Names movement toward the light or toward the wall",
      "Gives the matching shadow-size change",
      "Connects that change to the invented event; accept any coherent creative idea",
    ],
  ),
];

const shadowTeaching: TeachingBlock[] = [
  {
    kind: "concept",
    title: "How a shadow theatre works",
    diagram: "shadow-theatre",
    text: "Meet three parts: light, puppet, screen. The flashlight sends out light. The thick card blocks some of it. The wall is the screen: the dark shape appears where the card blocks the light. That dark shape is a shadow.\nThe card is opaque. Say “oh-PAYK.” Opaque means light cannot pass through it. A clear window lets most light through; it is transparent.",
    highlight: ["light", "puppet", "screen", "shadow", "opaque", "transparent"],
    sources: [source.shadows, source.opacity],
  },
  {
    kind: "example",
    title: "Tiny puppet. Giant shadow.",
    text: "Keep the flashlight and wall still. Move the puppet toward the flashlight: its shadow on the wall gets bigger. Move it toward the wall: its shadow gets smaller. The puppet itself stays the same size.\nThink of light spreading out from a small flashlight. A puppet near the light blocks a wider patch farther away. Use the diagram to try it. Change one thing, then watch what happens.",
    highlight: ["bigger", "smaller", "same size"],
  },
];
const shadowQuestions = (f: number): Question[] => [
  choice(
    "tobi-shadow-cause",
    pick(
      f,
      "Why does thick card make a dark shape on a wall?",
      "What is a shadow?",
    ),
    pick(
      f,
      "It blocks some of the flashlight’s light.",
      "A darker area where something blocks light.",
    ),
    pick(
      f,
      [
        "It paints the wall black.",
        "It sends darkness out of its ears.",
        "It makes the wall disappear.",
      ],
      [
        "Black paint leaking from a flashlight.",
        "A second solid object on the wall.",
        "A sound made by a puppet.",
      ],
    ),
    "The puppet blocks light that would otherwise reach part of the wall. A shadow is an area receiving less light, not paint or a new object.",
  ),
  open(
    "tobi-shadow-predict",
    pick(
      f,
      "The light and wall stay still. You move a star puppet closer to the light. What happens to its shadow? Does the star itself change size?",
      "The light and wall stay still. You move a fish puppet closer to the wall. What happens to its shadow? Does the fish itself change size?",
    ),
    pick(
      f,
      "The star’s shadow gets bigger, but the card star stays the same size.",
      "The fish’s shadow gets smaller, but the card fish stays the same size.",
    ),
    [
      "Predicts the correct shadow-size change",
      "Recognizes that the puppet’s own size stays the same",
      "Distinguishes a shadow from the solid puppet",
      "Connects the changed position to the changed shadow; accept a short explanation",
    ],
  ),
  match("tobi-shadow-parts", "Connect each part or material to its job.", [
    ["Flashlight", "Makes the light"],
    ["Card puppet", "Blocks some light"],
    ["White wall", "Shows the shadow"],
    ["Clear window", "Lets most light through"],
  ]),
  choice(
    "tobi-shadow-vocabulary",
    pick(
      f,
      "Which thing is opaque?",
      "Which material lets most light through?",
    ),
    pick(f, "A thick cardboard square", "A clear glass window"),
    pick(
      f,
      [
        "A clean clear window",
        "The empty space between the light and wall",
        "A clear glass pane",
      ],
      ["A wooden door", "A thick cardboard square", "A metal spoon"],
    ),
    pick(
      f,
      "Thick cardboard does not let light through it. That is what opaque means.",
      "A clear window is transparent: most light can pass through it. Wood, thick card and metal block light.",
    ),
  ),
  open(
    "tobi-fair-test",
    pick(
      f,
      "You want to find out whether moving the puppet changes its shadow. Name what you will move and one thing you will keep still. Why?",
      "Ben moves the light, puppet and screen together. Help him make a clearer test. What should he change, and what should stay still?",
    ),
    "Move only the puppet. Keep the light and wall still so you can tell whether moving the puppet changed the shadow.",
    [
      "Chooses to move the puppet",
      "Names the light or screen as something to keep still",
      "Makes only one deliberate change",
      "Explains that this helps identify what caused the result; everyday words are enough",
    ],
  ),
];

const artTeaching: TeachingBlock[] = [
  {
    kind: "art",
    title: "A city made of colour",
    diagram: "mondrian-study",
    text: "Meet Piet Mondrian, an artist who made pictures from lines and blocks of colour. In 1942–43 he painted Broadway Boogie Woogie. Its little red, yellow and blue blocks can suggest a busy city and the beat of music. He did not need to draw a car to make you think of moving traffic!\nOur colour study is a new learning picture inspired by that idea. It is not Mondrian’s actual painting. Notice the crossing lines. Which part feels busy to you? Point to a colour or shape that helps explain why.",
    highlight: ["Mondrian", "lines", "colour"],
    sources: [source.art],
  },
  {
    kind: "concept",
    title: "Sharing the colour tiles",
    text: "Imagine four equal square tiles. Two are blue and two are white. Two of the four equal tiles cover one half of the whole square. We write one half as 1/2.\nOne of the four equal tiles is one quarter. We write it as 1/4. Two quarters make one half. The parts must be equal in size: a giant piece and a tiny piece are not fair halves.",
    highlight: ["equal", "half", "quarter"],
    fractionModel: {
      mode: "equivalence",
      numerator: 1,
      denominator: 2,
      otherNumerator: 2,
      otherDenominator: 4,
      steps: [
        "Start with one whole strip.",
        "Split it into 2 equal parts. One part is one half.",
        "Split the same whole into 4 equal parts. Each is one quarter.",
        "Two quarters cover exactly the same amount as one half.",
      ],
    },
  },
];
const artQuestions = (f: number): Question[] => [
  choice(
    "tobi-art-mondrian",
    pick(
      f,
      "Which artist made Broadway Boogie Woogie from lines and blocks of colour?",
      "What can suggest a city in Mondrian’s Broadway Boogie Woogie?",
    ),
    pick(f, "Piet Mondrian", "Crossing lines and small colour blocks"),
    pick(
      f,
      [
        "The story’s puppet rabbit",
        "Maya’s brother Ben",
        "The flashlight maker",
      ],
      [
        "A photograph of every building",
        "Only a painted rabbit",
        "Written street directions and no colours",
      ],
    ),
    pick(
      f,
      "Piet Mondrian made the painting in 1942–43. His lines and colour blocks can remind us of city streets and music.",
      "Pictures can suggest an idea through shapes and colour. Mondrian’s crossing lines and little blocks can remind a viewer of city movement.",
    ),
  ),
  open(
    "tobi-art-interpretation",
    pick(
      f,
      "Design your own busy-city picture using lines and colours. Name one choice you would make and explain how it would feel busy.",
      "Design a quiet-city picture using lines and colours. Name one choice you would make and explain how it would feel quiet.",
    ),
    pick(
      f,
      "I would put lots of little yellow squares close together so they look like lights flashing along crowded streets.",
      "I would use a few widely spaced blue lines and lots of empty space, so the streets feel calm.",
    ),
    [
      "Names a colour or line choice",
      "Describes a specific arrangement, size or amount",
      "Connects the choice to busy or quiet",
      "Gives a coherent reason; accept any supported visual interpretation",
    ],
  ),
  match("tobi-equal-parts", "Connect each description to its meaning.", [
    ["One of two equal parts", "One half"],
    ["One of four equal parts", "One quarter"],
    ["Two quarters together", "Same amount as one half"],
    ["One giant piece and one tiny piece", "Not equal halves"],
  ]),
  choice(
    "tobi-fraction-quantity",
    pick(
      f,
      "Four equal tiles cover a square. Two tiles are blue. What fraction of the square is blue?",
      "Four equal tiles cover a square. One tile is yellow. What fraction of the square is yellow?",
    ),
    pick(f, "One half", "One quarter"),
    pick(
      f,
      ["One quarter", "The whole square", "None of the square"],
      ["One half", "The whole square", "Three quarters"],
    ),
    pick(
      f,
      "Two of four equal tiles cover the same amount as one of two equal halves.",
      "Each of four equal pieces is one quarter of the whole.",
    ),
  ),
  open(
    "tobi-equality-explain",
    pick(
      f,
      "Ben cuts a paper square into one huge piece and one tiny piece. He calls them halves. Is he right? Explain what halves need.",
      "Maya colours two of four equal tiles. Ben says she coloured less than half. Is he right? Explain using the tiles.",
    ),
    pick(
      f,
      "No. Halves must be two equal parts of the same whole. His pieces are different sizes.",
      "No. Two tiles are coloured and two are not. The two equal groups each cover half the square.",
    ),
    pick(
      f,
      [
        "Says the pieces are not halves",
        "Identifies that their sizes differ",
        "Explains that halves must be equal",
        "Connects both parts to the same whole",
      ],
      [
        "Rejects the less-than-half claim",
        "Recognizes two coloured and two uncoloured tiles",
        "Explains that the tiles or two groups are equal",
        "Concludes that two quarters make one half",
      ],
    ),
  ),
];

const definitions = [
  {
    title: "The giant rabbit mystery",
    subjects: ["Reading comprehension", "Vocabulary", "Storytelling"],
    objectives: [
      "Use puzzled, discover, distance and timid in context",
      "Explain a character’s curiosity using one action and a reason",
      "Create a plausible new story event",
    ],
    teaching: readingTeaching,
    make: readingQuestions,
  },
  {
    title: "The shadow workshop",
    subjects: ["How things work", "Science"],
    objectives: [
      "Name light, puppet and screen and explain how they form a shadow",
      "Predict a shadow-size change with a stationary light and screen",
      "Distinguish opaque from transparent and plan one-change tests",
    ],
    teaching: shadowTeaching,
    make: shadowQuestions,
  },
  {
    title: "Colours, cities & fair shares",
    subjects: ["Art appreciation", "Math"],
    objectives: [
      "Recognize Mondrian and explain a visual choice using colour or lines",
      "Explain equal halves and quarters",
      "Show that two quarters cover one half of the same whole",
    ],
    teaching: artTeaching,
    make: artQuestions,
  },
];
const forms = [0, 1].map((f) =>
  definitions.flatMap((d, c) =>
    d.make(f).map((q, j) => {
      // Published, deterministic positions: no answer-location pattern across chunks
      // and no reshuffle while the child is answering or revisiting feedback.
      if (q.kind === "choice" && q.choices && q.correct) {
        const positions = f === 0 ? [2, 0, 3, 1, 0, 2] : [1, 3, 0, 2, 3, 1];
        const choices = q.choices.filter((item) => item !== q.correct);
        choices.splice(positions[c * 2 + (j === 3 ? 1 : 0)], 0, q.correct);
        q = { ...q, choices };
      }
      return {
        ...q,
        id: `${TOBI_DAY_ONE_ID}-f${f + 1}-q${c * 5 + j + 1}`,
      };
    }),
  ),
);
export const TOBI_DAY_ONE: DailyLesson = {
  id: TOBI_DAY_ONE_ID,
  version: 3,
  order: 1,
  title: "Day 1 · Shadows, stories & colour",
  subjects: [...new Set(definitions.flatMap((d) => d.subjects))],
  objectives: definitions.flatMap((d) => d.objectives),
  teaching: definitions.flatMap((d) => d.teaching),
  forms,
  chunks: definitions.map((d, c) => ({
    id: `${TOBI_DAY_ONE_ID}-chunk-${c + 1}`,
    title: d.title,
    subjects: d.subjects,
    objectives: d.objectives,
    teaching: d.teaching,
    questionIds: forms.map((form) =>
      form.slice(c * 5, c * 5 + 5).map((q) => q.id),
    ),
  })),
};
export const TOBI_LESSONS: DailyLesson[] = [TOBI_DAY_ONE];
