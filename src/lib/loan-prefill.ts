export const LOAN_PREFILL_STORAGE_KEY = 'monivia:loan-prefill';

export type LoanPrefill = {
  importo: number;
  durata: number;
  insurance: boolean;
  monthlyEstimate?: number;
  source: 'simulator' | 'offer';
  finalita?: string;
  updatedAt: number;
};

export function saveLoanPrefill(
  data: Omit<LoanPrefill, 'updatedAt'>
): void {
  if (typeof window === 'undefined') return;

  const payload: LoanPrefill = {
    ...data,
    updatedAt: Date.now(),
  };

  window.sessionStorage.setItem(LOAN_PREFILL_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent('monivia:loan-prefill'));
}

export type LoanPrefillBanner = {
  monthly: number;
  importo: number;
  durata: number;
};

export function buildPrefillBanner(
  prefill: LoanPrefill,
  monthlyEstimate: number
): LoanPrefillBanner {
  return {
    monthly: monthlyEstimate,
    importo: prefill.importo,
    durata: prefill.durata,
  };
}

export function readLoanPrefill(): LoanPrefill | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.sessionStorage.getItem(LOAN_PREFILL_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as LoanPrefill;
    if (
      typeof parsed.importo !== 'number' ||
      typeof parsed.durata !== 'number' ||
      typeof parsed.insurance !== 'boolean'
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearLoanPrefill(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(LOAN_PREFILL_STORAGE_KEY);
}

export const FINALITA_BY_PRODUCT_SLUG: Record<string, string> = {
  auto: 'Acquisto Auto',
  immobiliare: 'Ristrutturazione Casa',
  consolidamento: 'Consolidamento Debiti',
  business: 'Altro',
  personale: 'Viaggi / Benessere',
};

export function finalitaFromPathname(pathname: string): string | undefined {
  const match = pathname.match(/\/prestiti\/([^/]+)/);
  if (!match) return undefined;
  return FINALITA_BY_PRODUCT_SLUG[match[1]];
}
