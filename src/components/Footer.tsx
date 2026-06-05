import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const serviceLinks = [
  { name: 'Prestito Personale', href: '/prestiti/personale' },
  { name: 'Prestito Auto', href: '/prestiti/auto' },
  { name: 'Prestito Immobiliare', href: '/prestiti/immobiliare' },
  { name: 'Prestito Aziendale', href: '/prestiti/business' },
  { name: 'Consolidamento Debiti', href: '/prestiti/consolidamento' },
];

const companyLinks = [
  { name: 'Chi siamo', href: '/chi-siamo' },
  { name: 'Lavora con noi', href: '/lavora-con-noi' },
  { name: 'Contatti', href: '/contatti' },
  { name: 'Trasparenza', href: '/trasparenza' },
  { name: 'Note legali', href: '/note-legali' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contact.address)}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050d1a] text-slate-400">

      <div className="site-container relative z-10">
        {/* CTA Banner */}
        <div className="py-12 sm:py-16">
          <div className="rounded-xl border border-white/10 bg-[#0f1f35] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div>
                <div className="badge-dark inline-flex mb-3">Inizia oggi</div>
                <h2 className="text-2xl font-black text-white sm:text-3xl">
                  Richiedi il tuo prestito<br className="hidden sm:block" /> in meno di 5 minuti.
                </h2>
                <p className="mt-2 text-slate-400 sm:text-base">Simulazione gratuita, senza impegno.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/#calcolatore" className="btn-ghost-white px-6 py-3.5 text-sm">
                  Calcola la rata
                </Link>
                <Link href="/#richiedi" className="btn-cyan px-6 py-3.5 text-sm">
                  Richiedi ora
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="border-t border-white/6 py-12 sm:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Col 1 — Brand */}
            <div>
              <div className="mb-5 text-2xl font-black tracking-tight text-white">
                MO<span className="text-secondary">NIVIA</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Soluzione fintech per la richiesta di prestiti online in Italia.
                Trasparente, digitale, guidato.
              </p>
              <div className="mt-6 flex gap-3">
                {[
                  { href: siteConfig.links.facebook,  label: 'Facebook',  Icon: Facebook  },
                  { href: siteConfig.links.instagram, label: 'Instagram', Icon: Instagram },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-slate-400 transition-colors hover:border-secondary/40 hover:text-secondary"
                  >
                    <social.Icon size={16} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Servizi */}
            <div>
              <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-white">Servizi</h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-secondary">
                      <span className="h-px w-0 bg-secondary transition-all duration-300 group-hover:w-3" aria-hidden />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Azienda */}
            <div>
              <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-white">Azienda</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-secondary">
                      <span className="h-px w-0 bg-secondary transition-all duration-300 group-hover:w-3" aria-hidden />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contatti */}
            <div>
              <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-white">Contattaci</h3>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${siteConfig.contact.phone.link}`} className="group flex items-start gap-3 text-sm text-slate-500 transition-colors hover:text-secondary">
                    <Phone size={15} className="mt-0.5 shrink-0 text-secondary" />
                    {siteConfig.contact.phone.display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-start gap-3 text-sm text-slate-500 transition-colors hover:text-secondary">
                    <Mail size={15} className="mt-0.5 shrink-0 text-secondary" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-sm text-slate-500 transition-colors hover:text-secondary">
                    <MapPin size={15} className="mt-0.5 shrink-0 text-secondary" />
                    {siteConfig.contact.address}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-600">
              © 2024 Monivia S.p.A. — OAM n. M123456 — P.IVA 12345678901
            </p>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
            Messaggio pubblicitario con finalità promozionale. Per le condizioni contrattuali e i costi si rimanda ai fogli informativi disponibili in filiale e su questo sito.
            Il credito è soggetto all&apos;approvazione del finanziatore. Esempio rappresentativo: importo 10.000€, durata 60 mesi, TAN fisso 2%, TAEG 3,5%, importo rata mensile 179,50€, totale dovuto 10.770€.
          </p>
        </div>
      </div>
    </footer>
  );
}
