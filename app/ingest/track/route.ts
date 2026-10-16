import { type NextRequest } from 'next/server';

const TRACKING_API = 'https://acrtracking.stealthagents.us/api/track';
const SITE_ID = 'hire-assistant-near-me';
const MAX_BODY_BYTES = 256_000;
const MAX_EVENTS = 25;
const WINDOW_MS = 60_000;
const attempts = new Map<string, number[]>();
export const runtime = 'nodejs';

type TrackingEvent = { event_type?: unknown; client_event_id?: unknown; timestamp?: unknown };
type TrackingPayload = { site_id?: unknown; events?: unknown };

function clientKey(request: NextRequest) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
}

function limited(key: string, max: number) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > max;
}

function validPayload(value: TrackingPayload) {
  if (value.site_id !== SITE_ID || !Array.isArray(value.events) || value.events.length < 1 || value.events.length > MAX_EVENTS) return false;
  return value.events.every((event: TrackingEvent) => (
    event &&
    typeof event === 'object' &&
    typeof event.event_type === 'string' &&
    event.event_type.length > 0 &&
    event.event_type.length <= 80 &&
    typeof event.client_event_id === 'string' &&
    event.client_event_id.length > 0 &&
    typeof event.timestamp === 'string'
  ));
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const origin = request.headers.get('origin');
    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (
      (origin && origin !== request.nextUrl.origin) ||
      !contentType.includes('application/json') ||
      !Number.isFinite(declaredLength) ||
      declaredLength > MAX_BODY_BYTES
    ) return Response.json({ status: 'error' }, { status: 400 });
    if (limited(clientKey(request), 120)) return Response.json({ status: 'error' }, { status: 429 });

    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return Response.json({ status: 'error', detail: 'Payload too large' }, { status: 413 });
    const payload = JSON.parse(body) as TrackingPayload;
    if (!validPayload(payload)) return Response.json({ status: 'error' }, { status: 422 });

    const upstream = await fetch(TRACKING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept-Language': request.headers.get('accept-language') || '',
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    const upstreamBody = [204, 205, 304].includes(upstream.status) ? null : await upstream.text();
    return new Response(upstreamBody, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch {
    return Response.json({ status: 'error' }, { status: 502 });
  }
}
