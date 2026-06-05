import { describe, it, expect, beforeEach } from 'vitest';
import { guardSubmission } from './security';
import { NextResponse } from 'next/server';

describe('Security Guard', () => {
  beforeEach(() => {
    // Clear rate limit buckets before each test
    (global as any).rateBuckets = new Map();
  });

  it('blocks submissions with honeypot field filled', () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = guardSubmission(request, { kind: 'loan', honeypot: 'spam' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.silent).toBe(true);
    }
  });

  it('allows submissions with empty honeypot', () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });

  it('allows submissions from localhost', () => {
    const request = new Request('http://localhost:3000/api/loan', {
      method: 'POST',
      headers: { 'origin': 'http://localhost:3000' }
    });
    const result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });

  it('blocks submissions from unauthorized origins', () => {
    const request = new Request('https://evil-site.com/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://evil-site.com' }
    });
    const result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('implements rate limiting for loan submissions', () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 
        'origin': 'https://monivia.it',
        'x-forwarded-for': '192.168.1.1'
      }
    });

    // First submission should be allowed
    let result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Second submission should be allowed
    result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Third submission should be allowed
    result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);

    // Fourth submission should be rate limited (limit is 3)
    result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('implements different rate limits for different submission kinds', () => {
    const loanRequest = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 
        'origin': 'https://monivia.it',
        'x-forwarded-for': '192.168.1.2'
      }
    });

    const contactRequest = new Request('https://monivia.it/api/contact', {
      method: 'POST',
      headers: { 
        'origin': 'https://monivia.it',
        'x-forwarded-for': '192.168.1.2'
      }
    });

    // Contact has higher limit (5) than loan (3)
    for (let i = 0; i < 5; i++) {
      const result = guardSubmission(contactRequest, { kind: 'contact', honeypot: '' });
      expect(result.allowed).toBe(true);
    }

    // 6th contact submission should be blocked
    const result = guardSubmission(contactRequest, { kind: 'contact', honeypot: '' });
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response).toBeInstanceOf(NextResponse);
    }
  });

  it('handles requests without IP headers gracefully', () => {
    const request = new Request('https://monivia.it/api/loan', {
      method: 'POST',
      headers: { 'origin': 'https://monivia.it' }
    });
    const result = guardSubmission(request, { kind: 'loan', honeypot: '' });
    expect(result.allowed).toBe(true);
  });
});
