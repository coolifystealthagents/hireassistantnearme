import { NextRequest, NextResponse } from 'next/server';
import { sendLeadFallbackToMattermost } from '../../lib/lead-fallback-mattermost';

const MAX_BODY_BYTES = 64_000;
const MAX_FIELD_LENGTH = 4_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 15 * 60_000;
const MAX_RATE_KEYS = 5_000;
const CANONICAL_ORIGIN = 'https://hireassistantnearme.com';
const attempts = new Map<string, number[]>();

function text(form: URLSearchParams, key: string, max = MAX_FIELD_LENGTH) {
  return (form.get(key) || '').trim().slice(0, max);
}

function errorPage(status: number) {
  return new Response(
    '<!doctype html><html lang="en"><meta charset="utf-8"><title>Submission problem</title><main><h1>We could not send your request.</h1><p>Please go back and try again.</p><a href="/contact-us">Return to the contact form</a></main>',
    { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
  );
}

function clientKey(request: NextRequest) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || null;
}

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

function limited(key: string | null, max: number) {
  if (!key) return false;
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

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (!hasSameOrigin(request)) return errorPage(403);
  if (!Number.isFinite(declaredLength) || !contentType.includes('application/x-www-form-urlencoded')) return errorPage(400);
  if (declaredLength > MAX_BODY_BYTES) return errorPage(413);
  const ip = clientKey(request);
  if (limited(ip ? `ip:${ip}` : null, 10)) return errorPage(429);

  let body = '';
  try {
    body = await request.text();
  } catch {
    return errorPage(400);
  }
  if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return errorPage(413);
  const form = new URLSearchParams(body);

  if (text(form, 'websiteConfirm') || text(form, 'website_confirm') || text(form, 'website_url') || text(form, 'company_homepage')) return errorPage(400);
  if (text(form, 'consent', 10) !== 'yes') return errorPage(422);

  const first = text(form, 'firstName', 100);
  const last = text(form, 'lastName', 100);
  const name = `${first} ${last}`.trim() || text(form, 'name', 200);
  const email = text(form, 'email', 320).toLowerCase();
  const phone = text(form, 'phone', 100);
  const business = text(form, 'company', 300);
  const teamSize = text(form, 'teamSize', 100);
  const supportArea = text(form, 'supportArea', 200);
  const requestMessage = text(form, 'message');
  if (!name || !email || !EMAIL_RE.test(email) || !phone || !teamSize || !supportArea || !requestMessage) return errorPage(422);
  if (limited(`email:${email}`, 3)) return errorPage(429);

  const pageUrl = request.headers.get('referer') || new URL('/contact-us', request.url).toString();
  const message = [
    `Team size: ${teamSize}`,
    `Primary support area: ${supportArea}`,
    requestMessage,
  ].join('\n');
  const payload = {
    full_name: name,
    email,
    phone,
    company_name: business,
    message,
    how_they_heard: 'Website contact form',
    client_event_id: crypto.randomUUID(),
    attribution: {
      source_page: pageUrl,
      landing_page: pageUrl,
      referrer: request.headers.get('referer') || '',
      page_journey: ['Contact form'],
    },
  };
  const token = process.env.LEAD_AUTH_TOKEN;
  const endpoint = process.env.LEAD_INGEST_URL || 'https://leads.stealthagents.com/api/leads';
  if (!token) return errorPage(503);

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-lead-token': token },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    });
    const result = await upstream.json().catch(() => null) as { ok?: boolean } | null;
    if (!upstream.ok || result?.ok !== true) return errorPage(502);
  } catch {
    return errorPage(502);
  }

  void sendLeadFallbackToMattermost({
    name,
    email,
    phone,
    business,
    message,
    companySize: teamSize,
    positions: supportArea,
    referral: 'Website contact form',
    pageUrl,
    userAgent: request.headers.get('user-agent') || '',
  });
  return NextResponse.redirect(new URL('/thank-you?lead=accepted', request.url), 303);
}
