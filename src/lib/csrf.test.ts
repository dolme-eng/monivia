import { describe, it, expect, beforeEach } from 'vitest';

process.env.CSRF_SECRET = 'test-secret-key-for-unit-tests';

import { generateCsrfToken, verifyCsrfToken } from './csrf';

describe('CSRF Token', () => {
  beforeEach(() => {
    process.env.CSRF_SECRET = 'test-secret-key-for-unit-tests';
  });

  it('generates a valid token', () => {
    const token = generateCsrfToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
    expect(verifyCsrfToken(token)).toBe(true);
  });

  it('rejects null/undefined tokens', () => {
    expect(verifyCsrfToken(null)).toBe(false);
    expect(verifyCsrfToken(undefined)).toBe(false);
    expect(verifyCsrfToken('')).toBe(false);
  });

  it('rejects invalid base64', () => {
    expect(verifyCsrfToken('not-a-valid-token')).toBe(false);
  });

  it('rejects tampered tokens', () => {
    const token = generateCsrfToken();
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split(':');
    parts[2] = '0'.repeat(64);
    const tampered = Buffer.from(parts.join(':')).toString('base64url');
    expect(verifyCsrfToken(tampered)).toBe(false);
  });

  it('rejects expired tokens (> 1 hour)', () => {
    const token = generateCsrfToken();
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split(':');
    const oldTimestamp = Date.now() - 61 * 60 * 1000;
    const oldPayload = `${oldTimestamp}:${parts[1]}`;
    const { createHmac } = require('node:crypto');
    const sig = createHmac('sha256', 'test-secret-key-for-unit-tests').update(oldPayload).digest('hex');
    const expired = Buffer.from(`${oldPayload}:${sig}`).toString('base64url');
    expect(verifyCsrfToken(expired)).toBe(false);
  });

  it('rejects tokens with wrong secret', () => {
    process.env.CSRF_SECRET = 'secret-A';
    const token = generateCsrfToken();
    process.env.CSRF_SECRET = 'secret-B';
    expect(verifyCsrfToken(token)).toBe(false);
    process.env.CSRF_SECRET = 'secret-A';
  });

  it('generates unique tokens each call', () => {
    const t1 = generateCsrfToken();
    const t2 = generateCsrfToken();
    expect(t1).not.toBe(t2);
  });
});
