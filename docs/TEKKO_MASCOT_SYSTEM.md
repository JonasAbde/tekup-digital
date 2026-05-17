# Tekko Mascot System v1

Tekko is Tekup Digital's reusable product mascot system for assistant widgets, onboarding moments, status feedback, and future chatbot/dashboard surfaces.

## Identity

Tekko is a small cyber-fennec fox AI companion.

Visual anchors:

- oversized fennec ears
- dark navy / charcoal body
- electric cyan circuit accents
- expressive blue eyes
- warm orange accent
- workflow/signal-path tail

The mascot must stay original to Tekup. Do not copy existing mascot systems from other companies.

## State model

The state model lives in `src/components/tekko/tekkoStates.ts`.

States:

- `idle` — ready or neutral
- `thinking` — gathering context
- `working` — running or building
- `success` — completed
- `warning` — review needed
- `error` — blocked or failed
- `sleeping` — offline or inactive

## Components

Current v1 files:

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

<TekkoAssistantWidget
  state="working"
  title="Tekko is analyzing your workflow..."
  message="I’m gathering the right context."
  progress={72}
/>

<TekkoToast
  state="success"
  title="Automation klar"
  message="3 opgaver blev gennemført."
/>
```

## Asset contract

Production assets should be placed in `public/tekko/` using this naming convention:

```txt
tekko-idle.svg
tekko-thinking.svg
tekko-working.svg
tekko-success.svg
tekko-warning.svg
tekko-error.svg
tekko-sleeping.svg
tekko-avatar.svg
tekko-badge.svg
tekko-app-icon.png
```

`TekkoMascot` includes fallback rendering so missing assets do not break the UI.

## Usage rules

Use Tekko for helpful product moments: onboarding, assistant status, empty states, success states, and clear feedback. Avoid using Tekko inside dense data views or as decoration with no purpose.

## Next steps

1. Replace placeholder SVGs with final transparent assets.
2. Add Tekko to the landing page hero or trust section.
3. Add Tekko to contact success feedback.
4. Extend the same state model to chatbot and agent dashboard surfaces.
5. Add animation later through Lottie or spritesheets after static assets are stable.
