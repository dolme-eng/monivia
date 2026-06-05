import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Note legali | Monivia',
  description: 'Informazioni legali, responsabilità e condizioni di utilizzo del sito Monivia.',
  path: '/note-legali',
  keywords: ['note legali Monivia', 'termini di utilizzo', 'informazioni legali'],
});

export default function NoteLegaliLayout({ children }: { children: ReactNode }) {
  return children;
}
