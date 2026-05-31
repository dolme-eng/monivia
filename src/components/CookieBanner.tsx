'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('monivia_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
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
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl shadow-black/40 px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-5">
            {/* Icon */}
            <div className="w-10 h-10 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>

            {/* Text */}
            <div className="grow text-sm text-slate-300 leading-relaxed">
              <span className="font-black text-white">Cookie </span>
              Utilizziamo i cookie per migliorare la tua esperienza. Consulta la{' '}
              <Link href="/cookie-policy" className="text-secondary hover:underline font-bold">Cookie Policy</Link>
              {' '}e la{' '}
              <Link href="/privacy-policy" className="text-secondary hover:underline font-bold">Privacy Policy</Link>.
            </div>

            {/* Actions */}
            <div className="flex gap-3 shrink-0 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={declineCookies}
                className="flex-1 md:flex-none px-5 py-2.5 border border-white/10 rounded-xl text-xs font-bold text-white/60 hover:text-white hover:border-white/20 transition-colors"
              >
                Solo necessari
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={acceptCookies}
                className="flex-1 md:flex-none px-5 py-2.5 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-secondary/30 hover:bg-emerald-400 transition-colors"
              >
                Accetta Tutti
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

