/**
 * Tekup Lead Sync — Cloudflare Pages Function
 * 
 * GET  /api/leads/pending  — Returns leads stored in KV (queued while backend offline)
 * DELETE /api/leads/pending — Clears synced leads from KV
 *
 * Authentication: ?secret=SYNC_SECRET (from env.SYNC_SECRET or default)
 */

// In-memory queue (shared with lead.js via module scope)
// This is a separate deployment, so it won't share memory with lead.js
const localQueue = [];

// Default secret for local sync — change in Cloudflare Pages env
const DEFAULT_SECRET = 'tkp-sync-8f3a';

export async function onRequest(context) {
  const { request, env } = context;
  const secret = env.SYNC_SECRET || DEFAULT_SECRET;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Sync-Secret',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Auth check
  const authHeader = request.headers.get('X-Sync-Secret') || '';
  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret') || '';

  if (authHeader !== secret && querySecret !== secret) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  if (request.method === 'GET') {
    return handleGet(request, env, corsHeaders);
  }

  if (request.method === 'DELETE') {
    return handleDelete(request, env, corsHeaders);
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders, Allow: 'GET, DELETE' } },
  );
}

async function handleGet(request, env, corsHeaders) {
  const leads = [];

  // 1. Pull from KV
  if (env.LEAD_STORAGE) {
    try {
      const list = await env.LEAD_STORAGE.list({ prefix: 'lead:' });
      for (const key of list.keys) {
        const value = await env.LEAD_STORAGE.get(key);
        if (value) {
          leads.push({ kv_key: key.name, ...JSON.parse(value) });
        }
      }
    } catch (err) {
      // KV unavailable
    }
  }

  // 2. Include local queue if accessible
  // Note: separate deployments won't share localQueue, but we include it for completeness

  return new Response(
    JSON.stringify({
      success: true,
      count: leads.length,
      leads,
      source: leads.length > 0 ? (leads[0].kv_key ? 'kv' : 'memory') : 'none',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
  );
}

async function handleDelete(request, env, corsHeaders) {
  let deleted = 0;

  if (env.LEAD_STORAGE) {
    try {
      // Accept specific keys or clear all
      const body = await request.json().catch(() => ({}));
      const keys = body.keys;

      if (keys && Array.isArray(keys)) {
        // Delete specific keys
        await env.LEAD_STORAGE.delete(keys);
        deleted = keys.length;
      } else {
        // Delete all leads with 'lead:' prefix
        const list = await env.LEAD_STORAGE.list({ prefix: 'lead:' });
        const allKeys = list.keys.map(k => k.name);
        if (allKeys.length > 0) {
          await env.LEAD_STORAGE.delete(allKeys);
          deleted = allKeys.length;
        }
      }
    } catch (err) {
      // Delete failed
    }
  }

  return new Response(
    JSON.stringify({ success: true, deleted }),
    { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
  );
}
