import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { saveLoanPrefill, readLoanPrefill, buildPrefillBanner, finalitaFromPathname } from './loan-prefill';

describe('Loan Prefill', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  });

  afterEach(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  });

  it('saves loan prefill data to localStorage', () => {
    const data = {
      importo: 50000,
      durata: 48,
      insurance: true,
      monthlyEstimate: 1200,
      source: 'simulator' as const
    };
    saveLoanPrefill(data);
    
    const retrieved = readLoanPrefill();
    expect(retrieved).toMatchObject(data);
    expect(retrieved?.updatedAt).toBeDefined();
  });

  it('returns null when no prefill data exists', () => {
    const retrieved = readLoanPrefill();
    expect(retrieved).toBeNull();
  });

  it('builds prefill banner with correct format', () => {
    const data = {
      importo: 50000,
      durata: 48,
      insurance: true,
      monthlyEstimate: 1200,
      source: 'simulator' as const,
      updatedAt: Date.now()
    };
    const banner = buildPrefillBanner(data, 1200);
    
    expect(banner).toEqual({
      importo: 50000,
      durata: 48,
      monthly: 1200
    });
  });

  it('extracts finalita from pathname correctly', () => {
    expect(finalitaFromPathname('/prestiti/personale')).toBe('personale');
    expect(finalitaFromPathname('/prestiti/auto')).toBe('auto');
    expect(finalitaFromPathname('/prestiti/immobiliare')).toBe('immobiliare');
    expect(finalitaFromPathname('/prestiti/consolidamento')).toBe('consolidamento');
    expect(finalitaFromPathname('/prestiti/business')).toBe('business');
  });

  it('returns undefined for unknown pathname', () => {
    expect(finalitaFromPathname('/unknown-page')).toBeUndefined();
    expect(finalitaFromPathname('/')).toBeUndefined();
  });

  it('handles pathname with query parameters', () => {
    expect(finalitaFromPathname('/prestiti/personale?ref=google')).toBe('Viaggi / Benessere');
  });

  it('overwrites existing prefill data', () => {
    const firstData = {
      importo: 30000,
      durata: 24,
      insurance: false,
      monthlyEstimate: 800,
      source: 'simulator' as const
    };
    saveLoanPrefill(firstData);

    const secondData = {
      importo: 75000,
      durata: 60,
      insurance: true,
      monthlyEstimate: 1500,
      source: 'simulator' as const
    };
    saveLoanPrefill(secondData);

    const retrieved = readLoanPrefill();
    expect(retrieved).toMatchObject(secondData);
    expect(retrieved?.updatedAt).toBeDefined();
  });

  it('handles missing monthlyEstimate in buildPrefillBanner', () => {
    const data = {
      importo: 50000,
      durata: 48,
      insurance: true,
      source: 'simulator' as const,
      updatedAt: Date.now()
    };
    const banner = buildPrefillBanner(data, 1300);
    
    expect(banner.monthly).toBe(1300);
  });
});
