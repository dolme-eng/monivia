'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Share2,
} from 'lucide-react';
import { calculateLoan } from '@/utils/finance';
import { saveLoanPrefill } from '@/lib/loan-prefill';
import { loanProducts, loanSlugs, type LoanSlug } from '@/config/loans';

const MIN_AMOUNT = 5000;
const MAX_AMOUNT = 1000000;
const MIN_MONTHS = 12;
const MAX_MONTHS = 360;

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString('it-IT')
  );
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

const productColors: Record<LoanSlug, string> = {
  personale: 'bg-blue-500',
  auto: 'bg-emerald-500',
  immobiliare: 'bg-violet-500',
  consolidamento: 'bg-amber-500',
  business: 'bg-rose-500',
};

const productMaxAmount: Record<LoanSlug, number> = {
  personale: 100000,
  auto: 50000,
  immobiliare: 500000,
  consolidamento: 200000,
  business: 50000,
};

const productMaxMonths: Record<LoanSlug, number> = {
  personale: 84,
  auto: 84,
  immobiliare: 360,
  consolidamento: 120,
  business: 120,
};

export default function LoanCalculatorFull() {
  const [selectedProduct, setSelectedProduct] = useState<LoanSlug>('personale');
  const [amount, setAmount] = useState(30000);
  const [amountInput, setAmountInput] = useState('30000');
  const [months, setMonths] = useState(48);
  const [insurance, setInsurance] = useState(true);

  const product = loanProducts[selectedProduct];
  const maxAmt = productMaxAmount[selectedProduct];
  const maxMon = productMaxMonths[selectedProduct];

  const { monthly, totalDue, totalInterest, taeg, tan } = calculateLoan(
    amount,
    months,
    insurance,
    product.tan,
    product.insuranceRate,
  );

  const handleProductChange = (slug: LoanSlug) => {
    setSelectedProduct(slug);
    const newMax = productMaxAmount[slug];
    const newMonths = productMaxMonths[slug];
    if (amount > newMax) {
      setAmount(newMax);
      setAmountInput(String(newMax));
    }
    if (months > newMonths) setMonths(newMonths);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setAmountInput(raw);
    const value = Number(raw);
    if (!Number.isNaN(value) && raw !== '' && value <= maxAmt) {
      setAmount(Math.max(MIN_AMOUNT, value));
    }
  };

  const handleAmountBlur = () => {
    const value = Number(amountInput);
    const clamped = Number.isNaN(value) ? MIN_AMOUNT : Math.min(maxAmt, Math.max(MIN_AMOUNT, value));
    setAmount(clamped);
    setAmountInput(String(clamped));
  };

  const handleContinue = () => {
    saveLoanPrefill({
      importo: Math.max(MIN_AMOUNT, Math.min(maxAmt, amount)),
      durata: months,
      insurance,
      monthlyEstimate: monthly,
      source: 'calculator',
    });
    window.location.href = '/#richiedi';
  };

  const handleShare = async () => {
    const text = `Simulazione prestito Monivia: ${amount.toLocaleString('it-IT')}€ in ${months} mesi — rata ${monthly.toFixed(0)}€/mese`;
    if (navigator.share) {
      await navigator.share({ title: 'Monivia', text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  // Comparison data for all products
  const comparison = loanSlugs.map((slug) => {
    const p = loanProducts[slug];
    const ex = calculateLoan(amount, months, true, p.tan, p.insuranceRate);
    return { slug, ...p, ...ex };
  });

  return (
    <div className="space-y-8">
      {/* Product selector */}
      <div>
        <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-400">Tipo di prestito</p>
        <div className="flex flex-wrap gap-2">
          {loanSlugs.map((slug) => {
            const p = loanProducts[slug];
            const active = slug === selectedProduct;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => handleProductChange(slug)}
                className={`relative rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                  active
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {p.shortTitle}
                {active && <span className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${productColors[slug]}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Amount */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Importo</p>
              <p className="mt-1 text-sm text-slate-500">Quanto ti serve?</p>
            </div>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={amountInput}
                min={MIN_AMOUNT}
                max={maxAmt}
                step={1000}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                className="w-24 bg-transparent text-right text-2xl font-black tabular-nums text-primary outline-none"
                aria-label="Importo prestito in euro"
              />
              <span className="text-lg font-black text-secondary">€</span>
            </div>
          </div>
          <input
            type="range"
            min={MIN_AMOUNT}
            max={maxAmt}
            step={1000}
            value={Math.max(MIN_AMOUNT, Math.min(maxAmt, amount))}
            onChange={(e) => {
              const v = Number(e.target.value);
              setAmount(v);
              setAmountInput(String(v));
            }}
            className="w-full accent-secondary"
            aria-label="Importo prestito"
          />
          <div className="mt-2 flex justify-between text-[10px] font-black text-slate-400">
            <span>5.000€</span>
            <span>{maxAmt.toLocaleString('it-IT')}€</span>
          </div>
        </div>

        {/* Duration */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Durata</p>
              <p className="mt-1 text-sm text-slate-500">Adatta la rata</p>
            </div>
            <p className="text-2xl font-black text-primary">
              {months}
              <span className="ml-1 text-sm text-slate-400">mesi</span>
            </p>
          </div>
          <input
            type="range"
            min={MIN_MONTHS}
            max={maxMon}
            step={12}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-secondary"
            aria-label="Durata prestito"
          />
          <div className="mt-2 flex justify-between text-[10px] font-black text-slate-400">
            <span>12 mesi</span>
            <span>{maxMon} mesi</span>
          </div>
        </div>

        {/* Insurance toggle */}
        <button
          type="button"
          onClick={() => setInsurance((v) => !v)}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all hover:border-secondary/40 hover:shadow-md"
          aria-pressed={insurance}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  insurance ? 'bg-secondary/10 text-secondary' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">Assicurazione</p>
                <p className="mt-1 text-sm font-bold text-primary">
                  {insurance ? 'Inclusa' : 'Non inclusa'}
                </p>
              </div>
            </div>
            <span
              className={`flex h-7 w-12 rounded-full p-0.5 transition-colors ${
                insurance ? 'bg-secondary' : 'bg-slate-200'
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                  insurance ? 'translate-x-5' : ''
                }`}
              />
            </span>
          </div>
        </button>

        {/* Result */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-white">
          <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10" />
          <div className="relative flex h-full flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-white/40">Rata mensile stimata</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">
                  <AnimatedNumber value={monthly} />
                </span>
                <span className="text-xl font-black text-secondary">€</span>
                <span className="text-sm text-white/50">/mese</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">TAN</p>
                  <p className="text-sm font-bold">{(tan * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">TAEG indicativo</p>
                  <p className="text-sm font-bold">{(taeg * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Totale rimborsato</p>
                  <p className="text-sm font-bold">{totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-white/40">Totale interessi</p>
                  <p className="text-sm font-bold">{totalInterest.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button
                type="button"
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-cyan flex-1 text-sm"
              >
                Richiedi ora <ArrowRight size={14} />
              </motion.button>
              <motion.button
                type="button"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Condividi simulazione"
              >
                <Share2 size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-secondary" />
          <h3 className="text-sm font-black text-slate-900">Confronto prodotti</h3>
          <span className="text-xs text-slate-400">— stesso importo e durata</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-3 py-2 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">Prodotto</th>
                <th className="px-3 py-2 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">TAN</th>
                <th className="px-3 py-2 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">Rata</th>
                <th className="px-3 py-2 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">Totale</th>
                <th className="px-3 py-2 text-center text-[10px] font-black uppercase tracking-wider text-slate-400">Interessi</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => {
                const active = c.slug === selectedProduct;
                return (
                  <tr
                    key={c.slug}
                    className={`border-b border-slate-50 transition-colors ${
                      active ? 'bg-secondary/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${productColors[c.slug]}`} />
                        <span className={`font-bold ${active ? 'text-primary' : 'text-slate-700'}`}>{c.shortTitle}</span>
                        {active && <span className="rounded bg-secondary/10 px-1.5 py-0.5 text-[9px] font-black text-secondary">ATTIVO</span>}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center font-bold text-slate-600">{(c.tan * 100).toFixed(1)}%</td>
                    <td className="px-3 py-3 text-center font-black text-primary">
                      {c.monthly.toFixed(0)}€
                    </td>
                    <td className="px-3 py-3 text-center font-bold text-slate-600">
                      {c.totalDue.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
                    </td>
                    <td className="px-3 py-3 text-center text-slate-500">
                      {c.totalInterest.toLocaleString('it-IT', { maximumFractionDigits: 0 })}€
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info note */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <p className="font-bold">Nota</p>
        <p className="mt-1">
          I risultati sono indicativi e soggetti a valutazione del merito creditizio.
          Il TAEG indicativo include stima dei costi accessori (spese istruttoria, assicurazione).
          Il TAEG è un tasso effettivo che include interessi, spese accessorie e costi del servizio di intermediazione creditizia.
        </p>
      </div>
    </div>
  );
}
