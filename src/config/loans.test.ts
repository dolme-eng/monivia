import { describe, it, expect } from 'vitest';
import { loanProducts, loanSlugs, isLoanSlug, type LoanSlug } from '@/config/loans';

describe('loanProducts', () => {
  it('has 5 loan products', () => {
    expect(Object.keys(loanProducts)).toHaveLength(5);
  });

  it('each product has required fields', () => {
    Object.values(loanProducts).forEach((product) => {
      expect(product.slug).toBeTruthy();
      expect(product.title).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.tan).toBeGreaterThanOrEqual(0);
      expect(product.tan).toBeLessThan(1);
      expect(product.insuranceRate).toBeGreaterThanOrEqual(0);
      expect(product.insuranceRate).toBeLessThan(1);
      expect(product.keywords.length).toBeGreaterThan(0);
      expect(product.benefits.length).toBeGreaterThan(0);
    });
  });

  it('TAN values are between 1% and 5%', () => {
    Object.values(loanProducts).forEach((product) => {
      expect(product.tan).toBeGreaterThanOrEqual(0.01);
      expect(product.tan).toBeLessThanOrEqual(0.05);
    });
  });
});

describe('loanSlugs', () => {
  it('returns all 5 slugs', () => {
    expect(loanSlugs).toHaveLength(5);
  });

  it('includes expected slugs', () => {
    expect(loanSlugs).toContain('personale');
    expect(loanSlugs).toContain('auto');
    expect(loanSlugs).toContain('immobiliare');
    expect(loanSlugs).toContain('consolidamento');
    expect(loanSlugs).toContain('business');
  });
});

describe('isLoanSlug', () => {
  it('returns true for valid slugs', () => {
    expect(isLoanSlug('personale')).toBe(true);
    expect(isLoanSlug('auto')).toBe(true);
    expect(isLoanSlug('immobiliare')).toBe(true);
    expect(isLoanSlug('consolidamento')).toBe(true);
    expect(isLoanSlug('business')).toBe(true);
  });

  it('returns false for invalid slugs', () => {
    expect(isLoanSlug('invalid')).toBe(false);
    expect(isLoanSlug('')).toBe(false);
    expect(isLoanSlug('PERSONALE')).toBe(false);
  });
});
