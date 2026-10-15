"use client";

import { useState } from "react";
import type { DiagramKind } from "../lib/content-types";
import { TOBI_AND_EXTRA_PACKS } from "./tobi-visual-packs";

export type Hotspot = {
  id: string;
  number: number;
  x: number; // percentage 0..100
  y: number; // percentage 0..100
  label: string;
  detail: string;
};

export type CauseEffectStep = {
  step: string;
  title: string;
  body: string;
};

export type GalleryItem = {
  src: string;
  fallbackSrc?: string;
  alt: string;
  badge: string;
  title: string;
  caption: string;
  specLabel: string;
  specValue: string;
  sourceLabel?: string;
  sourceUrl?: string;
};

export type VisualBlueprintPack = {
  heading: string;
  subheading: string;
  heroPhoto: {
    src: string;
    fallbackSrc?: string;
    alt: string;
    creditLabel: string;
    creditUrl: string;
    hotspots: Hotspot[];
  };
  steps: CauseEffectStep[];
  cards: GalleryItem[];
};

const VISUAL_PACKS: Partial<Record<DiagramKind, VisualBlueprintPack>> = {
  "leather-tanning-lab": {
    heading: "📸 Real Tannery Photographs & Step-by-Step Chemistry",
    subheading: "Tap the numbered pins (① ② ③) on the real tannery drum photo to see how raw cattle hide becomes permanent leather",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cora_%2B_Spink_Ethical_Leather_Production.jpg",
      fallbackSrc: "/prizes/sports/product-sports-005.avif",
      alt: "Inside a real leather tannery showing massive rotating wooden tanning drums",
      creditLabel: "Wikimedia Commons · Industrial Leather Tannery Drums",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Cora_%2B_Spink_Ethical_Leather_Production.jpg",
      hotspots: [
        {
          id: "drum-shell",
          number: 1,
          x: 34,
          y: 38,
          label: "① Giant Rotating Wooden Drum (8–12 ft Tall)",
          detail:
            "Raw cattle hides are loaded inside this huge wooden barrel along with warm water and natural plant tannins (originally from crushed oak and chestnut tree bark). As the motor spins the drum, internal wooden paddles lift and drop the hides non-stop for 24–48 hours.",
        },
        {
          id: "tannin-bath",
          number: 2,
          x: 62,
          y: 52,
          label: "② Pushing Water Out & Tannins In",
          detail:
            "A raw hide is 65% water trapped between microscopic protein ropes called collagen. If left wet, bacteria rot it; if dried untreated, the fibers glue themselves into rock-hard rawhide. Tumbling forces tannin molecules into every microscopic pore.",
        },
        {
          id: "cross-links",
          number: 3,
          x: 48,
          y: 74,
          label: "③ Chemical Cross-Link Bridges",
          detail:
            "Inside the hide, tannin molecules lock onto adjacent collagen strands like tiny ladder rungs (cross-links). Those bridges keep the protein ropes spaced apart so the finished leather can bend millions of times without rotting or cracking!",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · THE PROBLEM",
        title: "Why Raw Hide Fails on Its Own",
        body: "Raw animal skin is made of tangled protein ropes (collagen) soaked in water. Leave it wet and bacteria digest it; dry it in the sun and the ropes stick together into a stiff board (rawhide).",
      },
      {
        step: "STEP 2 · THE ENGINEERING FIX",
        title: "Tumbling in Oak-Bark Tannins",
        body: "Tannery workers soak cleaned hides inside giant spinning drums filled with tannin—a natural molecule from tree bark that binds tightly to protein.",
      },
      {
        step: "STEP 3 · THE RESULT",
        title: "Permanent Cross-Linked Leather",
        body: "Tannin molecules form permanent chemical bridges between the collagen ropes, spacing them apart so they glide smoothly past each other for decades.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cowhide_fur_skin_in_a_furrier%27s_shop,_2011.jpg",
        fallbackSrc: "/prizes/sports/product-sports-005.avif",
        alt: "Raw cured cattle hide before tanning",
        badge: "Stage 1 · Raw Hide",
        title: "Uncured Cattle Hide (Before Tanning)",
        caption: "Before entering the tanning drum, hair and flesh are removed to expose the pure collagen fiber network.",
        specLabel: "Raw Composition",
        specValue: "~65% Water + 30% Collagen Protein",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Cowhide_fur_skin_in_a_furrier%27s_shop,_2011.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Leather_tanning,_Fes.jpg",
        fallbackSrc: "/prizes/sports/product-sports-006.avif",
        alt: "Traditional stone tanning vats filled with natural plant tannins and dyes",
        badge: "Stage 2 · Vegetable Tannin Vats",
        title: "Ancient Stone Tanning Vats (Fez, Morocco)",
        caption: "For thousands of years before motorized drums, tanners soaked hides in stone vats filled with tree-bark tannins.",
        specLabel: "Active Molecule",
        specValue: "Polyphenol Tannins (Oak / Mimosa Bark)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Leather_tanning,_Fes.jpg",
      },
      {
        src: "/prizes/sports/product-sports-005.avif",
        alt: "Finished Rawlings pro steerhide baseball glove",
        badge: "Stage 3 · Finished Steerhide",
        title: "Tanned Pro Steerhide Baseball Glove",
        caption: "Once cross-linked by tannins and nourished with oils, full-grain steerhide can absorb 90-mph fastballs for years.",
        specLabel: "Fiber Durability",
        specValue: "Cross-Linked Collagen · Rot-Proof",
      },
    ],
  },
  "hide-layers-explorer": {
    heading: "🔬 Real Hide Macro Photos · Full-Grain vs. Split Suede",
    subheading: "Tap pins (① ② ③) on the magnified leather surface to see why a pro glove uses the top layer while suede comes from the bottom split",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/LeatherTexture.jpg",
      fallbackSrc: "/prizes/sports/product-sports-006.avif",
      alt: "Close-up macro photograph of full-grain leather showing natural pore dimples and tight grain",
      creditLabel: "Wikimedia Commons · Macro Full-Grain Leather Surface",
      creditUrl: "https://commons.wikimedia.org/wiki/File:LeatherTexture.jpg",
      hotspots: [
        {
          id: "hair-pores",
          number: 1,
          x: 28,
          y: 32,
          label: "① Natural Hair Pore Dimples (Unbuffed Grain)",
          detail:
            "Look closely at those tiny dots! Those are the actual hair follicles where the cow's coat grew. Because Full-Grain leather is never sanded down, this outer skin stays intact and lets the leather breathe.",
        },
        {
          id: "vertical-weave",
          number: 2,
          x: 58,
          y: 48,
          label: "② Interlocking 3D Collagen Armor",
          detail:
            "Right beneath the pores, collagen bundles weave vertically and diagonally like a 3D steel chainmail mesh. When a 90-mph baseball slams into a glove pocket, this tight weave stops the leather from stretching out or ripping.",
        },
        {
          id: "patina-shine",
          number: 3,
          x: 44,
          y: 76,
          label: "③ Developing a Rich Patina",
          detail:
            "Instead of wearing out or peeling like fake plastic leather, full-grain leather absorbs natural hand oils and sunlight over time—developing a glossy, golden-brown sheen called patina.",
        },
      ],
    },
    steps: [
      {
        step: "10 MM CATTLE HIDE",
        title: "Why Must a Hide Be Sliced?",
        body: "A whole tanned cowhide is up to 10 millimeters thick (as thick as astack of five nickels!)—way too thick and stiff to bend around your hand as a glove.",
      },
      {
        step: "THE SPLITTING KNIFE",
        title: "Horizontal Band-Knife Slicer",
        body: "A razor-sharp horizontal steel band knife slices the hide right through the middle into two sheets: the tough upper layer (Full-Grain) and the lower layer (the Split).",
      },
      {
        step: "TWO VERY DIFFERENT MATERIALS",
        title: "Full-Grain Armor vs. Fuzzy Suede",
        body: "The top Full-Grain layer has ultra-dense interlocking fibers for pro gloves and saddles. The bottom Split has looser horizontal fibers that fray into a soft, velvety nap called suede!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wriggle_House_-_Full-Grain_Genuine_leather_Holdall_Travel_Bag.jpg",
        fallbackSrc: "/prizes/sports/product-sports-006.avif",
        alt: "Full-grain leather holdall bag showing smooth natural grain and patina",
        badge: "Top Cut · Full-Grain",
        title: "Full-Grain Outer Layer (Armor Grade)",
        caption: "Keeps the dense outer dermis untouched. Resists tearing and develops a deep patina shine with age.",
        specLabel: "Tensile Strength",
        specValue: "Highest (Dense 3D Crisscross Weave)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Wriggle_House_-_Full-Grain_Genuine_leather_Holdall_Travel_Bag.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Free_dirty_distressed_scratched_leather_texture_for_layers_creative_commons_(3005071597).jpg",
        fallbackSrc: "/prizes/sports/product-sports-018.avif",
        alt: "Close-up of fibrous napped suede leather texture",
        badge: "Bottom Cut · Split Suede",
        title: "Bottom Split Layer (Fuzzy Suede Nap)",
        caption: "With the tight top grain sliced away, both sides of the lower split have exposed fiber ends that feel like velvet.",
        specLabel: "Fiber Orientation",
        specValue: "Looser Horizontal Strands · Soft Nap",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Free_dirty_distressed_scratched_leather_texture_for_layers_creative_commons_(3005071597).jpg",
      },
      {
        src: "/prizes/sports/product-sports-006.avif",
        alt: "Rawlings Pro Steerhide Baseball Glove",
        badge: "Sports Engineering",
        title: "Why Pro Gloves Never Use Suede Shells",
        caption: "A suede shell would stretch out like a soggy sock after a week of fastballs; full-grain steerhide holds its bowl pocket.",
        specLabel: "Shell Thickness",
        specValue: "2.2–2.5 mm Top-Cut Steerhide",
      },
    ],
  },
  "glove-anatomy-lab": {
    heading: "⚾ Real Baseball Glove Factory & Anatomical Breakdown",
    subheading: "Tap pins (① ② ③ ④) on the real leather glove close-up to inspect how 30+ leather pieces and rawhide cables trap a ball",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baseball_leather_glove_close-up.jpg",
      fallbackSrc: "/prizes/sports/product-sports-005.avif",
      alt: "Close-up photograph of a leather baseball glove showing the web, pocket, and rawhide laces",
      creditLabel: "Wikimedia Commons · Leather Baseball Glove Anatomy Close-Up",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Baseball_leather_glove_close-up.jpg",
      hotspots: [
        {
          id: "glove-web",
          number: 1,
          x: 28,
          y: 28,
          label: "① The Web (Shock-Absorbing Net)",
          detail:
            "Bridging the gap between the thumb and index finger, the leather web acts like a suspension net. Infielders use an open H-Web or I-Web so dirt falls through and they can pull the ball out in a split second!",
        },
        {
          id: "glove-pocket",
          number: 2,
          x: 48,
          y: 54,
          label: "② The Deep Bowl Pocket (Sweet Spot)",
          detail:
            "Right below the web sits the sculpted bowl of full-grain steerhide. Catching the ball here kills its spin and protects your index finger from painful bone bruises.",
        },
        {
          id: "rawhide-laces",
          number: 3,
          x: 68,
          y: 26,
          label: "③ Stiff Untanned Rawhide Laces",
          detail:
            "Here's the coolest engineering contrast: the glove shell is soft tanned leather, but the laces are stiff untanned rawhide! Like steel cables on a suspension bridge, rawhide laces distribute a 90-mph impact across all five fingers so no single stitch rips.",
        },
        {
          id: "heel-hinge",
          number: 4,
          x: 52,
          y: 82,
          label: "④ Layered Felt & Leather Heel Hinge",
          detail:
            "Inside the base of the palm, dense wool felt and leather pads cushion your hand bones while creating a flexible hinge so your thumb and pinky snap shut like a Venus flytrap.",
        },
      ],
    },
    steps: [
      {
        step: "STEP 1 · DIE-CUTTING",
        title: "Stamping 30+ Steerhide Pieces",
        body: "Heavy steel cookie-cutter dies stamp out the palm shell, finger stalls, web bars, and welting strips from a single hide so the grain matches.",
      },
      {
        step: "STEP 2 · INSIDE-OUT TRICK",
        title: "Sewn Inside-Out & Steamed",
        body: "Master stitchers sew the shell completely inside-out! Then they steam the leather soft and flip every finger right-side-out using steel rods so the seams hide inside.",
      },
      {
        step: "STEP 3 · HAND-LACING",
        title: "Threading 6 Feet of Rawhide Cable",
        body: "A craftsperson threads stiff rawhide laces through the fingertips, web, and heel with a steel lacing needle, locking the 3D bowl structure together.",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baseball_glove_production_2.jpg",
        fallbackSrc: "/prizes/sports/product-sports-005.avif",
        alt: "Craftsperson sewing a leather baseball glove inside a workshop",
        badge: "Factory Craft",
        title: "Inside a Real Baseball Glove Workshop",
        caption: "Every pro baseball glove is sewn inside-out on heavy-duty post sewing machines before being turned and hand-laced.",
        specLabel: "Construction",
        specValue: "30+ Die-Cut Pieces · Turned Inside-Out",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Baseball_glove_production_2.jpg",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baseball_glove_front_back.jpg",
        fallbackSrc: "/prizes/sports/product-sports-006.avif",
        alt: "Front catching surface and back finger stalls of a leather baseball glove",
        badge: "Front & Back Views",
        title: "Catching Pocket vs. Finger Exoskeleton",
        caption: "The palm face forms a concave impact cradle while the back uses rolled leather welting strips to keep the fingers from bending backward.",
        specLabel: "Lacing Material",
        specValue: "Untanned 3/16-inch Rawhide Thongs",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Baseball_glove_front_back.jpg",
      },
      {
        src: "/prizes/sports/product-sports-005.avif",
        alt: "Rawlings 11.5-inch H-Web Infield Glove",
        badge: "Infield Blueprint",
        title: "11.5\" H-Web Infield Pattern",
        caption: "A shallower pocket and open H-web let a shortstop or second baseman find the seams and transfer the ball to their throwing hand in 0.6 seconds.",
        specLabel: "Target Transfer Time",
        specValue: "< 0.7 Seconds (Catch to Release)",
      },
    ],
  },
  "glove-breakin-simulator": {
    heading: "🔨 Real Glove Break-In Science · Training Collagen Hinges",
    subheading: "Tap pins (① ② ③) on the glove photo to see exactly where to pound and oil a glove—and why water or ovens ruin leather",
    heroPhoto: {
      src: "/prizes/sports/product-sports-005.avif",
      alt: "Rawlings pro leather baseball glove showing pocket and heel break-in zones",
      creditLabel: "Pro Steerhide Break-In Target Map",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Baseball_leather_glove_close-up.jpg",
      hotspots: [
        {
          id: "pocket-target",
          number: 1,
          x: 42,
          y: 48,
          label: "① Pocket Sweet Spot (Wooden Mallet Target)",
          detail:
            "Pounding right below the web with a rounded wooden mallet (or throwing 500 real catches!) gently stretches the collagen fiber cross-links into a deep bowl without weakening the surrounding fingers.",
        },
        {
          id: "dual-hinge",
          number: 2,
          x: 55,
          y: 76,
          label: "② Thumb & Pinky Heel Hinges",
          detail:
            "Flexing and mallet-tapping the two heel creases trains the collagen ropes along those exact fold lines so the glove snaps shut effortlessly with a 10-year-old's hand strength.",
        },
        {
          id: "finger-spines",
          number: 3,
          x: 72,
          y: 28,
          label: "③ Keep Finger Spines Stiff (Never Soak or Bake!)",
          detail:
            "If you dunk the whole glove in water or bake it in an oven, the fingertips lose their backbone! Water strips out natural oils leaving the glove floppy, while oven heat permanently shrinks and cracks collagen protein.",
        },
      ],
    },
    steps: [
      {
        step: "✅ PRO METHOD (PASS)",
        title: "Wooden Mallet + Pea-Sized Balm",
        body: "Mechanical pounding loosens collagen only at the pocket and heel hinges. A tiny drop of lanolin balm lubricates the fibers without clogging pores.",
      },
      {
        step: "⚠️ WATER BUCKET (FAIL)",
        title: "Why Dunking in Water Backfires",
        body: "Water floods the spaces between collagen ropes. As the water evaporates, it draws natural oils out with it—leaving the leather stretched, heavy, and lifeless.",
      },
      {
        step: "❌ HOT OVEN (DISASTER)",
        title: "Why High Heat Cooks Leather",
        body: "Collagen is a natural protein. Just like heat cooks an egg white stiff, baking a glove above 120°F permanently shrinks and snaps the leather fibers!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baseball_glove,_1904.jpg",
        fallbackSrc: "/prizes/sports/product-sports-005.avif",
        alt: "1904 vintage leather baseball glove",
        badge: "Historical Comparison",
        title: "1904 Leather Mitt vs. Modern Hinged Pocket",
        caption: "Early 1900s gloves were flat leather pancakes with no web or heel hinge—players had to catch with two hands!",
        specLabel: "Evolution",
        specValue: "Flat Pad (1904) → Sculpted 3D Bowl (Today)",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Baseball_glove,_1904.jpg",
      },
      {
        src: "/prizes/sports/product-sports-006.avif",
        alt: "Rawlings Camel and Navy Leather Glove",
        badge: "Dual Welting Spines",
        title: "Rolled Leather Welting (Finger Backbone)",
        caption: "Those raised seams along the back of each finger act like I-beams so line drives on the fingertips don't bend the glove backward.",
        specLabel: "Conditioner Rule",
        specValue: "Pea-Sized Balm · Keep Pores Breathing",
      },
      {
        src: "/prizes/sports/product-sports-022.avif",
        alt: "Pitching machine for high-rep pocket break-in",
        badge: "Pro Repetitions",
        title: "500 Live Catches = Custom Hand Mold",
        caption: "Each catch warms the collagen slightly from kinetic energy, molding the pocket to the exact shape of your hand.",
        specLabel: "Ideal Break-In",
        specValue: "Mallet Shaping + Live Catch Reps",
      },
    ],
  },
  "baseball-seam-windtunnel": {
    heading: "⚾ Real Sliced-Open Baseball & NASA Curveball Aerodynamics",
    subheading: "Tap pins (① ② ③) on the real sliced-open baseball photograph to see what's hidden under the 108 red leather stitches",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baseball_center_comparison.jpg",
      fallbackSrc: "/prizes/sports/product-sports-007.avif",
      alt: "Library of Congress photograph of a baseball sawed in half showing the cork pill, rubber casing, wool yarn windings, and leather cover",
      creditLabel: "Library of Congress / Wikimedia Commons · Sliced-Open Baseball Cross-Section",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Baseball_center_comparison.jpg",
      hotspots: [
        {
          id: "cork-pill",
          number: 1,
          x: 26,
          y: 50,
          label: "① Cushioned Cork-and-Rubber Center ('The Pill')",
          detail:
            "At the exact center of every official baseball is a sphere of Portuguese cork encased in two layers of black and red rubber. This core stores and releases elastic energy like a superball when hit by a bat!",
        },
        {
          id: "wool-windings",
          number: 2,
          x: 36,
          y: 36,
          label: "② Over 360 Yards of Tightly Wound Wool Yarn",
          detail:
            "Wrapped around the rubber pill are four distinct layers of blue-gray and white wool yarn—more than three football fields of string wound under high tension so the ball keeps its perfect sphere shape at 100 mph.",
        },
        {
          id: "cowhide-stitches",
          number: 3,
          x: 45,
          y: 22,
          label: "③ Alum-Tanned Cowhide & 108 Raised Stitches",
          detail:
            "The outer cover is two flat figure-eight pieces of white cowhide leather, hand-sewn with 88 inches of waxed red thread into 108 raised double-stitches that grip the air to make curveballs dive!",
        },
      ],
    },
    steps: [
      {
        step: "GEOMETRY SECRET",
        title: "2 Flat Figure-8s = 1 Perfect Sphere",
        body: "You can't wrap a flat square of leather around a ball without wrinkles. Two curvy figure-8 saddle panels interlock around the sphere with zero creases!",
      },
      {
        step: "BOUNDARY LAYER GRIP",
        title: "Why the 108 Stitches Must Stick Up",
        body: "A completely smooth ball slips through the air unpredictably. The 108 raised red leather seams stir up a thin 'boundary layer' of air that clings to the spinning ball.",
      },
      {
        step: "THE MAGNUS EFFECT",
        title: "How Topspin Makes a Curveball Dive",
        body: "When a pitcher snaps topspin on a curveball, the raised seams whip air downward behind the ball—creating high pressure on top and low pressure underneath that shoves the ball down!",
      },
    ],
    cards: [
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Cushioned_cork_center_baseball_schematic_from_Evolution_of_the_Ball.png",
        fallbackSrc: "/prizes/sports/product-sports-007.avif",
        alt: "Engineering cutaway diagram of the cushioned cork center baseball",
        badge: "Interior Blueprint",
        title: "Official 5-Layer Baseball Cutaway Schematic",
        caption: "Shows the exact concentric layers inside a baseball: cork nucleus, black & red rubber rings, 4-ply wool yarn windings, cotton finishing string, and cowhide cover.",
        specLabel: "Official Weight & Size",
        specValue: "5.0–5.25 oz · 9.0–9.25 inch Circumference",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Cushioned_cork_center_baseball_schematic_from_Evolution_of_the_Ball.png",
      },
      {
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Curveball-magnus-effect.jpg",
        fallbackSrc: "/prizes/sports/product-sports-007.avif",
        alt: "Fluid dynamics simulation of the Magnus effect on a spinning curveball",
        badge: "Wind Tunnel Physics",
        title: "Magnus Effect Pressure & Velocity Vectors",
        caption: "Computer wind-tunnel simulation showing how rotation speeds up airflow on one side of the ball and slows it on the other, generating sideways/downward curve force.",
        specLabel: "Curveball Spin Rate",
        specValue: "~2,500–3,000 RPM → Up to 17\" Drop",
        sourceLabel: "Wikimedia Commons · CFD Simulation",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Curveball-magnus-effect.jpg",
      },
      {
        src: "https://www.grc.nasa.gov/www/k-12/VirtualAero/BottleRocket/airplane/Images/bball.gif",
        fallbackSrc: "/prizes/sports/product-sports-007.avif",
        alt: "NASA Glenn Research Center diagram of lift and drag on a spinning baseball",
        badge: "NASA Aeronautics Lab",
        title: "NASA Glenn Research Center: Spinning Baseball Lift",
        caption: "NASA's wind-tunnel diagram showing how the raised stitches trip the boundary layer and deflect the wake behind the spinning baseball.",
        specLabel: "Aerodynamic Force",
        specValue: "Magnus Lift Perpendicular to Spin Axis",
        sourceLabel: "NASA Glenn Research Center",
        sourceUrl: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/lift-of-a-baseball/",
      },
    ],
  },
  "teivah-blueprint-explorer": {
    heading: "🚢 Architectural Cross-Section & Historical Art of Noach's Teivah",
    subheading: "Explore how the 300 × 50 × 30 Amah Ark was engineered across three functional decks (Bereishis 6:14–16 & Rashi)",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Noahs_Ark.jpg",
      alt: "Edward Hicks 1846 painting of Noah's Ark with animals boarding two by two",
      creditLabel: "Philadelphia Museum of Art / Wikimedia Commons · Noah's Ark (1846)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Noahs_Ark.jpg",
      hotspots: [
        {
          id: "ark-hull",
          number: 1,
          x: 52,
          y: 36,
          label: "① 300 × 50 × 30 Amos (6:1 Stability Ratio)",
          detail:
            "At roughly 450 feet long, 75 feet wide, and 45 feet tall, the Teivah had a 6-to-1 length-to-width ratio—the exact hull proportion modern naval architects use so cargo ships don't capsize in giant waves!",
        },
        {
          id: "kofer-pitch",
          number: 2,
          x: 68,
          y: 44,
          label: "② Coated Inside & Out with Pitch (Kofer)",
          detail:
            "Rashi explains that unlike river boats coated only on the outside, the Teivah was waterproofed with thick pitch both inside and outside to withstand the boiling turbulence of the Mabul.",
        },
        {
          id: "sloped-roof",
          number: 3,
          x: 56,
          y: 24,
          label: "③ 1-Amah Sloped Roof & Glowing Tzohar",
          detail:
            "The roof tapered upward to a 1-amah ridge so torrential rain slid right off, while the Tzohar (a skylight window or radiant gemstone according to Rashi) illuminated all three decks.",
        },
      ],
    },
    steps: [
      {
        step: "TOP DECK (DECK 3)",
        title: "Human Quarters & The Tzohar",
        body: "Chazal (Sanhedrin 108b; Rashi on Bereishis 6:16) teach that the top story housed Noach, his family, clean air, and the glowing Tzohar.",
      },
      {
        step: "MIDDLE DECK (DECK 2)",
        title: "Animal Stalls & Food Stores",
        body: "The middle deck sheltered the animals and birds in separated stalls with a full year of feed right beside them.",
      },
      {
        step: "BOTTOM DECK (DECK 1)",
        title: "Refuse Storage & Hull Ballast",
        body: "The lowest deck held waste and heavy ballast low in the hull, keeping the Teivah's center of gravity low so it stayed upright.",
      },
    ],
    cards: [],
  },
  "salanter-storybook": {
    heading: "🕯️ Archival Portrait & Historical Context · Rav Yisroel Salanter",
    subheading: "Tap the pins on Rav Yisroel Lipkin Salanter's portrait to see how a late-night walk in Vilna sparked a worldwide movement",
    heroPhoto: {
      src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rav_Yisrael_Lipkin_Salanter_(1809-1883).jpg",
      alt: "Historical portrait of Rabbi Yisrael Lipkin Salanter (1809–1883)",
      creditLabel: "Wikimedia Commons · Rav Yisroel Lipkin Salanter (1809–1883)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Rav_Yisrael_Lipkin_Salanter_(1809-1883).jpg",
      hotspots: [
        {
          id: "salanter-who",
          number: 1,
          x: 50,
          y: 30,
          label: "① Founder of the Mussar Movement (1810–1883)",
          detail:
            "Born in Zhagory and raised in Salant, Lithuania, Rav Yisroel Salanter was a towering Torah genius who taught that sharpening the mind isn't enough—we must also train our heart, middos (character traits), and kindness toward every person.",
        },
        {
          id: "shoemaker-candle",
          number: 2,
          x: 48,
          y: 62,
          label: "② The Shoemaker's Flickering Candle in Vilna",
          detail:
            "Seeing a cobbler hammering leather boots by a tiny melting stub of candle late at night, Rav Salanter asked why he was still working. The cobbler answered: 'As long as the candle is still burning, it is still possible to mend and repair!'",
        },
        {
          id: "soul-candle",
          number: 3,
          x: 52,
          y: 84,
          label: "③ 'Ner Hashem Nishmas Adam' (The Soul Is Hashem's Candle)",
          detail:
            "Connecting the cobbler's words to Mishlei 20:27, Rav Salanter repeated for weeks: as long as our soul's flame is burning and we have today, it is never too late to fix a habit, apologize, and grow.",
        },
      ],
    },
    steps: [
      {
        step: "SCENE 1 · LATE NIGHT IN VILNA",
        title: "A Cobbler Hammering by a Dying Flame",
        body: "Through a frost-covered basement window, Rav Salanter spots a shoemaker stitching leather soles even though his tallow candle is almost gone.",
      },
      {
        step: "SCENE 2 · THE COBBLER'S REPLY",
        title: "“While the Candle Burns, We Can Mend!”",
        body: "The shoemaker doesn't give up just because the flame is small—every minute of light is precious time to finish the repair.",
      },
      {
        step: "SCENE 3 · THE MUSSAR LESSON",
        title: "Repairing Our Middos Every Day",
        body: "Just like a craftsman mends leather while the lamp is lit, a person can always repair their character (middos) while the soul shines.",
      },
    ],
    cards: [],
  },
  ...TOBI_AND_EXTRA_PACKS,
};

function PhotoWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function RealWorldGallery({ kind }: { kind: DiagramKind }) {
  const pack = VISUAL_PACKS[kind];
  const [activePin, setActivePin] = useState(0);

  if (!pack) return null;

  const pin = pack.heroPhoto.hotspots[activePin] ?? pack.heroPhoto.hotspots[0];

  return (
    <div className="real-world-gallery" aria-label={pack.heading}>
      <div className="real-world-gallery-header">
        <div>
          <span className="real-world-gallery-badge">{pack.heading}</span>
          <p className="real-world-gallery-sub">{pack.subheading}</p>
        </div>
        <a
          href={pack.heroPhoto.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="real-world-credit-link"
        >
          {pack.heroPhoto.creditLabel} ↗
        </a>
      </div>

      {/* Interactive Annotated Real Photo + Pin Inspector */}
      <div className="real-world-hero-split">
        <div className="real-world-hero-stage">
          <PhotoWithFallback
            src={pack.heroPhoto.src}
            fallbackSrc={pack.heroPhoto.fallbackSrc}
            alt={pack.heroPhoto.alt}
            className="real-world-hero-img"
          />
          {pack.heroPhoto.hotspots.map((h, idx) => {
            const isSelected = idx === activePin;
            return (
              <button
                key={h.id}
                type="button"
                className={`real-world-pin ${isSelected ? "is-active" : ""}`}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                aria-pressed={isSelected}
                aria-label={h.label}
                onClick={() => setActivePin(idx)}
              >
                {h.number}
              </button>
            );
          })}
        </div>

        <div className="real-world-inspector">
          <div className="real-world-pin-tabs" role="tablist" aria-label="Photograph callouts">
            {pack.heroPhoto.hotspots.map((h, idx) => (
              <button
                key={h.id}
                type="button"
                role="tab"
                aria-selected={idx === activePin}
                className={`real-world-pin-tab ${idx === activePin ? "is-active" : ""}`}
                onClick={() => setActivePin(idx)}
              >
                Pin {h.number}
              </button>
            ))}
          </div>
          {pin && (
            <div className="real-world-pin-detail" aria-live="polite">
              <strong data-narration-text>{pin.label}</strong>
              <p data-narration-text>{pin.detail}</p>
            </div>
          )}
        </div>
      </div>

      {/* Step-by-Step Visual Cause -> Mechanism -> Effect Chain */}
      <div className="real-world-step-chain" role="list" aria-label="Step-by-step visual explanation">
        {pack.steps.map((s) => (
          <div key={s.step} className="real-world-step-card" role="listitem">
            <span className="real-world-step-pill">{s.step}</span>
            <strong data-narration-text>{s.title}</strong>
            <p data-narration-text>{s.body}</p>
          </div>
        ))}
      </div>

      {/* Additional Real-Life Reference Photographs & Schematics */}
      {pack.cards.length > 0 && (
        <div className="real-world-gallery-grid">
          {pack.cards.map((item) => (
            <figure key={item.title} className="real-world-card">
              <div className="real-world-photo-frame">
                <PhotoWithFallback
                  src={item.src}
                  fallbackSrc={item.fallbackSrc}
                  alt={item.alt}
                  className="real-world-photo"
                />
                <span className="real-world-photo-tag">{item.badge}</span>
              </div>
              <figcaption className="real-world-caption">
                <strong>{item.title}</strong>
                <p>{item.caption}</p>
                <div className="real-world-spec-pill">
                  <span>{item.specLabel}:</span>{" "}
                  <strong>{item.specValue}</strong>
                </div>
                {item.sourceUrl && item.sourceLabel && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="real-world-card-source"
                  >
                    Source: {item.sourceLabel} ↗
                  </a>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
