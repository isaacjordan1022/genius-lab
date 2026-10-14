import type { DayBlueprint } from "./v4-types";

export const DAYS_1_AND_2: DayBlueprint[] = [
  // =========================================================================
  // DAY 1
  // =========================================================================
  {
    order: 1,
    title: "Day 1 · Secret of the Tannery & Noach's Teivah",
    readingPassage: {
      title: "The Workshop in the Rainbarrel",
      text: `Outside Grandpa Eli's shed stood a deep oak barrel that smelled like wet forest bark. Ten-year-old Yonatan peered inside and saw two strips of cattle hide soaking in dark brown water. "Why not just dry the skin in the sun and sew a baseball pouch today?" Yonatan asked. Grandpa held up a pale scrap he had dried without the barrel: it was stiff as a wooden ruler and curled at the edges.

"Raw skin is perishable," Grandpa explained. "If it stays damp, bacteria ruin it; if it dries plain, the fibers glue together into hard rawhide. But oak bark is rich in tannin. When the hide saturates in this barrel, the tannin locks the microscopic fibers so the leather stays supple—soft enough to bend in your hand, yet tough enough to outlast a storm."

Yonatan tested both pieces. The plain dried strip snapped when he bent it sharply, while the dark tanned strip folded smoothly and sprang back without a crease. He realized the oak barrel wasn't just coloring the hide—it was changing how the hidden fibers behaved.`,
      words: [
        {
          word: "perishable",
          meaning: "Likely to spoil, rot, or break down quickly if not preserved.",
          example: "Untreated animal hide is perishable unless tanning locks its fibers.",
        },
        {
          word: "saturate",
          meaning: "To soak something completely until it can hold no more liquid.",
          example: "Tanners saturate the hide in oak-bark liquid inside a tumbling drum.",
        },
        {
          word: "supple",
          meaning: "Bending and moving easily without cracking or feeling stiff.",
          example: "Good leather stays supple so a baseball glove can close around the ball.",
        },
        {
          word: "tannin",
          meaning: "A natural plant substance found in tree bark that turns raw hide into leather.",
          example: "Oak-bark tannin builds microscopic bridges between protein fibers.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Short Reading: The Oak Barrel Test",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use perishable, saturate, supple, and tannin accurately in context",
          "Cite textual evidence from a 3-paragraph passage to explain cause and effect",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            text: "Tap each card to unlock its meaning and example sentence, then play the Quick Word Lightning Check below!",
            highlight: ["perishable", "saturate", "supple", "tannin"],
            terms: [
              {
                word: "perishable",
                meaning: "Likely to spoil, rot, or break down quickly if not preserved.",
                example: "Untreated animal hide is perishable unless tanning locks its fibers.",
              },
              {
                word: "saturate",
                meaning: "To soak something completely until it can hold no more liquid.",
                example: "Tanners saturate the hide in oak-bark liquid inside a tumbling drum.",
              },
              {
                word: "supple",
                meaning: "Bending and moving easily without cracking or feeling stiff.",
                example: "Good leather stays supple so a baseball glove can close around the ball.",
              },
              {
                word: "tannin",
                meaning: "A natural plant substance found in tree bark that turns raw hide into leather.",
                example: "Oak-bark tannin builds microscopic bridges between protein fibers.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Workshop in the Rainbarrel",
            text: `Outside Grandpa Eli's shed stood a deep oak barrel that smelled like wet forest bark. Ten-year-old Yonatan peered inside and saw two strips of cattle hide soaking in dark brown water. "Why not just dry the skin in the sun and sew a baseball pouch today?" Yonatan asked. Grandpa held up a pale scrap he had dried without the barrel: it was stiff as a wooden ruler and curled at the edges.\n\n"Raw skin is perishable," Grandpa explained. "If it stays damp, bacteria ruin it; if it dries plain, the fibers glue together into hard rawhide. But oak bark is rich in tannin. When the hide saturates in this barrel, the tannin locks the microscopic fibers so the leather stays supple—soft enough to bend in your hand, yet tough enough to outlast a storm."\n\nYonatan tested both pieces. The plain dried strip snapped when he bent it sharply, while the dark tanned strip folded smoothly and sprang back without a crease. He realized the oak barrel wasn't just coloring the hide—it was changing how the hidden fibers behaved.`,
            highlight: ["perishable", "tannin", "saturates", "supple"],
          },
        ],
        form1: {
          c1: {
            objective: "vocab-supple-context",
            prompt:
              "In “The Workshop in the Rainbarrel,” what does Grandpa mean when he says tanned leather stays supple?",
            correct: "It bends and folds smoothly without cracking or snapping.",
            wrong: [
              "It dries into a rigid board like a wooden ruler.",
              "It dissolves when rainwater touches it.",
              "It glows brightly in the dark shed.",
            ],
            explanation:
              "Supple means flexible and easy to bend without cracking—shown when the dark tanned strip folds smoothly and springs back.",
          },
          o1: {
            objective: "reading-barrel-evidence",
            prompt:
              "In “The Workshop in the Rainbarrel,” why can't Yonatan simply dry raw skin in the sun to make a soft pouch? Use two details from paragraphs 1–2 to explain.",
            exemplar:
              "When plain raw skin dries without tannin, its fibers glue together and turn as stiff as a wooden ruler with curled edges. Also, raw skin is perishable and will rot if it gets damp again.",
            rubric: [
              "Explains that plain dried hide becomes stiff or hard like rawhide",
              "Cites the ruler comparison or curled/snapping detail from the passage",
              "Mentions that untreated raw skin is perishable or rots when damp",
              "Connects the oak-bark tannin soak to keeping the fibers flexible",
            ],
            explanation:
              "Paragraphs 1 and 2 show two problems with untreated hide: drying it plain glues the fibers into stiff rawhide, while leaving it damp lets bacteria rot it.",
          },
          m1: {
            objective: "vocab-match-day1",
            prompt: "Connect each word or item from the passage to its match.",
            matches: [
              { left: "Perishable", right: "Likely to spoil or rot if untreated" },
              { left: "Saturate", right: "Soak completely through with liquid" },
              { left: "Supple", right: "Flexible and smooth-bending without cracking" },
              { left: "Tannin", right: "Oak-bark substance that preserves hide" },
            ],
            explanation:
              "Perishable means likely to spoil; saturate means soak completely; supple means flexible; tannin is the tree-bark compound that turns hide into leather.",
          },
          c2: {
            objective: "reading-barrel-inference",
            prompt:
              "In paragraph 3 of “The Workshop in the Rainbarrel,” what does Yonatan's bend test prove?",
            correct:
              "Soaking in tannin changes the hide's internal flexibility, not just its brown color.",
            wrong: [
              "Both strips are equally strong when bent sharply.",
              "The pale strip was soaked in the barrel for too long.",
              "Oak bark only changes the smell of the leather.",
            ],
            explanation:
              "The plain strip snaps when bent while the tanned strip folds smoothly, proving the barrel soak changed how the internal fibers move.",
          },
          o2: {
            objective: "vocab-creative-application-day1",
            prompt:
              "Imagine explaining to a younger friend why a baseball glove is made from tanned leather instead of plain sun-dried skin. Use at least one of today's vocabulary words (perishable, saturate, supple, or tannin) in your explanation.",
            exemplar:
              "If you used plain sun-dried skin, it would be stiff as a board and perishable in the rain. Tanners saturate the hide in tannin so the leather becomes supple enough to squeeze shut when you catch a ball!",
            rubric: [
              "Uses at least one target vocabulary word accurately",
              "Contrasts stiff/perishable raw skin with flexible tanned leather",
              "Connects the material property to catching or closing a baseball glove",
              "Explains the idea clearly in the child's own words",
            ],
            explanation:
              "A fielder needs a glove that is supple enough to close around a ball and preserved so sweat and rain don't ruin it.",
          },
        },
        form2: {
          c1: {
            objective: "vocab-supple-context",
            prompt:
              "In “The Workshop in the Rainbarrel,” why does Grandpa call raw animal skin perishable?",
            correct: "Bacteria will break it down and ruin it if it is not preserved.",
            wrong: [
              "It is already waterproof and lasts forever on its own.",
              "It is made out of solid oak wood.",
              "It can only be cut with a laser beam.",
            ],
            explanation:
              "Perishable means likely to decay or spoil—Grandpa explains that bacteria ruin damp raw skin unless it is tanned.",
          },
          o1: {
            objective: "reading-barrel-evidence",
            prompt:
              "In “The Workshop in the Rainbarrel,” how do paragraphs 1 and 3 contrast the pale untreated strip with the dark tanned strip? Cite one detail about each strip.",
            exemplar:
              "The pale untreated strip curled at the edges and snapped when Yonatan bent it sharply. The dark tanned strip stayed supple, folded smoothly, and sprang back without a crease.",
            rubric: [
              "Describes the pale untreated strip as stiff, curled, or snapping",
              "Describes the dark tanned strip as supple, folding smoothly, or springing back",
              "Uses accurate details from paragraphs 1 and 3",
              "Explains that the tannin soak caused the difference between the two strips",
            ],
            explanation:
              "Comparing the two strips side by side shows the physical effect of tanning: untreated hide snaps, while tanned leather flexes.",
          },
          m1: {
            objective: "vocab-match-day1",
            prompt: "Connect each word or item from the passage to its match.",
            matches: [
              { left: "Perishable", right: "Likely to spoil or rot if untreated" },
              { left: "Saturate", right: "Soak completely through with liquid" },
              { left: "Supple", right: "Flexible and smooth-bending without cracking" },
              { left: "Tannin", right: "Oak-bark substance that preserves hide" },
            ],
            explanation:
              "Perishable means likely to spoil; saturate means soak completely; supple means flexible; tannin is the tree-bark compound that turns hide into leather.",
          },
          c2: {
            objective: "reading-barrel-inference",
            prompt:
              "In “The Workshop in the Rainbarrel,” what happens when the hide saturates in the oak barrel?",
            correct: "Tannin molecules soak deep inside and lock the microscopic fibers.",
            wrong: [
              "The hide turns into brittle glass.",
              "The water washes away all the collagen fibers.",
              "The hide shrinks to the size of a postage stamp.",
            ],
            explanation:
              "Saturating the hide lets oak-bark tannin reach the microscopic fibers and lock them so they stay flexible.",
          },
          o2: {
            objective: "vocab-creative-application-day1",
            prompt:
              "Why did Yonatan first think the barrel might just be dyeing the leather brown, and what changed his mind in “The Workshop in the Rainbarrel”?",
            exemplar:
              "At first he only saw dark brown water and thought it was just soaking or coloring the hide. When he bent both strips and saw the untreated one snap while the tanned one stayed supple, he realized the tannin changed the hidden fibers.",
            rubric: [
              "Identifies what Yonatan initially saw in the dark brown barrel",
              "Describes the bend test in paragraph 3",
              "Contrasts the snapping untreated strip with the flexible tanned strip",
              "Concludes that tanning alters the internal fibers rather than just surface color",
            ],
            explanation:
              "Visual appearance alone didn't prove what the barrel did—testing both strips by bending them revealed the structural change.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: From Raw Hide to Tanned Leather",
        subjects: ["How things work"],
        objectives: [
          "Trace the 3 steps of leather tanning from raw hide to cross-linked collagen",
          "Distinguish stiff untanned rawhide from flexible tanned leather",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Inside the Tannery: How Hide Becomes Leather",
            diagram: "leather-tanning-lab",
            text: `Every pro baseball glove starts as a cattle hide made of millions of microscopic protein ropes called collagen. By itself, raw hide has a big problem: it is mostly water! If you simply dry it in the sun, the collagen ropes stick together into a hard, stiff board called rawhide. If it gets wet again, bacteria eat the proteins and it rots.\n\nTo turn perishable hide into real leather, tanners tumble the cleaned hide inside a spinning drum filled with tannins—natural molecules originally brewed from oak and chestnut tree bark (that's where the word "tanning" comes from!). The tannins push water out and build tiny chemical bridges called cross-links between the collagen ropes, keeping them spaced apart so the leather bends smoothly for decades.`,
            highlight: ["collagen", "rawhide", "tannins", "cross-links"],
            terms: [
              {
                word: "Collagen",
                meaning: "Microscopic protein ropes that give skin and leather their strength.",
                example: "Tight bundles of collagen make leather tough enough to stop a fastball.",
              },
              {
                word: "Rawhide",
                meaning: "Untanned animal skin that dries stiff and hard like a board.",
                example: "Drumheads and stiff glove laces are made from untanned rawhide.",
              },
              {
                word: "Cross-Links",
                meaning: "Tiny chemical bridges created by tannins that hold collagen fibers apart so they can flex.",
                example: "Cross-links stop leather from rotting in the rain or gluing shut when dry.",
              },
            ],
            sources: [
              {
                label: "Britannica · Leather Processing & Tanning",
                url: "https://www.britannica.com/topic/leather",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "leather-collagen-role",
            prompt:
              "What are the microscopic protein ropes inside animal hide that give leather its strength?",
            correct: "Collagen fibers",
            wrong: [
              "Cotton threads",
              "Plastic polymers",
              "Cellulose bark rings",
            ],
            explanation:
              "Cattle hide is built from interlocking bundles of collagen protein fibers.",
          },
          o1: {
            objective: "leather-tanning-why",
            prompt:
              "Explain what happens to the microscopic collagen fibers during tanning, and why untanned rawhide feels so different from tanned leather.",
            exemplar:
              "In untanned rawhide, the collagen fibers stick together as they dry, turning into a stiff board. During tanning, tannin molecules build cross-link bridges between the collagen ropes so they stay spaced apart and can slide and bend smoothly without rotting.",
            rubric: [
              "Mentions collagen fibers or protein ropes inside the hide",
              "Explains that untanned fibers stick or glue together into stiff rawhide when dry",
              "Explains that tannins create bridges or cross-links between fibers",
              "Connects those bridges to keeping leather flexible and rot-resistant",
            ],
            explanation:
              "Tanning locks spacer bridges (cross-links) between collagen strands so they don't collapse together when dry or decay when damp.",
          },
          m1: {
            objective: "leather-process-match",
            prompt: "Connect each leather-making term to its job in the tannery.",
            matches: [
              { left: "Collagen", right: "Natural protein ropes inside the hide" },
              { left: "Spinning Drum", right: "Tumbles hides so tannins soak deep inside" },
              { left: "Cross-Links", right: "Tannin bridges that keep fibers spaced and flexible" },
              { left: "Rawhide", right: "Untanned skin that dries into a stiff board" },
            ],
            explanation:
              "Collagen is the protein fiber; the spinning drum pushes tannins in; cross-links bridge the fibers; rawhide is untanned dried skin.",
          },
          c2: {
            objective: "leather-drum-purpose",
            prompt:
              "Why do tanneries tumble hides inside a giant rotating drum instead of just painting tannin on the outside?",
            correct:
              "Tumbling flexes the thick hide so tannin molecules penetrate all the way to the center fibers.",
            wrong: [
              "Spinning turns the hide into wool yarn.",
              "Only the outside hair needs to touch the tannin.",
              "The drum bakes the hide at 500 degrees.",
            ],
            explanation:
              "A thick hide must be tanned all the way through; tumbling agitates and flexes the fibers so tannins saturate every layer.",
          },
          o2: {
            objective: "leather-rawhide-vs-tanned",
            prompt:
              "A camper leaves an untanned rawhide strip and a tanned leather belt out in a rainstorm, then lets both dry in the sun. Predict how each one will behave and explain why.",
            exemplar:
              "The untanned rawhide will soak up water, get slimy or start to rot, and then dry back into a stiff, warped board because its fibers have no cross-links. The tanned leather belt will stay strong and flexible because tannins locked its collagen fibers.",
            rubric: [
              "Predicts that untanned rawhide softens/rots when wet or dries stiff/warped",
              "Predicts that the tanned leather belt remains durable and flexible",
              "Explains the role of tannin cross-links in protecting the belt",
              "Distinguishes rawhide from tanned leather clearly",
            ],
            explanation:
              "Without tannin cross-links, water re-softens rawhide and bacteria attack it, whereas tanned leather resists rotting and keeps its fiber structure.",
          },
        },
        form2: {
          c1: {
            objective: "leather-collagen-role",
            prompt:
              "Where did the word “tanning” originally come from in leather making?",
            correct: "From tannin, the natural compound in oak and chestnut tree bark.",
            wrong: [
              "From leaving hides on the beach to get a sunburn.",
              "From the Latin word for baseball mitts.",
              "From painting white cloth with brown paint.",
            ],
            explanation:
              "Ancient leather makers soaked hides in crushed oak bark rich in tannin, giving the process the name tanning.",
          },
          o1: {
            objective: "leather-tanning-why",
            prompt:
              "Why does drying a raw hide in the sun without tanning fail to make good flexible leather for a jacket or glove pocket?",
            exemplar:
              "When water evaporates from an untanned hide, the loose collagen fibers collapse and stick directly to one another. That turns the skin into stiff, board-like rawhide instead of flexible leather, and if it gets wet again it can rot.",
            rubric: [
              "Identifies that water leaves the raw hide as it dries",
              "Explains that collagen fibers stick or collapse together without tannins",
              "Names the stiff result (rawhide) or describes its board-like stiffness",
              "Notes that tanning is needed to space the fibers and prevent rotting",
            ],
            explanation:
              "Tannins are essential to coat and bridge the collagen fibers so they don't glue themselves together as water leaves.",
          },
          m1: {
            objective: "leather-process-match",
            prompt: "Connect each leather-making term to its job in the tannery.",
            matches: [
              { left: "Collagen", right: "Natural protein ropes inside the hide" },
              { left: "Spinning Drum", right: "Tumbles hides so tannins soak deep inside" },
              { left: "Cross-Links", right: "Tannin bridges that keep fibers spaced and flexible" },
              { left: "Rawhide", right: "Untanned skin that dries into a stiff board" },
            ],
            explanation:
              "Collagen is the protein fiber; the spinning drum pushes tannins in; cross-links bridge the fibers; rawhide is untanned dried skin.",
          },
          c2: {
            objective: "leather-drum-purpose",
            prompt:
              "What do tannin cross-links do inside a piece of leather when you bend it?",
            correct:
              "They hold the collagen ropes together while letting them flex without snapping or gluing shut.",
            wrong: [
              "They melt the collagen into liquid.",
              "They freeze the hide so it can never bend.",
              "They turn the leather into metal.",
            ],
            explanation:
              "Cross-links act like flexible rungs on a rope ladder, keeping the collagen bundles strong yet able to flex.",
          },
          o2: {
            objective: "leather-rawhide-vs-tanned",
            prompt:
              "Suppose a tannery rushed a thick hide out of the spinning drum before the tannin reached the middle layer. What problem would show up later when someone used that leather?",
            exemplar:
              "The outside surfaces would be flexible tanned leather, but the center core would still be untanned rawhide! That middle layer would feel stiff like cardboard, crack when bent repeatedly, or rot if moisture reached it.",
            rubric: [
              "Identifies that the middle layer would remain untanned rawhide",
              "Describes a physical consequence such as stiffness or cracking when bent",
              "Mentions that moisture could cause the untanned core to rot",
              "Connects the problem to incomplete tannin penetration in the drum",
            ],
            explanation:
              "If tannin doesn't penetrate all the way to the core, a hard rawhide center remains trapped inside the leather.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Torah Blueprint: Parshat Noach & The 3-Deck Teivah",
        subjects: ["Torah"],
        objectives: [
          "Describe the 3 decks, Kofer pitch coating, and Tzohar of Noach's Teivah according to Chumash and Rashi",
          "Explain why Hashem commanded Noach to build the Teivah over 120 years",
        ],
        teaching: [
          {
            kind: "torah",
            title: "Parshat Noach: Engineering the Teivah & The 120-Year Lesson",
            diagram: "teivah-blueprint-explorer",
            text: `In Parshat Noach (Bereishis 6:14–16), Hashem gives Noach exact engineering instructions to build a Teivah (Ark) out of gopher wood: 300 amos long, 50 amos wide, and 30 amos high. To keep the massive wooden hull waterproof in raging floodwaters, Noach coats it inside and outside with Kofer (thick waterproof pitch). Above, he makes a Tzohar—which Rashi explains was either a skylight window or a radiant precious stone that glowed to give light—and slopes the roof to a 1-amah peak so rainwater slides right off.\n\nInside, the Teivah had three decks: the top deck for Noach and his family, the middle deck to shelter the animals, and the bottom deck for waste and ballast. Rashi asks a famous question: Hashem could have saved Noach in an instant—why command him to plant cedar trees and hammer the Teivah for 120 years? So that people passing by would ask, "What are you building?" and hear Noach's warning to do Teshuvah before the Flood!`,
            highlight: ["Teivah", "Kofer", "Tzohar", "120 years", "Teshuvah"],
            terms: [
              {
                word: "Teivah (תֵּבָה)",
                meaning: "Literally 'box' or 'ark'—and in Hebrew, Teivah also means a 'word' of Torah and Tefillah!",
                example: "Just as Noach entered the Teivah for protection, we enter the words (teivos) of Tefillah with focus.",
              },
              {
                word: "Kofer (כֹּפֶר)",
                meaning: "Waterproof pitch or tar smeared inside and outside the wooden hull.",
                example: "The thick Kofer sealed every seam of the Teivah against the surging floodwaters.",
              },
              {
                word: "Tzohar (צֹהַר)",
                meaning: "The light source of the Teivah—a skylight window or a glowing gemstone (Rashi).",
                example: "During dark storm months, the Tzohar shone inside the Teivah so Noach knew day from night.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Bereishis 6:14–16 with Rashi",
                url: "https://www.sefaria.org/Genesis.6.14?lang=bi&with=Rashi",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "torah-teivah-decks",
            prompt:
              "According to Rashi on Bereishis 6:16, how were the three decks of Noach's Teivah organized from top to bottom?",
            correct:
              "Top deck for people, middle deck for animals, bottom deck for waste and storage.",
            wrong: [
              "Top deck for heavy stones, middle deck for people, bottom deck for birds.",
              "All three decks were open swimming pools for fish.",
              "Top deck for waste, middle deck for people, bottom deck for giraffes.",
            ],
            explanation:
              "Rashi (citing Chazal) explains: top level for humans, middle level for animals/living quarters, and bottom level for waste.",
          },
          o1: {
            objective: "torah-noach-120-years",
            prompt:
              "Hashem could have saved Noach in a single moment. According to Rashi, why did Hashem command Noach to spend 120 years planting trees and building the Teivah in public?",
            exemplar:
              "Hashem wanted the people of that generation to see Noach cutting wood and building for 120 years, ask him what he was doing, and hear his warning so they would have a chance to do Teshuvah.",
            rubric: [
              "Mentions the long 120-year building period in public",
              "Explains that neighbors/passersby would see him and ask what he was building",
              "Connects Noach's answer to warning the generation about the Flood",
              "Explains that Hashem wanted to give people the opportunity to do Teshuvah",
            ],
            explanation:
              "Rashi explains that Hashem shows patience for 120 years so Noach's visible construction would spark questions and invite Teshuvah.",
          },
          m1: {
            objective: "torah-teivah-match",
            prompt: "Connect each feature of Noach's Teivah to its meaning in Rashi.",
            matches: [
              { left: "Kofer", right: "Waterproof pitch sealing the inside and outside" },
              { left: "Tzohar", right: "Skylight or glowing gemstone providing light" },
              { left: "1-Amah Roof Peak", right: "Sloped top so rainwater would slide off" },
              { left: "Teivah", right: "Means both 'Ark' and a 'word' of Tefillah" },
            ],
            explanation:
              "Kofer is waterproof pitch; Tzohar is the window/gemstone light; the 1-amah peak sloped the roof; Teivah means both ark and word.",
          },
          c2: {
            objective: "torah-tzohar-meaning",
            prompt:
              "What two explanations does Rashi bring for the Tzohar that Hashem told Noach to place in the Teivah?",
            correct: "Either a skylight window or a glowing precious stone.",
            wrong: [
              "A bronze anchor or a silk sail.",
              "A compass needle or a wooden rudder.",
              "A furnace chimney or a windmill.",
            ],
            explanation:
              "Rashi brings two Midrashic views on Tzohar: some say a window, and others say a precious stone that glowed to give them light.",
          },
          o2: {
            objective: "torah-teivah-engineering-connection",
            prompt:
              "Why did the Teivah need both a sloped 1-amah roof peak AND Kofer pitch on the inside and outside? Explain what each feature protected against.",
            exemplar:
              "The Kofer pitch sealed the wooden planks inside and out so the fierce floodwaters underneath couldn't leak through the seams. The sloped 1-amah roof peak let torrential rain from above slide right off instead of pooling on top and crushing the roof.",
            rubric: [
              "Explains how Kofer pitch waterproofed the wooden hull against water outside/inside",
              "Explains how the sloped 1-amah roof kept heavy rainwater from collecting on top",
              "Connects both features to surviving the Flood safely",
              "Uses clear cause-and-effect reasoning",
            ],
            explanation:
              "Rashi notes that the Teivah faced water from below (requiring pitch inside and out) and heavy rain from above (requiring a sloped roof so water ran off).",
          },
        },
        form2: {
          c1: {
            objective: "torah-teivah-decks",
            prompt:
              "Why did Hashem instruct Noach to finish the roof of the Teivah to a 1-amah width at the top?",
            correct:
              "So the roof would slope steeply and rainwater would run off instead of pooling.",
            wrong: [
              "So birds could build nests on a flat wide deck.",
              "So the Ark could flip upside down in the water.",
              "So no one could see the Teivah from far away.",
            ],
            explanation:
              "Rashi explains that narrowing the top to one amah sloped the roof so the heavy rains would slide off.",
          },
          o1: {
            objective: "torah-noach-120-years",
            prompt:
              "What does the 120-year building of the Teivah teach us about how Hashem treats people even when they are acting wrongly?",
            exemplar:
              "It teaches that Hashem is patient and wants people to return (do Teshuvah) rather than be punished. By having Noach build the Ark openly for 120 years, Hashem gave everyone plenty of warnings and chances to change their ways.",
            rubric: [
              "Mentions Hashem's patience or kindness",
              "Refers to the 120 years of visible building",
              "Explains that people had a chance to ask questions and hear Noach's warning",
              "Connects the lesson to Teshuvah (returning/improving one's actions)",
            ],
            explanation:
              "Even when a generation sinned, Hashem waited 120 years and created a public project to wake people up to Teshuvah.",
          },
          m1: {
            objective: "torah-teivah-match",
            prompt: "Connect each feature of Noach's Teivah to its meaning in Rashi.",
            matches: [
              { left: "Kofer", right: "Waterproof pitch sealing the inside and outside" },
              { left: "Tzohar", right: "Skylight or glowing gemstone providing light" },
              { left: "1-Amah Roof Peak", right: "Sloped top so rainwater would slide off" },
              { left: "Teivah", right: "Means both 'Ark' and a 'word' of Tefillah" },
            ],
            explanation:
              "Kofer is waterproof pitch; Tzohar is the window/gemstone light; the 1-amah peak sloped the roof; Teivah means both ark and word.",
          },
          c2: {
            objective: "torah-tzohar-meaning",
            prompt:
              "In Hebrew, the word Teivah means 'Ark' or 'box,' and it also means what?",
            correct: "A word (such as a word of Torah or Tefillah).",
            wrong: [
              "A mountain peak.",
              "A bronze sword.",
              "A thunderstorm.",
            ],
            explanation:
              "The Baal Shem Tov and classic commentators point out that Teivah means both the Ark and a word of prayer/Torah that shelters a person's soul.",
          },
          o2: {
            objective: "torah-teivah-engineering-connection",
            prompt:
              "On the Middle Deck of the Teivah, Noach and his family cared for all the animals for a full year. How did feeding each species at its own hour prepare Noach to rebuild the world through Chessed (kindness)?",
            exemplar:
              "Before the Flood, the world was destroyed because of robbery and cruelty. By spending a whole year staying awake day and night to feed every animal what it needed at its exact time, Noach practiced constant Chessed so the rebuilt world would stand on kindness.",
            rubric: [
              "Describes Noach's tireless care in feeding each animal on the Teivah",
              "Contrasts this kindness with the selfishness/robbery before the Flood",
              "Explains how practicing daily Chessed prepared Noach to rebuild the world",
              "Expresses a clear, thoughtful Torah insight",
            ],
            explanation:
              "Chazal teach that the world stands on Chessed (Olam Chessed Yibaneh)—and the Teivah was a year-long training ground in selfless care.",
          },
        },
      },
    ],
  },

  // =========================================================================
  // DAY 2
  // =========================================================================
  {
    order: 2,
    title: "Day 2 · Full-Grain Armor & Rav Yisroel Salanter",
    readingPassage: {
      title: "The Catcher's Split-Second Secret",
      text: `At the swap meet, two baseball mitts sat on the same table for thirty dollars. One looked brand-new, covered in bright orange fuzzy suede that squeezed shut effortlessly with two fingers. Next to it sat a dark chestnut catcher's mitt with a rich, glossy patina on the palm and tiny natural pores visible across the leather.

Aharon's cousin Dovi reached for the fuzzy orange glove. "Take this one—it's already soft!" Wait, thought Aharon, running his thumb along the edge of both gloves. Where the orange suede met the laces, the fuzzy fibers were already stretching into oval holes from light abrasion. The chestnut mitt's full-grain surface, however, had tight interlocking fibers that hadn't torn a millimeter despite years of fastballs.

"Soft on day one isn't the same as resilient," Aharon said, choosing the chestnut mitt. An authentic fielder's glove shouldn't feel like a slipper; its dense outer grain is meant to absorb shock and grow smoother the harder it works.`,
      words: [
        {
          word: "resilient",
          meaning: "Able to withstand shock, pressure, or tough use and bounce back strong.",
          example: "Full-grain steerhide is resilient enough to catch thousands of fastballs.",
        },
        {
          word: "abrasion",
          meaning: "Scraping, rubbing, or wearing away of a surface by friction.",
          example: "Diving on infield dirt causes heavy abrasion against a fielder's glove.",
        },
        {
          word: "patina",
          meaning: "A warm, rich shine that real full-grain leather develops over years of use.",
          example: "The vintage mitt had a deep honey patina right in the center of the pocket.",
        },
        {
          word: "authentic",
          meaning: "Genuine, real, and made the true way rather than a cheap imitation.",
          example: "Tiny natural pores proved the catcher's mitt was authentic full-grain leather.",
        },
      ],
    },
    chunks: [
      {
        idSuffix: "chunk-1",
        title: "Word Workshop & Short Reading: The Swap-Meet Mitt",
        subjects: ["Vocabulary", "Reading & thinking"],
        objectives: [
          "Use resilient, abrasion, patina, and authentic accurately",
          "Evaluate competing choices using physical clues in a short passage",
        ],
        teaching: [
          {
            kind: "vocabulary",
            title: "Unlock Today's 4 Power Words",
            text: "Tap each word card to reveal its meaning and example, then test yourself in the Quick Word Lightning Check!",
            highlight: ["resilient", "abrasion", "patina", "authentic"],
            terms: [
              {
                word: "resilient",
                meaning: "Able to withstand shock, pressure, or tough use and bounce back strong.",
                example: "Full-grain steerhide is resilient enough to catch thousands of fastballs.",
              },
              {
                word: "abrasion",
                meaning: "Scraping, rubbing, or wearing away of a surface by friction.",
                example: "Diving on infield dirt causes heavy abrasion against a fielder's glove.",
              },
              {
                word: "patina",
                meaning: "A warm, rich shine that real full-grain leather develops over years of use.",
                example: "The vintage mitt had a deep honey patina right in the center of the pocket.",
              },
              {
                word: "authentic",
                meaning: "Genuine, real, and made the true way rather than a cheap imitation.",
                example: "Tiny natural pores proved the catcher's mitt was authentic full-grain leather.",
              },
            ],
          },
          {
            kind: "passage",
            title: "The Catcher's Split-Second Secret",
            text: `At the swap meet, two baseball mitts sat on the same table for thirty dollars. One looked brand-new, covered in bright orange fuzzy suede that squeezed shut effortlessly with two fingers. Next to it sat a dark chestnut catcher's mitt with a rich, glossy patina on the palm and tiny natural pores visible across the leather.\n\nAharon's cousin Dovi reached for the fuzzy orange glove. "Take this one—it's already soft!" Wait, thought Aharon, running his thumb along the edge of both gloves. Where the orange suede met the laces, the fuzzy fibers were already stretching into oval holes from light abrasion. The chestnut mitt's full-grain surface, however, had tight interlocking fibers that hadn't torn a millimeter despite years of fastballs.\n\n"Soft on day one isn't the same as resilient," Aharon said, choosing the chestnut mitt. An authentic fielder's glove shouldn't feel like a slipper; its dense outer grain is meant to absorb shock and grow smoother the harder it works.`,
            highlight: ["patina", "abrasion", "resilient", "authentic"],
          },
        ],
        form1: {
          c1: {
            objective: "vocab-patina-meaning",
            prompt:
              "In “The Catcher's Split-Second Secret,” what is the glossy patina on the chestnut catcher's mitt?",
            correct:
              "A rich, smooth shine that genuine full-grain leather develops through years of use.",
            wrong: [
              "A layer of orange spray paint hiding torn stitches.",
              "A fuzzy tear caused by scraping on rocks.",
              "A plastic price tag stapled to the wrist strap.",
            ],
            explanation:
              "Patina is the natural luster and rich sheen that high-quality leather earns as it ages and absorbs oils.",
          },
          o1: {
            objective: "reading-mitt-clue-analysis",
            prompt:
              "In “The Catcher's Split-Second Secret,” why did Dovi prefer the orange glove at first, and what physical clue convinced Aharon to pick the chestnut mitt instead?",
            exemplar:
              "Dovi liked the orange suede glove because it looked brand-new and squeezed shut easily with two fingers. Aharon noticed that where the orange suede met the laces, the fuzzy fibers were already stretching into oval holes from light abrasion, while the chestnut mitt's tight full-grain fibers hadn't torn at all.",
            rubric: [
              "Explains Dovi's reason (looked new and squeezed shut effortlessly)",
              "Cites the clue on the orange glove (lace holes stretching from abrasion)",
              "Cites the clue on the chestnut mitt (tight fibers that hadn't torn despite years of fastballs)",
              "Explains the difference between instant softness and resilient durability",
            ],
            explanation:
              "Paragraph 2 contrasts the stretching lace holes on the fuzzy suede glove with the intact, tight grain of the older chestnut mitt.",
          },
          m1: {
            objective: "vocab-match-day2",
            prompt: "Connect each vocabulary word to its meaning.",
            matches: [
              { left: "Resilient", right: "Tough enough to handle impact and bounce back" },
              { left: "Abrasion", right: "Wearing or scraping caused by friction" },
              { left: "Patina", right: "Rich gloss earned by real leather over time" },
              { left: "Authentic", right: "Genuine and real rather than an imitation" },
            ],
            explanation:
              "Resilient means tough and able to recover; abrasion is friction wear; patina is aged leather shine; authentic means genuine.",
          },
          c2: {
            objective: "reading-mitt-statement",
            prompt:
              "What does Aharon mean in paragraph 3 of “The Catcher's Split-Second Secret” when he says, “Soft on day one isn't the same as resilient”?",
            correct:
              "A glove that starts out mushy may stretch and tear quickly, whereas dense leather holds up under real impact.",
            wrong: [
              "A good baseball glove should never be able to close.",
              "Brand-new gloves are always worse than broken gloves.",
              "Catchers never catch fast pitches.",
            ],
            explanation:
              "Suede feels soft immediately because its fibers are loose, but resilient full-grain leather protects the hand and lasts for years.",
          },
          o2: {
            objective: "vocab-application-day2",
            prompt:
              "Suppose someone offers to sell you an “authentic pro leather backpack,” but the surface flakes off when scratched and the strap holes are stretching into long ovals. Using two clues from “The Catcher's Split-Second Secret,” explain why you should be suspicious.",
            exemplar:
              "Real full-grain leather has tight interlocking fibers with tiny natural pores and develops a rich patina instead of flaking. If the strap holes are stretching into ovals from light abrasion, the bag is made from weak split suede or fake material, not resilient full-grain leather.",
            rubric: [
              "Cites stretching holes as a sign of weak fibers under tension/abrasion",
              "Contrasts flaking with authentic full-grain pores or patina",
              "Uses at least one target concept (resilient, abrasion, patina, or authentic)",
              "Forms a logical argument backed by physical evidence",
            ],
            explanation:
              "Inspecting where straps or laces pull on the material reveals whether the fiber weave is dense full-grain or weak material.",
          },
        },
        form2: {
          c1: {
            objective: "vocab-patina-meaning",
            prompt:
              "In “The Catcher's Split-Second Secret,” what caused the oval holes around the laces of the bright orange glove?",
            correct: "Abrasion and pulling against loose fuzzy suede fibers.",
            wrong: [
              "Moths eating wool threads in the winter.",
              "A rich patina strengthening the palm.",
              "Oak-bark tannin making the leather too thick.",
            ],
            explanation:
              "Paragraph 2 states that where the orange suede met the laces, the fuzzy fibers were stretching into oval holes from light abrasion.",
          },
          o1: {
            objective: "reading-mitt-clue-analysis",
            prompt:
              "In “The Catcher's Split-Second Secret,” why is looking only at whether a glove looks 'brand-new' a mistake when shopping for sports gear? Use two details from the passage.",
            exemplar:
              "The orange glove looked brand-new and felt soft right away, but its fuzzy suede fibers were already stretching around the lace holes. The older chestnut mitt had a worn patina, yet its full-grain fibers were still tight, resilient, and untorn after years of fastballs.",
            rubric: [
              "Points out that the new-looking orange glove was already stretching at the laces",
              "Notes that the older chestnut mitt had tight, untorn full-grain fibers",
              "Mentions patina or natural pores as signs of authentic quality",
              "Concludes that material strength matters more than brand-new appearance",
            ],
            explanation:
              "Surface freshness can hide weak materials, while aged full-grain leather with a patina proves its resilience.",
          },
          m1: {
            objective: "vocab-match-day2",
            prompt: "Connect each vocabulary word to its meaning.",
            matches: [
              { left: "Resilient", right: "Tough enough to handle impact and bounce back" },
              { left: "Abrasion", right: "Wearing or scraping caused by friction" },
              { left: "Patina", right: "Rich gloss earned by real leather over time" },
              { left: "Authentic", right: "Genuine and real rather than an imitation" },
            ],
            explanation:
              "Resilient means tough and able to recover; abrasion is friction wear; patina is aged leather shine; authentic means genuine.",
          },
          c2: {
            objective: "reading-mitt-statement",
            prompt:
              "Which detail in “The Catcher's Split-Second Secret” helped Aharon recognize that the chestnut mitt was authentic full-grain leather?",
            correct: "Tiny natural pores and a rich glossy patina on the palm.",
            wrong: [
              "Fuzzy orange nap on both sides of the fingers.",
              "Plastic stickers glued over the web.",
              "Lace holes that stretched wide open.",
            ],
            explanation:
              "Full-grain leather keeps the outer hide surface with its natural pore pattern and develops a glossy patina with use.",
          },
          o2: {
            objective: "vocab-application-day2",
            prompt:
              "In your own words, explain why a catcher's mitt needs to be resilient rather than feeling 'like a slipper' on the very first day.",
            exemplar:
              "A catcher's mitt has to stop blazing fastballs over and over without stinging the catcher's hand or ripping apart. If it feels as soft as a slipper on day one, the fibers are too loose to absorb hard impacts or hold a deep pocket.",
            rubric: [
              "Explains the job of a catcher's mitt (stopping fast pitches/absorbing shock)",
              "Explains what happens if leather is too loose or mushy on day one",
              "Connects dense, resilient fibers to hand protection and long life",
              "Uses clear, well-reasoned explanation",
            ],
            explanation:
              "Dense collagen fibers start firm so they can absorb kinetic energy and hold a pocket shape for years.",
          },
        },
      },
      {
        idSuffix: "chunk-2",
        title: "How Things Work: Full-Grain vs. Split Suede",
        subjects: ["How things work"],
        objectives: [
          "Explain how a splitting blade slices a thick hide into full-grain leather and bottom split suede",
          "Compare the fiber structure and strength of full-grain leather vs. suede",
        ],
        teaching: [
          {
            kind: "mechanism",
            title: "Slicing the Hide: Why Full-Grain Beats Suede in Sports Gear",
            diagram: "hide-layers-explorer",
            text: `When a cattle hide comes out of the tanning drum, it can be nearly a centimeter thick—way too thick and heavy to sew into a baseball glove or sneaker! So tanners feed the hide through a precision horizontal band knife called a splitting machine, which slices the hide cleanly in half like a bagel.\n\nThe top half—right where the animal's hair grew—is called Full-Grain Leather. Here, the collagen bundles are woven super tightly in interlocking angles, making it breathable, water-resistant, and nearly impossible to tear. The bottom half underneath the cut is called Split Leather (or Suede). Because both sides of that lower slice were cut by a blade, the loose horizontal fibers stand up in a soft, fuzzy nap. Suede feels cozy on a jacket or slipper, but only Full-Grain has the muscle for a pro baseball glove!`,
            highlight: ["splitting machine", "Full-Grain Leather", "Split Leather", "Suede"],
            terms: [
              {
                word: "Full-Grain Leather",
                meaning: "The tough uppermost layer of the hide with the tightest interlocking fibers and natural pores.",
                example: "Pro infield gloves use full-grain steerhide so the pocket never rips.",
              },
              {
                word: "Splitting Machine",
                meaning: "A horizontal band knife that slices a thick hide into a top grain layer and a bottom split.",
                example: "The splitting machine shaved the thick steerhide to the exact thickness for a mitt.",
              },
              {
                word: "Split / Suede",
                meaning: "The softer, fuzzy lower layer of a hide left underneath after the top grain is sliced off.",
                example: "Suede feels fuzzy because the blade cut right through the looser lower fibers.",
              },
            ],
            sources: [
              {
                label: "Leather Dictionary · Full-Grain vs. Split Leather",
                url: "https://www.leather-dictionary.com/index.php/Split_leather",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "hide-splitting-reason",
            prompt:
              "Why do tanneries run a tanned cattle hide through a horizontal splitting machine?",
            correct:
              "Because a whole cattle hide is too thick for most gear, so slicing it separates the tough top grain from the softer bottom layer.",
            wrong: [
              "To turn the leather back into raw skin.",
              "To add artificial plastic bubbles inside the hide.",
              "Because only the fuzzy bottom layer can stop a fastball.",
            ],
            explanation:
              "Whole cattle hides are up to 10 mm thick; horizontal splitting slices them to usable thickness and separates full-grain from split suede.",
          },
          o1: {
            objective: "hide-fullgrain-vs-suede",
            prompt:
              "Explain why suede feels fuzzy on the surface while full-grain leather feels smooth and tight, and why pro baseball gloves use full-grain for the palm.",
            exemplar:
              "Suede comes from the bottom split where the blade sliced through looser horizontal fibers, leaving fuzzy ends standing up. Full-grain is the uncut outer layer where collagen fibers are woven tightly in every direction, giving a pro glove palm the strength to take thousands of hard catches without stretching or tearing.",
            rubric: [
              "Identifies suede as the bottom split layer cut by the blade",
              "Explains why suede is fuzzy (cut fiber ends / looser weave)",
              "Identifies full-grain as the top outer layer with tight interlocking fibers",
              "Connects full-grain's tight weave to surviving repeated baseball impacts",
            ],
            explanation:
              "The outer grain layer naturally protects the animal, so its collagen bundles are packed much more densely than the lower split layer.",
          },
          m1: {
            objective: "hide-layers-match",
            prompt: "Connect each leather layer or tool to its description.",
            matches: [
              { left: "Full-Grain", right: "Top layer with tight interlocking fibers and natural pores" },
              { left: "Split Suede", right: "Fuzzy bottom layer with looser fibers" },
              { left: "Splitting Band Knife", right: "Slices a thick hide horizontally like a bagel" },
              { left: "Patina", right: "Glossy shine that full-grain develops over years of play" },
            ],
            explanation:
              "Full-grain is the dense top layer; split suede is the fuzzy lower layer; the band knife slices horizontally; patina is the aged shine on full-grain.",
          },
          c2: {
            objective: "hide-layer-choice",
            prompt:
              "If an engineer is choosing leather for hiking-boot laces or a baseball glove web that must not stretch out under heavy pulling, which layer is strongest?",
            correct: "The full-grain top layer",
            wrong: [
              "The fuzzy bottom suede split",
              "Shredded leather dust",
              "Untreated wet skin",
            ],
            explanation:
              "The full-grain layer has the highest fiber density and tensile strength.",
          },
          o2: {
            objective: "hide-design-tradeoff",
            prompt:
              "Is split suede 'bad' leather, or does it have its own smart uses? Give one job where split suede is a great choice and one job where only full-grain works, explaining why.",
            exemplar:
              "Split suede isn't bad—it's great for soft indoor slippers, jacket linings, or a grippy batting-glove palm because it bends right away and feels plush. But for a fielder's glove shell or work boots, you need full-grain because its tight fibers resist tearing and abrasion.",
            rubric: [
              "Names a sensible use for soft/fuzzy split suede",
              "Explains why suede's softness or texture fits that use",
              "Names a demanding use requiring full-grain leather",
              "Explains why full-grain's tight fiber weave is necessary there",
            ],
            explanation:
              "Good materials engineering matches each layer's properties—soft flexibility vs. high tensile strength—to the right job.",
          },
        },
        form2: {
          c1: {
            objective: "hide-splitting-reason",
            prompt:
              "What makes the surface of suede feel fuzzy compared to smooth full-grain leather?",
            correct:
              "The splitting blade cuts across the looser lower fibers, leaving tiny fiber ends standing up like a nap.",
            wrong: [
              "Tanners glue sheep wool onto plastic sheets.",
              "Full-grain leather is melted with a blowtorch.",
              "Suede is made from oak tree leaves.",
            ],
            explanation:
              "When the horizontal splitting knife separates the bottom layer, the cut collagen fibers create a soft, velvety nap called suede.",
          },
          o1: {
            objective: "hide-fullgrain-vs-suede",
            prompt:
              "When you run the 90-mph Pull Test in the diagram, why does the bottom split layer stretch much more than the full-grain layer?",
            exemplar:
              "The full-grain layer has collagen fibers tightly woven together in criss-crossing angles, so they lock against each other under tension. The bottom split layer has looser, mostly horizontal fibers that pull apart and stretch much more easily.",
            rubric: [
              "Describes the tight, interlocking fiber weave of the full-grain layer",
              "Describes the looser fiber structure of the bottom split layer",
              "Explains how fiber density resists stretching under tension",
              "Uses clear cause-and-effect language",
            ],
            explanation:
              "Fiber density and multi-directional weave determine how much a material stretches under load.",
          },
          m1: {
            objective: "hide-layers-match",
            prompt: "Connect each leather layer or tool to its description.",
            matches: [
              { left: "Full-Grain", right: "Top layer with tight interlocking fibers and natural pores" },
              { left: "Split Suede", right: "Fuzzy bottom layer with looser fibers" },
              { left: "Splitting Band Knife", right: "Slices a thick hide horizontally like a bagel" },
              { left: "Patina", right: "Glossy shine that full-grain develops over years of play" },
            ],
            explanation:
              "Full-grain is the dense top layer; split suede is the fuzzy lower layer; the band knife slices horizontally; patina is the aged shine on full-grain.",
          },
          c2: {
            objective: "hide-layer-choice",
            prompt:
              "Which part of the original animal hide becomes Full-Grain Leather after splitting?",
            correct: "The outermost top layer just beneath where the hair grew.",
            wrong: [
              "The innermost bottom layer next to the flesh.",
              "The hooves and horns.",
              "Sawdust left on the tannery floor.",
            ],
            explanation:
              "Full-grain is the top outer layer of the hide, preserving the natural pore grain and tightest fiber bundles.",
          },
          o2: {
            objective: "hide-design-tradeoff",
            prompt:
              "Why do beginner T-ball gloves for 4-year-olds often use soft split suede, while a 10-year-old's hardball glove uses stiffer full-grain leather?",
            exemplar:
              "A 4-year-old has small hands and catches light, slow balls, so soft split suede lets them squeeze the glove shut right away. A 10-year-old catches much faster, harder baseballs, so they need tough full-grain leather that won't flop backward or tear on impact.",
            rubric: [
              "Explains why a young beginner benefits from immediately soft suede (hand strength / slow ball)",
              "Explains why an older player needs full-grain leather (harder throws / impact support)",
              "Connects the tradeoff between easy closing and structural strength",
              "Demonstrates clear engineering reasoning",
            ],
            explanation:
              "Designers balance ease of squeezing against impact protection based on the player's strength and ball speed.",
          },
        },
      },
      {
        idSuffix: "chunk-3",
        title: "Gadol Spotlight: Rav Yisroel Salanter & The Shoemaker's Candle",
        subjects: ["Torah", "Gedolim"],
        objectives: [
          "Retell the story of Rav Yisroel Salanter and the shoemaker's flickering candle in Vilna",
          "Explain how Mussar connects everyday awareness, repairing middos, and caring for others",
        ],
        teaching: [
          {
            kind: "gadol",
            title: "Rav Yisroel Salanter (1810–1883): While the Candle Is Burning",
            diagram: "salanter-storybook",
            text: `Rav Yisroel Salanter, founder of the Mussar movement, believed that Torah study must transform our Middos—how kindly, honestly, and thoughtfully we treat other people. Late one freezing night in Vilna, Rav Yisroel walked past rows of dark houses until he spotted a faint glow in a basement window. Inside, a shoemaker was busily hammering leather soles by the light of a tiny, melting candle stub.\n\n"Friend, why are you still working so late?" Rav Yisroel asked. "Your candle is almost out!" The shoemaker looked up from the leather boot in his hands and replied simply: "As long as the candle is burning, it is still possible to mend and repair!"\n\nRav Yisroel was deeply moved. For weeks he repeated the cobbler's words to his students: the candle is our Neshama (soul), and the shoes needing repair are our Middos and actions. As long as our candle shines, it is never too late to grow! Rav Yisroel lived this care every day—famously teaching that "another person's physical needs are my own spiritual responsibility."`,
            highlight: ["Rav Yisroel Salanter", "Mussar", "Middos", "candle is burning", "Neshama"],
            terms: [
              {
                word: "Mussar (מוּסָר)",
                meaning: "Torah character development—working to refine our habits, honesty, and kindness.",
                example: "Rav Yisroel Salanter sparked the Mussar movement so people would study how to refine their character every day.",
              },
              {
                word: "Middos (מִדּוֹת)",
                meaning: "Character traits—qualities like patience, gratitude, honesty, and empathy.",
                example: "Just as a cobbler mends worn leather, we can strengthen our middos through practice.",
              },
              {
                word: "Cheshbon HaNefesh (חֶשְׁבּוֹן הַנֶּפֶשׁ)",
                meaning: "Taking an honest 'accounting of the soul' to see what habits we can improve.",
                example: "Spending two quiet minutes at night reviewing our day is a form of Cheshbon HaNefesh.",
              },
            ],
            sources: [
              {
                label: "Sefaria · Or Yisrael (Writings of Rav Yisroel Salanter)",
                url: "https://www.sefaria.org/Or_Yisrael",
              },
            ],
          },
        ],
        form1: {
          c1: {
            objective: "gadol-salanter-candle",
            prompt:
              "What did the Vilna shoemaker answer when Rav Yisroel Salanter asked why he was still hammering leather by a nearly melted candle?",
            correct:
              "“As long as the candle is burning, it is still possible to mend and repair!”",
            wrong: [
              "“Leather can only be cut at midnight when the moon is full.”",
              "“I have enough candles to last for ten years.”",
              "“Once a shoe has a scratch, it must be thrown away.”",
            ],
            explanation:
              "The cobbler's famous reply—that while the candle burns, repair is still possible—became a cornerstone Mussar teaching.",
          },
          o1: {
            objective: "gadol-salanter-metaphor",
            prompt:
              "In Rav Yisroel Salanter's lesson from the shoemaker, what does the 'burning candle' represent, and what does 'mending the leather shoe' represent? Give a real-life example for a 5th grader.",
            exemplar:
              "The burning candle represents our neshama (soul) and the time/energy we have today, while mending the shoe represents improving our middos and fixing our mistakes. For example, if you spoke impatiently to a sibling earlier today, the day isn't over—you can still apologize and do a kind act before bedtime.",
            rubric: [
              "Identifies the candle as our neshama, life, or opportunity today",
              "Identifies mending the shoe as repairing our middos, character, or mistakes",
              "Gives a concrete, relatable everyday example",
              "Explains why it is never too late to improve while the candle burns",
            ],
            explanation:
              "Rav Yisroel taught that we shouldn't give up when we make a mistake; while we have life and breath, we can always mend and grow.",
          },
          m1: {
            objective: "gadol-salanter-match",
            prompt: "Connect each Mussar concept or phrase to its meaning.",
            matches: [
              { left: "Mussar", right: "Torah discipline of refining character and conduct" },
              { left: "Middos", right: "Character traits like patience, honesty, and kindness" },
              { left: "Cheshbon HaNefesh", right: "Honest self-reflection on how to grow" },
              { left: "The Cobbler's Candle", right: "Reminder that while our soul shines, we can mend" },
            ],
            explanation:
              "Mussar is character growth; Middos are traits; Cheshbon HaNefesh is soul-accounting; the Cobbler's Candle symbolizes ongoing opportunity to mend.",
          },
          c2: {
            objective: "gadol-salanter-others",
            prompt:
              "What did Rav Yisroel Salanter mean by his famous teaching, “Another person's physical needs are my spiritual responsibility”?",
            correct:
              "Looking out for someone else's hunger, rest, or fair treatment is a core Torah duty, not just a side detail.",
            wrong: [
              "We should only care about our own test scores.",
              "Spiritual people never eat food or wear shoes.",
              "Only shoemakers are required to help their neighbors.",
            ],
            explanation:
              "Rav Yisroel taught that true spirituality means caring deeply that others have food, dignity, and fair treatment.",
          },
          o2: {
            objective: "gadol-salanter-application",
            prompt:
              "Imagine a kid says, 'I already lost my temper during recess today, so today is ruined—I'll try being nice next week.' How would Rav Yisroel Salanter and the shoemaker answer that thought?",
            exemplar:
              "They would say that the candle of today is still burning! A shoemaker doesn't throw away a boot or wait until next week just because there is one tear—he uses the light he still has right now to mend it. You can still make peace with your friend and end the day warmly.",
            rubric: [
              "Applies the shoemaker's 'while the candle burns' teaching",
              "Challenges the 'all-or-nothing / today is ruined' mindset",
              "Suggests a constructive action to mend the situation right now",
              "Connects the response to repairing middos",
            ],
            explanation:
              "One mistake never ruins a whole day; every remaining moment is light we can use to repair and do good.",
          },
        },
        form2: {
          c1: {
            objective: "gadol-salanter-candle",
            prompt:
              "What movement in Torah life did Rav Yisroel Salanter found in the 1800s?",
            correct: "The Mussar movement, focused on refining character (middos) and ethical sensitivity.",
            wrong: [
              "A guild for industrial steel bridge builders.",
              "A school that banned learning Chumash.",
              "A society for collecting antique coins.",
            ],
            explanation:
              "Rav Yisroel Salanter founded the Mussar movement to make character refinement and interpersonal sensitivity central to Torah study.",
          },
          o1: {
            objective: "gadol-salanter-metaphor",
            prompt:
              "Why was it so meaningful that Rav Yisroel Salanter learned such a deep Torah lesson from an ordinary working shoemaker late at night?",
            exemplar:
              "It shows that a wise person learns from everyone (as Pirkei Avot teaches: 'Who is wise? One who learns from every person'). Seeing how seriously the shoemaker cared about every minute of candlelight to mend leather inspired Rav Yisroel to care just as deeply about mending our spiritual character.",
            rubric: [
              "Explains that wisdom can be learned from every person's dedication",
              "Connects the shoemaker's diligence with physical leather to spiritual diligence",
              "Explains the lesson of valuing every moment while the candle burns",
              "Writes a thoughtful, well-supported explanation",
            ],
            explanation:
              "Rav Yisroel saw how hard people work to repair physical items and drew a kal v'chomer (all the more so) to repairing the soul.",
          },
          m1: {
            objective: "gadol-salanter-match",
            prompt: "Connect each Mussar concept or phrase to its meaning.",
            matches: [
              { left: "Mussar", right: "Torah discipline of refining character and conduct" },
              { left: "Middos", right: "Character traits like patience, honesty, and kindness" },
              { left: "Cheshbon HaNefesh", right: "Honest self-reflection on how to grow" },
              { left: "The Cobbler's Candle", right: "Reminder that while our soul shines, we can mend" },
            ],
            explanation:
              "Mussar is character growth; Middos are traits; Cheshbon HaNefesh is soul-accounting; the Cobbler's Candle symbolizes ongoing opportunity to mend.",
          },
          c2: {
            objective: "gadol-salanter-others",
            prompt:
              "In Rav Yisroel Salanter's teaching, what is Cheshbon HaNefesh?",
            correct:
              "Taking an honest, encouraging look at our own actions and middos so we can grow.",
            wrong: [
              "Counting how many shoes are in the closet.",
              "Keeping a list of other people's mistakes.",
              "Giving up whenever a habit is hard to change.",
            ],
            explanation:
              "Cheshbon HaNefesh literally means 'accounting of the soul'—reflecting on our day to spot ways to improve.",
          },
          o2: {
            objective: "gadol-salanter-application",
            prompt:
              "Explain Rav Yisroel Salanter's saying, “Another person's physical needs are my spiritual responsibility,” and give one example of how you can live that idea at home or school.",
            exemplar:
              "It means that helping someone else with a practical physical need—like making sure a classmate has lunch, helping carry heavy bags, or letting a tired parent rest—isn't just a nice favor; it is a mitzvah and a spiritual duty for me.",
            rubric: [
              "Explains the meaning of the quote accurately",
              "Connects another person's physical comfort/needs to one's own mitzvah responsibility",
              "Gives a specific, realistic example at home or school",
              "Expresses the idea clearly",
            ],
            explanation:
              "In Torah, caring for another person's physical well-being is one of the highest spiritual acts.",
          },
        },
      },
    ],
  },
];
