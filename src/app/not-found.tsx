'use client';

import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-4 py-24 text-white">
        <div className="relative z-10 mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#0f1f35] text-secondary">
            <FileQuestion size={48} />
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-bold">Pagina non trovata</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            La pagina che stai cercando potrebbe essere stata rimossa,
            aver cambiato nome, o essere temporaneamente non disponibile.
          </p>
          <div className="mt-10">
            <Link href="/" className="btn-cyan inline-flex items-center gap-2 px-8 py-4">
              <ArrowLeft size={18} />
              Torna alla home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
