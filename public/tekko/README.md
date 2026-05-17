# Tekko asset contract

This folder contains the public asset contract for Tekko, Tekup's product mascot.

Current status: **production-ready**. Full-body PNG/WebP assets are committed, with SVG fallbacks retained for compatibility.

## Production assets

All 8 Tekko states are available in three formats:

```
public/tekko/tekko-idle.{svg,webp,png}
public/tekko/tekko-thinking.{svg,webp,png}
public/tekko/tekko-working.{svg,webp,png}
public/tekko/tekko-success.{svg,webp,png}
public/tekko/tekko-warning.{svg,webp,png}
public/tekko/tekko-error.{svg,webp,png}
public/tekko/tekko-sleeping.{svg,webp,png}
public/tekko/tekko-connecting.{svg,webp,png}
```

Plus bonus assets:

```
public/tekko/tekko-avatar.{png,webp}
public/tekko/tekko-badge.{png,webp}
public/tekko/tekko-app-icon.{png,webp}
```

## Fallback chain

`TekkoMascot` loads assets in this order:
1. WebP → 2. PNG → 3. SVG → 4. Text placeholder

This means modern browsers get WebP, older browsers get PNG, and SVG is always available as a last-resort fallback.

## Production guidance

- Use transparent SVG or PNG for state illustrations.
- Keep Tekko's silhouette stable: oversized ears, dark navy body, cyan circuit accents, warm orange chest/tail accent.
- Do not copy Codex, Claude/Clawd, GitHub Octocat, OpenAI marks, or any other mascot.
- Keep small-size readability as the highest priority.
- Use Lottie or spritesheets later only when the static state system is stable.
