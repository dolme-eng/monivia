'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion';

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  updatedAt?: string;
  sections: LegalSection[];
};

function TocLinks({ sections, className = '' }: { sections: LegalSection[]; className?: string }) {
  return (
    <ul className={className}>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="block whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-secondary lg:whitespace-normal"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function LegalDocument({ updatedAt, sections }: LegalDocumentProps) {
  return (
    <section className="section-pad">
      <div className="site-container">
        <nav
          className="mb-6 overflow-x-auto scrollbar-hide lg:hidden"
          aria-label="Indice del documento (mobile)"
        >
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Indice</p>
          <TocLinks sections={sections} className="flex gap-2" />
        </nav>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
          <nav
            className="surface-card top-28 hidden h-fit p-4 lg:sticky lg:block lg:p-5"
            aria-label="Indice del documento"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Indice</p>
            <TocLinks sections={sections} className="mt-4 space-y-2" />
            <Link
              href="/#richiedi"
              className="mt-6 block rounded-lg bg-secondary px-4 py-3 text-center text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-cyan-500"
            >
              Torna alla richiesta
            </Link>
          </nav>

          <motion.article
            {...fadeInUp}
            className="surface-card prose prose-slate max-w-none p-6 prose-lg sm:p-8 lg:p-10"
          >
            {updatedAt && (
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary not-prose">
                Ultimo aggiornamento: {updatedAt}
              </p>
            )}
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className={`scroll-mt-28 not-prose ${index > 0 ? 'mt-10' : 'mt-6'}`}>
                <h2 className="text-xl font-black text-primary">{section.title}</h2>
                <div className="mt-4 text-base leading-7 text-slate-600">{section.content}</div>
              </section>
            ))}
            <Link
              href="/#richiedi"
              className="not-prose mt-10 inline-flex rounded-lg bg-secondary px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white lg:hidden"
            >
              Torna alla richiesta
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
