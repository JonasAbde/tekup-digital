# Tekup Digital release readiness

This checklist defines the release gate for Tekup Digital.

## Goal

Ship the public landing site with Tekko, contact flow, SEO metadata, widget loading, and production assets verified before deploy.

## Required checks

Run before release:

- `npm run verify:tekko`
- `npm run verify:release`
- `npm run lint`
- `npm run build`

## Visual QA

Check these routes and surfaces:

- `/`
- `/tekko`
- `/privatliv`
- `/cookies`
- `/vilkar`
- a non-existing route for the 404 page
- `/tekko-widget.js`
- `/sitemap.xml`

Check these product moments:

- Header navigation
- Hero CTA links
- Om os anchor
- Services section
- Contact form validation
- Contact sending state
- Contact error state
- Contact success state
- Floating Tekko widget button
- Floating Tekko widget open and close
- Tekko production assets at small and large sizes
- Tekko SVG fallback mode on `/tekko`
- Mobile layout
- Cookie consent
- 404 page

## Deployment smoke

After deploy, verify that the homepage, Tekko preview, OG image, widget script, and sitemap return successful responses.

Expected:

- Public routes respond successfully.
- Widget script loads once.
- Tekko widget initializes after interactive.
- Contact form can be submitted or fails with a clear user-facing error.
- No mixed-content or console errors.

## Rollback

If release fails:

1. Revert the release PR or deploy the previous commit.
2. Keep SVG fallback assets in place.
3. Disable only the widget loader if the issue is chat-widget related.
4. Do not remove Tekko production assets unless they cause build/runtime errors.

## Ownership

Primary repo: `JonasAbde/tekup-digital`.

Related repo: `JonasAbde/tekup`, which consumes Tekko production assets and live widget references.
