'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { readLoanPrefill } from '@/lib/loan-prefill';

export default function StickyConversionBar() {
  const pathname = usePathname();
  const [monthly, setMonthly] = useState<number | null>(null);

  useEffect(() => {
    const sync = () => {
      const prefill = readLoanPrefill();
      setMonthly(prefill?.monthlyEstimate ?? null);
    };
    sync();
    window.addEventListener('monivia:loan-prefill', sync);
    return () => window.removeEventListener('monivia:loan-prefill', sync);
  }, [pathname]);

  const showOnHome = pathname === '/';
  const showOnProduct = pathname.startsWith('/prestiti/');
  if ((!showOnHome && !showOnProduct) || monthly === null) return null;

  const href = showOnProduct ? '#richiedi' : '/#richiedi';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white md:hidden"
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        boxShadow: '0 -8px 30px rgba(10, 22, 40, 0.12)',
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rata stimata</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black tabular-nums text-primary">
              {Math.round(monthly).toLocaleString('it-IT')}
            </p>
            <span className="text-sm font-black text-secondary">€/mese</span>
          </div>
        </div>
        <Link
          href={href}
          className="btn-cyan shrink-0 px-5 py-3 text-xs uppercase tracking-widest"
        >
          Richiedi
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
