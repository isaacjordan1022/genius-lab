# Progression, scoring, and game review

This proposal implements the user's 90% gate, three confirmed minigames, taught-material restriction, permanent score history, lifetime-ticket leaderboard, and immediate store checkout. Items explicitly marked **Decision** remain open. Numerical arcade formulas are proposed defaults, not approved ticket prices or claims about learning effectiveness.

## Learning progression

A weekly lesson contains an ordered sequence of daily chunks, a cumulative weekly test, and a defined set of learning objectives. Each daily chunk targets approximately 15–20 minutes, teaches its concepts first, and assesses them with 15 questions. Time is a planning estimate, never a pass requirement.

Chunk states are `locked → available → teaching → assessment → passed` or `needs_practice`. Only a validated score of at least 90% creates a pass. Attempting every question, spending enough time, or reaching midnight cannot create one. Passing unlocks the next chunk's prerequisite, free play, and the associated powerup entitlement. The final chunk unlocks the weekly test; passing that test unlocks the next lesson. Weekly boundaries do not advance children who have not passed.

**Decision 1 — cadence and test gate:** approve the number of daily chunks, whether a child may immediately start the next unlocked chunk or waits until its scheduled day, and a proposed 90% weekly-test threshold. Preserve prerequisite and schedule eligibility as separate conditions so either cadence works without bypassing mastery.

## Exact scoring and saved evidence

Every chunk assessment has 15 equally weighted questions. Each question earns a rubric fraction from 0 to 1. The score is `100 × sum(question_credit) ÷ 15`; compare the unrounded value with 90. Do not round 89.6% into a pass.

For entirely binary questions, passing requires 14 of 15 correct: 13/15 is 86.67%, while 14/15 is 93.33%. Mixed rubrics can reach exactly 90% with 13 full-credit answers, one half-credit answer, and one zero-credit answer. Recommended constructed-response credit levels are 0, 0.25, 0.5, 0.75, and 1, defined by an answer-specific rubric before the child responds. Partial credit represents demonstrated knowledge, not effort or verbosity.

Save every attempt, including failures and abandoned attempts: question and curriculum versions, rubric, submitted answer, awarded credit, feedback, assistance used, timestamps, scoring method/version, and final disposition. Save summaries for each game run too. An interrupted attempt is incomplete, not an invented zero-percent score. A grading correction appends a revision with a reason; it does not erase the original result.

Use deterministic scoring for arithmetic and objective answers. AI grades constructed responses against the saved rubric. Ambiguous grading enters a pending-review state instead of silently blocking or advancing the child. Parent adjustments remain visible in the audit trail.

## Remediation without manufactured mastery

A failure triggers targeted explanation and practice for the missed objectives. Worked solutions and hints are available here. The next qualifying assessment uses fresh, equivalent questions covering the same blueprint; repeatedly memorizing one corrected answer must not become a pass.

Assisted practice is recorded separately and cannot overwrite the failed assessment. Neither “best answer per question across attempts” nor averaging retries qualifies the child. One complete qualifying attempt must independently meet the threshold. If an assessment item is defective, invalidate it transparently and issue a replacement; do not quietly delete its weight. Retry frequency and question-bank breadth should prevent repeated small banks becoming answer memorization.

## Durable unlocks and daily earning limits

Passing a chunk creates a durable unlock: yesterday's progress does not disappear at midnight. Today's reward allowance is a separate ledger rule. Resetting that allowance cannot unlock an unpassed chunk, admit untaught material into games, or manufacture a new lesson pass.

**Decision 2 — daily access:** does a new day's free play require passing that day's chunk, even after earlier durable unlocks, or does any prior qualifying pass keep free play available? Recommended: game ownership remains permanent, but ticket-earning play requires the current scheduled chunk's pass; already unlocked practice can remain available without tickets. Surface this distinction clearly rather than showing a mysterious relock.

Use the household timezone for daily boundaries. Exclude Shabbat and configured holidays from required-day streaks. Powerups affect arcade play only; they cannot reveal assessment answers, lower the 90% threshold, or multiply real prize earnings.

## Three games; one racing mission

**Snake:** direction controls, fruit collection, forgiving early speed, paused question checkpoints, shields and slow motion. **Match Studio:** tap pairs, followed where appropriate by a question testing meaning. **Rally Run:** automatic acceleration, left/right steering, simple collisions, gold pickups, question checkpoints, boosts, and shields. A lightweight angled track can provide depth without requiring complex 3D physics.

The daily mission is always a Rally Run variant. Give it a weekday title and one explicit objective, such as “Monday Evidence Rally” or “Tuesday Fraction Circuit.” Change checkpoint content and a simple track rule, not the underlying game. Only current or previous material whose teaching step the child actually completed is eligible. Grade-level plausibility alone does not establish that a concept was taught. Check eligibility again when generating each run.

## Proposed Rally Run scoring and clocks

Use a 90-second **driving clock**, with question checkpoints after 20, 40, and 60 seconds of active driving. Freeze the entire simulation, hazards, and driving clock during questions, feedback, loading, and question audio. Resume after a visible countdown.

Proposed score: gold pickup `+10`; obstacle hit `−20`; correct checkpoint `+100`; wrong or timed-out checkpoint `−25`. Each object can score once, and collisions have a short cooldown. Keep the signed event total internally; display final run score as `max(0, total)`. A wrong-answer demerit reduces the run score only, never previously earned wallet tickets.

For a speed-eligible checkpoint, add `floor(50 × remaining_seconds ÷ allowed_seconds)` for a correct response. Incorrect responses get no time bonus. Use exact-answer questions for timed racing checkpoints; reserve nuanced AI rubrics for lessons. Run score and tickets must remain separate until conversion and caps are approved.

**Decision 3 — speed policy:** recommended initial limits are 20 seconds for established recall/fluency and 60 seconds for short reasoning, adjustable by child. Award speed bonuses only for explicitly designated fluency objectives; interpretation earns correctness points without a speed bonus. These timers need child testing before adoption.

## Audio and speech timing

The question clock begins only when the complete prompt is visible, initial spoken playback is finished, and response controls are ready. For speech, measure local thinking and recording time; freeze while transcription is in transit. Show the transcript for correction before submission, resuming the clock while the child reviews or edits. Freeze again at submission, before server transport or grading. Loading, microphone initialization, transcription latency, and grading latency never consume response time.

A transcription or connection failure produces a recoverable technical interruption, not an incorrect-answer penalty. Store the confirmed transcript as the answer. Preserve timing events so the displayed bonus is explainable.

## Economy and checkout

**Decision 4 — tickets:** approve dollar-to-ticket pricing, category caps, and how run scores earn tickets. The intended $200 prize should require approximately five to six weeks of attainable learning earnings, while products span $10–$300 and include experiences. Do not claim a weeks-to-prize estimate until those numbers agree. Repeated practice remains available after daily earning caps; retries and duplicated requests cannot mint additional awards.

The family leaderboard uses **lifetime tickets earned**, never current wallet balance. Purchases reduce spending balance without lowering achievement rank. Refunds restore balance but are not new lifetime earnings.

Checkout displays item, cost, and remaining balance, then the child confirms. One atomic transaction checks funds and availability, deducts tickets, and records the purchase. Notify the parent and add it to prize history; there is no reservation state. If notification delivery fails, retry notification without repeating the charge. Parents mark prizes fulfilled or canceled; cancellation issues a linked refund. A unique checkout identifier prevents double spending from repeated taps.
