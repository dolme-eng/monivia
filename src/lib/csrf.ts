import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || process.env.NEXTAUTH_SECRET;
const CSRF_TTL_MS = 60 * 60 * 1000; // 1 hour

export function generateCsrfToken(): string {
  if (!CSRF_SECRET) {
    throw new Error('CSRF_SECRET or NEXTAUTH_SECRET must be set in environment variables');
  }
  const timestamp = Date.now();
  const nonce = randomBytes(16).toString('hex');
  const payload = `${timestamp}:${nonce}`;
  const signature = createHmac('sha256', CSRF_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

export function verifyCsrfToken(token: string | null | undefined): boolean {
  if (!token) return false;
  if (!CSRF_SECRET) return false; // fail-closed — no secret = reject all

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [timestampStr, nonce, signature] = parts;
    const timestamp = Number(timestampStr);
    if (isNaN(timestamp)) return false;

    // Check expiry
    if (Date.now() - timestamp > CSRF_TTL_MS) return false;

    // Verify signature with timing-safe comparison
    const payload = `${timestamp}:${nonce}`;
    const expected = createHmac('sha256', CSRF_SECRET).update(payload).digest('hex');
    const sigBuf = Buffer.from(signature, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}
