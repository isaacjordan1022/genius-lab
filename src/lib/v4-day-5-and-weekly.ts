import type { Question } from "./content-types";
import { type DayBlueprint, placeCorrect } from "./v4-types";

export const DAY_5: DayBlueprint = {
  order: 5,
  title: "Day 5 · 108 Stitches, Curveballs & Hilchot Muktzeh",
  readingPassage: {
    title: "The Mystery of the Diving Pitch",
    text: `At batting practice, pitcher Ari threw two baseballs that weighed the exact same five ounces. The first ball was an old batting-cage ball whose raised red stitches had been worn totally smooth against concrete. The second was a fresh cowhide baseball with 108 crisp, raised red cotton stitches.

Catcher Leo was skeptical when Ari claimed the fresh ball would drop sharper on a curveball. "Weight is weight," Leo argued. "A few millimeters of red thread can't bend a pitch!" Ari threw both balls with the same overhand topspin. The worn smooth ball floated straight into Leo's chest protector, but the stitched ball bit the air and dove six inches into the dirt!

To verify why, the boys held both balls in front of a workshop fan with paper streamers. Around the spinning stitched ball, the raised seams whipped turbulence into the airflow, deflecting air upward behind the ball and shoving the ball downward.`,
    words: [
      {
        word: "skeptical",
        meaning: "Doubtful or not easily convinced until you see clear proof.",
        example: "Leo was skeptical that tiny red stitches could make a baseball dive.",
      },
      {
        word: "verify",
        meaning: "To test and check whether a claim is actually true using evidence.",
        example: "The boys used a fan and paper streamers to verify how the stitches moved the air.",
      },
      {
        word: "turbulence",
        meaning: "Swirling, unsteady movement of air or water.",
        example: "The spinning red seams stirred up turbulence in the thin layer of air around the ball.",
      },
      {
        word: "deflect",
        meaning: "To cause something moving to change direction or turn aside.",
        example: "Topspin and raised stitches deflect airflow, pushing the curveball downward.",
      },
    ],
  },
  chunks: [
    {
      idSuffix: "chunk-1",
      title: "Word Workshop & Short Reading: The Diving Pitch",
      subjects: ["Vocabulary", "Reading & thinking"],
      objectives: [
        "Use skeptical, verify, turbulence, and deflect accurately",
        "Analyze how a controlled two-ball comparison proves the aerodynamic role of raised stitches",
      ],
      teaching: [
        {
          kind: "vocabulary",
          title: "Unlock Today's 4 Power Words",
          text: "Flip each word card to learn its definition and example sentence, then play the Quick Word Lightning Check!",
          highlight: ["skeptical", "verify", "turbulence", "deflect"],
          terms: [
            {
              word: "skeptical",
              meaning: "Doubtful or not easily convinced until you see clear proof.",
              example: "Leo was skeptical that tiny red stitches could make a baseball dive.",
            },
            {
              word: "verify",
              meaning: "To test and check whether a claim is actually true using evidence.",
              example: "The boys used a fan and paper streamers to verify how the stitches moved the air.",
            },
            {
              word: "turbulence",
              meaning: "Swirling, unsteady movement of air or water.",
              example: "The spinning red seams stirred up turbulence in the thin layer of air around the ball.",
            },
            {
              word: "deflect",
              meaning: "To cause something moving to change direction or turn aside.",
              example: "Topspin and raised stitches deflect airflow, pushing the curveball downward.",
            },
          ],
        },
        {
          kind: "passage",
          title: "The Mystery of the Diving Pitch",
          text: `At batting practice, pitcher Ari threw two baseballs that weighed the exact same five ounces. The first ball was an old batting-cage ball whose raised red stitches had been worn totally smooth against concrete. The second was a fresh cowhide baseball with 108 crisp, raised red cotton stitches.\n\nCatcher Leo was skeptical when Ari claimed the fresh ball would drop sharper on a curveball. "Weight is weight," Leo argued. "A few millimeters of red thread can't bend a pitch!" Ari threw both balls with the same overhand topspin. The worn smooth ball floated straight into Leo's chest protector, but the stitched ball bit the air and dove six inches into the dirt!\n\nTo verify why, the boys held both balls in front of a workshop fan with paper streamers. Around the spinning stitched ball, the raised seams whipped turbulence into the airflow, deflecting air upward behind the ball and shoving the ball downward.`,
          highlight: ["skeptical", "verify", "turbulence", "deflecting"],
        },
      ],
      form1: {
        c1: {
          objective: "vocab-skeptical-meaning",
          prompt:
            "In paragraph 2 of “The Mystery of the Diving Pitch,” what does it mean that Leo was skeptical of Ari's claim?",
          correct:
            "He doubted that tiny raised stitches could make the ball curve more until he saw proof.",
          wrong: [
            "He immediately believed every word Ari said without testing.",
            "He was afraid to wear his catcher's chest protector.",
            "He forgot how much a baseball weighs.",
          ],
          explanation:
            "Skeptical means doubtful or questioning a claim until clear evidence is shown.",
        },
        o1: {
          objective: "reading-pitch-experiment",
          prompt:
            "In “The Mystery of the Diving Pitch,” how did Ari and Leo make sure their test was a fair comparison between the two baseballs? Cite two things they kept the same and one thing that was different.",
          exemplar:
            "They kept the weight the same (both balls weighed five ounces) and threw both with the same overhand topspin, plus tested both in front of the same fan. The one key difference was that one ball had smooth worn-down seams while the other had 108 crisp raised stitches.",
          rubric: [
            "Names equal weight (five ounces) as a controlled factor",
            "Names same overhand topspin (or fan setup) as a second controlled factor",
            "Identifies the raised stitches vs. smooth worn seams as the changed variable",
            "Explains how this fair test disproved Leo's 'weight is weight' argument",
          ],
          explanation:
            "Because both balls weighed five ounces and had the same spin, the six-inch drop had to come from the raised stitches interacting with the air.",
        },
        m1: {
          objective: "vocab-match-day5",
          prompt: "Connect each vocabulary word from the passage to its meaning.",
          matches: [
            { left: "Skeptical", right: "Doubtful until shown real evidence" },
            { left: "Verify", right: "Test and confirm whether a claim is true" },
            { left: "Turbulence", right: "Swirling, agitated movement of air" },
            { left: "Deflect", right: "Push or turn a moving stream in a new direction" },
          ],
          explanation:
            "Skeptical is doubtful; verify is test/confirm; turbulence is swirling airflow; deflect is turn aside.",
        },
        c2: {
          objective: "reading-pitch-streamers",
          prompt:
            "Why did Ari and Leo attach paper streamers to the workshop fan in paragraph 3 of “The Mystery of the Diving Pitch”?",
          correct:
            "To make invisible airflow visible so they could verify how the spinning stitches deflected the air.",
          wrong: [
            "To dry wet paint on the catcher's mask.",
            "To measure the weight of the cotton thread.",
            "To cool down the batting cage.",
          ],
          explanation:
            "Air is invisible; paper streamers trace the path of the wind so the boys could see the turbulence and deflection.",
        },
        o2: {
          objective: "reading-pitch-application",
          prompt:
            "Pitchers frequently rub mud on a slick brand-new baseball or ask the umpire for a new ball if the stitches get scuffed flat. Based on “The Mystery of the Diving Pitch,” explain why a pitcher cares so much about those 108 raised seams!",
          exemplar:
            "First, the raised red stitches give the pitcher's fingertips grip to spin the ball fast. Second, as the ball flies through the air, those raised seams create turbulence and deflect the airflow so a curveball dives sharply instead of floating straight!",
          rubric: [
            "Mentions finger grip on the leather/seams to create spin",
            "Explains that the raised stitches grab the air / create turbulence in flight",
            "Connects seam height and spin to deflecting air and making the pitch curve",
            "Contrasts with what happens when seams are worn smooth (floats straight)",
          ],
          explanation:
            "Without raised seams for both finger traction and aerodynamic seam drag, a spinning baseball cannot bite the air effectively.",
        },
      },
      form2: {
        c1: {
          objective: "vocab-skeptical-meaning",
          prompt:
            "In paragraph 3 of “The Mystery of the Diving Pitch,” what does it mean that the raised seams deflected the airflow?",
          correct: "They pushed and turned the moving air in a different direction.",
          wrong: [
            "They made all the air in the room disappear.",
            "They froze the air into ice cubes.",
            "They painted the paper streamers red.",
          ],
          explanation:
            "Deflect means to turn aside or redirect a moving object or stream of air.",
        },
        o1: {
          objective: "reading-pitch-experiment",
          prompt:
            "In “The Mystery of the Diving Pitch,” why was Leo's statement “Weight is weight” incomplete for explaining how a baseball flies?",
          exemplar:
            "Weight isn't the only force acting on a flying baseball—air resistance and aerodynamics matter too! Even though both balls weighed five ounces, the 108 raised stitches on the fresh ball whipped up turbulence and deflected the air to push the curveball down six inches.",
          rubric: [
            "Acknowledges that both balls did have the same five-ounce weight",
            "Explains that air/aerodynamics also acts on a moving ball",
            "Describes how the 108 raised stitches create turbulence and deflect air",
            "Cites the result: the stitched ball dove six inches while the smooth ball floated straight",
          ],
          explanation:
            "In a vacuum only weight/gravity would matter, but in air, surface texture (stitches) and spin create aerodynamic lift and drag.",
        },
        m1: {
          objective: "vocab-match-day5",
          prompt: "Connect each vocabulary word from the passage to its meaning.",
          matches: [
            { left: "Skeptical", right: "Doubtful until shown real evidence" },
            { left: "Verify", right: "Test and confirm whether a claim is true" },
            { left: "Turbulence", right: "Swirling, agitated movement of air" },
            { left: "Deflect", right: "Push or turn a moving stream in a new direction" },
          ],
          explanation:
            "Skeptical is doubtful; verify is test/confirm; turbulence is swirling airflow; deflect is turn aside.",
        },
        c2: {
          objective: "reading-pitch-streamers",
          prompt:
            "What happened when Ari threw the old smooth batting-cage ball with overhand topspin in “The Mystery of the Diving Pitch”?",
          correct: "It floated straight into Leo's chest protector instead of diving.",
          wrong: [
            "It dove six inches into the dirt.",
            "It flew backward over the fence.",
            "It exploded into 108 pieces.",
          ],
          explanation:
            "Without raised stitches to grip the boundary layer of air, the smooth ball could not generate strong downward aerodynamic force.",
        },
        o2: {
          objective: "reading-pitch-application",
          prompt:
            "Was Leo being a bad scientist by starting out skeptical in “The Mystery of the Diving Pitch”? Explain when being skeptical is helpful and what a good thinker does next.",
          exemplar:
            "Being skeptical at first is actually great for a scientist as long as you are willing to test and verify the claim! Leo questioned the claim, watched the two pitches, and then helped run the fan-and-streamer test to see why the stitches worked.",
          rubric: [
            "Explains that healthy skepticism (asking for proof) is part of good thinking",
            "Emphasizes that a good thinker tests/verifies the claim with evidence",
            "Cites Leo's willingness to observe the pitches and run the fan test",
            "Distinguishes open-minded testing from stubbornly ignoring results",
          ],
          explanation:
            "Skepticism paired with fair experimentation is how real engineers and scientists discover how things work.",
        },
      },
    },
    {
      idSuffix: "chunk-2",
      title: "How Things Work: 108 Stitches & Baseball Aerodynamics",
      subjects: ["How things work"],
      objectives: [
        "Describe how two figure-eight alum-tanned cowhide panels and 108 stitches wrap a baseball",
        "Explain how raised seams and spin create the Magnus effect to curve a pitch",
      ],
      teaching: [
        {
          kind: "mechanism",
          title: "Inside the Baseball: Figure-Eight Leather & The Magnus Force",
          diagram: "baseball-seam-windtunnel",
          text: `Look closely at an official baseball: how do you wrap flat leather smoothly around a round ball without wrinkles? Engineers solved this geometry puzzle using two identical Figure-Eight (saddle-shaped) panels stamped from white alum-tanned cowhide! Workers dampen the leather panels so they stretch snugly around the cork-and-wool core, then hand-sew them together using 88 inches of waxed red cotton thread into exactly 108 double stitches.\n\nThose 108 raised stitches aren't just holding the leather cover on—they control how the ball flies! When a pitcher throws a curveball with heavy topspin, the raised seams grip a thin layer of air around the ball (seam drag). The spinning seams whip air downward and backward on one side, creating higher air pressure on top and lower pressure underneath. This pressure difference—called the Magnus Effect—pushes the ball into a sudden dive!`,
          highlight: ["Figure-Eight", "alum-tanned", "108 double stitches", "Magnus Effect"],
          terms: [
            {
              word: "Figure-Eight Panels",
              meaning: "Two peanut- or saddle-shaped leather pieces that interlock to wrap a sphere without wrinkles.",
              example: "Unfolding a baseball cover reveals two identical figure-eight leather strips.",
            },
            {
              word: "Alum-Tanned Cowhide",
              meaning: "Leather tanned with aluminum salts instead of dark tree bark, making it bright white!",
              example: "Baseballs use alum-tanned cowhide so batters and fielders can spot the white ball against the sky.",
            },
            {
              word: "Magnus Effect",
              meaning: "The sideways or downward force on a spinning ball caused by uneven air pressure.",
              example: "Topspin plus raised stitches use the Magnus effect to make a curveball drop.",
            },
          ],
          sources: [
            {
              label: "NASA Glenn Research Center · Aerodynamics of a Baseball",
              url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/aerodynamics-of-baseball/",
            },
          ],
        },
      ],
      form1: {
        c1: {
          objective: "baseball-leather-alum",
          prompt:
            "Why is the leather cover of a baseball tanned with aluminum salts (alum-tanned) instead of dark oak-bark tannins?",
          correct:
            "Alum tanning preserves the cowhide while turning it bright white so players can see the ball clearly!",
          wrong: [
            "Alum tanning makes the baseball weigh fifty pounds.",
            "Oak bark would make the ball invisible on radar.",
            "Alum tanning turns the leather into liquid metal.",
          ],
          explanation:
            "Oak-bark tanning dyes leather brown (like a glove), whereas alum tanning produces bright white leather for visibility.",
        },
        o1: {
          objective: "baseball-figure8-and-seams",
          prompt:
            "Explain two jobs that the 108 red stitches perform on a baseball: one structural job when the ball is made, and one aerodynamic job when the ball is pitched.",
          exemplar:
            "Structurally, the 108 double stitches pull the two flat figure-eight cowhide panels tightly together around the round core without wrinkles. Aerodynamically, the raised stitches grip the air as the ball spins, creating turbulence and the Magnus effect so pitches can curve or drop.",
          rubric: [
            "Explains the structural job (holding the two figure-eight leather panels tightly around the core)",
            "Explains the aerodynamic job (gripping air / creating seam drag or turbulence during spin)",
            "Connects the spinning seams to curving or dropping the pitch (Magnus effect)",
            "Addresses both jobs clearly",
          ],
          explanation:
            "The 108 stitches are a classic example of form meeting function: they join the 3D leather puzzle and act as aerodynamic tripwires in flight.",
        },
        m1: {
          objective: "baseball-aero-match",
          prompt: "Connect each baseball engineering term to its explanation.",
          matches: [
            { left: "Figure-Eight Panels", right: "Two saddle-shaped leather pieces that wrap a sphere smoothly" },
            { left: "Alum-Tanned Cowhide", right: "White-tanned leather cover for high visibility" },
            { left: "108 Double Stitches", right: "Hand-sewn waxed red threads that hold panels and grip air" },
            { left: "Magnus Effect", right: "Pressure difference on a spinning ball that bends its flight" },
          ],
          explanation:
            "Figure-eight panels wrap the sphere; alum tanning makes white leather; 108 stitches join and grip air; Magnus effect curves the spinning ball.",
        },
        c2: {
          objective: "baseball-magnus-direction",
          prompt:
            "When a pitcher snaps their fingers over the top of the ball to give a curveball heavy topspin, which way does the Magnus force push the ball?",
          correct: "Downward, making the pitch dive steeper than gravity alone.",
          wrong: [
            "Straight up into the clouds.",
            "Backward toward second base.",
            "It stops the ball in mid-air.",
          ],
          explanation:
            "Topspin creates higher pressure above the ball and lower pressure below it, adding a downward Magnus force to gravity.",
        },
        o2: {
          objective: "baseball-leather-glove-connection",
          prompt:
            "Think back across all 5 days of How Things Work: both a baseball AND a baseball glove are made of cattle hide, yet one is white and stretched tight while the other is brown and flexible. Explain how tanners and engineers customize leather for each job!",
          exemplar:
            "For the baseball cover, tanners use alum tanning to make the cowhide bright white and dampen two figure-eight panels so they shrink tight and firm around the core with 108 stitches. For the glove, tanners use bark/mineral tanning on thick full-grain steerhide so the collagen stays supple, shock-absorbing, and able to mold a deep pocket!",
          rubric: [
            "Describes how the baseball leather is prepared (alum-tanned white, stretched tight in figure-eight panels)",
            "Describes how the glove leather is prepared (tanned full-grain steerhide, supple and shock-absorbing)",
            "Explains why each job needs those different properties (visibility/bounce vs. catching/molding)",
            "Synthesizes concepts from the week clearly",
          ],
          explanation:
            "The same raw biological material—cattle hide collagen—can be engineered into a tight white projectile cover or a supple brown shock-absorbing mitt!",
        },
      },
      form2: {
        c1: {
          objective: "baseball-leather-alum",
          prompt:
            "Why is a baseball cover cut into two Figure-Eight shapes instead of one flat circle of leather?",
          correct:
            "A flat circle wrinkles when wrapped around a sphere, whereas two interlocking figure-eight panels curve smoothly around the ball.",
          wrong: [
            "Because cows are shaped like the number eight.",
            "So the ball will bounce sideways like a football.",
            "Because steel dies cannot cut circles.",
          ],
          explanation:
            "Wrapping a flat sheet around a sphere causes bunches and folds; two saddle-shaped figure-eight strips fit together smoothly around a ball.",
        },
        o1: {
          objective: "baseball-figure8-and-seams",
          prompt:
            "Why do workers dampen the two figure-eight leather panels before hand-stitching them around a baseball core?",
          exemplar:
            "Dampening the alum-tanned leather makes it stretchy so the worker can pull the 108 stitches tight without wrinkles. Then, as the leather dries, it shrinks slightly and hugs the core like a drumskin!",
          rubric: [
            "Explains that damp leather stretches more easily while stitching",
            "Explains that the panels shrink snugly around the core as they dry",
            "Connects this to a smooth, wrinkle-free, tight cover",
            "Uses clear cause-and-effect reasoning",
          ],
          explanation:
            "Stretching damp leather and letting it dry creates a drum-tight fit around the cork-and-wool center.",
        },
        m1: {
          objective: "baseball-aero-match",
          prompt: "Connect each baseball engineering term to its explanation.",
          matches: [
            { left: "Figure-Eight Panels", right: "Two saddle-shaped leather pieces that wrap a sphere smoothly" },
            { left: "Alum-Tanned Cowhide", right: "White-tanned leather cover for high visibility" },
            { left: "108 Double Stitches", right: "Hand-sewn waxed red threads that hold panels and grip air" },
            { left: "Magnus Effect", right: "Pressure difference on a spinning ball that bends its flight" },
          ],
          explanation:
            "Figure-eight panels wrap the sphere; alum tanning makes white leather; 108 stitches join and grip air; Magnus effect curves the spinning ball.",
        },
        c2: {
          objective: "baseball-magnus-direction",
          prompt:
            "How many double stitches of waxed red cotton thread hold an official baseball's leather panels together?",
          correct: "108 double stitches",
          wrong: [
            "12 stitches",
            "1,000 stitches",
            "Zero—they are glued with Kofer pitch",
          ],
          explanation:
            "Every official baseball is hand-sewn with 88 inches of waxed red thread into 108 double stitches.",
        },
        o2: {
          objective: "baseball-leather-glove-connection",
          prompt:
            "Explain in your own words how the Magnus Effect works on a spinning baseball, and why the 108 raised stitches make that effect stronger.",
          exemplar:
            "When a baseball spins through the air, one side turns with the wind and the other turns against it, creating a pressure difference (the Magnus effect) that pushes the ball sideways or down. The 108 raised stitches act like tiny paddles that grab the air and make that pressure difference much stronger!",
          rubric: [
            "Describes the ball spinning through moving air",
            "Explains that uneven air speed/pressure on opposite sides pushes the ball (Magnus effect)",
            "Explains how the 108 raised stitches grip/trip the air to strengthen the effect",
            "Explains the concept clearly in the child's own words",
          ],
          explanation:
            "Raised stitches roughness-trip the boundary layer of air, amplifying the Magnus pressure difference on a spinning pitch.",
        },
      },
    },
    {
      idSuffix: "chunk-3",
      title: "Hilchot Shabbos: Understanding Muktzeh & Shabbos Sensitivity",
      subjects: ["Torah", "Halacha"],
      objectives: [
        "Distinguish Muktzeh Machmas Gufo (rocks, coins, raw hides) from Kli Shemelachto L'Issur (a hammer or pen)",
        "Apply the rules of L'tzorech Gufo (need its body) and L'tzorech Mekomo (need its place) on Shabbos",
      ],
      teaching: [
        {
          kind: "halacha",
          title: "Hilchot Shabbos: The Interactive Muktzeh Guide",
          diagram: "shabbos-muktzeh-explorer",
          text: `To keep the peaceful atmosphere of Shabbos distinct from the busy workweek, the Sages instituted the laws of Muktzeh ("set aside")—certain items that we do not handle or move on Shabbos. Not all objects have the same rule! Let's learn the three main categories in Shulchan Aruch (Orach Chaim 308):\n\n1. Kli Shemelachto L'Heter (Permitted Utensil): Items whose normal job is permitted on Shabbos—like a Siddur, plate, fork, or Kiddush cup. These are NOT Muktzeh and may be moved for any normal need (to use them, clear their space, or protect them).\n2. Kli Shemelachto L'Issur (Weekday Work Tool): A real tool (Kli) whose main job is forbidden on Shabbos—like a metal hammer, screwdriver, or pen. Because it IS a usable utensil, you MAY move it in two famous cases: L'tzorech Gufo (to use its body for a permitted Shabbos action, like cracking a hard walnut with a hammer!) or L'tzorech Mekomo (if it is lying on a chair or table spot you need to use!). However, you may NOT move it just to protect the tool from rain or theft.\n3. Muktzeh Machmas Gufo (Intrinsic Muktzeh): Items that are not utensils and not food—like stones, dirt, coins, sticks, or untanned raw leather hides! These are strict Muktzeh and may NOT be moved by hand even if you want their spot or want to prop open a door.`,
          highlight: [
            "Muktzeh",
            "Kli Shemelachto L'Heter",
            "Kli Shemelachto L'Issur",
            "L'tzorech Gufo",
            "L'tzorech Mekomo",
            "Muktzeh Machmas Gufo",
          ],
          terms: [
            {
              word: "Kli Shemelachto L'Issur",
              meaning: "A utensil whose main weekday job is forbidden on Shabbos (like a hammer or pen).",
              example: "A hammer is a Kli Shemelachto L'Issur, so you may move it off a chair you need to sit on!",
            },
            {
              word: "L'tzorech Gufo & L'tzorech Mekomo",
              meaning: "Moving a weekday tool either to use its body for a permitted task (Gufo) or because you need its spot (Mekomo).",
              example: "Using a hammer to crack a coconut on Shabbos is L'tzorech Gufo.",
            },
            {
              word: "Muktzeh Machmas Gufo",
              meaning: "Something that is not a utensil or food at all (like a rock, coin, or raw hide)—strict Muktzeh!",
              example: "A rock is Muktzeh Machmas Gufo and may not be used to hold down napkins in the wind.",
            },
          ],
          sources: [
            {
              label: "Sefaria · Shulchan Aruch Orach Chaim 308 (Laws of Muktzeh)",
              url: "https://www.sefaria.org/Shulchan_Arukh%2C_Orach_Chayim.308.3?lang=bi",
            },
          ],
        },
      ],
      form1: {
        c1: {
          objective: "halacha-muktzeh-hammer",
          prompt:
            "A metal hammer (Kli Shemelachto L'Issur) was accidentally left on a dining room chair before Shabbos, and you need to sit on that chair for the Shabbos meal. May you pick up the hammer and move it?",
          correct:
            "Yes—because a hammer is a Kli Shemelachto L'Issur, it may be moved L'tzorech Mekomo (when you need the spot it is sitting on).",
          wrong: [
            "No—you must stand for the entire Shabbos meal.",
            "Yes, but only if you use the hammer to build a bookshelf.",
            "No—a hammer has the exact same rule as a stone or coin.",
          ],
          explanation:
            "Shulchan Aruch (OC 308:3) rules that a Kli Shemelachto L'Issur may be moved L'tzorech Gufo (to use for a permitted task) or L'tzorech Mekomo (when you need its space).",
        },
        o1: {
          objective: "halacha-muktzeh-hammer-vs-stone",
          prompt:
            "On a windy Shabbos afternoon on the porch, the napkins are blowing away. Nearby lie a metal hammer and a smooth river stone. Explain which one you may use to hold down the napkins, which one you may NOT use, and why their Halachic categories differ!",
          exemplar:
            "You may use the metal hammer to hold down the napkins, because a hammer is a utensil (Kli Shemelachto L'Issur) and can be moved L'tzorech Gufo (to use its body for a permitted Shabbos task). You may NOT use the smooth river stone, because a stone is not a utensil at all—it is Muktzeh Machmas Gufo and cannot be moved even for a permitted need.",
          rubric: [
            "States that the metal hammer MAY be used to hold down the napkins",
            "Identifies the hammer as a Kli Shemelachto L'Issur moved L'tzorech Gufo",
            "States that the river stone may NOT be moved or used",
            "Identifies the stone as Muktzeh Machmas Gufo (not a Kli/utensil)",
          ],
          explanation:
            "Even though a hammer's weekday job is forbidden, it is still a Kli (utensil), so it can be used L'tzorech Gufo; a stone is not a Kli and remains strict Muktzeh.",
        },
        m1: {
          objective: "halacha-muktzeh-match",
          prompt: "Connect each Hilchot Muktzeh term to its meaning.",
          matches: [
            { left: "Kli Shemelachto L'Heter", right: "Permitted utensil like a Siddur, plate, or fork" },
            { left: "Kli Shemelachto L'Issur", right: "Weekday tool like a hammer (movable for Gufo or Mekomo)" },
            { left: "Muktzeh Machmas Gufo", right: "Non-utensil like a stone, coin, or raw hide (strict Muktzeh)" },
            { left: "L'tzorech Mekomo", right: "Moving a weekday tool because you need the spot it occupies" },
          ],
          explanation:
            "L'Heter is a permitted utensil; L'Issur is a weekday tool; Machmas Gufo is an intrinsic non-utensil; L'tzorech Mekomo is needing its place.",
        },
        c2: {
          objective: "halacha-muktzeh-rain",
          prompt:
            "A simple weekday ballpoint pen (Kli Shemelachto L'Issur) is lying on the porch table when it starts to rain on Shabbos. You don't need the table space and don't need to use the pen. May you carry the pen inside just so it won't get wet?",
          correct:
            "No—moving a Kli Shemelachto L'Issur just to protect the item itself is not permitted.",
          wrong: [
            "Yes—any tool can be moved whenever it rains.",
            "Yes, as long as you write your name with it first.",
            "Only if the pen is blue.",
          ],
          explanation:
            "A Kli Shemelachto L'Issur may be moved when you need to use its body (Gufo) or need its spot (Mekomo), but not merely for the item's own protection.",
        },
        o2: {
          objective: "halacha-muktzeh-leather-connection",
          prompt:
            "In the Gemara and Shulchan Aruch, untanned raw animal hides are listed as Muktzeh Machmas Gufo, whereas a finished leather shoe or leather cushion is a Kli Shemelachto L'Heter! Connect this Halacha to what you learned this week about how leather is made.",
          exemplar:
            "An untanned raw hide is still perishable, stiff, and unfinished raw material—not a usable utensil—so it is Muktzeh Machmas Gufo like a stone or log. Once tanners and craftsmen transform that hide into supple leather and sew it into a finished shoe or cushion, it becomes a real usable Kli that serves people on Shabbos!",
          rubric: [
            "Explains that untanned raw hide is unfinished raw material, not a usable utensil",
            "Connects raw hide to Muktzeh Machmas Gufo",
            "Explains that tanning and crafting turn the hide into a functional Kli (shoe/cushion)",
            "Connects the physical transformation of leather to its Halachic status",
          ],
          explanation:
            "Halacha looks at physical reality: raw untanned skin is unfinished material (Muktzeh Machmas Gufo), while tanned, crafted leather gear is a true Kli!",
        },
      },
      form2: {
        c1: {
          objective: "halacha-muktzeh-hammer",
          prompt:
            "What do the words L'tzorech Gufo mean when moving a Kli Shemelachto L'Issur (like a hammer) on Shabbos?",
          correct:
            "Moving the tool to use its body for a permitted Shabbos action, such as cracking a hard walnut.",
          wrong: [
            "Moving the tool to hammer nails into a wall on Shabbos.",
            "Hiding the tool in the basement so no one sees it.",
            "Throwing a stone into the garden.",
          ],
          explanation:
            "L'tzorech Gufo means 'for the need of its body'—using the physical tool in a permitted way on Shabbos.",
        },
        o1: {
          objective: "halacha-muktzeh-hammer-vs-stone",
          prompt:
            "A quarter (coin) and a screwdriver are both lying on the kitchen counter right where your mother needs to place the Shabbos challah board. Explain how the rule for moving the screwdriver differs from the rule for the coin.",
          exemplar:
            "The screwdriver is a Kli Shemelachto L'Issur (a weekday work tool), so you MAY pick it up and move it L'tzorech Mekomo because you need the counter space for the challah board. The quarter is a coin (Muktzeh Machmas Gufo, not a utensil), so you may NOT pick it up with your hands even though you need its space!",
          rubric: [
            "Identifies the screwdriver as a Kli Shemelachto L'Issur",
            "States that the screwdriver MAY be moved L'tzorech Mekomo (for its space)",
            "Identifies the coin as Muktzeh Machmas Gufo (not a utensil)",
            "States that the coin may NOT be picked up by hand even for its space",
          ],
          explanation:
            "L'tzorech Mekomo permits moving a Kli Shemelachto L'Issur (like a screwdriver), but does not permit picking up Muktzeh Machmas Gufo (like coins or stones) by hand.",
        },
        m1: {
          objective: "halacha-muktzeh-match",
          prompt: "Connect each Hilchot Muktzeh term to its meaning.",
          matches: [
            { left: "Kli Shemelachto L'Heter", right: "Permitted utensil like a Siddur, plate, or fork" },
            { left: "Kli Shemelachto L'Issur", right: "Weekday tool like a hammer (movable for Gufo or Mekomo)" },
            { left: "Muktzeh Machmas Gufo", right: "Non-utensil like a stone, coin, or raw hide (strict Muktzeh)" },
            { left: "L'tzorech Mekomo", right: "Moving a weekday tool because you need the spot it occupies" },
          ],
          explanation:
            "L'Heter is a permitted utensil; L'Issur is a weekday tool; Machmas Gufo is an intrinsic non-utensil; L'tzorech Mekomo is needing its place.",
        },
        c2: {
          objective: "halacha-muktzeh-rain",
          prompt:
            "Which of these items is a Kli Shemelachto L'Heter that may be moved freely for any normal Shabbos need?",
          correct: "A Siddur or Shabbos Kiddush cup",
          wrong: [
            "A pile of garden rocks",
            "Silver coins and dollar bills",
            "An untanned raw cattle hide",
          ],
          explanation:
            "A Siddur and Kiddush cup are utensils whose regular function is permitted on Shabbos (Kli Shemelachto L'Heter).",
        },
        o2: {
          objective: "halacha-muktzeh-leather-connection",
          prompt:
            "Suppose someone at the Shabbos table accidentally moves a Muktzeh item because they didn't know the rule yet. Remembering Rav Yisroel Salanter's teachings about Middos and sensitivity, how should we handle that moment?",
          exemplar:
            "Rav Yisroel Salanter taught that protecting another person's dignity and feelings is a huge Torah responsibility. We should never embarrass or yell at someone in front of the table; instead, we should treat them warmly and, if appropriate, share the Halacha gently in private later.",
          rubric: [
            "Emphasizes not embarrassing or shaming the person at the table",
            "Connects the response to Rav Yisroel Salanter's Mussar / caring for others' dignity",
            "Suggests kindness or gentle private learning rather than public criticism",
            "Shows thoughtful integration of Halacha and Middos",
          ],
          explanation:
            "Guarding another person from embarrassment (Ona'as Devarim / Kavod HaBriyos) is a foundational Torah obligation alongside Hilchot Shabbos.",
        },
      },
    },
  ],
};

const UNSEEN_WEEKLY_PASSAGE_F1 = `Read this new passage carefully:\n\n"The Cobbler's Infield Repair"\n[1] Ten minutes before the championship game, shortstop Maya held up her favorite full-grain glove in dismay: the rawhide lace holding the web to the thumb had snapped clean through. Her teammate Zach offered a roll of sticky duct tape. "Just wrap the tape around the thumb and web," Zach said. "It'll hold for seven innings."\n\n[2] Maya's grandfather, who repaired leather boots, shook his head and pulled a spare strip of stiff rawhide and a blunt threading needle from his bag. "Tape only sticks to the outside surface," he explained. "When a line drive hits the web, the force needs tension running through the lace holes so all the panels share the load."\n\n[3] It took six careful, methodical minutes to weave the new rawhide lace through the leather channels. In the bottom of the sixth, a scorching line drive smacked squarely into Maya's web; the new lace stretched slightly, distributed the shock across the thumb and index finger, and trapped the ball for the final out.`;

const UNSEEN_WEEKLY_PASSAGE_F2 = `Read this new passage carefully:\n\n"The Saddle-Maker's Test"\n[1] When Ben visited his uncle's leather shop, he saw two strips of brown hide hanging on hooks. Both looked identical in color, so Ben guessed both were ready to be sewn into a catcher's mitt. His uncle handed him a magnifying glass and asked him to verify before cutting.\n\n[2] Under the lens, Strip A showed tight, interlocking fibers and tiny natural pores on a smooth surface. Strip B looked fuzzy on both sides, and when Ben pulled it firmly, the edges stretched and frayed. "Strip A is authentic full-grain leather," his uncle said, "while Strip B is the bottom suede split. Color can be dyed in five minutes, but resilient fiber structure comes from the top layer of the hide."\n\n[3] Ben chose Strip A for the catcher's pocket and saved the soft Strip B to line the inside of a wristwatch strap where comfort mattered more than stopping a fastball.`;

export function buildWeeklyTestV4(formIndex: number): Question[] {
  const f = formIndex === 1;
  const passage = f ? UNSEEN_WEEKLY_PASSAGE_F2 : UNSEEN_WEEKLY_PASSAGE_F1;

  const raw: Omit<Question, "id">[] = [
    {
      kind: "choice",
      objective: "weekly-reading-evidence",
      points: 4,
      prompt: f
        ? `${passage}\n\nIn paragraph 2, what happens when Ben pulls Strip B firmly under the magnifying glass?`
        : `${passage}\n\nIn paragraph 2, why does Maya's grandfather reject using duct tape on the broken glove web?`,
      correct: f
        ? "Its fuzzy suede edges stretch and fray under tension."
        : "Tape only sticks to the surface, whereas rawhide lacing runs through the holes so the panels share impact tension.",
      choices: placeCorrect(
        f
          ? "Its fuzzy suede edges stretch and fray under tension."
          : "Tape only sticks to the surface, whereas rawhide lacing runs through the holes so the panels share impact tension.",
        f
          ? [
              "It turns into bright white alum-tanned cowhide.",
              "It snaps the magnifying glass in half.",
              "It shows tight interlocking pores that never stretch.",
            ]
          : [
              "Duct tape is too heavy for a shortstop to lift.",
              "Umpires require every glove to be glued with oak bark.",
              "The thumb of a baseball glove never touches the ball.",
            ],
        formIndex,
      ),
      explanation: f
        ? "Strip B is the bottom suede split; its looser horizontal fibers stretch and fray when pulled."
        : "Grandfather explains that rawhide lacing carries tension through the punched channels so the whole frame shares the impact.",
    },
    {
      kind: "open",
      objective: "weekly-reading-analysis",
      points: 4,
      prompt: f
        ? `${passage}\n\nExplain how Ben's uncle uses both strips of leather wisely at the end of the passage. Cite two actions or details from paragraphs 2–3 to support your explanation.`
        : `${passage}\n\nExplain how the sixth-inning line drive proved Maya's grandfather right. Cite two actions or details from paragraphs 2–3 in your answer.`,
      exemplar: f
        ? "Strip A had tight interlocking full-grain fibers and natural pores, so Ben used it for the catcher's pocket that must stop fastballs. Strip B was fuzzy suede that stretched easily, so he used it as a soft lining for a watch strap where comfort mattered more than impact strength."
        : "Grandfather explained that threading rawhide through the holes lets the panels share tension. When the scorching line drive hit Maya's web in the sixth inning, the new rawhide lace stretched slightly and spread the shock across the thumb and index finger instead of ripping off like surface tape.",
      rubric: [
        f
          ? "Cites Strip A's tight full-grain fibers or pores"
          : "Cites Grandfather's explanation of tension through the lace holes",
        f
          ? "Cites Strip B's fuzzy suede texture or stretching"
          : "Cites the sixth-inning line drive hitting the web",
        f
          ? "Connects Strip A to the high-impact catcher's pocket"
          : "Explains how the rawhide lace distributed shock across thumb and finger",
        f
          ? "Connects Strip B to the soft watch-strap lining"
          : "Contrasts internal lace tension with surface-only tape",
      ],
      explanation: f
        ? "Matching material properties to the engineering job turns both layers of the hide into useful gear."
        : "Internal rawhide lacing acts as a structural cable across the web and fingers.",
    },
    {
      kind: "match",
      objective: "weekly-vocab-match-1",
      points: 4,
      prompt: "Connect each vocabulary word from this week to its meaning.",
      matches: [
        { left: "Supple", right: "Bending smoothly without cracking or feeling stiff" },
        { left: "Resilient", right: "Tough enough to absorb shock and bounce back" },
        { left: "Pliable", right: "Easy to fold and shape without losing strength" },
        { left: "Brittle", right: "Hard but fragile and likely to snap under stress" },
      ],
      explanation:
        "Supple, resilient, and pliable describe healthy leather qualities; brittle describes heat-damaged fibers that snap.",
    },
    {
      kind: "choice",
      objective: "weekly-vocab-context-1",
      points: 4,
      prompt: f
        ? "Which word best completes this sentence? “Because raw animal skin is ________, bacteria will break it down unless tanners preserve it.”"
        : "Which word best completes this sentence? “Over ten seasons of catching fastballs, the full-grain catcher's mitt developed a rich, glossy ________.”",
      correct: f ? "perishable" : "patina",
      choices: placeCorrect(
        f ? "perishable" : "patina",
        f
          ? ["authentic", "methodical", "skeptical"]
          : ["abrasion", "turbulence", "shortcut"],
        formIndex + 1,
      ),
      explanation: f
        ? "Perishable means likely to spoil or decay if not preserved."
        : "Patina is the warm, rich shine that authentic full-grain leather develops over years of use.",
    },
    {
      kind: "choice",
      objective: "weekly-vocab-context-2",
      points: 4,
      prompt: f
        ? "When the spinning red stitches on a baseball push the airflow upward to make the ball dive, they ________ the air."
        : "When you are doubtful of a surprising claim until you run a fair test to check the evidence, you are being ________.",
      correct: f ? "deflect" : "skeptical",
      choices: placeCorrect(
        f ? "deflect" : "skeptical",
        f
          ? ["saturate", "contemplate", "corrode"]
          : ["brittle", "perishable", "supple"],
        formIndex + 2,
      ),
      explanation: f
        ? "Deflect means to turn aside or redirect a moving stream."
        : "Skeptical means questioning a claim until you verify it with evidence.",
    },
    {
      kind: "match",
      objective: "weekly-vocab-match-2",
      points: 4,
      prompt: "Connect each action word to its definition.",
      matches: [
        { left: "Saturate", right: "Soak completely until no more liquid fits" },
        { left: "Reinforce", right: "Strengthen by adding extra support" },
        { left: "Verify", right: "Check and prove whether a claim is true" },
        { left: "Contemplate", right: "Think about something carefully and deeply" },
      ],
      explanation:
        "Saturate is soak completely; reinforce is strengthen; verify is test/prove; contemplate is think deeply.",
    },
    {
      kind: "choice",
      objective: "weekly-htw-tanning",
      points: 4,
      prompt: f
        ? "What happens if a cleaned cattle hide dries in the sun WITHOUT being soaked in tannins?"
        : "What do tannin molecules do to the microscopic collagen ropes inside a hide during tanning?",
      correct: f
        ? "Its collagen fibers glue together into stiff, board-like rawhide."
        : "They build chemical cross-link bridges that keep the collagen fibers spaced apart, flexible, and rot-proof.",
      choices: placeCorrect(
        f
          ? "Its collagen fibers glue together into stiff, board-like rawhide."
          : "They build chemical cross-link bridges that keep the collagen fibers spaced apart, flexible, and rot-proof.",
        f
          ? [
              "It automatically turns into soft, waterproof velvet.",
              "It grows 108 red cotton stitches on its own.",
              "Its fibers turn into aluminum salt.",
            ]
          : [
              "They melt the collagen into liquid water.",
              "They slice the hide horizontally like a bagel.",
              "They make the hide rot faster in the rain.",
            ],
        formIndex + 3,
      ),
      explanation:
        "Without tannin cross-links, drying fibers collapse into stiff rawhide; tannins lock spacer bridges between the collagen bundles.",
    },
    {
      kind: "choice",
      objective: "weekly-htw-layers",
      points: 4,
      prompt: f
        ? "Why is Full-Grain leather stronger than Split Suede when used for a baseball glove palm?"
        : "When a horizontal splitting knife slices a thick hide in half, which layer becomes Full-Grain leather?",
      correct: f
        ? "Full-grain keeps the uncut outer surface where collagen bundles interlock tightly in all directions."
        : "The top outer layer just below where the hair grew, containing the tightest fiber weave and natural pores.",
      choices: placeCorrect(
        f
          ? "Full-grain keeps the uncut outer surface where collagen bundles interlock tightly in all directions."
          : "The top outer layer just below where the hair grew, containing the tightest fiber weave and natural pores.",
        f
          ? [
              "Split suede has no collagen fibers at all.",
              "Full-grain is baked in a hot oven to make it brittle.",
              "Split suede is made out of tree bark.",
            ]
          : [
              "The fuzzy bottom slice next to the flesh.",
              "The sawdust on the floor under the blade.",
              "The steel blade itself.",
            ],
        formIndex,
      ),
      explanation:
        "The top grain layer has tightly packed, multi-directional collagen bundles, while the bottom split has looser horizontal fibers.",
    },
    {
      kind: "open",
      objective: "weekly-htw-glove-design",
      points: 4,
      prompt: f
        ? "Explain why a pro baseball glove is sewn together inside-out first, and why it uses BOTH soft tanned leather (for the shell) AND stiff untanned rawhide (for the laces)."
        : "A friend buys a stiff new full-grain baseball glove and wants to bake it in the oven or soak it in a bucket of water tonight. Explain why both shortcuts are harmful and how they should break it in instead.",
      exemplar: f
        ? "It is sewn inside-out and then steamed and flipped right-side-out so all the rough seam edges are hidden inside where they won't scrape your fingers. It uses soft tanned leather for the shell so the pocket can flex and close around the ball, and stiff rawhide for the laces to carry tension and reinforce the fingers."
        : "Baking the glove in an oven cooks and shrinks the collagen fibers until they turn brittle and crack. Soaking it in a bucket of water floods the pores and washes out natural oils, leaving it heavy and floppy. Instead, they should use a tiny dab of leather balm and pound the pocket and heel hinges with a wooden mallet!",
      rubric: f
        ? [
            "Explains why the shell is sewn inside-out (to hide rough seams inside after flipping)",
            "Mentions steaming and turning the glove over rods",
            "Explains the role of the soft tanned shell (flexing/catching)",
            "Explains the role of the stiff rawhide laces (tension/reinforcing fingers)",
          ]
        : [
            "Explains why oven heat ruins leather (cooks collagen, makes it brittle)",
            "Explains why soaking in a water bucket harms leather (waterlogs pores, strips oils, stretches shape)",
            "Recommends mechanical pounding (wooden mallet / playing catch) on pocket and hinges",
            "Mentions using only a small dab of conditioner/balm",
          ],
      explanation:
        "Understanding collagen fiber structure explains both how gloves are built and how they should be broken in.",
    },
    {
      kind: "match",
      objective: "weekly-htw-match",
      points: 4,
      prompt: "Connect each part of a baseball or glove to its engineering job.",
      matches: [
        { left: "The Glove Web", right: "Shock-absorbing net between thumb and index finger" },
        { left: "Rawhide Lacing", right: "Stiff tension cables linking the fingers and web" },
        { left: "Figure-Eight Panels", right: "Two alum-tanned white cowhide pieces wrapping a baseball" },
        { left: "108 Raised Stitches", right: "Red cotton seams that grip the air to curve a pitch" },
      ],
      explanation:
        "The web traps the ball; rawhide laces carry tension; figure-eight panels wrap the sphere; 108 stitches generate aerodynamic seam drag.",
    },
    {
      kind: "choice",
      objective: "weekly-htw-baseball-aero",
      points: 4,
      prompt: f
        ? "Why is an official baseball wrapped in alum-tanned leather instead of oak-bark tanned leather?"
        : "How do the 108 raised red stitches help a spinning curveball dive downward?",
      correct: f
        ? "Alum tanning turns the cowhide bright white so hitters and fielders can see the ball clearly."
        : "They grip the boundary layer of air, creating a pressure difference (the Magnus effect) that pushes the spinning ball down.",
      choices: placeCorrect(
        f
          ? "Alum tanning turns the cowhide bright white so hitters and fielders can see the ball clearly."
          : "They grip the boundary layer of air, creating a pressure difference (the Magnus effect) that pushes the spinning ball down.",
        f
          ? [
              "Alum tanning makes the leather glow green at night.",
              "Oak-bark leather cannot be cut with steel dies.",
              "Alum tanning removes all the collagen fibers.",
            ]
          : [
              "They make the baseball ten times heavier halfway to home plate.",
              "They act like tiny magnets attracted to the dirt.",
              "They shoot jets of steam out of the cork center.",
            ],
        formIndex + 1,
      ),
      explanation:
        "Alum tanning creates bright white leather, and the 108 raised seams amplify the Magnus force on a spinning ball.",
    },
    {
      kind: "open",
      objective: "weekly-htw-pocket-physics",
      points: 4,
      prompt: f
        ? "Why does catching a fastball in the Web and Deep Pocket hurt your hand much less than catching it low on the flat palm?"
        : "Explain how two flat pieces of leather are able to wrap around a round baseball without wrinkling, and why the 108 stitches matter during a pitch.",
      exemplar: f
        ? "Catching low on the flat palm slams the ball right over your hand bones. Catching up in the Deep Pocket and Web suspends the ball like a hammock between the thumb and index finger, while the leather shell and rawhide laces stretch to spread the impact energy!"
        : "The leather is stamped into two saddle-shaped figure-eight panels and dampened so it stretches smoothly around the round core as the 108 stitches pull it tight. During a pitch, those 108 raised stitches grab the air so the spinning ball creates the Magnus effect and curves!",
      rubric: f
        ? [
            "Notes that catching on the palm hits directly over the hand bones",
            "Explains that the Pocket/Web suspends the ball between thumb and index finger",
            "Mentions that the leather cradle and rawhide laces stretch/share tension",
            "Clearly contrasts the two impact locations",
          ]
        : [
            "Names or describes the two figure-eight / saddle-shaped leather panels",
            "Explains dampening/stretching the panels with 108 stitches around the core",
            "Explains that raised stitches grip the air during spin",
            "Connects seam drag / Magnus effect to curving the pitch",
          ],
      explanation:
        "Both the glove pocket and the figure-eight baseball cover use 3D leather geometry to control forces.",
    },
    {
      kind: "choice",
      objective: "weekly-torah-teivah",
      points: 4,
      prompt: f
        ? "According to Rashi on Parshat Noach, why did Hashem command Noach to spend 120 years building the Teivah?"
        : "Why did Noach coat the Teivah with Kofer (pitch) inside and out, and narrow the roof to 1 amah at the peak?",
      correct: f
        ? "So people would see him building, ask what he was doing, and have 120 years of opportunity to do Teshuvah."
        : "The Kofer sealed the hull against raging floodwaters, and the sloped 1-amah peak let heavy rainwater slide off.",
      choices: placeCorrect(
        f
          ? "So people would see him building, ask what he was doing, and have 120 years of opportunity to do Teshuvah."
          : "The Kofer sealed the hull against raging floodwaters, and the sloped 1-amah peak let heavy rainwater slide off.",
        f
          ? [
              "Because gopher wood takes 120 years to dry in a barrel.",
              "Because Noach forgot the measurements of the three decks.",
              "So no one in the world would ever notice the Ark.",
            ]
          : [
              "To make the Teivah sink to the bottom of the sea.",
              "So rainwater would collect in a giant pool on the roof.",
              "Because Kofer pitch glows in the dark like a gemstone.",
            ],
        formIndex + 2,
      ),
      explanation:
        "Rashi explains both the spiritual purpose of the 120-year construction (inviting Teshuvah) and the physical design of the Kofer pitch and sloped roof.",
    },
    {
      kind: "choice",
      objective: "weekly-torah-dove",
      points: 4,
      prompt: f
        ? "According to Rashi on Bereishis 8:11, what did the dove's bitter olive leaf symbolize?"
        : "What did the freshly plucked olive leaf on the dove's second flight prove to Noach?",
      correct: f
        ? "“Better that my food be bitter as an olive from Hashem's hand than sweet as honey from flesh and blood.”"
        : "That the floodwaters had receded below the tops of the trees.",
      choices: placeCorrect(
        f
          ? "“Better that my food be bitter as an olive from Hashem's hand than sweet as honey from flesh and blood.”"
          : "That the floodwaters had receded below the tops of the trees.",
        f
          ? [
              "That olives are sweeter than honey when eaten raw.",
              "That the dove wanted to stay inside the Teivah forever.",
              "That olive trees only grow in winter.",
            ]
          : [
              "That the water was still covering the highest mountain peaks.",
              "That no trees had survived anywhere on earth.",
              "That the raven had planted a new orchard.",
            ],
        formIndex + 3,
      ),
      explanation:
        "Physically, the leaf proved tree branches were above water; spiritually, Rashi teaches the dove chose bitter food from Hashem over sweet food from human hands.",
    },
    {
      kind: "match",
      objective: "weekly-torah-match",
      points: 4,
      prompt: "Connect each Parshat Noach term to its explanation in Chumash and Rashi.",
      matches: [
        { left: "Tzohar", right: "Skylight window or glowing gemstone in the Teivah" },
        { left: "Kofer", right: "Waterproof pitch sealing the Ark inside and out" },
        { left: "Aleh Zayis", right: "Fresh olive leaf brought back by the Yonah at evening" },
        { left: "Keshes", right: "Rainbow in the clouds sealing Hashem's covenant of peace" },
      ],
      explanation:
        "Tzohar is the light source; Kofer is waterproof pitch; Aleh Zayis is the olive leaf; Keshes is the rainbow covenant.",
    },
    {
      kind: "open",
      objective: "weekly-torah-open",
      points: 4,
      prompt: f
        ? "Describe how the three decks of Noach's Teivah were arranged according to Rashi, and explain how Noach's year of feeding every animal practiced the middah of Chessed."
        : "Explain both the physical clue AND Rashi's spiritual lesson from the Yonah returning with an olive leaf (aleh zayis) on its second flight.",
      exemplar: f
        ? "According to Rashi, the top deck was for Noach and his family, the middle deck housed the animals, and the bottom deck was for waste and storage. By working day and night for a whole year to feed each species at its exact natural feeding time, Noach rebuilt the world on selfless Chessed."
        : "Physically, the freshly plucked olive leaf proved to Noach that the floodwaters had dropped below the treetops. Spiritually, Rashi explains that by picking a bitter olive leaf, the dove declared: 'Better that my food be bitter as an olive from Hashem's hand than sweet as honey from flesh and blood.'",
      rubric: f
        ? [
            "Correctly identifies the top deck (humans), middle deck (animals), and bottom deck (waste/storage)",
            "Describes Noach's dedicated care in feeding the animals at their proper times",
            "Connects that year-long effort to the middah of Chessed",
            "Expresses the answer clearly",
          ]
        : [
            "Explains the physical clue (waters had receded below the treetops)",
            "Cites Rashi's teaching on the bitter olive vs. sweet honey",
            "Explains trusting Hashem directly rather than depending on flesh and blood",
            "Addresses both parts of the prompt clearly",
          ],
      explanation:
        "Parshat Noach weaves together concrete details of the Ark and Flood with timeless lessons in Chessed and Bitachon.",
    },
    {
      kind: "choice",
      objective: "weekly-gadol-choice",
      points: 4,
      prompt: f
        ? "What lesson did Rav Yisroel Salanter draw from the Vilna shoemaker working by a flickering candle stub?"
        : "Who founded the Mussar movement in the 19th century and taught, “Another person's physical needs are my spiritual responsibility”?",
      correct: f
        ? "As long as the candle of our neshama is burning, it is still possible to mend our middos and actions."
        : "Rav Yisroel Salanter",
      choices: placeCorrect(
        f
          ? "As long as the candle of our neshama is burning, it is still possible to mend our middos and actions."
          : "Rav Yisroel Salanter",
        f
          ? [
              "We should only study Torah when we have brand-new wax candles.",
              "Once someone makes a mistake, the whole week is ruined.",
              "Every Torah scholar must become a professional boot maker.",
            ]
          : [
              "Piet Mondrian",
              "Mr. Morales",
              "King Ferdinand",
            ],
        formIndex,
      ),
      explanation:
        "Rav Yisroel Salanter taught that while our soul shines, we can always mend our character (middos) and care for others.",
    },
    {
      kind: "open",
      objective: "weekly-gadol-open",
      points: 4,
      prompt: f
        ? "Explain how Rav Yisroel Salanter's two famous teachings—the Shoemaker's Candle and 'Another person's physical needs are my spiritual responsibility'—can guide how you act on a Friday afternoon before Shabbos."
        : "Retell the story of Rav Yisroel Salanter and the shoemaker in Vilna, and explain how the shoemaker's work with leather connects to our work on our Middos.",
      exemplar: f
        ? "The Shoemaker's Candle reminds me that even if Friday was busy or I made a mistake, while the candle burns there is still time before Shabbos to make peace and prepare properly. And 'another person's physical needs are my spiritual responsibility' reminds me to help my parents set the table or carry heavy trays so they can enter Shabbos rested!"
        : "Late at night in Vilna, Rav Yisroel saw a cobbler hammering leather boots by a melting candle stub. The cobbler said, 'As long as the candle is burning, it is still possible to mend and repair!' Just as a cobbler mends worn leather while the light lasts, we can always mend our middos while our neshama shines.",
      rubric: f
        ? [
            "Applies the Shoemaker's Candle lesson (using remaining time to mend/prepare)",
            "Applies the 'physical needs / spiritual responsibility' teaching",
            "Gives a concrete Friday/Erev Shabbos example of helping family or others",
            "Connects both ideas thoughtfully",
          ]
        : [
            "Recounts Rav Yisroel seeing the shoemaker working by a flickering candle stub",
            "Quotes or paraphrases 'While the candle burns, it is possible to mend'",
            "Connects the burning candle to the neshama / time we have",
            "Connects mending leather shoes to refining our middos",
          ],
      explanation:
        "Rav Yisroel Salanter turned everyday scenes into vivid reminders to refine our middos and care for the people around us.",
    },
    {
      kind: "choice",
      objective: "weekly-halacha-borer-1",
      points: 4,
      prompt: f
        ? "You have a bowl of mixed berries and melon on Shabbos, and you dislike melon. How should you take your fruit?"
        : "Which of the following violates the 3 Golden Keys of Borer (אי״ד) on Shabbos?",
      correct: f
        ? "Use your hand or fork right before eating to take the berries you DO want (Ochel), leaving the melon behind."
        : "Pulling unwanted onions (Psolet) out of your salad so only lettuce and tomatoes remain.",
      choices: placeCorrect(
        f
          ? "Use your hand or fork right before eating to take the berries you DO want (Ochel), leaving the melon behind."
          : "Pulling unwanted onions (Psolet) out of your salad so only lettuce and tomatoes remain.",
        f
          ? [
              "Pick out all the melon pieces first and throw them away.",
              "Pour the fruit through a kitchen colander/sifter.",
              "Sort the berries into bowls on Shabbos morning for Saturday night.",
            ]
          : [
              "Taking an almond you want to eat right now from a bowl of trail mix by hand.",
              "Picking out the fork you need right now to eat your Shabbos meal.",
              "Taking the Shabbos sweater you are about to put on from a shelf.",
            ],
        formIndex + 1,
      ),
      explanation:
        "Permitted sorting on Shabbos requires taking the wanted item (Ochel) from the unwanted (Psolet), by hand (B'Yad), for immediate use (Miyad).",
    },
    {
      kind: "match",
      objective: "weekly-halacha-match",
      points: 4,
      prompt: "Connect each Hilchot Shabbos concept to its correct rule.",
      matches: [
        { left: "Ochel m'toch Psolet", right: "Take the wanted item and leave the unwanted behind" },
        { left: "Miyad", right: "Separate only for immediate use right now" },
        { left: "Kli Shemelachto L'Issur", right: "Weekday tool like a hammer—movable for Gufo or Mekomo" },
        { left: "Muktzeh Machmas Gufo", right: "Stone, coin, or raw hide—strict Muktzeh not moved by hand" },
      ],
      explanation:
        "Ochel and Miyad are keys of Borer; Kli Shemelachto L'Issur and Muktzeh Machmas Gufo are categories of Muktzeh.",
    },
    {
      kind: "choice",
      objective: "weekly-halacha-muktzeh-1",
      points: 4,
      prompt: f
        ? "Which item below is Muktzeh Machmas Gufo and may NOT be moved on Shabbos even if you need the space it is sitting on?"
        : "On Shabbos, when is it permitted to move a Kli Shemelachto L'Issur such as a metal hammer?",
      correct: f
        ? "A smooth garden rock or a pile of coins"
        : "L'tzorech Gufo (to use its body for a permitted task like cracking a nut) or L'tzorech Mekomo (when you need the spot it occupies).",
      choices: placeCorrect(
        f
          ? "A smooth garden rock or a pile of coins"
          : "L'tzorech Gufo (to use its body for a permitted task like cracking a nut) or L'tzorech Mekomo (when you need the spot it occupies).",
        f
          ? [
              "A Shabbos Siddur",
              "A metal hammer lying on a dining chair",
              "A clean soup spoon",
            ]
          : [
              "Whenever you want to protect the hammer from getting dusty.",
              "Never under any circumstances.",
              "Only if you use it to build a wooden cabinet on Shabbos.",
            ],
        formIndex + 2,
      ),
      explanation:
        "Rocks and coins are not utensils (Muktzeh Machmas Gufo); a hammer is a Kli Shemelachto L'Issur movable for Gufo or Mekomo.",
    },
    {
      kind: "open",
      objective: "weekly-halacha-borer-open",
      points: 4,
      prompt: f
        ? "Your younger brother finishes playing with mixed LEGO bricks and wooden blocks on Shabbos afternoon and wants to sort them into two separate bins for next week. Using the 3 Golden Keys of Borer (אי״ד), explain why that is a problem and how to clean up instead."
        : "Explain all 3 Golden Keys of Borer (אי״ד: Ochel, B'Yad, Miyad) and show how they apply when taking a spoon you need from a mixed tray of clean cutlery right before the Shabbos meal.",
      exemplar: f
        ? "Borer applies to toys and household items just like food! Sorting the mixed LEGOs and wooden blocks into separate bins after playing violates Miyad (immediate use) because he is sorting them for next week, not to play with right now. Instead, he can put them away together in one mixed container until after Shabbos."
        : "The 3 Golden Keys are: 1) Ochel—take the wanted item from the unwanted; 2) B'Yad—separate by hand, not with a sorting tool; 3) Miyad—for immediate use right now. When you reach into a mixed cutlery tray by hand (B'Yad) right before the meal starts (Miyad) and pick out the spoons you want to use (Ochel), all three keys are satisfied!",
      rubric: f
        ? [
            "Notes that Borer applies to non-food items like toys",
            "Identifies that sorting after play for next week violates Miyad (immediate use)",
            "Suggests putting the mixed toys into one bin together without sorting",
            "Explains the rule clearly",
          ]
        : [
            "Defines Ochel (taking wanted from unwanted)",
            "Defines B'Yad (by hand)",
            "Defines Miyad (for immediate use right now)",
            "Applies all three keys to taking the spoons for the current meal",
          ],
      explanation:
        "Whether with food, cutlery, or toys, separating mixed items on Shabbos is permitted only when taking the wanted item by hand for immediate use.",
    },
    {
      kind: "open",
      objective: "weekly-halacha-muktzeh-open",
      points: 4,
      prompt: f
        ? "A weekday screwdriver and a quarter (coin) are both lying on your bed when you want to lie down for a Shabbos afternoon nap. Explain which one you may pick up by hand to clear the bed, which one you may not, and why."
        : "On Shabbos, you need to crack open a hard coconut or walnut, and there is a metal hammer in the utility drawer. May you use the hammer? Explain which Muktzeh category the hammer belongs to and which rule applies.",
      exemplar: f
        ? "You may pick up the screwdriver by hand to clear your bed because it is a Kli Shemelachto L'Issur (weekday work tool), which can be moved L'tzorech Mekomo when you need its space. You may NOT pick up the quarter by hand because coins are Muktzeh Machmas Gufo (not a utensil), which cannot be moved by hand even for their space."
        : "Yes, you may use the metal hammer to crack the walnut! Even though a hammer's main weekday job (building) is forbidden on Shabbos, it is a Kli Shemelachto L'Issur (a usable utensil). Therefore, it may be moved L'tzorech Gufo—to use its body for a permitted Shabbos task like cracking a nut.",
      rubric: f
        ? [
            "States that the screwdriver MAY be moved off the bed by hand",
            "Identifies the screwdriver as Kli Shemelachto L'Issur moved L'tzorech Mekomo",
            "States that the coin may NOT be picked up by hand",
            "Identifies the coin as Muktzeh Machmas Gufo",
          ]
        : [
            "States that you MAY use the hammer to crack the nut/coconut",
            "Identifies the hammer as a Kli Shemelachto L'Issur",
            "Names or explains L'tzorech Gufo (using the tool's body for a permitted task)",
            "Distinguishes cracking food from forbidden weekday building",
          ],
      explanation:
        "Knowing the difference between Kli Shemelachto L'Issur and Muktzeh Machmas Gufo lets you handle everyday Shabbos situations with confidence.",
    },
    {
      kind: "open",
      objective: "weekly-synthesis-open",
      points: 4,
      prompt: f
        ? "This week we saw how a cobbler mends leather by candlelight (Rav Yisroel Salanter) and how a player methodically breaks in a full-grain baseball glove. How do both teach us about patience and daily effort?"
        : "Connect two things you learned this week: how oak-bark tanning transforms perishable hide into resilient leather, and how Torah/Mussar transforms our Middos!",
      exemplar: f
        ? "Both show that lasting strength comes from patient, steady work rather than hasty shortcuts. A player who pounds a glove pocket gradually each day shapes the collagen fibers without cracking them, and the cobbler taught Rav Yisroel that as long as our candle burns, every small effort we make can mend and improve our middos."
        : "Raw hide is perishable and stiff on its own, but soaking in oak-bark tannins builds cross-links that make it supple, resilient, and long-lasting. In the same way, learning Torah and Mussar (like Rav Yisroel Salanter taught) shapes our habits and middos so we stay resilient, kind, and strong when challenges come!",
      rubric: [
        "References a concrete detail from the leather/glove engineering lessons",
        "References Rav Yisroel Salanter, Mussar, or Torah lessons from the week",
        "Explains a meaningful connection about patience, resilience, or steady growth",
        "Expresses original, thoughtful reasoning",
      ],
      explanation:
        "Connecting how physical materials are strengthened to how our character grows makes both ideas stick for life.",
    },
  ];

  return raw.map((q, idx) => ({
    ...q,
    id: `weekly-test-v4-f${formIndex + 1}-q${idx + 1}`,
  }));
}
