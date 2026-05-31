export interface LoanCalculation {
  monthly: number;
  totalDue: number;
  totalInterest: number;
  taeg: number;
  tan: number;
}

export function calculateLoan(amount: number, months: number, insurance: boolean): LoanCalculation {
  const tan = 0.02; // 2% TAN
  const monthlyRate = tan / 12;
  const insuranceRate = 0.0005; // 0.05% monthly insurance
  
  // Amortization formula
  const x = Math.pow(1 + monthlyRate, months);
  const baseMonthly = (amount * x * monthlyRate) / (x - 1);
  const insuranceCost = insurance ? amount * insuranceRate : 0;
  const totalMonthly = baseMonthly + insuranceCost;
  
  const monthly = isFinite(totalMonthly) ? totalMonthly : 0;
  const totalDue = monthly * months;
  const totalInterest = totalDue - amount - (insurance ? insuranceCost * months : 0);
  
  // Real TAEG approximation (includes insurance)
  const taeg = insurance ? (tan + (insuranceRate * 12)) * 1.05 : tan;

  return {
    monthly,
    totalDue,
    totalInterest,
    taeg,
    tan
  };
}
