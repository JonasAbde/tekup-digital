# Tekko asset contract

This folder contains the public SVG asset contract for Tekko, Tekup Digital's product mascot.

Current status: v3 reference-aligned assets.

## Required state assets

```txt
public/tekko/tekko-idle.svg
public/tekko/tekko-thinking.svg
public/tekko/tekko-working.svg
public/tekko/tekko-success.svg
public/tekko/tekko-warning.svg
public/tekko/tekko-error.svg
public/tekko/tekko-sleeping.svg
public/tekko/tekko-connecting.svg
```

## Optional brand/export assets

```txt
public/tekko/tekko-avatar.svg
public/tekko/tekko-badge.svg
public/tekko/tekko-app-icon.png
```

## v3 visual requirements

Every state asset should keep:

- oversized fennec ears
- semi-full-body silhouette
- dark navy / charcoal body
- cyan or emerald glow outline
- cyan circuit-line details
- warm orange / amber chest accent
- workflow / signal-path tail with node dots
- readable shape at small UI sizes

## Production guidance

- Use transparent SVG or PNG for state illustrations.
- Keep Tekko's silhouette stable across states.
- Do not copy Codex, Claude/Clawd, GitHub Octocat, OpenAI marks, or any other mascot.
- Keep small-size readability as the highest priority.
- Use Lottie or spritesheets later only when the static state system is stable.

## Fallback

`TekkoMascot` has built-in fallback rendering if any image is missing. The fallback is for resilience only. Production should keep every state asset present.
