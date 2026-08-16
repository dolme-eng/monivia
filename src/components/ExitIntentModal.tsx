'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let triggered = false;
    const handler = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 5) {
        triggered = true;
        setOpen(true);
      }
    };
    const onBeforeUnload = () => {
      if (!triggered) {
        triggered = true;
        setOpen(true);
      }
    };
    document.addEventListener('mouseout', handler);
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      document.removeEventListener('mouseout', handler);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => closeRef.current?.focus(), 100);
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handler);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const main = document.getElementById('site-content');
    if (main) main.inert = true;
    document.body.style.overflow = 'hidden';
    return () => {
      if (main) main.inert = false;
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-modal-title"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Chiudi"
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
            >
              <X size={20} />
            </button>
            <p className="text-xs font-black uppercase tracking-wider text-secondary">Non andare via!</p>
            <h2 id="exit-modal-title" className="mt-3 text-2xl font-black text-primary">
              Calcola la tua rata in 30 secondi
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Simulazione gratuita, senza impegno. Scopri subito quanto potresti risparmiare con Monivia.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/calcola"
                onClick={() => setOpen(false)}
                className="btn-cyan flex items-center justify-center gap-2"
              >
                Calcola ora <ArrowRight size={14} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm font-bold text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:rounded"
              >
                No, grazie
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
