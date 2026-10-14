# Learning arcade: typography and color studio

Research and implementation date: October 7, 2026.

## Design plan and critique

This is a design-review surface for Isaac, not the child dashboard. The memorable visual is a chunky outlined headline paired with a physical ticket. Three directions use the same composition so their differences can be compared: Pocket Arcade (cobalt/Lilita One), Wonder Workshop (teal/Fredoka), and Prize Parade (plum/Coiny). Warm graph paper provides quiet space. Layout: navigation → expressive ticket hero → three direction choices → live color/type specimen → six font pairs → ticket/prize details → paid references. Left-aligned reading and 53–70-character line lengths keep the playful lettering out of lesson passages.

The brief specifically asks for warm paper, tone-on-tone saturated panels, deep button shadows, and retro arcade borders; those choices follow the user's direction. The review removed decorative gradients, perpetual animation, and glossy treatment of reading passages. Short gloss/star effects happen in response to a button click/hover. This is a moodboard, not a proposed change to the grayscale learning flow.

## Six actual free font pairs

| Headline | Reader | Character | Official source |
|---|---|---|---|
| Lilita One | Atkinson Hyperlegible | Compact, chunky arcade; recommended starting point | https://fonts.google.com/specimen/Lilita+One |
| Fredoka | Nunito | Soft, curious; works across the three ages | https://fonts.google.com/specimen/Fredoka |
| Bungee | Atkinson Hyperlegible | Arcade marquee; short labels only | https://fonts.google.com/specimen/Bungee |
| Baloo 2 | Lexend | Soft expressive shapes and steady reader | https://fonts.google.com/specimen/Baloo+2 |
| Coiny | Nunito | Puffy outlines and prize-counter personality | https://fonts.google.com/specimen/Coiny |
| DynaPuff | Lexend | Quirky storybook display | https://fonts.google.com/specimen/DynaPuff |

Reader sources: https://fonts.google.com/specimen/Atkinson+Hyperlegible, https://fonts.google.com/specimen/Nunito, https://fonts.google.com/specimen/Lexend.

Downloaded fonts and corresponding SIL Open Font License text directly from the official Google Fonts repository (`https://github.com/google/fonts/tree/main/ofl/<family>`). Every included family has its OFL text in `public/design/fonts`. The initial sandbox-network attempt could not resolve the host; an approved network-enabled retry succeeded. Luckiest Guy was not at an OFL path, so it was not included; DynaPuff is the sixth display font. No unverified substitute font is labeled as an installed specimen.

Font binaries are unmodified apart from filesystem-safe local filenames for variable-font axes. The demo uses locally hosted font files; no request to Google Fonts is necessary at runtime. CSS loads styles only when used. Production should ship only the chosen headline and reader families, not all mood-board fonts. The six demo display fonts have not been evaluated for Hebrew/Aramaic; a dedicated Hebrew reading font and diacritic verification are a separate content requirement.

## Two optional paid references

- **Obviously**, OH no Type Company: [official specimen and store](https://ohnotype.co/fonts/obviously). The observed page lists $30 for individual styles, $119 for a width family, and $599 for the complete family. Its six widths make it a strong optional reference for large arcade headlines. Pair with the calm Atkinson reader.
- **Ohno Softie**, OH no Type Company: [official specimen and store](https://ohnotype.co/fonts/softie). The observed page lists a $99 family. It provides an unusually soft rounded alternative to the OFL directions. Pair with Lexend or Atkinson.

These are foundry-listed reference prices, not final quotes for the app. Web licensing and selected styles affect the checkout. The moodboard links to official specimens rather than rendering an unlicensed imitation. No paid assets were downloaded or bought. Foundry demo licensing permits testing but does not imply production permission: https://ohnotype.co/demos.

## Color system and computed contrast

WCAG relative luminance calculation performed on the following exact hex pairs. Ratios are for solid colors, not transparency, antialiasing, or shadows.

| Use | Saturated background | Pale foreground | Ratio |
|---|---|---|---:|
| Cobalt / next lesson | #2345BC | #E1E8FF | 6.49:1 |
| Plum / language | #672479 | #F5DDFC | 7.90:1 |
| Coral / daily challenge | #AF352F | #FFE6DC | 5.22:1 |
| Teal / discovery | #07615B | #D7F9E9 | 6.49:1 |
| Gold / tickets | #805300 | #FFF0B9 | 5.84:1 |
| Paper / reading | #F7F5ED | #273329 | 12.09:1 |

All body pairs meet the 4.5:1 normal-text threshold. The interactive headline controls recalculate fill/background contrast and warn when it falls below the 3:1 large-text threshold. Outline experiments do not affect body text. The bright collectible ticket uses #F4CB5C with #493200; it is a separate illustration detail, not a text-on-bright-gold body palette.

## Implemented interactions

- Three coherent direction buttons update live font and palette.
- Five color-family buttons update the lesson sample, buttons, outline, and fill.
- Six real font pairings with lesson-reading samples and download/source links.
- Editable heading copy, display-font selector, inside and outline color pickers, outline thickness control.
- Clickable shadow button with a short gloss interaction and stars; no autoplay loop.
- Save design combination to this browser's local storage, isolated from child progress.
- Ticket graphic, original SVG rocket prize illustration, prize progress, readable arcade border examples.
- Keyboard focus, mobile layout, and reduced-motion rules. Color is accompanied by names and numeric progress.
- Navigation back to app and forward to parent-composed avatar workshop.

## Files and verification

Owned files: `src/components/style-lab.tsx`, `src/components/style-lab.css`, `public/design/fonts/*`, this document.

The component is a default-exported client component and imports its scoped stylesheet. It has no app route, app-state, game, avatar-component, or backend dependency. Parent composes it on `/design` or the chosen design route and places the avatar component after it with `id="avatars"`.

Verified all ten CSS font-file references exist and all nine families include license files. Computed palette contrast directly. No app build or package modification performed by this agent to avoid collisions with the build team. Parent should run the integrated type/build checks and browser/mobile review.


## Selected direction — current revision

Isaac selected DynaPuff + Lexend and Tick as the companion. The lab now defaults to that pairing and offers twelve color families. Ticket artwork is a reusable SVG printer fixture with a replayable feed/foil animation, reduced-motion handling, and a clear sample balance. New palettes: Bubblegum, Tangerine, Forest, Midnight, Violet, Ocean and Olive.
