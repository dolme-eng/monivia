import type { Metadata } from 'next';
import FaqClient from './client';

export const metadata: Metadata = {
  title: 'Domande frequenti | Monivia',
  description:
    'Risposte alle domande più comuni sui prestiti Monivia: requisiti, tempi, costi, rimborsi e supporto.',
  alternates: { canonical: 'https://www.monivia.it/faq' },
  openGraph: {
    title: 'Domande frequenti | Monivia',
    description: 'Risposte alle domande più comuni sui prestiti Monivia.',
    url: 'https://www.monivia.it/faq',
    siteName: 'Monivia',
    locale: 'it_IT',
    type: 'website',
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
