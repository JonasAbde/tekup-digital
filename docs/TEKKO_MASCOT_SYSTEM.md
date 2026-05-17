# Tekko Mascot System v1

Tekko is Tekup's reusable product mascot system. The goal is to make Tekko a real UI asset across landing pages, assistant widgets, chatbot surfaces, onboarding states, and status feedback, not just a one-off illustration.

## Identity

Tekko is a small cyber-fennec fox AI companion for Tekup Digital.

Core traits:

- Helpful
- Fast
- Technical
- Friendly
- Reliable

Visual anchors:

- Oversized fennec ears
- Dark navy / charcoal body
- Electric cyan circuit accents
- Large expressive blue eyes
- Warm orange chest or tail accent
- Tail shaped like a workflow/signal path

Avoid copying existing mascots such as Codex pets, Claude/Clawd, GitHub Octocat, OpenAI marks, or any other company mascot.

## States

The v1 state model is centralized in `src/components/tekko/tekkoStates.ts`.

```ts
export type TekkoState =
  | "idle"
  | "thinking"
  | "working"
  | "success"
  | "warning"
  | "error"
  | "sleeping";
```

Use these states consistently:

| State | Use case | Example copy |
| --- | --- | --- |
| `idle` | Ready/neutral assistant | Ready when you are. |
| `thinking` | Gathering context | I’m gathering the right context... |
| `working` | Building or running automation | Building your automation... |
| `success` | Completed task | Completed successfully. |
| `warning` | User review needed | Something needs your attention. |
| `error` | Failed task or blocked flow | Something went wrong. Let’s fix it. |
| `sleeping` | Offline/inactive | Offline or inactive. |

## Components

Current v1 components:

```txt
src/components/tekko/
  tekkoStates.ts
  TekkoMascot.tsx
  TekkoAssistantWidget.tsx
  TekkoStatusCard.tsx
  TekkoEmptyState.tsx
  TekkoToast.tsx
  TekkoAvatar.tsx
  index.ts
```

### TekkoMascot

```tsx
<TekkoMascot state="thinking" size="md" animated />
```

Props:

- `state`: `TekkoState`
- `size`: `sm | md | lg | xl`
- `animated`: boolean
- `showGlow`: boolean
- `alt`: optional accessible alt override

### TekkoAssistantWidget

```tsx
<TekkoAssistantWidget
  state="working"
  title="Tekko is analyzing your workflow..."
  message="I’m gathering the right context."
  progress={72}
  actions={[{ label: "Book gratis samtale", href: "#kontakt" }]}
/>
```

Use this for landing/product assistant surfaces.

### TekkoEmptyState

```tsx
<TekkoEmptyState
  title="Ingen automations endnu"
  message="Tekko kan hjælpe dig med at bygge den første."
  actionLabel="Kom i gang"
  actionHref="#kontakt"
/>
```

Use this for dashboards, admin panels, chatbot setup, and missing-data states.

### TekkoToast

```tsx
<TekkoToast
  state="success"
  title="Automation klar"
  message="3 opgaver blev gennemført."
/>
```

Use this for small status notifications.

## Asset contract

Production assets should live in:

```txt
public/tekko/
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

The component system can render safely before final assets exist because `TekkoMascot` includes a fallback.

## Usage rules

Do:

- Use Tekko for help, onboarding, status feedback, and friendly explanation moments.
- Keep copy short and useful.
- Use states intentionally.
- Preserve color palette and silhouette.
- Respect reduced motion preferences.

Do not:

- Put Tekko everywhere just because the asset exists.
- Use Tekko inside dense data tables where it becomes noise.
- Change Tekko's silhouette, colors, or identity per page.
- Claim Tekko performs real tasks unless the product flow actually does that.

## Future upgrade path

1. Replace placeholder SVGs with final transparent SVG/PNG state assets.
2. Add responsive art direction for mobile hero usage.
3. Add Lottie or spritesheet animation support behind the same state model.
4. Wire states to real chatbot/agent/dashboard events.
5. Add visual regression screenshots once stable.

## Definition of Done for v1

- Components compile in Next.js/React.
- State model is centralized.
- Public asset contract exists.
- Missing assets do not break UI.
- Docs explain usage and future upgrade path.
- No external mascot copying.
