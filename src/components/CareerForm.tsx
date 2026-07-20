'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCsrfToken } from '@/lib/csrf-client';
import { careerSchema } from '@/lib/validations';
import { ErrorMessage, fieldClass } from '@/components/form-shared';

type CareerFormValues = {
  nome: string;
  email: string;
  message: string;
  website?: string;
};

export default function CareerForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema) as Resolver<CareerFormValues>,
    defaultValues: { nome: '', email: '', message: '' },
  });

  const onSubmit = async (data: CareerFormValues) => {
    try {
      const csrfToken = await getCsrfToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          ...data,
          oggetto: 'Candidatura spontanea',
          message: `Candidatura da ${pathname || '/lavora-con-noi'}\n\n${data.message}`,
          sourcePage: pathname || '/lavora-con-noi',
          website: '',
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Errore durante l'invio");
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : "Errore durante l'invio");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 text-left">
      <input type="text" {...register('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
      <div>
        <label htmlFor="career-nome" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Nome completo *
        </label>
        <input
          id="career-nome"
          {...register('nome')}
          type="text"
          className={fieldClass(!!errors.nome)}
          placeholder="Il tuo nome"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'error-career-nome' : undefined}
        />
        <ErrorMessage id="error-career-nome" message={errors.nome?.message} />
      </div>
      <div>
        <label htmlFor="career-email" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Email *
        </label>
        <input
          id="career-email"
          {...register('email')}
          type="email"
          inputMode="email"
          className={fieldClass(!!errors.email)}
          placeholder="email@esempio.it"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'error-career-email' : undefined}
        />
        <ErrorMessage id="error-career-email" message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="career-message" className="mb-2 ml-1 block text-xs font-black uppercase tracking-widest text-slate-400">
          Presentazione breve *
        </label>
        <textarea
          id="career-message"
          {...register('message')}
          rows={5}
          className={`field-shell resize-none ${fieldClass(!!errors.message)}`}
          placeholder="Raccontaci il tuo percorso e il ruolo che ti interessa..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'error-career-message' : undefined}
        />
        <ErrorMessage id="error-career-message" message={errors.message?.message} />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting || status === 'success'}
        className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? <span role="status" aria-live="polite">Invio in corso...</span> : status === 'success' ? 'Candidatura inviata' : 'Invia candidatura'}
      </motion.button>
      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            role="status"
            aria-live="polite"
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
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-red-100 bg-red-50 p-3 text-center text-xs font-bold text-red-600"
          >
            {errorMessage || <>Errore durante l&apos;invio. Puoi scriverci a{' '}
            <a href="mailto:lavoro@monivia.it" className="text-secondary underline">
              lavoro@monivia.it
            </a>
            .</>}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
