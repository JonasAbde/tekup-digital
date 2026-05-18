/**
 * Tekup Lead Capture — Cloudflare Pages Function
 *
 * Captures contact form submissions and stores them.
 * Tries to forward to Sales OS backend if configured.
 * Falls back to KV and a bounded in-memory queue.
 *
 * Environment variables / bindings:
 *   SALES_OS_URL      — Backend URL, e.g. https://sales-os.tekup.dk
 *   LEAD_STORAGE      — KV namespace binding for durable fallback storage
 *   ALLOWED_ORIGINS   — Optional comma-separated allowlist. Defaults to tekup.dk origins.
 */

const pendingQueue = [];

const DEFAULT_ALLOWED_ORIGINS = [
  'https://tekup.dk',
  'https://www.tekup.dk',
];

const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  message: 4000,
  service: 120,
  company: 160,
};

function getAllowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = getAllowedOrigins(env);
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(payload, status, headers) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function validateLead(body) {
  const lead = {
    name: clean(body.name, MAX_FIELD_LENGTHS.name),
    email: clean(body.email, MAX_FIELD_LENGTHS.email).toLowerCase(),
    message: clean(body.message, MAX_FIELD_LENGTHS.message),
    service: clean(body.service, MAX_FIELD_LENGTHS.service),
    company: clean(body.company, MAX_FIELD_LENGTHS.company),
  };

  if (clean(body.website, 500)) {
    return { spam: true, lead };
  }

  if (lead.name.length < 2) {
    return { error: 'Navn skal være mindst 2 tegn', lead };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { error: 'Indtast en gyldig email-adresse', lead };
  }

  if (lead.message.length < 10) {
    return { error: 'Besked skal være mindst 10 tegn', lead };
  }

  return { lead };
}

async function readJson(request) {
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Unsupported content type');
  }
  return request.json();
}

export async function onRequest(context) {
  const { request, env } = context;
  const headers = corsHeaders(request, env);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { ...headers, Allow: 'POST' });
  }

  try {
    const body = await readJson(request);
    const validation = validateLead(body);

    if (validation.spam) {
      return json({ success: true, message: 'Tak for din henvendelse! Vi vender tilbage inden for 24 timer.' }, 201, headers);
    }

    if (validation.error) {
      return json({ error: validation.error }, 400, headers);
    }

    const lead = {
      ...validation.lead,
      id: crypto.randomUUID(),
      source: 'tekup.dk',
      source_url: clean(body.source_url, 500),
      captured_at: new Date().toISOString(),
      user_agent: clean(request.headers.get('User-Agent'), 500),
    };

    let backendOk = false;
    const backendUrl = clean(env.SALES_OS_URL, 500).replace(/\/$/, '');

    if (backendUrl) {
      try {
        const backendResp = await fetch(`${backendUrl}/api/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(5000),
        });
        backendOk = backendResp.ok;
      } catch {
        backendOk = false;
      }
    }

    if (!backendOk && env.LEAD_STORAGE) {
      try {
        const key = `lead:${lead.captured_at}:${lead.id}`;
        await env.LEAD_STORAGE.put(key, JSON.stringify(lead), {
          expirationTtl: 2592000,
        });
      } catch {
        // KV unavailable — fall back to in-memory queue.
      }
    }

    if (!backendOk) {
      pendingQueue.push(lead);
      if (pendingQueue.length > 100) pendingQueue.shift();
    }

    return json({
      success: true,
      lead_id: lead.id,
      message: `Tak ${lead.name}! Vi vender tilbage inden for 24 timer.`,
    }, 201, headers);
  } catch {
    return json({
      success: true,
      message: 'Tak for din henvendelse! Vi vender tilbage inden for 24 timer.',
    }, 201, headers);
  }
}
