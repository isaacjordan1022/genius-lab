# Companion directions

Three original vector characters authored for the family learning arcade. No third-party artwork or character assets are used.

- **Flip, ticket robot:** cobalt, sky blue, and pale blue; receipt-shaped ticket belly, chunky screen face, articulated arms. Connects to the arcade reward system without turning every learning moment into a sales pitch.
- **Orbit, curious comet:** plum, pale pink, and lilac; curling comet tail and expressive, slightly asymmetric body. Suits discovery, science, and connecting ideas.
- **Scrib, pencil explorer:** forest, lime, and pale green; oversized eraser cap, pencil-point body, little walking shoes. Suits language, original stories, and creative work.

The deliberate visual choice is substantial outlined silhouettes and a tactile toy quality, rather than emoji mascots or generic flat circles. Each stays legible at roughly 88px. The lab uses a large colored stage with a restrained graph grid and a light workshop panel. Existing project typography is inherited so the font lab can test pairings without a competing embedded font.

## Component contract

`src/components/avatar-lab.tsx` exports default `AvatarLab` (client component, section id `avatars`) and named `LearningAvatar`.

```tsx
<LearningAvatar character="robot" size={120} mood="celebrate" />
```

- `character?: 'robot' | 'comet' | 'pencil'` (default robot)
- `size?: number` (default 320; SVG scales responsively)
- `mood?: 'idle' | 'blink' | 'celebrate'` (default idle)
- Also exports `AvatarCharacter` and `AvatarMood` types.

`celebrate` shows a recognizable thumbs-up hand and spark shapes, with one brief celebratory movement. `blink` performs a single blink. Parent controls mood duration; the lab resets it automatically. At rest, a blink occurs at a restrained interval. Selector thumbnails do not animate. No continuous bobbing or motion while learning. Use a stable avatar mood in lessons, and ideally allow motion to be turned off in future settings.

Native buttons provide keyboard and touch interactions, visible focus, selection state, and text labels. A polite status announces user-triggered reactions. System reduced-motion preference disables animation and uses static expressive poses instead. Downloads are standalone static SVGs with embedded color, no scripts, fonts, or network dependencies.

Potential future accessories: reading glasses, explorer cap, sticker patch, alternate colors. Earn through learning milestones; no random paid rewards. These are concepts, not implemented functionality.

## Verification

Completed isolated JSX transpilation with esbuild and React server rendering for all three characters in idle and celebration poses. Generated standalone SVG downloads from the actual component and rasterized all six states for a visual inspection; corrected the initial idle-hand silhouette. Static downloads contain embedded colors and render without page CSS. No whole-app build was run during parallel work.

Check component compilation through the root app's normal typecheck after integration. Inspect at desktop and 375px widths, use keyboard focus on all controls, exercise every character and reaction, and check downloaded SVGs open standalone. This isolated contribution does not add routes, package dependencies, or global styles.
