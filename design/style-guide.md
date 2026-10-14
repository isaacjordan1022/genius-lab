# Learning Arcade visual system

Updated October 7, 2026. This is the shared design direction for Aharon Zev, Tobi, and Ezra. The interactive reference is `/style-lab`.

## Decisions to carry into every feature

- DynaPuff headlines and Lexend reading/interface text are selected. New screens should use this pairing, rather than reopen font selection.
- Keep all 12 saturated color families. Pair each deep background with its own pale hue; use the darker family color for borders and button depth.
- Replace graph-paper grids with near-white surfaces and extremely quiet, rounded repeating SVG motifs. Texture surrounds the activity; passages sit on plain cards.
- Tick is the ticket-printing companion. His character and ticket display remain separate reusable components.
- A visual should help a child understand what to do, distinguish a kind of material, see progress, or celebrate a real achievement.

## Type

The local DynaPuff variable font supports weights 400–700. The local Lexend variable font supports weights 100–900. Both are normal/roman fonts under the SIL Open Font License. Do not synthesize italic or unsupported heavy DynaPuff weights.

| Role                | Typeface / weight | Size    | Line height | Tracking |
| ------------------- | ----------------- | ------- | ----------- | -------- |
| Celebration         | DynaPuff 500      | 40–64px | 1.1         | −0.02em  |
| Page title          | DynaPuff 500      | 32–44px | 1.15        | −0.01em  |
| Activity/card title | DynaPuff 500      | 24–30px | 1.2         | 0        |
| Question            | Lexend 600        | 20–24px | 1.5         | 0        |
| Reading             | Lexend 400        | 18–20px | 1.8         | 0        |
| Action/navigation   | Lexend 600        | 18–20px | 1.4         | 0        |
| Supporting label    | Lexend 500        | 18px    | 1.5         | 0        |

Use 20–22px reading text for Ezra and early readers. These are presentation defaults, not fixed limits: allow browser zoom and larger-text preferences. Never shrink a passage to fit a fixed-height card.

18px is the minimum everywhere, including the design lab and parent annotations. Normal DynaPuff headings use 400 or 500. Specimens may show heavier weights only for comparison. Reflow layouts instead of shrinking labels.

Reading measure: aim for 48–60 characters per line, maximum 58ch in the standard passage component. Break at meaningful ideas and leave about one line between paragraphs. Keep question prompts distinct by weight and placement. Use highlights for vocabulary or evidence, sparingly.

Outlined lettering belongs on short, large DynaPuff headings. Keep the letter interior readable and the stroke outside the fill (`paint-order: stroke fill`). Never outline passages, questions, or navigation.

## Light surfaces

| Surface    | Base    | Motif                          | Role                         |
| ---------- | ------- | ------------------------------ | ---------------------------- |
| Soft cream | #FAF8F0 | Mixed rounded learning objects | Warm default                 |
| Cloud sage | #F4F7F3 | Same mixed learning objects    | Quiet green-gray alternative |
| Pearl gray | #F6F7F9 | Same mixed learning objects    | Neutral alternative          |

The motifs are original repeating SVGs in `public/design/quiet-shapes.svg`, 320×240px per tile. A faint offset silhouette and a pale highlight create shallow dimensional detail without image files, filters, canvas work, or animation. They must remain background texture, never visual competition for the lesson. Plain reading-card surface: #FFFEFD.

The style-lab selector changes the page surface immediately. Saving a combination stores the named surface with the chosen palette and headline effects on the current device; it does not change the learning app.

## Color families

Cobalt, Plum, Coral, Teal, Gold, Bubblegum, Tangerine, Forest, Midnight, Violet, Ocean, Olive. Exact deep/pale/dark/accent values are defined in `src/components/style-lab.tsx` and displayed in the live color studio. Do not mix a pale text hue with an unrelated deep panel without checking contrast. Progress and state also need words, icons, shapes, or numbers.

## Spacing and dimensions

Base spacing set: **4, 8, 12, 16, 24, 32, 48, 64px**.

| Relationship           | Default                                             |
| ---------------------- | --------------------------------------------------- |
| Icon to label          | 8px                                                 |
| Heading to copy        | 12–16px                                             |
| Related cards          | 16–24px                                             |
| Card interior          | 24px desktop; 16–20px mobile                        |
| Between major sections | 48–64px desktop; 32px mobile                        |
| Main content           | Maximum 1,200px                                     |
| Button padding         | 16px vertical × 24px horizontal for primary actions |
| Button target          | At least 48px high                                  |

Cards should have room to grow with their content. Use strong borders and a short solid offset shadow to show a pressable element; avoid attaching identical heavy shadows to every surface. Keep reading cards quieter than rewards and buttons.

## Motion

Use a brief response to a click, newly earned tickets, or an achievement. Respect reduced motion. Texture remains static. A child should always be able to concentrate on the material without persistent flashing or decorative activity.

## Implementation status

The style lab demonstrates the selected type system, weight specimens, reading measures, spacing tokens, three light surfaces, and all 12 color families. This document is the standard for subsequent features; it does not claim that every existing game or dashboard screen has already adopted every token.

The mixed pattern contains pencils, books, tickets, music notes, a paintbrush, rounded shapes and occasional stars. Tick is the default; Orbit and Scrib sit behind an optional customization preview. Hover preserves the normal button color pair and uses motion/brightness for feedback.
