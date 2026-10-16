import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
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
      const response = await fetch(`${base}/services`, { headers: hostHeaders });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Built artifact did not become ready');
}

async function post(base, path, body, { origin, type }) {
  const headers = { ...hostHeaders, 'Content-Type': type };
  if (origin) headers.Origin = origin;
  return fetch(`${base}${path}`, { method: 'POST', headers, body, redirect: 'manual' });
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
  const extraField = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, admin_override: true }] });
  assert.equal((await post(base, '/ingest/track', extraField, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects unknown event fields');
  const oversizedId = JSON.stringify({ site_id: 'hire-assistant-near-me', events: [{ ...validEvent, client_event_id: 'x'.repeat(201) }] });
  assert.equal((await post(base, '/ingest/track', oversizedId, { origin: 'https://hireassistantnearme.com', type: 'application/json' })).status, 422, 'tracking rejects oversized event IDs');

  console.log('Artifact API contract: 10/10 rejection and validation probes passed; no lead or valid analytics event was submitted.');
} finally {
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (child.exitCode && child.exitCode !== 0 && !child.killed) throw new Error(logs);
}
