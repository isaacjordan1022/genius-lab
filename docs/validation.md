# First playable validation — October 7, 2026

Scope: Aharon Zev localhost pilot described in BUILD-PLAN.md, plus design exploration. No production deployment.

## Automated checks

- `npm test`: 15 passing tests. Covers curriculum shape, fresh parallel forms, source boundaries, strict 54/60 progression, deterministic grading, pending rubrics, hidden answer keys, partial/cleared drafts, stale-save rejection, immutable submission, one-time awards, atomic/idempotent checkout, lifetime totals, local host/origin validation, parent session checks and idempotent game reports without ticket inflation.
- `npm run typecheck`: passed.
- `npm run format:check`: passed after formatting all authored source.
- `npm run build`: passed; app, style lab, parent page and three API routes compile successfully.
- No separate lint suite is configured. Type and formatting checks are explicit; they are not described as lint coverage.

## Browser checks

Used the actual running Next.js application. Gameplay and purchase checks used `/private/tmp/learning-arcade-browser-qa.sqlite`; the user-facing preview was then restored to the clean `data/arcade.sqlite` with zero attempts/tickets/orders.

Verified:

- Desktop dashboard, vertical navigation, locked activities and clear next step.
- Teaching-first chunk, selecting a response, save-and-advance, reload and resume on the next unanswered question.
- Parent PIN screen and scoring two fixture open responses; pass unlocked chunk two and arcade with exactly 100 sample tickets.
- Prize affordability, confirmation, ticket deduction, confirmed history entry.
- Snake start, token collection, wall collision and 20-point run report; Match Studio correct conceptual connection for 30 points; Rally driving, paused timed review stops, timeout progression, completion and confirmed run-score save.
- Design lab color selection, button celebration, original SVG thumbs-up, and locally loaded fonts.
- No captured browser errors or warnings in the final child/design tabs.

The final input-lock, partial-draft, parent-selection preservation and game retry fixes received independent source validation. Partial-draft and report deduplication also have regression tests. Failed-network retry UI and narrow-phone interaction are not claimed as browser-tested. The in-app browser viewport override did not change the actual viewport; responsive CSS is implemented, but true phone-width and physical touch testing remain required before calling mobile support verified.

## Review

CE code review completed with eight local review lenses. Four initial defects were fixed and independently validated: partial draft loss, clearing another response's rubric selections, editing while advancing, and a failed game report being treated as saved. No actionable findings remained. Receipt: `docs/reviews/2026-10-07-pilot-review.json`.

A small simplification pass removed duplicate active-attempt lookup, derived the parent response type, removed ineffective draft readiness state, reused the returned parent response, and skipped duplicate client saves. Larger lesson-component extraction and game-label catalogue cleanup were deferred as low-impact refactors; transactional revision semantics were preserved.

## Limits

This is a reviewable first build, not the complete MVP. Live AI/voice/accounts, production persistence, actual prize economy and notifications, learned-only mission selection, per-day arcade entitlement and all three children's curriculum are still pending. Two sample forms per assessment are finite. Child testing must validate difficulty, scoring rubrics, session length and real learning outcomes. Review approval applies only to the localhost scope.
