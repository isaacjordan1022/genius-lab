# Genius Lab — governing product direction

**Selected logo, October 7:** Isaac chose the rendered sky-blue/cobalt PNG. Use `public/brand/options/genius-lab-sky-cobalt-v1.png` for the Genius Lab wordmark in sign-in, navigation, loading and brand previews. Preserve the approved raster artwork and its transparency; the earlier mint/plum SVG wordmark is an archived concept. DynaPuff and Lexend remain the interface fonts.

This is the high-level source of truth for all children, curriculum generation, scoring, games, navigation and future features. Read this before implementing product behavior. Latest direct user decisions take precedence over older plans. Updated from Isaac's hands-on feedback, October 7, 2026.

## Purpose and children

Develop analytical and creative thinking alongside durable knowledge. Enjoyment and tickets serve actual learning. Start with Aharon Zev (10, grade 5), then adapt the same structure for Tobi (7, grade 2) and Ezra (4, kindergarten). Ezra defaults to listening with word highlighting. Personalize vocabulary, reading length, abstraction, instruction count, controls and response expectations, not just question difficulty.

## Canonical names and hierarchy

**Weekly plan (or weekly curriculum) → daily lesson → chunks.**

A week has five daily lessons and a separate, broader weekly test. Each daily lesson has 2–4 chunks. Each chunk pairs a short teaching experience with a handful of related activities. A daily lesson can cover 2–4 categories; subjects can recur across days. Never describe a whole day as a chunk in child-facing copy. Existing internal `chunkId` fields from the first prototype identify old daily records and must not be relabeled by rewriting history.

A plan is an overview of goals and sequence. A lesson is the experience of learning and responding. These must be separate, reachable views. The weekly page is the command center: inline daily chunks, saved scores, total progress and direct entry. Do not add a separate daily-plan interstitial. Keep a route back to the weekly plan; it must not reopen teaching during an active quiz. Returning to an overview never erases progress or accidentally starts a new attempt.

## Teach, try, explain, continue

Use coherent clusters: vocabulary + grammar + comprehension; fractions + a scientific investigation; a painting + its artist + interpretation; a selected Torah text + application. Do not put all the teaching at the start and all fifteen questions at the end.

The pilot daily lesson remains 15 four-point activities, now split into three five-activity chunks. The pilot target mix per chunk is two choices, one relationship-matching activity and two open reasoning/creative responses. Interleave formats; no wall of multiple-choice questions. Daily length targets 15–20 minutes but must be measured with the child and reduced when necessary. More open responses must not silently become a writing endurance test; voice is a core MVP requirement.

Teaching is designed content: short readable paragraphs, highlighted key terms, vocabulary cards with meanings and examples, worked examples, actual reading passages, and visual observation tasks. Use color to distinguish teaching purposes. Do not turn every paragraph into an identical decorative card. Artwork appreciation eventually needs actual sourced artwork. No invented images presented as famous originals.

Matching is a hands-on connection activity: connect labeled items with visible lines, by dragging or selecting endpoints. Provide equivalent tap and keyboard controls. Dropdowns are not the intended matching experience.

## Material access and assessment policy

Teaching precedes each chunk quiz. Starting the quiz closes that chunk's material until submission, including after navigating away and resuming. No persistent Revisit material control during a quiz. The weekly test is an independent, untimed assessment with new items and no in-test teaching panel. Materials remain available before starting and after submitting the test. A request to leave a test for reference should preserve the attempt and be recorded in the eventual reference-use history; do not present an assisted score as independent mastery. Time pressure is optional and should be limited to fluency/review where appropriate. It is not the default for comprehension or creative thinking.

A chunk's answers lock together on submission. Then reveal objective feedback and explanations; open responses wait for an actual rubric score. A child can revisit material and continue to the next chunk while written responses are being reviewed. Completing the daily lesson with at least 90% after all grades are final unlocks the next daily lesson and the intended reward. Keep first-attempt results, retries and independent weekly evidence separate. Never let a corrected/revealed answer overwrite the original attempt.

The weekly test is broader than a single daily check. Pilot v2 uses 24 mixed activities; actual duration/age adjustments still need playtesting. Weekly goals are assessed through new examples and transfer tasks, not copied questions.

## Feedback is instruction

After an incorrect objective response, show what the response missed, a useful explanation/example, and a way back to the relevant teaching. When AI is connected it may re-explain using the actual response and objective; it must not merely say “wrong” or award points for keywords. Make uncertainty and pending review visible. Current authored explanations are a pilot fallback, not live AI. For rubric responses, show criteria met/missing after grading and retain the original response. Language or speech-transcription errors should not be confused with conceptual understanding.

## Scores and tickets are different things

**Learning score:** an activity can earn up to four rubric points. Four out of four means full credit on that activity; it does not mean four tickets. Show “learning score” and plain-language status instead of unexplained fractions beside a ticket symbol.

**Tickets:** the spendable prize currency. Keep the ticket balance visible throughout every child screen, including teaching, questions, results and games. A compact persistent wallet accompanies the richer ticket-printer dashboard fixture. Show reward credits as separate named events. Never imply that practice game points or question rubric points are wallet tickets.

The real dollar conversion is not set. Target a $200 prize taking about 4–6 weeks of meaningful learning; include $10–300 products and family experiences. Checkout confirms immediately, deducts once, records prize history and notifies the parent; no reservations. Lifetime family leaderboard earnings do not fall with spending.

## Weekly coverage and source discipline

Plan and audit weekly coverage across language/literature/vocabulary/spelling/writing/grammar, math, science, art appreciation, geography, music, history/Jewish history and age-appropriate Torah. Some subjects recur; do not demand every subject every day or force artificial thematic links. Define concrete outcomes for every chunk and keep a weekly coverage matrix. A topic mention is not an assessed outcome. Honest coverage gaps are preferable to claiming an entire domain from one trivia fact.

Use parent-selected/source-verified Torah, Mishnah, Gemara and halacha material; do not invent rulings or treat an Avot activity as Gemara/halacha coverage. Backend-provided homework sources are enough initially. Publish versioned lessons so content changes cannot change a child's already-earned score.

## Visual and interaction direction

DynaPuff headlines + Lexend reading. Saturated tone-on-tone panels, pale matching text/buttons, quiet beige subtle rounded motif pattern, solid button depth, restrained gloss/arcade borders. Tick is the selected companion: a cute ticket-printing robot with coherent arms/hands, blink and thumbs-up. Ticket printing celebrates an earned credit briefly; no constant flashing while reading. Design for touch, keyboard, reduced motion, legibility and clear state changes.

The original gray wireframe was useful for structure, but teaching needs color, hierarchy and meaningful interaction now. Bring learning-product design into feature work; do not bolt decoration onto walls of prose.

## Build boundaries and verification

Protect all existing attempts, scores, purchases and ticket history. New curriculum revisions get new IDs; older attempts remain reviewable. Test gates, partial draft persistence, per-chunk locking/feedback boundaries, new-vs-old version isolation, duplicate rewards/purchases and pending grades. Walk through real teaching→activities→feedback→next chunk in the browser.

Local pilot services remain explicit: no live AI, ElevenLabs or production family accounts yet. Do not label those features connected. The next full MVP must include those services, cross-device persistence, child-specific paths and measured learning evidence.

## Design refinement — October 7

DynaPuff headings and Lexend reading/UI are locked. Backgrounds should be near-white cream, gray-green, or neutral gray with a very faint lightweight repeating SVG of rounded stars, pencils, and shapes. Avoid graph-paper grids. The design lab is a working style guide with actual font size/weight specimens, line heights, spacing/padding tokens, reading widths, 12 color pairings, and a Tick character pose sheet. The ticket fixture shows the current player’s name above the balance and “You’re a Tzadik!” on the right-hand stamp, replacing “Earned by you.”

## Prize Room — latest decision, October 7

The child-facing destination is **Prize Room**, never prize shelf or parent prize picker. Isaac manages prizes through this development conversation; do not build a parent curation workflow. Put the researched collection directly in the Prize Room. Remove console game software/cartridges; keep console hardware such as the previously requested Switch and expand standalone electronics, electronic toys and devices. Every physical prize displays a clean product-only image, without retailer controls, price labels, advertisements or page chrome. Keep retailer links, captured prices and original evidence as backend provenance.

Experience prizes form their own section using detailed golden tickets. Begin with the requested Smashhouse dinner, day trip and private lunch with a parent. Ticket prices are explicitly configured. For this playable pilot, the working conversion is 15 tickets per dollar: the base 600-ticket learning week makes a $200 prize take five weeks. This is a provisional implementation value, not a parent-approved final economy. Experience prices are separate adjustable ticket amounts, not invented retail prices. Checkout spends once and records the order; never reserve tickets. Preserve all historical orders when replacing demo products.

## Readability and companion refinements — latest decision, October 7

Normal DynaPuff headings use weight 400 or 500. Every interface text size is at least 18px, including labels, buttons, navigation, annotations and supporting text. Do not shrink text to fit a card; increase space or reflow it. The style lab must demonstrate these actual rules. Button hover must preserve readable foreground/background contrast; a generic hover fill must not overwrite a themed button's color pairing.

Tick remains the main companion. Keep Orbit and Scrib as optional customization concepts, collapsed away from the main presentation. All light skins use a mixed repeating pattern of rounded pencils, books, tickets, music notes, brushes, shapes and a few stars, with very subtle dimensional highlights. A stars-only pattern does not satisfy the brief. Keep lesson text on plain surfaces.

## Weekly plan and child copy — October 7 refinement

Weekly plans display a stable published date range and a date for every day. The pilot week is October 4–9, 2026; these dates must not silently roll forward while saved work stays attached to the old plan. Date labels describe the plan; the pilot still permits progression immediately after mastery.

Keep the measurable objectives in curriculum data and parent/author documentation. Do not print the assessment checklist above the child's weekly plan. “What you’ll work on” is a compact overview using friendly topic badges. Daily previews show chunk names and subjects, not duplicate objective lists. Actions use Enter, Begin, Continue, Try it. Cut explanations of obvious navigation; keep useful feedback, save state and material access.

**How things work is required every week for every child.** Begin with an interactive sketch, diagram or cross section. Explore part names, the chain of cause and effect, a sourced historical milestone, and a meaningful design or everyday-economics tradeoff. Qualify “first”: first known, first surviving, first patented, or first of a specified material are different claims. Never invent a first inventor. Suggested future objects: ATM, tunnel, building, microwave, bicycle, lock, elevator and water system.

Aharon Zev: explain mechanisms, compare designs, read simple quantities, justify tradeoffs and challenge claims. Tobi: identify a few parts, sequence what happens and explain one why. Ezra: listen, point, match, predict and explain orally with concrete pictures. Each future plan needs age-specific questions and retained-learning evidence for this topic, not just a topic badge.

Current pilot: a separate weekly bridge exploration has an interactive beam-bridge diagram and five scored activities with saved progress and rubric grading for two written answers. It does not rewrite existing lesson IDs or scores, award extra tickets, or bypass daily lesson gates. It is not yet included in the existing 24-question weekly test. Future authored weeks should place the topic within the daily lesson sequence and assess it again in the weekly test. The current playable profile remains Aharon; Tobi and Ezra are requirements for the next profile expansion, not live accounts.

## Live services and richer lessons — latest decision, October 7

Live AI grading, explanations and new question generation are required now, followed by ElevenLabs narration and spoken responses. Use server-only provider credentials. Never fabricate a grade on provider failure: retain locked submitted answers with a retryable pending status. Grade reasoning against an explicit rubric, accepting valid alternatives and ignoring filler words unless language mechanics are the objective. No child-facing references to parents checking work.

Expand comprehension passages and derive multiple questions from their details, inference, structure and interpretation. Math teaches before testing with clear worked examples and meaningful diagrams. New content uses new versioned IDs; history remains intact.

Offer optional bonus questions after submitted chunks: extra tickets for correct answers, teaching feedback for all. Save the encountered question and explanation for the week's separate extra-credit test. Bonus results do not alter core mastery percentages.

A clearly labeled Preview playground opens all games for design review. Preview runs never grant tickets, write scores or unlock lessons. Keep real mastery gates intact.

ElevenLabs reads teaching and questions with synchronized word highlighting. Typed and microphone answers share the same rubric. Provide a keyboard recording shortcut, a brief pre-submission re-record window, and no second answer after feedback. Audio capture stops on navigation and is not stored by this app. API connection status must distinguish configured credentials from verified successful requests. Branding remains under exploration; SmartyPants and Genius Lab are concepts, not a locked rename.

## Narration, quiz exits and tickets — October 7 hands-on feedback

Narration highlights words directly in existing visible material and preserves paragraphs, vocabulary emphasis and diagrams. Do not render a duplicate read-along transcript. Controls align with the teaching card's padding. Remove “Learn → try → reflect.”

For current v3 daily lessons, each submitted, fully graded chunk at 90% or higher earns 30 tickets once across attempts. Completing the whole daily lesson at 90% tops that lesson's earnings up to 100, preserving the weekly economy. The weekly test still earns 100. Pending or unfinished quizzes never earn tickets. Existing historical awards remain unchanged; do not pay an already-rewarded lesson again. The compact navigation wallet uses a dimensional gold ticket, counts up after a real credit, briefly shines and shows the earned amount; reduced motion disables movement.

A child may Quit (save and leave) or Restart an unsubmitted quiz. Restart clears only that quiz's answers and saves its abandoned draft in history; it does not reset other completed chunks, change tickets or consume a scored retry. It restarts questions, without opening a teaching toggle. Submitted quizzes and their original scores remain immutable.


Quiz controls keep Listen and Speak together, using clear speaker/microphone icons. Refer to each quiz item as a **question**, never an activity. The daily lesson header uses a compact subject path with current position, locks and saved quiz percentages instead of three oversized title cards. Keep the full chunk title in the learning content. Review answers use the established blue/sky, plum/lilac and forest/mint pairs, a clear score badge and a playful squiggly divider between the child's answer and the explanation. Color is decorative; scores and statuses remain explicit text.

## Daily Mission course — October 7 gameplay direction

Daily Mission is a real, lightweight 3D car course with a chase camera, three lanes, collectibles, barriers and a visible finish. Use the available screen: hide the large dashboard sidebar and introductory panels during the run; keep a compact day-of-week title, Exit, pause controls and ticket wallet. Desktop arrows and large touch buttons steer. Pause driving and its clock at question checkpoints, on manual pause and when the tab is hidden. Correct review answers earn run points plus a speed bonus; mistakes reduce run points, never spent or earned prize tickets.

Real missions draw short, standalone multiple-choice review questions only from submitted, graded learning history. Never expose new or unfinished quiz answers through the mission pool. Passage-dependent questions stay in lessons. Preview mode uses a clearly marked sample course and writes no scores or tickets. The first course is a 30-second drive with up to three question stops; the renderer is separate from simulation, review selection and persistence. Missing WebGL stops the run and gives an explicit recovery message. No external character assets or heavy 3D physics are needed for this first course.

## Tonight’s family dry run — October 7, 2026

Genius Lab is the selected app name. Use a glossy dimensional DynaPuff wordmark and GL icon, with Tick remaining the companion. Aharon Zev (10, grade 5) and Tobi (7, grade 2) each have a private username/password account backed by Neon Postgres. Passwords are hashed and sessions are HttpOnly; do not put credentials in source files or child-facing copy. Deploy to Vercel with server-only AI/voice keys. Existing local testing records remain separate from the fresh child accounts.

Both children begin Day 1, independent of the real weekday. Aharon starts the existing first-week curriculum. Tobi gets an original age-appropriate first lesson tonight; unpublished days are not presented as completed or playable content. Every session must teach new ideas with rich comprehension, useful contextual vocabulary, visual explanations and worthwhile bonus discoveries. Practice alone is insufficient.

For authenticated accounts, fully correct answers earn five tickets after quiz submission and finalized grading. Each logical question position pays once across retry forms. Partial or pending answers do not earn these tickets. Passing a full daily lesson tops its base earnings up to100. The legacy local pilot’s30-per-chunk rule remains only for historical testing; never combine both policies on one account. Prize conversion remains provisional.
