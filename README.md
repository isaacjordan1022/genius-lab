# Learning Club — first playable

A new family learning arcade, built first around **Aharon Zev (10, grade 5)**. The working product is a grayscale process prototype. The separate design lab explores the final color, typography, ticket graphics, and SVG companions.

## Open it locally

Requires Node 22.13+ (tested with Node 25.9) and npm.

```sh
npm install
npm run dev
```

- App: http://127.0.0.1:3100
- Design workshop: http://127.0.0.1:3100/style-lab
- Parent review: http://127.0.0.1:3100/parent
- Local pilot parent PIN: **2468**. Override with `DEMO_PARENT_PIN` in `.env.local`.

The PIN is a local development convenience, not a production account system. The server binds to loopback and rejects external hosts/origins. Entering the child app clears the browser's parent session. No public deployment or external services have been configured.

## What works now

- Teaching-first sample week: five chunks and a cumulative test, each with 15 scored questions and two fresh forms. 180 questions total. Original reading passages and fiction prompts, vocabulary, grammar, fractions, scientific reasoning, Monet/art observation, geography, historical evidence, and Avot.
- Saved partial answers, resume, immutable submitted attempts, deterministic objective grading, and four-criterion parent scoring for open responses.
- A completed score of at least **54/60 (90%)** unlocks the next chunk. An incomplete/pending rubric score cannot pass. Passing once earns 100 **sample** tickets.
- A simple arcade unlock after the first pass: playable Snake Trail, conceptual Match Studio, and three-lane Rally Run with timed sample review checkpoints. Run scores save separately; these prototypes do not award prize tickets.
- The Prize Room with researched product photos, golden experience tickets, affordability meters, confirmation, atomic ticket deduction, order history, and a local parent notification inbox. Lifetime earnings do not fall when tickets are spent. Duplicate checkout cannot spend twice.
- Six real locally hosted font pairings, five palettes, three style directions, headline outline/fill controls, ticket/prize specimens, and three original SVG companions with blink/thumbs-up reactions. Font licenses included. No paid fonts purchased.

## The MVP we are building toward

Use one child to prove the full learning loop before generating separate grade-2 and kindergarten paths. The full usable MVP still needs:

1. Family accounts and child profiles, Supabase/Postgres persistence, and production parent authentication, hosted through Vercel.
2. ElevenLabs read-aloud with synchronized highlighting; microphone answers, keyboard talk control, editable transcript and the short pre-verdict replacement window. No browser speech simulation is presented as ElevenLabs.
3. AI-assisted weekly planning and rubric grading with source constraints, versioned rubrics, confidence handling, and parent review for uncertainty.
4. Reliable per-objective baseline, first-attempt, retry, weekly and delayed-retention reporting. The current score history is useful process evidence, not proof of educational effectiveness.
5. Daily arcade eligibility, questions drawn from actually taught material, power-ups, and a capped ticket economy calibrated so a $200 prize takes about 4–6 meaningful weeks. Sample prices are not dollar conversions.
6. Real prize setup and fulfillment, external parent notifications, artwork display and selected family Torah sources. No homework upload UI is needed initially.

The current sample week assumes Sunday–Thursday chunks and Friday test; calendar pacing is not enforced. In this pilot you can advance immediately after a pass. All subject coverage, item difficulty, lesson length (target 15–20 minutes), and parallel-form equivalence need a child playtest. Two retry forms are supplied; after both are used, more content must be authored. Tobi/Ezra are placeholders on the family leaderboard, not functional logins.

## Persistence and safety boundaries

`src/lib/store.ts` is a **local SQLite development adapter**, storing a small family document transactionally at `data/arcade.sqlite`. `ARCADE_DB_PATH` can point at an isolated test file. Nothing inside `data/` is committed. It refuses Vercel execution to prevent accidentally shipping ephemeral server storage. Production will replace this adapter with authenticated, family-scoped Postgres operations and a ticket ledger.

Open answers stay pending until a parent scores them. No live AI service is connected, no microphone audio is recorded, and no real purchase or email is sent. The Prize Room uses actual retailer product images; experience tickets are original SVG artwork. Course source references appear in teaching text. Detailed halachic content requires parent-selected sources.

## Checks

```sh
npm test
npm run typecheck
npm run format:check
npm run build
```

Tests exercise real progression, draft persistence, answer-key boundaries, parent access, rollback, purchase deduplication and lifetime totals. Browser checks use a separate database, not the child's record. See `docs/validation.md` for results and limits.

## Layout

- `src/app`: routes and server endpoints.
- `src/lib`: lesson contracts, authored content, scoring rules, local store, tests.
- `src/components`: child flow, parent review, games, style lab and avatars.
- `public/design`: locally hosted licensed fonts and original SVG downloads.
- `design`: source/license notes and design decisions.
- `BUILD-PLAN.md`: first-playable scope.

The original Courier Quest project and synced `sources/` material were not modified.
