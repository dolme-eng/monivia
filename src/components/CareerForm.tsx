'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalyticsSessionId } from '@/lib/analytics-client';

export default function CareerForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.currentTarget);
    const nome = String(formData.get('nome') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const payload = {
      nome,
      email,
      oggetto: 'Candidatura spontanea',
      message: `Candidatura da ${pathname || '/lavora-con-noi'}\n\n${message}`,
      analyticsSessionId: getAnalyticsSessionId(),
      sourcePage: pathname || '/lavora-con-noi',
      website: '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error();
      setStatus('success');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="sr-only" />
      <div>
        <label htmlFor="career-nome" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Nome completo
        </label>
        <input id="career-nome" name="nome" type="text" required className="field-shell" placeholder="Il tuo nome" />
      </div>
      <div>
        <label htmlFor="career-email" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Email
        </label>
        <input id="career-email" name="email" type="email" required className="field-shell" placeholder="email@esempio.it" />
      </div>
      <div>
        <label htmlFor="career-message" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Presentazione breve
        </label>
        <textarea
          id="career-message"
          name="message"
          rows={5}
          required
          minLength={20}
          className="field-shell resize-none"
          placeholder="Raccontaci il tuo percorso e il ruolo che ti interessa..."
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest"
      >
        {status === 'loading' ? 'Invio in corso...' : status === 'success' ? 'Candidatura inviata' : 'Invia candidatura'}
      </motion.button>
      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-center text-xs font-bold text-emerald-700"
          >
            Grazie! Esamineremo il tuo profilo e ti ricontatteremo se c&apos;è un&apos;opportunità adatta.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-100 bg-red-50 p-3 text-center text-xs font-bold text-red-600"
          >
            Errore durante l&apos;invio. Puoi scriverci a{' '}
            <a href="mailto:lavoro@monivia.it" className="text-secondary underline">
              lavoro@monivia.it
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
