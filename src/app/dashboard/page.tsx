import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatEuro } from '@/lib/sanitization';
import { siteConfig } from '@/config/site';

function formatDate(value: Date) {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(value);
}

function formatShortDate(value: Date) {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(value);
}

function formatEventType(value: string) {
  const labels: Record<string, string> = {
    page_view: 'Visita pagina',
    loan_form_view: 'Visualizzazione modulo prestito',
    contact_form_view: 'Visualizzazione modulo contatto',
    loan_submit: 'Richiesta prestito inviata',
    contact_submit: 'Messaggio contatto inviato',
    simulator_view: 'Visualizzazione simulatore',
    simulator_continue: 'Continua dal simulatore',
    loan_form_prefilled: 'Modulo prestito precompilato',
    cta_click: 'Clic CTA',
    offer_tab_change: 'Cambio tab offerta',
    whatsapp_click: 'Clic WhatsApp',
  };

  return labels[value] ?? value.replaceAll('_', ' ');
}

function formatStatus(value: string) {
  const labels: Record<string, string> = {
    new: 'Nuovo',
    pending: 'In attesa',
    reviewed: 'Esaminato',
    closed: 'Chiuso',
  };

  return labels[value.toLowerCase()] ?? value;
}

function MetricCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div className="surface-card p-6 sm:p-7">
      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${accent}`}>{value}</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
          Attivo
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const currentDate = new Date();
  const since30Days = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    loanTotals,
    contactCount,
    pageViewCount,
    loanFormViewCount,
    contactFormViewCount,
    loanSubmitCount,
    contactSubmitCount,
    recentLoanRequests,
    recentContactMessages,
    recentEvents,
    topPages,
  ] = await Promise.all([
    prisma.loanRequest.aggregate({
      _count: { _all: true },
      _sum: { importo: true },
      _avg: { importo: true },
    }),
    prisma.contactMessage.count(),
    prisma.analyticsEvent.count({
      where: {
        eventType: 'page_view',
        createdAt: { gte: since30Days },
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        eventType: 'loan_form_view',
        createdAt: { gte: since30Days },
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        eventType: 'contact_form_view',
        createdAt: { gte: since30Days },
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        eventType: 'loan_submit',
        createdAt: { gte: since30Days },
      },
    }),
    prisma.analyticsEvent.count({
      where: {
        eventType: 'contact_submit',
        createdAt: { gte: since30Days },
      },
    }),
    prisma.loanRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        practiceId: true,
        nome: true,
        cognome: true,
        importo: true,
        durata: true,
        impiego: true,
        status: true,
        createdAt: true,
        sourcePage: true,
      },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        nome: true,
        email: true,
        oggetto: true,
        status: true,
        createdAt: true,
        sourcePage: true,
      },
    }),
    prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: since30Days },
      },
      orderBy: { createdAt: 'desc' },
      take: 8,
      select: {
        eventType: true,
        page: true,
        label: true,
        createdAt: true,
      },
    }),
    prisma.analyticsEvent.groupBy({
      by: ['page'],
      where: {
        eventType: 'page_view',
        createdAt: { gte: since30Days },
      },
      _count: { _all: true },
    }),
  ]);

  const totalLoanRequests = loanTotals._count._all;
  const totalLoanAmount = loanTotals._sum.importo ?? 0;
  const averageLoanAmount = loanTotals._avg.importo ?? 0;
  const conversionRate = pageViewCount > 0 ? ((loanSubmitCount / pageViewCount) * 100).toFixed(1) : '0.0';
  const formCompletionRate = loanFormViewCount > 0 ? ((loanSubmitCount / loanFormViewCount) * 100).toFixed(1) : '0.0';
  const contactToViewRate = contactFormViewCount > 0 ? ((contactSubmitCount / contactFormViewCount) * 100).toFixed(1) : '0.0';
  const topPagesSorted = [...topPages].sort((left, right) => right._count._all - left._count._all).slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-primary text-white">
        <div className="site-container section-pad">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1f35] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-secondary">
                Centro operativo Monivia
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Cruscotto collegato alla base dati
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
                Panoramica di richieste, messaggi e conversioni registrate dal sito, con dati reali della base.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-[#0f1f35] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Stato</p>
              <p className="mt-2 text-2xl font-black text-white">Operativo</p>
              <p className="mt-2 text-sm text-white/65">{siteConfig.name} · {formatShortDate(currentDate)}</p>
              <form action="/api/auth/logout" method="post" className="mt-4">
                <button
                  type="submit"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  Esci
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="/api/dashboard/export?kind=loans"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  CSV prestiti
                </a>
                <a
                  href="/api/dashboard/export?kind=contacts"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  CSV messaggi
                </a>
                <a
                  href="/api/dashboard/export?kind=events"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  CSV analisi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container space-y-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Visite pagina (30 gg)"
              value={pageViewCount.toLocaleString('it-IT')}
              hint="Visite rilevate dal sistema di analisi."
              accent="text-secondary"
            />
            <MetricCard
              label="Form prestito"
              value={loanFormViewCount.toLocaleString('it-IT')}
              hint="Visite del modulo prestito negli ultimi 30 giorni."
              accent="text-primary"
            />
            <MetricCard
              label="Conversioni prestito"
              value={loanSubmitCount.toLocaleString('it-IT')}
              hint={`Tasso di conversione: ${conversionRate}%`}
              accent="text-emerald-600"
            />
            <MetricCard
              label="Messaggi contatto"
              value={contactCount.toLocaleString('it-IT')}
              hint={`Tasso modulo contatto: ${contactToViewRate}%`}
              accent="text-amber-600"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="surface-card p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Performance</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-primary">Indicatori commerciali</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  30 giorni
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Importo totale</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-primary">{formatEuro(totalLoanAmount, 0)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Importo medio</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-primary">{formatEuro(averageLoanAmount, 0)}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Punteggio percorso</p>
                  <p className="mt-3 text-2xl font-black tracking-tight text-primary">{formCompletionRate}%</p>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-sm font-black uppercase tracking-widest text-slate-500">Pagine più viste</p>
                </div>
                <div className="divide-y divide-slate-200">
                  {topPagesSorted.length > 0 ? (
                    topPagesSorted.map((page) => (
                      <div key={page.page} className="flex items-center justify-between gap-4 px-5 py-4">
                        <div>
                          <p className="text-sm font-bold text-primary">{page.page}</p>
                          <p className="mt-1 text-xs text-slate-500">Traffico organico e diretto</p>
                        </div>
                        <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-black text-secondary">
                          {page._count._all.toLocaleString('it-IT')}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-sm text-slate-500">Nessun dato sulle visite pagina per il momento.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="surface-card p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Pipeline</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-primary">Ultima attività</h2>

              <div className="mt-6 space-y-4">
                {recentEvents.length > 0 ? (
                  recentEvents.map((event) => (
                    <div key={`${event.eventType}-${event.createdAt.toISOString()}-${event.page}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-primary">{formatEventType(event.eventType)}</p>
                          <p className="mt-1 text-xs text-slate-500">{event.page}</p>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {formatDate(event.createdAt)}
                        </span>
                      </div>
                      {event.label ? <p className="mt-3 text-sm text-slate-600">{event.label}</p> : null}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Gli eventi appariranno qui dopo le prime visite.</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="surface-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Richieste</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-primary">Prestiti recenti</h2>
                </div>
                <span className="text-sm font-bold text-slate-400">{totalLoanRequests.toLocaleString('it-IT')} totale</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                {recentLoanRequests.length > 0 ? (
                  <div className="divide-y divide-slate-200">
                    {recentLoanRequests.map((request) => (
                      <div key={request.practiceId} className="grid gap-3 px-5 py-4 sm:grid-cols-[1.4fr_0.8fr_0.8fr] sm:items-center">
                        <div>
                          <p className="text-sm font-bold text-primary">{request.nome} {request.cognome}</p>
                          <p className="mt-1 text-xs text-slate-500">{request.practiceId} · {request.impiego}</p>
                        </div>
                        <div>
                          <p className="text-sm font-black text-primary">{formatEuro(request.importo, 0)}</p>
                          <p className="mt-1 text-xs text-slate-500">{request.durata} mesi</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-700">
                            {formatStatus(request.status)}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">{formatDate(request.createdAt)}</p>
                        </div>
                        <p className="text-xs text-slate-400 sm:col-span-3">
                          Fonte: {request.sourcePage || '/'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-10 text-sm text-slate-500">Nessuna richiesta di prestito per il momento.</div>
                )}
              </div>
            </div>

            <div className="surface-card p-6 sm:p-8 lg:p-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Assistenza</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-primary">Messaggi recenti</h2>
                </div>
                <span className="text-sm font-bold text-slate-400">{contactCount.toLocaleString('it-IT')} totale</span>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                {recentContactMessages.length > 0 ? (
                  <div className="divide-y divide-slate-200">
                    {recentContactMessages.map((message) => (
                      <div key={`${message.email}-${message.createdAt.toISOString()}`} className="px-5 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-primary">{message.nome}</p>
                            <p className="mt-1 text-xs text-slate-500">{message.oggetto}</p>
                          </div>
                          <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-secondary">
                            {formatStatus(message.status)}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">{message.email}</p>
                        <p className="mt-2 text-xs text-slate-400">
                          {formatDate(message.createdAt)} · Fonte: {message.sourcePage || '/contatti'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-10 text-sm text-slate-500">Nessun messaggio ricevuto per il momento.</div>
                )}
              </div>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-secondary">Conversione</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight text-primary">Lettura rapida del percorso</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">Visite pagina {pageViewCount}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Form prestito {loanFormViewCount}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Prestiti inviati {loanSubmitCount}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Contatti inviati {contactSubmitCount}</span>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-500">
              Il cruscotto utilizza i dati reali di LoanRequest, ContactMessage e AnalyticsEvent. È la base operativa per gestire stati, priorità ed esportazioni interne.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pb-4">
            <Link href="/" className="text-sm font-bold text-secondary transition-colors hover:text-primary">
              ← Torna al sito
            </Link>
            <span className="text-xs text-slate-400">Monivia · {siteConfig.url}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
