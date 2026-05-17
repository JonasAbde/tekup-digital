# Tekko Mascot System v3

Tekko is Tekup Digital's reusable product mascot for assistant widgets, onboarding, status feedback, chatbot surfaces, and dashboards.

## Identity

Tekko is a small cyber-fennec fox AI companion.

v3 aligns the production SVGs with the original Tekko reference concept. Tekko is no longer just a head icon. It now uses a semi-full-body silhouette, visible workflow tail, circuit details, and a warm orange accent.

## Required visual anchors

Every Tekko state asset must keep:

- oversized fennec ears
- semi-full-body silhouette
- dark navy / charcoal body
- emerald or cyan glow outline
- electric cyan or state-specific eyes
- visible cyan circuit-line details
- warm orange / amber chest accent
- workflow / signal-path tail with node dots
- readable shape at small UI sizes

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

## Asset contract

Production assets live in `public/tekko/`:

```txt
tekko-idle.svg
tekko-thinking.svg
tekko-working.svg
tekko-success.svg
tekko-warning.svg
tekko-error.svg
tekko-sleeping.svg
tekko-connecting.svg
tekko-avatar.svg
tekko-badge.svg
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

## Current status

- [x] Replace placeholder SVGs with state assets.
- [x] Add connecting state.
- [x] Add Tekko to the landing page hero.
- [x] Add Tekko to contact success feedback.
- [x] Add Tekko chat widget embed.
- [x] Align all 8 state SVGs with the v3 reference concept.
- [ ] Extend the same state model to chatbot backend responses.
- [ ] Add Lottie or spritesheet animation after static assets are stable.
