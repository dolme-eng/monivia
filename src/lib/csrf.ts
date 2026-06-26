import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const CSRF_TTL_MS = 60 * 60 * 1000; // 1 hour

function getSecret(): string {
  const secret = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('CSRF_SECRET or NEXTAUTH_SECRET must be set in environment variables');
  return secret;
}

export function generateCsrfToken(): string {
  const secret = getSecret();
  const timestamp = Date.now();
  const nonce = randomBytes(16).toString('hex');
  const payload = `${timestamp}:${nonce}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

export function verifyCsrfToken(token: string | null | undefined): boolean {
  if (!token) return false;

  try {
    const secret = getSecret();
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [timestampStr, nonce, signature] = parts;
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp)) return false;

    if (Date.now() - timestamp > CSRF_TTL_MS) return false;

    const payload = `${timestamp}:${nonce}`;
    const expected = createHmac('sha256', secret).update(payload).digest('hex');
    const sigBuf = Buffer.from(signature, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}
