import Link from 'next/link';
import { CheckCircle2, ArrowRight, Phone, Mail } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = buildPageMetadata({
  title: 'Grazie — Monivia',
  description: 'La tua richiesta è stata ricevuta. Ti ricontatteremo entro 48 ore lavorative.',
  path: '/grazie',
  noindex: true,
});

export default function GraziePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 size={40} className="text-emerald-600" />
      </div>
      <h1 className="text-3xl font-black text-primary sm:text-4xl">
        Grazie!
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        La tua richiesta è stata ricevuta correttamente.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Ti ricontatteremo entro <strong>48 ore lavorative</strong> all&apos;indirizzo email indicato.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link href="/" className="btn-cyan flex items-center gap-2">
          Torna alla home <ArrowRight size={14} />
        </Link>
        <Link href="/calcola" className="btn-secondary flex items-center gap-2">
          Simula un prestito <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-16 rounded-2xl bg-slate-50 p-8">
        <p className="text-sm font-bold text-slate-700">Hai bisogno di aiuto?</p>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={`tel:${siteConfig.contact.phone.link}`}
            className="flex items-center gap-2 text-sm text-secondary hover:underline"
          >
            <Phone size={14} /> {siteConfig.contact.phone.display}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-sm text-secondary hover:underline"
          >
            <Mail size={14} /> {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </main>
  );
}
