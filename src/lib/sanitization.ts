export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function normalizeText(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

export function formatEuro(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits,
  }).format(value);
}
