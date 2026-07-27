import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY_BYTES = 64_000;
const MAX_FIELD_LENGTH = 4_000;

function text(form: FormData, key: string, max = MAX_FIELD_LENGTH) {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function errorPage(status: number) {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Submission problem</title><style>body{font-family:system-ui,sans-serif;background:#f8fafc;color:#0f172a;margin:0;padding:2rem}.card{max-width:640px;margin:10vh auto;background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:2rem;box-shadow:0 18px 45px #0f172a14}a{display:inline-block;margin-top:1rem;color:#0369a1;font-weight:700}</style></head><body><main class="card"><h1>We could not send your request.</h1><p>Please go back and try again. If the problem continues, email <a href="mailto:support@stealthagents.com">support@stealthagents.com</a>.</p><a href="/contact">Return to the contact form</a></main></body></html>`, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES || (!contentType.includes('application/x-www-form-urlencoded') && !contentType.includes('multipart/form-data'))) {
    return errorPage(400);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorPage(400);
  }

  if (text(form, 'website_confirm')) return NextResponse.redirect(new URL('/thank-you', request.url), 303);

  const firstName = text(form, 'firstName', 100);
  const lastName = text(form, 'lastName', 100);
  const fullName = `${firstName} ${lastName}`.trim() || text(form, 'name', 200);
  const email = text(form, 'email', 320);
  if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return errorPage(422);

  const sourcePage = request.headers.get('referer') || new URL('/contact', request.url).toString();
  const details = [
    text(form, 'needs'), text(form, 'details'), text(form, 'positions'), text(form, 'role'),
    text(form, 'tier'), text(form, 'companySize'), text(form, 'website'),
  ].filter(Boolean).join('\n');
  const payload = {
    full_name: fullName,
    email,
    phone: text(form, 'phone', 100),
    company_name: text(form, 'company', 300),
    message: details,
    how_they_heard: text(form, 'source', 300) || 'Website contact form',
    client_event_id: crypto.randomUUID(),
    attribution: {
      source_page: sourcePage,
      landing_page: sourcePage,
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

  return NextResponse.redirect(new URL('/thank-you', request.url), 303);
}
