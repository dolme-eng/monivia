import { describe, it, expect, beforeEach, vi } from 'vitest';

const kvStore = new Map<string, number>();
vi.mock('@vercel/kv', () => ({
  kv: {
    get: vi.fn((key: string) => Promise.resolve(kvStore.get(key) ?? null)),
    set: vi.fn((key: string, value: number) => { kvStore.set(key, value); return Promise.resolve('OK'); }),
  },
}));

import { guardSubmission } from './security';
import { NextResponse } from 'next/server';

describe('Security Guard', () => {
  beforeEach(() => {
    kvStore.clear();
    (global as any).rateBuckets = new Map();
  });

  it('blocks submissions with honeypot field filled', async () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = await guardSubmission(request, { kind: 'loan', honeypot: 'spam' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.silent).toBe(true);
    }
  });

  it('allows submissions with empty honeypot', async () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });

  it('allows submissions from localhost', async () => {
    const request = new Request('http://localhost:3000/api/loan', {
      method: 'POST',
      headers: { 'origin': 'http://localhost:3000' }
    });
    const result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });

  it('blocks submissions from unauthorized origins', async () => {
    const request = new Request('https://evil-site.com/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://evil-site.com' }
    });
    const result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('implements rate limiting for loan submissions', async () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 
        'origin': 'https://monivia.it',
        'x-forwarded-for': '192.168.1.1'
      }
    });

    // First submission should be allowed
    let result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Second submission should be allowed
    result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Third submission should be allowed
    result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Fourth submission should be rate limited (limit is 3)
    result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('implements different rate limits for different submission kinds', async () => {
    const contactRequest = new Request('https://monivia.it/api/contact', {
      method: 'POST',
      headers: { 
        'origin': 'https://monivia.it',
        'x-forwarded-for': '192.168.1.2'
      }
    });

    // Contact has higher limit (5) than loan (3)
    for (let i = 0; i < 5; i++) {
      const result = await guardSubmission(contactRequest, { kind: 'contact', honeypot: '' });
      expect(result.allowed).toBe(true);
    }

    // 6th contact submission should be blocked
    const result = await guardSubmission(contactRequest, { kind: 'contact', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('handles requests without IP headers gracefully', async () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = await guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });
});
