---
artifact_contract: "ce-handoff/v1"
created_at: "2026-10-13T22:42:10Z"
title: "Genius Lab — project synopsis and agent handoff"
summary: "The deployed family learning pilot, settled product and visual decisions, implementation map, verification evidence, and remaining work."
keywords: ["Genius Lab", "learning", "curriculum", "Neon", "Vercel", "ElevenLabs", "handoff"]
cwd: "/Users/isaacrudansky/Claude Projects/genius-lab"
repository: "genius-lab"
branch: "feat/first-playable"
head: "2fb899a"
resume_focus: "Orient to the existing pilot and preserve learning records before continuing development."
---

# Genius Lab: start here

Snapshot: **October 13, 2026**. This is a working, deployed two-child pilot, not the completed long-term product. Isaac requested this synopsis so other agents can take over without the original chat.

**Canonical local project:** `/Users/isaacrudansky/Claude Projects/genius-lab` (machine-local). Run app commands directly here; there is no additional `learning-arcade` subdirectory.

**Live app:** https://genius-lab-beta.vercel.app — sign-in at `/login`. Last recorded production deployment is the selected blue logo on October 7. Production learner activity since that dry run has **not** been inspected for this handoff. Never assume the children still have zero progress.

## Read these references first

| Reference | What matters |
|---|---|
| `AGENTS.md` | Repository conventions; read relevant bundled Next.js documentation before framework changes. |
| `PRODUCT.md` | Isaac's accumulated product decisions. It is chronological and contains superseded prototype statements; the latest dated decision and current direct user instructions take precedence. |
| `docs/TONIGHT.md` | October 7 launch scope and actual service verification. “Tonight” is historical, not today's task. |
| `docs/tonight-curriculum-2026-10-07.md` | Exact child-specific teaching, outcomes, source checks and publication limits. |
| `docs/curriculum-v3.md` and `src/lib/lesson-content-v3.ts` | Current Aharon publication; earlier v1/v2 material stays available for historical records. |
| `design/style-guide.md` | Typography, colors, spacing, surfaces and interaction direction. |
| `design/logo-renders-v1.md` | Generated logo provenance and prompts. The blue option is the chosen wordmark. |
| `docs/initial-planning/` and `research/` | Original specification, plan and research, moved from the old project wrapper. Historical proposals, not authority over later feedback. |

Older README, build-plan and research copy may still describe a local grayscale pilot, missing AI, alternative branding or an earlier rewards policy. Those descriptions are not the deployed state.

## Product purpose and audience

Isaac is building extra-credit education for his three children. **Actual learning, analytical reasoning and creative thinking are the primary outcomes.** Trivia, tickets, streaks and arcade play support that purpose. Learners should encounter new knowledge every session and show understanding through evidence, explanation, application and later retention checks.

| Child | Starting profile supplied by Isaac | Implemented publication |
|---|---|---|
| Aharon Zev | Age 10, grade 5; enjoys baseball, sports gear and memorabilia | Account username `AharonZev`; five daily lessons, independent weekly assessment, separate bridge exploration. |
| Tobi | Age 7, grade 2; enjoys dolls, art, bracelets, squishies, toys and electronics | Account username `Tobi`; one complete daily lesson. Remaining days and weekly assessment are unpublished. |
| Ezra | Age 4, kindergarten | Requirements only; no implemented child account/curriculum. Listening should be default when built. |

Passwords are intentionally omitted. Existing credentials are hashed in Neon. Do not reseed/reset them casually. Courier Quest was an old, overcomplicated project: Isaac explicitly wanted a clean new product, not an architectural continuation. It is only an optional asset reference.

## Settled learning experience

- Names: **weekly plan → daily lesson → chunks**. A target week has five daily lessons plus a test day. Each daily lesson mixes roughly 2–4 subject chunks and targets 15–20 minutes; actual child timing still needs observation.
- The weekly page is the command center for progress and chunk scores. Avoid an extra lesson-summary interstitial. Short labels: Enter, Begin, Continue. Avoid dense objective paragraphs in the child's overview; use topic badges.
- Teach first, then quiz that chunk, then teach the next chunk. Current daily lessons have 15 questions, usually three groups of five. Questions include choices, connector matching, and open typed/spoken reasoning. Do not call every question an “activity.”
- Teaching needs substantial, lively reading passages; vocabulary in context; worked math examples and visuals; distinct cards for different content. Humor should be original and age-appropriate.
- Once a chunk quiz begins, teaching is locked for that quiz until submission. No persistent material/quiz toggle. Quit saves; Restart clears only the unsubmitted quiz and retains the abandoned draft. Submitted answers and grades stay immutable.
- A final daily score of at least 90% unlocks the next daily lesson and earned play. In the current implementation, submitted chunks may proceed to subsequent teaching before the whole-day mastery decision; do not infer that every chunk is independently gated at 90%.
- Initial launch starts at **Day 1**, independent of actual weekday. `src/lib/week-plan.ts` still has the fixed publication key `2026-10-04`; it is not an automatic scheduler. Changing that value blindly can affect bonus grouping and historical state.
- Bonus questions can introduce a new idea, then ask for application. Save the encountered question and explanation for a separate weekly extra-credit review. Core quiz questions cannot require facts first introduced by a bonus.
- Errors receive an explanation, not just a mark. AI grading accepts valid paraphrases and creative alternatives, considers the child's age, ignores filler/transcription mistakes unless those are the skill tested, and leaves work pending if the provider fails.

Desired weekly subjects: comprehension, vocabulary, spelling, grammar, literature, analogies/metaphors, writing and storytelling; math; science/physics; art and music; geography, history and Jewish history; age-appropriate Torah, Mishnah, Gemara and halacha. **How things work** belongs in every child's week, using parts, diagrams, causes and consequences. Coverage is a curriculum goal, not proof all subjects are fully implemented. Religious material requires source verification and Isaac's selected material. Homework-image intake can remain a backend/agent process; no upload UI is required yet.

## Current curriculum and AI

**Aharon Day 1:** “The windmill that refused to work,” with sustained reading, observations versus inferences, evidence, changing one experimental factor, visual equivalent fractions, and Monet/Impressionism/light. The broader week includes writing, science comparisons, source/map reasoning and Avot 1:6. The separate bridge discovery is not included in the weekly assessment. Actual sourced artwork presentation remains incomplete; do not describe invented studies as famous originals.

**Tobi Day 1:** “The giant rabbit mystery,” an original five-paragraph story; puzzled/discover/distance/timid; a controllable shadow diagram and a one-change experiment; a Mondrian-inspired study, visual rhythm, equal halves and quarters. Fifteen mixed questions, two retry forms. Choice positions vary. Original study is clearly labeled as inspired by Mondrian. Her authored bonus seeds include simile, fable and visual rhythm.

Lesson texts and the main question banks are presently authored TypeScript content. **AI grades open responses and generates contextual bonus questions. It does not automatically publish an entire new weekly curriculum.** Two fixed retry forms currently limit repeated failed daily attempts; further fresh-form generation remains work to consider.

OpenAI Responses API integration uses `OPENAI_MODEL`, default `gpt-5.4-mini` in the current code. Age and grade are supplied per child. Strict structured outputs are validated; model text is not trusted as application instructions.

ElevenLabs narration uses timestamp alignment to highlight words **inside the existing material**, not a duplicate transcript. Default TTS model is `eleven_multilingual_v2`; transcription defaults to `scribe_v2`. Listen and Speak share a row. Microphone input has an Alt+Space shortcut and a bounded pre-submission re-record opportunity. This is request-based narration/transcription, not an uninterrupted realtime conversational voice agent. Browser microphone permission and real child speech, Hebrew/Aramaic and disfluencies need device testing.

## Rewards, games and Prize Room

There are three separate quantities: learning rubric score (0–4), arcade run score, and spendable tickets. Keep the wallet visible throughout the app.

Authenticated accounts earn **5 tickets per fully correct answer after its quiz is submitted and grading is final**. Equivalent question positions pay once across retries. A daily mastery pass tops that day's core earnings up to 100; a fully correct bonus pays 5 separately. The legacy SQLite pilot still has an older 30-per-passed-chunk rule: do not combine policies. Inspect `store.ts` before changing weekly assessment payouts, since those have a larger question count. The 15-tickets-per-dollar catalog conversion is provisional, targeting roughly 4–6 weeks for a $200 prize, and needs calibration with actual earnings.

Games: Snake Trail, Match Studio and Rally Run. Daily Mission is now a lightweight **real Three.js 3D car course**: chase view, three lanes, gold, obstacles, finish gate and question checkpoints; fullscreen-style play area with the dashboard sidebar hidden. The first course is about 30 driving seconds plus checkpoint answers. Pause on hidden tabs/manual pause/questions. Real review questions come only from submitted, graded work and exclude passage-dependent prompts. Preview playground is available for testing with no saved rewards or scores. Current arcade runs award practice scores, not wallet tickets; advanced power-ups, streak economy and deeper game progression are not complete.

**Prize Room**, never “prize shelf” or a parent picker: approximately 106 physical catalog entries plus three golden-ticket experiences (Smashhouse dinner, day adventure, just-us lunch). Product shots, ticket costs, progress bars and prize history are present. No console game software; hardware and standalone electronics are allowed. Prize checkout immediately deducts tickets and records an order and an internal parent-notification record. It does **not** buy from a retailer or send a verified external email/push notification. Isaac manages catalog/fulfilment through agents; a large parent dashboard is not requested.

## Brand and interface decisions

Isaac selected **Genius Lab** and then specifically selected the **sky-blue/cobalt 3D PNG**:

`public/brand/options/genius-lab-sky-cobalt-v1.png` (2172 × 724, transparent alpha).

`src/components/genius-logo.tsx` uses that exact image through Next Image on login, desktop navigation, loading and brand lab. The small GL icon still uses the earlier SVG and is not yet a new blue raster icon. Mint/plum and gold PNGs are archived options. The wordmark's letterforms are DynaPuff-inspired image generation, not exact font outlines.

Interface fonts remain **DynaPuff headings at weight 400/500 and Lexend for reading/UI**. Isaac requested no text smaller than 18px. Saturated tone-on-tone color pairings, pale corresponding text/buttons, rounded shapes, button depth, restrained gloss/confetti and readable hover states. Background is very light cream/gray-green with faint mixed pencils/books/music/tickets/shapes/stars, not graph paper or stars alone. Tick is the friendly ticket-printing robot; Orbit/Scrib are only possible customization concepts. The dashboard ticket shows the child's name above the total and “You're a Tzadik!” in the stamp. Ticket shine/count-up should celebrate real rewards, with reduced-motion support.

## Architecture and implementation map

Next.js 16.4 App Router, React 19.3, TypeScript 7, Node 24.x target, `pg`, Three.js, Phaser, Motion, canvas-confetti and lucide-react. Check installed package versions and bundled `node_modules/next/dist/docs/` rather than assuming old framework APIs.

| Area | Main files |
|---|---|
| App shell, navigation, weekly plan and accounts UI | `src/components/learning-app.tsx`, `login-form.tsx` |
| Teaching/quiz/review, autosave and leave guard | `lesson-player.tsx`, `teaching-cards.tsx`, `connector-match.tsx`, `fraction-workshop.tsx`, `discovery-diagram.tsx` |
| Canonical state, attempts, grading orchestration, tickets, orders, bonuses | `src/lib/store.ts`, `rules.ts`, `content-types.ts`, `bonus-types.ts` |
| Per-child publication and bonus seeds | `src/lib/child-curriculum.ts`, `lesson-content-v3.ts`, `tobi-curriculum.ts`, `how-things-work.ts` |
| Auth and persistent storage | `src/lib/account-database.ts`, `auth.ts`, `passwords.ts`, `request-store.ts` |
| Provider integrations | `src/lib/learning-ai.ts`, `voice.ts`, `voice-alignment.ts`; `read-along.tsx`, `speak-answer.tsx` |
| API routes | `src/app/api/auth/`, `api/state/`, `api/action/`, `api/voice/` |
| Games | `src/components/games.tsx`, `mission-track-3d.tsx`; `src/lib/mission-review.ts` |
| Prizes | `src/lib/prize-room.ts`, `public/prizes/catalog.json`, `src/components/prize-room.tsx`; `docs/prize-catalog.md` for provenance |
| Visual rules and labs | `src/components/app-skin.css`, `style-lab.*`, `brand-lab.*`, `avatar-lab.*`, `ticket-display.*`, `ticket-wallet.*` |

Neon Postgres tables: `genius_children`, `genius_progress`, `genius_sessions`, `genius_login_limits`. Passwords use salted scrypt; random session tokens are stored as hashes, with HttpOnly cookies and persistent login throttling. Each child has a JSONB progress document. Requests select that child's row `FOR UPDATE`, apply store actions, then persist. AI work currently happens while that transaction is open; this is a concurrency/latency consideration for future scale. This is a single-family pilot, not a multi-tenant product; sibling totals are selected from the family database.

When `DATABASE_URL` is absent in local development, legacy SQLite fallback is used. Vercel fails closed rather than using filesystem storage. Existing `data/` contains old local pilot records and must be preserved. Local `.env.production.local` contains Neon settings; `.env.local` contains provider configuration. With the current environment files, local production mode can reach the **same Neon database as the live app**. It is not automatically a disposable sandbox.

## Deployment, secrets and local operations

- Vercel project: `genius-lab`, scope `isaac-9021s-projects`; linked by `.vercel/project.json`.
- Production alias: `https://genius-lab-beta.vercel.app`. Last recorded deployment: `dpl_BCaxAZFjBydr7N1zjoQAMwiVwXUi` (blue logo, October 7).
- Neon was provisioned through the existing Vercel integration as `genius-lab-db`. Region configuration is `iad1` for the application functions.
- Required server-only settings: `DATABASE_URL`, `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`. Optional model overrides are in `.env.example` and provider source. Keep all secrets out of browser bundles, screenshots, handoffs and Git.
- `.env.local`, `.env.production.local`, `.vercel/`, `data/`, `test-results/`, dependencies and build output are ignored by Git and were preserved during the move. Environment files have private permissions. Do not print their contents.
- `scripts/seed-children.ts` is an idempotent account setup script. Its explicit password-reset mode is not routine setup. It is not necessary to run it on an existing installation.

Typical commands from this project root:

```sh
npm run dev       # local preview on 127.0.0.1:3100
npm run typecheck
npm test
npm run build
npm start         # serves the built app on 127.0.0.1:3100
```

`vercel --prod --yes` deploys to the linked live project and is a separate intentional action, not a verification command. No deployment is required just because the local project folder moved. A rebuild is prudent if an old cached Next build has absolute path references. The compatibility symlink preserves the old app path.

## Verification: what is known, and what is not

On October 7, 61 automated tests passed, as did typechecking and the production build. Live smoke checks authenticated both children, completed each full 15-question Day 1 through actual AI grading, verified 100 core tickets plus a 5-ticket bonus, prevented duplicate rewards, reloaded saved answers, checked isolation and revoked sessions on logout. ElevenLabs returned timestamp-aligned audio and correctly transcribed synthetic speech. Evidence: ignored `test-results/live-smoke-result.json`, launch notes in `docs/TONIGHT.md`, screenshots in `docs/screenshots/`.

Those tests restored only newly created test progress at the time. **That reset was a one-time pre-launch operation, not permission to reset present learner records.** Actual subsequent play, long-term retention, physical microphone quality and every device/browser combination are unverified here. The old `test-results/live-smoke.ts` assumes pristine accounts and contains test cleanup; do not run it against children's current progress as a routine health check.

The blue logo build/deploy and live image were verified separately. No production data was changed for this relocation. The relocation verification is recorded in `test-results/relocation-verification.json` locally; automated test results from the moved path are recorded alongside it.

## Remaining work and likely next steps

These are a handoff assessment, not authorization to start all of them:

1. Gather real play feedback: timing, frustration, unjust AI grading, save behavior and actual voice/microphone use. Protect real records during every test.
2. Finish Tobi's remaining four days and independent weekly assessment with genuinely new concepts and appropriate mixed questions. Build Ezra's listening-first experience separately.
3. Add recurring, versioned weekly publication and curriculum/source review. Current content is a fixed publication, not automatic weekly generation. Extend fresh retries without rewriting completed history.
4. Strengthen learning evidence: baseline, first-attempt mastery, delayed recall and transfer. Scores alone do not prove durable learning; listening-supported comprehension is not independent reading decoding.
5. Add actual sourced artworks; expand verified Jewish learning/homework sources and broad weekly coverage without forcing every topic into every chunk.
6. Refine game controls, checkpoints, question variety, accessible alternatives and mobile performance. Power-ups/streaks/boosters are largely future work. Calibrate ticket earnings against prize goals, including bonus and weekly-test earnings.
7. Operational hardening: independent QA data/environment, account recovery, backups and schema migrations, grading retries outside long database locks, monitoring/provider budgets, external fulfilment notifications if wanted. Some setup/parent routes remain local-only artifacts, not a production parent console.
8. Consolidate contradictory historical docs and arrange durable version control. Current latest work is largely uncommitted; no remote is configured. Preserve it before any branch reset, cleanup or checkout.

## Repository and relocation continuity

At capture, branch `feat/first-playable`, HEAD `2fb899a` (“feat: add the first learning arcade pilot and interactive design workshop”). Most subsequent production features/assets/docs are modified or untracked, not in that commit. The entire `.git` directory and working tree moved together; no commit, stash or reset was performed.

Old machine-local app path:
`/Users/isaacrudansky/.codex/.chatgpt-projects/g-p-6ac6432db0a0819197cb1ccc121632ac/learning-arcade`

That path is now a compatibility symlink to the canonical project. Original wrapper `docs/` moved to `docs/initial-planning/`; wrapper `research/` moved to `research/`. The ChatGPT mirror's read-only `sources/` and its own `AGENTS.md` remain in place and are not part of the relocated app. Historic documents may name old paths; use the new root for future work.

This synopsis contains no credentials. It is a permanent local file, not a cloud-shared document; an agent on another machine needs access to this project or a deliberately shared copy.
