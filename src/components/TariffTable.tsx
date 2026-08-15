import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { loanProducts, loanSlugs } from '@/config/loans';
import { calculateLoan } from '@/utils/finance';

export default function TariffTable() {
  return (
    <div className="relative">
      <div className="overflow-x-auto">
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent sm:hidden" />
      <table className="w-full min-w-[700px] border-collapse">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
              Prodotto
            </th>
            <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-500">
              TAN
            </th>
            <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-500">
              Importo max
            </th>
            <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-500">
              Durata max
            </th>
            <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-500">
              Rata* (esempio)
            </th>
            <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
              Vantaggi
            </th>
            <th className="px-4 py-4" />
          </tr>
        </thead>
        <tbody>
          {loanSlugs.map((slug) => {
            const p = loanProducts[slug];
            const example = calculateLoan(30000, 48, true, p.tan, p.insuranceRate);
            return (
              <tr key={slug} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                <td className="px-4 py-5">
                  <p className="font-bold text-slate-900">{p.shortTitle}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{p.description}</p>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-lg font-black text-secondary">{(p.tan * 100).toFixed(1)}%</span>
                </td>
                <td className="px-4 py-5 text-center text-sm font-bold text-slate-700">
                  {slug === 'immobiliare' ? '500.000€' : slug === 'personale' ? '100.000€' : slug === 'consolidamento' ? '200.000€' : '50.000€'}
                </td>
                <td className="px-4 py-5 text-center text-sm font-bold text-slate-700">
                  {slug === 'immobiliare' ? '360 mesi' : slug === 'business' ? '120 mesi' : '84 mesi'}
                </td>
                <td className="px-4 py-5 text-center">
                  <span className="text-sm font-black text-primary">{example.monthly.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€</span>
                  <span className="block text-[10px] text-slate-400">/mese</span>
                </td>
                <td className="px-4 py-5">
                  <ul className="space-y-1">
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Check size={12} className="shrink-0 text-green-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-5">
                  <Link href={`/prestiti/${slug}`} className="btn-cyan flex items-center gap-1 text-xs">
                    Dettagli
                    <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
