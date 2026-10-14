# Platform and library recommendation

Researched October 7, 2026. This is an implementation recommendation based on current official documentation, not a tested build or performance benchmark. No older project files or credentials were inspected for this research.

## Recommended foundation

Use **Next.js + React + TypeScript on Vercel, with Supabase Postgres, Auth and private file storage**. Keep one application, one database and exactly three games: **Snake, Match and Rally Run**. Use Phaser for the two moving arcade games; use ordinary React buttons for Match. Keep lessons, questions, voice controls, the prize shelf and parent screens in HTML, outside the game canvas.

Vercel hosts the application and server routes. Persistent data belongs in the database. Its Marketplace provisions third-party databases and injects connection settings; database provisioning does not itself create parent or child authentication. Vercel's former first-party Postgres product is no longer offered; current integrations include Supabase and Neon. [Vercel storage](https://vercel.com/docs/marketplace-storage), [Postgres transition](https://vercel.com/docs/postgres).

Supabase is the smallest practical combination here because this app needs relational records, parent authentication and uploaded homework. Its official Next.js tutorial combines Auth, Postgres and storage. Neon is a credible alternative: its current documentation describes Managed Better Auth, storing users and sessions in the database and branching authentication alongside data. It would be inaccurate to say Neon has no auth. Choosing Supabase is a project-fit judgment, not a claim that Neon cannot support the app. [Supabase Next.js tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs), [Neon official documentation source](https://raw.githubusercontent.com/neondatabase/website/main/content/docs/auth/overview.md).

Use a separate development database and production database. Vercel preview deployments must never award or spend production tickets. Pin mutually compatible stable package versions when implementation begins; do not copy version numbers from older projects.

## Accounts and authorization

The parent uses Supabase Auth, preferably email magic link initially. Children get a friendly avatar/name picker and individual PINs on parent-enrolled devices; they do not need personal email addresses. [Passwordless sign-in](https://supabase.com/docs/guides/auth/auth-email-passwordless).

Child PIN login is **application functionality we must build**, not a Supabase feature that appears automatically. Store salted PIN hashes, rate-limit guesses, and issue revocable opaque child sessions in secure HTTP-only cookies. Bind each session to one child and family. Parent management routes require a separately authenticated parent session. Switching the visible avatar must never confer parent permissions or authorize another child's wallet.

For simplicity, route child data access through Next.js server endpoints. Keep child-session tables and wallet mutation functions inaccessible to browser clients. Apply row-level security to exposed family data, with explicit grants. Server routes must still validate the actor and family because privileged server credentials can bypass RLS. Never ship those credentials to the browser. [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Exactly three games, one lightweight approach

**Snake:** a deterministic grid simulation rendered by Phaser. Arrow keys and touch direction buttons; no rigid-body physics. Pause fully for questions, then resume with the earned shield, speed control or other approved power-up.

**Match:** a React grid of accessible buttons, with selected/matched states and optional card-flip decoration. Use pairs such as vocabulary/meaning or art/artist. The same learning event contract applies, but a game engine adds little value to this mode.

**Rally Run:** a short 2D lane race or perspective-scaled road with sprite obstacles, checkpoints and a finish line. Use Phaser's scene/input/tween tools and simple lane/collision math. A convincing 2.5D appearance needs no 3D vehicle dynamics. Questions pause the race at safe checkpoints; correctness supplies boosts. Three.js remains an optional later replacement for this renderer if real 3D becomes an explicit requirement.

Phaser has official React/Next.js templates and WebGL/Canvas rendering paths. Load the game only when its route opens, client-side, and dispose its canvas/listeners on exit. Keep a small bridge such as `pauseForQuestion`, `applyPowerUp`, `saveCheckpoint`, and `finishRun`; games never grade answers or mutate tickets. [Phaser templates](https://docs.phaser.io/phaser/getting-started/project-templates), [renderer documentation](https://docs.phaser.io/api-documentation/function/core), [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading).

Phaser is preferred over Pixi because this project needs game lifecycle and controls as well as drawing. Pixi is a capable rendering alternative, but would require more surrounding game structure. Three.js adds unnecessary scene/camera/asset work to these three designs. Its current WebGL renderer requires WebGL2, so real 3D would require a deliberate fallback. Do not add Rapier, Matter or a second rendering engine for V1. [Three renderer requirement](https://threejs.org/docs/pages/WebGLRenderer.html).

## Dependency decisions and verified licenses

These are the actual recommended dependencies, plus explicitly deferred alternatives. Preserve package copyright/license notices; media and third-party game assets have their own licenses.

| Component | Decision and purpose | Verified license |
|---|---|---|
| Next.js / React | App shell, server routes, accessible UI | MIT: [Next](https://raw.githubusercontent.com/vercel/next.js/canary/license.md), [React](https://raw.githubusercontent.com/facebook/react/main/LICENSE) |
| Phaser | Snake and Rally Run only; lazy-loaded | [MIT](https://raw.githubusercontent.com/phaserjs/phaser/master/LICENSE.md) |
| Motion | Small shelf, card and reward transitions; one animation system | [MIT](https://raw.githubusercontent.com/motiondivision/motion/main/LICENSE.md) |
| canvas-confetti | Brief completion/prize celebration; lazy-loaded | [ISC](https://raw.githubusercontent.com/catdad/canvas-confetti/master/LICENSE) |
| lucide-react | Consistent navigation/action icons, individually imported | [ISC](https://lucide.dev/license) |
| Plain SVG | Initial progress bars and small retention trend; no chart dependency | Our own components |
| Recharts | Defer until parent analytics need multiple substantial charts | [MIT](https://github.com/recharts/recharts) |
| Howler | Defer; native audio for narration, Phaser audio for game effects initially | [MIT license text](https://raw.githubusercontent.com/goldfire/howler.js/master/LICENSE.md) |
| Pixi / Three.js | Evaluated, excluded from V1 | MIT: [Pixi](https://raw.githubusercontent.com/pixijs/pixijs/dev/LICENSE), [Three](https://raw.githubusercontent.com/mrdoob/three.js/dev/LICENSE) |

Set Motion's `reducedMotion="user"`; its default does not respect that preference. Set confetti's `disableForReducedMotion: true`. Also remove game camera shake, flashing boosts and scrolling decoration when reduced motion is requested; UI-library settings cannot do that automatically. Every chart needs a plain-language value/table alternative, icons need labels, and correctness cannot rely only on color. [Motion policy](https://motion.dev/docs/react-motion-config), [confetti options](https://github.com/catdad/canvas-confetti).

## Learning, grading and the wallet

The following are proposed application rules, not guarantees supplied by the platform.

Persist immutable question instances containing the question version, skill, rubric, source references and age/difficulty settings. Keep answer keys server-side. Numeric and choice questions use deterministic evaluation; open responses use a structured AI grading result against the stored rubric. Uncertain grading goes to review, never silently to a wrong-answer penalty. AI does not execute SQL, select ticket amounts or control store prices.

Enforce the agreed **90% learning gate** on the server using finalized scored items and a versioned policy. Define the denominator, minimum question count and treatment of ungradable items before implementation; compare integers rather than a rounded display percentage. Repeated practice of the same revealed answer must not become new evidence of mastery. Log first-attempt, correction-before-feedback and post-feedback practice separately. Arcade score and purchased boosters cannot change the learning grade.

Use an append-only ticket ledger plus a wallet balance updated in the same transaction. Award IDs must be unique per qualifying event. For redemption, lock the wallet row, verify the family/child and current available balance, snapshot the prize name/cost and rules, deduct tickets, and create a confirmed order atomically. Checkout completes immediately: tickets are spent, and the parent is notified for fulfillment. There is no reservation or parent-approval stage. A repeated request returns the existing result. The parent later marks the order fulfilled or canceled; cancellation produces a linked refund entry, not a deleted debit. This prevents double spending between tabs. PostgreSQL supports all-or-nothing transactions and row locks; we must implement the logic correctly. [Transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [row locks](https://www.postgresql.org/docs/current/explicit-locking.html).

Autosave question/answer progress and game checkpoints to Postgres with monotonically increasing revisions and idempotency keys. A local pending queue can preserve work during brief disconnects, but is not the canonical wallet. Show “Saved” only after acknowledgement; unsynced earnings remain pending. Save at meaningful transitions, not every animation frame. Store resumable checkpoint/seed/version data so a refresh cannot repeat an award. Keep time-zone and reward-policy snapshots with streak events.

## Voice without an autonomous spoken grader

Use ElevenLabs TTS with character timing mapped to word highlights, cached by exact question/voice/model version. For speaking, the authenticated server issues a `realtime_scribe` single-use token; the browser streams directly to ElevenLabs. Its documented token expires after 15 minutes and is consumed on use; that is token validity, not a promise about recording duration. Never expose the permanent provider key. [Timed TTS](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps), [single-use tokens](https://elevenlabs.io/docs/api-reference/tokens/create).

Use manual STT commitment. A child ends recording with Done or releases the push-to-talk key; silence alone does not submit. Accumulate transcript segments until the recording ends. Once the complete transcript is ready, show five seconds to accept or initiate one replacement recording. Starting replacement cancels the countdown. No verdict is requested or shown until the answer locks. Transport failure offers retry/typing without a learning penalty. Realtime supports partial/final segments and manual commit, but these submission rules belong to our app. [Realtime STT](https://elevenlabs.io/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime).

Microphone capture requires permission and a secure context; permission denial must preserve typing. Stop microphone tracks on exit. Hebrew support is model-specific; Aramaic and young-child recognition need actual samples before acceptance, not assumptions from multilingual marketing. [Browser microphone API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia), [ElevenLabs language/model documentation](https://elevenlabs.io/docs/overview/models).

## Deployment boundaries and acceptance checks

**Current correction:** Vercel now supports WebSockets in public beta. They close when a function reaches maximum duration; reconnects may reach another instance, and durable state belongs in an external store. Next.js uses an experimental upgrade API. We do not need this beta for voice because the browser connects directly to ElevenLabs. “Vercel cannot serve WebSockets” is outdated; “Vercel memory is not a persistent game/session database” remains correct. [Vercel WebSockets](https://vercel.com/docs/functions/websockets).

Test the actual family devices for touch controls, keyboard focus, Hebrew layout, audio permission, interrupted recording, disabled WebGL, Canvas fallback and low-power performance. Avoid shader-only game effects so the fallback remains playable. If a renderer fails, preserve the learning session and offer Match or the question screen. Required release checks include duplicate awards, concurrent redemptions, cross-child access, refresh/resume, stale checkpoints, failed grading, delayed transcripts and voice correction timing. No performance or child-speech benchmark has been run yet.
