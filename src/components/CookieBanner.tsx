'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice, use setTimeout to avoid synchronous setState warning
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('finora_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('finora_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('finora_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 p-6 z-100 text-slate-300 shadow-2xl flex items-center justify-center">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm">
          <p className="font-bold text-white mb-2 text-base">Informativa sui Cookie</p>
          <p className="leading-relaxed">
            Utilizziamo i cookie per migliorare la tua esperienza di navigazione, offrirti contenuti personalizzati e analizzare il traffico del sito. 
            Puoi scegliere di accettare tutti i cookie o gestire le tue preferenze. Per maggiori informazioni, consulta la nostra{' '}
            <Link href="/cookie-policy" className="text-secondary hover:underline font-bold">Cookie Policy</Link> e la{' '}
            <Link href="/privacy-policy" className="text-secondary hover:underline font-bold">Privacy Policy</Link>.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 w-full md:w-auto">
          <button 
            onClick={declineCookies} 
            className="px-6 py-3 border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors w-full md:w-auto text-center"
          >
            Solo necessari
          </button>
          <button 
            onClick={acceptCookies} 
            className="px-6 py-3 bg-secondary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-500 transition-colors shadow-lg shadow-secondary/20 w-full md:w-auto text-center"
          >
            Accetta Tutti
          </button>
        </div>
      </div>
    </div>
  );
}
