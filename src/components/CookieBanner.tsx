'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('monivia_cookie_consent')) setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('monivia_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('monivia_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="fixed bottom-[5rem] left-3 right-3 z-[100] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
        >
          <div className="rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary" aria-hidden>
                <Cookie size={18} />
              </div>
              <h3 className="text-base font-black text-primary">Utilizziamo i cookie</h3>
            </div>

            {/* Body */}
            <p className="mb-4 text-sm leading-relaxed text-slate-500">
              Per migliorare la tua esperienza e analizzare il traffico.{' '}
              <Link href="/cookie-policy" className="font-bold text-secondary hover:underline">
                Informativa cookie
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={acceptCookies}
                className="btn-cyan w-full py-3 text-xs uppercase tracking-widest"
              >
                Accetta tutti
              </button>
              <button
                onClick={declineCookies}
                className="btn-secondary w-full py-3 text-xs uppercase tracking-widest"
              >
                Solo necessari
              </button>
              <Link
                href="/cookie-policy"
                onClick={() => setIsVisible(false)}
                className="py-1 text-center text-xs text-slate-400 transition-colors hover:text-secondary"
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
