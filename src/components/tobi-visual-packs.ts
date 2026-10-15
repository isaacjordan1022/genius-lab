import type { DiagramKind } from "../lib/content-types";
import type { VisualBlueprintPack } from "./real-world-gallery";

export const TOBI_AND_EXTRA_PACKS: Partial<Record<DiagramKind, VisualBlueprintPack>> = {
  "shabbos-borer-lab": {
    heading: "🍇 Shabbos Table Visual Lab · The 3 Golden Keys of Borer",
    subheading: "Tap pins (① ② ③) on the Shabbos table photograph to test how we sort food permissibly on Shabbos",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Challah_01.jpg",
      alt: "Shabbos table with braided Challah and meal servings",
      creditLabel: "Wikimedia Commons · Shabbos Table Preparation",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Challah_01.jpg",
      hotspots: [
        {
          id: "borer-ochel",
          number: 1,
          x: 32,
          y: 38,
          label: "① Key 1: Ochel Mitoch Pesolet (Take the Good from the Bad)",
          detail:
            "When a bowl has mixed items (like sweet almonds mixed with broken shells, or grapes mixed with stems), always reach in and take the food you want to eat now (Ochel) while leaving the unwanted part (Pesolet) behind!",
        },
        {
          id: "borer-byad",
          number: 2,
          x: 58,
          y: 52,
          label: "② Key 2: B'Yad (By Hand — Never With a Sorting Tool)",
          detail:
            "On Shabbos, we sort with our fingers or an ordinary eating fork/spoon—never with a dedicated sorting machine like a mesh strainer, colander, or sifter.",
        },
        {
          id: "borer-miyad",
          number: 3,
          x: 46,
          y: 76,
          label: "③ Key 3: Miyad / L'Alter (For the Meal Right Now!)",
          detail:
            "All three keys must click together! Even if you take the good food by hand, you may only sort it right before the meal you are about to eat—not to store away for tonight or tomorrow.",
        },
      ],
    },
    steps: [
      {
        step: "KEY 1 · WHAT YOU PICK",
        title: "Take the Good (Ochel)",
        body: "Always pick the food you want to eat out of the mixture; never pull out the unwanted peel, shell, or pit from the bowl.",
      },
      {
        step: "KEY 2 · HOW YOU PICK",
        title: "By Hand (B'Yad)",
        body: "Use your fingers or a regular spoon—never a mesh strainer, sieve, or special sorting tool.",
      },
      {
        step: "KEY 3 · WHEN YOU EAT IT",
        title: "Right Away (Miyad)",
        body: "Sort right before the meal you are sitting down to eat now, not hours ahead for a later meal.",
      },
    ],
    cards: [],
  },
  "noach-window-timeline": {
    heading: "🕊️ Parshat Noach Visual Timeline · The Raven, The Dove & The Rainbow",
    subheading: "Tap pins (① ② ③) on the rainbow photograph to trace how Noach tested whether the earth was ready after the Flood",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Double_Rainbow_and_Anticrepuscular_rays.jpg",
      alt: "Vibrant double rainbow shining in the clouds after rain",
      creditLabel: "Wikimedia Commons · Double Rainbow (Keshet Covenant)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Double_Rainbow_and_Anticrepuscular_rays.jpg",
      hotspots: [
        {
          id: "raven-mission",
          number: 1,
          x: 28,
          y: 36,
          label: "① First Scout: The Raven (Orev) Circles the Teivah",
          detail:
            "After waiting 40 days once the mountain peaks appeared, Noach opened the Teivah window and sent out the Raven. It circled back and forth around the Ark without bringing back a clear sign that the valleys were dry.",
        },
        {
          id: "dove-olive",
          number: 2,
          x: 54,
          y: 48,
          label: "② Second Scout: The Dove's Bitter Olive Leaf",
          detail:
            "On her second flight 7 days later, the Dove returned at evening holding a freshly plucked olive leaf! Rashi explains the Dove's message: 'Better that my food be bitter as an olive from Hashem's hand than sweet as honey from human hands!'",
        },
        {
          id: "rainbow-covenant",
          number: 3,
          x: 72,
          y: 34,
          label: "③ The Keshet (Rainbow): Hashem's Eternal Sign of Peace",
          detail:
            "When Noach stepped onto dry land after a full year in the Teivah, Hashem placed the rainbow (Keshet) in the clouds—an inverted bow with its string facing away from earth—as a promise never again to bring a Mabul.",
        },
      ],
    },
    steps: [
      {
        step: "FLIGHT 1 · THE RAVEN & DOVE #1",
        title: "Water Still Covers the Valleys",
        body: "The Raven circles near the Ark, and the Dove's first flight finds no dry resting place—so Noach stretches out his hand to bring her back inside.",
      },
      {
        step: "FLIGHT 2 · 7 DAYS LATER",
        title: "The Fresh Olive Leaf at Evening",
        body: "The Dove brings back a bitter olive leaf in her beak—proving the water has dropped below the treetops and teaching trust in Hashem.",
      },
      {
        step: "FLIGHT 3 & COVENANT",
        title: "Dry Land & The Rainbow (Keshet)",
        body: "Seven days later the Dove does not return because the earth is dry; Hashem seals His promise with the Rainbow in the cloud.",
      },
    ],
    cards: [],
  },
  "shabbos-muktzeh-explorer": {
    heading: "🕯️ Hilchot Shabbos Visual Guide · Understanding Muktzeh Categories",
    subheading: "Tap pins (① ② ③) to see why some objects are freely moved on Shabbos while weekday tools and stones are set aside",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Candles.jpg",
      alt: "Glowing Shabbat candles on a silver tray",
      creditLabel: "Wikimedia Commons · Shabbat Candles & Table",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Candles.jpg",
      hotspots: [
        {
          id: "kli-heter",
          number: 1,
          x: 26,
          y: 52,
          label: "① Kli Shemelachto L'Heter (Shabbos-Permitted Vessels)",
          detail:
            "A fork, Kiddush cup, plate, chair, or Siddur has a permitted main job on Shabbos. You may move it freely for any reason—even just to keep it safe!",
        },
        {
          id: "kli-issur",
          number: 2,
          x: 54,
          y: 44,
          label: "② Kli Shemelachto L'Issur (Weekday Work Tools)",
          detail:
            "A hammer, pen, or pair of scissors is built for weekday work, BUT because it is still a useful household tool (Kli), you MAY move it in two cases: Tzorech Gufo (using it for a permitted Shabbos job, like cracking a coconut) or Tzorech Mekomo (clearing the spot where it sits)!",
        },
        {
          id: "machmas-gufo",
          number: 3,
          x: 74,
          y: 64,
          label: "③ Muktzeh Machmas Gufo (Rocks, Coins & Raw Hides)",
          detail:
            "Pebbles, sticks, coins, and raw animal hides are not vessels or tools at all. They may NOT be moved by hand on Shabbos—even if you want their spot on the table!",
        },
      ],
    },
    steps: [
      {
        step: "CATEGORY 1 · L'HETER",
        title: "Permitted Vessels (Cup, Fork, Book)",
        body: "Their normal job is permitted on Shabbos—move them anytime for any need.",
      },
      {
        step: "CATEGORY 2 · L'ISSUR",
        title: "Work Tools (Hammer, Pen)",
        body: "Do not move them just to protect them, ONLY move them for a permitted use (Tzorech Gufo) or if you need their space (Tzorech Mekomo).",
      },
      {
        step: "CATEGORY 3 · MACHMAS GUFO",
        title: "Non-Vessels (Rocks, Coins, Sticks)",
        body: "Not tools or food at all—leave them right where they are all Shabbos!",
      },
    ],
    cards: [],
  },

  // =========================================================================
  // TOBI (AGE 7, GRADE 2) VISUAL PACKS — DAYS 1 TO 5
  // =========================================================================
  "tobi-wool-spinning-lab": {
    heading: "🐑 Real Farm & Spinning Photos · How Fluffy Wool Becomes a Cozy Sweater",
    subheading: "Tap the numbered pins (① ② ③) on the real sheep-shearing photograph to see how a sheep's coat turns into soft yarn!",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sheep_shearing.jpg",
      fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
      alt: "A farmer gently shearing the thick fluffy wool fleece off a sheep in springtime",
      creditLabel: "Wikimedia Commons · Springtime Sheep Shearing",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Sheep_shearing.jpg",
      hotspots: [
        {
          id: "sheep-fleece",
          number: 1,
          x: 38,
          y: 46,
          label: "① The Fluffy Fleece (A Gently Clipped Spring Haircut!)",
          detail:
            "Every spring when the weather turns warm, a shearer gives the sheep a quick, gentle haircut with electric clippers. It doesn't hurt at all—just like getting your hair trimmed! The whole woolly coat comes off in one big fluffy blanket called a fleece.",
        },
        {
          id: "crimped-fibers",
          number: 2,
          x: 62,
          y: 58,
          label: "② Wavy Wool Hairs with Tiny Gripping Scales",
          detail:
            "Under a magnifying glass, each wool hair is wavy (crimped) and covered in tiny overlapping scales like a pinecone. When you twist lots of short wool hairs together on a spinning wheel, those tiny scales grab onto each other to make one long, strong rope of yarn!",
        },
        {
          id: "warm-air-pockets",
          number: 3,
          x: 48,
          y: 78,
          label: "③ Why Knitted Loops Keep You So Warm",
          detail:
            "A sweater doesn't make its own heat! Instead, knitted loops of fuzzy wool yarn trap millions of tiny invisible pockets of air next to your skin. Your body warms up that trapped air, and the wool holds the warm air in like a cozy hug!",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · SHEARING & WASHING",
        title: "Clipping the Fluffy Fleece",
        body: "In spring, the farmer clips off the sheep's heavy winter fleece and washes away all the mud and grass in warm soapy water.",
      },
      {
        step: "STEP 2 · CARDING & SPINNING",
        title: "Brushing & Twisting Into Yarn",
        body: "Wire brushes comb the tangled wool into a soft cloud, and a spinning wheel twists the short hairs so they lock into strong yarn!",
      },
      {
        step: "STEP 3 · KNITTING LOOPS",
        title: "Trapping Tiny Pockets of Warm Air",
        body: "Knitting needles loop the yarn into a stretchy sweater whose fuzzy spaces trap warm air right next to your body.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Spinning_wheel_spinning_wool.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
        alt: "Close-up of hands spinning fluffy wool fibers into twisted yarn on a wooden spinning wheel",
        badge: "Step 2 · Spinning Wheel",
        title: "Twisting Fluffy Cloud Into Strong Yarn",
        caption: "Pulling a few loose wool hairs apart is easy—but once the spinning wheel twists them together, they lock tight and won't pull apart!",
        specLabel: "Science Secret",
        specValue: "Twisting Creates Friction Between Fibers",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Spinning_wheel_spinning_wool.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Closeup_of_a_granny_square_on_a_knitted_tree_in_Cz%C4%99stochowa,_2022-06-13.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-002.avif",
        alt: "Close-up photograph of colorful interlocking knitted yarn loops",
        badge: "Step 3 · Knitted Loops",
        title: "Up Close: Interlocking Yarn Loops",
        caption: "Look at the little V-shaped loops! Because the yarn is looped instead of pulled flat, a sweater can stretch over your head and bounce right back.",
        specLabel: "Warmth Trick",
        specValue: "Fuzzy Loops Trap Warm Still Air",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Closeup_of_a_granny_square_on_a_knitted_tree_in_Cz%C4%99stochowa,_2022-06-13.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sheep_shearing_J1.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-003.avif",
        alt: "Thick creamy wool fleece being sheared in springtime",
        badge: "Step 1 · Fresh Fleece",
        title: "One Sheep = Up to 8 Sweaters!",
        caption: "A single sheep grows a thick coat every year that is cool for the sheep to shed before summer and cozy for us in winter.",
        specLabel: "Natural Coating",
        specValue: "Lanolin (Natural Wool Oil)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Sheep_shearing_J1.jpg",
      },
    ],
  },
  "tobi-umbrella-raincoat-lab": {
    heading: "☔ Real Macro Photos · How Umbrellas & Raincoats Make Water Bounce Off!",
    subheading: "Tap pins (① ② ③) on the real water-droplet photo to see how nature's lotus leaf inspired raincoats and umbrellas",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lotus_leaf_with_waterdrops.jpg",
      fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
      alt: "Crystal-clear round water droplets beading up and rolling off a waxy green lotus leaf",
      creditLabel: "Wikimedia Commons · Water Droplets Beading Up (The Lotus Effect)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Lotus_leaf_with_waterdrops.jpg",
      hotspots: [
        {
          id: "round-beads",
          number: 1,
          x: 34,
          y: 44,
          label: "① Why Raindrops Curl Into Little Round Marbles",
          detail:
            "Look how the water sits up like shiny glass marbles instead of soaking in! That's because the leaf (and a raincoat!) is covered in an invisible waxy shield that water cannot stick to.",
        },
        {
          id: "tight-weave",
          number: 2,
          x: 62,
          y: 36,
          label: "② Cotton T-Shirt (Sponge) vs. Raincoat (Shield)",
          detail:
            "A cotton T-shirt has loose, thirsty threads with wide holes that drink up water like a paper towel. An umbrella canopy uses super tightly woven nylon threads coated in wax or silicone so water is repelled!",
        },
        {
          id: "dome-ribs",
          number: 3,
          x: 50,
          y: 74,
          label: "③ Stretching the Umbrella Dome Drum-Tight",
          detail:
            "When you push an umbrella's runner ring up the pole, metal stretcher ribs open like steel fingers and pull the fabric into a tight curved dome—so raindrops roll right down the slope to the edges!",
        },
      ],
    },
    steps: [
      {
        step: "1 · THE METAL SKELETON",
        title: "Stretcher Ribs Open the Dome",
        body: "Sliding the runner ring up the shaft unfolds steel ribs that stretch the fabric tight like a drum.",
      },
      {
        step: "2 · TIGHT NYLON WEAVE",
        title: "No Gaps for Raindrops to Squeeze Through",
        body: "Unlike a loose cotton shirt, umbrella fabric weaves smooth synthetic threads super close together.",
      },
      {
        step: "3 · WAXY LOTUS SHIELD",
        title: "Water Beads Up and Rolls Away!",
        body: "A water-repellent coating makes raindrops curl into round beads that slide right off the curved dome.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/London_2012_Olympics_Games_Maker_Umbrella_Open.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
        alt: "View looking up inside an open umbrella showing the metal shaft, runner, and stretcher ribs",
        badge: "Inside the Canopy",
        title: "Metal Ribs & Stretchers Under the Dome",
        caption: "Look underneath an open umbrella: hinged metal stretcher arms push outward against flexible ribs to hold the roof firm in the wind.",
        specLabel: "Frame Engineering",
        specValue: "8 Hinged Steel / Fiberglass Ribs",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:London_2012_Olympics_Games_Maker_Umbrella_Open.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Water_drop_on_a_leaf.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-002.avif",
        alt: "Extreme close-up of a single round water droplet resting on a water-repellent surface",
        badge: "Microscope View",
        title: "A Single Water Bead Up Close",
        caption: "When a surface repels water, the water drop pulls itself into a round ball and rolls off at the slightest tilt!",
        specLabel: "Power Word",
        specValue: "Repel (Push Water Away)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Water_drop_on_a_leaf.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rain_Umbrella_01.JPG",
        fallbackSrc: "/prizes/tobi/product-tobi-003.avif",
        alt: "Open umbrella shedding rain outdoors",
        badge: "Curved Dome Roof",
        title: "Why Umbrellas Are Curved Instead of Flat",
        caption: "If an umbrella were flat like a table, a heavy puddle of rain would collect on top and collapse it! The dome slope lets gravity roll every drop off.",
        specLabel: "Shape Secret",
        specValue: "Curved Dome Sheds Heavy Water",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Rain_Umbrella_01.JPG",
      },
    ],
  },
  "tobi-honeycomb-wax-lab": {
    heading: "🐝 Real Beehive Macro Photos · Why Honeybees Build Six-Sided Hexagons!",
    subheading: "Tap pins (① ② ③) on the real golden honeycomb photograph to discover the bees' master building secret",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Honeycombs-rayons-de-miel-1.jpg",
      fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
      alt: "Close-up photograph of golden six-sided beeswax honeycomb cells glistening with real honey",
      creditLabel: "Wikimedia Commons · Golden Beeswax Honeycomb Cells",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Honeycombs-rayons-de-miel-1.jpg",
      hotspots: [
        {
          id: "six-walls",
          number: 1,
          x: 34,
          y: 42,
          label: "① Count the Sides: 1-2-3-4-5-6 (A Hexagon!)",
          detail:
            "Every single little room in the honeycomb has exactly six flat wax walls! Why don't bees build round circles? Because if you push round cups together, clumsy empty gaps are left between them.",
        },
        {
          id: "shared-walls",
          number: 2,
          x: 58,
          y: 52,
          label: "② Zero Wasted Wax: Neighbors Share Every Wall!",
          detail:
            "Making beeswax takes a lot of hard work—bees have to eat pounds of honey just to make tiny wax flakes! Six-sided hexagons fit together like puzzle pieces with ZERO gaps, so one wax wall serves two rooms at once!",
        },
        {
          id: "fanning-honey",
          number: 3,
          x: 46,
          y: 76,
          label: "③ Fanning Wings to Turn Nectar Into Thick Honey",
          detail:
            "Flower nectar starts out runny like watery juice. Inside the hive, worker bees fan their wings like thousands of tiny electric fans to evaporate the extra water until thick golden honey is ready to seal with a wax cap!",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · FLOWER NECTAR",
        title: "Sipping Sweet Nectar with a Straw",
        body: "Forager bees visit blooming flowers and sip sweet liquid nectar using a long tongue shaped like a drinking straw.",
      },
      {
        step: "STEP 2 · CHEWING WAX HEXAGONS",
        title: "Molding 6-Sided Wax Rooms",
        body: "Builder bees mold tiny beeswax flakes into six-sided hexagon cells that lock together with zero wasted gaps.",
      },
      {
        step: "STEP 3 · FANNING & SEALING",
        title: "Wing Fans + Waterproof Wax Caps",
        body: "Bees fan their wings to dry runny nectar into thick golden honey, then seal each cell with a fresh beeswax lid!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Honey_comb.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
        alt: "Macro photograph of empty and capped hexagonal honeycomb cells",
        badge: "Nature's Geometry",
        title: "Six-Sided Puzzle Pieces (Zero Gaps!)",
        caption: "Look how every single wall is shared between two neighbor cells—the strongest shape that holds the most honey with the least wax!",
        specLabel: "Cell Shape",
        specValue: "6-Sided Hexagon (Shared Walls)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Honey_comb.jpg",
      },
    ],
  },
  "tobi-piano-strings-lab": {
    heading: "🎹 Inside a Real Grand Piano · Hammers, Levers & Vibrating Strings!",
    subheading: "Tap pins (① ② ③) on the real photograph inside a Steinway grand piano to see what happens when you press a key",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Grand_piano_action_-_Piano_Hammers,_at_piano_shop_Steinway_Pianos_of_Calgary.jpg",
      fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
      alt: "Close-up photograph inside a Steinway grand piano showing white wool-felt hammers and tight metal strings",
      creditLabel: "Wikimedia Commons · Inside a Steinway Grand Piano Action",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Grand_piano_action_-_Piano_Hammers,_at_piano_shop_Steinway_Pianos_of_Calgary.jpg",
      hotspots: [
        {
          id: "felt-hammers",
          number: 1,
          x: 36,
          y: 62,
          label: "① Soft Wool-Felt Hammers (One for Every Key!)",
          detail:
            "When you press a piano key down with your finger, a hidden wooden seesaw lever flings one of these white wool-felt hammers upward to tap the metal strings!",
        },
        {
          id: "bounce-back",
          number: 2,
          x: 52,
          y: 42,
          label: "② Why the Hammer Must Bounce Away Instantly",
          detail:
            "Music only happens when a string can wiggle (vibrate) freely back and forth! If the hammer stayed pressed against the string, it would muffle the vibration like a finger touching a bell—so a clever spring catches the hammer right after it bounces off!",
        },
        {
          id: "high-low-strings",
          number: 3,
          x: 68,
          y: 28,
          label: "③ Long Thick Bear Strings vs. Short Thin Bird Strings",
          detail:
            "Why do keys on the left sound deep like a bear while keys on the right sound high like a bird? Long, thick copper-wrapped strings vibrate slowly (low notes), while short, thin, tight strings vibrate super fast (high notes)!",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · PRESS THE KEY",
        title: "The Hidden Seesaw Lever",
        body: "Pressing a piano key down pushes the back end of a wooden lever up, launching a soft felt hammer toward the string.",
      },
      {
        step: "STEP 2 · BOUNCE & VIBRATE",
        title: "Wiggling Strings Make Sound Waves",
        body: "The felt hammer taps the tight metal string and bounces right off so the string can vibrate hundreds of times a second!",
      },
      {
        step: "STEP 3 · HIGH VS. LOW NOTES",
        title: "Short & Thin vs. Long & Thick",
        body: "Short, thin strings wiggle fast to sing high notes; long, thick copper-wrapped strings wiggle slowly to boom low notes.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Steinway_Grand_Piano_Iron_Plates_and_Strings.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
        alt: "Inside a Steinway grand piano showing thick copper-wound bass strings crossing over steel treble strings",
        badge: "Bass vs. Treble Strings",
        title: "Copper-Wound Bass Strings vs. Steel Treble Strings",
        caption: "Look at the thick bronze-colored strings on top: those are wrapped in copper wire to make them heavier so they vibrate slowly for deep bass notes!",
        specLabel: "Total Strings Inside",
        specValue: "~230 Tightly Stretched Steel Strings",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Steinway_Grand_Piano_Iron_Plates_and_Strings.jpg",
      },
    ],
  },
  "tobi-balloon-hotair-lab": {
    heading: "🎈 Real Hot-Air Balloon Photos · Why Warm Air Lifts a Giant Basket!",
    subheading: "Tap pins (① ② ③) on the real photograph looking inside an inflating hot-air balloon",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Flames_from_burner_in_hot_air_balloon.JPG",
      fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
      alt: "Photograph looking into a colorful hot-air balloon envelope as the burner shoots a bright orange flame inside",
      creditLabel: "Wikimedia Commons · Hot-Air Balloon Burner & Envelope",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Flames_from_burner_in_hot_air_balloon.JPG",
      hotspots: [
        {
          id: "burner-flame",
          number: 1,
          x: 24,
          y: 52,
          label: "① The Roaring Burner (The Balloon's Engine!)",
          detail:
            "A hot-air balloon doesn't have wings or a propeller! Instead, the pilot pulls a valve to shoot a tall flame into the mouth of the balloon, warming the air inside.",
        },
        {
          id: "dancing-molecules",
          number: 2,
          x: 58,
          y: 46,
          label: "② Warm Air Spreads Out & Weighs Less Than Cool Air!",
          detail:
            "Imagine air is made of billions of tiny invisible bouncing balls. In cold air outside, they huddle close together (heavy!). When the flame heats the air inside, the air balls zip around fast and spread far apart—making the giant bubble of warm air lighter than the cool air around it!",
        },
        {
          id: "parachute-vent",
          number: 3,
          x: 84,
          y: 48,
          label: "③ How the Pilot Lands: The Top Parachute Vent",
          detail:
            "How do you come back down? The pilot either lets the air cool down or pulls a red cord that opens a round flap at the very top of the balloon—letting some hot air escape so the balloon floats gently to the grass!",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · COOL AIR HUDDLES",
        title: "Outside Air Is Packed & Heavy",
        body: "In cool outdoor air, invisible air particles move slowly and crowd closely together.",
      },
      {
        step: "STEP 2 · HEAT SPREADS AIR OUT",
        title: "The Burner Flame Makes Air Dance!",
        body: "When the burner warms the air inside the balloon, the air particles bounce fast, spread apart, and some push out the bottom.",
      },
      {
        step: "STEP 3 · UP, UP & AWAY!",
        title: "Lighter Warm Air Floats Upward",
        body: "Because the giant balloon now holds fewer, spread-out air particles, it weighs less than the cool air outside and floats into the sky!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hot-air_balloon_burner.jpg",
        fallbackSrc: "/prizes/tobi/product-tobi-001.avif",
        alt: "Close-up of a hot-air balloon burner flame glowing inside the colorful nylon envelope",
        badge: "Pilot's Controls",
        title: "Up Button = Burner Flame · Down Button = Top Vent",
        caption: "A hot-air balloon pilot controls up and down with temperature, and catches breezes at different heights to steer left or right!",
        specLabel: "Envelope Fabric",
        specValue: "Lightweight Ripstop Nylon",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Hot-air_balloon_burner.jpg",
      },
    ],
  },
  "tobi-bereishis-days-explorer": {
    heading: "🕯️ Parshat Bereishis Visual Explorer · 6 Days of Creation & Shabbos Menucha",
    subheading: "Tap pins (① ② ③) to see how the Six Days of Creation lead up to the palace of Shabbos!",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Candles.jpg",
      alt: "Two glowing Shabbat candles welcoming the Seventh Day",
      creditLabel: "Wikimedia Commons · Welcoming Shabbos Menucha",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Candles.jpg",
      hotspots: [
        {
          id: "days-1-to-3",
          number: 1,
          x: 28,
          y: 40,
          label: "① Days 1–3: Building the Home (Light, Sky/Water & Plants)",
          detail:
            "On the first three days of Bereishis, Hashem created the spaces of our world: Day 1—Light and darkness; Day 2—The sky above; Day 3—Dry land, oceans, grass, and fruit trees!",
        },
        {
          id: "days-4-to-6",
          number: 2,
          x: 52,
          y: 44,
          label: "② Days 4–6: Filling the Home (Sun/Moon/Stars, Fish/Birds & Animals/People)",
          detail:
            "On the next three days, Hashem filled each space with life and light: Day 4—Sun, moon, and stars in the sky; Day 5—Fish in the sea and birds in the air; Day 6—Land animals and Adam & Chava!",
        },
        {
          id: "day-7-menucha",
          number: 3,
          x: 74,
          y: 56,
          label: "③ Day 7: Shabbos — The Crown of Creation (Menucha)",
          detail:
            "Rashi asks: What was the world still missing after 6 days? Menucha—peaceful rest! When Shabbos arrived on the 7th day, Creation was finally complete.",
        },
      ],
    },
    steps: [
      {
        step: "DAYS 1, 2 & 3",
        title: "Preparing the World's Spaces",
        body: "Day 1: Light; Day 2: Sky & heavens; Day 3: Dry land, seas, and blooming fruit trees.",
      },
      {
        step: "DAYS 4, 5 & 6",
        title: "Filling Every Space",
        body: "Day 4: Sun, moon & stars; Day 5: Fish & birds; Day 6: Animals and human beings (Adam & Chava).",
      },
      {
        step: "DAY 7 · SHABBOS",
        title: "The Gift of Menucha (Rest)",
        body: "Rashi teaches that when Shabbos came, Peaceful Rest (Menucha) came to the world!",
      },
    ],
    cards: [],
  },
  "tobi-akiva-water-stone": {
    heading: "💧 Gadol Spotlight · Rabbi Akiva & The Water Drops That Carved a Rock",
    subheading: "Tap pins (① ② ③) to discover how a tiny drop of water helped a 40-year-old shepherd become a great Torah sage!",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Water_drop_on_a_leaf.jpg",
      alt: "Close-up of a glistening crystal water drop",
      creditLabel: "Wikimedia Commons · The Power of a Gentle Water Drop",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Water_drop_on_a_leaf.jpg",
      hotspots: [
        {
          id: "akiva-shepherd",
          number: 1,
          x: 32,
          y: 45,
          label: "① Akiva the Shepherd at Age 40",
          detail:
            "Until he was 40 years old, Akiva was a shepherd who did not even know how to read the Alef-Beis! He worried it was too late for him to start learning Torah.",
        },
        {
          id: "water-carves-rock",
          number: 2,
          x: 56,
          y: 52,
          label: "② The Mystery at the Well: Soft Water vs. Hard Stone",
          detail:
            "Standing by a spring (Avot D'Rabbi Natan 6), Akiva saw a deep hollow carved right into a hard boulder. When he asked who chiseled the rock, people told him: 'The water that drips on it every single day!'",
        },
        {
          id: "alef-beis-lesson",
          number: 3,
          x: 74,
          y: 66,
          label: "③ Drop by Drop: Learning Alef-Beis with His Son!",
          detail:
            "Akiva smiled and said: 'If soft water can carve hard stone by dripping every day, Hashem's words of Torah can surely shape my soft heart!' He went straight to the teacher's house with his young son to learn Alef-Beis.",
        },
      ],
    },
    steps: [
      {
        step: "1 · THE CLUE AT THE SPRING",
        title: "A Smooth Hollow in Solid Rock",
        body: "Akiva noticed a deep bowl worn into a hard stone beside a trickling waterfall.",
      },
      {
        step: "2 · STEADY BEATS STRONG",
        title: "One Gentle Drop After Another",
        body: "A single splash does nothing to a rock, but gentle drops falling in the same spot every day carve right through stone!",
      },
      {
        step: "3 · TORAH & MIDDOS",
        title: "Little Steps Every Day",
        body: "Learning one new letter or doing one kind mitzvah each day shapes our heart into a Torah giant!",
      },
    ],
    cards: [],
  },
  "tobi-shabbos-candles-kiddush": {
    heading: "🕯️ Halacha in Action · Welcoming the Shabbos Queen (Candles, Kiddush & Challah)",
    subheading: "Tap pins (① ② ③) on the Shabbos table photographs to learn the special mitzvos that welcome Shabbos!",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Candles.jpg",
      alt: "Two lit Shabbat candles glowing before sunset",
      creditLabel: "Wikimedia Commons · Lighting Shabbat Candles",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Candles.jpg",
      hotspots: [
        {
          id: "two-candles",
          number: 1,
          x: 36,
          y: 38,
          label: "① Two Shabbos Candles: Zachor (Remember) & Shamor (Guard)",
          detail:
            "We light at least two candles before sunset (usually 18 minutes before sunset!) to bring light, joy, and Shalom Bayit (peace in the home). The two candles also remind us of the two words in the Ten Commandments: Zachor ('Remember Shabbos') and Shamor ('Keep Shabbos')!",
        },
        {
          id: "kiddush-cup",
          number: 2,
          x: 58,
          y: 56,
          label: "② Kiddush: Declaring Shabbos Holy Over a Full Cup",
          detail:
            "At the table, we fill a Kiddush cup to the top with grape juice or wine and recite Kiddush—thanking Hashem for creating the world in six days and giving us Shabbos as a royal gift.",
        },
        {
          id: "lechem-mishneh",
          number: 3,
          x: 74,
          y: 72,
          label: "③ Lechem Mishneh: Why We Hold Two Whole Challot!",
          detail:
            "Why do we bless HaMotzi over TWO whole braided Challot instead of one? To remember the miracle in the desert when Hashem gave a double portion of Manna every Friday so nobody had to gather food on Shabbos!",
        },
      ],
    },
    steps: [
      {
        step: "1 · BEFORE SUNSET",
        title: "Hadlakat Neirot (Shabbos Candles)",
        body: "We light candles before sunset to fill the house with light, joy (Oneg), and peace (Shalom Bayit).",
      },
      {
        step: "2 · KIDDUSH",
        title: "Remembering Creation Over Wine",
        body: "We recite Kiddush over a full cup of wine or grape juice to honor the arrival of Shabbos.",
      },
      {
        step: "3 · LECHEM MISHNEH",
        title: "Two Whole Challot Under a Cover",
        body: "We hold two whole loaves for HaMotzi to remember the double portion of Manna that fell every Friday!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Challah_01.jpg",
        alt: "Golden braided Shabbat Challah loaf",
        badge: "Lechem Mishneh",
        title: "Two Whole Braided Challot",
        caption: "Every Friday in the wilderness, two portions of Manna fell for each person—so we place two whole Challot on our Shabbos table!",
        specLabel: "Special Mitzvah",
        specValue: "Lechem Mishneh (Double Loaf)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Challah_01.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Challah_cover_for_Shabbat.jpg",
        alt: "Embroidered Shabbat Challah cover",
        badge: "Covering the Challah",
        title: "Why the Challot Wear a Blanket",
        caption: "The Challah cover remembers the clean layer of dew that covered the Manna—and keeps the Challah 'from feeling embarrassed' while we bless the grape juice first during Kiddush!",
        specLabel: "Middos Lesson",
        specValue: "Caring About Feelings & Honor",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Challah_cover_for_Shabbat.jpg",
      },
    ],
  },
  "tobi-noach-rainbow-ark": {
    heading: "🌈 Parshat Noach Visual Lab · Kindness in the Teivah & The Rainbow Promise",
    subheading: "Tap pins (① ② ③) on the real double-rainbow & Noah's Ark art to explore Noach's year of kindness",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Double_Rainbow_and_Anticrepuscular_rays.jpg",
      alt: "Real double rainbow glowing across the sky after rain",
      creditLabel: "Wikimedia Commons · Double Rainbow (Keshet Covenant)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Double_Rainbow_and_Anticrepuscular_rays.jpg",
      hotspots: [
        {
          id: "noach-feeding",
          number: 1,
          x: 28,
          y: 52,
          label: "① Around-the-Clock Chesed Inside the Teivah",
          detail:
            "For 12 whole months inside the Teivah, Noach and his family barely slept! Rashi explains that some animals ate in the morning, some at noon, and some only in the middle of the night—and Noach served each animal its exact favorite food on time!",
        },
        {
          id: "dove-olive-branch",
          number: 2,
          x: 52,
          y: 42,
          label: "② The White Dove's Olive Leaf",
          detail:
            "When Noach sent the gentle white Dove out the window a second time, she flew back at evening carrying a green olive leaf in her beak—showing that trees were peeking above the water again!",
        },
        {
          id: "keshet-promise",
          number: 3,
          x: 74,
          y: 34,
          label: "③ The Rainbow (Keshet): Hashem's Sign in the Clouds",
          detail:
            "When sunlight shines through raindrops after a storm, it splits into a glowing rainbow (Keshet). Hashem made the rainbow His special sign that He will always protect the world from another Flood!",
        },
      ],
    },
    steps: [
      {
        step: "1 · INSIDE THE TEIVAH",
        title: "Feeding Every Creature on Time",
        body: "Noach and his family cared for every animal day and night with patience and kindness (Chesed).",
      },
      {
        step: "2 · THE DOVE'S MESSAGE",
        title: "A Fresh Green Olive Leaf",
        body: "The Dove returned with an olive leaf, bringing the happy news that the waters were going down.",
      },
      {
        step: "3 · THE RAINBOW (KESHET)",
        title: "Hashem's Colorful Promise",
        body: "Hashem placed the rainbow in the clouds as a sign of peace and protection for the whole earth.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Noahs_Ark.jpg",
        alt: "Edward Hicks 1846 painting of animals walking two by two into Noah's Ark",
        badge: "Inside the Ark",
        title: "Two by Two Into the Teivah",
        caption: "Every kind of animal and bird found a safe, dry room on the middle deck of the Teivah while the rain fell outside.",
        specLabel: "Torah Value",
        specValue: "Chesed (Kindness to All Creatures)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Noahs_Ark.jpg",
      },
    ],
  },
  "tobi-shabbos-treasure-sorting": {
    heading: "🍓 Shabbos Table Detective · Picking Treats by Hand & Shabbos Treasures!",
    subheading: "Tap pins (① ② ③) to see how a 7-year-old Shabbos Detective picks favorite treats and spots Muktzeh items",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shabbat_Challah_01.jpg",
      alt: "Shabbos meal table with braided Challah",
      creditLabel: "Wikimedia Commons · Shabbos Meal Detective",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Shabbat_Challah_01.jpg",
      hotspots: [
        {
          id: "pick-what-you-love",
          number: 1,
          x: 30,
          y: 42,
          label: "① Fruit Salad Detective: Pick What You Want to Eat Now!",
          detail:
            "Suppose a bowl has strawberries and melon, and you only want strawberries. On Shabbos, reach in with your hand or fork and take the sweet strawberries you want to eat right now—leave the melon pieces in the bowl!",
        },
        {
          id: "shabbos-treasures",
          number: 2,
          x: 56,
          y: 48,
          label: "② Shabbos Treasures You Can Always Move",
          detail:
            "Your Siddur, storybook, board game pieces, fork, cup, and Shabbos shoes are all Shabbos items—you can carry and use them inside the house all Shabbos long!",
        },
        {
          id: "muktzeh-sleep",
          number: 3,
          x: 76,
          y: 66,
          label: "③ Weekday Items Taking a Shabbos Rest (Muktzeh)",
          detail:
            "Crayons, scissors, coins, batteries, and backyard rocks or sticks are Muktzeh—they take a vacation on Shabbos so we don't pick them up until Havdalah on Saturday night!",
        },
      ],
    },
    steps: [
      {
        step: "RULE 1 · PICK THE GOOD!",
        title: "Take the Treat You Want to Eat",
        body: "From a mixed bowl of fruit or snacks, pick out the piece you want to eat right now (never pull out the unwanted pieces).",
      },
      {
        step: "RULE 2 · USE YOUR HAND",
        title: "Fingers or Fork — No Strainers!",
        body: "Pick your treat by hand or with a regular spoon right before eating.",
      },
      {
        step: "RULE 3 · MUKTZEH RESTS",
        title: "Leave Coins, Rocks & Crayons Untouched",
        body: "Coins, rocks, and weekday coloring supplies are Muktzeh—we let them rest untouched until Shabbos is over!",
      },
    ],
    cards: [],
  },
};
