import { buildPageMetadata } from '@/lib/seo';
import LavoraConNoiClient from './client';

export const metadata = buildPageMetadata({
  title: 'Lavora con noi | Monivia — Carriere fintech',
  description: "Unisciti al team Monivia. Cerchiamo talenti per costruire insieme un'esperienza finanziaria più semplice e trasparente.",
  path: '/lavora-con-noi',
  keywords: ['lavora con noi Monivia', 'carriere fintech', 'offerte di lavoro'],
});

export default function LavoraConNoi() {
  return <LavoraConNoiClient />;
}
