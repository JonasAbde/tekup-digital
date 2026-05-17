# Tekko asset contract

This folder contains the public asset contract for Tekko, Tekup's product mascot.

Current status: placeholder-first. The first committed SVG is intentionally simple so the component system can be wired before final brand assets are exported.

## Required production assets

Add these final transparent assets when the illustration pipeline is ready:

```txt
public/tekko/tekko-idle.svg
public/tekko/tekko-thinking.svg
public/tekko/tekko-working.svg
public/tekko/tekko-success.svg
public/tekko/tekko-warning.svg
public/tekko/tekko-error.svg
public/tekko/tekko-sleeping.svg
public/tekko/tekko-avatar.svg
public/tekko/tekko-badge.svg
public/tekko/tekko-app-icon.png
```

## Production guidance

- Use transparent SVG or PNG for state illustrations.
- Keep Tekko's silhouette stable: oversized ears, dark navy body, cyan circuit accents, warm orange chest/tail accent.
- Do not copy Codex, Claude/Clawd, GitHub Octocat, OpenAI marks, or any other mascot.
- Keep small-size readability as the highest priority.
- Use Lottie or spritesheets later only when the static state system is stable.

## Temporary fallback

`TekkoMascot` has a built-in fallback if any image is missing. This lets us merge the system before all production assets exist without breaking UI rendering.
