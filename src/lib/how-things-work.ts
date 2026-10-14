import type { DailyLesson, Question } from "./content-types";
const id = "how-things-work-bridges-v1";
const questions = (f: number): Question[] => {
  const items: Omit<Question, "id">[] = [
    {
      kind: "choice",
      objective: "bridge-load-path",
      points: 4,
      prompt: f
        ? "A cyclist rides over a beam bridge. Where does the weight go next, after the deck and beams?"
        : "A bus crosses a beam bridge. Which path carries its weight?",
      correct: f
        ? "Into the supports, then the ground"
        : "Deck → beams → supports → ground",
      choices: f
        ? [
            "Into the river",
            "Into the supports, then the ground",
            "Only into the paint",
            "Back into the bus",
          ]
        : [
            "Deck → river → sky",
            "Deck → beams → supports → ground",
            "Deck → railings → clouds",
            "Only into the middle of the deck",
          ],
      explanation:
        "The deck and beams transfer the load to the supports, which transfer it to the ground.",
    },
    {
      kind: "open",
      objective: "bridge-explain",
      points: 4,
      prompt: f
        ? "Two toy bridges use identical rulers. One has supports farther apart. Predict which will bend more under the same toy car. Explain why and how you could check fairly."
        : "You move the supports of a ruler bridge farther apart. What might happen when the same toy car sits in the middle? Explain why and how you could check fairly.",
      rubric: [
        "Predicts more bending with a longer unsupported span",
        "Connects the change to the distance between supports",
        "Keeps the ruler and toy-car load the same",
        "Compares bending or sag without claiming all real bridges behave identically",
      ],
      exemplar:
        "The longer span will probably bend more. More of the ruler is unsupported. I would use the same ruler and toy car and measure the sag at each support spacing. Real bridges can use different materials or extra structures.",
      explanation:
        "A longer unsupported span usually bends more when the beam and load stay the same. Change the spacing only, then compare the sag.",
    },
    {
      kind: "match",
      objective: "bridge-parts",
      points: 4,
      prompt: "Connect each part to its job.",
      matches: [
        { left: "Deck", right: "Surface you travel on" },
        { left: "Beam", right: "Carries the deck between supports" },
        { left: "Support", right: "Transfers weight toward the ground" },
        { left: "Span", right: "Distance between supports" },
      ],
      explanation:
        "Deck: travel surface. Beam: carries the deck. Support: passes weight toward the ground. Span: distance between supports.",
    },
    {
      kind: "choice",
      objective: "bridge-history",
      points: 4,
      prompt: f
        ? "A book calls the 1779 Iron Bridge the first cast-iron bridge. Which conclusion is justified?"
        : "The Iron Bridge was built in 1779 using cast iron. What does “first cast-iron bridge” mean?",
      correct:
        "It was a first for that material—not the first bridge of any kind.",
      choices: [
        "Nobody crossed rivers before 1779.",
        "Every earlier bridge was made of iron.",
        "It was a first for that material—not the first bridge of any kind.",
        "All bridges were invented in England.",
      ],
      explanation:
        "“First” needs a category. The Iron Bridge was a milestone for cast iron. Bridges made from other materials already existed.",
    },
    {
      kind: "open",
      objective: "bridge-tradeoffs",
      points: 4,
      prompt: f
        ? "A wide canal needs a crossing. Boats need space underneath, and the town has a limited budget. Explain one possible design choice, its benefit, a drawback, and what you would investigate before choosing."
        : "A river needs a bridge, but boats must pass underneath. More supports might help carry the load. Explain one benefit, one drawback, a possible alternative, and what you would investigate.",
      rubric: [
        "Explains how a support or design choice helps carry a load or cross a gap",
        "Identifies a relevant tradeoff such as boat clearance or cost",
        "Suggests a plausible alternative without claiming it is automatically safe",
        "Names information needed before deciding, such as span, loads, river depth or cost",
      ],
      exemplar:
        "Extra supports can shorten each span, but they may block boats and cost money to build in water. An engineer could compare a design with a longer clear span. They would need the boat clearance, expected loads, river conditions and costs.",
      explanation:
        "Good engineering balances needs. Shorter spans can help a beam, but supports in water can obstruct boats and add construction costs. A final design needs evidence.",
    },
  ];
  return items.map((q, i) => ({ ...q, id: `${id}-f${f + 1}-q${i + 1}` }));
};
const forms = [questions(0), questions(1)];
const teaching: DailyLesson["teaching"] = [
  {
    kind: "concept",
    title: "How does a bridge hold you up?",
    diagram: "beam-bridge",
    text: "Tap a part. Follow the weight from the road to the ground.",
    highlight: ["weight"],
  },
  {
    kind: "example",
    title: "A tiny bridge experiment",
    text: "Lay a ruler across two stacks of books. Put one small toy in the middle. Move the stacks a little farther apart and compare the bend. Keep the ruler and toy the same.\nA longer span usually bends more. Real engineers also consider materials, loads and the river below.",
    highlight: ["span", "same"],
  },
  {
    kind: "concept",
    title: "A new way to cross",
    text: "The Iron Bridge in England was erected in 1779. It was the first bridge made entirely of cast iron. People had built bridges from other materials long before that.\nNew materials can change what builders can do. More supports or stronger materials also have costs.",
    sources: [
      {
        label: "English Heritage",
        url: "https://www.english-heritage.org.uk/visit/places/iron-bridge/history/",
      },
      {
        label: "PBS NOVA: bridge design",
        url: "https://www.pbs.org/wgbh/nova/education/tech/build-bridge.html",
      },
    ],
  },
];
export const HOW_THINGS_WORK: DailyLesson = {
  id,
  order: 0,
  title: "How bridges work",
  subjects: ["How things work"],
  objectives: [
    "Name the deck, beam, supports and span",
    "Trace how a load reaches the ground",
    "Explain a design tradeoff and qualify a historical first",
  ],
  version: 2,
  teaching,
  forms,
  chunks: [
    {
      id: `${id}-chunk-1`,
      title: "Inside a bridge",
      subjects: ["How things work"],
      objectives: ["Explain the parts and the path of a load"],
      teaching,
      questionIds: forms.map((f) => f.map((q) => q.id)),
    },
  ],
};
