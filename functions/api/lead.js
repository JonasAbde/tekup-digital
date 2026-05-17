/**
 * Tekup Lead Capture — Cloudflare Pages Function
 * 
 * Proxies contact form submissions to the Sales OS API backend.
 * Configure SALES_OS_URL as an environment variable in Cloudflare Pages.
 *
 * Production: POST → https://sales-os.tekup.dk/api/lead
 * Local:     POST → http://localhost:8020/api/lead
 */

const SALES_OS_URL = typeof SALES_OS_URL !== 'undefined'
  ? SALES_OS_URL
  : 'http://localhost:8020';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', Allow: 'POST' },
    });
  }

  try {
    const body = await request.json();
    const { name, email, message, service, company, phone } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Navn, email og besked er påkrævet' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const backendUrl = env.SALES_OS_URL || SALES_OS_URL;
    const backend = `${backendUrl}/api/lead`;

    const response = await fetch(backend, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, service, company, phone }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: 'Kunne ikke sende beskeden. Prøv venligst igen senere.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
