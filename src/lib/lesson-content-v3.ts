import { LESSONS as LESSONS_V2, WEEK_OBJECTIVES_V2 } from "./lesson-content";
import type { DailyLesson, Question, TeachingBlock } from "./content-types";

// New publication, new IDs. Never edit archived v2 teaching or answer keys.
// Answer keys and rubrics stay on the server; store.ts projects public questions.
type OpenTask = { prompt: string; exemplar: string; rubric: string[] };
type ChoiceTask = {
  prompt: string;
  correct: string;
  wrong: string[];
  explanation: string;
};
type Reading = {
  title: string;
  text: string;
  words: [string, string, string][];
  choices: ChoiceTask[];
  opens: OpenTask[];
  pairs: [string, string][];
  focus: string;
};

const readings: Reading[] = [
  {
    title: "The windmill that refused to work",
    text: `By lunchtime, Max had declared the school windmill cursed. Its cardboard sails had spun during breakfast club, but now they stood still above the model village. “A very selective curse,” Lina said. “It has spared the glue sticks.” Tomorrow, visitors would see their exhibition about using moving air to turn a wheel. At the moment, their demonstration mostly explained disappointment.

Max fetched a bigger fan. Lina stopped him before he switched it on. That morning they had moved the windmill, added a paper sign, and tightened the axle. Changing another thing might make it work, but they would not know why. She drew three boxes in her notebook: what they noticed, what they thought, and what they could test.

First, they tried the same fan at yesterday’s distance. A ribbon tied to the table fluttered, while the sails remained stubbornly still. Lina could infer that air was reaching the model. She could not yet tell whether it was strong enough to turn the sails. Max wrote “wind present” in the first box and, reluctantly, crossed out “curse confirmed.”

A corner of their new sign rested against the wheel. Lina lifted only the paper. The sails began to turn. When she let the corner fall back, they stopped. She repeated this twice, keeping the fan in place. Max leaned closer. “So our excellent sign is also an extremely effective brake.” The paper had left a faint curved mark on the wheel.

They trimmed the sign and ran the model again. This time the wheel turned, although it wobbled. Lina wanted to investigate the axle next. Max wanted to write “problem solved” in enormous letters. They agreed that the sign explained the stopping, but it did not explain every problem the model might have. One successful repair was evidence, not a promise that nothing else could fail.

At the exhibition, Max placed their notebook beside the windmill. A visitor asked whether the bigger fan had fixed it. “No,” he said. “We kept that the same.” Then he pointed to Lina’s three boxes. The windmill turned. Max’s explanation, for once, did not contain a single curse.`,
    words: [
      [
        "infer",
        "Reach a reasonable conclusion from clues.",
        "Lina could infer that air reached the table because the ribbon moved.",
      ],
      [
        "reluctantly",
        "With hesitation or unwillingness.",
        "Max reluctantly crossed out his favourite explanation.",
      ],
      [
        "evidence",
        "Details that support or challenge an idea.",
        "Stopping and starting the wheel by moving the sign gave Lina evidence.",
      ],
    ],
    focus:
      "Separate what the characters observe from what they infer. When you explain a claim, name a detail and explain the connection. A stronger explanation also admits what remains uncertain.",
    choices: [
      {
        prompt: "In paragraph 3, what does the fluttering ribbon establish?",
        correct:
          "Air is reaching the model, but its strength is not yet established.",
        wrong: [
          "The fan is definitely strong enough.",
          "The axle is perfectly straight.",
          "The paper sign cannot be causing trouble.",
        ],
        explanation:
          "The ribbon shows moving air. It does not measure whether that air is sufficient to turn this wheel.",
      },
      {
        prompt:
          "Why does Lina lift and lower the sign more than once in paragraph 4?",
        correct:
          "She checks whether changing the sign repeatedly changes the wheel’s movement.",
        wrong: [
          "She wants to measure the sign’s colour.",
          "She is testing a bigger fan each time.",
          "She wants to hide the curved mark.",
        ],
        explanation:
          "The fan stays in place while the sign changes. The repeated stop/start pattern supports the sign-as-brake explanation.",
      },
      {
        prompt:
          "Which detail most directly supports Max’s description of the sign as a brake?",
        correct: "The wheel stops when the paper falls against it.",
        wrong: [
          "Visitors will arrive tomorrow.",
          "The village is made from cardboard.",
          "The notebook has three boxes.",
        ],
        explanation:
          "A brake prevents movement; the paper touching the wheel repeatedly stops it.",
      },
      {
        prompt: "Which statement best describes Max’s change by the ending?",
        correct:
          "He explains a tested cause instead of repeating an unsupported claim.",
        wrong: [
          "He refuses to show the notebook.",
          "He decides every wobble has been fixed.",
          "He proves that stronger fans always work.",
        ],
        explanation:
          "At first Max blames a curse. At the exhibition he explains what they changed and what they kept the same.",
      },
    ],
    pairs: [
      ["The ribbon flutters.", "An observation"],
      ["The sign may stop the wheel.", "An inference"],
      ["Lift only the paper corner.", "A test"],
      ["The axle may still need attention.", "A remaining uncertainty"],
    ],
    opens: [
      {
        prompt:
          "Explain why the sign is a stronger explanation than Max’s curse. Use two details from paragraphs 3–4 and explain how they support your answer.",
        exemplar:
          "The ribbon moved, so air was present. Lifting the paper made the wheel turn, and lowering it stopped the wheel repeatedly. Changing the paper changed the result, so the paper blocking the wheel is supported by observations; the curse is not.",
        rubric: [
          "Names the sign touching the wheel as the likely cause",
          "Cites one accurate observation from paragraphs 3–4",
          "Cites a second accurate observation from paragraphs 3–4",
          "Explains how the changed sign and movement are connected",
        ],
      },
      {
        prompt:
          "Lina and Max disagree about writing ‘problem solved.’ Whose wording would you use for the exhibition, and why? Give one detail showing success and one showing a limit. You may suggest your own wording.",
        exemplar:
          "I would write ‘We fixed the stopping problem.’ Trimming the sign lets the wheel turn, but the wheel still wobbles. That wording reports the success without pretending the axle has been checked.",
        rubric: [
          "Makes a clear choice or proposes precise wording",
          "Cites the turning wheel as evidence of success",
          "Cites the remaining wobble or untested axle",
          "Explains why the wording fits both success and uncertainty",
        ],
      },
      {
        prompt:
          "Explain why Lina rejects changing to a bigger fan immediately. Use the morning’s changes and the sign test to support your explanation.",
        exemplar:
          "Several things had changed already: position, sign and axle. A bigger fan would add another possible cause. Lina kept the fan in place and changed only the sign, so the stop/start result could be linked to that change.",
        rubric: [
          "Identifies more than one possible changed cause",
          "Explains the problem with adding another change",
          "Cites keeping the fan still during the sign test",
          "Connects one changed factor to a clearer explanation",
        ],
      },
      {
        prompt:
          "Write two sentences Max could say to the visitor that explain the repair accurately and admit what still needs checking. Use details from the story.",
        exemplar:
          "The paper sign was pressing against the wheel, and trimming it let the sails turn. The wheel still wobbles, so we need to check the axle before saying every problem is solved.",
        rubric: [
          "Identifies the paper obstruction",
          "Explains what repair changed the movement",
          "Mentions the wobble or need to check the axle",
          "Uses clear connected sentences without an unsupported certainty",
        ],
      },
    ],
  },
  {
    title: "The captain of the cardboard boat",
    text: `Noam wanted to captain the cardboard boat. He had already made a hat from newspaper, which he considered a serious nautical qualification. The class challenge was to build a model that could carry ten metal washers across a shallow tray. Noam’s boat had a magnificent pointed bow, two flags, and the floating ability of a biscuit in soup.

Across the table, Tamar’s plain square boat sat steadily on the water. Noam called it a lunchbox. Tamar did not answer. She was holding one corner while a strip of tape settled along the seam. Noam noticed a folded sketch beside her: three earlier designs, each crossed out, with tiny notes about what had gone wrong.

His own boat sank after the third washer. “The washers are unusually heavy today,” he announced. Tamar offered him some waterproof tape. Noam was reluctant to accept. Yesterday he had told everyone that his design needed no improvements. Taking advice now seemed rather like putting a large sign above his head saying, ‘Captain Wrong.’

Then the teacher asked them to explain one change they had made after testing. Noam looked at his soggy flags. Tamar showed him how she had widened the base after her first narrow boat tipped. She had changed the shape before adding more decorations. “Mine failed twice,” she said. “The third version knows more.” Noam took the tape, but also asked to see the sketch.

They agreed to revise his design. Their resourceful repair used a spare piece of card to rebuild the base. Noam measured both sides while Tamar held the ruler. This version carried eight washers before one side dipped. Instead of blaming the washers, Noam drew the uneven load in his notebook. He spread the washers more evenly and tested again. Ten stayed above the water. His hat slipped over his eyes at the exact moment of triumph.

For the class display, Noam put the first sunken boat beside the successful model. His label read, ‘Version One: excellent flags, useful mistakes.’ Tamar laughed and offered him the ruler as a pretend captain’s telescope. Noam thanked her. He still wanted to be captain, but he had discovered that a captain could ask questions without sinking.`,
    words: [
      [
        "reluctant",
        "Unwilling or hesitant to do something.",
        "Noam was reluctant to accept advice after boasting.",
      ],
      [
        "resourceful",
        "Good at finding useful ways to solve problems.",
        "The children were resourceful with spare card and tape.",
      ],
      [
        "revise",
        "Change something to improve it.",
        "Noam revised the base after testing the boat.",
      ],
    ],
    focus:
      "A character’s words and actions can point in different directions. Look for a change: what does the character do at the beginning, what happens in the middle, and what choice is different at the end?",
    choices: [
      {
        prompt: "Why is Noam reluctant to accept Tamar’s tape in paragraph 3?",
        correct:
          "Accepting help might expose that his earlier boast was wrong.",
        wrong: [
          "He knows the tape cannot touch water.",
          "Tamar has forbidden him to use it.",
          "He does not want to finish the challenge.",
        ],
        explanation:
          "The text connects his hesitation to yesterday’s claim that his design needed no improvements.",
      },
      {
        prompt:
          "What does Tamar mean when she says the third version ‘knows more’?",
        correct: "It includes improvements learned from earlier failed tests.",
        wrong: [
          "The cardboard can remember spoken words.",
          "The boat contains a hidden computer.",
          "A third boat must always float.",
        ],
        explanation:
          "The boat is not literally thinking. Its design reflects what Tamar learned from two failures.",
      },
      {
        prompt: "Which detail best shows Noam becoming more willing to learn?",
        correct: "He asks to see Tamar’s sketch before rebuilding.",
        wrong: [
          "He makes a newspaper hat.",
          "He calls the plain boat a lunchbox.",
          "He blames unusually heavy washers.",
        ],
        explanation:
          "Asking to see the sketch shows interest in another person’s reasoning, unlike his earlier boasting and excuses.",
      },
      {
        prompt: "Why does Noam display his first boat at the end?",
        correct: "He now sees failed attempts as part of improving a design.",
        wrong: [
          "He believes the first boat passed the test.",
          "He wants to hide the successful boat.",
          "The teacher banned successful models.",
        ],
        explanation:
          "His label calls its mistakes useful. This contrasts with his earlier wish to appear already correct.",
      },
    ],
    pairs: [
      ["Noam calls the washers unusually heavy.", "Making an excuse"],
      [
        "Tamar keeps notes on crossed-out designs.",
        "Learning from earlier tests",
      ],
      ["Noam asks to see the sketch.", "Accepting another person’s help"],
      ["Noam spaces the washers more evenly.", "Revising after an observation"],
    ],
    opens: [
      {
        prompt:
          "How does Noam’s attitude toward mistakes change? Use one detail from the beginning and one from the ending, then explain the contrast.",
        exemplar:
          "At first Noam claims his boat needs no improvements and blames the washers when it sinks. At the end he displays the failed boat and calls its mistakes useful. He changes from defending his pride to treating failure as information.",
        rubric: [
          "Identifies a plausible change in attitude",
          "Cites an accurate early detail",
          "Cites an accurate ending detail",
          "Explains the contrast between the two details",
        ],
      },
      {
        prompt:
          "Tamar never calls Noam foolish. Explain how two of her actions help him learn. Use details from the story rather than simply calling her ‘nice.’",
        exemplar:
          "Tamar offers tape, giving him practical help, and shows her crossed-out designs, showing that she also made mistakes. These actions make improvement seem possible without embarrassing him.",
        rubric: [
          "Names one accurate helpful action by Tamar",
          "Names a second accurate helpful action",
          "Explains how the first helps Noam",
          "Explains how the second helps or changes his confidence",
        ],
      },
      {
        prompt:
          "What does the newspaper hat add to the story? Explain one humorous moment and connect it to Noam’s wish to seem like a captain.",
        exemplar:
          "Noam treats making a hat as a qualification even though his boat sinks. Later the hat falls over his eyes during success. Both moments gently poke fun at looking important instead of learning the practical work.",
        rubric: [
          "Identifies an accurate hat-related moment",
          "Explains why it is humorous",
          "Connects the hat to Noam’s pride or captain ambition",
          "Supports the interpretation with another story detail",
        ],
      },
      {
        prompt:
          "Write a different final label for Noam’s display. Then explain how your label fits two events in the passage.",
        exemplar:
          "‘Good boats begin with questions.’ Noam improves after asking to see Tamar’s sketch, and he tests a more even load after noticing one side dip. The label celebrates learning rather than pretending his first idea was perfect.",
        rubric: [
          "Creates a meaningful display label",
          "Cites one accurate event that fits it",
          "Cites a second accurate event that fits it",
          "Explains how those events support the label’s message",
        ],
      },
    ],
  },
  {
    title: "The sentence that stole the sketch",
    text: `The school newspaper had room for one report about the art show. Rivka volunteered to write it because she liked sentences, especially sentences that behaved themselves. Her first draft began, ‘The gallery was a beehive.’ Her brother checked the windows for insects. “It is a metaphor,” she told him. “Please put down the rolled-up programme.”

At the show, Rivka had watched Leah help Tamar hang a drawing of a stormy harbour. Later she wrote, ‘Leah showed Tamar her sketch.’ It sounded neat. Unfortunately, the sentence was ambiguous: it could mean Leah’s sketch or Tamar’s sketch. Rivka knew Tamar had drawn it, but a reader did not have access to the small library of facts inside Rivka’s head.

Her editor, Mr Green, circled the sentence. He also underlined, ‘The collection of pictures were near the door.’ Rivka pointed to all those pictures. Surely there were plenty of them? Mr Green covered the words ‘of pictures’ with a strip of paper. ‘The collection were near the door’ suddenly sounded rather wobbly. The main subject was one collection, so the verb needed to be ‘was.’

Rivka revised both sentences. She wrote, ‘Leah helped Tamar hang Tamar’s sketch,’ then shortened it to, ‘Leah helped Tamar hang the sketch Tamar had drawn.’ Neither sentence was as brief as the original, but both gave the drawing to the correct artist. She decided that saving three words was a poor bargain if it accidentally stole somebody’s artwork.

There was another problem. ‘The gallery was a beehive’ suggested bustle, but she had not shown any. Rivka added children squeezing between chairs, parents leaning toward labels, and a teacher carrying spare picture hooks in a teacup. The metaphor now had details doing some of its work. She removed ‘very wonderful’ from a later sentence because it said less than the actual scene.

When the report appeared, Tamar recognised her drawing immediately. Rivka’s brother said the beehive sentence was his favourite. “No actual bees?” he checked. “Only busy people,” Rivka replied. She kept the first draft in her folder. Its mistakes reminded her that a writer’s job was not just to know what she meant. It was to help a reader know it too.`,
    words: [
      [
        "metaphor",
        "A comparison that describes one thing as another.",
        "Calling the busy gallery a beehive is a metaphor.",
      ],
      [
        "ambiguous",
        "Having more than one possible meaning.",
        "‘Her sketch’ is ambiguous when two girls are named.",
      ],
      [
        "revise",
        "Change writing to make it clearer or stronger.",
        "Rivka revised the sentence so the artist was clear.",
      ],
    ],
    focus:
      "Ask two questions as you read: what picture do the words create, and could the sentence mean something else? A vivid comparison still needs concrete details. Clear grammar helps the reader follow those details.",
    choices: [
      {
        prompt:
          "Why is ‘Leah showed Tamar her sketch’ ambiguous in paragraph 2?",
        correct: "The word ‘her’ could refer to Leah or Tamar.",
        wrong: [
          "A sketch cannot be shown to anyone.",
          "The sentence contains no verb.",
          "Both girls must have made the drawing together.",
        ],
        explanation:
          "Either named girl could be the owner unless the writer clarifies the pronoun.",
      },
      {
        prompt:
          "Which verb fits ‘The collection of pictures ___ near the door’?",
        correct: "was",
        wrong: ["were", "have", "are"],
        explanation:
          "The main subject is the singular collection. The nearby plural word pictures does not control the verb.",
      },
      {
        prompt:
          "What does ‘The gallery was a beehive’ suggest in this passage?",
        correct: "The gallery is busy with many people moving and working.",
        wrong: [
          "The gallery is made from honey.",
          "The report is about dangerous insects.",
          "Every visitor wears yellow and black.",
        ],
        explanation:
          "Paragraph 5 supplies bustling details, so the metaphor compares the activity rather than claiming actual bees are present.",
      },
      {
        prompt:
          "Which revision best follows Rivka’s final lesson about readers?",
        correct:
          "Name the artist clearly and show specific activity in the gallery.",
        wrong: [
          "Remove every detail to make the report shortest.",
          "Keep confusing pronouns because the writer understands them.",
          "Replace observations with ‘very wonderful’ throughout.",
        ],
        explanation:
          "Rivka learns that readers need clear references and concrete details, not just the knowledge in the writer’s head.",
      },
    ],
    pairs: [
      ["‘The gallery was a beehive.’", "Metaphor"],
      ["‘Her sketch’ with two possible owners", "Ambiguous reference"],
      ["One collection needs ‘was.’", "Subject–verb agreement"],
      ["A teacher carries hooks in a teacup.", "A concrete observed detail"],
    ],
    opens: [
      {
        prompt:
          "Explain how paragraph 5 makes the beehive metaphor more convincing. Use two specific details and connect them to the comparison.",
        exemplar:
          "Children squeeze between chairs and parents lean toward labels. These movements make the room seem crowded and active, like the bustle of a beehive. The teacher carrying hooks adds another busy task.",
        rubric: [
          "Explains the metaphor as busy activity rather than literal bees",
          "Cites one accurate paragraph-5 detail",
          "Cites a second accurate paragraph-5 detail",
          "Connects the details to the comparison’s effect",
        ],
      },
      {
        prompt:
          "Rivka says saving three words is a poor bargain if it steals artwork. Explain this joke and what it teaches about clear writing.",
        exemplar:
          "No picture is literally stolen; the unclear ‘her’ could give readers the wrong idea about its owner. A slightly longer sentence names Tamar as the artist. Clarity matters more than making every sentence as short as possible.",
        rubric: [
          "Explains that the theft is figurative",
          "Identifies the unclear ownership in the original sentence",
          "Explains how naming Tamar corrects it",
          "States a supported lesson about clarity versus brevity",
        ],
      },
      {
        prompt:
          "Rewrite ‘The collection of pictures were near the door’ and explain Mr Green’s paper-strip trick. Use the passage to show why your verb fits.",
        exemplar:
          "The collection of pictures was near the door. Covering ‘of pictures’ reveals the main subject, collection. It is one collection, so was agrees with it even though that collection contains many pictures.",
        rubric: [
          "Correctly uses was",
          "Identifies collection as the main subject",
          "Explains what covering of pictures reveals",
          "Distinguishes the singular subject from the plural contents",
        ],
      },
      {
        prompt:
          "Write a new metaphor for the busy gallery, then add one sentence using a detail from paragraph 5 to make your comparison work. Explain the connection briefly.",
        exemplar:
          "The gallery was a railway station at rush hour. Children squeezed between chairs while adults leaned in to read labels. The crowded movement connects the room to a busy station.",
        rubric: [
          "Creates a relevant metaphor",
          "Includes an accurate detail from paragraph 5",
          "Makes the comparison understandable rather than random",
          "Explains the connection between detail and metaphor",
        ],
      },
    ],
  },
  {
    title: "The thirsty windowsill",
    text: `On Monday, the classroom’s bean plant leaned over its pot as if it had stayed up all night doing homework. Eli announced that it was dying. Sara said it merely looked thirsty. The class monitor suggested playing cheerful music to it. Their teacher asked a less dramatic question: what could they actually observe before choosing an explanation?

The soil felt dry near the surface. Three leaves drooped, but two smaller leaves were firm and green. A label said the plant had been watered on Friday. That label was a record, not proof of how much water remained on Monday. The pot stood beside a warm window, and the classroom had been closed all weekend.

Sara gave the plant a measured amount of water. By afternoon, most leaves had lifted. Eli wanted to conclude that water always fixed drooping leaves. Sara pointed to the word ‘always.’ They had watched one plant on one day. Water was a reasonable explanation for this recovery, but drooping could have other causes in another plant. Eli crossed out ‘always’ and wrote ‘in this case.’

The children then investigated drying with two identical shallow dishes. Each started with the same amount of water. One stood beside a small fan; the other was equally warm but away from the moving air. They agreed to leave them for the same length of time. Eli wanted to use the biggest dish for the fan because it looked more impressive. Sara persuaded him that impressive was not a useful measuring unit.

After two hours, the dish near the fan had lost more water. They repeated the comparison the next day and saw the same pattern. Their table supported the idea that moving air increased water loss in their setup. It did not tell them exactly what had happened to the bean plant during the weekend, when nobody had measured its water or the room’s conditions.

For their display, the children drew two boxes: ‘What our results support’ and ‘What we still need to find out.’ Eli volunteered to write the second heading. Beside it he drew the bean plant standing upright in an enormous pair of sunglasses. Sara approved the careful headings. She was less certain about the scientific value of the sunglasses.`,
    words: [
      [
        "observe",
        "Notice or measure what is actually there.",
        "They observed dry soil and three drooping leaves.",
      ],
      [
        "conclude",
        "Reach an explanation after considering evidence.",
        "They could conclude that more water was lost near the fan in their setup.",
      ],
      [
        "conditions",
        "The circumstances in which something happens.",
        "They kept the warmth and starting water conditions the same.",
      ],
    ],
    focus:
      "A result can support an explanation without proving every related claim. Track what was measured, which factors stayed the same, and where the characters use cautious language.",
    choices: [
      {
        prompt: "Why does Sara challenge the word ‘always’ in paragraph 3?",
        correct:
          "One recovering plant does not establish what causes every drooping plant.",
        wrong: [
          "The plant has not changed at all.",
          "Water can never affect a plant.",
          "The Friday label records every possible cause.",
        ],
        explanation:
          "The observed recovery supports an explanation for this case. It cannot rule out other causes in other plants.",
      },
      {
        prompt: "Why should the two dishes in paragraph 4 be identical?",
        correct:
          "A different dish would add another possible explanation for different water loss.",
        wrong: [
          "Identical dishes guarantee no water will disappear.",
          "The experiment is judging which dish looks best.",
          "A fan only works beside matching colours.",
        ],
        explanation:
          "To investigate moving air, the children hold other relevant features constant rather than changing dish size too.",
      },
      {
        prompt: "Which statement is an observation rather than an explanation?",
        correct:
          "Three leaves droop and two smaller leaves are firm and green.",
        wrong: [
          "The plant definitely stayed up doing homework.",
          "Music will certainly repair the plant.",
          "Every drooping plant lacks water.",
        ],
        explanation:
          "The leaf descriptions report visible features. The other statements speculate or overgeneralize.",
      },
      {
        prompt: "What remains uncertain after the dish experiment?",
        correct:
          "Exactly what happened to the bean plant’s water during the weekend.",
        wrong: [
          "Whether the fan dish lost more water in the tests.",
          "Whether the children used two dishes.",
          "Whether Eli drew sunglasses.",
        ],
        explanation:
          "No weekend measurements were taken from the plant. The dish results do not reconstruct missing observations.",
      },
    ],
    pairs: [
      ["The soil feels dry.", "An observation"],
      ["Water may explain this recovery.", "A cautious explanation"],
      ["Both dishes begin with equal water.", "A controlled condition"],
      ["Exactly what happened over the weekend?", "An unanswered question"],
    ],
    opens: [
      {
        prompt:
          "Explain why the dish experiment is stronger evidence than simply guessing about the weekend. Use two details about how the children run the comparison.",
        exemplar:
          "They use identical dishes and equal starting water, keeping important factors the same. They also repeat the timed comparison. These choices make the difference in moving air a more useful explanation for the measured water loss than an unmeasured weekend guess.",
        rubric: [
          "Distinguishes measured evidence from a guess",
          "Names one accurate control or repeated-test detail",
          "Names another accurate control or repeated-test detail",
          "Explains how these details improve the comparison",
        ],
      },
      {
        prompt:
          "Choose one claim the results support and one claim they do not settle. Explain the difference using details from the passage.",
        exemplar:
          "The results support greater water loss near the fan in their setup, because it happens in both comparisons. They do not settle exactly why the bean dried over the weekend, because nobody measured its conditions then.",
        rubric: [
          "States a supported claim about the dish results",
          "Cites an accurate result or repeated pattern",
          "States a genuinely unresolved claim",
          "Explains the missing evidence for that unresolved claim",
        ],
      },
      {
        prompt:
          "How does Eli’s thinking change between paragraphs 1 and 6? Use two details to support an inference about him.",
        exemplar:
          "At first Eli quickly says the plant is dying. Later he replaces ‘always’ with ‘in this case’ and volunteers to write what is still unknown. These choices suggest he is learning to limit claims to the evidence.",
        rubric: [
          "States a plausible change in Eli’s thinking",
          "Cites an accurate early detail",
          "Cites an accurate later detail",
          "Connects the details to more careful reasoning",
        ],
      },
      {
        prompt:
          "Write a more careful display caption than ‘Fans make all plants thirsty.’ Use the dish results and explain one limit of your caption.",
        exemplar:
          "‘In two comparisons, equal water in identical dishes lost more water near moving air.’ This describes the tested setup. It does not claim that every plant behaves the same way or reveal unmeasured weekend conditions.",
        rubric: [
          "Describes the measured dish comparison accurately",
          "Mentions the pattern of greater loss near the fan",
          "Avoids claiming a universal plant result",
          "Explains a relevant limit of the evidence",
        ],
      },
    ],
  },
  {
    title: "The last seat in the story",
    text: `Miriam’s story began with a magnificent dragon, a disappearing castle, and a sandwich that could tell the future. By the bottom of page one, all three had vanished. Her hero, Ben, was still standing in a kitchen, waiting for something to happen. “It has plenty of surprises,” Miriam told her writing partner, Avi. “But what does Ben want?” he asked.

Miriam considered this. Ben wanted to reach his grandmother’s birthday before sunset. That goal gave him somewhere to go and a reason to hurry. She kept the dragon, who ran the village bus service, and saved the other ideas for another story. Even a fortune-telling sandwich, she admitted, deserved better than being introduced and immediately forgotten.

In the new draft, Ben reached the bus stop with a carefully wrapped cake. The dragon driver explained that one seat remained, but a giant basket occupied the aisle. An elderly passenger could not squeeze past it. Ben might push ahead and claim the seat. Instead, he asked whose basket it was. The driver looked embarrassed: it held spare umbrellas for passengers caught in rain.

Miriam first solved the problem by giving Ben a magic whistle that moved baskets. Avi pointed out that nobody had seen the whistle before. It arrived exactly when the writer needed it. Miriam crossed it out. Earlier in the story she had described Ben carrying a strong ribbon around the cake box. Now he could use that ribbon to secure the basket safely on the luggage rack.

The passenger reached her seat, and the driver offered Ben the last place. Ben had solved the obstacle through a choice and a useful object already in the story. Rain began before the bus reached the next village. The driver handed out umbrellas from the basket. The thing that had blocked the journey now helped the passengers, which pleased Miriam considerably.

Her ending—the resolution—showed Ben arriving with a slightly tilted cake and a good tale to tell. She removed a final sentence explaining that kindness was important. Ben’s actions already suggested that idea. Avi read the draft again. “Now I want to know what happens,” he said. Miriam opened a fresh page for the sandwich. It had predicted that its turn would come.`,
    words: [
      [
        "goal",
        "Something a character wants to achieve.",
        "Ben’s goal is to reach the birthday before sunset.",
      ],
      [
        "obstacle",
        "Something that gets in the way of a goal.",
        "The basket blocks the aisle.",
      ],
      [
        "resolution",
        "The way a story’s central problem is settled.",
        "Ben secures the basket and reaches the bus seat.",
      ],
    ],
    focus:
      "A story moves when a character wants something, faces a difficulty, and makes a choice that changes events. A satisfying solution often uses a detail planted earlier. Theme can emerge through those choices instead of a final lecture.",
    choices: [
      {
        prompt: "Why does Avi ask what Ben wants in paragraph 1?",
        correct:
          "A clear goal gives Ben’s actions direction and a reason to matter.",
        wrong: [
          "Every story must begin with a birthday.",
          "Surprises are never allowed in stories.",
          "He wants the dragon removed from every draft.",
        ],
        explanation:
          "Once Ben wants to reach the birthday, there is a destination, a deadline and a reason for the bus problem to matter.",
      },
      {
        prompt:
          "Why is the ribbon solution stronger than the new magic whistle?",
        correct:
          "The ribbon is introduced earlier, so its later use grows from an existing detail.",
        wrong: [
          "Real stories may never contain magic.",
          "The ribbon makes Ben’s choice irrelevant.",
          "The whistle had already been carefully explained.",
        ],
        explanation:
          "The problem with the whistle is its convenient unexplained arrival, not magic itself. The ribbon gives readers a prepared, connected solution.",
      },
      {
        prompt:
          "Which action most clearly supports the story’s idea about kindness?",
        correct:
          "Ben helps clear the aisle for the passenger before claiming the seat.",
        wrong: [
          "Miriam initially forgets the sandwich.",
          "The cake is slightly tilted.",
          "The bus travels to another village.",
        ],
        explanation:
          "Ben could push ahead, but chooses to help. The theme is supported by that choice and its consequences.",
      },
      {
        prompt: "What changes the role of the basket in paragraph 5?",
        correct: "Its umbrellas become useful when rain begins.",
        wrong: [
          "It disappears without explanation.",
          "It becomes the driver of the bus.",
          "It proves that the passenger was imaginary.",
        ],
        explanation:
          "The basket first obstructs movement. Later its contents protect passengers, giving the same story object a new role.",
      },
    ],
    pairs: [
      ["Reach the birthday before sunset.", "Goal"],
      ["The basket blocks the aisle.", "Obstacle"],
      ["Ben ties the basket to the rack.", "Action that changes events"],
      ["Ben gets a seat and reaches the birthday.", "Resolution"],
    ],
    opens: [
      {
        prompt:
          "Explain how the ribbon makes the ending feel earned. Use one earlier detail and one later event from the passage.",
        exemplar:
          "The ribbon is already around Ben’s cake box before the bus problem. He later uses it to secure the basket and clear the aisle. His observation and choice connect an established object to the solution, rather than receiving a new magic tool at the last moment.",
        rubric: [
          "Identifies the earlier ribbon detail",
          "Explains its later use on the basket",
          "Connects the solution to Ben’s action",
          "Contrasts the prepared solution with an unexplained convenient fix",
        ],
      },
      {
        prompt:
          "Write an alternative two- or three-sentence ending that keeps Ben’s goal and helpful choice. Use the cake, ribbon or umbrellas meaningfully, then explain how your ending fits.",
        exemplar:
          "Ben reached the house under a borrowed umbrella, with his cake dry and his shoes muddy. He tied the ribbon around Grandmother’s present and told her why it was rather creased. The ending keeps his successful journey and lets an object from his helpful action return naturally.",
        rubric: [
          "Keeps Ben’s birthday-journey goal",
          "Respects or carries forward his helpful choice",
          "Uses a specific established object meaningfully",
          "Explains a coherent connection to the passage",
        ],
      },
      {
        prompt:
          "Why does Miriam remove the sentence ‘kindness is important’? Explain how two story details can already communicate that idea.",
        exemplar:
          "Ben helps the passenger instead of rushing for the last seat, and clearing the basket later lets everyone use its umbrellas in the rain. These actions show helpfulness and its effects, so the reader can infer the idea without a final instruction.",
        rubric: [
          "Explains that theme can be inferred through actions",
          "Cites Ben helping rather than pushing ahead",
          "Cites another accurate helpful consequence or detail",
          "Connects both details to the suggested theme",
        ],
      },
      {
        prompt:
          "Compare Miriam’s first draft with her revision. Explain two changes that make the story easier to follow, using details from the passage.",
        exemplar:
          "The revision gives Ben a goal and a deadline, so his journey has direction. It also uses the earlier ribbon to solve the basket problem, linking details instead of dropping in an unexplained whistle. The reader can follow why events matter and how one event leads to another.",
        rubric: [
          "Identifies the added goal or deadline",
          "Explains how it gives events purpose",
          "Identifies a specific improved causal connection",
          "Explains why the revision is more coherent",
        ],
      },
    ],
  },
];

function readingQuestions(reading: Reading, form: number): Question[] {
  const choice = (index: number): Question => {
    const q = reading.choices[index];
    return {
      id: "",
      kind: "choice",
      points: 4,
      objective: "passage-evidence",
      prompt: `In “${reading.title}”: ${q.prompt}`,
      correct: q.correct,
      choices: [q.wrong[0], q.correct, ...q.wrong.slice(1)],
      explanation: q.explanation,
    };
  };
  const open = (index: number): Question => {
    const q = reading.opens[index];
    return {
      id: "",
      kind: "open",
      points: 4,
      objective: "passage-analysis",
      ...q,
      prompt: `In “${reading.title}”: ${q.prompt}`,
      explanation: `One supported response: ${q.exemplar}`,
    };
  };
  return [
    choice(form * 2),
    open(form * 2),
    {
      id: "",
      kind: "match",
      points: 4,
      objective: "passage-connections",
      prompt: `Connect each detail from “${reading.title}” to its role.`,
      matches: reading.pairs.map(([left, right]) => ({ left, right })),
      explanation: reading.pairs
        .map(([left, right]) => `${left} — ${right}`)
        .join(". "),
    },
    choice(form * 2 + 1),
    open(form * 2 + 1),
  ];
}

const mathTeaching: Record<number, TeachingBlock[]> = {
  0: [
    {
      kind: "concept",
      title: "One whole. Equal pieces.",
      text: "A fraction describes a share of a chosen whole. The denominator names how many equal-sized pieces make that whole; the numerator counts the pieces you take. Keep the whole the same size when comparing shares. Half a tiny biscuit is not the same amount of food as half a giant pizza.",
      highlight: ["denominator", "numerator", "equal-sized", "whole"],
      fractionModel: {
        mode: "equivalence",
        numerator: 1,
        denominator: 2,
        steps: [
          "Start with one ribbon split into 2 equal parts. Shade 1 part: 1/2.",
          "Split every part into 3 smaller equal pieces. There are 6 pieces altogether.",
          "The shaded half now contains 3 pieces: 3/6. No ribbon was added or removed.",
          "Multiply numerator and denominator by the same number: 1/2 = 3/6.",
        ],
      },
    },
    {
      kind: "example",
      title: "Which share is larger?",
      text: "Two thirds and three fifths use different-sized pieces. Comparing only the numerators would be misleading. Rename both shares using fifteenths, so each little piece is the same size. The bars below have equal total length on purpose.",
      fractionModel: {
        mode: "compare",
        numerator: 2,
        denominator: 3,
        otherNumerator: 3,
        otherDenominator: 5,
        steps: [
          "A common denominator for 3 and 5 is 15.",
          "Multiply both parts of 2/3 by 5: 2/3 = 10/15.",
          "Multiply both parts of 3/5 by 3: 3/5 = 9/15.",
          "Ten fifteenths is one fifteenth more than nine fifteenths, so 2/3 > 3/5.",
        ],
      },
    },
  ],
  2: [
    {
      kind: "example",
      title: "Add amounts, not piece sizes",
      text: "You have 1/4 of a ribbon and add 1/3 of that same whole ribbon. Quarters and thirds are different units, so first rename them as twelfths. Then count the equal-sized pieces. The denominator stays 12 because adding pieces does not change their size.",
      fractionModel: {
        mode: "add",
        numerator: 1,
        denominator: 4,
        otherNumerator: 1,
        otherDenominator: 3,
        steps: [
          "Find a shared piece size: twelfths.",
          "1/4 = 3/12 and 1/3 = 4/12.",
          "Combine 3 pieces and 4 pieces: 3/12 + 4/12 = 7/12.",
          "Check: 7/12 is larger than either starting fraction and smaller than one whole.",
        ],
      },
    },
    {
      kind: "example",
      title: "Take away, then put it back",
      text: "A strip is 3/4 coloured. Remove 1/6 of the whole strip from the coloured amount. Rename both fractions using the same piece size before subtracting. Crossed-out pieces show what was removed; the uncrossed coloured pieces show what remains.",
      fractionModel: {
        mode: "subtract",
        numerator: 3,
        denominator: 4,
        otherNumerator: 1,
        otherDenominator: 6,
        steps: [
          "3/4 = 9/12. The coloured amount contains 9 twelfths.",
          "1/6 = 2/12. Remove 2 of those twelfths.",
          "9/12 − 2/12 = 7/12 remains.",
          "Check by adding back: 7/12 + 2/12 = 9/12 = 3/4.",
        ],
      },
    },
  ],
  4: [
    {
      kind: "example",
      title: "A fraction of a collection",
      text: "Fractions can describe collections as well as ribbons. To find 2/5 of 15 counters, split the whole collection into 5 equal groups first. Then take 2 of those groups. The denominator controls the sharing; the numerator controls how many groups to take.",
      fractionModel: {
        mode: "quantity",
        numerator: 2,
        denominator: 5,
        total: 15,
        steps: [
          "The whole is 15 counters.",
          "Divide into 5 equal groups: 15 ÷ 5 = 3 counters in each group.",
          "Take 2 groups: 2 × 3 = 6 counters.",
          "Check: 2/5 is less than 1/2, and 6 is less than half of 15.",
        ],
      },
    },
    {
      kind: "example",
      title: "Try a larger collection",
      text: "Use the same two-step method for 3/4 of 28 counters. Write the unit beside your answer so the number tells us what you counted. A good check uses the size of the fraction: three quarters is more than half but less than the whole.",
      fractionModel: {
        mode: "quantity",
        numerator: 3,
        denominator: 4,
        total: 28,
        steps: [
          "28 ÷ 4 = 7 counters in each quarter.",
          "3 × 7 = 21 counters in three quarters.",
          "Half of 28 is 14. The answer 21 is between 14 and 28.",
          "Reverse-check: one group is 7, so all 4 groups contain 28.",
        ],
      },
    },
  ],
};

function reviseWeeklyReading(form: Question[], f: number): Question[] {
  const passage =
    f === 0
      ? "At the library sale, Dalia found a box labelled ‘Damaged books.’ She assumed every book was unreadable. Then she opened three: one had a bent cover, another had a torn blank page, and the third was missing the final chapter. Her friend suggested selling the whole box for one low price. Dalia paused. The first two could still be read from beginning to end, but the third could not. She made separate labels describing each problem. A customer chose the bent-cover book and asked whether every book in that group had complete pages. Dalia had only checked three books. Instead of promising that all were complete, she offered to check the customer’s choice with him. The queue grew slightly longer, but nobody had to guess what ‘damaged’ meant."
      : "At a model exhibition, Yonatan saw a sign saying ‘This tower holds twenty blocks.’ Beside it, a photograph showed twenty small wooden cubes on the tower. A visitor offered twenty large metal blocks for a new demonstration. Yonatan hesitated. The count would be the same, but the total weight might be different. He asked to weigh one block of each type before testing. His partner thought the delay made their model look weak. Yonatan added a label explaining which blocks they had actually used, then suggested a gradual test with weights they could measure. The visitor agreed. Their original result was still useful, but it did not promise that the tower could hold any objects merely because there were twenty of them.";
  const correct =
    f === 0
      ? "The label includes different kinds of damage, so each book needs checking."
      : "Equal numbers of blocks can have different total weights.";
  form[0] = {
    id: form[0].id,
    kind: "choice",
    points: 4,
    objective: "independent-reading-inference",
    prompt: `Read this new passage.\n\n${passage}\n\nWhich conclusion is best supported?`,
    correct,
    choices: [
      correct,
      ...(f === 0
        ? [
            "Every book is missing its final chapter.",
            "Checking three books proves every book is complete.",
            "A bent cover makes the words unreadable.",
          ]
        : [
            "The tower can hold any twenty objects.",
            "The photograph proves the metal blocks are lighter.",
            "Measuring blocks makes a test less useful.",
          ]),
    ],
    explanation:
      f === 0
        ? "The checked books have different problems; Dalia cannot safely generalize from three to the whole box."
        : "The photograph establishes a result for specified wooden cubes. Different objects may impose a different load.",
  };
  const exemplar =
    f === 0
      ? "Dalia checks the actual damage and makes separate labels rather than assuming all damaged books are unreadable. She also admits she checked only three and offers to inspect the selected book. These choices make her description more reliable without claiming evidence she does not have."
      : "Yonatan notices that metal blocks may weigh more despite the same count. He proposes weighing them and testing gradually with measured weights. His label states what the original demonstration actually established rather than promising that any twenty objects will work.";
  form[5] = {
    id: form[5].id,
    kind: "open",
    points: 4,
    objective: "independent-reading-evidence",
    prompt: `Use this new passage.\n\n${passage}\n\nExplain how ${f === 0 ? "Dalia" : "Yonatan"} makes the claim more trustworthy. Cite two actions and explain one limit the character recognises.`,
    exemplar,
    rubric: [
      "Explains a plausible improvement in the claim’s reliability",
      "Cites one accurate action from the passage",
      "Cites a second accurate action from the passage",
      "Explains a specific limit on what the evidence establishes",
    ],
    explanation: `One supported interpretation: ${exemplar}`,
  };
  const sentence =
    f === 0
      ? "The bundle of maps are on the desk"
      : "The stack of letters are beside the chair";
  const corrected =
    f === 0
      ? "The bundle of maps is on the desk"
      : "The stack of letters is beside the chair";
  const people = f === 0 ? ["Daniel", "Avi"] : ["Rina", "Esther"];
  form[19] = {
    id: form[19].id,
    kind: "open",
    points: 4,
    objective: "grammar-transfer",
    prompt: `Correct “${sentence}” and explain the verb. Then clarify “${people[0]} showed ${people[1]} their drawing” so ${people[1]} owns it. Explain what was unclear.`,
    exemplar: `${corrected}, because the main subject is one ${f === 0 ? "bundle" : "stack"}. ${people[0]} showed ${people[1]} the drawing ${people[1]} had made. The original ownership reference was unclear.`,
    rubric: [
      "Uses is with the singular main subject",
      "Identifies the main subject rather than the nearby plural noun",
      "Makes the requested drawing owner unambiguous",
      "Explains the original ownership ambiguity",
    ],
    explanation:
      "The verb agrees with the singular main subject. Naming the owner removes the uncertain reference.",
  };
  return form;
}

const cloneLessons = structuredClone(LESSONS_V2);
export const LESSONS_V3: DailyLesson[] = cloneLessons.map((lesson, index) => {
  const id = index === 5 ? "weekly-test-v3" : `lesson-v3-${index + 1}`;
  const idMap = new Map<string, string>();
  lesson.forms = lesson.forms.map((form, f) =>
    form.map((q, j) => {
      const newId = `${id}-f${f + 1}-q${j + 1}`;
      idMap.set(q.id, newId);
      return { ...q, id: newId };
    }),
  );
  lesson.id = id;
  lesson.version = 3;
  lesson.chunks = lesson.chunks.map((chunk, j) => ({
    ...chunk,
    id: `${id}-chunk-${j + 1}`,
    questionIds: chunk.questionIds.map((ids) =>
      ids.map((old) => idMap.get(old)!),
    ),
  }));
  if (index < 5) {
    const reading = readings[index];
    const chunk = lesson.chunks[0];
    chunk.title = reading.title;
    chunk.objectives = [
      "Read a sustained passage and locate relevant evidence",
      "Explain an interpretation with two accurate textual details",
      ...chunk.objectives,
    ];
    chunk.teaching = [
      {
        kind: "passage",
        title: reading.title,
        text: reading.text,
        highlight: reading.words.map((w) => w[0]),
      },
      {
        kind: "vocabulary",
        title: "Words from the story",
        text: "Return to the sentence where each word appears. Use the surrounding action to test its meaning.",
        terms: reading.words.map(([word, meaning, example]) => ({
          word,
          meaning,
          example,
        })),
      },
      {
        kind: "example",
        title: "Think beyond the first answer",
        text: reading.focus,
      },
    ];
    lesson.forms = lesson.forms.map((form, f) => [
      ...readingQuestions(reading, f).map((q, j) => ({
        ...q,
        id: `${id}-f${f + 1}-q${j + 1}`,
      })),
      ...form.slice(5),
    ]);
    if (mathTeaching[index]) lesson.chunks[1].teaching = mathTeaching[index];
    lesson.teaching = lesson.chunks.flatMap((c) => c.teaching);
    lesson.objectives = lesson.chunks.flatMap((c) => c.objectives);
  }
  if (index === 5)
    lesson.forms = lesson.forms.map((form, f) => reviseWeeklyReading(form, f));
  return lesson;
});
export const WEEK_TITLE_V3 = "Week 1 · Read closely, build an explanation";
export const WEEK_OBJECTIVES_V3 = [
  "Use evidence from five sustained passages to explain character, cause, language and theme",
  ...WEEK_OBJECTIVES_V2,
  "Use equal-whole visual models to explain fraction equivalence, comparison, operations and quantities",
];
export const READING_PASSAGES_V3 = readings.map(({ title, text }) => ({
  title,
  text,
}));
