'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/config/faq';

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-secondary/30"
        >
          <button
            id={`faq-btn-${i}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
            aria-expanded={openIndex === i}
            aria-controls={`faq-panel-${i}`}
          >
            <span className="text-sm font-bold text-slate-900 sm:text-base">
              {item.question}
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                openIndex === i ? 'rotate-180 text-secondary' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="px-6 pb-5 text-sm leading-relaxed text-slate-500"
                >
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
