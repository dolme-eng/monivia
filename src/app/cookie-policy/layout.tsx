import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Informativa cookie | Monivia',
  description: 'Consulta l\'informativa cookie di Monivia e scopri come gestiamo i cookie sul sito.',
  path: '/cookie-policy',
  keywords: ['informativa cookie', 'cookie Monivia', 'privacy web'],
});

export default function CookiePolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
