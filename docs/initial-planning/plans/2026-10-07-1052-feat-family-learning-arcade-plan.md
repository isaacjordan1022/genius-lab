# Superseding hands-on feedback

The governing specification is now `../../learning-arcade/PRODUCT.md`. The user renamed the hierarchy to weekly plan → daily lesson → chunks and requested interleaved teaching/activities, varied daily subjects, designed teaching cards, line matching, more open responses, explanatory feedback and a persistent ticket wallet. Earlier terminology below is historical and must not override the new specification. Existing user results are preserved through content versioning.

---
title: Family Learning Arcade PRD
date: 2026-10-07
type: feat
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-brainstorm
execution: code
---

# Family Learning Arcade PRD

Draft for alignment. This document is the product authority for the proposed V1; the accompanying technical spec describes a recommended implementation. Research notes are supporting material, not competing specifications. No application or external service has been deployed.

## Goal Capsule

- **Objective:** Help Aharon Zev, Tobi, and Ezra become stronger analytical and creative thinkers while gaining durable knowledge, through scored weekly learning and an enjoyable family arcade and prize store.
- **Product authority:** Isaac's directions in this conversation, consolidated here. Explicit choices are distinguished from proposed defaults.
- **Open decisions before implementation planning:** weekly cadence and test threshold; scoring/reassessment defaults; how daily access renews. Ticket conversion and reward caps must be resolved before enabling real redemptions.
- **Delivery boundary:** Three child experiences and a separate parent area for one family. Public enrollment, school administration, and a commercial marketplace are outside V1.

---

## Product Contract

### Summary

Each child follows a personalized weekly lesson, divided into daily chunks that teach first and then assess understanding. Passing a chunk opens the next chunk and arcade rewards; a weekly test opens the next lesson. Three minigames, a daily racing review, voice interaction, saved scores, and a ticket-funded prize shelf make progress visible and rewarding.

### Key decisions

- **Strict scored progression.** Governs R5–R8. (session-settled: user-directed — chosen over completion plus corrections: the user requires demonstrated performance before progression.)
- **Weekly breadth without forced themes.** Governs R3–R4. (session-settled: user-directed — chosen over forcing many subjects into a single themed daily lesson: each week carries a broader set of independent objectives.)
- **One review racing mission.** Governs R15–R16. (session-settled: user-directed — chosen over different daily mission games and new teaching: missions test already-taught material through one underlying game.)
- **Immediate checkout.** Governs R20–R21. (session-settled: user-directed — chosen over ticket reservation and approval: the child purchases immediately and the parent receives notification.)
- **Three games.** Governs R14. (session-settled: user-approved — Snake Trail, Match Studio, and Rally Run selected from the proposed compact catalog.)
- **Grayscale process first.** Governs R24–R25. The final visual direction remains saturated tone-on-tone arcade styling; current wireframes test navigation and state transitions.

### Users and terminology

| Term | Definition |
|---|---|
| Aharon Zev | Age 10, grade 5; reasoning, evidence, literary techniques, and increasingly independent explanations. |
| Tobi | Age 7, grade 2; shorter texts and explanations, concrete examples, supported writing. |
| Ezra | Age 4, kindergarten; listening by default, pictures, spoken answers, little required typing. |
| Weekly lesson | A published, versioned collection of objectives, ordered daily chunks, and a weekly test for one child. |
| Daily chunk | A teach-first learning sequence whose whole first pass, including its qualifying assessment, targets roughly 15–20 minutes. |
| Session | One visit, which may complete only part of a chunk. |
| Attempt | One independently scored assessment form; retries never overwrite it. |
| Daily mission | A weekday-named Rally Run reviewing taught material from the current and earlier lessons. |
| Open play | Access to the three games after a qualifying chunk pass, with bounded opportunities to earn more tickets. |
| Run score | Arcade performance, including speed, gold, accuracy, and penalties; separate from learning scores and spendable tickets. |

### Requirements

**Learning and curriculum**

- R1. Provide separate child logins, progress, scores, tickets, and prize history, plus a protected parent login at a separate URL.
- R2. Prioritize explaining, applying, connecting, evaluating, and creating while retaining factual knowledge as a supporting objective.
- R3. Publish each child's weekly lesson with explicit measurable objectives, content sources, a chunk sequence, and an assessment blueprint before play begins.
- R4. Cover reading and listening comprehension, vocabulary, spelling, literature, grammar, analogies, metaphor, storytelling, mathematics, science, art appreciation, geography, music, history, Jewish history, and appropriate Torah through a documented curriculum coverage plan.
- R5. Each chunk begins with teaching and examples, then uses 15 scored questions combining choice, matching, and open responses.
- R6. A finalized chunk assessment score of at least 90%, evaluated without display rounding, is required to unlock the next chunk and its associated arcade opportunities.
- R7. After all chunks pass, a weekly assessment must be passed before the next weekly lesson unlocks.
- R8. A failed attempt leads to teaching and fresh equivalent assessment, with every original score preserved and no completion-only bypass.
- R9. Save progress automatically across sessions and retain first attempts, subsequent attempts, assistance, grading revisions, and delayed checks separately.
- R10. Accept supported alternative interpretations and creative solutions against explicit task criteria, without grading a child's taste or resemblance to a model answer.

**Voice and content**

- R11. Support ElevenLabs read-aloud with synchronized word highlighting and typed or spoken responses; enable listening by default for Ezra.
- R12. Offer a visible microphone control and keyboard talk shortcut, followed by a brief pre-feedback correction window that permits one replacement initiation.
- R13. Prepare homework images, Gemara, and other sources through the backend workflow, preserving citations and reviewing uncertain extracted text before publication.

**Games and rewards**

- R14. Ship Snake Trail, Match Studio, and Rally Run, with age-appropriate controls and challenge levels.
- R15. Use Rally Run for every daily mission, displaying the weekday in its title and selecting only content the child has actually been taught.
- R16. Daily missions include gold, obstacles, course timing, paused question gates, question timing, rewards for fast correct answers, and run-score deductions for wrong answers.
- R17. Keep learning grades, arcade scores, spendable tickets, and lifetime earned tickets distinct and visible for their respective purposes.
- R18. Award tickets for qualifying learning and bounded arcade activity, with a one-time arcade power-up reward for a qualifying chunk pass and no replay, retry, or duplicate-request farming.
- R19. Show a family leaderboard based on lifetime tickets earned through lessons, missions, and open play; purchases, refunds, transfers, and administrative grants do not count as new earnings.
- R20. Convert a parent-entered product value into a ticket cost under one explicit exchange policy, supporting $10–$300 items and manually valued experiences.
- R21. Confirmed checkout immediately spends tickets, creates the child's prize-history entry, and notifies the parent without reservation or approval stages.
- R22. Present prize images in playful frames with total cost, progress toward affordability, and the exact number of tickets still needed.
- R23. Calibrate earning and pricing together so an approximately $200 prize takes roughly four to six weeks of meaningful learning when saving all earned tickets.

**Experience and operations**

- R24. Use left vertical navigation on desktop and an accessible compact navigation on mobile, with a dominant next-step action on the dashboard.
- R25. Validate the flow in grayscale before adding saturated tone-on-tone panels, pale matching text and buttons, graph-paper neutrals, rounded charts, dimensional buttons, retro borders, gloss, and brief celebrations.
- R26. Make reduced-motion and sound controls available, avoiding strobing effects and preserving readable values when animation is disabled.
- R27. Host on Vercel with durable account, content, score, progress, and wallet storage; refreshes and deployment restarts cannot erase progress.
- R28. Give parents access to learning evidence, grading review, prize management, and fulfillment through the separate parent area.

### Curriculum proposal

The following defaults need alignment; they are not claims about research-established optimal quantities.

Use five daily chunks and a separate weekly-test session. Each week includes language, mathematics, age-appropriate Torah, and one artist with selected artwork. Rotate deeper science, history, geography, and music investigations across weeks while recording short exposures separately from assessed outcomes. A four-week coverage map makes gaps visible. Do not imply that every named subject receives deep treatment in a single 100-minute week. The duration target covers teaching and all scored items on the first pass; review and reassessment may need another sitting. Validate this with all three children before treating it as a reliable estimate.

| Outcome example | Aharon Zev | Tobi | Ezra |
|---|---|---|---|
| New vocabulary | 8 words; explain meanings and use selected words in unseen contexts | 5 words; explain or use them with shorter sentences | 3 spoken words; choose meaning and use them in speech or picture-supported explanation |
| Comprehension | Support 3 inferences across 2 passages; compare plausible interpretations | Explain 2 character choices with a story detail | Sequence a narrated story and explain one character feeling |
| Writing and literary thinking | Create and explain a metaphor; write a short alternative ending consistent with a character | Build a comparison and a short beginning/middle/end response | Invent and explain a next event orally |
| Art | Identify one artist, discuss two works, explain a visible technique, and justify a creative change | Recognize one artist and describe how color or shape affects a picture | Recognize one artist through a name/picture, identify an artwork, and describe a feeling using a visible detail |
| Math | Baseline-selected skill, including explanation and novel application | Baseline-selected skill with concrete and story problems | Counting, comparison, shapes, or small combining/separating problems matched to readiness |
| Torah | Parent-selected Mishnah passage and practical Shabbos scenarios; Gemara/Tosafos only when assigned | Selected text/story/vocabulary and concrete Shabbos scenarios | Narrated Torah story, values, and simple examples from approved material |
| Rotating investigation | Explain a cause, scientific prediction, geographical relationship, or musical choice using evidence | Make a supported comparison or prediction using a short example | Observe, sort, predict, and explain using pictures and speech |

Quantity targets are evidence targets, not automatic declarations of mastery. At least 60% of proposed assessment points should involve application, analysis, connections, or creation; the remainder can check retrieval and prerequisite knowledge. Multiple-choice and matching questions can assess reasoning, so this does not require long written responses to every item.

Each chunk follows: recall warm-up, explicit teaching, worked example, brief guided practice, optional short game interlude, scored assessment, result, and review when needed. Individual questions can combine naturally related objectives, but do not add subjects solely to maintain a story theme.

Voice scripts should be original, lively, mischievous, and funny: surprising images, absurd examples, direct address, and jokes about the situation. Never imitate a named living writer or clone a narrator's voice. Humor must not obscure the instruction or ridicule mistakes. Read-aloud is an accommodation for most subject tasks; an independent-reading objective explicitly distinguishes listening from reading.

### Scoring proposal

To implement R5–R10, normalize each item to four possible points: 60 points for a complete chunk; 54 points meet R6. MC items receive 0 or 4. Matching receives declared partial credit for relationships. Open responses use four task-specific criteria or equivalent anchored levels from 0–4. Criteria must be visible in child-friendly form and fixed before an answer is submitted.

An interpretation could earn points for a relevant idea, relevant evidence, an explained connection, and meeting the question's constraint. A creative answer receives credit for the requested technique, coherent intent, an appropriate example, and explaining a choice. Spelling is scored only when it is the target. Grammar likewise must not silently lower an art or history score.

Binary-only example: 13/15 correct gives 52/60 and fails; 14/15 gives 56/60 and passes. Mixed credit can achieve exactly 54/60. Do not average attempts or assemble the best item scores across attempts into a passing result.

After a failure, show targeted teaching and practice before a fresh, balanced 15-item assessment using the same objectives and difficulty. This is the proposed reassessment default, not permission to keep repeating a revealed answer. A scored form reveals its correctness feedback after the form is submitted; assisted practice remains separate. Persistent difficulty prompts parent support while the next chunk stays locked. Invalid items and incorrect AI grading receive reviewed corrections; that corrects the evidence, not the threshold.

Propose the same 90% rule for the weekly test, using 15 fresh balanced questions. After Week 1, include a small allocation to earlier objectives, with their results reported separately. Later delayed probes and unfamiliar applications are necessary evidence beyond an immediate weekly pass. A narrow sample must show counts, not a sweeping claim of permanent mastery.

### Progression and daily access proposal

Under R6–R9, a pass is permanent and opens the next prerequisite immediately. Proposed pacing releases no more than one new scheduled chunk per learning day; a missed day carries unfinished work forward rather than skipping it. The user can instead choose unrestricted advancement once a chunk passes; this is Q1 below.

Proposed daily extras require the current assigned chunk's pass. Recheck the local learning day and eligibility at every new rewarded run; an already-active run may finish under its original earning day and cap. Keeping a tab open overnight cannot reuse yesterday's pass for a newly due chunk. Previously passed lesson records remain available, but bonus entry clearly states which current chunk is required. Rest days have no compulsory chunk and no streak penalty. Rest-day arcade ticket policy is part of Q3. The proposed pass reward is one consumable shield charge usable in Snake or Rally Run, awarded once per chunk; it never changes a learning grade.

### Three games and one daily review

| Game | Core rules | Educational use |
|---|---|---|
| Snake Trail | Steer on a grid, collect fruit, avoid walls/tail; shields and slow motion; pause at checkpoints | Review questions earn gameplay advantages; a collision does not erase learning tickets |
| Match Studio | Select matching or related cards; explain the relationship when required | Ezra: image/meaning; Tobi: word/context; Aharon: analogy, cause/effect, evidence/claim, technique/effect |
| Rally Run | Automatic forward motion, left/right steering, gold pickups, obstacles, short course, question gates | The daily mission uses this game exclusively; ordinary open play can also use it |

Daily titles follow the household's actual local weekday: Sunday Rally, Monday Rally, Tuesday Rally, Wednesday Rally, Thursday Rally, Friday Rally. Subtitles describe the review mix. Calendar identity does not select untaught content. A child behind the planned schedule receives review from their own completed teaching history.

Proposed run scoring: gold +10, collision -20, correct answer +100, incorrect/timeout -25, and up to +50 for a fast correct eligible answer. Floor the final run score at zero. These are arcade points, not tickets. Question timing starts after initial prompt narration and response readiness. Thinking and speaking count; transcription, playback, and grading delays do not. The single correction initiation uses the remaining question time, so it cannot manufacture a better speed bonus.

For V1 daily missions, prefer short, objectively checkable recall and application tasks. Longer interpretation and creative work belong in lessons and Match Studio, where a racing timer is inappropriate. Timers and bonuses must be adjustable to each child's readiness. Track best run score, accuracy, and active course time separately.

### Voice answer states

To implement R11–R12: ready, listening, finishing transcript, review, optional replacement, locked, grading, feedback. Microphone permission is requested when first used; denial preserves typing. Talk shortcuts are inactive while typing and never trigger browser controls. Stop narration before recording.

The proposed correction window is five seconds to initiate one replacement, starting only after a complete transcript is available. For Ezra, finish a short transcript readback before starting the window. Starting a replacement cancels the window and allows the sentence to finish; it does not give unlimited replacement starts. Do not request grading before the final answer locks. Qualifying assessments withhold correctness feedback until the whole form is submitted; practice and mission questions may reveal it after the individual answer locks. Preserve the original transcript and final submitted version as different events.

Empty audio, network loss, and transcription failures offer retry without consuming an academic attempt. Pauses and filler words do not submit an answer. In mission mode, a replacement cannot reset the answer clock; technical delays are excluded, while child-controlled response time remains included. The behavior at the answer deadline is specified in the technical spec.

### Dashboard and prize experience

Desktop navigation: Dashboard, This week's lesson, Daily mission, Open play, Prize shelf, Scores & family. Parent access is absent from this menu. Mobile uses compact navigation with the same destinations.

The dashboard displays one dominant action: Start teaching, Continue, Review and recheck, or Start weekly test. Below it, show the week sequence and visibly locked or unlocked bonus activities. A compact ticket graphic shows spending balance. Avoid competing primary buttons before the daily requirement is fulfilled.

Under R19–R23, lifetime earnings and spendable balance have different labels. Products use an eventual configurable dollar-to-ticket rate; experiences receive a parent-assigned equivalent value or ticket price. Show checkout cost and remaining balance before confirmation. Successful purchase immediately creates a confirmed order; fulfillment is later. A cancellation produces a linked refund, not an erased purchase. Notification failure cannot undo or repeat a charge.

Do not fix ticket earning amounts or launch a real store until Q4 is resolved. Rank fairness requires comparable earning opportunities at each child's level. Daily missions and open play cannot let a faster player bypass the intended weeks-to-prize pace.

### Acceptance examples

| ID | Covers | Expected behavior |
|---|---|---|
| AE1 | R5–R8 | A 52/60 attempt remains saved and does not unlock the next chunk. A fresh 54/60 attempt does unlock it. |
| AE2 | R8–R10 | A thoughtful alternative ending that meets the rubric earns full credit even if it differs from the sample answer. |
| AE3 | R9, R27 | Closing during question 7 restores the published question and saved draft; earned tickets are not awarded twice. |
| AE4 | R11–R12 | Ezra hears the prompt with highlighting; a speech correction initiated in time precedes all correctness feedback. |
| AE5 | R15–R16 | A Wednesday mission for a child still on Chunk 2 never draws from untaught Chunk 4. |
| AE6 | R17–R19 | An incorrect race answer reduces the run score; it does not subtract existing wallet tickets or curriculum points. |
| AE7 | R20–R21 | Repeated checkout taps create one confirmed order and one ticket debit; a notification retry creates no new debit. |
| AE8 | R19, R21 | Buying a prize reduces available balance but leaves the family lifetime-earned ranking unchanged. |
| AE9 | R6–R9 | Midnight, a calendar week change, or finishing every screen cannot pass a failed assessment. |
| AE10 | R24–R26 | The child can identify and activate the next required step without visiting the arcade; reduced motion preserves all feedback and scores. |

### Scope boundaries

Included: the three child profiles, weekly lessons and scored chunks, voice, three games, one daily racing mission, family leaderboard, prize checkout/history, backend-prepared content, and separate parent management.

Deferred: self-service homework upload UI, public accounts, social multiplayer, purchases from Amazon through the app, complex 3D worlds, elaborate physics, user-generated games, and an open-ended AI companion detached from the curriculum. Provisioning services and deploying production are not completed by this design work.

### Outstanding questions

| ID | Classification | Recommended default and decision |
|---|---|---|
| Q1 | Partially resolved | User approved five chunks plus a separate test day on October 7. The pilot uses 90% on the weekly test and immediate prerequisite-based access. Calendar pacing remains a production decision. |
| Q2 | Resolve Before Planning | Four points per item; full fresh equivalent assessment after targeted review. Confirm this retry burden alongside the 15–20-minute target. |
| Q3 | Resolve Before Planning | Current assigned chunk pass opens today's mission and ticket-earning open play. Decide access and earning on rest days. |
| Q4 | Deferred to Planning; required before real rewards | Dollar-to-ticket rate, learning/mission/open-play caps, streak rewards, and household prize budget. Validate R23 with a simulation before activation. |
| Q5 | Deferred to Planning | Pilot exact timers, narration pace, weekly word counts, subject depth, and voice handling on the family's actual devices and voices. |
| Q6 | Deferred to Planning | Select the initial AI generation/grading model through a small source-grounded question and rubric evaluation; choose the parent notification destination. |

### Sources and supporting design

- [Technical spec](../technical-spec.md).
- [Curriculum research and examples](../../research/curriculum-proposal.md).
- [Progression and game review](../../research/progression-game-review.md).
- [Platform and library research](../../research/platform-library-research.md).
- [Spaced retrieval study](https://pubmed.ncbi.nlm.nih.gov/21574747/). Supports spaced checks, not this product's numeric mastery rule.
- [Retrieval and transfer study](https://pubmed.ncbi.nlm.nih.gov/20053059/). Supports checking application rather than assuming transfer from repeated items.

All quantities, timers, and scoring formulas labeled as proposals require product validation. The grayscale wireframe uses fictional scores and prices; it does not grade children or exercise real services.
