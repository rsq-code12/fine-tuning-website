---
version: 1
name: Ramanujan — Steel Monochrome
source: Adapted from the Bugatti DESIGN.md analysis on getdesign.md (https://getdesign.md/bugatti/design-md). Deviation by request: semi-bold Archivo display instead of a thin weight-400 face.
description: >
  Austere, luxury-engineered monochrome. Near-pure black canvas, white uppercase
  letterspaced display type, a serif body voice and machined monospace labels.
  No accent colour, no gradients on UI, no glass, no shadows. The only "voltage"
  is the 3D particle model and a brushed-steel finish on monumental type.

colors:
  canvas: "#000000"
  surface-soft: "#0d0d0d"
  surface-card: "#141414"
  surface-elevated: "#1f1f1f"
  hairline: "#262626"
  hairline-strong: "#3a3a3a"
  ink: "#ffffff"          # headlines, primary text, button outlines
  body-strong: "#e6e6e6"  # lead paragraphs
  body: "#cccccc"         # running text
  muted: "#999999"        # captions, metadata, footer links
  muted-soft: "#666666"   # legal, inactive states
  link: "#c3d9f3"         # inline links only
  ember: "#ff4d24"        # the one colour accent: metallic red-orange, ~5% of the page
  ember-metal: "linear-gradient(118deg, #ffc2a8 0%, #ff6a3d 30%, #c4250c 56%, #ff8a5c 74%, #e2401c 100%)"
  steel: "linear-gradient(180deg, #ffffff 0%, #e2e2e2 38%, #9c9c9c 62%, #f2f2f2 78%, #b5b5b5 100%)"

typography:
  display:   { family: "Archivo", weight: 600, width: "88% (wdth axis)", case: upper, tracking: "0.005em", lineHeight: 0.95 }
  wordmark:  { family: "Archivo", weight: 600, size: 15px, case: upper, tracking: "0.42em" }
  title:     { family: "Archivo", weight: 600, case: upper, tracking: "0.005em" }
  monument:  { family: "Archivo", weight: 800, case: upper }   # one-word moments, footer wordmark
  body:      { family: "EB Garamond", weight: 400, size: 18px, lineHeight: 1.55 }
  caption:   { family: "IBM Plex Mono", weight: 400, size: 11px, case: upper, tracking: "0.2em" }
  button:    { family: "IBM Plex Mono", weight: 400, size: 12px, case: upper, tracking: "0.22em" }

rounded:
  none: 0px        # every card, panel, image, input
  pill: 9999px     # buttons only

spacing: { base: 4px, xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 40px, xxl: 64px, section: 120px }
---

## Principles

1. **Monochrome first, ember for emphasis.** Black, white and the grey ladder carry ~95% of the page. **Ember** (metallic red-orange) is reserved for exactly these highlights; adding a ninth needs removing one:
   1. Hero keyword ("Godfather.")
   2. The 3D model's own highlights (the hero panther eye's slit pupil and its inner-iris glow, curated data blocks, active network path, fine-tuned brain region, orchestrator core, galaxy core)
   3. The training keyword, only at its final "Learned" phase
   4. The active "Our AI" switch in the fine-tune demo
   5. "Our clients own theirs." in the statement
   6. The active process step marker and progress line
   7. "Untouchable." in the final call to action
   8. Live indicator dots
   Cursor glow and the network's travelling pulse stay white.
2. **Three-family trinity, never blurred.**
   - *Archivo* (semi-condensed via its width axis) for every headline, number and the wordmark: UPPERCASE, weight 600 (800 for monumental words).
   - *EB Garamond* (serif) for paragraphs: sentence case, no tracking.
   - *IBM Plex Mono* for buttons, nav, captions, labels and data: UPPERCASE, 0.2em tracking.
   Never use mono in a paragraph or the serif in a button.
3. **Filled, not thin.** Headlines are semi-bold (600) so they read solid against the particles; one-word moments go to 800. Body and labels stay regular (400).
4. **Square everything except buttons.** Cards, panels and images are 0px. Buttons and icon buttons are pills.
5. **Buttons are transparent pills** with a 1px white outline. Hover lifts to a faint white wash; never a solid fill.
6. **Depth comes from the 3D model, not UI chrome.** No drop shadows, no glassmorphism, no gradients on surfaces. Panels are `surface-soft`/`surface-card` with a `hairline` border.
7. **Steel is for monumental type** (one-word moments, numbers, footer wordmark) and for the particles. Ember replaces steel only on the highlights listed in rule 1.
8. **Text is always opaque.** Use the solid grey ladder for hierarchy, never alpha, so particles never show through letters.
9. **Generous rhythm.** ~120px between bands. Let the model breathe.

## Components

| Component | Spec |
|---|---|
| Top nav | Transparent. Links (mono 11px) left, centred wordmark, outline-pill CTA right. |
| Eyebrow / caption | Mono 11px uppercase, `muted`, preceded by a 28px hairline. |
| Panel | `surface-soft` background, 1px `hairline` border, 0px radius, no shadow. |
| Spec cell | Value in display/title, label in caption below, hairline dividers between cells. |
| Button primary | Transparent, 1px `ink` outline, pill, mono 12px, 14px × 32px, min-height 44px. |
| Tag | Mono caption in `muted`, no border, separated by ` · `. |
| Service card | `surface-soft`, hairline border, 0px radius; number in display, title in title, body serif, tools as tags. |

## Implementation map

- Tokens and fonts: `styles/tokens.css`, `app/layout.tsx`
- Base and primitives (eyebrow, display, lead, btn, panel, link): `styles/base.css`, `styles/primitives.css`
- Fixed experience layer (preloader, cursor, nav, rail, HUD, labels): `styles/experience.css`
- Story sections: `styles/sections.css` · service illustrations: `styles/illustrations.css` · keyframes: `styles/motion.css`
- Particle colours (steel): `lib/webgl/scene.ts`, `lib/webgl/shaders.ts`
