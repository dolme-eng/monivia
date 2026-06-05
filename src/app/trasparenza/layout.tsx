import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Trasparenza | Monivia',
  description: 'Scopri le informazioni di trasparenza, costi e condizioni del servizio Monivia.',
  path: '/trasparenza',
  keywords: ['trasparenza Monivia', 'costi prestito', 'condizioni finanziamento'],
});

export default function TrasparenzaLayout({ children }: { children: ReactNode }) {
  return children;
}
