import type { DayBlueprint } from "./v4-types";

export const DAYS_3_AND_4: DayBlueprint[] = [
  // =========================================================================
  // DAY 3
  // =========================================================================
  {
    order: 3,
    title: "Day 3 · Inside-Out Baseball Gloves & Shabbos Borer",
    readingPassage: {
      title: "Turned Inside-Out",
      text: `When Eli visited a baseball-glove workshop, he expected to see a machine stamp out a finished mitt in one piece. Instead, master craftsman Mr. Morales laid thirty-two flat leather shapes across his bench like a jigsaw puzzle. "We stamp each piece with steel dies for precision," Mr. Morales said, "and then we sew the whole shell together completely inside-out!"

Eli stared at the lumpy, backward leather bag on the sewing machine. "If you leave it like that, the rough seam edges will scrape the player's fingers," Eli said. Mr. Morales grinned, warmed the stitched leather in a steam box, and pushed the thumb and fingers right-side-out over polished steel rods—hiding every sharp seam neatly on the inside.

Next, Mr. Morales threaded thick strips of stiff rawhide lacing through punched holes along the web and finger tips. "The soft shell catches the ball," he explained, "but the tension in these rawhide laces reinforces the fingers so a line drive never bends them backward."`,
      words: [
        {
          word: "precision",
          meaning: "Exactness and careful accuracy in every measurement or cut.",
          example: "Steel cutting dies stamp out thirty-two glove pieces with millimeter precision.",
        },
        {
          word: "tension",
          meaning: "A pulling force transmitted through a tight string, cable, or lace.",
          example: "Tight rawhide laces use tension to hold the fingers of a baseball glove together.",
        },
        {
          word: "reinforce",
          meaning: "To strengthen something by adding extra support or stronger material.",
          example: "Thick laces and felt pads reinforce the glove's web against hard line drives.",
        },
        {
          word: "contemplate",
          meaning: "To look at or think about something carefully and thoughtfully.",
          example: "Eli paused to contemplate how a flat puzzle of leather became a curved pocket.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Short Reading: Turned Inside-Out",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use precision, tension, reinforce, and contemplate accurately",
          "Explain why a baseball glove is sewn inside-out and laced with rawhide using textual evidence",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            text: "Flip each word card to see its meaning and example, then try the Quick Word Lightning Check!",
            highlight: ["precision", "tension", "reinforce", "contemplate"],
            terms: [
              {
                word: "precision",
                meaning: "Exactness and careful accuracy in every measurement or cut.",
                example: "Steel cutting dies stamp out thirty-two glove pieces with millimeter precision.",
              },
              {
                word: "tension",
                meaning: "A pulling force transmitted through a tight string, cable, or lace.",
                example: "Tight rawhide laces use tension to hold the fingers of a baseball glove together.",
              },
              {
                word: "reinforce",
                meaning: "To strengthen something by adding extra support or stronger material.",
                example: "Thick laces and felt pads reinforce the glove's web against hard line drives.",
              },
              {
                word: "contemplate",
                meaning: "To look at or think about something carefully and thoughtfully.",
                example: "Eli paused to contemplate how a flat puzzle of leather became a curved pocket.",
              },
            ],
          },
          {
            kind: "passage",
            title: "Turned Inside-Out",
            text: `When Eli visited a baseball-glove workshop, he expected to see a machine stamp out a finished mitt in one piece. Instead, master craftsman Mr. Morales laid thirty-two flat leather shapes across his bench like a jigsaw puzzle. "We stamp each piece with steel dies for precision," Mr. Morales said, "and then we sew the whole shell together completely inside-out!"\n\nEli stared at the lumpy, backward leather bag on the sewing machine. "If you leave it like that, the rough seam edges will scrape the player's fingers," Eli said. Mr. Morales grinned, warmed the stitched leather in a steam box, and pushed the thumb and fingers right-side-out over polished steel rods—hiding every sharp seam neatly on the inside.\n\nNext, Mr. Morales threaded thick strips of stiff rawhide lacing through punched holes along the web and finger tips. "The soft shell catches the ball," he explained, "but the tension in these rawhide laces reinforces the fingers so a line drive never bends them backward."`,
            highlight: ["precision", "tension", "reinforces"],
          },
        ],
        form1: {
          c1: {
            objective: "vocab-reinforce-meaning",
            prompt:
              "In paragraph 3 of “Turned Inside-Out,” what does Mr. Morales mean when he says the rawhide laces reinforce the fingers?",
            correct:
              "They add extra strength and support so a hard-hit ball won't bend the fingers backward.",
            wrong: [
              "They make the fingers dissolve in steam.",
              "They paint the fingers bright blue.",
              "They remove all the stitches from the palm.",
            ],
            explanation:
              "Reinforce means to strengthen with extra support—the tight rawhide laces link the fingertips and web together.",
          },
          o1: {
            objective: "reading-insideout-purpose",
            prompt:
              "In “Turned Inside-Out,” why does Mr. Morales sew the glove shell inside-out first, and how is he able to flip stiff leather right-side-out without tearing it?",
            exemplar:
              "Sewing it inside-out first means that once it is flipped right-side-out, all the rough seam edges are tucked neatly inside where they won't scrape the player's hand or get torn by the ball. He warms the stitched shell in a steam box to soften it, then pushes the fingers over polished steel rods.",
            rubric: [
              "Explains that flipping the glove hides rough seam edges on the inside",
              "Mentions warming the stitched leather in a steam box",
              "Mentions pushing the thumb and fingers over polished steel rods",
              "Connects the process to comfort or seam protection",
            ],
            explanation:
              "Paragraph 2 explains both the reason (hiding rough seam edges inside) and the method (steaming the leather soft and turning it over steel rods).",
          },
          m1: {
            objective: "vocab-match-day3",
            prompt: "Connect each vocabulary word to its meaning.",
            matches: [
              { left: "Precision", right: "Exactness and careful accuracy" },
              { left: "Tension", right: "Pulling force carried along a tight lace or cable" },
              { left: "Reinforce", right: "Strengthen by adding support" },
              { left: "Contemplate", right: "Think about something carefully" },
            ],
            explanation:
              "Precision is accuracy; tension is pulling force; reinforce is strengthen; contemplate is think deeply.",
          },
          c2: {
            objective: "reading-insideout-assumption",
            prompt:
              "In paragraph 1 of “Turned Inside-Out,” what mistaken assumption did Eli have before entering the workshop?",
            correct:
              "He thought a machine stamped out a complete finished glove in a single piece.",
            wrong: [
              "He thought gloves were carved out of solid oak blocks.",
              "He thought baseball gloves had no fingers.",
              "He thought rawhide laces were made of glass.",
            ],
            explanation:
              "Paragraph 1 states that Eli expected to see a machine stamp out a finished mitt in one piece, rather than 32 flat leather shapes.",
          },
          o2: {
            objective: "reading-insideout-laces",
            prompt:
              "In “Turned Inside-Out,” why does a baseball glove use TWO different kinds of leather—a soft tanned shell AND stiff rawhide laces? Use details from paragraph 3.",
            exemplar:
              "The soft tanned shell needs to flex and close around the ball to catch it, while the stiff rawhide laces carry tension across the web and fingertips to reinforce the glove so a line drive doesn't bend the fingers backward.",
            rubric: [
              "Identifies the job of the soft tanned shell (flexing/catching the ball)",
              "Identifies the job of the stiff rawhide laces (carrying tension/reinforcing fingers)",
              "Explains what would happen without the lace tension (fingers bending backward)",
              "Shows how the two materials work together as a team",
            ],
            explanation:
              "Combining a supple tanned shell with high-tension rawhide lacing gives a glove both flexibility and structural backbone.",
          },
        },
        form2: {
          c1: {
            objective: "vocab-reinforce-meaning",
            prompt:
              "Why does Mr. Morales use steel dies to cut the thirty-two leather pieces in “Turned Inside-Out”?",
            correct: "For precision, so all thirty-two pieces line up accurately when stitched together.",
            wrong: [
              "To burn the leather until it turns to ash.",
              "Because scissors have not been invented yet.",
              "To make every glove a random, lopsided size.",
            ],
            explanation:
              "When 32 curved pieces must form a 3D hand pocket, each piece must be stamped with millimeter precision.",
          },
          o1: {
            objective: "reading-insideout-purpose",
            prompt:
              "In paragraph 2 of “Turned Inside-Out,” what problem did Eli spot when he saw the backward leather bag, and how did Mr. Morales solve it?",
            exemplar:
              "Eli noticed that if the seams stayed on the outside, the rough edges would scrape the player's fingers. Mr. Morales solved it by steaming the leather soft and turning the entire glove right-side-out over steel rods so the seams were hidden inside.",
            rubric: [
              "Identifies Eli's observation about rough seam edges scraping fingers",
              "Explains that the glove was only temporarily inside-out",
              "Describes steaming the leather and flipping it over steel rods",
              "Explains that the finished glove has smooth outer surfaces and hidden seams",
            ],
            explanation:
              "Turning the steamed shell right-side-out tucks the stitch allowances neatly inside the fingers.",
          },
          m1: {
            objective: "vocab-match-day3",
            prompt: "Connect each vocabulary word to its meaning.",
            matches: [
              { left: "Precision", right: "Exactness and careful accuracy" },
              { left: "Tension", right: "Pulling force carried along a tight lace or cable" },
              { left: "Reinforce", right: "Strengthen by adding support" },
              { left: "Contemplate", right: "Think about something carefully" },
            ],
            explanation:
              "Precision is accuracy; tension is pulling force; reinforce is strengthen; contemplate is think deeply.",
          },
          c2: {
            objective: "reading-insideout-assumption",
            prompt:
              "In “Turned Inside-Out,” what force in the rawhide laces stops a hard line drive from bending a glove's fingers backward?",
            correct: "Tension along the laces connecting the fingertips and web.",
            wrong: [
              "Magnetism inside the leather pores.",
              "Gravity pulling the ball upward.",
              "Steam trapped inside the wrist strap.",
            ],
            explanation:
              "When a ball pushes back on one finger or the web, tension in the rawhide lacing shares that pull across the neighboring fingers.",
          },
          o2: {
            objective: "reading-insideout-laces",
            prompt:
              "Suppose a player's glove lace snaps right between the index finger and the web, and they keep playing without fixing it. Based on “Turned Inside-Out,” what could happen on the next hard line drive?",
            exemplar:
              "Without that rawhide lace providing tension to reinforce the gap between the index finger and the web, a hard line drive could bend the finger backward, rip the stitched shell, or burst right through the web!",
            rubric: [
              "Notes that the broken lace removes tension/reinforcement between finger and web",
              "Predicts that a hard ball could bend the finger back or tear the leather shell",
              "Connects the explanation to how laces share impact force",
              "Uses clear cause-and-effect reasoning",
            ],
            explanation:
              "Each lace acts like a suspension cable; if one snaps, the full impact load falls on adjacent stitches and fingers.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: Engineering a Pro Baseball Glove",
        subjects: ["How things work"],
        objectives: [
          "Identify the jobs of the Web, Pocket, Heel Pad, and Rawhide Laces in a baseball glove",
          "Trace how impact force travels from the pocket into the rawhide lacing network",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Anatomy of a Catch: How a Glove Stops an 85-mph Fastball",
            diagram: "glove-anatomy-lab",
            text: `A pro baseball glove is a wearable shock absorber built from four key zones working together:\n\n1. The Web sits between the thumb and index finger like a trampoline net. When a fastball hits the web, it flexes backward to slow the ball down and kill its spin.\n2. The Deep Pocket sits right below the web. Here, full-grain steerhide is molded into a deep bowl so the ball settles securely instead of popping out.\n3. Rawhide Laces act like the suspension cables on a bridge! Because rawhide is stiffer than the tanned leather shell, the laces link the thumb, web, and four fingers into one connected frame—spreading the shock of a catch across the whole glove.\n4. The Heel & Palm Pad layers dense wool felt and leather at the base of your hand, protecting your bones while forming a hinge so your thumb and pinky can snap the glove shut.`,
            highlight: ["Web", "Deep Pocket", "Rawhide Laces", "Heel & Palm Pad"],
            terms: [
              {
                word: "The Web",
                meaning: "The laced leather basket or net between the thumb and index finger.",
                example: "Infielders use an open web so dirt falls out, while pitchers use a closed web to hide their grip!",
              },
              {
                word: "The Pocket",
                meaning: "The curved bowl-shaped center of the palm right below the web where the ball nests.",
                example: "Catching the ball in the pocket instead of the palm bones prevents painful stingers.",
              },
              {
                word: "Die-Cutting",
                meaning: "Using sharp steel cookie-cutter blades to stamp exact leather shapes from a hide.",
                example: "Die-cutting ensures the palm shell and inner lining match to the millimeter.",
              },
            ],
            sources: [
              {
                label: "Smithsonian · How Baseball Gloves Evolved into Engineering Marvels",
                url: "https://www.smithsonianmag.com/arts-culture/the-history-of-the-baseball-glove-180968661/",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "glove-web-job",
            prompt:
              "Where is the Web located on a baseball glove, and what is its main job?",
            correct:
              "Between the thumb and index finger; it acts like a shock-absorbing net to trap the ball.",
            wrong: [
              "Inside the wrist strap; it keeps sweat off the player's watch.",
              "On the tip of the pinky finger; it whistles in the wind.",
              "Underneath the cleats; it grips the grass.",
            ],
            explanation:
              "The web bridges the thumb and index finger, flexing like a net to absorb the ball's speed and spin.",
          },
          o1: {
            objective: "glove-impact-path",
            prompt:
              "Trace what happens when an 85-mph baseball smacks into the Web and Pocket of a glove. How do the Web, Pocket, and Rawhide Laces work together to stop the ball without hurting your hand?",
            exemplar:
              "First, the Web and Deep Pocket flex backward like a cradle to slow the ball down away from your bare palm bones. At the same time, the tight Rawhide Laces carry the pulling tension across all the fingers so the impact force is spread out instead of stinging one spot or ripping the leather.",
            rubric: [
              "Describes the Web or Pocket flexing/cradling the ball away from the palm bones",
              "Explains that Rawhide Laces distribute tension across the fingers/frame",
              "Connects spreading the force to protecting the hand and preventing tears",
              "Traces a clear sequence from ball impact to force distribution",
            ],
            explanation:
              "Just like a bridge spreads weight into its supports, a glove's pocket and rawhide laces spread kinetic impact energy across the whole frame.",
          },
          m1: {
            objective: "glove-parts-match",
            prompt: "Connect each part of a pro baseball glove to its engineering job.",
            matches: [
              { left: "The Web", right: "Shock-absorbing net between thumb and index finger" },
              { left: "The Deep Pocket", right: "Bowl-shaped cradle below the web that traps the ball" },
              { left: "Rawhide Lacing", right: "Stiff cables that link fingers and spread impact tension" },
              { left: "Heel & Palm Pad", right: "Felt-and-leather cushion that protects hand bones and hinges" },
            ],
            explanation:
              "Web traps between thumb/index; Pocket cradles below the web; Rawhide Lacing spreads tension; Heel Pad cushions and hinges.",
          },
          c2: {
            objective: "glove-pitcher-vs-infielder-web",
            prompt:
              "Why do pitchers usually choose a solid closed web on their glove, while shortstops often prefer an open cross-laced web?",
            correct:
              "Pitchers want to hide their finger grip on the ball from the batter, while shortstops want infield dirt to fall through the openings.",
            wrong: [
              "Pitchers never catch the ball, and shortstops never throw.",
              "Closed webs are made of paper, and open webs are made of iron.",
              "MLB rules require shortstops to play with holes in their palm.",
            ],
            explanation:
              "Different positions have different design needs: hiding pitch grips for pitchers vs. shedding dirt and seeing the ball through the web for infielders.",
          },
          o2: {
            objective: "glove-palm-stinger",
            prompt:
              "Every baseball player knows how much it stings when you accidentally catch a hard throw low on the flat palm instead of up in the Pocket. Using the glove anatomy diagram, explain why catching in the Pocket hurts so much less!",
            exemplar:
              "When you catch low on the palm, the ball slams directly against your hand bones with only a thin layer of leather and felt between them. When you catch up in the Pocket and Web, the ball is suspended in the leather cradle between the thumb and index finger, so the leather and rawhide laces stretch to absorb the energy before it hits your bones!",
            rubric: [
              "Explains that catching on the palm hits directly over the hand bones",
              "Explains that the Pocket/Web suspends the ball between the thumb and fingers",
              "Mentions that the leather cradle and laces stretch/flex to absorb shock",
              "Gives a clear physical comparison between the two catch spots",
            ],
            explanation:
              "The Pocket acts like a hammock suspended between the thumb and index finger—stopping the ball in mid-air rather than against your palm bones.",
          },
        },
        form2: {
          c1: {
            objective: "glove-web-job",
            prompt:
              "Why are a glove's laces made from untanned (or lightly tanned) stiff rawhide instead of soft suede?",
            correct:
              "Because the laces must act like strong tension cables that hold the glove's shape without stretching out easily.",
            wrong: [
              "Because rawhide dissolves in the sun.",
              "Because suede is too heavy to lift.",
              "So the laces will snap every time you catch a pop fly.",
            ],
            explanation:
              "Rawhide has high tensile strength and low stretch, making it ideal for structural lacing cables.",
          },
          o1: {
            objective: "glove-impact-path",
            prompt:
              "How are the Rawhide Laces on a baseball glove similar to the cables or beams on a bridge? Explain how they handle force during a catch.",
            exemplar:
              "On a bridge, beams and cables transfer a heavy load across the structure so one spot doesn't collapse. In a baseball glove, when a fastball slams into the web or a fingertip, the rawhide laces transfer that pulling tension across all the other fingers and panels so the glove absorbs the shock together.",
            rubric: [
              "Compares the laces to bridge cables/beams that share a load",
              "Identifies the fastball impact as the force hitting the web or finger",
              "Explains that tension travels through the laces to neighboring fingers",
              "Concludes that sharing the load prevents tearing or bending backward",
            ],
            explanation:
              "Both systems use connected structural members to distribute a concentrated force across a wider frame.",
          },
          m1: {
            objective: "glove-parts-match",
            prompt: "Connect each part of a pro baseball glove to its engineering job.",
            matches: [
              { left: "The Web", right: "Shock-absorbing net between thumb and index finger" },
              { left: "The Deep Pocket", right: "Bowl-shaped cradle below the web that traps the ball" },
              { left: "Rawhide Lacing", right: "Stiff cables that link fingers and spread impact tension" },
              { left: "Heel & Palm Pad", right: "Felt-and-leather cushion that protects hand bones and hinges" },
            ],
            explanation:
              "Web traps between thumb/index; Pocket cradles below the web; Rawhide Lacing spreads tension; Heel Pad cushions and hinges.",
          },
          c2: {
            objective: "glove-pitcher-vs-infielder-web",
            prompt:
              "What two jobs does the Heel & Palm Pad at the bottom of a baseball glove perform?",
            correct:
              "It cushions the bones at the base of the hand and forms the hinge where the glove folds shut.",
            wrong: [
              "It inflates the baseball with air and polishes the cleats.",
              "It attaches the glove to the batter's helmet.",
              "It makes the glove heavier than a bowling ball.",
            ],
            explanation:
              "The heel pad protects the base of the palm and creates the fold line (hinge) where the thumb and pinky close.",
          },
          o2: {
            objective: "glove-palm-stinger",
            prompt:
              "If you designed a glove for a catcher who catches 95-mph fastballs all game vs. an infielder who needs a light glove to flip the ball quickly to second base, how would you adjust the Heel Padding and Pocket depth?",
            exemplar:
              "For the catcher, I would add much thicker felt heel and thumb padding and a deep pocket to absorb the huge shock of 95-mph pitches without hurting their hand. For the infielder, I would use lighter padding and a shallower pocket so they can grab the ball out of the glove in a split second to throw.",
            rubric: [
              "Gives the catcher's mitt thicker padding and a deeper pocket for shock protection",
              "Gives the infielder's glove lighter padding and a shallower pocket for quick transfers",
              "Explains the engineering tradeoff between protection/weight and speed",
              "Connects the design choices to each player's job on the field",
            ],
            explanation:
              "Every piece of sports equipment balances protection and weight against speed and agility.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Hilchot Shabbos: The 3 Golden Keys of Borer (Sorting)",
        subjects: ["Torah", "Halacha"],
        objectives: [
          "Name and apply the 3 Golden Keys of permitted sorting on Shabbos (אי״ד: Ochel, B'Yad, Miyad)",
          "Evaluate everyday Shabbos food and table scenarios using the rules of Borer",
        ],
        teaching: [
          {
            kind: "halacha",
            title: "Hilchot Shabbos: Sorting with the 3 Golden Keys (אי״ד)",
            diagram: "shabbos-borer-lab",
            text: `One of the 39 Melachos (categories of creative work) we rest from on Shabbos is Borer—sorting or separating mixed items, which was done in the Mishkan when separating unwanted husks from grain or sorting dyed threads. Importantly, Borer applies not only to food (like trail mix or salad), but also to mixed household objects like cutlery, books, or clothing!\n\nHow do we take what we want from a mixture on Shabbos in a completely permitted way? Poskim give us a famous 3-letter memory code—אי״ד (Ochel, Yad, Miyad)—the 3 Golden Keys that must ALL be unlocked together:\n1. א — Ochel m'toch Psolet (Wanted from Unwanted): Always pick out the item you WANT to use/eat right now, leaving the unwanted items behind. Never pull the unwanted item (Psolet) out of the good!\n2. י — B'Yad (By Hand): Separate with your hand (or a normal eating fork/spoon), never with a sorting tool like a strainer, sifter, or slotted spoon.\n3. ד — Miyad (Immediately): Separate only for immediate use right now (such as for the meal you are currently about to eat), not to store away for a later meal or after Shabbos!`,
            highlight: ["Borer", "Ochel", "Psolet", "B'Yad", "Miyad"],
            terms: [
              {
                word: "Ochel (אֹכֶל) vs. Psolet (פְּסֹלֶת)",
                meaning: "Ochel is the wanted item you wish to use now; Psolet is the unwanted item you wish to leave behind.",
                example: "If you love cashews and dislike raisins in trail mix, the cashews are Ochel for you and the raisins are Psolet!",
              },
              {
                word: "B'Yad (בְּיָד)",
                meaning: "By hand (or a standard eating utensil used like an extension of the hand, not a strainer).",
                example: "Picking out the piece of chicken you want with your fork counts as B'Yad.",
              },
              {
                word: "Miyad (מִיָּד)",
                meaning: "Immediately—for the meal or activity taking place right now.",
                example: "Selecting the Shabbos shirts you are putting on right now is Miyad; sorting laundry for Sunday is not.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Shulchan Aruch Orach Chaim 319 (Laws of Borer)",
                url: "https://www.sefaria.org/Shulchan_Arukh%2C_Orach_Chayim.319.1?lang=bi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "halacha-borer-keys",
            prompt:
              "What do the three Hebrew memory letters אי״ד stand for in the laws of Borer on Shabbos?",
            correct:
              "Ochel (take the wanted item), B'Yad (by hand), and Miyad (for immediate use right now).",
            wrong: [
              "Always use a strainer, sort on Friday night, and save for Sunday.",
              "Only sort soup, never touch forks, and eat quickly.",
              "Take the unwanted item first, put it in a bowl, and wash it.",
            ],
            explanation:
              "The acronym אי״ד reminds us of the three required conditions: Ochel (wanted from unwanted), Yad (by hand), and Miyad (immediately).",
          },
          o1: {
            objective: "halacha-borer-salad-case",
            prompt:
              "At the Shabbos table, a bowl of vegetable salad has diced cucumbers and tomatoes mixed together, and you don't like tomatoes. Explain the wrong way (Borer) and the right way to handle this on Shabbos using the 3 Golden Keys.",
            exemplar:
              "The wrong way is picking the unwanted tomatoes (Psolet) out of the salad to leave the cucumbers behind, because that takes Psolet from Ochel. The right way is using your fork or spoon (B'Yad) right before you eat (Miyad) to scoop only the cucumbers and lettuce you DO want (Ochel) onto your plate.",
            rubric: [
              "Explains that pulling out the disliked tomatoes is forbidden because they are Psolet (unwanted)",
              "Explains the permitted solution: taking the wanted cucumbers/salad (Ochel) onto your plate",
              "Mentions doing it by hand/fork (B'Yad) and for eating right now (Miyad)",
              "Applies the Ochel vs. Psolet rule accurately",
            ],
            explanation:
              "Even right before eating by hand, removing the unwanted item (Psolet) from the wanted food is forbidden; instead, take the wanted food (Ochel) from the mixture.",
          },
          m1: {
            objective: "halacha-borer-match",
            prompt: "Connect each Hilchot Shabbos Borer term to its meaning.",
            matches: [
              { left: "Ochel", right: "The wanted item you plan to eat or use now" },
              { left: "Psolet", right: "The unwanted item you want to leave behind" },
              { left: "B'Yad", right: "Separating by hand rather than with a strainer" },
              { left: "Miyad", right: "Separating for immediate use right now" },
            ],
            explanation:
              "Ochel is wanted; Psolet is unwanted; B'Yad is by hand; Miyad is for immediate use.",
          },
          c2: {
            objective: "halacha-borer-cutlery",
            prompt:
              "Right after finishing the Shabbos morning meal at 1:00 PM, someone wants to sort a mixed tray of clean forks, knives, and spoons into separate drawer slots for the rest of the week. Why is this a problem of Borer?",
            correct:
              "Because Borer applies to non-food items too, and sorting cutlery for later breaks the rule of Miyad (immediate use).",
            wrong: [
              "Because metal forks may never be touched on Shabbos.",
              "Because spoons are always Psolet.",
              "Because Borer only applies to apples and oranges.",
            ],
            explanation:
              "Borer applies to mixed objects like cutlery, books, and games; sorting them into compartments for later violates Miyad.",
          },
          o2: {
            objective: "halacha-borer-boardgame",
            prompt:
              "Your little sister wants to play a permitted Shabbos board game right now, and all the red and blue playing pieces are jumbled in one box. How should you take out the pieces now, and what should you remember when cleaning up after the game?",
            exemplar:
              "Right before playing (Miyad), you can use your hand (B'Yad) to pick out the color pieces you want to play with (Ochel). When cleaning up after the game is over, you shouldn't sort the red and blue pieces into separate bags for next week (since that's not Miyad)—just put them back into one mixed bag or box together!",
            rubric: [
              "Explains how to take pieces before playing (pick wanted pieces by hand for immediate play)",
              "Addresses cleanup after the game when pieces are no longer needed Miyad",
              "Explains putting pieces away together rather than sorting into separate bags for later",
              "Shows clear understanding of Miyad in non-food items",
            ],
            explanation:
              "Picking game pieces to play right now satisfies Ochel, B'Yad, and Miyad; sorting them into separate compartments when putting the game away is for future use and forbidden.",
          },
        },
        form2: {
          c1: {
            objective: "halacha-borer-keys",
            prompt:
              "Why is pouring orange juice through a mesh strainer to catch the pulp forbidden on Shabbos even if you plan to drink the juice immediately?",
            correct:
              "Because using a strainer violates B'Yad—it separates using a specialized sorting tool instead of by hand.",
            wrong: [
              "Because orange juice is not kosher on Shabbos.",
              "Because drinking juice is never considered Miyad.",
              "Because pulp is heavier than water.",
            ],
            explanation:
              "All three keys must be met! Even if you drink it Miyad, using a strainer tool violates B'Yad (and also traps the Psolet).",
          },
          o1: {
            objective: "halacha-borer-salad-case",
            prompt:
              "Two brothers share a mixed bowl of pretzels and almonds on Shabbos afternoon. Avi wants only pretzels, and Benny wants only almonds. In this bowl, which item is 'Ochel' and which is 'Psolet'—and how can both brothers eat what they like?",
            exemplar:
              "Ochel and Psolet depend on what each person wants right now! For Avi, the pretzels are Ochel and he picks pretzels out by hand to eat now. For Benny, the almonds are Ochel and he picks almonds out by hand to eat now.",
            rubric: [
              "Explains that Ochel and Psolet depend on what the person wants to eat",
              "Identifies pretzels as Ochel for Avi and almonds as Ochel for Benny",
              "States that each brother picks his wanted food by hand (B'Yad) to eat now (Miyad)",
              "Shows clear reasoning about how Ochel is defined",
            ],
            explanation:
              "In Hilchot Borer, 'Ochel' simply means whichever item in the mixture you personally wish to take and use right now!",
          },
          m1: {
            objective: "halacha-borer-match",
            prompt: "Connect each Hilchot Shabbos Borer term to its meaning.",
            matches: [
              { left: "Ochel", right: "The wanted item you plan to eat or use now" },
              { left: "Psolet", right: "The unwanted item you want to leave behind" },
              { left: "B'Yad", right: "Separating by hand rather than with a strainer" },
              { left: "Miyad", right: "Separating for immediate use right now" },
            ],
            explanation:
              "Ochel is wanted; Psolet is unwanted; B'Yad is by hand; Miyad is for immediate use.",
          },
          c2: {
            objective: "halacha-borer-cutlery",
            prompt:
              "You are about to set the table for the Shabbos meal starting right now, and you need 6 forks from a mixed bin of clean forks and spoons. How may you take them?",
            correct:
              "Reach in by hand and pick out the 6 forks you need right now for the meal.",
            wrong: [
              "Pull out all the spoons first so only forks are left in the bin.",
              "Sort the entire bin into separate fork and spoon piles for Tuesday.",
              "Dump the bin through a sorting machine.",
            ],
            explanation:
              "Taking the forks you want (Ochel) by hand (B'Yad) to set the table for the meal starting now (Miyad) fulfills all 3 Golden Keys!",
          },
          o2: {
            objective: "halacha-borer-boardgame",
            prompt:
              "A plate of grapes has two spoiled grapes mixed in among thirty fresh ones. You want to eat some fresh grapes right now. Explain what you should do and what you must NOT do.",
            exemplar:
              "You must NOT reach in and pull out the two spoiled grapes to clean up the plate, because that is removing Psolet (the unwanted part) from Ochel. Instead, simply reach in by hand and take the fresh grapes (Ochel) you want to eat right now, leaving the spoiled ones on the plate.",
            rubric: [
              "Warns against removing the spoiled grapes (Psolet) from the good ones",
              "Instructs taking the fresh grapes (Ochel) by hand to eat right now (Miyad)",
              "Correctly identifies spoiled grapes as Psolet and fresh grapes as Ochel",
              "Gives a clear, practical explanation",
            ],
            explanation:
              "Even when there are only one or two bad pieces in a bowl, pulling out the bad ones is taking Psolet from Ochel; instead, take the good ones you want to eat!",
          },
        },
      },
    ],
  },

  // =========================================================================
  // DAY 4
  // =========================================================================
  {
    order: 4,
    title: "Day 4 · Breaking In the Pocket & The Dove's Olive Leaf",
    readingPassage: {
      title: "The Shortcut That Cracked",
      text: `Two days before opening day, Rami and Noam bought identical full-grain infield gloves. Out of the box, both mitts felt stiff as crab claws. "I know a shortcut," Rami announced. That night he soaked his glove in a bucket of water and baked it in a warm oven for twenty minutes so it would fold right away.

Noam took a methodical approach. He rubbed a pea-sized drop of leather balm into the pocket and spent twenty minutes each evening pounding the heel hinge and pocket with a smooth wooden mallet, wrapping a baseball inside overnight. Gradually, the stiff steerhide grew pliable along the exact crease where his thumb and pinky met.

By the third inning on Sunday, Rami's oven-baked lace snapped on a grounder—the heat had cooked the collagen fibers until they turned brittle. Meanwhile, Noam's glove snapped shut with a crisp pop, holding a deep pocket that fit his hand like a custom mold.`,
      words: [
        {
          word: "pliable",
          meaning: "Easy to bend and shape without breaking or losing strength.",
          example: "Pounding the pocket with a wooden mallet made the stiff leather pliable.",
        },
        {
          word: "brittle",
          meaning: "Hard but fragile—likely to crack or snap suddenly under stress.",
          example: "Baking leather in a hot oven cooks the fibers and makes the laces brittle.",
        },
        {
          word: "methodical",
          meaning: "Done step by step in a careful, patient, and organized way.",
          example: "Noam's methodical break-in routine shaped the hinges without hurting the hide.",
        },
        {
          word: "gradually",
          meaning: "Happening little by little over time rather than all at once.",
          example: "A pro baseball glove gradually molds to the shape of its owner's hand.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Short Reading: The Shortcut That Cracked",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use pliable, brittle, methodical, and gradually accurately",
          "Contrast two experimental approaches and trace their consequences in a short passage",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            text: "Tap each card to unlock its definition and example sentence, then test your speed in the Quick Word Lightning Check!",
            highlight: ["pliable", "brittle", "methodical", "gradually"],
            terms: [
              {
                word: "pliable",
                meaning: "Easy to bend and shape without breaking or losing strength.",
                example: "Pounding the pocket with a wooden mallet made the stiff leather pliable.",
              },
              {
                word: "brittle",
                meaning: "Hard but fragile—likely to crack or snap suddenly under stress.",
                example: "Baking leather in a hot oven cooks the fibers and makes the laces brittle.",
              },
              {
                word: "methodical",
                meaning: "Done step by step in a careful, patient, and organized way.",
                example: "Noam's methodical break-in routine shaped the hinges without hurting the hide.",
              },
              {
                word: "gradually",
                meaning: "Happening little by little over time rather than all at once.",
                example: "A pro baseball glove gradually molds to the shape of its owner's hand.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Shortcut That Cracked",
            text: `Two days before opening day, Rami and Noam bought identical full-grain infield gloves. Out of the box, both mitts felt stiff as crab claws. "I know a shortcut," Rami announced. That night he soaked his glove in a bucket of water and baked it in a warm oven for twenty minutes so it would fold right away.\n\nNoam took a methodical approach. He rubbed a pea-sized drop of leather balm into the pocket and spent twenty minutes each evening pounding the heel hinge and pocket with a smooth wooden mallet, wrapping a baseball inside overnight. Gradually, the stiff steerhide grew pliable along the exact crease where his thumb and pinky met.\n\nBy the third inning on Sunday, Rami's oven-baked lace snapped on a grounder—the heat had cooked the collagen fibers until they turned brittle. Meanwhile, Noam's glove snapped shut with a crisp pop, holding a deep pocket that fit his hand like a custom mold.`,
            highlight: ["methodical", "Gradually", "pliable", "brittle"],
          },
        ],
        form1: {
          c1: {
            objective: "vocab-brittle-vs-pliable",
            prompt:
              "In “The Shortcut That Cracked,” how are the words pliable and brittle related?",
            correct:
              "They are opposites: pliable means flexible without breaking, while brittle means fragile and likely to snap.",
            wrong: [
              "They mean the exact same thing.",
              "Both words describe the color of grass.",
              "Pliable means cooked in an oven, and brittle means rubbed with balm.",
            ],
            explanation:
              "Noam's glove became pliable (flexible and strong), whereas Rami's oven-baked laces turned brittle (fragile and snapping).",
          },
          o1: {
            objective: "reading-shortcut-contrast",
            prompt:
              "In “The Shortcut That Cracked,” compare what Rami did to his glove with Noam's methodical routine, and explain why their gloves performed differently on Sunday.",
            exemplar:
              "Rami soaked his glove in water and baked it in an oven, which cooked the collagen fibers and made his lace brittle so it snapped on a grounder. Noam used a pea-sized drop of balm and pounded the pocket and hinge with a wooden mallet, gradually making the leather pliable while keeping its strength.",
            rubric: [
              "Describes Rami's water-and-oven shortcut",
              "Describes Noam's methodical mallet-and-balm routine",
              "Explains that heat cooked Rami's fibers into brittle leather that snapped",
              "Explains that Noam's glove became pliable at the hinges and held a deep pocket",
            ],
            explanation:
              "The two identical gloves served as a fair comparison: heat damaged the collagen in Rami's mitt, while mechanical mallet work trained Noam's mitt.",
          },
          m1: {
            objective: "vocab-match-day4",
            prompt: "Connect each word from today's story to its meaning.",
            matches: [
              { left: "Pliable", right: "Flexible and easy to bend without breaking" },
              { left: "Brittle", right: "Fragile and likely to crack or snap" },
              { left: "Methodical", right: "Careful, patient, and step-by-step" },
              { left: "Gradually", right: "Little by little over time" },
            ],
            explanation:
              "Pliable is flexible; brittle is easily cracked; methodical is step-by-step; gradually is little by little.",
          },
          c2: {
            objective: "reading-shortcut-control",
            prompt:
              "Why is it important in paragraph 1 of “The Shortcut That Cracked” that Rami and Noam started with identical full-grain infield gloves?",
            correct:
              "Because starting with identical gloves proves that the break-in method—not a different brand—caused the different results.",
            wrong: [
              "Because baseball stores only sell one size of glove.",
              "Because identical gloves cannot be broken in.",
              "Because Rami and Noam shared the same locker.",
            ],
            explanation:
              "Starting with the same glove model holds the material constant, so the Sunday outcome reflects how each boy treated the leather.",
          },
          o2: {
            objective: "reading-shortcut-theme",
            prompt:
              "Why did Noam pound only the 'heel hinge and pocket' instead of softening every single inch of the glove equally? Explain using how a baseball glove works.",
            exemplar:
              "A glove needs pliable hinges at the heel and a deep bowl in the pocket so it can fold shut around the ball, but the fingertips still need to stay firm so a hard grounder doesn't bend them backward!",
            rubric: [
              "Identifies that the heel hinge and pocket need to flex/fold",
              "Explains that the fingers/shell still need firmness for support",
              "Contrasts targeted mallet shaping with baking/soaking the whole glove",
              "Shows clear understanding of selective flexibility",
            ],
            explanation:
              "Baking or soaking softens the entire glove into a floppy pancake, whereas a mallet targets only the pocket and hinge lines.",
          },
        },
        form2: {
          c1: {
            objective: "vocab-brittle-vs-pliable",
            prompt:
              "In paragraph 2 of “The Shortcut That Cracked,” what shows that Noam's approach was methodical?",
            correct:
              "He used a measured pea-sized drop of balm, pounded specific hinge spots each evening, and wrapped a ball inside overnight.",
            wrong: [
              "He threw the glove in a hot oven for twenty minutes.",
              "He left the glove in the rain and forgot about it.",
              "He cut the laces off with scissors before the game.",
            ],
            explanation:
              "Methodical means careful, organized, and step-by-step—shown by Noam's consistent evening routine.",
          },
          o1: {
            objective: "reading-shortcut-contrast",
            prompt:
              "Why did Rami's shortcut in “The Shortcut That Cracked” seem like it worked on Friday night, yet fail by the third inning on Sunday?",
            exemplar:
              "Soaking and baking made the glove fold right away on Friday night, which fooled Rami into thinking it worked. However, the oven heat secretly cooked and shrank the collagen fibers, leaving the laces brittle so they snapped as soon as a real grounder hit them on Sunday.",
            rubric: [
              "Explains why Rami thought it worked at first (folded right away)",
              "Identifies the hidden damage caused by oven heat to collagen fibers",
              "Uses or explains the concept of brittle fibers snapping under stress",
              "Contrasts short-term folding with real game durability",
            ],
            explanation:
              "Heat denatures protein fibers—making leather feel temporarily soft while permanently destroying its tensile strength.",
          },
          m1: {
            objective: "vocab-match-day4",
            prompt: "Connect each word from today's story to its meaning.",
            matches: [
              { left: "Pliable", right: "Flexible and easy to bend without breaking" },
              { left: "Brittle", right: "Fragile and likely to crack or snap" },
              { left: "Methodical", right: "Careful, patient, and step-by-step" },
              { left: "Gradually", right: "Little by little over time" },
            ],
            explanation:
              "Pliable is flexible; brittle is easily cracked; methodical is step-by-step; gradually is little by little.",
          },
          c2: {
            objective: "reading-shortcut-control",
            prompt:
              "What happened to Rami's laces when he baked his wet glove in the oven in “The Shortcut That Cracked”?",
            correct: "The heat cooked the collagen fibers until they turned brittle and snapped.",
            wrong: [
              "The laces grew twice as thick and strong.",
              "The laces turned into oak bark.",
              "The heat made the leather waterproof forever.",
            ],
            explanation:
              "Paragraph 3 states that the heat cooked the collagen fibers until they turned brittle.",
          },
          o2: {
            objective: "reading-shortcut-theme",
            prompt:
              "Connect Noam's methodical glove break-in to another skill you know (like practicing baseball, learning Torah, or playing an instrument). Why does building something 'gradually' beat a hasty shortcut?",
            exemplar:
              "Just like pounding a pocket gradually trains the leather fibers to hold their shape without cracking, practicing a parsha or baseball swing a little bit every day builds real muscle memory and understanding that won't fall apart under pressure.",
            rubric: [
              "Explains how Noam's gradual method protected and shaped the leather",
              "Connects the idea to a real skill like sports, Torah, or music",
              "Explains why daily step-by-step practice lasts longer than a rushed shortcut",
              "Uses clear, thoughtful reasoning",
            ],
            explanation:
              "Both physical materials and human skills build lasting structure through consistent, targeted practice rather than destructive shortcuts.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: Breaking In the Pocket (Fiber Memory)",
        subjects: ["How things work"],
        objectives: [
          "Explain how mechanical pounding and light conditioning create 'fiber memory' in a leather glove",
          "Explain why extreme heat or soaking in water damages collagen cross-links",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "The Science of Break-In: How Leather Learns Your Hand",
            diagram: "glove-breakin-simulator",
            text: `Why does a brand-new pro baseball glove feel stiff, and how does it learn the exact shape of your hand? The secret is Fiber Memory!\n\nInside full-grain steerhide, millions of tanned collagen bundles are locked in a dense 3D mesh. When you pound the pocket and heel hinges with a rounded wooden mallet (or catch hundreds of balls), that mechanical pressure gently stretches and aligns the collagen fibers along the fold lines—while leaving the outer fingers stiff and supportive!\n\nWhy do "shortcuts" ruin a glove? Leather is skin protein! Baking a glove in an oven or microwaving it literally cooks the collagen (shrinking and snapping the fibers so they turn brittle). Dunking a glove in a bucket of water floods the pores; as the water evaporates, it strips away natural oils and leaves the leather heavy, stretched-out, and floppy. A tiny drop of conditioner and patient mallet work is the pro secret!`,
            highlight: ["Fiber Memory", "collagen", "wooden mallet", "brittle"],
            terms: [
              {
                word: "Fiber Memory",
                meaning: "Leather's ability to stretch slightly where flexed and hold that custom 3D shape permanently.",
                example: "Because of fiber memory, a broken-in glove fits its owner's hand like a fingerprint.",
              },
              {
                word: "Hinge Points",
                meaning: "The specific fold lines at the heel of the glove where the thumb and pinky close together.",
                example: "Softening only the hinge points lets the glove snap shut while keeping the fingers strong.",
              },
              {
                word: "Over-Oiling / Waterlogging",
                meaning: "Clogging leather pores with too much liquid, which makes a glove heavy and mushy.",
                example: "A pea-sized dab of balm nourishes leather; a whole bottle of oil weighs it down.",
              },
            ],
            sources: [
              {
                label: "Rawlings & Wilson Pro Glove Care Principles",
                url: "https://www.wilson.com/en-us/blog/baseball/how-to-break-in-a-baseball-glove",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "breakin-fiber-memory",
            prompt:
              "What is 'Fiber Memory' in a full-grain leather baseball glove?",
            correct:
              "The ability of collagen fibers to stretch along flexed hinge lines and permanently hold the custom shape of your hand and pocket.",
            wrong: [
              "A computer chip sewn inside the wrist strap.",
              "The way wet rawhide shrinks into a flat board.",
              "When oven heat melts the laces together.",
            ],
            explanation:
              "As you pound the pocket and flex the hinges, the collagen network aligns to your hand's movement and retains that 3D shape.",
          },
          o1: {
            objective: "breakin-heat-water-danger",
            prompt:
              "Using the Break-In Lab simulator, explain why BOTH baking a glove in an oven AND soaking it in a bucket of water are bad ideas, even though they hurt the leather in different ways.",
            exemplar:
              "Baking a glove in an oven cooks and shrinks the collagen protein fibers, making the leather and laces brittle so they crack. Soaking a glove in a bucket of water floods the pores and washes out natural oils as it dries, leaving the glove waterlogged at first and then floppy or stiff.",
            rubric: [
              "Explains how oven heat damages leather (cooks/shrinks collagen, makes it brittle)",
              "Explains how soaking in water damages leather (floods pores, strips oils, makes it heavy/floppy)",
              "Contrasts both bad shortcuts with targeted mallet work and light balm",
              "Uses accurate materials-science reasoning",
            ],
            explanation:
              "Heat destroys collagen protein bonds (making leather brittle), while water saturation displaces natural oils and stretches the fiber weave.",
          },
          m1: {
            objective: "breakin-methods-match",
            prompt: "Connect each break-in action to its effect on the glove's leather.",
            matches: [
              { left: "Wooden Mallet on Pocket", right: "Stretches collagen hinges where needed while keeping fingers firm" },
              { left: "Pea-Sized Leather Balm", right: "Replenishes natural oils without clogging pores" },
              { left: "Hot Oven Baking", right: "Cooks collagen proteins and makes laces brittle" },
              { left: "Bucket of Water Soak", right: "Floods pores and leaves the glove heavy and stretched out" },
            ],
            explanation:
              "Mallet shapes hinges/pocket; light balm nourishes fibers; oven heat cooks collagen brittle; water soaking floods pores and ruins shape.",
          },
          c2: {
            objective: "breakin-over-oiling",
            prompt:
              "Why should a player use only a tiny dab of leather conditioner instead of pouring half a bottle of oil over their glove?",
            correct:
              "Too much oil saturates the pores permanently, making the glove heavy, greasy, and mushy.",
            wrong: [
              "Oil makes leather evaporate into thin air.",
              "Conditioner turns full-grain leather into metal.",
              "Oil makes the baseball bounce ten feet higher.",
            ],
            explanation:
              "Unlike water, heavy oil never evaporates—over-oiling adds permanent dead weight and turns crisp steerhide mushy.",
          },
          o2: {
            objective: "breakin-hinge-design",
            prompt:
              "Why do pro players say you should never lend your broken-in gamer glove to a teammate with a much bigger hand for a whole week?",
            exemplar:
              "Because of fiber memory! Your glove's collagen fibers stretched to fit your exact finger positions and hinge points. A bigger hand will stretch the stalls and hinges wider, so the glove will feel loose on your hand afterward.",
            rubric: [
              "References fiber memory or how collagen molds to a specific hand",
              "Explains that a larger hand will stretch the finger stalls or hinge points further",
              "Notes that leather retains that stretched shape rather than snapping back like rubber",
              "Connects the explanation to custom fit on the field",
            ],
            explanation:
              "Leather molds plastically through fiber memory—once stretched wider by a larger hand, it stays wider.",
          },
        },
        form2: {
          c1: {
            objective: "breakin-fiber-memory",
            prompt:
              "Why is pounding a new glove with a rounded wooden mallet (or playing catch) the best way to break it in?",
            correct:
              "It loosens the collagen fibers only in the pocket and hinge lines while keeping the fingertips supportive.",
            wrong: [
              "It cooks the leather at high temperature.",
              "It turns full-grain leather into fuzzy suede.",
              "It removes all the rawhide laces.",
            ],
            explanation:
              "Targeted mechanical impacts flex the exact hinge lines and bowl of the pocket without weakening the finger tips.",
          },
          o1: {
            objective: "breakin-heat-water-danger",
            prompt:
              "A friend says, 'Leather is super tough, so putting my glove in the microwave or oven for a minute will just warm it up like a blanket!' Explain the science of why heat hurts leather differently than fabric.",
            exemplar:
              "Leather is made of natural collagen protein ropes from skin, not plant cotton. Just like meat or egg protein changes permanently when heated, high heat shrinks and cooks collagen fibers so they turn brittle and crack under impact!",
            rubric: [
              "Identifies that leather is made of collagen protein",
              "Explains that heat permanently shrinks or 'cooks' protein fibers",
              "States the consequence: the leather and laces become brittle and crack",
              "Recommends room-temperature mechanical break-in instead",
            ],
            explanation:
              "Collagen denatures and shrinks under high heat, permanently losing its elasticity and tear resistance.",
          },
          m1: {
            objective: "breakin-methods-match",
            prompt: "Connect each break-in action to its effect on the glove's leather.",
            matches: [
              { left: "Wooden Mallet on Pocket", right: "Stretches collagen hinges where needed while keeping fingers firm" },
              { left: "Pea-Sized Leather Balm", right: "Replenishes natural oils without clogging pores" },
              { left: "Hot Oven Baking", right: "Cooks collagen proteins and makes laces brittle" },
              { left: "Bucket of Water Soak", right: "Floods pores and leaves the glove heavy and stretched out" },
            ],
            explanation:
              "Mallet shapes hinges/pocket; light balm nourishes fibers; oven heat cooks collagen brittle; water soaking floods pores and ruins shape.",
          },
          c2: {
            objective: "breakin-over-oiling",
            prompt:
              "What are the 'Hinge Points' on a baseball glove?",
            correct:
              "The fold lines at the heel of the palm where your thumb and pinky close the glove together.",
            wrong: [
              "Metal door hinges screwed onto the wrist.",
              "The red stitches on the baseball.",
              "The price tag on the pinky finger.",
            ],
            explanation:
              "Hinge points are the creased fold channels in the heel pad that allow the thumb and fingers to snap shut smoothly.",
          },
          o2: {
            objective: "breakin-hinge-design",
            prompt:
              "If your leather glove gets caught in a sudden rainstorm during a game, how should you dry and care for it when you get home based on what you learned today?",
            exemplar:
              "Never put it in an oven, dryer, or next to a hot radiator because heat will cook and shrink the wet collagen fibers! Instead, wipe off excess water with a towel, put a baseball in the pocket so it holds its shape, let it air-dry slowly at room temperature, and rub in a tiny dab of conditioner once dry.",
            rubric: [
              "Warns against using high heat (oven, dryer, radiator) on wet leather",
              "Advises air-drying slowly at room temperature",
              "Suggests placing a ball in the pocket to preserve its shape while drying",
              "Mentions adding a light dab of conditioner to restore lost oils",
            ],
            explanation:
              "Wet leather is extra sensitive to heat; slow room-temperature drying with a ball in the pocket preserves the collagen structure.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Parshat Noach: The Raven, The Dove & The Olive Leaf",
        subjects: ["Torah"],
        objectives: [
          "Sequence the missions of the Raven and the Dove from the window of the Teivah (Bereishis 8:6–12)",
          "Explain Rashi's teaching on the Dove's bitter olive leaf and the meaning of the Rainbow Covenant (Keshes)",
        ],
        teaching: [
          {
            kind: "torah",
            title: "From the Teivah Window: The Olive Leaf & The Rainbow",
            diagram: "noach-window-timeline",
            text: `As the floodwaters began to subside in Parshat Noach (Bereishis 8:6–17), Noach opened the window of the Teivah to test whether the earth was ready. First, he sent out the Orev (raven), which simply circled back and forth around the Ark.\n\nNext, Noach sent out the Yonah (dove) three times, seven days apart:\n• Flight 1: The water still covered the valleys; finding no resting place for its foot, the tired dove came back, and Noach stretched out his hand to bring it inside.\n• Flight 2 (7 days later): Toward evening, the dove returned holding a freshly plucked olive leaf (aleh zayis) in its beak! Now Noach knew the water had dropped below the treetops. Rashi quotes Chazal's famous insight: why did the dove choose a bitter olive leaf? It was saying to Hashem, "Master of the Universe, may my food be as bitter as an olive directly from Your hand, rather than as sweet as honey from the hand of flesh and blood!"\n• Flight 3 (7 days later): The dove did not return, showing the earth was habitable. When Noach exited the Teivah, Hashem placed the Keshes (Rainbow) in the clouds as an everlasting covenant never again to bring a Flood to destroy the world.`,
            highlight: ["Orev", "Yonah", "olive leaf", "Rashi", "Keshes"],
            terms: [
              {
                word: "Yonah (יוֹנָה)",
                meaning: "The dove sent out three times by Noach to check whether dry land had appeared.",
                example: "The Yonah returned on its second flight carrying a fresh olive leaf.",
              },
              {
                word: "Aleh Zayis (עֲלֵה זַיִת)",
                meaning: "A freshly plucked olive leaf—bitter to taste, yet yielding pure oil for light.",
                example: "The aleh zayis in the dove's beak taught reliance on Hashem for our parnassah (sustenance).",
              },
              {
                word: "Keshes (קֶשֶׁת)",
                meaning: "The rainbow placed by Hashem in the clouds as a sign of the covenant with all living creatures.",
                example: "When we see a Keshes in the sky, we recite a special beracha thanking Hashem for remembering His covenant.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Bereishis 8:7–11 with Rashi",
                url: "https://www.sefaria.org/Genesis.8.11?lang=bi&with=Rashi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "torah-dove-olive-leaf",
            prompt:
              "On which flight did the Yonah (dove) return to Noach holding a freshly plucked olive leaf (aleh zayis) in its beak?",
            correct: "On the dove's second flight, toward evening.",
            wrong: [
              "Before the Flood even started.",
              "On the raven's first flight.",
              "Ten years after Noach left the Teivah.",
            ],
            explanation:
              "On the first flight the dove found no resting place; seven days later on the second flight, it returned at evening with a plucked olive leaf.",
          },
          o1: {
            objective: "torah-rashi-olive-message",
            prompt:
              "According to Rashi (Bereishis 8:11), what message was the dove expressing by choosing a bitter olive leaf, and what does that teach us?",
            exemplar:
              "Rashi explains the dove was saying to Hashem: 'May my food be as bitter as an olive directly from Your hand, rather than sweet as honey when dependent on flesh and blood (humans).' It teaches us to trust Hashem directly for our sustenance and appreciate hard-earned honesty over handouts.",
            rubric: [
              "Cites Rashi's explanation of the bitter olive vs. sweet honey",
              "Contrasts receiving directly from Hashem's hand with depending on flesh and blood",
              "Explains the lesson of Bitachon (trust in Hashem) or dignity",
              "Expresses the teaching clearly",
            ],
            explanation:
              "In the Teivah the dove was fed by Noach (flesh and blood); by plucking a bitter olive leaf in the wild, it showed preference for relying directly on Hashem.",
          },
          m1: {
            objective: "torah-noach-birds-match",
            prompt: "Connect each stage after the storm in Parshat Noach to what happened.",
            matches: [
              { left: "The Raven (Orev)", right: "Circled back and forth around the Teivah" },
              { left: "Dove's 1st Flight", right: "Found no resting place and returned to Noach's hand" },
              { left: "Dove's 2nd Flight", right: "Returned at evening with a plucked olive leaf" },
              { left: "The Rainbow (Keshes)", right: "Sign of Hashem's covenant never to flood the earth again" },
            ],
            explanation:
              "The raven circled; Dove Flight 1 found no rest; Dove Flight 2 brought the olive leaf; the Keshes sealed the covenant.",
          },
          c2: {
            objective: "torah-noach-exit-wait",
            prompt:
              "Even after the dove didn't return on its third flight and Noach saw the ground was dry, why didn't Noach walk out of the Teivah right away?",
            correct:
              "He waited until Hashem explicitly commanded him, 'Go out from the Teivah.'",
            wrong: [
              "He lost the key to the door.",
              "He wanted to stay inside for another fifty years.",
              "The raven blocked the doorway.",
            ],
            explanation:
              "Just as Noach entered the Teivah by Hashem's command, he waited patiently for Hashem's direct instruction (Bereishis 8:16) before leaving.",
          },
          o2: {
            objective: "torah-rainbow-covenant",
            prompt:
              "Why is a rainbow (Keshes)—which is shaped like an archer's bow—a symbol of peace and Hashem's covenant after the Flood?",
            exemplar:
              "Normally a warrior points a bow toward a target when fighting, but a rainbow in the sky has its curved top pointing upward and its string side facing the earth—like a bow hung up with its arrows put away! It shows Hashem's promise of peace never to destroy the world by flood again.",
            rubric: [
              "Notes that Keshes means an archer's bow as well as a rainbow",
              "Explains that the bow in the clouds is turned away/hung up rather than aimed at earth",
              "Connects the sign to Hashem's promise never to destroy the world by Flood again",
              "Gives a thoughtful explanation of the symbol",
            ],
            explanation:
              "Commentators (Ramban and others) explain that an inverted bow with no string aimed downward is the universal sign of peace and covenant.",
          },
        },
        form2: {
          c1: {
            objective: "torah-dove-olive-leaf",
            prompt:
              "How many days did Noach wait between the dove's first flight and sending it out a second time?",
            correct: "Seven days.",
            wrong: [
              "One hundred and twenty years.",
              "Forty minutes.",
              "Three hundred days.",
            ],
            explanation:
              "Bereishis 8:10 states that Noach waited another seven days before sending the dove out again from the Teivah.",
          },
          o1: {
            objective: "torah-rashi-olive-message",
            prompt:
              "An olive is bitter when you bite it raw off the branch, yet crushed olives produce pure olive oil that lights the Menorah! How does the olive leaf in Parshat Noach connect to bringing light after darkness?",
            exemplar:
              "After months of dark storm clouds in the Flood, the dove brought back an olive leaf—the very fruit whose oil lights the Menorah and brings illumination to the world. Even when a challenge starts out bitter like a raw olive, trusting Hashem brings bright light and renewal.",
            rubric: [
              "Notes that raw olives are bitter while olive oil brings pure light",
              "Connects the olive leaf to the end of the dark Flood",
              "Explains the lesson that challenges/effort can yield light and growth",
              "Writes a clear, meaningful reflection",
            ],
            explanation:
              "Midrashim note both lessons of the olive: trusting Hashem for sustenance (Rashi) and bringing light to the world after the darkness of the Flood.",
          },
          m1: {
            objective: "torah-noach-birds-match",
            prompt: "Connect each stage after the storm in Parshat Noach to what happened.",
            matches: [
              { left: "The Raven (Orev)", right: "Circled back and forth around the Teivah" },
              { left: "Dove's 1st Flight", right: "Found no resting place and returned to Noach's hand" },
              { left: "Dove's 2nd Flight", right: "Returned at evening with a plucked olive leaf" },
              { left: "The Rainbow (Keshes)", right: "Sign of Hashem's covenant never to flood the earth again" },
            ],
            explanation:
              "The raven circled; Dove Flight 1 found no rest; Dove Flight 2 brought the olive leaf; the Keshes sealed the covenant.",
          },
          c2: {
            objective: "torah-noach-exit-wait",
            prompt:
              "What did the freshly plucked olive leaf prove to Noach physically about the floodwaters?",
            correct:
              "That the floodwaters had dropped below the treetops so branches were above water.",
            wrong: [
              "That the water was still fifteen amos above the highest mountains.",
              "That olive trees grow at the bottom of the ocean.",
              "That winter snow had frozen the Ark.",
            ],
            explanation:
              "Bereishis 8:11 says, 'And Noach knew that the waters had subsided from upon the earth'—because the dove could pluck a leaf from a tree branch above water.",
          },
          o2: {
            objective: "torah-rainbow-covenant",
            prompt:
              "In Bereishis 8:9, when the tired dove came back from its first flight, the Torah takes a whole extra phrase to tell us: 'And Noach stretched out his hand, took her, and brought her in to him into the Teivah.' What middah (character trait) do we see in that small detail?",
            exemplar:
              "We see Noach's gentle sensitivity and Hakaras HaTov (gratitude/compassion). The dove was exhausted from flying over water with nowhere to land, so Noach didn't just wait for it to hop through the window—he personally reached out his hand to help it safely inside.",
            rubric: [
              "Identifies the detail of Noach reaching out his hand to help the tired dove",
              "Names compassion, kindness (Chessed), or sensitivity to animals",
              "Explains why the dove needed help (exhausted with no resting place)",
              "Connects the detail to how the Torah highlights small acts of care",
            ],
            explanation:
              "Every word in the Torah teaches us conduct: Noach personally reached out his hand to comfort and lift in the tired dove.",
          },
        },
      },
    ],
  },
];
