# Current iteration: guided daily lessons

Read `PRODUCT.md` first. It supersedes the original chunk terminology below. Current work: weekly plan → five daily lessons plus a test → 2–4 short teach/activity chunks per lesson; colorful teaching cards, line matching, more open reasoning, persistent ticket wallet, clear back navigation and versioned content preserving earlier attempts.

# First playable build

The user approved five daily chunks and a weekly test, and authorized building alongside a separate design exploration on October 7, 2026.

## First child and scope

Build for Aharon Zev first. Preserve the three child records and family-scoped concepts. This is a localhost development pilot with sample curriculum and rewards; it is not a production account system. No unapproved deployment or prize spending.

## Work ownership

- Root: Next.js shell, persisted local development store, server scoring/progression, assessment UI, prize checkout, parent grading, integration and verification.
- Curriculum worker: content.ts and content.test.ts only. Five chunks plus test, two assessment forms, teach-first sample content.
- Design typography worker: style-lab.tsx and style-lab.css, public/design/fonts, design/type-color-research.md only. Font pairings, palettes and arcade treatments.
- Design avatar worker: avatar-lab.tsx, avatar-lab.css, public/design/avatars, design/avatar-notes.md only. Original animated SVG concepts.
- Games worker, next wave: games.tsx and games.css only. Simple interactive prototypes, no wallet authority.

## Contract and checks

All questions use content-types.ts. The server never sends answer keys before an assessment is submitted. Open-response scores remain pending until a parent reviews them when no AI grader is configured. A completed 54/60 or better attempt passes; every attempt stays saved. Award each chunk once. Confirmed sample checkout deducts once and leaves lifetime earnings unchanged. Local SQLite is a development adapter only; refuse this storage mode on Vercel until Supabase is connected.

Verify meaningful scoring, gate boundaries, retries, server persistence, purchase deduplication, answer-key stripping, and parent access boundaries. Run type checks and production compilation. Inspect the running HTTP app and design lab with the available browser surface. Design assets receive visual/manual review rather than implementation-mirroring tests.

## Service-dependent remainder

Supabase accounts and production persistence; ElevenLabs listening/speaking; live AI generation/grading; real parent notifications; final ticket economy and full child-specific curriculum. UI labels must not claim these are connected.
