import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Informativa privacy | Monivia',
  description: 'Leggi come Monivia tratta e protegge i dati personali raccolti tramite il sito e i moduli di richiesta.',
  path: '/privacy-policy',
  keywords: ['informativa privacy', 'trattamento dati', 'GDPR Monivia'],
});

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
