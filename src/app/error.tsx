'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-4 py-24 text-white">
        <div className="relative z-10 mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#0f1f35] text-red-400">
            <AlertCircle size={48} />
          </div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Qualcosa è andato storto
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Si è verificato un errore imprevisto durante l&apos;elaborazione della tua richiesta.
            Il nostro team è stato notificato.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => reset()} className="btn-secondary inline-flex items-center gap-2 px-8 py-4">
              <RotateCcw size={18} />
              Riprova
            </button>
            <Link href="/" className="btn-cyan px-8 py-4">
              Torna alla home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
