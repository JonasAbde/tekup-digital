# Tekko reference alignment standard

This document defines the visual acceptance standard for Tekko based on the approved reference boards.

## Current decision

Tekko must match the reference direction as a premium cyber-fennec product mascot, not just a simple icon.

The hand-coded SVG assets in this branch are an interim vector pass. They preserve the right motifs, but the final production asset direction should be closer to the uploaded concept boards.

## Reference-standard traits

A production-ready Tekko asset should have:

- polished cyber-fennec character design
- full-body or semi-full-body mascot form
- oversized ears with bright inner fur
- dark navy body with soft shading
- expressive large blue eyes
- visible cyan circuit lines across head and body
- warm orange chest mark
- glowing workflow / signal-path tail with node dots
- clear state-specific expression
- premium SaaS / product mascot finish
- readable silhouette at avatar and widget sizes

## Required states

- idle
- thinking
- working
- success
- warning
- error
- sleeping
- connecting

Each state should preserve the same character identity. Do not let each state become a different fox.

## Asset tiers

### Tier 1 — Current SVG vector pass

Purpose:

- lightweight UI compatibility
- fast loading
- stable component integration
- fallback-safe mascot system

Status: acceptable for implementation and staging, but not final visual quality.

### Tier 2 — Production mascot export

Purpose:

- match reference boards visually
- use polished transparent PNG/WebP or optimized SVG
- support hero, assistant widget, avatar, app icon, and empty-state surfaces

Required exports:

```txt
public/tekko/tekko-idle.png
public/tekko/tekko-thinking.png
public/tekko/tekko-working.png
public/tekko/tekko-success.png
public/tekko/tekko-warning.png
public/tekko/tekko-error.png
public/tekko/tekko-sleeping.png
public/tekko/tekko-connecting.png
public/tekko/tekko-avatar.png
public/tekko/tekko-badge.png
public/tekko/tekko-app-icon.png
```

## Acceptance criteria

Before calling Tekko complete:

- The mascot should visually resemble the approved reference boards.
- The workflow tail must be visible in default and widget states.
- The orange chest mark must be visible in default and widget states.
- Circuit lines must be visible on head/body, not only implied by glow.
- The widget icon must use the same identity as the page assets.
- The mascot must remain readable at 32px, 56px, 96px, and hero sizes.
- All states must feel like the same character.

## Do not merge as final if

- Tekko looks like only a head icon.
- Tekko has no workflow tail.
- Tekko has no orange chest mark.
- Tekko loses the cyber-fennec identity.
- The widget uses a different Tekko style than the page.
- Assets look like generic robot/animal clipart.

## Next recommended step

Generate or export production PNG/WebP assets from the approved reference style, then switch `tekkoStates.ts` to prefer those production assets while keeping SVGs as fallback if needed.
