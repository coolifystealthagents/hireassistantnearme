import { createHmac, timingSafeEqual } from 'node:crypto';

const TOKEN_MAX_AGE_MS = 10 * 60_000;

function signature(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

export function createLeadAcceptanceToken(secret: string) {
  const value = `${Date.now()}.${crypto.randomUUID()}`;
  return `${value}.${signature(value, secret)}`;
}

export function verifyLeadAcceptanceToken(token: string | undefined, secret: string) {
  if (!token || token.length > 300) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [timestamp, nonce, supplied] = parts;
  if (!/^\d{13}$/.test(timestamp) || !/^[0-9a-f-]{36}$/i.test(nonce) || !/^[A-Za-z0-9_-]{43}$/.test(supplied)) return false;
  const issuedAt = Number(timestamp);
  const age = Date.now() - issuedAt;
  if (!Number.isFinite(issuedAt) || age < -30_000 || age > TOKEN_MAX_AGE_MS) return false;
  const expected = signature(`${timestamp}.${nonce}`, secret);
  const suppliedBytes = Buffer.from(supplied);
  const expectedBytes = Buffer.from(expected);
  return suppliedBytes.length === expectedBytes.length && timingSafeEqual(suppliedBytes, expectedBytes);
}
