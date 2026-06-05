import { describe, it, expect } from 'vitest';
import { escapeHtml, normalizeText, formatEuro } from './sanitization';

describe('Sanitization & Formatting', () => {
  it('escapeHtml escapes dangerous HTML entities', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    expect(escapeHtml('Hello & Welcome')).toBe('Hello &amp; Welcome');
    expect(escapeHtml("Tom's Diner")).toBe('Tom&#39;s Diner');
  });

  it('normalizeText removes multiple spaces and trims', () => {
    expect(normalizeText('  Mario   Rossi  ')).toBe('Mario Rossi');
    expect(normalizeText(null)).toBe('');
    expect(normalizeText(undefined)).toBe('');
    expect(normalizeText(1234)).toBe('');
  });

  it('formatEuro formats numbers correctly without decimals by default', () => {
    const formatted = formatEuro(15000);
    expect(formatted).toContain('15.000');
    expect(formatted).toContain('€');
  });
});
