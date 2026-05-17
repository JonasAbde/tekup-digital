# Tekup Digital — Landing page

Tekup Digitals officielle hjemmeside — bygget med [Next.js](https://nextjs.org) (App Router, SSG), React 19, TypeScript og Tailwind CSS 4.

Tekup hjælper danske SMV'er med AI-drevne agenter, moderne hjemmesider og smarte chatbots.

## Tekko mascot system

[`public/tekko/`](./public/tekko/) indeholder Tekko, Tekups produktmaskot, i 8 states med tilhørende assets i tre formater:

- **WebP** — foretrukket (lossless med alpha)
- **PNG** — fallback (RGBA)
- **SVG** — sidste udvej (bevaret som placeholder)

React-komponenterne findes i [`src/components/tekko/`](./src/components/tekko/).

Se [`docs/TEKKO_MASCOT_SYSTEM.md`](./docs/TEKKO_MASCOT_SYSTEM.md) for komplet dokumentation.

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # SSG output i out/
npm run lint       # ESLint
npm run verify:tekko  # Tekko asset check
```

## Deploy

- **CI**: GitHub Actions — kører verify → lint → build på hver PR/push til `main`.
- **Auto-deploy**: Cloudflare Pages via `scripts/auto-deploy.sh` (cron på Hermes VPS).

Site: [https://tekup.dk](https://tekup.dk)

## Struktur

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Landing page
│   ├── layout.tsx    # Root layout
│   ├── cookies/      # Cookiepolitik
│   ├── privatliv/    # Privatlivspolitik
│   ├── vilkar/       # Handelsbetingelser
│   └── tekko/        # Tekko mascot preview lab
├── components/       # React-komponenter
│   ├── tekko/        # Tekko mascot system
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── CookieConsent.tsx
public/
├── tekko/            # Asset files (PNG, WebP, SVG)
└── tekko-widget.js   # Vanilla JS widget embed
scripts/
├── verify-tekko.mjs  # Asset verification
├── fix-tekko-alpha.mjs # Alpha transparency tool
└── auto-deploy.sh    # Cloudflare Pages deploy
docs/
├── TEKKO_MASCOT_SYSTEM.md
└── TEKKO_IMPLEMENTATION_AUDIT.md
```
