import type { DayBlueprint } from "./v4-types";

export const TOBI_DAYS_3_AND_4: DayBlueprint[] = [
  // =========================================================================
  // DAY 3 · HONEYBEE HEXAGON HONEYCOMBS & WELCOMING THE SHABBOS QUEEN
  // =========================================================================
  {
    order: 3,
    title: "Day 3 · Why Honeybees Build Hexagons & Welcoming Shabbos",
    readingPassage: {
      title: "The Six-Sided Secret of the Beehive",
      text: `Seven-year-old Maya peeked through the glass window of Grandpa's observation beehive. Thousands of fuzzy worker bees were busy building tiny golden rooms out of beeswax. Maya counted the walls around one little room: one, two, three, four, five, six! Every single cell was a six-sided hexagon.

"Why don't the bees build round cups like my drinking glass?" Maya asked. Grandpa handed her six round pennies and asked her to push them together on the table. Even when the pennies touched, Maya saw empty star-shaped gaps in between where nothing could fit!

Next, Grandpa gave her six-sided hexagon tiles. When Maya pushed them together, every flat wall touched its neighbor with zero wasted space! "Making wax takes lots of energy," Grandpa said. "Hexagons let bees share every wall and store the most sweet nectar with the least wax!"`,
      words: [
        {
          word: "nectar",
          meaning: "Sweet liquid inside blooming flowers that bees collect to make honey.",
          example: "A honeybee sips sweet nectar from flowers using her straw-like tongue.",
        },
        {
          word: "hexagon",
          meaning: "A flat shape with six straight sides and six corners.",
          example: "Every wax room in a honeycomb is shaped like a six-sided hexagon.",
        },
        {
          word: "hollow",
          meaning: "Having an empty space inside, like a cup, tube, or bowl.",
          example: "Each hollow wax cell holds a drop of golden honey.",
        },
        {
          word: "precious",
          meaning: "Very special, valuable, and not to be wasted.",
          example: "Beeswax is precious to the hive, so bees don't waste a single speck!",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Story: The Six-Sided Secret of the Beehive",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use nectar, hexagon, hollow, and precious accurately in context",
          "Explain why round circles leave wasted gaps while six-sided hexagons share every wall",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            diagram: "tobi-honeycomb-wax-lab",
            text: "Tap each card to unlock its meaning and example sentence, then play the Word Lightning Check!",
            highlight: ["nectar", "hexagon", "hollow", "precious"],
            terms: [
              {
                word: "nectar",
                meaning: "Sweet liquid inside blooming flowers that bees collect to make honey.",
                example: "A honeybee sips sweet nectar from flowers using her straw-like tongue.",
              },
              {
                word: "hexagon",
                meaning: "A flat shape with six straight sides and six corners.",
                example: "Every wax room in a honeycomb is shaped like a six-sided hexagon.",
              },
              {
                word: "hollow",
                meaning: "Having an empty space inside, like a cup, tube, or bowl.",
                example: "Each hollow wax cell holds a drop of golden honey.",
              },
              {
                word: "precious",
                meaning: "Very special, valuable, and not to be wasted.",
                example: "Beeswax is precious to the hive, so bees don't waste a single speck!",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Six-Sided Secret of the Beehive",
            diagram: "tobi-honeycomb-wax-lab",
            text: `Seven-year-old Maya peeked through the glass window of Grandpa's observation beehive. Thousands of fuzzy worker bees were busy building tiny golden rooms out of beeswax. Maya counted the walls around one little room: one, two, three, four, five, six! Every single cell was a six-sided hexagon.\n\n"Why don't the bees build round cups like my drinking glass?" Maya asked. Grandpa handed her six round pennies and asked her to push them together on the table. Even when the pennies touched, Maya saw empty star-shaped gaps in between where nothing could fit!\n\nNext, Grandpa gave her six-sided hexagon tiles. When Maya pushed them together, every flat wall touched its neighbor with zero wasted space! "Making wax takes lots of energy," Grandpa said. "Hexagons let bees share every wall and store the most sweet nectar with the least wax!"`,
            highlight: ["hexagon", "gaps", "nectar", "wax"],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-day3-vocab-hexagon",
            prompt:
              "In “The Six-Sided Secret of the Beehive,” how many sides does a hexagon have?",
            correct: "Six sides",
            wrong: [
              "Three sides",
              "Four sides",
              "Ten sides",
            ],
            explanation:
              "Maya counts the walls around one honeycomb cell: one, two, three, four, five, six! A six-sided shape is a hexagon.",
          },
          o1: {
            objective: "tobi-day3-reading-pennies",
            prompt:
              "What did Maya see when she pushed the six round pennies together on the table, and how were the hexagon tiles different?",
            exemplar:
              "When Maya pushed the round pennies together, she saw empty gaps in between them. When she pushed the six-sided hexagon tiles together, every wall touched its neighbor with zero wasted space!",
            rubric: [
              "Mentions the empty gaps between the round pennies",
              "Says the hexagon tiles fit together with no gaps or wasted space",
              "Explains that flat neighbor walls touch and share walls",
              "Uses one or two clear sentences",
            ],
            explanation:
              "Round circles leave wasted gaps between them, whereas six-sided hexagons fit together seamlessly.",
          },
          m1: {
            objective: "tobi-day3-vocab-match",
            prompt: "Match each word from the story to its meaning.",
            matches: [
              { left: "Nectar", right: "Sweet flower liquid that bees turn into honey" },
              { left: "Hexagon", right: "A shape with six straight sides" },
              { left: "Hollow", right: "Having an empty space inside like a cup" },
              { left: "Precious", right: "Very valuable and not to be wasted" },
            ],
            explanation:
              "Nectar is sweet flower juice; a hexagon has 6 sides; hollow means empty inside; precious means very valuable.",
          },
          c2: {
            objective: "tobi-day3-reading-wax-reason",
            prompt:
              "Why is it so important for honeybees not to waste beeswax when building their hive?",
            correct: "Because making beeswax takes a lot of hard work and energy for the bees.",
            wrong: [
              "Because beeswax is made of heavy rocks from the river.",
              "Because bees have to buy wax at the grocery store.",
              "Because wax melts if a bee looks at it.",
            ],
            explanation:
              "Grandpa explains that making wax takes lots of energy—so sharing walls with six-sided hexagons saves precious wax!",
          },
          o2: {
            objective: "tobi-day3-creative-apply",
            prompt:
              "If you were packing snack boxes into a big picnic basket and didn't want any wasted space between them, would you use round jars or six-sided / square boxes? Explain why using what Maya discovered!",
            exemplar:
              "I would use six-sided or square boxes! Round jars leave empty gaps between them just like the pennies, while flat-sided boxes fit snugly right against each other.",
            rubric: [
              "Chooses six-sided or square boxes over round jars",
              "Explains that round jars leave empty gaps in between",
              "Explains that flat sides fit snugly together without wasting space",
              "Connects to Maya's test with the pennies and tiles",
            ],
            explanation:
              "Flat walls that tessellate (like hexagons or squares) pack together with zero wasted gaps!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-day3-vocab-hexagon",
            prompt:
              "What is the sweet liquid inside flowers that honeybees collect to make honey?",
            correct: "Nectar",
            wrong: [
              "Saltwater",
              "Olive oil",
              "Maple bark",
            ],
            explanation:
              "Bees sip sweet nectar from flowers and fan their wings to turn it into thick golden honey.",
          },
          o1: {
            objective: "tobi-day3-reading-pennies",
            prompt:
              "How did Grandpa's test with the pennies and tiles answer Maya's question about why bees don't build round cups?",
            exemplar:
              "The pennies showed Maya that round cups leave wasted gaps in between. The hexagon tiles fit together with zero gaps so two cells can share every wall and save wax!",
            rubric: [
              "Explains what the round pennies showed (wasted gaps)",
              "Explains what the hexagon tiles showed (no gaps / shared walls)",
              "Connects this to saving beeswax and holding more honey",
              "Uses clear everyday words",
            ],
            explanation:
              "Seeing the gaps between round pennies makes it clear why bees build six-sided hexagons that share every wall.",
          },
          m1: {
            objective: "tobi-day3-vocab-match",
            prompt: "Match each word from the story to its meaning.",
            matches: [
              { left: "Nectar", right: "Sweet flower liquid that bees turn into honey" },
              { left: "Hexagon", right: "A shape with six straight sides" },
              { left: "Hollow", right: "Having an empty space inside like a cup" },
              { left: "Precious", right: "Very valuable and not to be wasted" },
            ],
            explanation:
              "Nectar is sweet flower juice; a hexagon has 6 sides; hollow means empty inside; precious means very valuable.",
          },
          c2: {
            objective: "tobi-day3-reading-wax-reason",
            prompt:
              "When two hexagon cells sit side by side in a honeycomb, how many wax walls do they need between them?",
            correct: "Just one shared wall between the two neighbor cells!",
            wrong: [
              "Ten separate walls with a hallway in between.",
              "No walls at all.",
              "A round metal fence.",
            ],
            explanation:
              "Because hexagons have flat sides that match up, one wax wall serves two neighbor rooms at the same time!",
          },
          o2: {
            objective: "tobi-day3-creative-apply",
            prompt:
              "Why do we call beeswax 'precious' in the beehive? Tell how the bees use their hexagon shape to save it!",
            exemplar:
              "Beeswax is precious because bees have to work super hard to make tiny flakes of wax. By building six-sided hexagons that share walls with zero gaps, they use the least wax to hold the most honey!",
            rubric: [
              "Explains why wax is precious (takes hard work/energy to make)",
              "Mentions the six-sided hexagon shape",
              "Explains that hexagons share walls or leave zero gaps",
              "Connects this to holding the most honey with the least wax",
            ],
            explanation:
              "Hexagonal geometry is nature's smartest way to build strong storage rooms using the smallest amount of building material.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: From Flower Nectar to Capped Golden Honey",
        subjects: ["How things work"],
        objectives: [
          "Describe how honeybees collect nectar, mold wax flakes, and fan their wings to evaporate water",
          "Explain why bees seal finished honey cells with a waterproof wax cap",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Inside the Hive Factory: How Bees Make Wax & Honey",
            diagram: "tobi-honeycomb-wax-lab",
            text: `How do honeybees turn watery flower juice into thick golden honey? First, a forager bee uses her straw-like tongue (proboscis) to sip sweet nectar from blossoms and carries it home in her special honey stomach. Meanwhile, builder bees make tiny white flakes of beeswax from the underside of their bellies, chew the wax soft, and mold it into six-sided hexagon rooms!\n\nWhen the nectar is poured into a hexagon cell, it is still 80% water—too runny to keep! So thousands of bees line up and fan their wings like miniature electric fans. The breeze evaporates the extra water until thick, golden honey is left. Finally, the bees seal the top of the cell with a fresh beeswax cap, just like putting a lid on a jar!`,
            highlight: ["nectar", "beeswax", "fan their wings", "evaporates", "wax cap"],
            terms: [
              {
                word: "Proboscis (Nectar Straw)",
                meaning: "A bee's long tongue that works like a drinking straw to sip nectar from flowers.",
                example: "The bee unrolled her proboscis to sip sweet nectar from the clover flower.",
              },
              {
                word: "Wing Fanning",
                meaning: "Bees buzzing their wings together to blow warm air across runny nectar so water evaporates.",
                example: "Wing fanning thickens watery flower nectar into rich golden honey.",
              },
              {
                word: "Wax Cap (The Lid)",
                meaning: "A flat waterproof seal of beeswax that bees put over a full honey cell to keep it fresh.",
                example: "Once the honey is thick enough, the bees close the cell with a clean wax cap.",
              },
            ],
            sources: [
              {
                label: "National Geographic Kids · Honeybee Facts",
                url: "https://kids.nationalgeographic.com/animals/invertebrates/facts/honeybee",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-bee-wing-fanning",
            prompt:
              "Why do thousands of honeybees fan their wings inside the hive after pouring nectar into the wax cells?",
            correct: "To blow air across the runny nectar so extra water evaporates and it thickens into honey.",
            wrong: [
              "To make the whole beehive fly into the clouds.",
              "To blow snow onto the flowers.",
              "To play a loud drum solo.",
            ],
            explanation:
              "Fresh flower nectar is mostly water; fanning wings creates a warm breeze that evaporates the water until thick honey remains.",
          },
          o1: {
            objective: "tobi-bee-wax-cap-why",
            prompt:
              "Why do honeybees put a flat beeswax cap over each hexagon cell once the honey inside is thick and ready?",
            exemplar:
              "The wax cap works like a waterproof lid on a jar! It keeps the honey clean, stops it from spilling out, and keeps damp air from making it watery again.",
            rubric: [
              "Compares the wax cap to a lid or cover on a jar",
              "Explains that it keeps the honey safe, clean, or inside the cell",
              "Mentions keeping moisture/water out or keeping honey fresh for winter",
              "Uses clear, simple sentences",
            ],
            explanation:
              "A waterproof beeswax cap seals the finished honey so it stays fresh and thick for the hive all winter long.",
          },
          m1: {
            objective: "tobi-bee-jobs-match",
            prompt: "Connect each bee tool or action to its job in making honey.",
            matches: [
              { left: "Straw Tongue (Proboscis)", right: "Sips sweet liquid nectar from flowers" },
              { left: "Chewed Wax Flakes", right: "Molded into 6-sided hexagon walls" },
              { left: "Fanning Wings", right: "Dries runny nectar into thick golden honey" },
              { left: "Beeswax Cap", right: "Seals the full honey cell like a jar lid" },
            ],
            explanation:
              "The proboscis sips nectar; wax flakes build hexagons; fanning wings evaporates water; the wax cap seals the honey.",
          },
          c2: {
            objective: "tobi-bee-wax-source",
            prompt:
              "Where do honeybees get the beeswax they use to build their six-sided honeycomb walls?",
            correct: "Their own bodies make tiny white wax flakes that they chew soft and mold!",
            wrong: [
              "They dig yellow candles out of the dirt.",
              "They gather melted crayons from schoolrooms.",
              "They chop bark off oak trees.",
            ],
            explanation:
              "Worker bees produce tiny wax scales from special glands on their underside and chew them into moldable building wax.",
          },
          o2: {
            objective: "tobi-bee-step-by-step",
            prompt:
              "Tell the three steps of how a drop of flower juice becomes a sealed cell of honey inside the hive!",
            exemplar:
              "First, a bee sips sweet nectar from a flower and puts it into a six-sided wax cell. Second, bees fan their wings to evaporate the water until it turns into thick honey. Third, they seal the top with a waterproof wax cap!",
            rubric: [
              "Mentions sipping nectar from a flower and placing it in a wax cell",
              "Mentions fanning wings to dry/thicken the nectar into honey",
              "Mentions sealing the cell with a wax cap/lid",
              "Presents the steps clearly",
            ],
            explanation:
              "Sipping nectar, fanning away water, and capping with wax is the beehive's three-step honey recipe!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-bee-wing-fanning",
            prompt:
              "What is fresh flower nectar like BEFORE the bees fan their wings over it?",
            correct: "It is runny and watery, like thin flower juice.",
            wrong: [
              "It is hard as a rock.",
              "It is already frozen solid.",
              "It is dry powder.",
            ],
            explanation:
              "Flower nectar starts out about 80% water—wing fanning evaporates most of the water to make thick honey!",
          },
          o1: {
            objective: "tobi-bee-wax-cap-why",
            prompt:
              "What would happen if bees put a wax cap over the cell right away BEFORE fanning their wings to dry the nectar?",
            exemplar:
              "The extra water would be trapped inside! Instead of thick golden honey, the cell would just hold runny, watery juice that could spoil.",
            rubric: [
              "Explains that the water would stay trapped inside the cell",
              "Says the liquid would stay runny/watery instead of becoming thick honey",
              "Mentions that watery nectar can spoil or ferment",
              "Uses clear cause-and-effect thinking",
            ],
            explanation:
              "Bees never cap a cell until their wing-fanning has evaporated the extra water!",
          },
          m1: {
            objective: "tobi-bee-jobs-match",
            prompt: "Connect each bee tool or action to its job in making honey.",
            matches: [
              { left: "Straw Tongue (Proboscis)", right: "Sips sweet liquid nectar from flowers" },
              { left: "Chewed Wax Flakes", right: "Molded into 6-sided hexagon walls" },
              { left: "Fanning Wings", right: "Dries runny nectar into thick golden honey" },
              { left: "Beeswax Cap", right: "Seals the full honey cell like a jar lid" },
            ],
            explanation:
              "The proboscis sips nectar; wax flakes build hexagons; fanning wings evaporates water; the wax cap seals the honey.",
          },
          c2: {
            objective: "tobi-bee-wax-source",
            prompt:
              "What tool on a honeybee's face works just like a flexible drinking straw to reach deep inside flowers?",
            correct: "Her long tongue (proboscis)",
            wrong: [
              "Her fuzzy back legs",
              "Her wax cap",
              "Her six-sided wing",
            ],
            explanation:
              "A bee's proboscis unfolds like a tiny straw to sip sweet nectar from the bottom of flowers.",
          },
          o2: {
            objective: "tobi-bee-step-by-step",
            prompt:
              "Why do bees need THOUSANDS of sisters working together in the hive instead of just one bee working alone?",
            exemplar:
              "One bee alone could only make a tiny drop of honey and a few specks of wax! Thousands of bees working together can visit millions of flowers, build hexagon combs, and fan their wings together to keep the whole hive fed.",
            rubric: [
              "Explains that one bee alone can only make a tiny amount of wax or honey",
              "Mentions the different team jobs (gathering nectar, building wax hexagons, fanning wings)",
              "Shows how teamwork helps the whole hive survive",
              "Uses clear, simple sentences",
            ],
            explanation:
              "A single worker bee makes only about one-twelfth of a teaspoon of honey in her life—teamwork makes the honeycomb possible!",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Halacha in Action: Welcoming the Shabbos Queen (Candles, Kiddush & Two Challot)",
        subjects: ["Halacha"],
        objectives: [
          "Explain why we light at least two Shabbos candles 18 minutes before sunset (Zachor & Shamor, Shalom Bayit)",
          "Explain why we bless HaMotzi over two whole Challot under a cover (Lechem Mishneh)",
        ],
        teaching: [
          {
            kind: "halacha",
            title: "Welcoming the Shabbos Queen: Candles, Kiddush & Lechem Mishneh",
            diagram: "tobi-shabbos-candles-kiddush",
            text: `Every Friday afternoon before the sun goes down (18 minutes before sunset!), we welcome the Shabbos Queen by lighting Shabbos candles (Hadlakat Neirot). Why do we light at least two candles? To honor the two special words in the Ten Commandments: "Zachor" (Remember the Shabbos day) and "Shamor" (Guard the Shabbos day)! The warm candlelight brings Shalom Bayit (peace and harmony in the home) and Oneg Shabbos (Shabbos joy).\n\nAt the Shabbos table, we fill a Kiddush cup to the brim with wine or grape juice to declare Shabbos holy. Right beside the cup sit TWO whole braided Challot under a pretty cover! That mitzvah is called Lechem Mishneh ("double bread"), remembering the miracle in the desert when Hashem sent a double portion of Manna every Friday so nobody had to gather food on Shabbos!`,
            highlight: ["18 minutes", "Zachor", "Shamor", "Shalom Bayit", "Lechem Mishneh"],
            terms: [
              {
                word: "Zachor & Shamor",
                meaning: "“Remember” and “Guard”—the two words for Shabbos represented by lighting two candles.",
                example: "Our two glowing Shabbos candles remind us of Zachor and Shamor.",
              },
              {
                word: "Shalom Bayit (שְׁלוֹם בַּיִת)",
                meaning: "Peace, warmth, and kindness inside the home, lit up by the Shabbos candles.",
                example: "Shabbos candles fill the dining room with light and Shalom Bayit.",
              },
              {
                word: "Lechem Mishneh (לֶחֶם מִשְׁנֶה)",
                meaning: "Holding two whole Challot for HaMotzi on Shabbos in memory of Friday's double portion of Manna.",
                example: "We use two whole loaves for Lechem Mishneh at every Shabbos meal.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Shulchan Aruch Orach Chaim 263 & 274",
                url: "https://www.sefaria.org/Shulchan_Arukh%2C_Orach_Chayim.263.1?lang=bi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-halacha-two-candles",
            prompt:
              "What two special Torah words do our two Shabbos candles remind us of?",
            correct: "Zachor (Remember Shabbos) and Shamor (Guard Shabbos)",
            wrong: [
              "Summer and Winter",
              "North and South",
              "Fast and Slow",
            ],
            explanation:
              "We light at least two candles corresponding to 'Zachor' (Remember) and 'Shamor' (Guard) in the Ten Commandments.",
          },
          o1: {
            objective: "tobi-halacha-lechem-mishneh",
            prompt:
              "Why do we place TWO whole Challot (Lechem Mishneh) on the Shabbos table instead of just one loaf?",
            exemplar:
              "We use two whole Challot to remember the miracle in the desert when Hashem gave a double portion of Manna every Friday for Shabbos!",
            rubric: [
              "Mentions the two whole Challot or Lechem Mishneh",
              "Connects them to the double portion of Manna in the desert",
              "Explains that extra Manna fell on Friday so no one had to gather on Shabbos",
              "Uses clear, simple sentences",
            ],
            explanation:
              "Lechem Mishneh ('double bread') commemorates the double portion of Manna that fell every Friday in the wilderness.",
          },
          m1: {
            objective: "tobi-halacha-shabbos-table-match",
            prompt: "Match each Shabbos table treasure to its special meaning.",
            matches: [
              { left: "Two Shabbos Candles", right: "Zachor (Remember) & Shamor (Guard)" },
              { left: "18 Minutes Before Sunset", right: "When we light candles to welcome Shabbos" },
              { left: "Full Kiddush Cup", right: "Declaring Shabbos holy over grape juice or wine" },
              { left: "Two Whole Challot", right: "Lechem Mishneh for the double portion of Manna" },
            ],
            explanation:
              "Two candles for Zachor & Shamor; lit 18 minutes before sunset; Kiddush cup for sanctifying Shabbos; two Challot for Lechem Mishneh.",
          },
          c2: {
            objective: "tobi-halacha-candle-timing",
            prompt:
              "When do we light the Shabbos candles?",
            correct: "On Friday afternoon before sunset (usually 18 minutes before sunset)!",
            wrong: [
              "Late Friday night after dinner is over.",
              "On Saturday afternoon at lunch.",
              "On Tuesday morning.",
            ],
            explanation:
              "We always light Shabbos candles BEFORE sunset on Friday afternoon to welcome Shabbos before nightfall.",
          },
          o2: {
            objective: "tobi-halacha-challah-cover",
            prompt:
              "Look at the photo of the embroidered Challah cover. Why do we keep the two Challot covered with a special cloth while we say Kiddush over the grape juice?",
            exemplar:
              "The cover remembers the layer of dew that covered the Manna in the desert, and it also shows care for the Challah's 'feelings' while we bless the grape juice first!",
            rubric: [
              "Mentions remembering the dew that covered the Manna OR caring for the Challah's honor/feelings",
              "Explains that we bless the grape juice/wine first during Kiddush",
              "Connects the custom to a middos lesson or the Manna miracle",
              "Uses clear, warm language",
            ],
            explanation:
              "Covering the Challah both recalls the dew over the Manna and teaches us never to embarrass anyone—even a loaf of bread!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-halacha-two-candles",
            prompt:
              "What is the Hebrew name for holding two whole loaves of Challah when making HaMotzi on Shabbos?",
            correct: "Lechem Mishneh",
            wrong: [
              "Borer",
              "Tzohar",
              "Muktzeh",
            ],
            explanation:
              "Lechem Mishneh means 'double bread'—the two whole loaves we hold at every Shabbos meal.",
          },
          o1: {
            objective: "tobi-halacha-lechem-mishneh",
            prompt:
              "How do glowing Shabbos candles bring 'Shalom Bayit' (peace in the home) on Friday night?",
            exemplar:
              "When the candles shine brightly over the table, everyone can see the special food and smiling faces, filling the home with warmth, calm, and peace!",
            rubric: [
              "Mentions the light and warmth of the Shabbos candles",
              "Explains that seeing clearly and sitting in a bright room brings peace and joy",
              "Connects to Shalom Bayit (peace in the home)",
              "Uses one or two clear sentences",
            ],
            explanation:
              "Chazal teach that Shabbos candles create Shalom Bayit because a bright, glowing home brings joy and harmony around the table.",
          },
          m1: {
            objective: "tobi-halacha-shabbos-table-match",
            prompt: "Match each Shabbos table treasure to its special meaning.",
            matches: [
              { left: "Two Shabbos Candles", right: "Zachor (Remember) & Shamor (Guard)" },
              { left: "18 Minutes Before Sunset", right: "When we light candles to welcome Shabbos" },
              { left: "Full Kiddush Cup", right: "Declaring Shabbos holy over grape juice or wine" },
              { left: "Two Whole Challot", right: "Lechem Mishneh for the double portion of Manna" },
            ],
            explanation:
              "Two candles for Zachor & Shamor; lit 18 minutes before sunset; Kiddush cup for sanctifying Shabbos; two Challot for Lechem Mishneh.",
          },
          c2: {
            objective: "tobi-halacha-candle-timing",
            prompt:
              "Can we light a new fire or strike a match AFTER Shabbos has already started at sunset?",
            correct: "No — we always light the Shabbos candles BEFORE sunset, and on Shabbos we do not light fire.",
            wrong: [
              "Yes, we light new matches at midnight.",
              "Yes, we light candles during Saturday lunch.",
              "Only if the candles are blue.",
            ],
            explanation:
              "Lighting fire is forbidden once Shabbos begins, which is why we light our Shabbos candles 18 minutes before sunset!",
          },
          o2: {
            objective: "tobi-halacha-challah-cover",
            prompt:
              "If the Torah cares even about not hurting the 'feelings' of a loaf of Challah by covering it during Kiddush, what does that teach us about how we should speak to our brothers, sisters, and friends?",
            exemplar:
              "If we cover a loaf of bread so it won't feel left out, we should be extra careful to speak kindly and never embarrass a real person who has real feelings!",
            rubric: [
              "Connects covering the Challah to caring about real people's feelings",
              "Mentions speaking kindly or never embarrassing a friend or sibling",
              "Shows understanding of the קל וחומר (how much more so) lesson",
              "Explains warmly in the child's own words",
            ],
            explanation:
              "The Challah cover is a weekly reminder at every Shabbos table to protect the dignity and feelings of every person!",
          },
        },
      },
    ],
  },

  // =========================================================================
  // DAY 4 · INSIDE A GRAND PIANO & NOACH'S RAINBOW PROMISE
  // =========================================================================
  {
    order: 4,
    title: "Day 4 · Inside a Piano's Vibrating Strings & Noach's Rainbow",
    readingPassage: {
      title: "The Little Hammers Inside the Piano",
      text: `Seven-year-old Ari loved pressing the shiny white keys on Aunt Sara's grand piano, but he had a big question: "Where do the musical notes hide?" Aunt Sara propped open the tall wooden lid so Ari could peek inside. Stretched across a golden frame were more than two hundred tight metal strings!

"Watch what happens when you press a key," Aunt Sara said. Ari pressed a key on the right side. A hidden wooden seesaw lever popped a soft white wool-felt hammer up to tap a short, thin string—and then bounced right off so the string could vibrate (wiggle) super fast! A high, bright note rang out like a chirping bird.

Next, Ari pressed a key on the far left. Its felt hammer tapped a long, thick copper-wrapped string. The heavy string wiggled much more slowly, booming a deep, low note like a friendly bear!`,
      words: [
        {
          word: "vibrate",
          meaning: "To wiggle or shake back and forth very fast to make sound.",
          example: "When a guitar or piano string vibrates, it sends sound waves to your ears.",
        },
        {
          word: "lever",
          meaning: "A bar that tilts like a playground seesaw to lift or move something.",
          example: "Pressing a piano key tilts a wooden lever that flings the felt hammer up.",
        },
        {
          word: "muffle",
          meaning: "To quiet or stop a sound by pressing against the vibrating part.",
          example: "If the hammer stayed pressed against the string, it would muffle the note.",
        },
        {
          word: "pitch",
          meaning: "How high (like a bird chirp) or low (like a bear growl) a musical sound is.",
          example: "Short, thin strings make a high pitch, while long, thick strings make a low pitch.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Story: The Little Hammers Inside the Piano",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use vibrate, lever, muffle, and pitch accurately in context",
          "Contrast how short, thin piano strings and long, thick strings vibrate to make high and low notes",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            diagram: "tobi-piano-strings-lab",
            text: "Tap each card to unlock its meaning and example sentence, then play the Word Lightning Check!",
            highlight: ["vibrate", "lever", "muffle", "pitch"],
            terms: [
              {
                word: "vibrate",
                meaning: "To wiggle or shake back and forth very fast to make sound.",
                example: "When a guitar or piano string vibrates, it sends sound waves to your ears.",
              },
              {
                word: "lever",
                meaning: "A bar that tilts like a playground seesaw to lift or move something.",
                example: "Pressing a piano key tilts a wooden lever that flings the felt hammer up.",
              },
              {
                word: "muffle",
                meaning: "To quiet or stop a sound by pressing against the vibrating part.",
                example: "If the hammer stayed pressed against the string, it would muffle the note.",
              },
              {
                word: "pitch",
                meaning: "How high (like a bird chirp) or low (like a bear growl) a musical sound is.",
                example: "Short, thin strings make a high pitch, while long, thick strings make a low pitch.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Little Hammers Inside the Piano",
            diagram: "tobi-piano-strings-lab",
            text: `Seven-year-old Ari loved pressing the shiny white keys on Aunt Sara's grand piano, but he had a big question: "Where do the musical notes hide?" Aunt Sara propped open the tall wooden lid so Ari could peek inside. Stretched across a golden frame were more than two hundred tight metal strings!\n\n"Watch what happens when you press a key," Aunt Sara said. Ari pressed a key on the right side. A hidden wooden seesaw lever popped a soft white wool-felt hammer up to tap a short, thin string—and then bounced right off so the string could vibrate (wiggle) super fast! A high, bright note rang out like a chirping bird.\n\nNext, Ari pressed a key on the far left. Its felt hammer tapped a long, thick copper-wrapped string. The heavy string wiggled much more slowly, booming a deep, low note like a friendly bear!`,
            highlight: ["lever", "hammer", "vibrate", "short, thin", "long, thick"],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-day4-vocab-vibrate",
            prompt:
              "In “The Little Hammers Inside the Piano,” what does it mean when a piano string vibrates?",
            correct: "It wiggles back and forth very fast to make a musical sound.",
            wrong: [
              "It melts into liquid gold.",
              "It goes to sleep under a blanket.",
              "It jumps out of the piano onto the floor.",
            ],
            explanation:
              "Vibrate means to wiggle back and forth rapidly—every musical string makes sound by vibrating!",
          },
          o1: {
            objective: "tobi-day4-reading-strings-contrast",
            prompt:
              "Using paragraphs 2 and 3, explain why the key on the right sounded like a high bird chirp while the key on the left sounded like a low bear boom!",
            exemplar:
              "The key on the right tapped a short, thin string that vibrated super fast to make a high bird note. The key on the left tapped a long, thick copper-wrapped string that wiggled slowly to make a low bear note!",
            rubric: [
              "Describes the right string as short/thin and vibrating fast for a high note",
              "Describes the left string as long/thick and vibrating slowly for a low note",
              "Connects vibration speed to high or low sound",
              "Uses one or two clear sentences",
            ],
            explanation:
              "Short, thin strings vibrate fast (high pitch), while long, thick strings vibrate slowly (low pitch).",
          },
          m1: {
            objective: "tobi-day4-vocab-match",
            prompt: "Match each musical word to its meaning.",
            matches: [
              { left: "Vibrate", right: "Wiggle back and forth fast to make sound" },
              { left: "Lever", right: "Seesaw bar that flings the felt hammer up" },
              { left: "Muffle", right: "Stop or quiet a sound by pressing on the string" },
              { left: "Pitch", right: "How high or low a musical note sounds" },
            ],
            explanation:
              "Vibrate means wiggle fast; a lever tilts like a seesaw; muffle means quiet a vibration; pitch is how high or low a note is.",
          },
          c2: {
            objective: "tobi-day4-hammer-bounce",
            prompt:
              "Why must the soft felt hammer bounce right off the piano string after tapping it?",
            correct: "So the string is free to vibrate and ring out without being muffled!",
            wrong: [
              "Because the string is too hot to touch.",
              "Because the hammer is afraid of the dark.",
              "So the piano lid can close.",
            ],
            explanation:
              "If the hammer stayed pressed against the string, it would stop the string from wiggling and muffle the sound.",
          },
          o2: {
            objective: "tobi-day4-rubberband-apply",
            prompt:
              "Imagine you stretch a thin rubber band and a thick, heavy rubber band across an open tissue box and pluck both. Which one will make a higher pitch, and why?",
            exemplar:
              "The thin rubber band will make a higher pitch because it is lighter and wiggles (vibrates) faster than the thick heavy rubber band!",
            rubric: [
              "Predicts that the thin rubber band makes the higher pitch",
              "Explains that the thin band vibrates or wiggles faster",
              "Connects to the thin vs. thick piano strings in the story",
              "Uses clear everyday words",
            ],
            explanation:
              "Just like piano strings, a thin tight rubber band vibrates faster and makes a higher note than a thick heavy one!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-day4-vocab-vibrate",
            prompt:
              "What pops up inside the piano to tap the metal string when Ari presses a white key?",
            correct: "A soft white wool-felt hammer lifted by a wooden seesaw lever",
            wrong: [
              "A metal wrench",
              "A rubber basketball",
              "A paintbrush dipped in water",
            ],
            explanation:
              "Pressing the key tilts a hidden wooden lever that launches a wool-felt hammer against the string.",
          },
          o1: {
            objective: "tobi-day4-reading-strings-contrast",
            prompt:
              "What would happen to the sound if you held your finger tightly against a piano string while someone pressed the key? Use the word vibrate or muffle!",
            exemplar:
              "Your finger would muffle the sound! Because your finger stops the string from vibrating freely, the note would sound dull and quiet instead of ringing out.",
            rubric: [
              "Uses vibrate or muffle accurately",
              "Explains that the finger stops the string from wiggling",
              "Says the sound becomes quiet, dull, or muffled",
              "Explains clearly in one or two sentences",
            ],
            explanation:
              "Stopping a string's vibration stops the sound waves—that's why the felt hammer must bounce away immediately!",
          },
          m1: {
            objective: "tobi-day4-vocab-match",
            prompt: "Match each musical word to its meaning.",
            matches: [
              { left: "Vibrate", right: "Wiggle back and forth fast to make sound" },
              { left: "Lever", right: "Seesaw bar that flings the felt hammer up" },
              { left: "Muffle", right: "Stop or quiet a sound by pressing on the string" },
              { left: "Pitch", right: "How high or low a musical note sounds" },
            ],
            explanation:
              "Vibrate means wiggle fast; a lever tilts like a seesaw; muffle means quiet a vibration; pitch is how high or low a note is.",
          },
          c2: {
            objective: "tobi-day4-hammer-bounce",
            prompt:
              "Which strings inside a grand piano are wrapped in copper wire to make them heavier and slower-wiggling?",
            correct: "The long bass strings on the left that play deep, low bear notes",
            wrong: [
              "The tiny treble strings on the far right that play high bird notes",
              "The wooden legs of the piano bench",
              "The black keys on the keyboard",
            ],
            explanation:
              "Wrapping bass strings in copper wire adds weight so they vibrate slowly, producing deep bass notes without needing a 20-foot-long piano!",
          },
          o2: {
            objective: "tobi-day4-rubberband-apply",
            prompt:
              "Why are piano hammers covered in soft wool felt instead of being made of bare metal?",
            exemplar:
              "Bare metal hammers would make a harsh, clanking noise when hitting metal strings! Soft wool felt cushions the tap so the string rings with a warm, sweet musical tone.",
            rubric: [
              "Contrasts soft wool felt with hard bare metal",
              "Explains that metal hitting metal would sound harsh or clanky",
              "Says the wool felt makes a warm, smooth, or sweet musical sound",
              "Uses clear, simple sentences",
            ],
            explanation:
              "Compressed wool felt is firm enough to set the string vibrating while soft enough to produce a rich, warm tone.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: Piano Levers, Felt Hammers & Soundboards",
        subjects: ["How things work"],
        objectives: [
          "Trace the chain reaction from pressing a piano key to the lever, felt hammer, vibrating string, and wooden soundboard",
          "Predict whether a string will make a higher or lower pitch based on its length and thickness",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Inside the Grand Piano: The 4-Step Music Machine",
            diagram: "tobi-piano-strings-lab",
            text: `A piano looks like a smooth wooden box on the outside, but inside it is an amazing four-step chain reaction!\n\nStep 1: Your finger presses the front of a key down. Step 2: Like a playground seesaw, the back of the key tilts up and pushes a lever that flings a wool-felt hammer toward the string. Step 3: The hammer taps the tight metal string and bounces right off so the string can vibrate hundreds of times every second! Step 4: Beneath the strings sits a wide sheet of spruce wood called the soundboard. The vibrating strings shake the wooden soundboard, which pushes big waves of music out into the room like a natural loudspeaker!`,
            highlight: ["seesaw", "hammer", "vibrate", "soundboard"],
            terms: [
              {
                word: "Key Lever (Seesaw)",
                meaning: "When you push the front of the piano key down, the back end tilts up to launch the hammer.",
                example: "Every piano key is a balanced wooden seesaw lever.",
              },
              {
                word: "Wool-Felt Hammer",
                meaning: "A rounded wooden mallet wrapped in dense sheep's wool felt that strikes the string and bounces away.",
                example: "Notice how sheep's wool shows up inside a piano too—as the soft felt on every hammer!",
              },
              {
                word: "Wooden Soundboard",
                meaning: "The wide wooden floor under the strings that amplifies tiny string vibrations into loud, rich music.",
                example: "Without the wooden soundboard, a vibrating string by itself would sound as quiet as a whisper.",
              },
            ],
            sources: [
              {
                label: "Smithsonian · How a Piano Works",
                url: "https://www.si.edu/spotlight/pianos",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-piano-soundboard-role",
            prompt:
              "What is the job of the wide wooden soundboard underneath the piano strings?",
            correct: "It vibrates along with the strings to make the music loud and rich enough to fill the room!",
            wrong: [
              "It catches rainwater like an umbrella.",
              "It keeps the strings from ever moving.",
              "It stores extra sheet music and snacks.",
            ],
            explanation:
              "A thin wire vibrating alone moves very little air; the wide wooden soundboard acts like a speaker cone to project the sound!",
          },
          o1: {
            objective: "tobi-piano-chain-reaction",
            prompt:
              "Tell the chain reaction that happens inside a piano from the moment your finger presses a key down to when you hear the note!",
            exemplar:
              "When my finger presses the key down, the seesaw lever tilts up and flings a soft felt hammer to tap the string. The hammer bounces off, and the vibrating string shakes the wooden soundboard to send music to my ears!",
            rubric: [
              "Mentions pressing the key and tilting the seesaw lever",
              "Mentions the felt hammer tapping the string and bouncing off",
              "Mentions the string vibrating",
              "Mentions the soundboard or sound waves reaching the ear",
            ],
            explanation:
              "Key down → lever up → hammer taps & bounces → string & soundboard vibrate!",
          },
          m1: {
            objective: "tobi-piano-parts-match",
            prompt: "Connect each part inside a piano to its job.",
            matches: [
              { left: "Seesaw Key Lever", right: "Tilts up when your finger presses down" },
              { left: "Wool-Felt Hammer", right: "Taps the string and bounces right off" },
              { left: "Short Thin Strings", right: "Vibrate super fast for high bird notes" },
              { left: "Wooden Soundboard", right: "Amplifies the vibration like a big speaker" },
            ],
            explanation:
              "The key lever tilts; the felt hammer taps and bounces; short thin strings make high notes; the soundboard amplifies the sound.",
          },
          c2: {
            objective: "tobi-piano-pitch-rule",
            prompt:
              "If you want a string to play a LOWER note, how should the string be made?",
            correct: "Longer and thicker so it vibrates more slowly",
            wrong: [
              "Shorter and thinner so it vibrates faster",
              "Painted bright yellow",
              "Cut into tiny pieces",
            ],
            explanation:
              "Longer, thicker strings have more mass, so they wiggle back and forth more slowly and produce a lower pitch.",
          },
          o2: {
            objective: "tobi-piano-wool-connection",
            prompt:
              "Remember Day 1 when we learned about sheep's wool? Where does sheep's wool show up inside a grand piano, and why is it the best material for that job?",
            exemplar:
              "Sheep's wool is pressed into thick white felt to cover all the piano hammers! It is firm enough to tap the metal strings, yet soft enough so it makes a sweet musical sound instead of a metal clang.",
            rubric: [
              "Identifies the wool felt on the piano hammers",
              "Explains that the hammers tap the metal strings",
              "Contrasts soft wool felt with harsh metal clanging",
              "Uses clear, simple sentences",
            ],
            explanation:
              "Dense wool felt is strong, springy, and cushioned—making it the secret behind a piano's warm voice!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-piano-soundboard-role",
            prompt:
              "How does a piano key work like a playground seesaw?",
            correct: "When you push the front end down, the back end tilts up to launch the hammer!",
            wrong: [
              "It spins around in a circle like a merry-go-round.",
              "It slides down a water slide.",
              "It floats up into the sky like a balloon.",
            ],
            explanation:
              "A piano key pivots on a balance pin in the middle—pushing the front down lifts the back end up.",
          },
          o1: {
            objective: "tobi-piano-chain-reaction",
            prompt:
              "Why would a vibrating piano string sound almost as quiet as a whisper if the piano did NOT have a wooden soundboard underneath?",
            exemplar:
              "A thin metal wire is too skinny to push much air by itself! The wide wooden soundboard vibrates along with the string and pushes lots of air so the music fills the whole room.",
            rubric: [
              "Explains that a thin string alone is too skinny to push much air",
              "Explains that the wide wooden soundboard vibrates with the string",
              "Says the soundboard makes the music much louder/fuller",
              "Uses clear everyday language",
            ],
            explanation:
              "Sound is vibrating air—the wide wooden soundboard moves a large surface of air so everyone in the room can hear the note!",
          },
          m1: {
            objective: "tobi-piano-parts-match",
            prompt: "Connect each part inside a piano to its job.",
            matches: [
              { left: "Seesaw Key Lever", right: "Tilts up when your finger presses down" },
              { left: "Wool-Felt Hammer", right: "Taps the string and bounces right off" },
              { left: "Short Thin Strings", right: "Vibrate super fast for high bird notes" },
              { left: "Wooden Soundboard", right: "Amplifies the vibration like a big speaker" },
            ],
            explanation:
              "The key lever tilts; the felt hammer taps and bounces; short thin strings make high notes; the soundboard amplifies the sound.",
          },
          c2: {
            objective: "tobi-piano-pitch-rule",
            prompt:
              "Which vibrates FASTER: a short, thin treble string (bird note) or a long, thick bass string (bear note)?",
            correct: "The short, thin treble string vibrates much faster!",
            wrong: [
              "The long, thick bass string vibrates faster.",
              "Neither string vibrates at all.",
              "They only vibrate when the piano lid is closed.",
            ],
            explanation:
              "Faster vibration = higher pitch! Short, thin strings wiggle hundreds or thousands of times per second.",
          },
          o2: {
            objective: "tobi-piano-wool-connection",
            prompt:
              "When you let go of a piano key, a soft felt pad called a damper drops down onto the string. What happens to the sound right when that felt pad touches the string, and why?",
            exemplar:
              "The sound stops right away! When the soft felt pad rests on the string, it stops the string from vibrating, which muffles the note so the next notes don't blur together.",
            rubric: [
              "Says the sound or note stops/quiets right away",
              "Explains that the pad stops the string from vibrating (muffles it)",
              "Connects vibration to sound",
              "Explains clearly in one or two sentences",
            ],
            explanation:
              "Hammers bounce off to start the vibration; dampers press down when you release the key to stop the vibration cleanly!",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Torah & Parsha: Noach's Kindness in the Teivah & The Rainbow Promise",
        subjects: ["Torah"],
        objectives: [
          "Describe how Noach and his family practiced non-stop Chesed feeding every animal on schedule in the Teivah",
          "Explain the meaning of the Dove's olive leaf and Hashem's Rainbow (Keshet) covenant",
        ],
        teaching: [
          {
            kind: "torah",
            title: "Parshat Noach: A Year of Chesed & The Rainbow in the Clouds",
            diagram: "tobi-noach-rainbow-ark",
            text: `Inside the Teivah (Ark), Noach and his family spent a whole year doing non-stop Chesed (kindness)! Rashi teaches that they barely slept by day or by night because every animal had its own special feeding time and favorite food—some ate at dawn, some at noon, and some in the middle of the night—and Noach cared for every single creature on time!\n\nWhen the rain stopped, Noach sent out a gentle white Dove. On her second flight, the Dove returned at evening holding a fresh green olive leaf in her beak—proving that treetops were peeking above the water! After Noach and all the animals stepped out onto dry land, Hashem placed a glowing Rainbow (Keshet) in the clouds as an eternal promise never again to bring a Flood upon the whole world.`,
            highlight: ["Chesed", "Teivah", "Dove", "olive leaf", "Rainbow", "Keshet"],
            terms: [
              {
                word: "Chesed (חֶסֶד)",
                meaning: "Loving-kindness—caring for others and helping them generously.",
                example: "Noach practiced Chesed day and night by feeding every animal in the Teivah.",
              },
              {
                word: "Yonah (יוֹנָה · Dove)",
                meaning: "The gentle white bird that brought Noach a green olive leaf as a sign of peace and dry land.",
                example: "The Yonah held a fresh olive leaf in her beak when she returned at evening.",
              },
              {
                word: "Keshet (קֶשֶׁת · Rainbow)",
                meaning: "The colorful rainbow Hashem placed in the clouds as a sign of His promise never to flood the earth again.",
                example: "When we see a Keshet in the sky, we recite a special bracha thanking Hashem for keeping His promise!",
              },
            ],
            sources: [
              {
                label: "Sefaria · Bereishis 8:11 & 9:13 with Rashi",
                url: "https://www.sefaria.org/Genesis.8.11?lang=bi&with=Rashi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-torah-noach-dove",
            prompt:
              "What did the white Dove (Yonah) bring back in her beak on her second flight to show Noach that the floodwaters were going down?",
            correct: "A fresh green olive leaf",
            wrong: [
              "A golden crown",
              "A wool sweater",
              "A heavy rock from the bottom of the sea",
            ],
            explanation:
              "The Dove returned at evening with a freshly plucked olive leaf in her beak (Bereishis 8:11), showing that trees were emerging from the water.",
          },
          o1: {
            objective: "tobi-torah-noach-chesed",
            prompt:
              "According to Rashi, why did Noach and his family barely sleep during the whole year inside the Teivah? What does that teach us about Chesed?",
            exemplar:
              "They barely slept because every animal ate at a different hour—some in the daytime and some late at night—and Noach fed each one on time! It teaches us to care for others and animals with patience and Chesed.",
            rubric: [
              "Mentions feeding the animals inside the Teivah",
              "Explains that different animals ate at different times (day and night) or needed special food",
              "Connects Noach's hard work to Chesed (kindness/caring)",
              "Uses one or two clear sentences",
            ],
            explanation:
              "True Chesed means giving each creature what it needs, right when it needs it, with a caring heart.",
          },
          m1: {
            objective: "tobi-torah-noach-match",
            prompt: "Match each part of Parshat Noach to its meaning.",
            matches: [
              { left: "Teivah", right: "The 3-deck Ark that sheltered Noach's family & animals" },
              { left: "Chesed in the Ark", right: "Feeding every animal its special food day and night" },
              { left: "Olive Leaf", right: "Brought by the Dove to show trees were above water" },
              { left: "Keshet (Rainbow)", right: "Hashem's sign in the clouds promising no more world Flood" },
            ],
            explanation:
              "Teivah is the Ark; Chesed was feeding all the animals; the olive leaf showed receding waters; the Keshet is Hashem's rainbow covenant.",
          },
          c2: {
            objective: "tobi-torah-rainbow-promise",
            prompt:
              "What promise did Hashem connect to the Rainbow (Keshet) shining in the clouds after the rain?",
            correct: "That He will remember His covenant and never again bring a Flood to destroy the earth.",
            wrong: [
              "That it will never rain again on Tuesdays.",
              "That all birds will turn into rainbows.",
              "That every cloud is made of cotton candy.",
            ],
            explanation:
              "In Bereishis 9:13–15, Hashem sets the Keshet in the cloud as an everlasting sign that floodwaters will never again destroy the world.",
          },
          o2: {
            objective: "tobi-torah-chesed-home",
            prompt:
              "Noach practiced Chesed by making sure every creature in the Teivah had food and care. What is one way you can practice Chesed for a pet, a younger sibling, or a guest in your home this week?",
            exemplar:
              "I can practice Chesed by helping set out food or a drink for a guest, sharing my toys kindly with my younger brother, or feeding a pet on time without being asked!",
            rubric: [
              "Names a concrete act of kindness (helping a sibling, guest, parent, or pet)",
              "Connects the action to Chesed (caring for others' needs)",
              "Reflects the spirit of Noach's attentiveness",
              "Written warmly in the child's own words",
            ],
            explanation:
              "Every time we notice what someone else needs and help them happily, we are building our home with Chesed!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-torah-noach-dove",
            prompt:
              "What is the Hebrew word for the Rainbow that Hashem placed in the clouds?",
            correct: "Keshet (קֶשֶׁת)",
            wrong: [
              "Teivah (תֵּבָה)",
              "Challah (חַלָּה)",
              "Menucha (מְנוּחָה)",
            ],
            explanation:
              "Keshet means bow / rainbow—Hashem's sign of peace in the clouds.",
          },
          o1: {
            objective: "tobi-torah-noach-chesed",
            prompt:
              "How did the Dove's three flights from the Teivah window tell Noach step by step that the world was becoming dry again?",
            exemplar:
              "On the first flight she came back tired because water covered everything. Seven days later she brought back an olive leaf showing treetops were out of the water. Seven days after that she didn't come back because the land was dry!",
            rubric: [
              "Mentions the first flight (no dry place to rest)",
              "Mentions the second flight (returned with an olive leaf)",
              "Mentions the third flight (stayed out on dry land)",
              "Explains clearly how each flight showed the water going down",
            ],
            explanation:
              "Each flight gave Noach new evidence: water everywhere → treetops showing (olive leaf) → dry ground ready!",
          },
          m1: {
            objective: "tobi-torah-noach-match",
            prompt: "Match each part of Parshat Noach to its meaning.",
            matches: [
              { left: "Teivah", right: "The 3-deck Ark that sheltered Noach's family & animals" },
              { left: "Chesed in the Ark", right: "Feeding every animal its special food day and night" },
              { left: "Olive Leaf", right: "Brought by the Dove to show trees were above water" },
              { left: "Keshet (Rainbow)", right: "Hashem's sign in the clouds promising no more world Flood" },
            ],
            explanation:
              "Teivah is the Ark; Chesed was feeding all the animals; the olive leaf showed receding waters; the Keshet is Hashem's rainbow covenant.",
          },
          c2: {
            objective: "tobi-torah-rainbow-promise",
            prompt:
              "Why has an olive branch with a white dove become a famous symbol of peace and hope all over the world?",
            correct: "Because in Parshat Noach, the Dove brought an olive leaf to show the storm was over and peace had returned!",
            wrong: [
              "Because olives grow on the moon.",
              "Because doves build six-sided honeycombs.",
              "Because olive leaves are used to make umbrellas.",
            ],
            explanation:
              "The Dove returning to Noach's Teivah with an olive leaf is the original Torah symbol of peace and renewal after a storm!",
          },
          o2: {
            objective: "tobi-torah-chesed-home",
            prompt:
              "Why didn't Noach just dump all the animal food in one big pile on the floor of the Teivah once a week and go to sleep?",
            exemplar:
              "Because each animal needed its own special kind of food at the right time of day or night! Caring for someone properly means giving them what helps them best.",
            rubric: [
              "Explains that different animals needed different foods or schedules",
              "Shows that dumping food in one pile wouldn't care for every animal fairly",
              "Connects thoughtful care to true Chesed",
              "Uses clear, simple sentences",
            ],
            explanation:
              "Thoughtful Chesed pays attention to what each creature needs and serves it with care.",
          },
        },
      },
    ],
  },
];
