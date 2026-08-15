'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Phone } from 'lucide-react';
import { faqItems, FAQ_CATEGORIES, type FaqCategory } from '@/config/faq';
import FaqAccordion from '@/components/FaqAccordion';

export default function FaqClient() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'Tutte'>('Tutte');

  const filteredItems = activeCategory === 'Tutte'
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary pb-16 pt-32 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-secondary">
            Assistenza
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Domande{' '}
            <span className="text-secondary">frequenti</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Trova le risposte alle domande più comuni sui nostri prestiti e servizi.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-16">
        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('Tutte')}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              activeCategory === 'Tutte'
                ? 'bg-secondary text-primary'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Tutte ({faqItems.length})
          </button>
          {FAQ_CATEGORIES.map((cat) => {
            const count = faqItems.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-secondary text-primary'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <FaqAccordion items={filteredItems} />

        {/* Contact CTA */}
        <div className="mt-16 rounded-2xl bg-slate-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-xl font-black text-slate-900">Non trovi la risposta?</h2>
          <p className="mt-2 text-sm text-slate-500">
            La nostra squadra è pronta ad aiutarti. Contattaci e ti risponderemo entro 48 ore.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contatti" className="btn-cyan inline-flex items-center gap-2">
              Contattaci
            </Link>
            <a href="tel:+393508533366" className="btn-secondary inline-flex items-center gap-2">
              <Phone size={16} />
              +39 350 853 3366
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
