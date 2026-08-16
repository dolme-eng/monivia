'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('monivia_cookie_consent')) setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const first = bannerRef.current?.querySelector<HTMLElement>('button, a[href]');
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') declineCookies();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isVisible]);

  const acceptCookies = () => {
    localStorage.setItem('monivia_cookie_consent', 'accepted');
    window.dispatchEvent(new CustomEvent('monivia:cookie-consent', { detail: 'accepted' }));
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('monivia_cookie_consent', 'declined');
    window.dispatchEvent(new CustomEvent('monivia:cookie-consent', { detail: 'declined' }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          role="alertdialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed bottom-[5rem] left-3 right-3 z-[100] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary" aria-hidden>
                <Cookie size={18} />
              </div>
              <h3 id="cookie-title" className="text-base font-black text-primary">Utilizziamo i cookie</h3>
            </div>

            {/* Body */}
            <p id="cookie-desc" className="mb-4 text-sm leading-relaxed text-slate-500">
              Per migliorare la tua esperienza e analizzare il traffico.{' '}
              <Link href="/cookie-policy" className="font-bold text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:rounded">
                Informativa cookie
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={acceptCookies}
                className="btn-cyan w-full py-3 text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              >
                Accetta tutti
              </button>
              <button
                onClick={declineCookies}
                className="btn-secondary w-full py-3 text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              >
                Solo necessari
              </button>
              <Link
                href="/cookie-policy"
                onClick={() => {
                  localStorage.setItem('monivia_cookie_consent', 'declined');
                  setIsVisible(false);
                }}
                className="py-1 text-center text-xs text-slate-500 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:rounded"
              >
                Personalizza preferenze
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
