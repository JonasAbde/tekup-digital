# Lead capture contract

This document defines the production contract for Tekup Digital lead capture.

## Public endpoint

`functions/api/lead.js` receives contact form submissions.

Required behavior:

- Accept only POST and OPTIONS.
- Validate name, email, and message.
- Bound input lengths before forwarding or storing.
- Add a unique lead id.
- Capture source, source URL, timestamp, and user agent.
- Forward to Sales OS when configured.
- Store in KV fallback when forwarding is unavailable.
- Keep a bounded in-memory fallback queue as last resort.
- Return a user-safe response.
- Avoid exposing backend failures to visitors.
- Avoid wildcard CORS in production.

## Pending sync endpoint

`functions/api/leads/pending.js` exposes KV fallback leads for sync jobs.

Required behavior:

- Accept only GET, DELETE, and OPTIONS.
- Require a configured sync secret.
- Authenticate only via request header.
- Do not support query-string secrets.
- Do not ship with a default production secret.
- Require the KV binding to exist.
- Bound delete batches.
- Return clear JSON errors.

## Frontend contract

The contact form must send:

- name
- email
- message
- service
- company

The frontend should validate obvious user errors before submitting and show a clear failure state if the request fails.

## Release checks

Before release, verify:

- Contact form still posts to the lead endpoint.
- Required fields are validated client-side and server-side.
- Invalid email returns a validation error.
- Missing required fields return a validation error.
- Spam honeypot submissions are accepted but not processed as normal leads.
- Backend outage still stores the lead in fallback storage.
- Pending sync requires header-based authentication.
- Pending sync does not accept URL query authentication.

## Environment

Required for production fallback/sync:

- `SALES_OS_URL`
- `LEAD_STORAGE`
- `SYNC_SECRET`
- `ALLOWED_ORIGINS` optional, defaults to Tekup production origins
