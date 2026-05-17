# Tekko Mascot System v2

Tekko is Tekup Digital's reusable product mascot system for assistant widgets, onboarding moments, status feedback, and chatbot/dashboard surfaces.

## Identity

Tekko is a small cyber-fennec fox AI companion.

Visual anchors:

- oversized fennec ears
- dark navy / charcoal body (#111827)
- emerald green outline (#10B981)
- electric cyan eyes (#22D3EE)
- warm amber accent (#F59E0B)

The mascot must stay original to Tekup. Do not copy existing mascot systems from other companies.

## State model

The state model lives in `src/components/tekko/tekkoStates.ts`.

8 states:

| State | Eye | Color | Use |
|-------|-----|-------|-----|
| `idle` | Circle | cyan #22D3EE | Default, header avatar |
| `thinking` | Small dot | light-cyan #67E8F9 | During API calls |
| `working` | Full solid | emerald #10B981 | Processing data |
| `success` | Crescent | green #34D399 | Operation complete |
| `warning` | Triangle/exclamation | amber #F59E0B | Rate limits, notices |
| `error` | X shape | red #EF4444 | API failure |
| `sleeping` | Horizontal line | mint #6EE7B7 | Idle timeout |
| `connecting` | One blinking | cyan #22D3EE | Reconnecting |

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

- [x] Replace placeholder SVGs with final transparent assets.
- [x] Add connecting state.
- [ ] Add Tekko to the landing page hero or trust section.
- [ ] Add Tekko to contact success feedback.
- [ ] Extend the same state model to chatbot and agent dashboard surfaces.
- [ ] Add animation through Lottie or spritesheets after static assets are stable.
