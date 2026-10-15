import type { DayBlueprint } from "./v4-types";

export const TOBI_DAYS_1_AND_2: DayBlueprint[] = [
  // =========================================================================
  // DAY 1 · FLUFFY SHEEP'S WOOL, COZY SWEATERS & THE 6 DAYS OF CREATION
  // =========================================================================
  {
    order: 1,
    title: "Day 1 · Fluffy Sheep's Wool, Cozy Sweaters & Shabbos Menucha",
    readingPassage: {
      title: "The Cloud That Became a Sweater",
      text: `Seven-year-old Talia visited Sunny Meadow Farm on a breezy spring morning. She watched Farmer Dan give a big sheep named Daisy a gentle haircut with electric clippers. The thick, curly coat came off in one giant fluffy blanket called a fleece! Talia touched a pinch of loose wool, but when she pulled it gently, the short hairs slipped right apart in her fingers.

"How can short hairs that slip apart ever hold together as a sweater?" Talia asked. Grandma sat down at a wooden spinning wheel. First she brushed the washed wool into a soft cloud. Then she fed the cloud onto the spinning wheel, which twisted the hairs together into a long, strong strand of yarn.

Talia tugged the twisted yarn—this time it did not break! Grandma smiled and knitted a few stretchy loops. "Twisting makes the tiny scales on each hair grip tight," Grandma explained, "and these cosy loops trap warm air right next to your skin!"`,
      words: [
        {
          word: "fleece",
          meaning: "The thick, fluffy coat of wool that grows on a sheep.",
          example: "In the spring, Farmer Dan clips off Daisy's warm fleece.",
        },
        {
          word: "strand",
          meaning: "A single long thread, hair, or piece of yarn.",
          example: "Grandma twisted the fluffy wool into a strong strand of yarn.",
        },
        {
          word: "twist",
          meaning: "To wind or spin pieces around each other so they hold tight.",
          example: "When you twist short wool hairs together, they lock into yarn.",
        },
        {
          word: "cozy",
          meaning: "Warm, soft, and comfortable.",
          example: "Knitted wool loops trap warm air to keep your sweater cozy.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Story: The Cloud That Became a Sweater",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use fleece, strand, twist, and cozy in context",
          "Explain using story clues why loose wool slips apart while spun yarn holds strong",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            diagram: "tobi-wool-spinning-lab",
            text: "Say each word out loud, tap the card to see what it means, and play the Word Lightning Check!",
            highlight: ["fleece", "strand", "twist", "cozy"],
            terms: [
              {
                word: "fleece",
                meaning: "The thick, fluffy coat of wool that grows on a sheep.",
                example: "In the spring, Farmer Dan clips off Daisy's warm fleece.",
              },
              {
                word: "strand",
                meaning: "A single long thread, hair, or piece of yarn.",
                example: "Grandma twisted the fluffy wool into a strong strand of yarn.",
              },
              {
                word: "twist",
                meaning: "To wind or spin pieces around each other so they hold tight.",
                example: "When you twist short wool hairs together, they lock into yarn.",
              },
              {
                word: "cozy",
                meaning: "Warm, soft, and comfortable.",
                example: "Knitted wool loops trap warm air to keep your sweater cozy.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Cloud That Became a Sweater",
            diagram: "tobi-wool-spinning-lab",
            text: `Seven-year-old Talia visited Sunny Meadow Farm on a breezy spring morning. She watched Farmer Dan give a big sheep named Daisy a gentle haircut with electric clippers. The thick, curly coat came off in one giant fluffy blanket called a fleece! Talia touched a pinch of loose wool, but when she pulled it gently, the short hairs slipped right apart in her fingers.\n\n"How can short hairs that slip apart ever hold together as a sweater?" Talia asked. Grandma sat down at a wooden spinning wheel. First she brushed the washed wool into a soft cloud. Then she fed the cloud onto the spinning wheel, which twisted the hairs together into a long, strong strand of yarn.\n\nTalia tugged the twisted yarn—this time it did not break! Grandma smiled and knitted a few stretchy loops. "Twisting makes the tiny scales on each hair grip tight," Grandma explained, "and these cosy loops trap warm air right next to your skin!"`,
            highlight: ["fleece", "twisted", "strand", "loops"],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-day1-vocab-fleece",
            prompt:
              "In “The Cloud That Became a Sweater,” what is a sheep's thick, fluffy coat of wool called?",
            correct: "A fleece",
            wrong: [
              "A metal shell",
              "A plastic raincoat",
              "A wooden wheel",
            ],
            explanation:
              "Paragraph 1 tells us the sheep's thick curly coat comes off in one big fluffy blanket called a fleece.",
          },
          o1: {
            objective: "tobi-day1-reading-evidence",
            prompt:
              "What happened when Talia pulled the loose wool in paragraph 1, and what changed after Grandma used the spinning wheel?",
            exemplar:
              "At first the loose wool hairs slipped right apart in Talia's fingers. After Grandma twisted them on the spinning wheel into a strand of yarn, Talia tugged it and it stayed strong without breaking!",
            rubric: [
              "Says the loose wool hairs slipped apart at first",
              "Mentions Grandma twisting or spinning the wool on the wheel",
              "Says the twisted yarn held strong and did not break",
              "Explains the change clearly in one or two simple sentences",
            ],
            explanation:
              "Loose wool hairs slide past each other, but twisting them on the spinning wheel locks their tiny scales together into strong yarn.",
          },
          m1: {
            objective: "tobi-day1-vocab-match",
            prompt: "Match each word from the story to its meaning.",
            matches: [
              { left: "Fleece", right: "A sheep's thick fluffy wool coat" },
              { left: "Strand", right: "A single long piece of thread or yarn" },
              { left: "Twist", right: "Spin hairs around each other so they grip" },
              { left: "Cozy", right: "Warm, soft, and comfortable" },
            ],
            explanation:
              "Fleece is the sheep's coat; a strand is a long thread; twist means spin together; cozy means warm and soft.",
          },
          c2: {
            objective: "tobi-day1-reading-inference",
            prompt:
              "According to Grandma in paragraph 3, why does a knitted wool sweater keep you warm?",
            correct: "Its fuzzy yarn loops trap pockets of warm air next to your skin.",
            wrong: [
              "It has tiny batteries hidden inside the sleeves.",
              "It is made of solid metal that blocks the sun.",
              "It sprays hot water when the wind blows.",
            ],
            explanation:
              "Grandma explains that knitted loops trap warm air right next to your skin like a cozy blanket.",
          },
          o2: {
            objective: "tobi-day1-creative-apply",
            prompt:
              "Pretend a younger friend asks if shearing hurts the sheep. Using the story and photos, how would you explain what shearing feels like and why farmers do it in spring?",
            exemplar:
              "Shearing does not hurt the sheep at all—it is just like getting a gentle haircut! Farmers clip off the heavy fleece in spring so the sheep stays cool in the summer.",
            rubric: [
              "Says shearing does not hurt the sheep",
              "Compares shearing to a gentle haircut",
              "Mentions clipping off the heavy wool coat or fleece",
              "Explains that it helps the sheep feel cool for warm weather or gives wool for sweaters",
            ],
            explanation:
              "Shearing is a gentle springtime haircut that keeps the sheep comfortable in warm weather and gives us fluffy wool.",
          },
        },
        form2: {
          c1: {
            objective: "tobi-day1-vocab-fleece",
            prompt:
              "What did the spinning wheel do to the soft cloud of wool in “The Cloud That Became a Sweater”?",
            correct: "It twisted the short hairs together into a strong strand of yarn.",
            wrong: [
              "It melted the wool into glass.",
              "It painted the sheep blue.",
              "It chopped the yarn into tiny crumbs.",
            ],
            explanation:
              "The spinning wheel twists short wool hairs around one another so their tiny scales grip tight.",
          },
          o1: {
            objective: "tobi-day1-reading-evidence",
            prompt:
              "Why did Talia wonder how wool could ever become a sweater in paragraph 1? Tell what she noticed when she touched the loose wool.",
            exemplar:
              "When Talia pulled a pinch of loose wool, the short hairs slipped right apart in her fingers. She wondered how hairs that slide apart could hold together as a sweater.",
            rubric: [
              "Mentions Talia pulling or touching the pinch of loose wool",
              "Says the short hairs slipped apart in her fingers",
              "Connects that clue to her question about how a sweater holds together",
              "Uses clear everyday words",
            ],
            explanation:
              "Before spinning, short wool hairs aren't twisted together yet, so they slide apart easily.",
          },
          m1: {
            objective: "tobi-day1-vocab-match",
            prompt: "Match each word from the story to its meaning.",
            matches: [
              { left: "Fleece", right: "A sheep's thick fluffy wool coat" },
              { left: "Strand", right: "A single long piece of thread or yarn" },
              { left: "Twist", right: "Spin hairs around each other so they grip" },
              { left: "Cozy", right: "Warm, soft, and comfortable" },
            ],
            explanation:
              "Fleece is the sheep's coat; a strand is a long thread; twist means spin together; cozy means warm and soft.",
          },
          c2: {
            objective: "tobi-day1-reading-inference",
            prompt:
              "Why didn't the yarn break when Talia tugged it in paragraph 3?",
            correct: "Twisting made the tiny scales on each wool hair grip tightly together.",
            wrong: [
              "Grandma glued the wool to a wooden board.",
              "The yarn was made of steel wire.",
              "Talia did not pull on the yarn at all.",
            ],
            explanation:
              "Each wool hair has microscopic scales that lock onto neighbor hairs once they are twisted together.",
          },
          o2: {
            objective: "tobi-day1-creative-apply",
            prompt:
              "What would happen if someone tried to knit a sweater out of untwisted wool cloud without spinning it into yarn first? Why?",
            exemplar:
              "The sweater would fall apart as soon as you stretched it! Without twisting the wool into yarn, the short hairs would just slide past each other.",
            rubric: [
              "Predicts that the sweater or wool would pull apart or fall apart",
              "Explains that the short hairs are not twisted together",
              "Mentions that twisting is needed so the hairs grip or lock",
              "Gives a clear reason in one or two sentences",
            ],
            explanation:
              "Spinning twists the short fibers so friction and tiny scales lock them into a continuous, strong yarn.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: From Sheep's Coat to Knitted Loops",
        subjects: ["How things work"],
        objectives: [
          "Put the 4 steps of wool making in order: Shearing, Carding, Spinning, and Knitting",
          "Explain how knitted loops trap warm air pockets to keep your body warm",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Inside the Wool Lab: 4 Steps to a Cozy Sweater",
            diagram: "tobi-wool-spinning-lab",
            text: `How does a fluffy coat on a sheep turn into the stretchy sweater in your closet? It takes four clever steps!\n\nFirst is Shearing: in springtime, the farmer clips off the sheep's heavy fleece like a painless haircut and washes it clean. Second is Carding: wire brushes comb the tangled curls so all the wool hairs line up in a soft cloud. Third is Spinning: a spinning wheel twists the short hairs together so their microscopic scales lock into strong yarn. Fourth is Knitting: needles weave the yarn into rows of stretchy loops that trap tiny pockets of warm air right next to your body!`,
            highlight: ["Shearing", "Carding", "Spinning", "Knitting"],
            terms: [
              {
                word: "Carding (Brushing)",
                meaning: "Combing washed wool with wire brushes to untangle curls into a fluffy cloud.",
                example: "Carding gets out tangles before the wool goes to the spinning wheel.",
              },
              {
                word: "Spinning",
                meaning: "Twisting loose fibers together to make a long, strong strand of yarn.",
                example: "Spinning locks short wool hairs into a single strong thread.",
              },
              {
                word: "Air Pockets",
                meaning: "Tiny spaces inside fuzzy knitted loops that hold warm air near your skin.",
                example: "Trapped air pockets stop winter wind from chilling you.",
              },
            ],
            sources: [
              {
                label: "Britannica Kids · Wool",
                url: "https://kids.britannica.com/kids/article/wool/390099",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-wool-carding-step",
            prompt:
              "What do wire carding brushes do to washed sheep's wool?",
            correct: "They comb out tangles and puff the wool into a soft, aligned cloud.",
            wrong: [
              "They freeze the wool into ice cubes.",
              "They paint polka dots on the sheep.",
              "They turn the wool into liquid soup.",
            ],
            explanation:
              "Carding brushes untangle the curly wool fibers so they line up smoothly before spinning.",
          },
          o1: {
            objective: "tobi-wool-warm-air-explain",
            prompt:
              "Does a wool sweater make its own heat like a toaster, or how does it keep you warm on a snowy day?",
            exemplar:
              "A sweater does not make its own heat! Your own body is warm, and the fuzzy knitted loops trap tiny pockets of warm air next to your skin so the heat stays inside.",
            rubric: [
              "Recognizes that a sweater does not make heat by itself (your body warms it)",
              "Mentions the fuzzy wool or knitted loops",
              "Explains that the loops trap pockets of warm air",
              "Connects trapped air to keeping you warm",
            ],
            explanation:
              "Your body generates warmth, and the millions of tiny air pockets trapped in knitted wool keep that warm air right around you.",
          },
          m1: {
            objective: "tobi-wool-four-steps-match",
            prompt: "Connect each wool-making step to its job.",
            matches: [
              { left: "1. Shearing", right: "Giving the sheep a gentle spring haircut" },
              { left: "2. Carding", right: "Brushing tangled wool into a soft cloud" },
              { left: "3. Spinning", right: "Twisting fibers into a strong strand of yarn" },
              { left: "4. Knitting", right: "Looping yarn to trap cozy warm air pockets" },
            ],
            explanation:
              "Shearing clips the fleece; carding brushes it; spinning twists yarn; knitting loops the yarn into a sweater.",
          },
          c2: {
            objective: "tobi-wool-loops-stretch",
            prompt:
              "Why can a knitted sweater stretch over your head and then bounce back to its shape?",
            correct: "Because the yarn is linked in curvy V-shaped loops that can open and close like little springs.",
            wrong: [
              "Because it is carved out of a solid block of oak wood.",
              "Because the yarn is glued onto cardboard.",
              "Because it shrinks every time you smile.",
            ],
            explanation:
              "Interlocking yarn loops act like tiny springs—they widen when you pull them over your head and spring back in place.",
          },
          o2: {
            objective: "tobi-wool-compare-coat",
            prompt:
              "Why is a puffy, fuzzy wool mitten warmer in winter than a thin, flat sheet of paper wrapped around your hand?",
            exemplar:
              "The fuzzy wool mitten has lots of fluffy loops that trap warm air pockets around your fingers. A thin flat sheet of paper has no fluffy spaces to hold warm air.",
            rubric: [
              "Says the fuzzy wool mitten traps warm air pockets",
              "Points out that thin flat paper cannot trap warm air",
              "Connects the fluffy/looped texture to staying warm",
              "Explains clearly in one or two simple sentences",
            ],
            explanation:
              "Fluffy thickness traps still air, which is the secret insulator that keeps winter cold out!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-wool-carding-step",
            prompt:
              "Which step comes right AFTER washing and brushing (carding) the wool cloud?",
            correct: "Spinning the wool to twist the short hairs into strong yarn.",
            wrong: [
              "Putting the fleece back onto the sheep.",
              "Baking the wool in a pizza oven.",
              "Throwing the wool into a river.",
            ],
            explanation:
              "Once the wool is washed and brushed into a soft cloud, it goes onto the spinning wheel to be twisted into yarn.",
          },
          o1: {
            objective: "tobi-wool-warm-air-explain",
            prompt:
              "Look at the magnifying glass on the knitted sweater diagram. What is hiding inside the spaces between the yarn loops, and how does it help you?",
            exemplar:
              "Tiny pockets of warm air are hiding inside the yarn loops! They hold your body's warmth close to your skin like a blanket.",
            rubric: [
              "Names the warm air pockets inside the loops",
              "Explains that your body warms that trapped air",
              "Says the loops keep the warm air from escaping",
              "Uses clear, simple words",
            ],
            explanation:
              "Still air trapped inside fuzzy wool loops is one of nature's best insulators.",
          },
          m1: {
            objective: "tobi-wool-four-steps-match",
            prompt: "Connect each wool-making step to its job.",
            matches: [
              { left: "1. Shearing", right: "Giving the sheep a gentle spring haircut" },
              { left: "2. Carding", right: "Brushing tangled wool into a soft cloud" },
              { left: "3. Spinning", right: "Twisting fibers into a strong strand of yarn" },
              { left: "4. Knitting", right: "Looping yarn to trap cozy warm air pockets" },
            ],
            explanation:
              "Shearing clips the fleece; carding brushes it; spinning twists yarn; knitting loops the yarn into a sweater.",
          },
          c2: {
            objective: "tobi-wool-loops-stretch",
            prompt:
              "What helps short wool hairs hold onto each other when you twist them into yarn?",
            correct: "Tiny microscopic scales on each wool hair that grip together.",
            wrong: [
              "Sticky peanut butter smeared on the wheel.",
              "Metal staples inside the sheep.",
              "Invisible magnets in the grass.",
            ],
            explanation:
              "Wool fibers have microscopic overlapping scales that catch and lock together under twist.",
          },
          o2: {
            objective: "tobi-wool-compare-coat",
            prompt:
              "Tell the story of a sweater in order! Name what happens to the wool from the moment it is on the sheep to when you wear it.",
            exemplar:
              "First the farmer shears the fleece off the sheep and washes it. Next, brushes comb it into a soft cloud, a spinning wheel twists it into yarn, and needles knit the yarn into loops for a sweater!",
            rubric: [
              "Includes shearing or clipping the fleece from the sheep",
              "Includes washing or brushing (carding) the wool",
              "Includes spinning/twisting into yarn",
              "Includes knitting loops into a sweater",
            ],
            explanation:
              "Following the four steps—shearing, carding, spinning, and knitting—turns a fluffy fleece into a wearable sweater.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Torah & Parsha: Bereishis & The Gift of Shabbos Menucha",
        subjects: ["Torah"],
        objectives: [
          "Describe how Days 1–3 prepared the world's spaces and Days 4–6 filled them",
          "Explain Rashi's teaching on what was created on the 7th day: Menucha (peaceful rest)",
        ],
        teaching: [
          {
            kind: "torah",
            title: "Parshat Bereishis: Building the World & Welcoming Shabbos",
            diagram: "tobi-bereishis-days-explorer",
            text: `In Parshat Bereishis (Bereishis 1:1–2:3), Hashem created our beautiful world in six days! Notice the amazing pattern: on the first three days, Hashem built the spaces of the world—Day 1: Light and dark; Day 2: The sky above and waters below; Day 3: Dry land, seas, grass, and fruit trees. On the next three days, Hashem filled those exact spaces—Day 4: Sun, moon, and stars in the sky; Day 5: Fish in the sea and birds in the sky; Day 6: Land animals and Adam & Chava!\n\nThen came Day 7: Shabbos! Rashi asks a wonderful question: If Hashem finished making heaven and earth in six days, what did He create on the seventh day? Rashi answers: "Baa Shabbos, Baa Menucha"—when Shabbos arrived, Peaceful Rest (Menucha) arrived! That was the crown that made the whole Creation complete.`,
            highlight: ["Bereishis", "six days", "Shabbos", "Menucha"],
            terms: [
              {
                word: "Bereishis (בְּרֵאשִׁית)",
                meaning: "“In the beginning”—the very first word of the Torah!",
                example: "In Parshat Bereishis we learn how Hashem created the world with ten sayings.",
              },
              {
                word: "Menucha (מְנוּחָה)",
                meaning: "Peaceful rest and calm joy that arrives on Shabbos.",
                example: "Rashi teaches that when Shabbos came, Menucha came to the world.",
              },
              {
                word: "Adam & Chava",
                meaning: "The very first human beings, created on the sixth day to care for Hashem's world.",
                example: "Hashem placed Adam & Chava in Gan Eden right before the first Shabbos.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Bereishis 2:2 with Rashi",
                url: "https://www.sefaria.org/Genesis.2.2?lang=bi&with=Rashi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-torah-bereishis-day7",
            prompt:
              "According to Rashi on Parshat Bereishis, what special gift came to the world when Shabbos arrived on the seventh day?",
            correct: "Menucha — peaceful rest that completed the world!",
            wrong: [
              "A giant snowstorm.",
              "More work and hammering.",
              "A new ocean of lemonade.",
            ],
            explanation:
              "Rashi explains: 'Baa Shabbos, Baa Menucha'—when Shabbos came, peaceful rest came, completing Creation.",
          },
          o1: {
            objective: "tobi-torah-bereishis-pattern",
            prompt:
              "Look at the Creation Explorer: how do Days 1–3 and Days 4–6 work together like building a house and then filling it? Give one example!",
            exemplar:
              "On Days 1 to 3 Hashem made the spaces, like the sky and seas. On Days 4 to 6 He filled those spaces, like putting fish in the sea, birds in the sky, or the sun and stars in the heavens!",
            rubric: [
              "Explains that Days 1–3 prepared or built the spaces",
              "Explains that Days 4–6 filled those spaces",
              "Gives at least one accurate example (sky/sun & stars, sea/fish, or land/animals & people)",
              "Uses clear, age-appropriate sentences",
            ],
            explanation:
              "Hashem first created the settings (light, sky/sea, land/plants) and then filled them with luminaries, fish/birds, and land creatures/humans.",
          },
          m1: {
            objective: "tobi-torah-days-match",
            prompt: "Match each Day of Creation to what Hashem made.",
            matches: [
              { left: "Day 1", right: "Light and darkness" },
              { left: "Day 3", right: "Dry land, seas, grass & fruit trees" },
              { left: "Day 5", right: "Fish in the sea & birds in the sky" },
              { left: "Day 7 (Shabbos)", right: "Menucha — peaceful rest for the world" },
            ],
            explanation:
              "Day 1: Light; Day 3: Dry land & plants; Day 5: Fish & birds; Day 7: Shabbos Menucha.",
          },
          c2: {
            objective: "tobi-torah-day6-humans",
            prompt:
              "On which day were land animals and the first people (Adam & Chava) created, right before Shabbos began?",
            correct: "Day 6 (Friday)",
            wrong: [
              "Day 1 (Sunday)",
              "Day 2 (Monday)",
              "Day 4 (Wednesday)",
            ],
            explanation:
              "Hashem created land animals and Adam & Chava on the sixth day so they could step right into the palace of Shabbos!",
          },
          o2: {
            objective: "tobi-torah-menucha-personal",
            prompt:
              "What is one way your family brings Menucha (peaceful Shabbos rest and joy) into your home when Friday evening comes?",
            exemplar:
              "We finish our weekday work, light glowing Shabbos candles, sing Shalom Aleichem, and sit together around the table without rushing!",
            rubric: [
              "Names a concrete Shabbos family practice or feeling",
              "Connects it to peace, rest (Menucha), or joy",
              "Shows understanding that Shabbos is different from busy weekdays",
              "Expresses the idea warmly in the child's own words",
            ],
            explanation:
              "When we set aside weekday rush and welcome Shabbos with candles, songs, and family peace, we bring Menucha into our home.",
          },
        },
        form2: {
          c1: {
            objective: "tobi-torah-bereishis-day7",
            prompt:
              "What does the Hebrew word “Bereishis” (the very first word of the Torah) mean?",
            correct: "In the beginning",
            wrong: [
              "Under the ocean",
              "At the end of the year",
              "Inside the basket",
            ],
            explanation:
              "Bereishis means 'In the beginning'—opening the story of how Hashem created heaven and earth.",
          },
          o1: {
            objective: "tobi-torah-bereishis-pattern",
            prompt:
              "Why did Hashem create grass and fruit trees on Day 3 BEFORE creating animals and people on Day 6?",
            exemplar:
              "Hashem created the grass and fruit trees first so that when the animals and people arrived on Day 6, their food and home were already waiting for them!",
            rubric: [
              "Recognizes that plants/trees were ready before animals and people arrived",
              "Explains that the animals and people needed food or a prepared home",
              "Connects this to Hashem's kindness in preparing the world",
              "Explains clearly in one or two simple sentences",
            ],
            explanation:
              "Just like a caring host sets the table before welcoming guests, Hashem prepared light, water, land, and fruit trees before creating living creatures.",
          },
          m1: {
            objective: "tobi-torah-days-match",
            prompt: "Match each Day of Creation to what Hashem made.",
            matches: [
              { left: "Day 1", right: "Light and darkness" },
              { left: "Day 3", right: "Dry land, seas, grass & fruit trees" },
              { left: "Day 5", right: "Fish in the sea & birds in the sky" },
              { left: "Day 7 (Shabbos)", right: "Menucha — peaceful rest for the world" },
            ],
            explanation:
              "Day 1: Light; Day 3: Dry land & plants; Day 5: Fish & birds; Day 7: Shabbos Menucha.",
          },
          c2: {
            objective: "tobi-torah-day6-humans",
            prompt:
              "What did Hashem place in the sky on Day 4 to shine by day and by night?",
            correct: "The sun, the moon, and the stars",
            wrong: [
              "Whales and dolphins",
              "Sheep and wool sweaters",
              "Submarines and bicycles",
            ],
            explanation:
              "On Day 4, Hashem placed the sun, moon, and stars in the heavens to give light and mark days and seasons.",
          },
          o2: {
            objective: "tobi-torah-menucha-personal",
            prompt:
              "Rashi compares the six days of Creation to building a beautiful palace that was still missing one thing until Shabbos came. What was that missing crown, and why do we need it?",
            exemplar:
              "The missing crown was Menucha (peaceful rest)! Without a peaceful time to stop working and rest together, everyone would just be tired and busy all the time.",
            rubric: [
              "Identifies Menucha or peaceful rest as the missing crown",
              "Explains why people and the world need a time to stop working and rest",
              "Connects Menucha to Shabbos",
              "Explains clearly in the child's own words",
            ],
            explanation:
              "Menucha gives purpose and peace to all the work of the week.",
          },
        },
      },
    ],
  },

  // =========================================================================
  // DAY 2 · UMBRELLAS, WATERPROOF RAINCOATS & RABBI AKIVA'S WATER DROP
  // =========================================================================
  {
    order: 2,
    title: "Day 2 · How Umbrellas Repel Rain & Rabbi Akiva's Water Drop",
    readingPassage: {
      title: "The Mystery of the Bouncing Raindrops",
      text: `It was pouring rain when seven-year-old Noa stepped onto the porch. A big raindrop landed on the sleeve of her cotton sweater and soaked right in, leaving a dark wet spot. Next, Noa popped open her bright yellow umbrella. Hundreds of raindrops drummed against the curved canopy, but not a single drop soaked through!

Noa looked closely at the umbrella fabric. Each raindrop curled into a shiny round bead, like a tiny glass marble, and rolled right off the edge onto the grass. "Why does my sweater drink the rain while my umbrella pushes it away?" she wondered.

Her older brother Eli pointed to a green lotus leaf in the garden pond where raindrops were also rolling off like marbles. "Cotton has loose threads that absorb water like a sponge," Eli said. "Your umbrella has tightly woven threads and a waxy shield that repels water—just like that leaf!"`,
      words: [
        {
          word: "canopy",
          meaning: "The fabric roof stretched over the top of an umbrella.",
          example: "When Noa opened her umbrella, the yellow canopy spread wide over her head.",
        },
        {
          word: "absorb",
          meaning: "To soak up liquid like a sponge or towel.",
          example: "Soft cotton threads absorb water quickly in the rain.",
        },
        {
          word: "repel",
          meaning: "To push something away so it cannot soak in.",
          example: "A waxy raincoat shield helps repel raindrops so they roll right off.",
        },
        {
          word: "steady",
          meaning: "Happening again and again in a regular, even way without giving up.",
          example: "A steady drip of water can carve a hollow in a hard rock.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Story: The Mystery of the Bouncing Raindrops",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use canopy, absorb, repel, and steady accurately in context",
          "Contrast how water behaves on cotton versus a waxy umbrella canopy using story details",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            diagram: "tobi-umbrella-raincoat-lab",
            text: "Tap each card to unlock its meaning and example sentence, then play the Word Lightning Check!",
            highlight: ["canopy", "absorb", "repel", "steady"],
            terms: [
              {
                word: "canopy",
                meaning: "The fabric roof stretched over the top of an umbrella.",
                example: "When Noa opened her umbrella, the yellow canopy spread wide over her head.",
              },
              {
                word: "absorb",
                meaning: "To soak up liquid like a sponge or towel.",
                example: "Soft cotton threads absorb water quickly in the rain.",
              },
              {
                word: "repel",
                meaning: "To push something away so it cannot soak in.",
                example: "A waxy raincoat shield helps repel raindrops so they roll right off.",
              },
              {
                word: "steady",
                meaning: "Happening again and again in a regular, even way without giving up.",
                example: "A steady drip of water can carve a hollow in a hard rock.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Mystery of the Bouncing Raindrops",
            diagram: "tobi-umbrella-raincoat-lab",
            text: `It was pouring rain when seven-year-old Noa stepped onto the porch. A big raindrop landed on the sleeve of her cotton sweater and soaked right in, leaving a dark wet spot. Next, Noa popped open her bright yellow umbrella. Hundreds of raindrops drummed against the curved canopy, but not a single drop soaked through!\n\nNoa looked closely at the umbrella fabric. Each raindrop curled into a shiny round bead, like a tiny glass marble, and rolled right off the edge onto the grass. "Why does my sweater drink the rain while my umbrella pushes it away?" she wondered.\n\nHer older brother Eli pointed to a green lotus leaf in the garden pond where raindrops were also rolling off like marbles. "Cotton has loose threads that absorb water like a sponge," Eli said. "Your umbrella has tightly woven threads and a waxy shield that repels water—just like that leaf!"`,
            highlight: ["canopy", "absorb", "repels", "bead"],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-day2-vocab-repel",
            prompt:
              "In “The Mystery of the Bouncing Raindrops,” what does the umbrella's waxy shield do to water?",
            correct: "It repels the water so raindrops curl into beads and roll off.",
            wrong: [
              "It absorbs all the water like a bath towel.",
              "It freezes the rain into snowmen.",
              "It turns the raindrops into honey.",
            ],
            explanation:
              "Repel means push away—the waxy shield stops raindrops from soaking in so they bead up and roll off.",
          },
          o1: {
            objective: "tobi-day2-reading-contrast",
            prompt:
              "Using paragraphs 1 and 2, tell how the raindrop on Noa's cotton sleeve acted differently from the raindrops on her yellow umbrella canopy.",
            exemplar:
              "The raindrop on her cotton sleeve soaked right in and left a dark wet spot. On her yellow umbrella canopy, the raindrops curled into shiny round beads like marbles and rolled right off!",
            rubric: [
              "Describes the raindrop soaking into the cotton sleeve or making a wet spot",
              "Describes the raindrops on the umbrella curling into beads/marbles or rolling off",
              "Uses accurate details from paragraphs 1 and 2",
              "Explains the difference clearly in one or two sentences",
            ],
            explanation:
              "Cotton absorbs water into a wet spot, while the umbrella's waterproof canopy repels water into rolling beads.",
          },
          m1: {
            objective: "tobi-day2-vocab-match",
            prompt: "Match each word to its meaning.",
            matches: [
              { left: "Canopy", right: "The fabric roof of an umbrella" },
              { left: "Absorb", right: "Soak up liquid like a sponge" },
              { left: "Repel", right: "Push water away so it rolls off" },
              { left: "Steady", right: "Happening regularly again and again" },
            ],
            explanation:
              "Canopy is the umbrella roof; absorb means soak up; repel means push away; steady means regular and constant.",
          },
          c2: {
            objective: "tobi-day2-lotus-comparison",
            prompt:
              "Why did Eli point to the green lotus leaf in the garden pond in paragraph 3?",
            correct: "Because raindrops were rolling off its waxy surface just like on Noa's umbrella.",
            wrong: [
              "Because a frog was holding a miniature umbrella.",
              "Because the leaf was sinking to the bottom of the pond.",
              "Because the leaf was made of knitted sheep's wool.",
            ],
            explanation:
              "Lotus leaves have a natural waxy, bumpy surface that repels water into round rolling drops—the exact trick used on raincoats and umbrellas!",
          },
          o2: {
            objective: "tobi-day2-apply-fabric",
            prompt:
              "If you spilled juice on the kitchen table, would you want a cloth that absorbs water or a cloth that repels water to wipe it up? Explain why!",
            exemplar:
              "You would want a cloth that absorbs water! A cloth that absorbs soaks up the spilled juice like a sponge, whereas a cloth that repels would just push the puddle around.",
            rubric: [
              "Chooses a cloth that absorbs water",
              "Explains that absorb means soaking up the liquid",
              "Explains that a repelling cloth would only push the spill around",
              "Uses clear reasoning",
            ],
            explanation:
              "Different jobs need different fabrics: towels need to absorb water, while umbrellas and raincoats need to repel it!",
          },
        },
        form2: {
          c1: {
            objective: "tobi-day2-vocab-repel",
            prompt:
              "What does it mean when Eli says cotton threads absorb water?",
            correct: "They soak up the water like a sponge.",
            wrong: [
              "They bounce the water high into the clouds.",
              "They shine like a flashlight.",
              "They turn into steel ribs.",
            ],
            explanation:
              "Absorb means to drink or soak in liquid, the way cotton or a sponge soaks up water.",
          },
          o1: {
            objective: "tobi-day2-reading-contrast",
            prompt:
              "In paragraph 2, what did the raindrops look like on Noa's umbrella canopy, and why didn't they soak through?",
            exemplar:
              "The raindrops looked like shiny round glass marbles! They didn't soak through because the umbrella has tightly woven threads and a waxy shield that repels water.",
            rubric: [
              "Describes the raindrops as round beads or tiny glass marbles",
              "Mentions the tightly woven threads or waxy shield",
              "Explains that the umbrella repels water so it rolls off",
              "Uses clear, simple sentences",
            ],
            explanation:
              "The waxy coating and tight weave keep water on the surface as round beads that roll off the curved dome.",
          },
          m1: {
            objective: "tobi-day2-vocab-match",
            prompt: "Match each word to its meaning.",
            matches: [
              { left: "Canopy", right: "The fabric roof of an umbrella" },
              { left: "Absorb", right: "Soak up liquid like a sponge" },
              { left: "Repel", right: "Push water away so it rolls off" },
              { left: "Steady", right: "Happening regularly again and again" },
            ],
            explanation:
              "Canopy is the umbrella roof; absorb means soak up; repel means push away; steady means regular and constant.",
          },
          c2: {
            objective: "tobi-day2-lotus-comparison",
            prompt:
              "What is the fabric roof stretched over the top of an umbrella called?",
            correct: "The canopy",
            wrong: [
              "The fleece",
              "The pedal",
              "The anchor",
            ],
            explanation:
              "The dome-shaped fabric roof of an umbrella is called its canopy.",
          },
          o2: {
            objective: "tobi-day2-apply-fabric",
            prompt:
              "Why would a cotton T-shirt make a terrible umbrella canopy in a rainstorm? Use the word absorb or repel in your answer!",
            exemplar:
              "A cotton T-shirt has loose threads that absorb water instead of repelling it! The rain would soak right through the cotton and drip onto your head.",
            rubric: [
              "Uses absorb or repel accurately",
              "Explains that cotton has loose threads that soak up water",
              "States that rain would leak or drip through onto your head",
              "Explains clearly in one or two sentences",
            ],
            explanation:
              "An umbrella canopy must repel water and be woven tightly so rain rolls off instead of soaking through.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: Inside an Umbrella's Ribs & Waxy Shield",
        subjects: ["How things work"],
        objectives: [
          "Identify the shaft, runner, stretcher ribs, and curved dome canopy of an umbrella",
          "Explain why an umbrella canopy must be curved and stretched tight as well as water-repellent",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Umbrella Engineering: Metal Ribs + Nature's Lotus Shield",
            diagram: "tobi-umbrella-raincoat-lab",
            text: `Look up underneath an open umbrella and you'll see a clever folding skeleton! In the middle is the tall post called the shaft. When you push the sliding ring (the runner) up the shaft, metal arms called stretchers push outward against eight flexible ribs. Those ribs pull the fabric canopy drum-tight into a curved dome!\n\nWhy does the canopy have to be a tight curved dome AND coated with a waxy shield? Because if the roof were flat and saggy, rainwater would collect in a heavy puddle on top until the umbrella collapsed! Instead, the waxy shield makes water curl into round beads, and the tight curved dome lets gravity roll every bead straight down to the ground.`,
            highlight: ["shaft", "runner", "ribs", "canopy", "dome"],
            terms: [
              {
                word: "Runner & Stretchers",
                meaning: "The sliding ring and metal arms that push outward to open the umbrella.",
                example: "Slide the runner up the shaft and the stretchers pop the umbrella open!",
              },
              {
                word: "Flexible Ribs",
                meaning: "The curved metal or fiberglass spokes that hold the fabric canopy in a dome shape.",
                example: "Eight flexible ribs stretch the umbrella roof tight like a drum.",
              },
              {
                word: "Lotus Effect",
                meaning: "How a waxy surface makes water curl into round marbles that roll right off.",
                example: "Raincoats copy the lotus leaf's waxy shield to repel rain.",
              },
            ],
            sources: [
              {
                label: "National Geographic Kids · Biomimicry from Nature",
                url: "https://kids.nationalgeographic.com/science/article/biomimicry",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-umbrella-ribs-job",
            prompt:
              "What happens inside an umbrella when you slide the runner ring up the center shaft?",
            correct: "Metal stretcher arms push the ribs outward to pull the fabric canopy tight.",
            wrong: [
              "A motor spins the umbrella like a helicopter.",
              "The fabric melts into a puddle.",
              "The handle turns into a flashlight.",
            ],
            explanation:
              "Sliding the runner up pushes the hinged stretcher arms outward against the ribs, opening the canopy into a tight dome.",
          },
          o1: {
            objective: "tobi-umbrella-dome-shape",
            prompt:
              "What would happen in a heavy rainstorm if an umbrella had a flat, saggy roof instead of a tight curved dome?",
            exemplar:
              "If the umbrella roof were flat and saggy, rainwater would collect in a heavy puddle on top instead of rolling off, and the heavy water could make the umbrella sag or collapse!",
            rubric: [
              "Says rainwater would pool or collect in a puddle on top",
              "Explains that the water would not roll off a flat or saggy roof",
              "Mentions that the heavy puddle could weigh down or collapse the umbrella",
              "Contrasts this with how a curved dome lets water roll off",
            ],
            explanation:
              "A curved dome uses gravity so beaded raindrops roll right down the slope instead of pooling on top.",
          },
          m1: {
            objective: "tobi-umbrella-parts-match",
            prompt: "Connect each part of an umbrella to its job.",
            matches: [
              { left: "Center Shaft", right: "The tall pole you hold by the handle" },
              { left: "Sliding Runner", right: "Pushes the metal stretchers up to open" },
              { left: "Flexible Ribs", right: "Spokes that stretch the roof into a dome" },
              { left: "Waxy Canopy", right: "Repels raindrops so they bead up and roll off" },
            ],
            explanation:
              "The shaft is the center pole; the runner pushes the stretchers; the ribs shape the dome; the waxy canopy repels rain.",
          },
          c2: {
            objective: "tobi-umbrella-lotus-effect",
            prompt:
              "Why do raindrops curl up into round marble shapes on a lotus leaf or raincoat?",
            correct: "Because the waxy surface repels water so the drop cannot spread out or soak in.",
            wrong: [
              "Because someone froze the rain into glass balls.",
              "Because the leaf is sucking the water inside.",
              "Because raindrops are made of hard plastic.",
            ],
            explanation:
              "When water touches a waxy water-repellent surface, it pulls itself into a round bead and rolls off easily.",
          },
          o2: {
            objective: "tobi-umbrella-two-secrets",
            prompt:
              "Explain the TWO secrets that work together to keep you dry under an umbrella: (1) what the metal ribs do, and (2) what the waxy fabric does.",
            exemplar:
              "First, the metal ribs stretch the canopy into a tight curved dome so water rolls downhill. Second, the tightly woven waxy fabric repels the water so it can't soak through!",
            rubric: [
              "Explains what the ribs do (stretch the canopy into a tight curved dome)",
              "Explains what the waxy fabric does (repels water so it beads up and doesn't soak in)",
              "Shows how both shape and material work together",
              "Uses clear, simple sentences",
            ],
            explanation:
              "Great engineering combines structure (the tight dome ribs) and material science (the water-repelling fabric).",
          },
        },
        form2: {
          c1: {
            objective: "tobi-umbrella-ribs-job",
            prompt:
              "What are the curved spokes underneath an umbrella canopy that hold its dome shape called?",
            correct: "The ribs",
            wrong: [
              "The feathers",
              "The shoelaces",
              "The whiskers",
            ],
            explanation:
              "Just like your ribs give shape to your chest, an umbrella's flexible ribs hold its canopy open in a curved dome.",
          },
          o1: {
            objective: "tobi-umbrella-dome-shape",
            prompt:
              "How did looking at a green lotus leaf in a pond help scientists design better raincoats and umbrellas?",
            exemplar:
              "Scientists saw that a lotus leaf has a waxy shield that makes water curl into round beads and roll right off. They put a waxy water-repelling shield on raincoat and umbrella fabric too!",
            rubric: [
              "Mentions the lotus leaf's waxy surface",
              "Describes water curling into beads or rolling off the leaf",
              "Connects that idea to coating raincoats or umbrellas so they repel water",
              "Uses clear everyday language",
            ],
            explanation:
              "Copying smart ideas from nature is called biomimicry—the lotus leaf inspired modern water-repellent coatings!",
          },
          m1: {
            objective: "tobi-umbrella-parts-match",
            prompt: "Connect each part of an umbrella to its job.",
            matches: [
              { left: "Center Shaft", right: "The tall pole you hold by the handle" },
              { left: "Sliding Runner", right: "Pushes the metal stretchers up to open" },
              { left: "Flexible Ribs", right: "Spokes that stretch the roof into a dome" },
              { left: "Waxy Canopy", right: "Repels raindrops so they bead up and roll off" },
            ],
            explanation:
              "The shaft is the center pole; the runner pushes the stretchers; the ribs shape the dome; the waxy canopy repels rain.",
          },
          c2: {
            objective: "tobi-umbrella-lotus-effect",
            prompt:
              "If one metal rib on your umbrella snaps, what happens to that part of the canopy in the rain?",
            correct: "That part goes loose and saggy, so rainwater can pool there instead of rolling off cleanly.",
            wrong: [
              "The whole umbrella turns into a balloon and floats away.",
              "The fabric turns into sheep's wool.",
              "The rain stops falling from the sky.",
            ],
            explanation:
              "Without the rib stretching the fabric tight, the canopy sags and collects water.",
          },
          o2: {
            objective: "tobi-umbrella-two-secrets",
            prompt:
              "Compare the microscope view of a cotton T-shirt with the microscope view of umbrella fabric. What is different about their threads?",
            exemplar:
              "The cotton T-shirt has loose threads with big spaces that soak up water. The umbrella fabric has super tightly woven threads with a waxy shield so water bounces off!",
            rubric: [
              "Describes cotton threads as loose or soaking up water",
              "Describes umbrella threads as tightly woven",
              "Mentions the waxy water-repellent shield on the umbrella fabric",
              "Explains clearly in one or two sentences",
            ],
            explanation:
              "Tight weaving leaves no gaps between threads, and the hydrophobic waxy coating stops water from clinging.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Gadol Spotlight: Rabbi Akiva & The Water Drops That Carved a Rock",
        subjects: ["Gedolim"],
        objectives: [
          "Retell how 40-year-old Akiva discovered that steady water drops carved a hollow in hard stone (Avot D'Rabbi Natan 6)",
          "Connect the water-and-stone lesson to learning Torah and good middos one step at a time",
        ],
        teaching: [
          {
            kind: "gadol",
            title: "Rabbi Akiva at the Well: How Soft Water Carved Hard Stone",
            diagram: "tobi-akiva-water-stone",
            text: `Before he became the great sage Rabbi Akiva, Akiva was a quiet shepherd who was already 40 years old and did not even know how to read the Alef-Beis! His wife Rachel encouraged him to go learn Torah, but Akiva worried: "How can a grown-up shepherd start from the very beginning when there is so much Torah to learn?"\n\nOne day, Akiva stood beside a spring of water (Avot D'Rabbi Natan, Chapter 6). He noticed a big, hard rock with a smooth, deep hollow carved right into its middle, where tiny drops of water were going drip, drop, drip from the cliff above. "Who carved this hard stone?" Akiva asked. People told him: "The water that drips on it steadily every single day!" Akiva's eyes lit up: "If soft water can carve solid rock just by dripping drop by drop every day, then Hashem's fiery words of Torah can surely carve a place in my soft heart!" Right away, Akiva went with his young son to the children's teacher to learn Alef, Beis, Gimmel—and step by step, he became Rabbi Akiva!`,
            highlight: ["Rabbi Akiva", "40 years old", "Alef-Beis", "drop by drop"],
            terms: [
              {
                word: "Rabbi Akiva",
                meaning: "One of the greatest sages of the Mishnah, who began learning Alef-Beis at age 40.",
                example: "Rabbi Akiva taught that 'V'ahavta l'rei'acha kamocha' (loving your neighbor) is a great rule of the Torah.",
              },
              {
                word: "Alef-Beis (אָלֶף־בֵּית)",
                meaning: "The Hebrew alphabet—the building blocks of every word of Torah.",
                example: "Akiva sat beside his young son to learn the Alef-Beis from the very beginning.",
              },
              {
                word: "Drip by Drop",
                meaning: "Doing a little bit every single day with steady patience until something big is accomplished.",
                example: "Just as water carves stone drip by drop, learning a little Torah each day fills our heart.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Avot D'Rabbi Natan 6:2",
                url: "https://www.sefaria.org/Avot_D'Rabbi_Natan.6.2?lang=bi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "tobi-akiva-age-start",
            prompt:
              "How old was Rabbi Akiva when he saw the water dripping on the rock and went to learn the Alef-Beis?",
            correct: "40 years old",
            wrong: [
              "3 years old",
              "12 years old",
              "100 years old",
            ],
            explanation:
              "Avot D'Rabbi Natan teaches that Akiva was a 40-year-old shepherd when he began learning the Alef-Beis from the beginning.",
          },
          o1: {
            objective: "tobi-akiva-water-lesson",
            prompt:
              "What did Akiva see at the spring, and how did that convince him that he could learn Torah?",
            exemplar:
              "He saw that soft water dripping every day had carved a deep hollow inside a hard rock. He realized that if soft water can carve hard stone drop by drop, then Torah words can surely shape his soft heart!",
            rubric: [
              "Mentions the water dripping on the hard rock and carving a hollow",
              "Contrasts soft water/hard stone with Torah words/a person's soft heart",
              "Explains that steady daily drops (little by little) made the difference",
              "Uses clear, age-appropriate sentences",
            ],
            explanation:
              "Akiva reasoned from minor to major: if gentle water shapes solid stone through steady daily drops, Torah can certainly shape a human heart.",
          },
          m1: {
            objective: "tobi-akiva-story-match",
            prompt: "Connect each part of Rabbi Akiva's story to what it teaches.",
            matches: [
              { left: "Soft water drops", right: "Like learning a little bit of Torah every day" },
              { left: "Hard boulder at the spring", right: "Even something tough changes with steady patience" },
              { left: "Rachel (Akiva's wife)", right: "Encouraged Akiva to go learn Torah" },
              { left: "Alef, Beis, Gimmel", right: "The first Hebrew letters Akiva learned with his son" },
            ],
            explanation:
              "Soft water is like daily Torah; the boulder shows steady patience works; Rachel encouraged him; Alef-Beis was his first step.",
          },
          c2: {
            objective: "tobi-akiva-why-single-splash",
            prompt:
              "Why did the water carve a hollow in the rock when a single bucket of water splashed once would not?",
            correct: "Because the drops fell steadily on the same spot day after day without stopping.",
            wrong: [
              "Because the water was made of iron hammers.",
              "Because the rock was made of soft butter.",
              "Because a giant stepped on the stone.",
            ],
            explanation:
              "Steady consistency—one drop after another every day—accomplishes what a single splash cannot.",
          },
          o2: {
            objective: "tobi-akiva-personal-apply",
            prompt:
              "Think of something that feels big or tricky to learn (like reading Hebrew, playing an instrument, or jumping rope). How can Rabbi Akiva's 'drop by drop' secret help you?",
            exemplar:
              "Instead of giving up because it looks too big, I can practice just a little bit every single day—drop by drop—until I get really good at it!",
            rubric: [
              "Names a skill or goal or talks about practicing",
              "Applies the 'drop by drop' / little-by-little every day idea",
              "Explains that steady daily practice adds up over time",
              "Expresses an encouraging thought in the child's own words",
            ],
            explanation:
              "Big achievements happen one small, steady step at a time—just like water drops carving stone.",
          },
        },
        form2: {
          c1: {
            objective: "tobi-akiva-age-start",
            prompt:
              "What was Akiva's job before he went to learn the Alef-Beis?",
            correct: "He was a shepherd caring for sheep.",
            wrong: [
              "He was a hot-air balloon pilot.",
              "He was a piano builder.",
              "He was a ship captain.",
            ],
            explanation:
              "Akiva was a shepherd for 40 years before he began studying Torah.",
          },
          o1: {
            objective: "tobi-akiva-water-lesson",
            prompt:
              "Why wasn't Akiva embarrassed to sit with young children and his own son to learn the Alef-Beis?",
            exemplar:
              "He knew that everyone has to start with the first drop—Alef, Beis, Gimmel—and that steady learning every day would fill his heart with Torah!",
            rubric: [
              "Explains that every big journey starts with small first steps (Alef-Beis)",
              "Connects to the water-drop lesson of learning little by little",
              "Shows that Akiva cared deeply about learning Torah",
              "Explains clearly in one or two simple sentences",
            ],
            explanation:
              "Just as a deep hollow starts with the very first drop of water, becoming a Torah scholar starts with learning Alef and Beis.",
          },
          m1: {
            objective: "tobi-akiva-story-match",
            prompt: "Connect each part of Rabbi Akiva's story to what it teaches.",
            matches: [
              { left: "Soft water drops", right: "Like learning a little bit of Torah every day" },
              { left: "Hard boulder at the spring", right: "Even something tough changes with steady patience" },
              { left: "Rachel (Akiva's wife)", right: "Encouraged Akiva to go learn Torah" },
              { left: "Alef, Beis, Gimmel", right: "The first Hebrew letters Akiva learned with his son" },
            ],
            explanation:
              "Soft water is like daily Torah; the boulder shows steady patience works; Rachel encouraged him; Alef-Beis was his first step.",
          },
          c2: {
            objective: "tobi-akiva-why-single-splash",
            prompt:
              "In Rabbi Akiva's comparison, if the dripping water is like words of Torah, what is our heart like?",
            correct: "Even softer than stone—so Torah words can touch and shape our heart even more easily!",
            wrong: [
              "Harder than steel armor.",
              "Like a plastic umbrella that pushes Torah away.",
              "Like a balloon that floats to the moon.",
            ],
            explanation:
              "Akiva said: if water can carve hard rock, how much more can Hashem's Torah shape a soft, living human heart!",
          },
          o2: {
            objective: "tobi-akiva-personal-apply",
            prompt:
              "Suppose a friend says, 'This book is too long—I'll never finish it!' What could you tell your friend about Rabbi Akiva and the water drop?",
            exemplar:
              "I would tell my friend how Rabbi Akiva saw tiny water drops carve a hard rock by dripping every day. If you read just one page each day, drop by drop, you'll finish the whole book!",
            rubric: [
              "Mentions Rabbi Akiva or the water drops carving the rock",
              "Advises reading or practicing a little bit each day",
              "Encourages the friend not to give up",
              "Uses clear, friendly words",
            ],
            explanation:
              "One page a day—just like one drop at a time—turns a giant book into an easy, joyful adventure.",
          },
        },
      },
    ],
  },
];
