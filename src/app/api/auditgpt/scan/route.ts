import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.CANONICAL_BACKEND_URL ?? 'https://scrutexity-api.vercel.app';
const INTERNAL_KEY = process.env.INTERNAL_ADMIN_KEY;

const ALLOWED_CORS_ORIGINS = new Set([
  'https://auditgpt.ai',
  'https://www.auditgpt.ai',
  'https://scrutexity.com',
  'https://www.scrutexity.com',
]);

function corsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get('origin');
  if (!origin || !ALLOWED_CORS_ORIGINS.has(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function scanJson(req: Request, body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...corsHeaders(req),
      ...(init?.headers || {}),
    },
  });
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req),
  });
}

export async function POST(req: Request) {
  try {
    const { url, email } = await req.json();

    if (!url) {
      return scanJson(req, { success: false, error: 'URL is required' }, { status: 400 });
    }

    // Forward to the canonical backend which runs the full pipeline:
    // Playwright crawl → claim extraction → pattern matching → scoring → persistence
    const backendRes = await fetch(`${BACKEND_URL}/api/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(INTERNAL_KEY ? { 'x-internal-admin-key': INTERNAL_KEY } : {}),
      },
      body: JSON.stringify({
        url,
        ...(email ? { user_id: email } : {}),
        source_context: 'free_snapshot',
      }),
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      console.warn('[scan-proxy] Backend returned error:', data);
      // Fallback: return a degraded response so the UI doesn't break
      return scanJson(req, {
        success: true,
        scan_id: data.scan_id ?? null,
        claims: [],
        score: null,
        status: data.status ?? 'failed',
        note: 'Free preview unavailable — submit for full audit.',
      });
    }

    // The backend returns { scan_id, status } after running the full pipeline.
    // The claims are persisted to Supabase/Pinecone under the scan_id.
    // The frontend can use scan_id to link to the upsell page at /audit?scan_id=X
    return scanJson(req, {
      success: true,
      scan_id: data.scan_id,
      status: data.status,
      targetUrl: url,
      // Claims are not returned in the backend response (they're persisted).
      // The frontend shows a success state and links to the upsell.
    });
  } catch (error) {
    console.error('[scan-proxy] Failed:', error);
    return scanJson(req, {
      success: false,
      error: 'Internal Server Error',
    }, { status: 500 });
  }
}
