'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/dashboard';
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      rememberMe: formData.get('rememberMe') === 'on',
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success: true } | { success: false; error?: string };

      if (!response.ok || !('success' in result) || !result.success) {
        throw new Error(result && 'error' in result && result.error ? result.error : 'Accesso rifiutato');
      }

      router.replace(nextPath);
      router.refresh();
    } catch (loginError) {
      setStatus('error');
      setError(loginError instanceof Error ? loginError.message : 'Accesso rifiutato');
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-primary text-white">
      <div className="site-container relative z-10 flex min-h-screen flex-col justify-center py-16">
        {/* Back link */}
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-white/50 transition-colors hover:text-white">
          <ArrowLeft size={15} />
          Torna alla home
        </Link>

        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
          {/* Colonna testo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className="text-4xl font-black tracking-tight">
              MO<span className="text-secondary">NIVIA</span>
            </div>
            <div className="badge-dark mt-6 inline-flex">Area riservata</div>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Accedi per<br />gestire le richieste.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
              Accesso riservato per consultare le richieste, seguire gli stati e
              gestire il trattamento dal cruscotto interno.
            </p>
          </motion.div>

          {/* Card login */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.07 }}
            className="rounded-xl border border-white/15 bg-[#0f1f35] p-6 sm:p-8 lg:p-10"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <Lock size={26} />
              </div>
              <h2 className="text-2xl font-black text-white">Accesso sicuro</h2>
              <p className="mt-1.5 text-sm text-white/45">Accedi con le tue credenziali amministratore.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-white/50">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@monivia.it"
                  className="w-full rounded-lg border border-white/15 bg-primary p-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="mb-2 block ml-1 text-xs font-black uppercase tracking-widest text-white/50">
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/15 bg-primary p-4 text-white outline-none transition-all placeholder:text-white/30 focus:border-secondary focus:ring-2 focus:ring-secondary/30"
                  required
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/45 transition-colors hover:text-white">
                  <input name="rememberMe" type="checkbox" className="accent-secondary" />
                  Mantieni l&apos;accesso
                </label>
                <span className="text-xs font-bold text-secondary">Sessione privata</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="btn-cyan w-full py-4 text-sm uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'Accesso in corso...' : 'Accedi al cruscotto'}
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-red-400/20 bg-red-500/10 p-4 text-center text-sm font-bold text-red-300"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-white/35">
                Hai bisogno di aiuto?{' '}
                <Link href="/contatti" className="font-bold text-secondary hover:underline">
                  Contatta l&apos;assistenza
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
