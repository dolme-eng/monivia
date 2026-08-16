import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { generateCsrfToken, verifyCsrfToken } from './csrf';

describe('CSRF tokens', () => {
  const originalEnv = process.env.AUTH_SECRET;

  beforeAll(() => {
    process.env.AUTH_SECRET = 'test-secret-for-csrf';
  });

  afterAll(() => {
    if (originalEnv !== undefined) {
      process.env.AUTH_SECRET = originalEnv;
    }
  });

  it('generates a token', () => {
    const token = generateCsrfToken();
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  it('verifies a valid token', () => {
    const token = generateCsrfToken();
    expect(verifyCsrfToken(token)).toBe(true);
  });

  it('rejects null', () => {
    expect(verifyCsrfToken(null)).toBe(false);
  });

  it('rejects undefined', () => {
    expect(verifyCsrfToken(undefined)).toBe(false);
  });

  it('rejects empty string', () => {
    expect(verifyCsrfToken('')).toBe(false);
  });

  it('rejects garbage string', () => {
    expect(verifyCsrfToken('not-a-valid-token')).toBe(false);
  });

  it('rejects token from different secret', () => {
    const secret = process.env.AUTH_SECRET;
    process.env.AUTH_SECRET = 'other-secret';
    const foreignToken = generateCsrfToken();
    process.env.AUTH_SECRET = secret;

    expect(verifyCsrfToken(foreignToken)).toBe(false);
  });

  it('generates unique tokens', () => {
    const t1 = generateCsrfToken();
    const t2 = generateCsrfToken();
    expect(t1).not.toBe(t2);
  });
});
