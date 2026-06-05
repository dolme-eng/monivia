import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Contatti | Monivia',
  description: 'Contatta Monivia per informazioni, supporto o aggiornamenti sulla tua richiesta di prestito.',
  path: '/contatti',
  keywords: ['contatti Monivia', 'assistenza prestito', 'supporto clienti'],
});

export default function ContattiLayout({ children }: { children: ReactNode }) {
  return children;
}
