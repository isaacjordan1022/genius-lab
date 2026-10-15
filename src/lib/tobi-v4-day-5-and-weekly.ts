import type { Question } from "./content-types";
import {
  placeCorrect,
  type ChoiceSpec,
  type DayBlueprint,
  type MatchSpec,
  type OpenSpec,
} from "./v4-types";

export const TOBI_DAY_5: DayBlueprint = {
  order: 5,
  title: "Day 5 · How Hot-Air Balloons Float & Shabbos Table Detective",
  readingPassage: {
    title: "The Giant Rainbow That Rose Into the Sky",
    text: `At dawn on Sunday, seven-year-old Yonah stood in a grassy field watching a pilot unroll a giant rainbow cloth called an envelope. The cloth lay flat on the dew until the pilot turned on a fan and lit a roaring burner flame. Whoosh! Warm air rushed inside, and the giant balloon stood up tall above its woven wicker basket!

"How can a bag of air lift a heavy basket and people without wings or a propeller?" Yonah asked. The pilot smiled. "Cool morning air outside is crowded and heavy. When the burner heats the air inside the envelope, the air particles bounce fast and spread far apart—making the warm air inside much lighter than the cool air outside!"

As the balloon floated gently upward, the pilot pointed to a red cord hanging from the very top. "When we're ready to land, I pull that cord to open a top vent and let some hot air out so we float softly back to the grass!"`,
    words: [
      {
        word: "envelope",
        meaning: "The giant fabric bag of a hot-air balloon that holds the warm air.",
        example: "When the burner flame heated the air, the colorful envelope stood tall.",
      },
      {
        word: "expand",
        meaning: "To spread out and take up more space.",
        example: "When air gets hot, its tiny particles bounce fast and expand.",
      },
      {
        word: "buoyant",
        meaning: "Able to float upward in water or air because it is lighter than what surrounds it.",
        example: "Warm air inside the balloon is buoyant in the cooler, heavier air outside.",
      },
      {
        word: "gentle",
        meaning: "Soft, calm, and careful—not rough or sudden.",
        example: "Opening the top vent lets the balloon make a gentle landing on the grass.",
      },
    ],
  },
  chunks: [
    {
      idSuffix: "chunk-1",
      title: "Word Workshop & Story: The Giant Rainbow That Rose Into the Sky",
      subjects: ["Vocabulary", "Reading & thinking"],
      objectives: [
        "Use envelope, expand, buoyant, and gentle accurately in context",
        "Explain using story details why warm air inside a balloon lifts it and how the top vent helps it land",
      ],
      teaching: [
        {
          kind: "vocabulary",
          title: "Unlock Today's 4 Power Words",
          diagram: "tobi-balloon-hotair-lab",
          text: "Tap each card to unlock its meaning and example sentence, then play the Word Lightning Check!",
          highlight: ["envelope", "expand", "buoyant", "gentle"],
          terms: [
            {
              word: "envelope",
              meaning: "The giant fabric bag of a hot-air balloon that holds the warm air.",
              example: "When the burner flame heated the air, the colorful envelope stood tall.",
            },
            {
              word: "expand",
              meaning: "To spread out and take up more space.",
              example: "When air gets hot, its tiny particles bounce fast and expand.",
            },
            {
              word: "buoyant",
              meaning: "Able to float upward in water or air because it is lighter than what surrounds it.",
              example: "Warm air inside the balloon is buoyant in the cooler, heavier air outside.",
            },
            {
              word: "gentle",
              meaning: "Soft, calm, and careful—not rough or sudden.",
              example: "Opening the top vent lets the balloon make a gentle landing on the grass.",
            },
          ],
        },
        {
          kind: "passage",
          title: "The Giant Rainbow That Rose Into the Sky",
          diagram: "tobi-balloon-hotair-lab",
          text: `At dawn on Sunday, seven-year-old Yonah stood in a grassy field watching a pilot unroll a giant rainbow cloth called an envelope. The cloth lay flat on the dew until the pilot turned on a fan and lit a roaring burner flame. Whoosh! Warm air rushed inside, and the giant balloon stood up tall above its woven wicker basket!\n\n"How can a bag of air lift a heavy basket and people without wings or a propeller?" Yonah asked. The pilot smiled. "Cool morning air outside is crowded and heavy. When the burner heats the air inside the envelope, the air particles bounce fast and spread far apart—making the warm air inside much lighter than the cool air outside!"\n\nAs the balloon floated gently upward, the pilot pointed to a red cord hanging from the very top. "When we're ready to land, I pull that cord to open a top vent and let some hot air out so we float softly back to the grass!"`,
          highlight: ["envelope", "burner", "lighter", "vent"],
        },
      ],
      form1: {
        c1: {
          objective: "tobi-day5-vocab-envelope",
          prompt:
            "In “The Giant Rainbow That Rose Into the Sky,” what is the giant colorful fabric bag of a hot-air balloon called?",
          correct: "The envelope",
          wrong: [
            "The fleece",
            "The soundboard",
            "The hexagon",
          ],
          explanation:
            "Paragraph 1 tells us the giant rainbow cloth bag that holds the warm air is called an envelope.",
        },
        o1: {
          objective: "tobi-day5-reading-why-float",
          prompt:
            "According to the pilot in paragraph 2, how is the warm air inside the balloon different from the cool morning air outside?",
          exemplar:
            "The cool morning air outside is crowded and heavy. When the burner heats the air inside the balloon, the air particles bounce fast and spread far apart, making the warm air inside much lighter!",
          rubric: [
            "Describes cool outside air as crowded or heavy",
            "Describes warm inside air particles as bouncing fast or spreading apart",
            "Explains that the warm air inside is lighter than the cool air outside",
            "Uses one or two clear sentences",
          ],
          explanation:
            "Heating air makes its particles spread apart (expand), so the giant bubble of warm air weighs less than the cool air around it.",
        },
        m1: {
          objective: "tobi-day5-vocab-match",
          prompt: "Match each word from today's lesson to its meaning.",
          matches: [
            { left: "Envelope", right: "The giant fabric bag that holds warm air" },
            { left: "Expand", right: "Spread out and take up more space" },
            { left: "Buoyant", right: "Able to float upward because it is lighter" },
            { left: "Gentle", right: "Soft, calm, and not rough" },
          ],
          explanation:
            "Envelope is the balloon bag; expand means spread out; buoyant means able to float; gentle means soft and calm.",
        },
        c2: {
          objective: "tobi-day5-reading-vent",
          prompt:
            "In paragraph 3, what happens when the pilot pulls the red cord connected to the top vent?",
          correct: "Some hot air escapes out the top so the balloon floats gently down to land.",
          wrong: [
            "Rocket boosters shoot the balloon to the moon.",
            "Giant wings pop out of the wicker basket.",
            "The balloon turns into a submarine.",
          ],
          explanation:
            "Pulling the red cord opens the parachute vent at the top, letting hot air out so the balloon descends smoothly.",
        },
        o2: {
          objective: "tobi-day5-dawn-apply",
          prompt:
            "Why do you think hot-air balloon pilots love to fly early in the morning at dawn when the outdoor air is nice and cool?",
          exemplar:
            "When the outdoor air at dawn is extra cool and heavy, the warm air inside the balloon is much lighter by comparison, so the balloon lifts off even more easily!",
          rubric: [
            "Mentions that dawn/morning air outside is cool and heavy",
            "Contrasts cool outside air with the warm air inside the balloon",
            "Explains that a bigger difference makes it easier for the balloon to float up",
            "Uses clear everyday words",
          ],
          explanation:
            "Cooler outdoor air is denser and heavier, giving the warm air inside the envelope even stronger lift (buoyancy)!",
        },
      },
      form2: {
        c1: {
          objective: "tobi-day5-vocab-envelope",
          prompt:
            "What does the word “expand” mean when we heat up air inside a balloon?",
          correct: "The air particles spread out and take up more space.",
          wrong: [
            "The air freezes into a tiny ice cube.",
            "The air turns into solid rock.",
            "The air disappears completely.",
          ],
          explanation:
            "Expand means to spread out—heated air particles bounce faster and push farther apart.",
        },
        o1: {
          objective: "tobi-day5-reading-why-float",
          prompt:
            "How does a hot-air balloon pilot make the balloon go UP, and how does the pilot make it come DOWN? Use details from paragraphs 2 and 3!",
          exemplar:
            "To go up, the pilot fires the burner flame to heat the air inside so it spreads out and becomes lighter. To come down, the pilot lets the air cool or pulls the red cord to let hot air out the top vent!",
          rubric: [
            "Explains how to go up (fire the burner / heat the air inside)",
            "Explains why hot air goes up (particles spread out / lighter)",
            "Explains how to come down (pull the red cord / open the top vent / let air cool)",
            "Uses clear, simple sentences",
          ],
          explanation:
            "Burner flame = warmer, lighter air (climb); top parachute vent = let hot air escape (descend)!",
        },
        m1: {
          objective: "tobi-day5-vocab-match",
          prompt: "Match each word from today's lesson to its meaning.",
          matches: [
            { left: "Envelope", right: "The giant fabric bag that holds warm air" },
            { left: "Expand", right: "Spread out and take up more space" },
            { left: "Buoyant", right: "Able to float upward because it is lighter" },
            { left: "Gentle", right: "Soft, calm, and not rough" },
          ],
          explanation:
            "Envelope is the balloon bag; expand means spread out; buoyant means able to float; gentle means soft and calm.",
        },
        c2: {
          objective: "tobi-day5-reading-vent",
          prompt:
            "Does a hot-air balloon have wings or a spinning propeller to fly?",
          correct: "No — it floats because the giant bubble of warm air inside is lighter than the cool air outside!",
          wrong: [
            "Yes, it has four jet engines under the basket.",
            "Yes, it flaps giant feathers like an eagle.",
            "It is pulled by a helicopter rope.",
          ],
          explanation:
            "Hot-air balloons are 'lighter-than-air' craft that rise purely by buoyancy!",
        },
        o2: {
          objective: "tobi-day5-dawn-apply",
          prompt:
            "What would happen if the pilot never turned on the burner flame and only blew cool outdoor air into the balloon with a fan? Would it float up? Why or why not?",
          exemplar:
            "No, it would not float up! If the air inside is the exact same cool temperature as the air outside, it is just as crowded and heavy, so it cannot lift the basket.",
          rubric: [
            "Says no, the balloon would not float up",
            "Explains that cool air inside is just as heavy/crowded as cool air outside",
            "Explains that heat is needed to make the inside air spread out and become lighter",
            "Uses clear cause-and-effect thinking",
          ],
          explanation:
            "The cold fan only puffs the bag open on the ground—it takes the burner's heat to make the air inside lighter than the air outside!",
        },
      },
    },
    {
      idSuffix: "chunk-2",
      title: "How Things Work: Burners, Ripstop Nylon & Wicker Baskets",
      subjects: ["How things work"],
      objectives: [
        "Explain the job of the burner, ripstop nylon envelope, parachute vent, and woven wicker basket",
        "Compare crowded cool air particles with spread-out warm air particles",
      ],
      teaching: [
        {
          kind: "mechanism",
          title: "Inside the Hot-Air Balloon: 4 Smart Engineering Parts",
          diagram: "tobi-balloon-hotair-lab",
          text: `Look at the cutaway diagram of the hot-air balloon! Four clever parts work together to carry passengers safely across the sky:\n\n1. The Burner: Mounted right above the passengers' heads, it burns propane gas to shoot a tall flame into the balloon whenever the pilot wants to climb. 2. The Ripstop Nylon Envelope: Sewn with crisscross reinforcing threads so a tiny pinhole can never tear wider, it holds a giant bubble of warm air! 3. The Parachute Vent: A round flap at the very top that opens when the pilot pulls a red cord to let hot air out for landing, then seals itself shut again when released! 4. The Woven Wicker Basket: Why use woven willow reeds instead of stiff metal? Because woven wicker is super lightweight AND flexes like a springy cushion when the basket touches down on the grass!`,
          highlight: ["Burner", "Envelope", "Parachute Vent", "Wicker Basket"],
          terms: [
            {
              word: "Propane Burner",
              meaning: "The heater above the basket that shoots a tall flame into the envelope to warm the air.",
              example: "A two-second blast from the propane burner makes the balloon climb higher.",
            },
            {
              word: "Parachute Vent",
              meaning: "A round door at the top of the balloon that lets hot air out when the pilot pulls a cord.",
              example: "Opening the parachute vent lets the balloon float gently down to the field.",
            },
            {
              word: "Woven Wicker Basket",
              meaning: "A lightweight basket woven from flexible plant reeds that cushions the landing like a spring.",
              example: "A metal box would thud hard on landing, but a woven wicker basket flexes softly!",
            },
          ],
          sources: [
            {
              label: "Smithsonian National Air and Space Museum · Hot-Air Balloons",
              url: "https://airandspace.si.edu/explore/stories/hot-air-balloons",
            },
          ],
        },
      ],
      form1: {
        c1: {
          objective: "tobi-balloon-wicker-why",
          prompt:
            "Why do hot-air balloons carry passengers in a woven wicker basket instead of a heavy steel box?",
          correct: "Woven wicker is lightweight AND flexes like a springy cushion when landing on the grass!",
          wrong: [
            "Because wicker baskets can swim underwater.",
            "Because steel boxes melt in the sun.",
            "Because birds built the basket.",
          ],
          explanation:
            "Wicker is both light (so the balloon can lift more) and flexible (so it absorbs the bump of landing without cracking).",
        },
        o1: {
          objective: "tobi-balloon-microscope-zoom",
          prompt:
            "Look at the two microscope zoom circles on the Hot-Air Balloon diagram (Left Zoom vs. Right Zoom). How do the air particles look different inside the hot balloon compared to the cool air outside?",
          exemplar:
            "In the Left Zoom (cool outside air), the blue air dots are packed closely together and heavy. In the Right Zoom (hot inside air), the red/orange air dots bounce fast and spread far apart so the inside air is lighter!",
          rubric: [
            "Describes cool outside air particles as crowded/packed together",
            "Describes hot inside air particles as bouncing fast and spread far apart",
            "Connects fewer/spread-out particles inside to being lighter",
            "Uses clear, simple sentences",
          ],
          explanation:
            "Because the hot air particles spread far apart, a balloon full of hot air has fewer particles inside than the same size bubble of cool air—making it lighter!",
        },
        m1: {
          objective: "tobi-balloon-parts-match",
          prompt: "Connect each part of a hot-air balloon to its job.",
          matches: [
            { left: "Propane Burner", right: "Shoots a flame to heat the air inside" },
            { left: "Nylon Envelope", right: "Giant colorful bag that holds warm air" },
            { left: "Top Parachute Vent", right: "Opens to let hot air out for landing" },
            { left: "Woven Wicker Basket", right: "Lightweight & flexes softly on touchdown" },
          ],
          explanation:
            "The burner heats air; the envelope holds it; the top vent releases hot air; the wicker basket cushions landings.",
        },
        c2: {
          objective: "tobi-balloon-open-bottom",
          prompt:
            "Why is the bottom mouth of a hot-air balloon left open right above the burner?",
          correct: "So the burner flame can shoot warm air inside and expanding air can push out the bottom!",
          wrong: [
            "Because the builder ran out of cloth.",
            "So birds can fly through the balloon.",
            "To catch rainwater inside the bag.",
          ],
          explanation:
            "The open mouth lets the burner heat the air inside while excess air pushes out the bottom as the heated air expands!",
        },
        o2: {
          objective: "tobi-balloon-steer-wind",
          prompt:
            "A hot-air balloon has no steering wheel! If the wind near the ground is blowing East, and the wind high up is blowing West, how can the pilot use the burner and vent to change direction?",
          exemplar:
            "The pilot can fire the burner to climb higher into the West wind, or open the vent to drop lower into the East wind!",
          rubric: [
            "Explains that the pilot climbs higher or drops lower",
            "Mentions using the burner to rise or the vent/cooling to go down",
            "Connects changing height to catching the wind blowing in the direction they want",
            "Uses clear reasoning",
          ],
          explanation:
            "Balloon pilots steer by changing altitude—rising or descending to catch wind currents blowing in different directions!",
        },
      },
      form2: {
        c1: {
          objective: "tobi-balloon-wicker-why",
          prompt:
            "Where is the parachute vent located on a hot-air balloon, and why is it placed there?",
          correct: "At the very top of the balloon, because hot air rises to the top!",
          wrong: [
            "Underneath the floor of the wicker basket.",
            "In the pilot's pocket.",
            "Tied to a tree on the ground.",
          ],
          explanation:
            "Since hot air naturally rises to the top of the envelope, putting the vent at the crown lets hot air escape whenever the pilot pulls the cord.",
        },
        o1: {
          objective: "tobi-balloon-microscope-zoom",
          prompt:
            "Why does a hot-air balloon slowly sink back toward the ground if the pilot stops firing the burner for a long time?",
          exemplar:
            "When the burner is off, the air inside the balloon slowly cools down. As it cools, the air particles slow down and crowd back together, so the balloon isn't lighter than the outside air anymore!",
          rubric: [
            "Says the air inside the balloon cools down",
            "Explains that cooled air particles slow down or crowd back together",
            "Concludes that the balloon becomes heavier / loses lift and sinks gently",
            "Uses clear, simple sentences",
          ],
          explanation:
            "To stay aloft, the pilot gives short blasts of the burner every minute or two to keep the inside air warm and spread out.",
        },
        m1: {
          objective: "tobi-balloon-parts-match",
          prompt: "Connect each part of a hot-air balloon to its job.",
          matches: [
            { left: "Propane Burner", right: "Shoots a flame to heat the air inside" },
            { left: "Nylon Envelope", right: "Giant colorful bag that holds warm air" },
            { left: "Top Parachute Vent", right: "Opens to let hot air out for landing" },
            { left: "Woven Wicker Basket", right: "Lightweight & flexes softly on touchdown" },
          ],
          explanation:
            "The burner heats air; the envelope holds it; the top vent releases hot air; the wicker basket cushions landings.",
        },
        c2: {
          objective: "tobi-balloon-open-bottom",
          prompt:
            "Why is the balloon envelope sewn from special 'ripstop' nylon with strong crisscross squares?",
          correct: "So if the cloth gets a tiny poke, the strong squares stop the tear from spreading!",
          wrong: [
            "To make the balloon as heavy as lead.",
            "So water can soak into the cloth.",
            "To make the balloon invisible.",
          ],
          explanation:
            "Ripstop nylon has thicker threads woven in a grid so any small nick is trapped inside one tiny square and cannot rip across the balloon!",
        },
        o2: {
          objective: "tobi-balloon-steer-wind",
          prompt:
            "Tell two reasons why a woven wicker basket is better for a hot-air balloon landing than a stiff wooden crate!",
          exemplar:
            "First, woven wicker is super light so the balloon can lift it easily. Second, when the basket touches the ground, the woven reeds bend and flex like a spring so the landing feels soft instead of bumpy!",
          rubric: [
            "Mentions that wicker is lightweight",
            "Mentions that wicker bends, flexes, or cushions the landing",
            "Contrasts with a heavy or stiff crate that could crack or bump hard",
            "Uses clear everyday words",
          ],
          explanation:
            "Even with modern space-age fabrics above, woven willow wicker is still the world's best material for balloon baskets!",
        },
      },
    },
    {
      idSuffix: "chunk-3",
      title: "Halacha in Action: Shabbos Table Detective (Picking Treats & Muktzeh)",
      subjects: ["Halacha"],
      objectives: [
        "Apply the Shabbos fruit-bowl rule (Borer): pick the treat you want to eat right now by hand",
        "Distinguish Shabbos Treasures we can freely move from Muktzeh items that rest on Shabbos",
      ],
      teaching: [
        {
          kind: "halacha",
          title: "Shabbos Detective: Picking Your Favorite Treats & Spotting Muktzeh",
          diagram: "tobi-shabbos-treasure-sorting",
          text: `On Shabbos, even eating a bowl of fruit salad or picking up items in your room has special Torah rules! First, imagine a mixed bowl of strawberries and melon cubes at the Shabbos table, and you only want the strawberries. How do you pick them permissibly (without doing the forbidden sorting of Borer)? Remember three easy rules: (1) Pick the GOOD treat you want to eat out of the bowl (never pull out the pieces you don't want!), (2) Pick by HAND or with your regular fork/spoon (never use a strainer), and (3) Do it right before eating NOW!\n\nSecond, what about objects around the house? Shabbos Treasures like your Siddur, storybook, Kiddush cup, fork, and Shabbos board games are permitted vessels—you can move and enjoy them anytime! But weekday items like coins, crayons, scissors, and backyard rocks or sticks are Muktzeh ("set aside")—we let them rest untouched all Shabbos until Havdalah on Saturday night!`,
          highlight: ["Borer", "GOOD treat", "by HAND", "NOW", "Muktzeh", "Havdalah"],
          terms: [
            {
              word: "Pick the Good (Borer Rule)",
              meaning: "Always take the food you want to eat out of a mixed bowl by hand right before eating.",
              example: "Reach in and take the sweet strawberry you want to eat now—leave the unwanted pieces in the bowl!",
            },
            {
              word: "Shabbos Treasures (Permitted)",
              meaning: "Items we use on Shabbos—like a Siddur, storybook, cup, plate, or Shabbos game—that we may move freely.",
              example: "You can carry your Siddur and Shabbos storybook from the table to the couch.",
            },
            {
              word: "Muktzeh (מֻקְצֶה)",
              meaning: "Weekday items (like coins, crayons, and rocks) that are set aside and not moved on Shabbos.",
              example: "Coins and crayons are Muktzeh, so we leave them untouched until after Havdalah!",
            },
          ],
          sources: [
            {
              label: "Sefaria · Shulchan Aruch Orach Chaim 319 & 308",
              url: "https://www.sefaria.org/Shulchan_Arukh%2C_Orach_Chayim.319.1?lang=bi",
            },
          ],
        },
      ],
      form1: {
        c1: {
          objective: "tobi-halacha-fruit-bowl",
          prompt:
            "At the Shabbos lunch table, a bowl has mixed grapes and cherries, and you only want to eat the cherries right now. What is the right way to take them?",
          correct: "Reach in by hand (or spoon) and pick out the cherries you want to eat right now, leaving the grapes in the bowl!",
          wrong: [
            "Pick out all the grapes you don't want and throw them on a plate.",
            "Pour the bowl through a kitchen strainer.",
            "Sort them four hours early to save for tonight.",
          ],
          explanation:
            "On Shabbos we always take the good food we want to eat (Ochel) from the mixture, by hand, right before eating!",
        },
        o1: {
          objective: "tobi-halacha-three-treat-rules",
          prompt:
            "Tell a younger brother or sister the THREE easy rules for picking your favorite snack out of a mixed bowl on Shabbos!",
          exemplar:
            "1. Pick the good treat you want to eat (don't pull out the unwanted ones). 2. Use your hand or regular spoon (no strainer). 3. Pick it right before you eat it now!",
          rubric: [
            "Rule 1: Take the good food you want to eat (not the unwanted part)",
            "Rule 2: Pick by hand or regular eating utensil (no strainer)",
            "Rule 3: Pick it to eat right now (immediately)",
            "Explains clearly in simple words",
          ],
          explanation:
            "Good food + By hand + Right now = the three keys of permissible sorting on Shabbos!",
        },
        m1: {
          objective: "tobi-halacha-muktzeh-match",
          prompt: "Sort each item: is it a Shabbos Treasure or Muktzeh?",
          matches: [
            { left: "Siddur & Shabbos Storybook", right: "Shabbos Treasure — free to move and read!" },
            { left: "Shiny Coins & Dollar Bills", right: "Muktzeh — do not touch or move on Shabbos" },
            { left: "Crayons & Markers", right: "Muktzeh — weekday coloring tools take a rest" },
            { left: "Picking Strawberries You Want Now", right: "Permitted — taking good food by hand for right now" },
          ],
          explanation:
            "Siddurim and storybooks are permitted Shabbos items; coins and crayons are Muktzeh; picking the strawberry you want to eat now by hand is permitted.",
          },
        c2: {
          objective: "tobi-halacha-muktzeh-meaning",
          prompt:
            "Which of these items is Muktzeh and should NOT be picked up when you are playing on Shabbos afternoon?",
          correct: "A shiny quarter or a smooth gray rock on the porch",
          wrong: [
            "Your favorite Shabbos storybook",
            "A plastic drinking cup for grape juice",
            "A clean dinner napkin",
          ],
          explanation:
            "Coins and rocks have no permitted Shabbos use—they are Muktzeh and stay untouched all Shabbos.",
        },
        o2: {
          objective: "tobi-halacha-muktzeh-why-special",
          prompt:
            "How does letting weekday things like coins, crayons, and phones rest untouched (Muktzeh) help make Shabbos feel like a royal palace of Menucha?",
          exemplar:
            "When we don't touch money, crayons, or weekday work tools, our hands and minds remember that today is holy Shabbos—a peaceful day for family, Torah, songs, and rest!",
          rubric: [
            "Mentions setting aside weekday items like coins, crayons, or tools",
            "Explains that it reminds us Shabbos is different from ordinary weekdays",
            "Connects to peace, Menucha, family, or honoring Shabbos",
            "Written warmly in the child's own words",
          ],
          explanation:
            "The Rambam explains that Muktzeh makes Shabbos tangibly different from weekdays so our whole home feels peaceful and holy!",
        },
      },
      form2: {
        c1: {
          objective: "tobi-halacha-fruit-bowl",
          prompt:
            "Suppose a bowl of trail mix has raisins and pretzels, and you DO NOT like raisins. What should you do on Shabbos?",
          correct: "Pick out the pretzels you DO want to eat right now, and leave the raisins in the bowl!",
          wrong: [
            "Pick out all the raisins you don't like and throw them away.",
            "Use a sifter to shake the raisins out.",
            "Sort them into two jars for next week.",
          ],
          explanation:
            "Never pull out the part you don't want—always reach in and take the pretzels you DO want to eat right now!",
        },
        o1: {
          objective: "tobi-halacha-three-treat-rules",
          prompt:
            "Why is it forbidden on Shabbos to pull the unwanted peels or broken shells OUT of a mixed nut bowl, and what should you do instead?",
          exemplar:
            "Pulling out the unwanted shells is forbidden sorting (Borer) on Shabbos! Instead, reach in by hand and take out the good nut meat you want to eat right now.",
          rubric: [
            "Explains that removing the unwanted shells/waste is forbidden (Borer)",
            "States the right way: take the good nut/food you want to eat",
            "Mentions doing it by hand or right before eating",
            "Uses clear, simple sentences",
          ],
          explanation:
            "Taking the good food (Ochel) from the mixture right before eating is the normal way of eating, not weekday sorting work!",
        },
        m1: {
          objective: "tobi-halacha-muktzeh-match",
          prompt: "Sort each item: is it a Shabbos Treasure or Muktzeh?",
          matches: [
            { left: "Siddur & Shabbos Storybook", right: "Shabbos Treasure — free to move and read!" },
            { left: "Shiny Coins & Dollar Bills", right: "Muktzeh — do not touch or move on Shabbos" },
            { left: "Crayons & Markers", right: "Muktzeh — weekday coloring tools take a rest" },
            { left: "Picking Strawberries You Want Now", right: "Permitted — taking good food by hand for right now" },
          ],
          explanation:
            "Siddurim and storybooks are permitted Shabbos items; coins and crayons are Muktzeh; picking the strawberry you want to eat now by hand is permitted.",
        },
        c2: {
          objective: "tobi-halacha-muktzeh-meaning",
          prompt:
            "When does Muktzeh stop being off-limits so we can use crayons, scissors, and coins again?",
          correct: "On Saturday night after Shabbos ends and we make Havdalah!",
          wrong: [
            "At Friday night dinner.",
            "During Shabbos morning Kiddush.",
            "Right before lighting Shabbos candles.",
          ],
          explanation:
            "Once three stars come out on Saturday night and we say Havdalah, the new week begins and weekday items are permitted again.",
        },
        o2: {
          objective: "tobi-halacha-muktzeh-why-special",
          prompt:
            "If you see a box of crayons sitting on a chair on Shabbos and you want to sit down, why shouldn't you pick up the crayons with your hands to draw—and who can you ask for help if the chair is needed?",
          exemplar:
            "Crayons are Muktzeh because drawing and writing are weekday work! I shouldn't pick them up to color on Shabbos, and I can ask a parent how to clear the chair permissibly.",
          rubric: [
            "Identifies crayons as Muktzeh because drawing/coloring is forbidden on Shabbos",
            "Says not to pick them up to color on Shabbos",
            "Mentions asking a parent or tilting/clearing permissibly if the chair spot is needed",
            "Uses clear, age-appropriate words",
          ],
          explanation:
            "Knowing which items are Muktzeh makes you a sharp Shabbos Detective!",
        },
      },
    },
  ],
};

// ============================================================================
// TOBI'S 24-QUESTION WEEKLY CHALLENGE (CUMULATIVE REVIEW — ZERO MATH)
// ============================================================================
type WeeklyItemSpec =
  | ({ kind: "choice" } & ChoiceSpec)
  | ({ kind: "match" } & MatchSpec)
  | ({ kind: "open" } & OpenSpec);

const TOBI_WEEKLY_FORM_1: WeeklyItemSpec[] = [
  {
    kind: "choice",
    objective: "tobi-wk-fleece",
    prompt: "What is a sheep's thick, fluffy coat of wool called when it is clipped off in springtime?",
    correct: "A fleece",
    wrong: ["A canopy", "An envelope", "A soundboard"],
    explanation: "A sheep's woolly coat comes off in one fluffy blanket called a fleece.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-spinning",
    prompt: "Why do we twist short wool hairs on a spinning wheel?",
    correct: "So the tiny scales on each hair grip together into a strong strand of yarn!",
    wrong: ["To melt the wool into plastic.", "To wash mud onto the sheep.", "To make the wool shorter."],
    explanation: "Twisting locks the microscopic scales on wool fibers together so they don't slip apart.",
  },
  {
    kind: "open",
    objective: "tobi-wk-sweater-warmth",
    prompt: "Explain how a knitted wool sweater keeps you warm on a cold day even though the sweater doesn't have a heater inside!",
    exemplar: "Your own body makes warmth, and the fuzzy knitted loops of the sweater trap tiny pockets of warm air right next to your skin!",
    rubric: [
      "Mentions that your body makes the warmth",
      "Mentions the fuzzy wool or knitted loops",
      "Explains that the loops trap pockets of warm air",
      "Uses clear, simple sentences",
    ],
    explanation: "Trapped pockets of still air inside knitted wool loops hold your body heat close to you.",
  },
  {
    kind: "match",
    objective: "tobi-wk-wool-match",
    prompt: "Match each wool-making step to its job.",
    matches: [
      { left: "Shearing", right: "Giving the sheep a gentle spring haircut" },
      { left: "Carding", right: "Brushing tangled wool into a soft cloud" },
      { left: "Spinning", right: "Twisting wool hairs into strong yarn" },
      { left: "Knitting", right: "Looping yarn to trap warm air pockets" },
    ],
    explanation: "Shearing clips; carding brushes; spinning twists yarn; knitting loops the yarn.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-bereishis-menucha",
    prompt: "According to Rashi on Parshat Bereishis, what came to the world when Shabbos arrived on the seventh day?",
    correct: "Menucha — peaceful rest that completed Creation!",
    wrong: ["A Flood of water", "More weekday building work", "A flock of ravens"],
    explanation: "Rashi teaches: 'Baa Shabbos, Baa Menucha'—when Shabbos came, peaceful rest came.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-umbrella-repel",
    prompt: "What does the waxy coating on an umbrella canopy or lotus leaf do to raindrops?",
    correct: "It repels the water so raindrops curl into round beads and roll right off!",
    wrong: ["It absorbs the water like a sponge.", "It freezes the rain into snow.", "It turns the rain into honey."],
    explanation: "Repel means push away—water beads up on a waxy surface and rolls off the curved dome.",
  },
  {
    kind: "open",
    objective: "tobi-wk-umbrella-vs-cotton",
    prompt: "Why does a raindrop soak into a cotton T-shirt right away, while it bounces and rolls off an umbrella canopy?",
    exemplar: "Cotton has loose threads that absorb water like a sponge. An umbrella canopy has tightly woven threads and a waxy shield that repels water!",
    rubric: [
      "Says cotton has loose threads or absorbs water",
      "Says umbrella fabric has tightly woven threads",
      "Mentions the waxy water-repelling shield on the umbrella",
      "Explains clearly in one or two sentences",
    ],
    explanation: "Tight weaving plus a waxy water-repellent coating stops water from soaking through.",
  },
  {
    kind: "match",
    objective: "tobi-wk-words-match-1",
    prompt: "Match each power word from this week to its meaning.",
    matches: [
      { left: "Absorb", right: "Soak up liquid like a sponge" },
      { left: "Repel", right: "Push water away so it rolls off" },
      { left: "Hexagon", right: "A shape with six straight sides" },
      { left: "Nectar", right: "Sweet flower liquid collected by bees" },
    ],
    explanation: "Absorb = soak up; Repel = push away; Hexagon = 6 sides; Nectar = sweet flower liquid.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-akiva-water",
    prompt: "What did 40-year-old Akiva see at the spring that inspired him to go learn the Alef-Beis?",
    correct: "Soft water dripping steadily every day had carved a smooth hollow in a hard rock!",
    wrong: ["A golden piano floating on the water.", "A honeybee building a square hive.", "A giant rainbow umbrella."],
    explanation: "Seeing gentle water drops carve solid stone showed Akiva that daily Torah learning could shape his heart.",
  },
  {
    kind: "open",
    objective: "tobi-wk-akiva-explain",
    prompt: "Explain Rabbi Akiva's lesson: if soft water can carve hard stone drop by drop, what does that teach us about learning Torah?",
    exemplar: "Even if Torah looks big at first, learning a little bit every single day—drop by drop—will surely touch and shape our soft heart!",
    rubric: [
      "Connects dripping water on stone to learning Torah day by day",
      "Mentions that our heart is softer than stone",
      "Emphasizes steady daily effort (little by little)",
      "Uses clear, encouraging words",
    ],
    explanation: "Steady daily learning shapes a Torah heart one letter and one mitzvah at a time.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-hexagon-why",
    prompt: "Why do honeybees build six-sided hexagon cells instead of round circular cups?",
    correct: "Hexagons fit together with zero wasted gaps so neighbor cells share every wall and save precious wax!",
    wrong: ["Because bees cannot turn in circles.", "Because round cups hold too much honey.", "Because flowers are shaped like squares."],
    explanation: "Round circles leave empty gaps between them; six-sided hexagons share every wall with zero wasted space.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-bee-wings",
    prompt: "Why do worker bees fan their wings over the runny flower nectar inside the honeycomb?",
    correct: "To evaporate the extra water until the runny nectar thickens into golden honey!",
    wrong: ["To cool down their feet.", "To blow the wax caps off.", "To make the hive fly."],
    explanation: "Wing fanning creates a warm breeze that evaporates water from the nectar.",
  },
  {
    kind: "open",
    objective: "tobi-wk-shabbos-candles-challah",
    prompt: "Tell why we have TWO Shabbos candles and TWO whole Challot (Lechem Mishneh) on our Shabbos table!",
    exemplar: "The two candles remind us of Zachor (Remember) and Shamor (Keep Shabbos). The two whole Challot remember the double portion of Manna that fell every Friday in the desert!",
    rubric: [
      "Explains the two candles (Zachor & Shamor, or bringing light and Shalom Bayit)",
      "Explains the two Challot / Lechem Mishneh (double portion of Manna on Friday)",
      "Shows understanding of both Shabbos table mitzvos",
      "Uses clear, simple sentences",
    ],
    explanation: "Two candles honor Zachor & Shamor; two Challot (Lechem Mishneh) recall Friday's double portion of Manna.",
  },
  {
    kind: "match",
    objective: "tobi-wk-shabbos-match",
    prompt: "Match each Shabbos mitzvah or term to its meaning.",
    matches: [
      { left: "Zachor & Shamor", right: "Remember & Guard — why we light two candles" },
      { left: "Lechem Mishneh", right: "Two whole Challot for Friday's double Manna" },
      { left: "Shalom Bayit", right: "Peace and warmth in the home from candlelight" },
      { left: "Menucha", right: "The gift of peaceful rest created on Day 7" },
    ],
    explanation: "Zachor & Shamor = two candles; Lechem Mishneh = two loaves; Shalom Bayit = home peace; Menucha = Shabbos rest.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-piano-hammer",
    prompt: "Inside a piano, why must the soft wool-felt hammer bounce right off the metal string after tapping it?",
    correct: "So the string can vibrate freely and ring out instead of being muffled!",
    wrong: ["Because the string is covered in sticky honey.", "So the key falls off.", "Because the string is frozen."],
    explanation: "If the hammer stayed pressed against the string, it would stop the vibration and muffle the note.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-piano-pitch",
    prompt: "Which piano string vibrates FASTER to make a high bird-like note?",
    correct: "A short, thin, tight string on the right side of the piano",
    wrong: ["A long, thick copper-wrapped string on the left side", "A loose string lying on the floor", "The wooden bench leg"],
    explanation: "Short, thin strings vibrate much faster, producing high-pitched notes.",
  },
  {
    kind: "open",
    objective: "tobi-wk-piano-explain",
    prompt: "Explain how pressing a piano key makes music using the seesaw lever, the felt hammer, and the vibrating string!",
    exemplar: "When you press the key down, the seesaw lever tilts up and flings the soft felt hammer to tap the string. The hammer bounces off so the string can vibrate and shake the wooden soundboard!",
    rubric: [
      "Mentions pressing the key and tilting the seesaw lever",
      "Mentions the felt hammer tapping the string and bouncing off",
      "Explains that the string vibrates to make the musical sound",
      "Uses clear, simple sentences",
    ],
    explanation: "Key down → lever tilts → felt hammer taps and bounces → string vibrates!",
  },
  {
    kind: "match",
    objective: "tobi-wk-music-balloon-match",
    prompt: "Match each engineering part to its job.",
    matches: [
      { left: "Short Thin Piano String", right: "Vibrates fast to play high notes" },
      { left: "Long Thick Copper String", right: "Vibrates slowly to play low bass notes" },
      { left: "Hot-Air Balloon Burner", right: "Heats air so particles spread out & rise" },
      { left: "Top Parachute Vent", right: "Lets hot air escape so the balloon lands gently" },
    ],
    explanation: "Short strings = high notes; long thick strings = low notes; burner = climb; top vent = descend.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-noach-dove",
    prompt: "What did the white Dove bring back to Noach in her beak to show that treetops were peeking above the Flood?",
    correct: "A fresh green olive leaf",
    wrong: ["A honeycomb hexagon", "A wool fleece", "A shiny coin"],
    explanation: "In Bereishis 8:11, the Dove returned at evening with a fresh olive leaf in her beak.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-noach-rainbow",
    prompt: "What does Hashem's Rainbow (Keshet) in the clouds promise?",
    correct: "That Hashem will never again bring a Flood (Mabul) to destroy the whole earth.",
    wrong: ["That there is a pot of coins in the garden.", "That winter is starting tomorrow.", "That umbrellas are no longer needed."],
    explanation: "The Keshet is Hashem's covenant sign of peace and protection after the Flood.",
  },
  {
    kind: "open",
    objective: "tobi-wk-balloon-float",
    prompt: "Why does heating the air inside a giant hot-air balloon envelope make it float up into the cool morning sky?",
    exemplar: "When the burner heats the air inside, the air particles bounce fast and spread far apart (expand). That makes the warm air inside lighter than the crowded cool air outside, so the balloon floats up!",
    rubric: [
      "Mentions the burner heating the air inside the envelope",
      "Explains that heated air particles bounce faster and spread apart (expand)",
      "States that warm air inside is lighter than the crowded cool air outside",
      "Uses clear, simple sentences",
    ],
    explanation: "Spread-out warm air is less dense (lighter) than crowded cool air, creating upward buoyancy.",
  },
  {
    kind: "choice",
    objective: "tobi-wk-borer-fruit",
    prompt: "On Shabbos, a bowl has mixed strawberries and melon, and you only want to eat strawberries right now. What should you do?",
    correct: "Pick out the strawberries you want to eat right now by hand (or fork), leaving the melon in the bowl!",
    wrong: ["Pull out all the melon pieces you don't want.", "Pour the fruit through a strainer.", "Sort them into containers for tonight."],
    explanation: "On Shabbos we take the good food we want to eat (Ochel) from the mixture, by hand, right before eating!",
  },
  {
    kind: "choice",
    objective: "tobi-wk-muktzeh-item",
    prompt: "Which of these items is Muktzeh and takes a rest untouched on Shabbos?",
    correct: "Coins, crayons, and backyard pebbles",
    wrong: ["Your Siddur and Shabbos storybook", "A Kiddush cup and dinner plate", "Two braided Challot"],
    explanation: "Coins, crayons, and rocks have no permitted Shabbos use and are Muktzeh until after Havdalah.",
  },
  {
    kind: "open",
    objective: "tobi-wk-favorite-discovery",
    prompt: "Pick ONE of the amazing things we explored this week (Wool Sweaters, Umbrellas, Honeybee Hexagons, Piano Strings, or Hot-Air Balloons) and explain how it works in your own words!",
    exemplar: "Honeybees build six-sided wax hexagons because hexagons fit together with zero wasted gaps and share every wall! Then they fan their wings over flower nectar to evaporate the water and seal the thick honey with a wax cap.",
    rubric: [
      "Names one of the five How Things Work topics from the week",
      "Describes at least two accurate parts or steps of how it works",
      "Explains the cause-and-effect reason clearly",
      "Written in the child's own words",
    ],
    explanation: "Explaining how something works step by step shows you've mastered the science behind it!",
  },
];

const TOBI_WEEKLY_FORM_2: WeeklyItemSpec[] = TOBI_WEEKLY_FORM_1.map((item, idx) => {
  if (item.kind === "choice") {
    return {
      ...item,
      prompt: `${item.prompt} (Form B)`,
    };
  }
  return { ...item };
});

export function buildTobiWeeklyTestV4(formIndex: 0 | 1): Question[] {
  const source = formIndex === 0 ? TOBI_WEEKLY_FORM_1 : TOBI_WEEKLY_FORM_2;
  return source.map((spec, idx) => {
    const id = `tobi-weekly-test-v4-f${formIndex + 1}-q${idx + 1}`;
    if (spec.kind === "choice") {
      return {
        id,
        kind: "choice",
        objective: spec.objective,
        points: 4,
        prompt: spec.prompt.replace(" (Form B)", ""),
        correct: spec.correct,
        choices: placeCorrect(spec.correct, spec.wrong, idx + formIndex),
        explanation: spec.explanation,
      };
    }
    if (spec.kind === "match") {
      return {
        id,
        kind: "match",
        objective: spec.objective,
        points: 4,
        prompt: spec.prompt,
        matches: spec.matches,
        explanation: spec.explanation,
      };
    }
    return {
      id,
      kind: "open",
      objective: spec.objective,
      points: 4,
      prompt: spec.prompt,
      exemplar: spec.exemplar,
      rubric: spec.rubric,
      explanation: spec.explanation,
    };
  });
}
