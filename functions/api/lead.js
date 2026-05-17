/**
 * Tekup Lead Capture — Cloudflare Pages Function
 *
 * Captures contact form submissions and stores them.
 * Tries to forward to Sales OS backend if configured.
 * Falls back gracefully — the user always gets a success response.
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   SALES_OS_URL  — Backend URL (e.g. https://sales-os.tekup.dk)
 *   CF_LEAD_KV    — KV namespace binding name for lead storage
 */

// In-memory queue for submissions when backend is unreachable.
// Lost on worker restart — KV storage is preferred for durability.
const pendingQueue = [];

export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json', ...corsHeaders, Allow: 'POST' } },
    );
  }

  try {
    const body = await request.json();
    const { name, email, message, service, company } = body;

    // Validate
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Navn, email og besked er påkrævet' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      );
    }

    const lead = {
      name,
      email,
      message,
      service: service || '',
      company: company || '',
      source: 'tekup.dk',
      captured_at: new Date().toISOString(),
    };

    // 1. Try SALES_OS backend
    let backendOk = false;
    const backendUrl = env.SALES_OS_URL;
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
        // Backend unreachable — fall through to KV / queue
      }
    }

    // 2. Store in KV (if bound)
    if (!backendOk && env.LEAD_STORAGE) {
      try {
        const key = `lead:${Date.now()}:${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        await env.LEAD_STORAGE.put(key, JSON.stringify(lead), {
          expirationTtl: 2592000, // 30 days
        });
      } catch {
        // KV unavailable — fall back to in-memory queue
      }
    }

    // 3. In-memory fallback (last resort)
    if (!backendOk) {
      pendingQueue.push(lead);
      // Keep queue bounded
      if (pendingQueue.length > 100) pendingQueue.shift();
    }

    // Always return success to the user
    return new Response(
      JSON.stringify({
        success: true,
        message: `Tak ${name}! Vi vender tilbage inden for 24 timer.`,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );

  } catch (err) {
    // Catch-all — never expose backend failures to the user
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tak for din henvendelse! Vi vender tilbage inden for 24 timer.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } },
    );
  }
}
