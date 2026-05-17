# Tekko Mascot System

Tekko is Tekup Digital's reusable product mascot system for assistant widgets, onboarding moments, status feedback, chatbot surfaces, and dashboards.

## Identity

Tekko is a small cyber-fennec fox AI companion.

Visual anchors:

- oversized fennec ears
- dark navy / charcoal body
- electric cyan eyes
- cyan circuit-line details
- warm amber / orange accent
- workflow / signal-path tail

The mascot must stay original to Tekup. Do not copy existing mascot systems from other companies.

## State model

The state model lives in `src/components/tekko/tekkoStates.ts`.

States:

- `idle`
- `thinking`
- `working`
- `success`
- `warning`
- `error`
- `sleeping`
- `connecting`

## Components

```txt
src/components/tekko/tekkoStates.ts
src/components/tekko/TekkoMascot.tsx
src/components/tekko/TekkoAssistantWidget.tsx
src/components/tekko/TekkoStatusCard.tsx
src/components/tekko/TekkoEmptyState.tsx
src/components/tekko/TekkoToast.tsx
src/components/tekko/TekkoAvatar.tsx
src/components/tekko/index.ts
```

Example usage:

```tsx
<TekkoMascot state="thinking" size="md" animated />

<TekkoMascot state="idle" size="lg" preferProductionAsset={false} />
```

## Asset pipeline

`TekkoMascot` prefers final production assets, then falls back safely:

```txt
1. /tekko/tekko-{state}.webp
2. /tekko/tekko-{state}.png
3. /tekko/tekko-{state}.svg
4. text fallback
```

This lets us ship the component system now, keep lightweight SVGs, and drop in reference-quality PNG/WebP assets later without changing the public component API.

## Required fallback SVGs

```txt
tekko-idle.svg
tekko-thinking.svg
tekko-working.svg
tekko-success.svg
tekko-warning.svg
tekko-error.svg
tekko-sleeping.svg
tekko-connecting.svg
```

## Production exports

Final reference-quality assets should be exported as:

```txt
tekko-idle.webp
tekko-thinking.webp
tekko-working.webp
tekko-success.webp
tekko-warning.webp
tekko-error.webp
tekko-sleeping.webp
tekko-connecting.webp

tekko-idle.png
tekko-thinking.png
tekko-working.png
tekko-success.png
tekko-warning.png
tekko-error.png
tekko-sleeping.png
tekko-connecting.png
```

Optional brand assets:

```txt
tekko-avatar.png
tekko-badge.png
tekko-app-icon.png
```

## Usage rules

Use Tekko for helpful product moments: onboarding, assistant status, empty states, success states, and clear feedback.

Do not use Tekko inside dense data views or as decoration with no purpose.

## Verification

Run:

```bash
npm run verify:tekko
npm run lint
npm run build
```

## Next steps

- [x] Add state-based mascot system.
- [x] Add SVG fallback assets.
- [x] Add Tekko to landing and widget surfaces.
- [x] Add production asset source contract.
- [ ] Export reference-quality PNG/WebP assets.
- [ ] Update verification to require production assets once they exist.
- [ ] Add Lottie or spritesheet animation after static assets are stable.
