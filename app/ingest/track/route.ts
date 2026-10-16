import { NextResponse, type NextRequest } from 'next/server';
import { isIP } from 'node:net';

const TRACKING_API = 'https://acrtracking.stealthagents.us/api/track';
const SITE_ID = 'hire-assistant-near-me';
const CANONICAL_ORIGIN = 'https://hireassistantnearme.com';
const MAX_BODY_BYTES = 256_000;
const MAX_EVENTS = 25;
const WINDOW_MS = 60_000;
const MAX_RATE_KEYS = 5_000;
const attempts = new Map<string, number[]>();
export const runtime = 'nodejs';

const ALLOWED_EVENT_TYPES = new Set([
  'pageview', 'scroll_depth', 'cwv', 'cta_view', 'cta_click', 'outbound_click',
  'download_click', 'mailto_click', 'tel_click', 'form_view', 'form_submit',
  'empty_form_submit', 'lead_submit_blocked_blank',
  'lead_submit_error', 'js_error', 'unhandled_rejection', 'booking_form_open',
]);
const ALLOWED_EVENT_KEYS = new Set([
  'client_event_id', 'event_type', 'timestamp', 'session_id', 'user_id',
  'anonymous_id', 'page_url', 'page_path', 'page_title', 'referrer',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'screen_width', 'screen_height', 'scroll_depth', 'time_on_page',
  'event_value', 'event_metadata',
]);

type TrackingEvent = Record<string, unknown>;
type TrackingPayload = { site_id?: unknown; events?: unknown };

function expectedOrigin(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').split(',')[0].trim();
  const protocol = (request.headers.get('x-forwarded-proto') || request.nextUrl.protocol.replace(':', '')).split(',')[0].trim();
  return host ? `${protocol}://${host}` : request.nextUrl.origin;
}

function hasSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const expected = expectedOrigin(request);
  return origin === expected && (origin === CANONICAL_ORIGIN || process.env.NODE_ENV !== 'production');
}

function clientKey(request: NextRequest) {
  if (process.env.TRUST_PROXY_HEADERS === '1') {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim();
    if (forwarded && isIP(forwarded)) return { key: `proxy:${forwarded}`, max: 120 };
  }
  return { key: 'validated-global-tracking', max: 10_000 };
}

function limited(key: string, max: number) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > MAX_RATE_KEYS) {
    for (const [candidate, times] of attempts) {
      if (!times.some((time) => now - time < WINDOW_MS)) attempts.delete(candidate);
    }
    while (attempts.size > MAX_RATE_KEYS) attempts.delete(attempts.keys().next().value as string);
  }
  return recent.length > max;
}

function validString(value: unknown, max: number, required = false) {
  return typeof value === 'string' && value.length <= max && (!required || value.length > 0);
}

function validMetadata(value: unknown) {
  if (!validString(value, 64_000, true)) return false;
  try {
    const parsed = JSON.parse(value as string);
    return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) && Object.keys(parsed).length <= 100;
  } catch {
    return false;
  }
}

function validEvent(event: unknown): event is TrackingEvent {
  if (!event || typeof event !== 'object' || Array.isArray(event)) return false;
  const value = event as TrackingEvent;
  if (Object.keys(value).some((key) => !ALLOWED_EVENT_KEYS.has(key))) return false;
  if (!validString(value.event_type, 80, true) || !ALLOWED_EVENT_TYPES.has(value.event_type as string)) return false;
  if (!validString(value.client_event_id, 200, true)) return false;
  if (!validString(value.timestamp, 40, true)) return false;
  const timestamp = Date.parse(value.timestamp as string);
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() - timestamp) > 7 * 24 * 60 * 60_000) return false;
  if (!validString(value.page_url, 2_000, true) || !validString(value.page_path, 2_000, true)) return false;
  try {
    const page = new URL(value.page_url as string);
    if (page.origin !== CANONICAL_ORIGIN || !(value.page_path as string).startsWith('/')) return false;
  } catch {
    return false;
  }
  for (const key of ['session_id', 'user_id', 'anonymous_id', 'page_title', 'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'event_value']) {
    if (value[key] !== undefined && !validString(value[key], key === 'page_title' ? 500 : 2_000)) return false;
  }
  for (const key of ['screen_width', 'screen_height', 'scroll_depth', 'time_on_page']) {
    if (value[key] !== undefined && (typeof value[key] !== 'number' || !Number.isFinite(value[key]) || Math.abs(value[key]) > 10_000_000)) return false;
  }
  return value.event_metadata === undefined || validMetadata(value.event_metadata);
}

function validPayload(value: TrackingPayload) {
  return value.site_id === SITE_ID && Array.isArray(value.events) && value.events.length >= 1 && value.events.length <= MAX_EVENTS && value.events.every(validEvent);
}

export async function POST(request: NextRequest) {
  try {
    if (!hasSameOrigin(request)) return Response.json({ status: 'error' }, { status: 403 });
    const contentType = request.headers.get('content-type') || '';
    const declaredLength = Number(request.headers.get('content-length') || '0');
    if (!contentType.toLowerCase().startsWith('application/json') || !Number.isFinite(declaredLength) || declaredLength <= 0 || request.headers.has('transfer-encoding') || declaredLength > MAX_BODY_BYTES) {
      return Response.json({ status: 'error' }, { status: declaredLength > MAX_BODY_BYTES ? 413 : 400 });
    }
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return Response.json({ status: 'error' }, { status: 413 });
    const payload = JSON.parse(body) as TrackingPayload;
    if (!validPayload(payload)) return Response.json({ status: 'error' }, { status: 422 });
    const clientLimit = clientKey(request);
    if (limited(clientLimit.key, clientLimit.max)) return Response.json({ status: 'error' }, { status: 429 });

    const upstream = await fetch(TRACKING_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept-Language': request.headers.get('accept-language') || '',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    const response = NextResponse.json(
      { status: upstream.ok ? 'ok' : 'error' },
      { status: upstream.ok ? 200 : 502, headers: { 'Cache-Control': 'no-store' } },
    );
    return response;
  } catch {
    return Response.json({ status: 'error' }, { status: 502 });
  }
}
