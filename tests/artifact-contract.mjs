import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import http from 'node:http';
import process from 'node:process';

const hostHeaders = {
  Host: 'hireassistantnearme.com',
  'X-Forwarded-Host': 'hireassistantnearme.com',
  'X-Forwarded-Proto': 'https',
};

async function freePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

async function waitUntilReady(base) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await request(base, '/services', { method: 'GET' });
      if (response.status === 200) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Built artifact did not become ready');
}

async function request(base, path, { method, body, origin, type, headers: extraHeaders } = {}) {
  const target = new URL(base);
  const headers = { ...hostHeaders, ...extraHeaders };
  if (type) headers['Content-Type'] = type;
  if (origin) headers.Origin = origin;
  if (body !== undefined) headers['Content-Length'] = Buffer.byteLength(body);
  return await new Promise((resolve, reject) => {
    const call = http.request({ hostname: target.hostname, port: target.port, path, method, headers }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks).toString('utf8') }));
    });
    call.on('error', reject);
    if (body !== undefined) call.write(body);
    call.end();
  });
}

async function post(base, path, body, { origin, type }) {
  return request(base, path, { method: 'POST', body, origin, type });
}

const validEvent = {
  client_event_id: 'contract-event-id',
  event_type: 'pageview',
  timestamp: new Date().toISOString(),
  page_url: 'https://hireassistantnearme.com/contact-us',
  page_path: '/contact-us',
  page_title: 'Contact',
  event_metadata: '{}',
};

const port = await freePort();
const base = `http://127.0.0.1:${port}`;
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let logs = '';
child.stdout.on('data', (chunk) => { logs += chunk; });
child.stderr.on('data', (chunk) => { logs += chunk; });

try {
  await waitUntilReady(base);

  const canonicalRedirect = await request(base, '/about?probe=1', { method: 'GET', headers: { Host: 'www.hireassistantnearme.com', 'X-Forwarded-Host': 'www.hireassistantnearme.com', 'X-Forwarded-Proto': 'http' } });
  assert.equal(canonicalRedirect.status, 308, 'noncanonical production host and protocol redirect permanently');
  assert.equal(canonicalRedirect.headers.location, 'https://hireassistantnearme.com/about?probe=1', 'canonical redirect preserves path and query');
  const about = await request(base, '/about', { method: 'GET' });
  assert.equal(about.status, 200);
  assert.match(about.body, /<title>About Hire Assistant Near Me<\/title>/, 'absolute About title is not duplicated by the global template');
  const sitemap = await request(base, '/sitemap.xml', { method: 'GET' });
  assert.equal(sitemap.status, 200);
  assert.doesNotMatch(sitemap.body, /thank-you|thanks-whats-next/, 'sitemap excludes confirmation pages');
  const researchUrls = [...sitemap.body.matchAll(/<loc>https:\/\/hireassistantnearme\.com\/research\/([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.deepEqual(researchUrls.sort(), ['hireassistantnearme-auditing-access-changes-around-interview-panel','hireassistantnearme-estimating-rework-in-work-sample-from-correction-and-reopen-records','hireassistantnearme-measuring-cycle-time-for-role-scorecard-from-request-to-verified-close','hireassistantnearme-testing-evidence-completeness-in-candidate-intake-without-a-convenience-sample','hireassistantnearme-testing-whether-reference-check-monitoring-catches-silent-failures','equipment-readiness-failure-study','interview-reschedule-impact-study','reference-check-latency-study','replacement-continuity-evidence-study','trial-task-evidence-completeness-study','hireassistantnearme-attributing-rework-in-reference-check','hireassistantnearme-auditing-access-changes-around-offer-packet','hireassistantnearme-capacity-planning-for-offer-packet','hireassistantnearme-early-warning-signals-in-trial-plan','hireassistantnearme-estimating-rework-cost-in-reference-check','hireassistantnearme-measuring-backlog-age-in-work-sample','hireassistantnearme-measuring-response-time-for-work-sample','hireassistantnearme-testing-completeness-in-interview-panel','hireassistantnearme-testing-handoff-completeness-in-interview-panel','hireassistantnearme-testing-monitoring-coverage-for-trial-plan'].sort(), 'sitemap lists exactly the approved research batch');

  const emptyForm = 'firstName=&lastName=&email=&phone=&teamSize=&supportArea=&message=';
  assert.equal((await post(base, '/api/contact', emptyForm, { type: 'application/x-www-form-urlencoded' })).status, 403, 'contact rejects a missing Origin');
  assert.equal((await post(base, '/api/contact', emptyForm, { origin: 'https://attacker.invalid', type: 'application/x-www-form-urlencoded' })).status, 403, 'contact rejects a hostile Origin');
  assert.equal((await post(base, '/api/contact', emptyForm, { origin: 'https://hireassistantnearme.com', type: 'application/x-www-form-urlencoded' })).status, 422, 'same-origin contact reaches schema validation');
  assert.equal((await post(base, '/api/contact', `message=${'x'.repeat(65_000)}`, { origin: 'https://hireassistantnearme.com', type: 'application/x-www-form-urlencoded' })).status, 413, 'contact rejects oversized bodies');

  const payload = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [validEvent] });
  assert.equal((await post(base, '/ingest/track', payload, { type: 'application/json' })).status, 403, 'tracking rejects a missing Origin');
  assert.equal((await post(base, '/ingest/track', payload, { origin: 'https://attacker.invalid', type: 'application/json' })).status, 403, 'tracking rejects a hostile Origin');

  const invalidTimestamp = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, timestamp: 'not-a-date' }] });
  assert.equal((await post(base, '/ingest/track', invalidTimestamp, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects invalid timestamps');
  const forgedType = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, event_type: 'forged_conversion' }] });
  assert.equal((await post(base, '/ingest/track', forgedType, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects unknown event types');
  const forgedLead = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, event_type: 'lead_submit' }] });
  assert.equal((await post(base, '/ingest/track', forgedLead, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'public tracking rejects lead events entirely');
  const extraField = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, admin_override: true }] });
  assert.equal((await post(base, '/ingest/track', extraField, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects unknown event fields');
  const oversizedId = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, client_event_id: 'x'.repeat(201) }] });
  assert.equal((await post(base, '/ingest/track', oversizedId, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects oversized event IDs');

  console.log('Artifact contract: 16/16 routing, SEO, sitemap, rejection, and validation probes passed; no lead or valid analytics event was submitted.');
} finally {
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode && child.exitCode !== 0 && !child.killed) throw new Error(logs);
}
