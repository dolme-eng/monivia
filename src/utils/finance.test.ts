import { describe, it, expect } from 'vitest';
import { calculateLoan } from './finance';

describe('Finance Calculations', () => {
  it('calculates monthly payment correctly for standard loan', () => {
    const result = calculateLoan(50000, 48, false);
    expect(result.monthly).toBeGreaterThan(0);
    expect(result.monthly).toBeLessThan(50000);
    expect(result.totalDue).toBeGreaterThan(50000);
    expect(result.tan).toBe(0.02);
  });

  it('includes insurance cost when insurance is enabled', () => {
    const withoutInsurance = calculateLoan(50000, 48, false);
    const withInsurance = calculateLoan(50000, 48, true);
    expect(withInsurance.monthly).toBeGreaterThan(withoutInsurance.monthly);
    expect(withInsurance.taeg).toBeGreaterThan(withoutInsurance.taeg);
  });

  it('handles edge cases correctly', () => {
    const minLoan = calculateLoan(5000, 12, false);
    expect(minLoan.monthly).toBeGreaterThan(0);

    const maxLoan = calculateLoan(1000000, 360, false);
    expect(maxLoan.monthly).toBeGreaterThan(0);
    expect(maxLoan.monthly).toBeLessThan(1000000);
  });

  it('returns finite values for all calculations', () => {
    const result = calculateLoan(50000, 48, true);
    expect(Number.isFinite(result.monthly)).toBe(true);
    expect(Number.isFinite(result.totalDue)).toBe(true);
    expect(Number.isFinite(result.totalInterest)).toBe(true);
    expect(Number.isFinite(result.taeg)).toBe(true);
    expect(Number.isFinite(result.tan)).toBe(true);
  });

  it('calculates total interest correctly', () => {
    const result = calculateLoan(50000, 48, false);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.totalInterest).toBeLessThan(result.totalDue);
  });

  it('TAEG is higher than TAN when insurance is included', () => {
    const withoutInsurance = calculateLoan(50000, 48, false);
    const withInsurance = calculateLoan(50000, 48, true);
    expect(withInsurance.taeg).toBeGreaterThan(withInsurance.tan);
    expect(withoutInsurance.taeg).toBeCloseTo(withoutInsurance.tan, 2);
  });
});
