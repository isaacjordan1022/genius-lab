# Companion directions

Three original vector characters authored for the family learning arcade. No third-party artwork or character assets are used.

- **Tick, selected companion:** cobalt, sky blue, and pale blue; a ticket-printing machine and learning companion. Oversized rounded screen, eye glints, peach cheeks, small boots, inset printer faceplate, status light, vents, shell fasteners, and a warm gold perforated ticket with a checked star. Each arm has a connected shoulder, elbow, wrist/cuff, and mitten. The complete right arm switches between resting and thumbs-up poses; no detached hand or duplicate limb.
- **Orbit, curious comet:** plum, pale pink, and lilac; curling comet tail and expressive, slightly asymmetric body. Suits discovery, science, and connecting ideas.
- **Scrib, pencil explorer:** forest, lime, and pale green; oversized eraser cap, pencil-point body, little walking shoes. Suits language, original stories, and creative work.

The deliberate visual choice is substantial outlined silhouettes and a tactile toy quality, rather than emoji mascots or generic flat circles. Each stays legible at roughly 88px. The lab uses a large colored stage with a restrained graph grid and a light workshop panel. The selected DynaPuff headings and Lexend body pairing is used in the companion workshop. Orbit and Scrib remain available as earlier concept sketches, with Tick selected by default.

## Component contract

`src/components/avatar-lab.tsx` exports default `AvatarLab` (client component, section id `avatars`) and named `LearningAvatar`.

```tsx
<LearningAvatar character="robot" size={120} mood="celebrate" />
```

- `character?: 'robot' | 'comet' | 'pencil'` (default robot)
- `size?: number` (default 320; SVG scales responsively)
- `mood?: 'idle' | 'blink' | 'celebrate' | 'greeting' | 'thinking' | 'printing'` (default idle; the three new gestures are designed for Tick)
- Also exports `AvatarCharacter` and `AvatarMood` types.

`celebrate` shows a recognizable thumbs-up hand and spark shapes, with one brief celebratory movement. `blink` performs a single blink. Parent controls mood duration; the lab resets it automatically. At rest, a blink occurs at a restrained interval. Selector thumbnails do not animate. No continuous bobbing or motion while learning. Use a stable avatar mood in lessons, and ideally allow motion to be turned off in future settings.

Native buttons provide keyboard and touch interactions, visible focus, selection state, and text labels. A polite status announces user-triggered reactions. System reduced-motion preference disables animation and uses static expressive poses instead. Downloads are standalone static SVGs with embedded color, no scripts, fonts, or network dependencies.

Potential future accessories: reading glasses, explorer cap, sticker patch, alternate colors. Earn through learning milestones; no random paid rewards. These are concepts, not implemented functionality.

## Verification

Tick revision: bundled the component with esbuild, server-rendered idle, blink, and celebration states, and rasterized each SVG with Sharp. Visually inspected the idle and thumbs-up renders for attached limbs, silhouette, printer details, and facial expression. The standalone `public/design/avatars/tick-ticket-robot.svg` is generated from the actual idle component, with embedded colors and explicit static pose styles; no scripts, fonts, or network dependencies. The old Flip file is retained as an unused historical asset, not linked by the lab.

System reduced-motion continues to disable blink/cheer/spark animation while preserving the static pose. Root integration checks cover the full app and browser interactions; this contribution does not change routes, dependencies, or global styles.


## Tick character sheet: six intentional moments

The style lab now includes six held poses with short scenario notes: calm dashboard idle, blink/listening, greeting wave, thinking about a clue, printing earned tickets, and a celebratory thumbs-up. Selecting a card previews that reaction on the main stage. Original Orbit and Scrib sketches and existing imports remain compatible.

Greeting uses a complete shoulder-to-elbow-to-cuff-to-open-palm arm, including four separated fingers and one thumb. Thinking swaps that arm for a bent elbow and a hand at his cheek; a small question bubble makes the intent legible. Only one right limb is visible in each pose. The character sheet holds poses still; user-triggered stage reactions run once. Printing scales the visible ticket from its anchored feed edge. Reduced-motion settings retain the clear static pose and disable animation.

The wallet counter's left vertical motto is now exactly **“You’re at Zadik”**, preserving the supplied wording. Balance formatting, printing, and ticket data behavior are unchanged.

Verification for this revision: bundled the component and server-rendered all six SVG states; rendered them to local PNGs with Sharp. Inspected the thinking and waving poses for connected limbs, hand silhouettes, cuffs, facial overlap, and clipping. Root integration owns the live browser/build check. No third-party illustration assets or dependencies were added.
