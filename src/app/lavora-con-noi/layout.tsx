import type { ReactNode } from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Lavora con noi | Monivia',
  description: 'Unisciti a Monivia e contribuisci a costruire un’esperienza di credito più semplice, chiara e digitale.',
  path: '/lavora-con-noi',
  keywords: ['lavora con noi Monivia', 'carriere fintech', 'lavoro finanziario'],
});

export default function LavoraConNoiLayout({ children }: { children: ReactNode }) {
  return children;
}
