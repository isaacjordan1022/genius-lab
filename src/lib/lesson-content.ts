import { CHUNKS } from "./content";
import type {
  DailyLesson,
  LearningChunk,
  Question,
  TeachingBlock,
} from "./content-types";

// Versioned content: historical attempts retain their original IDs and answer keys.
// This module is server-only content; clients receive the public question projection.
type Card = TeachingBlock;
type Segment = {
  title: string;
  subjects: string[];
  objectives: string[];
  teaching: Card[];
  make: (form: number) => Question[];
};
const card = (
  kind: "vocabulary" | "passage" | "concept" | "example" | "art",
  title: string,
  text: string,
  highlight: string[] = [],
): Card => ({ kind, title, text, highlight });
const wordExamples: Record<string, string> = {
  infer: "I infer it rained because the umbrella is dripping.",
  evidence: "The wet umbrella is evidence for my idea.",
  contrast: "The pale moon creates contrast against the dark sky.",
  texture: "Short scratchy marks suggest the bark’s rough texture.",
  composition: "Moving the tree to the edge changes the composition.",
  subtle: "The two blue shades have a subtle difference.",
  reluctant: "She was reluctant to step into the dark cellar.",
  resourceful: "He was resourceful: a spare clip repaired the model.",
};
const vocab = (title: string, pairs: [string, string][]): Card => ({
  kind: "vocabulary",
  title,
  text: "Meet the words. Try saying each one in a sentence of your own.",
  terms: pairs.map(([word, definition]) => ({
    word,
    meaning: definition,
    example:
      wordExamples[word] ||
      `Try using ${word} to describe something you notice.`,
  })),
  highlight: pairs.map(([word]) => word),
});
const old = (domain: number, form: number, index: number): Question =>
  structuredClone(CHUNKS[domain].forms[form][index]);
const ask = (
  objective: string,
  prompt: string,
  exemplar: string,
  rubric: string[],
): Question => ({
  id: "",
  kind: "open",
  objective,
  prompt,
  exemplar,
  rubric,
  points: 4,
  explanation: `A strong answer ${rubric.map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join("; ")}. One possible answer: ${exemplar}`,
});
const pair = (
  objective: string,
  prompt: string,
  pairs: [string, string][],
): Question => ({
  id: "",
  kind: "match",
  objective,
  prompt,
  matches: pairs.map(([left, right]) => ({ left, right })),
  points: 4,
  explanation: pairs.map(([left, right]) => `${left} → ${right}`).join(". "),
});
const choose = (
  objective: string,
  prompt: string,
  correct: string,
  wrong: string[],
): Question => ({
  id: "",
  kind: "choice",
  objective,
  prompt,
  correct,
  choices: [wrong[0], correct, ...wrong.slice(1)],
  points: 4,
  explanation: `${correct} is the answer supported by the information in the question.`,
});
const select = <T>(f: number, a: T, b: T): T => (f === 0 ? a : b);

const inference: Segment = {
  title: "The clue desk",
  subjects: ["Reading comprehension", "Vocabulary"],
  objectives: [
    "Infer cautiously from two details",
    "Explain the connection between evidence and a claim",
  ],
  teaching: [
    vocab("Two detective tools", [
      ["infer", "Reach a reasonable conclusion from clues."],
      ["evidence", "Details that support or challenge a claim."],
    ]),
    card(
      "passage",
      "The suspicious windmill",
      "The class windmill stopped turning. “A curse!” declared Max, who also blamed curses for untied shoes. Lina spotted a paper flap pressing against the wheel. She moved it. The blades spun. Max glanced suspiciously at his trainers.",
    ),
    card(
      "example",
      "Build a thinking bridge",
      "Claim: the flap stopped the wheel.\nEvidence: the flap pressed against it; moving the flap made it spin.\nConnection: removing the obstruction allowed movement. A guess becomes stronger when you can explain its evidence.",
      ["claim", "evidence", "connection"],
    ),
  ],
  make: (f) => [
    old(0, f, 0),
    old(0, f, 13),
    pair("inference-tools", "Connect each clue-desk note to its job.", [
      ["The wheel is not moving.", "Observation"],
      ["A flap may be blocking it.", "Inference"],
      ["Move only the flap and watch.", "Check"],
      ["It turned after the flap moved.", "Supporting evidence"],
    ]),
    old(0, f, 1),
    ask(
      "evidence-transfer",
      select(
        f,
        "A pupil says a plant is dead because one leaf droops. Give a more cautious explanation, name a clue to check, explain why it helps, and say what remains uncertain.",
        "A pupil says a bicycle is broken because it moves slowly. Offer a cautious explanation, a useful check, why it helps, and one thing still unknown.",
      ),
      select(
        f,
        "It might need water. I would feel the soil; dry soil would support that idea. I still do not know whether the roots are healthy.",
        "A tyre might be soft. I would check its pressure because low pressure can slow the bike. I still do not know whether another part is faulty.",
      ),
      [
        "Offers a plausible explanation",
        "Uses uncertain language rather than claiming certainty",
        "Names a relevant check and explains its use",
        "Identifies something the evidence does not yet establish",
      ],
    ),
  ],
};
const fractionBasics: Segment = {
  title: "The fair-share workshop",
  subjects: ["Math"],
  objectives: [
    "Recognize equivalent fractions",
    "Explain why equal parts matter",
  ],
  teaching: [
    card(
      "concept",
      "Same amount, different slices",
      "A denominator names the number of equal parts in a whole. A numerator counts the parts you have. One enormous slice plus three crumbs is not four quarters, no matter how persuasive the cake thief sounds.",
      ["denominator", "numerator", "equal"],
    ),
    card(
      "example",
      "Half a ribbon, two names",
      "Fold a ribbon in half. Then fold each half again. The first half now contains two of four equal sections: 1/2 = 2/4. Multiply the top and bottom by the same nonzero number to rename the amount.",
      ["1/2 = 2/4"],
    ),
    card(
      "concept",
      "Compare fairly",
      "First check that the wholes are the same size. Then use equal-sized parts. To compare 2/3 and 3/5, use fifteenths: 10/15 is greater than 9/15.",
    ),
  ],
  make: (f) => [
    old(1, f, 0),
    ask(
      "fraction-model",
      select(
        f,
        "Explain why 1/2 and 3/6 of the same ribbon are equal. Describe the equal parts, count the parts in a half, and explain why the ribbon length must stay the same.",
        "Explain why 2/3 and 4/6 of the same ribbon are equal. Describe splitting each third, count the sixths, and explain why the whole stays the same.",
      ),
      select(
        f,
        "Six equal pieces make the ribbon. Half contains three pieces, so 1/2 = 3/6. Comparing different ribbon lengths would not necessarily compare equal amounts.",
        "Split each third into two equal pieces. Two thirds become four sixths. The ribbon is unchanged, so the amount is unchanged.",
      ),
      [
        "Describes equal-sized parts",
        "States the correct equivalent fractions",
        "Explains how the parts are regrouped or split",
        "Keeps the same whole in the comparison",
      ],
    ),
    pair(
      "fraction-equivalence",
      "Connect two names for the same amount.",
      select(
        f,
        [
          ["1/2", "3/6"],
          ["1/3", "2/6"],
          ["3/4", "6/8"],
          ["2/5", "4/10"],
        ],
        [
          ["2/3", "4/6"],
          ["1/4", "2/8"],
          ["3/5", "6/10"],
          ["5/6", "10/12"],
        ],
      ),
    ),
    old(1, f, 1),
    ask(
      "fraction-critique",
      select(
        f,
        "A baker cuts a cake into four unequal pieces and calls each a quarter. Explain the error, describe a fair quarter, suggest a repair, and say what should stay unchanged.",
        "A pupil says one of three unequal strips is one third of a sheet. Explain the error, describe a fair third, suggest a repair, and say what should stay unchanged.",
      ),
      select(
        f,
        "Quarters must be equal parts. Each should be one of four equal amounts. Recut or measure four equal portions while keeping the same total cake.",
        "Thirds must be equal parts. Each should be one of three equal areas. Measure and cut three equal strips from the same whole sheet.",
      ),
      [
        "Identifies the unequal-parts error",
        "Defines the named fraction using equal parts",
        "Proposes a practical way to make equal shares",
        "Keeps the original total whole unchanged",
      ],
    ),
  ],
};
const art: Segment = {
  title: "Monet’s light laboratory",
  subjects: ["Art appreciation", "Vocabulary"],
  objectives: [
    "Connect Monet with Impressionism",
    "Support an interpretation with visual details",
  ],
  teaching: [
    card(
      "art",
      "One place, many moods",
      "Claude Monet was a French Impressionist painter. He painted the same subjects under different light and weather. The place stayed put; its appearance changed. Imagine your bedroom trying on sunrise, rain and evening.",
      ["Claude Monet", "Impressionist"],
    ),
    vocab("Your looking kit", [
      ["contrast", "A noticeable difference, such as light beside dark."],
      ["texture", "How a surface feels or appears to feel."],
      ["composition", "How elements are arranged."],
      ["subtle", "Slight or not immediately obvious."],
    ]),
    card(
      "example",
      "Give an interpretation somewhere to stand",
      "An imagined small white boat sits under a huge dark sky. “It feels vulnerable” is one interpretation. The tiny boat and enormous sky support it. Another interpretation can work if it explains different visible clues.",
    ),
  ],
  make: (f) => [
    old(2, f, 0),
    old(2, f, 13),
    old(2, f, 11),
    old(2, f, 1),
    ask(
      "light-plan",
      select(
        f,
        "Plan two sketches of the same tree, at dawn and noon. Keep the viewpoint fixed. Name two visual changes you would observe and explain how comparing them investigates light.",
        "Plan two sketches of the same wall, in mist and clear sunshine. Keep the viewpoint fixed. Name two visual changes to observe and explain how the comparison investigates light.",
      ),
      select(
        f,
        "I would stand in the same place. I would compare shadow length and the colours of lit leaves. Keeping the tree and viewpoint fixed makes changes in light easier to notice.",
        "I would use the same spot. I would compare shadow edges and the strength of light-dark contrast. Keeping the wall and viewpoint fixed helps me study the lighting conditions.",
      ),
      [
        "Keeps subject and viewpoint consistent",
        "Names one relevant visible difference",
        "Names a second relevant visible difference",
        "Explains how comparison helps investigate light",
      ],
    ),
  ],
};
const character: Segment = {
  title: "Words with personality",
  subjects: ["Vocabulary", "Creative writing"],
  objectives: [
    "Use reluctant and resourceful accurately",
    "Show a feeling through action",
  ],
  teaching: [
    vocab("Two words, one possible hero", [
      ["reluctant", "Hesitant or unwilling."],
      ["resourceful", "Good at solving problems with what is available."],
    ]),
    card(
      "passage",
      "The reluctant rescuer",
      "Ruth stopped at the dark cellar door. She gripped the rail. Then she strapped a torch to an old carton so both hands were free to carry the kitten. Reluctant and resourceful can describe the same person. People are not single-word sandwiches.",
    ),
    card(
      "example",
      "Show, then explain",
      "“Ruth felt nervous” names a feeling. “Ruth gripped the rail” lets the reader infer it. A useful solution also fits the problem: a torch holder helps with darkness and occupied hands.",
    ),
  ],
  make: (f) => [
    old(0, f, 3),
    old(0, f, 14),
    old(0, f, 11),
    old(0, f, 4),
    ask(
      "character-revision",
      select(
        f,
        "Rewrite “Eli was nervous but solved the problem” as two or three specific sentences. Give Eli a small problem, show nervousness through action, use reluctant correctly, and make his action solve the problem.",
        "Rewrite “Miri felt unsure but found a solution” as two or three specific sentences. Give her a small problem, show uncertainty through action, use reluctant correctly, and make her action solve it.",
      ),
      select(
        f,
        "Eli was reluctant to cross the puddle and squeezed his bag straps. He laid a wide plank over the water and walked across.",
        "Miri was reluctant to display her wobbly model and picked at her sleeve. She braced its legs with folded card so it stood upright.",
      ),
      [
        "Gives a specific small problem",
        "Shows uncertainty through an observable action",
        "Uses reluctant accurately",
        "Makes the solution follow from the problem",
      ],
    ),
  ],
};
const fairTest: Segment = {
  title: "The fan investigation",
  subjects: ["Science", "Analytical thinking"],
  objectives: [
    "Design a fair comparison",
    "Distinguish a measured result from a cause claim",
  ],
  teaching: [
    card(
      "concept",
      "Water can take an invisible exit",
      "Evaporation turns liquid water into water vapor in the surrounding air. It can happen without boiling. Moving air often carries vapor away from a wet surface. We can test whether it changes drying speed.",
      ["evaporation", "water vapor"],
    ),
    card(
      "example",
      "Change one useful thing",
      "Two matching wet cloths start with the same water. Keep their size, material, temperature and drying time alike. Give only one a fan. Measure water lost. If one cloth also sits on a radiator, the fan cannot take all the credit.",
      ["same", "only one"],
    ),
    card(
      "concept",
      "A result is a clue, not a crown",
      "Repeat the comparison. A pattern across trials is stronger evidence than one surprising result. Record measurements instead of “it looks sort of dryer.”",
    ),
  ],
  make: (f) => [
    old(1, f, 6),
    old(1, f, 14),
    old(1, f, 12),
    old(1, f, 10),
    ask(
      "repair-experiment",
      select(
        f,
        "One sponge starts with 40 mL of water and another with 70 mL. Only the first gets a fan. Explain the problem, propose two fair controls, and name a measurement.",
        "A small cloth gets a fan while a much larger cloth does not. Explain the problem, propose two fair controls, and name a measurement.",
      ),
      select(
        f,
        "Starting water also differs, so the fan is not the only possible cause. Start equal sponges with equal water and use equal drying times. Measure water or mass lost.",
        "Cloth size also differs. Use matching cloth sizes and equal starting water, then compare mass lost over the same time.",
      ),
      [
        "Identifies the extra changing factor",
        "Specifies one relevant condition to keep equal",
        "Specifies a second relevant condition to keep equal",
        "Names a measurable drying outcome",
      ],
    ),
  ],
};
const history: Segment = {
  title: "The evidence archive",
  subjects: ["History", "Reading comprehension"],
  objectives: [
    "Compare source purposes",
    "Choose an additional source to test a claim",
  ],
  teaching: [
    card(
      "concept",
      "History leaves crumbs",
      "A primary source comes from the time or event being studied: a letter, photograph, receipt or diary. A secondary source later explains or analyzes the past. Primary does not mean automatically correct.",
      ["primary source", "secondary source"],
    ),
    card(
      "passage",
      "Two fictional ferry reports",
      "Advertisement: “Our ferry makes crossing the bay a delight!”\nPassenger diary: “Quicker than walking round the bay, but the waves made the trip bumpy.”\nThese are invented practice sources, not real historical records.",
    ),
    card(
      "example",
      "Ask four questions",
      "Who made it? When? For what purpose? What can it actually show? An advertisement wants customers. A diary describes one experience. Compare independent accounts before claiming what everyone thought.",
    ),
  ],
  make: (f) => [
    old(3, f, 0),
    old(3, f, 13),
    old(3, f, 11),
    old(3, f, 1),
    ask(
      "source-limits",
      select(
        f,
        "A fictional photograph shows a crowded market. A caption says, “The market was always packed.” Give one supported claim, one unsupported claim, explain the limit, and name another useful record.",
        "A fictional letter says, “I loved the new school lunches.” A writer claims every pupil loved them. Give one supported claim, one unsupported claim, explain the limit, and name another useful record.",
      ),
      select(
        f,
        "People crowded the market when the photograph was taken. It does not show every day. I would compare dated photographs or attendance records across several dates.",
        "The letter writer liked the lunches. One pupil cannot speak for everyone. I would examine other pupils’ letters or a survey from that time.",
      ),
      [
        "States what the source directly supports",
        "Identifies an overgeneralization",
        "Explains the limited time or viewpoint",
        "Proposes relevant additional evidence",
      ],
    ),
  ],
};
const language: Segment = {
  title: "The sentence tinkerer",
  subjects: ["Grammar", "Literary concepts"],
  objectives: ["Explain a metaphor", "Make a sentence’s meaning precise"],
  teaching: [
    card(
      "concept",
      "Borrow an image",
      "A metaphor describes one thing as another to suggest a shared quality: “Her idea was a seed.” The idea might grow. Nobody needs to water her head. A simile compares explicitly with like or as.",
      ["metaphor", "simile"],
    ),
    card(
      "example",
      "Whose notebook?",
      "“Avi handed Ben his notebook” could mean Avi’s or Ben’s. Name the owner to remove confusion. Also match the verb to the main subject: “The packet of seeds is on the desk.” Packet is singular.",
      ["owner", "main subject"],
    ),
    card(
      "concept",
      "Match the relationship",
      "An analogy compares relationships. Brush is to painter as pen is to writer: each creator uses that tool. Explain the relationship before guessing a missing word.",
      ["analogy"],
    ),
  ],
  make: (f) => [
    old(4, f, 3),
    ask(
      "metaphor-explanation",
      select(
        f,
        "Explain “Her idea was a seed.” Identify what is being compared, give a shared quality, explain why it is not literal, and describe a situation where it fits.",
        "Explain “The question was a locked door.” Identify what is compared, a shared quality, why it is not literal, and a situation where it fits.",
      ),
      select(
        f,
        "An idea is compared to a seed because each can develop into something larger. An idea is not a plant. It fits a small suggestion that becomes a big project.",
        "A question is compared to a locked door because each can block progress until solved or opened. A question is not wooden. It fits a puzzle holding up an investigation.",
      ),
      [
        "Identifies both sides of the comparison",
        "Explains a relevant shared quality",
        "Distinguishes figurative from literal meaning",
        "Gives a fitting original situation",
      ],
    ),
    old(4, f, 11),
    old(0, f, 6),
    ask(
      "grammar-repair",
      select(
        f,
        "Rewrite “Dina told Sara she had won” so Sara is clearly the winner. Explain the original ambiguity. Then correct “The box of pencils are heavy” and explain the verb choice.",
        "Rewrite “Avi handed Ben his drawing” so Avi clearly owns it. Explain the original ambiguity. Then correct “The bag of marbles are missing” and explain the verb choice.",
      ),
      select(
        f,
        "Dina told Sara that Sara had won. She could mean either girl. The box of pencils is heavy, because the main subject box is singular.",
        "Avi handed Ben Avi’s drawing. His could mean either boy. The bag of marbles is missing, because bag is singular.",
      ),
      [
        "Makes the intended person or owner explicit",
        "Explains why the original pronoun was ambiguous",
        "Corrects the verb to is",
        "Identifies the singular main subject",
      ],
    ),
  ],
};
const fractionOperations: Segment = {
  title: "The fraction kitchen",
  subjects: ["Math"],
  objectives: [
    "Add and subtract unlike fractions",
    "Explain a calculation and check it",
  ],
  teaching: [
    card(
      "example",
      "Give the pieces the same name",
      "1/4 + 1/3 = 3/12 + 4/12 = 7/12. Twelfths make the piece sizes match. Count the pieces; do not add the denominators. The slices do not shrink just because you add them.",
      ["same", "7/12"],
    ),
    card(
      "example",
      "Take away, then check",
      "3/4 − 1/6 = 9/12 − 2/12 = 7/12. Add back what you removed: 7/12 + 2/12 = 9/12. A check is your calculation’s seatbelt.",
      ["check"],
    ),
  ],
  make: (f) => [
    old(1, f, 2),
    old(1, f, 13),
    pair(
      "fraction-operations",
      "Connect each calculation to its value.",
      select(
        f,
        [
          ["1/2 + 1/4", "3/4"],
          ["3/4 − 1/2", "1/4"],
          ["1/3 + 1/3", "2/3"],
          ["5/6 − 1/3", "1/2"],
        ],
        [
          ["1/3 + 1/6", "1/2"],
          ["7/8 − 1/4", "5/8"],
          ["1/5 + 2/5", "3/5"],
          ["3/4 − 1/2", "1/4"],
        ],
      ),
    ),
    old(1, f, 3),
    ask(
      "fraction-error",
      select(
        f,
        "A pupil writes 1/3 + 1/3 = 2/6. Correct it, explain the denominator, describe a simple picture, and check whether the answer should be larger than 1/3.",
        "A pupil writes 2/5 + 1/5 = 3/10. Correct it, explain the denominator, describe a simple picture, and check whether the answer should be larger than 2/5.",
      ),
      select(
        f,
        "The answer is 2/3. The parts remain thirds. Shade two of three equal strips. Two thirds is larger than one third.",
        "The answer is 3/5. The parts stay fifths. Shade three of five equal pieces. Three fifths is larger than two fifths.",
      ),
      [
        "States the correct sum",
        "Explains that the part size is unchanged",
        "Describes an appropriate equal-parts model",
        "Checks the sum against the starting amount",
      ],
    ),
  ],
};
const torah: Segment = {
  title: "A better first thought",
  subjects: ["Mishnah", "Ethical reasoning"],
  objectives: [
    "Explain Avot 1:6 in everyday language",
    "Consider an alternative without ignoring evidence",
  ],
  teaching: [
    card(
      "concept",
      "Learn with people",
      "Mishnah Avot 1:6, taught by Yehoshua ben Perachiah, discusses establishing a teacher, acquiring a friend and judging others favorably. This is a plain-language paraphrase. A learning friend can listen, explain and respectfully challenge your thinking.",
      ["Avot 1:6", "teacher", "friend"],
    ),
    card(
      "passage",
      "The silent greeting",
      "Your friend walks past without replying. Perhaps they did not hear. You do not know yet. A kind question can find out more. Considering a favorable explanation does not mean pretending you know it is true.",
    ),
    card(
      "example",
      "Uncertainty is allowed",
      "“Maybe you didn’t hear me—are you okay?” leaves room for missing information. In unsafe situations, get help from a trusted adult. Our ordinary friendship examples are discussion exercises, not halachic rulings.",
    ),
  ],
  make: (f) => [
    old(4, f, 1),
    old(4, f, 13),
    pair("avot-connections", "Connect a learning action to its purpose.", [
      ["Ask a teacher to explain a difficult phrase.", "Seek guidance"],
      ["Let your study partner challenge your idea.", "Learn with a friend"],
      [
        "Consider that someone may not have heard.",
        "Allow a favorable possibility",
      ],
      [
        "Ask what happened instead of declaring a motive.",
        "Gather missing information",
      ],
    ]),
    old(4, f, 2),
    ask(
      "avot-dialogue",
      select(
        f,
        "Your partner left the shared book at home. Write a two-line conversation that offers a favorable possibility, asks a kind question, suggests a practical next step, and connects to one idea in Avot 1:6.",
        "Your friend did not finish the drawing for your shared project. Write a two-line conversation with a favorable possibility, a kind question, a practical next step, and a connection to Avot 1:6.",
      ),
      select(
        f,
        "“Maybe you were rushed—was something difficult this morning? We could share mine today.” This practices judging favorably and learning with a friend.",
        "“Maybe you ran out of time—do you need help with the picture? We could finish one part together.” This gives a favorable possibility and supports a friend.",
      ),
      [
        "Presents a favorable possibility without claiming certainty",
        "Asks a respectful question",
        "Proposes a workable constructive step",
        "Connects the response to teacher, friendship, or favorable judgment in Avot 1:6",
      ],
    ),
  ],
};
const readingReturn: Segment = {
  title: "The second-look detective",
  subjects: ["Reading comprehension", "Vocabulary"],
  objectives: [
    "Compare a claim with evidence",
    "Write a concise supported interpretation",
  ],
  teaching: [
    card(
      "passage",
      "The astonishingly silent drummer",
      "Oren said the concert did not matter. Yet he checked his drumsticks twice, arrived early and asked whether the audience could see the back row. His words and actions point in different directions. What might explain both?",
    ),
    card(
      "concept",
      "Make room for more than one answer",
      "Perhaps Oren cares and feels nervous. Perhaps he wants the group to do well. Use “might” when the story leaves uncertainty. Explain two details; do not merely repeat them.",
    ),
    card(
      "example",
      "Keep the important bits",
      "A summary keeps the main problem, important action and result. A tiny detail can be useful evidence without belonging in every summary. Your summary is a suitcase, not a removal van.",
    ),
  ],
  make: (f) => [
    old(0, f, 10),
    ask(
      "reading-comparison",
      select(
        f,
        "In the drummer passage, give a possible explanation for Oren’s behavior. Use two details, explain their connection, and acknowledge what you cannot know.",
        "In the drummer passage, explain how his actions complicate his claim that the concert does not matter. Use two details and keep your conclusion cautious.",
      ),
      "Oren may care but feel nervous. Checking his sticks and arriving early suggest preparation. Those actions make his words less convincing, but they do not prove exactly how he feels.",
      [
        "Offers a plausible interpretation",
        "Cites two accurate details",
        "Explains how actions support or complicate the claim",
        "Uses appropriate uncertainty",
      ],
    ),
    old(0, f, 12),
    old(0, f, 9),
    ask(
      "summary-transfer",
      select(
        f,
        "Original scene: A missing screw made a model wobble. Sima searched unsuccessfully, used a spare clip to brace it, and carried it safely to school. Summarize the problem, action and result in one or two sentences; explain why resourceful fits.",
        "Original scene: Rain blurred the map. Lev read a road sign, asked a shopkeeper, and reached the library. Summarize the problem, action and result in one or two sentences; explain why resourceful fits.",
      ),
      select(
        f,
        "When a missing screw made her model wobble, Sima braced it with a spare clip and delivered it safely. She was resourceful because she solved the problem with an available object.",
        "When rain spoiled his map, Lev used signs and a shopkeeper’s directions to reach the library. He was resourceful because he found other available sources of help.",
      ),
      [
        "Preserves the central problem",
        "Includes the action that addresses the problem",
        "Includes the outcome without inventing events",
        "Explains resourceful with a specific connection",
      ],
    ),
  ],
};
const scienceReturn: Segment = {
  title: "The disappearing-water case",
  subjects: ["Science", "Math"],
  objectives: [
    "Calculate water loss",
    "Limit a conclusion to what measurements support",
  ],
  teaching: [
    card(
      "example",
      "Measure what vanished",
      "Two dishes each start with 60 mL. One ends with 51 mL; the other with 56 mL. They lost 9 mL and 4 mL. The difference in loss is 5 mL. Water can evaporate into the air without boiling.",
      ["9 mL", "4 mL", "5 mL"],
    ),
    card(
      "concept",
      "Explain without overclaiming",
      "If all relevant conditions match except the fan, the result supports a fan effect in this trial. Repeat to see whether the pattern continues. “This always happens everywhere” needs much more evidence.",
    ),
  ],
  make: (f) => [
    old(1, f, 7),
    ask(
      "water-data",
      select(
        f,
        "Two dishes start at 50 mL. After equal drying time, the fan dish has 38 mL and the other has 45 mL. Calculate each loss and the difference. State a cautious conclusion.",
        "Two dishes start at 70 mL. The fan dish finishes at 52 mL and the other at 63 mL. Calculate each loss and the difference. State a cautious conclusion.",
      ),
      select(
        f,
        "The losses are 12 mL and 5 mL, a difference of 7 mL. If other conditions were alike, the fan dish lost more water in this trial.",
        "The losses are 18 mL and 7 mL, a difference of 11 mL. If other conditions were alike, the result supports more drying with the fan in this trial.",
      ),
      [
        "Calculates the fan-dish loss correctly",
        "Calculates the comparison-dish loss correctly",
        "Calculates the difference between losses correctly",
        "States a cautious conclusion linked to fair conditions",
      ],
    ),
    pair("science-reasoning", "Connect each investigation note to its role.", [
      ["We used matching dishes.", "Control a relevant condition"],
      ["We recorded the remaining volume.", "Measure an outcome"],
      ["We ran three more trials.", "Check whether the pattern repeats"],
      [
        "The fan may have increased drying.",
        "Interpret the evidence cautiously",
      ],
    ]),
    old(1, f, 9),
    ask(
      "science-next-step",
      select(
        f,
        "Your fan dish dried faster once but slower in the next trial. Explain why you should not choose only your favorite result. Name a condition to check, a further action, and how to record results.",
        "Two groups get different fan-drying results. Explain why one result does not automatically settle the question. Name a condition to check, a further action, and how to record results.",
      ),
      "Keeping only one result hides uncertainty. Check equal starting water and timing, repeat the same fair setup, and record every trial in a table.",
      [
        "Acknowledges inconsistent evidence rather than cherry-picking",
        "Names a relevant condition to check",
        "Proposes repeating or comparing a fair setup",
        "Records all trials systematically",
      ],
    ),
  ],
};
const geography: Segment = {
  title: "The map room",
  subjects: ["Geography", "Math"],
  objectives: [
    "Use compass direction and scale",
    "Distinguish route distance from direct distance",
  ],
  teaching: [
    card(
      "concept",
      "Check which way is up",
      "On a north-up map: east is right, south is down and west is left. Other maps can face another way, so check the compass first.",
      ["north", "east", "south", "west"],
    ),
    card(
      "example",
      "Tiny map, big journey",
      "A scale of 1 cm = 2 km means a 3 cm route represents 6 km. If you then travel another 2 cm on the map, that adds 4 km: 10 km altogether. A direct shortcut may be shorter.",
    ),
    card(
      "concept",
      "Places shape journeys",
      "A navigable river can carry people and goods. A mountain pass offers a route through difficult terrain. Geography can help explain where routes develop; it does not explain every decision by itself.",
    ),
  ],
  make: (f) => [
    old(3, f, 4),
    old(3, f, 14),
    old(3, f, 12),
    old(3, f, 5),
    ask(
      "route-design",
      select(
        f,
        "On a north-up map with scale 1 cm = 4 km, invent a route with one eastward leg and one northward leg. Give both map lengths, calculate each real length and the total, and explain why a direct route could be shorter.",
        "On a north-up map with scale 1 cm = 3 km, invent a route with one westward leg and one southward leg. Give both map lengths, calculate each real length and the total, and explain why a direct route could be shorter.",
      ),
      select(
        f,
        "Go 2 cm east and 1 cm north: 8 km plus 4 km is 12 km. A direct diagonal can cut across the corner.",
        "Go 2 cm west and 2 cm south: 6 km plus 6 km is 12 km. A direct diagonal can cut across the corner.",
      ),
      [
        "Gives map lengths and the requested directions",
        "Converts both legs using the stated scale",
        "Adds the real lengths correctly",
        "Explains the difference between a turning route and a direct route",
      ],
    ),
  ],
};
const stories: Segment = {
  title: "The story engine",
  subjects: ["Creative writing", "Literature"],
  objectives: [
    "Create a causal goal-obstacle-action-result sequence",
    "Choose figurative language for a purpose",
  ],
  teaching: [
    card(
      "concept",
      "Give your character a job",
      "A character wants something, faces an obstacle, acts and gets a result. Liv wants to bring a model to school. Its base cracks. She braces it with folded card. It survives the journey. Her action changes the outcome.",
      ["goal", "obstacle", "action", "result"],
    ),
    card(
      "example",
      "Details earn their place",
      "“The windows rattled” is more vivid than “It was very stormy.” “The question was a pebble in his shoe” suggests nagging discomfort. Choose one fitting metaphor rather than making five unrelated images wrestle in a sentence.",
    ),
  ],
  make: (f) => [
    old(4, f, 6),
    old(4, f, 14),
    old(4, f, 12),
    old(4, f, 8),
    ask(
      "story-repair",
      select(
        f,
        "A story says, “Rae wanted to deliver a parcel. A bridge broke. Then everything was fine.” Replace the last sentence with a believable action and result. Explain how the action addresses the obstacle and add one revealing detail.",
        "A story says, “Noam wanted to perform a puppet show. A puppet string snapped. Then everything was fine.” Replace the last sentence with a believable action and result. Explain the connection and add one revealing detail.",
      ),
      select(
        f,
        "Rae found the marked footbridge upstream and reached the house before dark. The detour solves the blocked route. Her tight grip on the parcel shows concern.",
        "Noam tied spare thread to the puppet and finished the show. The new thread replaces the broken connection. His shaking fingers show nerves.",
      ),
      [
        "Adds an action that addresses the stated obstacle",
        "Gives a result caused by that action",
        "Explains the causal connection",
        "Adds a specific detail that reveals feeling or setting",
      ],
    ),
  ],
};
const quantity: Segment = {
  title: "The share-and-check station",
  subjects: ["Math", "Reasoning"],
  objectives: [
    "Find a fraction of a quantity",
    "Explain why an answer is reasonable",
  ],
  teaching: [
    card(
      "example",
      "Share first, count groups second",
      "To find 2/5 of 15, divide 15 into five equal groups: 3 in each. Take two groups: 6. The denominator tells you how many groups; the numerator tells you how many to take.",
      ["2/5", "6"],
    ),
    card(
      "concept",
      "Give the answer a job",
      "Say “6 cards” or “6 seedlings.” Check that a proper fraction of a positive whole is less than that whole. If half of twelve becomes twenty-four, your arithmetic has taken a very strange holiday.",
    ),
  ],
  make: (f) => [
    old(1, f, 4),
    ask(
      "quantity-explain",
      select(
        f,
        "Find 3/5 of 20 cards. Explain the equal groups, the groups you take, the result with units, and a reasonableness check.",
        "Find 3/4 of 28 counters. Explain the equal groups, the groups you take, the result with units, and a reasonableness check.",
      ),
      select(
        f,
        "Twenty cards split into five groups gives four per group. Three groups contain twelve cards. Twelve is less than twenty and more than half of twenty.",
        "Twenty-eight counters split into four groups gives seven each. Three groups contain twenty-one counters. Twenty-one is less than twenty-eight and more than half.",
      ),
      [
        "Divides the whole into the correct equal groups",
        "Uses the numerator to select the correct number of groups",
        "States the correct result with units",
        "Gives a valid reasonableness check",
      ],
    ),
    old(1, f, 11),
    old(1, f, 5),
    ask(
      "quantity-create",
      select(
        f,
        "Invent a problem about 2/3 of a collection whose size is a multiple of 3. Solve it and explain both steps. Include units and check that your answer is smaller than the whole.",
        "Invent a problem about 3/4 of a collection whose size is a multiple of 4. Solve it and explain both steps. Include units and check the result against the whole.",
      ),
      select(
        f,
        "Two thirds of 18 stickers are stars. Divide 18 by 3 to get 6, then multiply by 2 to get 12 star stickers. Twelve is less than eighteen.",
        "Three quarters of 16 marbles are blue. Divide 16 by 4 to get 4, then multiply by 3 to get 12 blue marbles. Twelve is less than sixteen.",
      ),
      [
        "Creates a valid whole and requested fractional share",
        "Explains division into equal groups",
        "Calculates the requested share correctly with units",
        "Checks the result against the whole",
      ],
    ),
  ],
};
const artReturn: Segment = {
  title: "The mood-making studio",
  subjects: ["Art appreciation", "Vocabulary"],
  objectives: [
    "Explain the effect of composition and brushwork",
    "Plan contrasting interpretations",
  ],
  teaching: [
    card(
      "art",
      "Marks have personalities",
      "Quick broken strokes can make painted water seem lively. Smooth even marks can suggest stillness. These are choices to explore, not rules that control every viewer. Artists arrange contrast, texture and composition to guide attention.",
      ["contrast", "texture", "composition"],
    ),
    card(
      "example",
      "Two moods, one place",
      "Imagine the same library twice. A small warm lamp amid soft textures might feel welcoming. A tiny doorway surrounded by deep shadow might feel mysterious. Explain the visible choices behind your interpretation.",
    ),
    card(
      "concept",
      "Notice the subtle change",
      "A subtle change is slight: one blue made a little warmer, one shadow softened. Compare carefully. A painted storm does not prove the artist was angry; describe the evidence you can actually see.",
    ),
  ],
  make: (f) => [
    old(2, f, 7),
    old(2, f, 14),
    old(2, f, 12),
    old(2, f, 5),
    ask(
      "art-disagreement",
      select(
        f,
        "Two viewers call an imagined empty park “peaceful” and “lonely.” Give one possible visual detail supporting each view, explain each connection, and say how they could discuss the disagreement productively.",
        "Two viewers call an imagined moonlit street “beautiful” and “unsettling.” Give a possible visual detail for each view, explain each connection, and suggest a productive way to discuss the disagreement.",
      ),
      select(
        f,
        "Soft light and smooth water might feel peaceful because they suggest stillness. One small empty bench in wide space might feel lonely because it emphasizes absence. They can compare which visible details support each reading.",
        "Silver light on windows might seem beautiful because of its gentle glow. Long dark shadows might feel unsettling because they hide parts of the street. The viewers can compare evidence without assuming one reaction must be wrong.",
      ),
      [
        "Names a plausible visual detail for the first view",
        "Explains its connection to that view",
        "Names and explains a detail for the second view",
        "Proposes comparing evidence while allowing supported differences",
      ],
    ),
  ],
};

const days: { title: string; segments: Segment[] }[] = [
  {
    title: "Sunday · Clues, shares & changing light",
    segments: [inference, fractionBasics, art],
  },
  {
    title: "Monday · Characters, experiments & sources",
    segments: [character, fairTest, history],
  },
  {
    title: "Tuesday · Language, fractions & friendship",
    segments: [language, fractionOperations, torah],
  },
  {
    title: "Wednesday · Evidence, water & maps",
    segments: [readingReturn, scienceReturn, geography],
  },
  {
    title: "Thursday · Stories, quantities & visual choices",
    segments: [stories, quantity, artReturn],
  },
];
function numberQuestions(
  id: string,
  form: number,
  questions: Question[],
): Question[] {
  return questions.map((q, i) => ({
    ...q,
    id: `${id}-f${form + 1}-q${i + 1}`,
    ...(q.choices
      ? {
          choices: [
            ...q.choices.slice((i + form) % 4),
            ...q.choices.slice(0, (i + form) % 4),
          ],
        }
      : {}),
  }));
}
const daily: DailyLesson[] = days.map((day, i) => {
  const id = `lesson-v2-${i + 1}`;
  const forms = [0, 1].map((f) =>
    numberQuestions(
      id,
      f,
      day.segments.flatMap((s) => s.make(f)),
    ),
  );
  const chunks: LearningChunk[] = day.segments.map((s, j) => ({
    id: `${id}-chunk-${j + 1}`,
    title: s.title,
    subjects: s.subjects,
    objectives: s.objectives,
    teaching: s.teaching,
    questionIds: forms.map((form) =>
      form.slice(j * 5, j * 5 + 5).map((q) => q.id),
    ),
  }));
  return {
    id,
    order: i + 1,
    title: day.title,
    subjects: [...new Set(chunks.flatMap((c) => c.subjects))],
    objectives: chunks.flatMap((c) => c.objectives),
    teaching: chunks.flatMap((c) => c.teaching),
    forms,
    chunks,
    version: 2,
  };
});

function newTestTasks(f: number): Question[] {
  return [
    ask(
      "fraction-retention",
      select(
        f,
        "A garden bed is 5/6 planted. Then 1/4 of the whole bed is cleared. What fraction stays planted? Show equal parts, subtract, and check by adding back.",
        "A container is 7/8 full. You remove 1/3 of the whole container’s capacity. What fraction remains? Show equal parts, subtract, and check.",
      ),
      select(
        f,
        "5/6 = 10/12 and 1/4 = 3/12, so 7/12 stays planted. Adding 3/12 gives 10/12, or 5/6.",
        "7/8 = 21/24 and 1/3 = 8/24, so 13/24 remains. Adding 8/24 returns 21/24, or 7/8.",
      ),
      [
        "Expresses both fractions with a valid common denominator",
        "Subtracts the equivalent numerators correctly",
        "States the simplified or equivalent correct result",
        "Checks by adding back the removed fraction",
      ],
    ),
    ask(
      "science-retention",
      select(
        f,
        "A student puts a wet cloth in sunlight beside a fan, and another in shade without a fan. Design a better comparison to investigate the fan’s effect: identify the problem, give two controls and name a measurement.",
        "A student uses a thick wet towel beside a fan and a thin damp towel away from it. Design a better comparison to investigate the fan: identify the problem, give two controls and name a measurement.",
      ),
      "More than the fan differs. Use matching cloths with equal starting water and equal temperature, and measure mass lost over equal drying times.",
      [
        "Identifies a relevant extra changing factor",
        "Names one relevant control",
        "Names a second relevant control",
        "Names a measurable outcome connected to drying",
      ],
    ),
    ask(
      "history-retention",
      select(
        f,
        "Fictional records: a bridge advertisement promises “cheaper journeys.” A traveler’s diary says the bridge is faster but the toll is high. Compare their purposes, identify a claim needing investigation, propose another source, and explain how it helps.",
        "Fictional records: a railway poster promises “comfortable travel.” A passenger’s letter describes crowded carriages. Compare their purposes, identify a claim needing investigation, propose another source, and explain how it helps.",
      ),
      select(
        f,
        "The advertisement sells the bridge; the diary records one experience. I would investigate whether total journey costs fell. Fare and toll records from before and after could let me compare costs.",
        "The poster attracts passengers; the letter reports one trip. I would investigate how typical the crowding was. Other dated passenger accounts could show whether that experience was common.",
      ),
      [
        "Distinguishes the purposes or viewpoints",
        "States a claim the current sources do not settle",
        "Names a relevant additional source",
        "Explains what that source would help test",
      ],
    ),
    ask(
      "map-retention",
      select(
        f,
        "On a north-up map, a route goes 4 cm west and then 1 cm south. The scale is 1 cm = 2 km. State both real leg lengths, total distance and why a straight-line distance could differ.",
        "On a north-up map, a route goes 1 cm east and then 4 cm north. The scale is 1 cm = 3 km. State both real leg lengths, total distance and why a direct distance could differ.",
      ),
      select(
        f,
        "The legs are 8 km west and 2 km south, totaling 10 km. A straight line cuts across the turn and can be shorter.",
        "The legs are 3 km east and 12 km north, totaling 15 km. A direct diagonal can be shorter than the two turning legs.",
      ),
      [
        "Converts the first leg correctly with direction",
        "Converts the second leg correctly with direction",
        "Adds the real route lengths correctly",
        "Explains why a direct route can be shorter",
      ],
    ),
    ask(
      "art-retention",
      select(
        f,
        "Imagine a large dark hallway with a small bright doorway and rough marks on the walls. Suggest a mood, use two described details and explain how at least one detail creates that effect.",
        "Imagine a broad pale lake with one tiny dark boat and smooth horizontal brush marks. Suggest a mood, use two described details and explain how one affects your interpretation.",
      ),
      select(
        f,
        "It may feel mysterious. The tiny bright doorway contrasts with the dark hall and draws attention to an unknown space. Rough walls may make the hall feel old or uneasy.",
        "It may feel peaceful but solitary. Smooth horizontal marks suggest still water, while the small boat in a large lake emphasizes being alone.",
      ),
      [
        "Offers a plausible mood",
        "Cites one accurate visual detail",
        "Cites a second accurate visual detail",
        "Explains a connection between technique or arrangement and effect",
      ],
    ),
    ask(
      "grammar-retention",
      select(
        f,
        "Rewrite “The basket of apples are beside the door” correctly and explain your verb. Then clarify “Leah showed Tamar her sketch” so Tamar owns the sketch, and explain the ambiguity.",
        "Rewrite “The collection of shells are on the shelf” correctly and explain your verb. Then clarify “Moshe gave Levi his pencil” so Levi owns the pencil, and explain the ambiguity.",
      ),
      select(
        f,
        "The basket of apples is beside the door, because basket is singular. Leah showed Tamar Tamar’s sketch. Her could have referred to either girl.",
        "The collection of shells is on the shelf, because collection is singular. Moshe gave Levi Levi’s pencil. His could have referred to either boy.",
      ),
      [
        "Uses is in the corrected sentence",
        "Explains agreement with the singular main subject",
        "Makes the requested owner unambiguous",
        "Explains the two possible original pronoun references",
      ],
    ),
    pair(
      "fraction-match-retention",
      "Connect each fresh fraction statement to its value.",
      select(
        f,
        [
          ["1/4 of 28", "7"],
          ["2/3 of 15", "10"],
          ["3/5 of 25", "15"],
          ["1/2 of 18", "9"],
        ],
        [
          ["1/3 of 27", "9"],
          ["3/4 of 32", "24"],
          ["2/5 of 35", "14"],
          ["1/2 of 22", "11"],
        ],
      ),
    ),
    pair(
      "art-match-retention",
      "Connect each gallery note to its art concept.",
      select(
        f,
        [
          ["A pale bird against a black cliff", "Contrast"],
          ["Pebbly marks make a wall look rough", "Texture"],
          ["Three figures arranged along a diagonal", "Composition"],
          ["A barely noticeable shift toward green", "Subtle change"],
        ],
        [
          ["A white sail against a dark inlet", "Contrast"],
          ["Soft strokes make a scarf look furry", "Texture"],
          ["The main tree moved to the edge", "Composition"],
          ["A shadow made only slightly warmer", "Subtle change"],
        ],
      ),
    ),
    pair(
      "literary-match-retention",
      "Connect each story note to the job it does.",
      select(
        f,
        [
          ["A child hopes to rescue a kite", "Goal"],
          ["The kite is caught on a high branch", "Obstacle"],
          ["The child fetches a long safe pole", "Action"],
          ["The kite comes down intact", "Result"],
        ],
        [
          ["A pupil wants to finish a model", "Goal"],
          ["The last wheel is missing", "Obstacle"],
          ["The pupil makes a wheel from spare card", "Action"],
          ["The model rolls across the table", "Result"],
        ],
      ),
    ),
  ];
}
const testForms = [0, 1].map((f) => {
  const source = [
    ...CHUNKS[5].forms[f].map((q) => structuredClone(q)),
    ...newTestTasks(f),
  ];
  const choices = source.filter((q) => q.kind === "choice"),
    other = source.filter((q) => q.kind !== "choice");
  const interleaved: Question[] = [];
  while (choices.length || other.length) {
    if (choices.length) interleaved.push(choices.shift()!);
    if (other.length) interleaved.push(other.shift()!);
  }
  return numberQuestions("weekly-test-v2", f, interleaved);
});
export const LESSONS: DailyLesson[] = [
  ...daily,
  {
    id: "weekly-test-v2",
    order: 6,
    title: "Friday · Show what stuck",
    subjects: [...new Set(daily.flatMap((d) => d.subjects))],
    objectives: [
      "Retrieve ideas from across the week",
      "Transfer reading, mathematical, scientific and ethical reasoning to fresh situations",
      "Explain creative choices with evidence",
    ],
    teaching: [],
    forms: testForms,
    chunks: [],
    version: 2,
    assessmentOnly: true,
  },
];
export const WEEK_TITLE_V2 = "Week 1 · Notice, question, create";
export const WEEK_OBJECTIVES_V2 = [
  "Use infer, evidence, reluctant, resourceful, contrast, texture, composition and subtle in context.",
  "Support a reading inference with two details and explain the connection; acknowledge uncertainty.",
  "Explain equivalent fractions, add and subtract fractions, and find a fraction of a quantity.",
  "Design and critique a fair evaporation comparison, calculate water loss and limit claims to the evidence.",
  "Recognize Monet and Impressionism; connect light, composition, contrast and marks to a supported interpretation.",
  "Compare historical source purposes and limitations; use map direction and scale.",
  "Apply the teacher, friendship and favorable-judgment ideas in Avot 1:6 thoughtfully.",
  "Write a causal scene with a purposeful metaphor; revise subject–verb agreement and ambiguous pronouns.",
];
