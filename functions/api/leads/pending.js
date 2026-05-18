/**
 * Tekup Lead Sync — Cloudflare Pages Function
 *
 * GET    /api/leads/pending  — Returns leads stored in KV while backend is offline
 * DELETE /api/leads/pending  — Clears synced leads from KV
 *
 * Authentication:
 *   X-Sync-Secret must match env.SYNC_SECRET.
 *
 * Required bindings:
 *   SYNC_SECRET   — Secret used by sync jobs
 *   LEAD_STORAGE  — KV namespace binding for pending leads
 */

const MAX_KEYS_PER_DELETE = 250;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'https://tekup.dk',
    'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Sync-Secret',
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

function hasSyncAccess(request, env) {
  const secret = env.SYNC_SECRET;
  if (!secret) return false;
  return request.headers.get('X-Sync-Secret') === secret;
}

export async function onRequest(context) {
  const { request, env } = context;
  const headers = corsHeaders();

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (!hasSyncAccess(request, env)) {
    return json({ error: 'Unauthorized' }, 401, headers);
  }

  if (!env.LEAD_STORAGE) {
    return json({ error: 'LEAD_STORAGE binding is not configured' }, 500, headers);
  }

  if (request.method === 'GET') {
    return handleGet(env, headers);
  }

  if (request.method === 'DELETE') {
    return handleDelete(request, env, headers);
  }

  return json({ error: 'Method not allowed' }, 405, { ...headers, Allow: 'GET, DELETE' });
}

async function handleGet(env, headers) {
  const leads = [];
  const list = await env.LEAD_STORAGE.list({ prefix: 'lead:' });

  for (const key of list.keys) {
    const value = await env.LEAD_STORAGE.get(key.name);
    if (!value) continue;
    try {
      leads.push({ kv_key: key.name, ...JSON.parse(value) });
    } catch {
      leads.push({ kv_key: key.name, parse_error: true });
    }
  }

  return json({
    success: true,
    count: leads.length,
    leads,
    source: 'kv',
  }, 200, headers);
}

async function handleDelete(request, env, headers) {
  const body = await request.json().catch(() => ({}));
  const requestedKeys = Array.isArray(body.keys) ? body.keys : null;
  let keysToDelete = [];

  if (requestedKeys) {
    keysToDelete = requestedKeys
      .filter((key) => typeof key === 'string' && key.startsWith('lead:'))
      .slice(0, MAX_KEYS_PER_DELETE);
  } else {
    const list = await env.LEAD_STORAGE.list({ prefix: 'lead:' });
    keysToDelete = list.keys.map((key) => key.name).slice(0, MAX_KEYS_PER_DELETE);
  }

  for (const key of keysToDelete) {
    await env.LEAD_STORAGE.delete(key);
  }

  return json({ success: true, deleted: keysToDelete.length }, 200, headers);
}
