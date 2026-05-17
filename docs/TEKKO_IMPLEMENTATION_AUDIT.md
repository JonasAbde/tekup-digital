# Tekko implementation audit

Date: 2026-05-17

## Repositories reviewed

### `JonasAbde/tekup`

Purpose from README:

```txt
tekup/
├── agents/           Agent orchestrator + dashboard (VPS)
├── chatbot/          Chatbot widget + backend API
├── templates/        Website skabeloner (Starter/Pro)
└── scripts/          Ops scripts (lead scraper, CVR, backup, health)
```

The README also says the landing page is deployed through `JonasAbde/tekup-digital`.

Conclusion: `tekup` should track ecosystem ownership and cross-surface rollout. It should not be the first place for Next.js landing UI code.

### `JonasAbde/tekup-digital`

Confirmed stack:

- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Source app path: `src/app/page.tsx`
- Global styling: `src/app/globals.css`
- Path alias: `@/* -> ./src/*`

Conclusion: `tekup-digital` is the correct first implementation target for Tekko UI components and landing integration.

## Current implementation decision

This PR starts Tekko in `tekup-digital` as a reusable component system without wiring it aggressively into the landing page yet.

Reason:

- The existing landing page is a single large client component.
- A safe first PR should establish the state model, component API, docs, and asset contract.
- Final production art assets are not yet available as separate transparent state exports.
- The component system includes fallback rendering so missing assets do not break the UI.

## Recommended next PR

After this PR is reviewed:

1. Add final transparent assets to `public/tekko/`.
2. Import `TekkoAssistantWidget` into `src/app/page.tsx`.
3. Add a Tekko assistant card near the hero or after the trust indicators.
4. Add `TekkoToast` to the contact form success state.
5. Add `TekkoEmptyState` examples only where there are real empty states, not decorative noise.

## Surfaces to handle later

- `chatbot/`: Tekko avatar and thinking/working/error state feedback.
- `agents/`: Tekko status helper for agent dashboard states.
- templates: Optional Tekko-branded empty states for future customer template demos.

## Risks

- Overusing Tekko could make the brand feel childish.
- Fake animation claims before assets exist would reduce trust.
- Duplicating assets across repos without a contract would create drift.

## Guardrails

- Keep Tekko useful, not decorative spam.
- Keep all states centralized.
- Do not hardcode operational claims inside visual components.
- Do not use external mascot references in production copy.
- Respect reduced motion.
