'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  FileText,
  Clock,
  Loader2,
  User,
  Euro,
  Calendar,
  ArrowUpDown,
} from 'lucide-react';

interface LoanApplication {
  id: string;
  practiceId: string;
  importo: number;
  durata: number;
  impiego: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  codiceFiscale: string;
  reddito: number;
  finalita: string;
  anzianita: number;
  sourcePage: string;
  status: string;
  notes: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  REVIEWED: 'bg-blue-50 text-blue-700 border-blue-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  REJECTED: 'bg-red-50 text-red-700 border-red-200',
  CONTACTED: 'bg-purple-50 text-purple-700 border-purple-200',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'In attesa',
  REVIEWED: 'Esaminata',
  APPROVED: 'Approvata',
  REJECTED: 'Rifiutata',
  CONTACTED: 'Contattato',
};

export default function AdminLoansPage() {
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchApplications = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      if (search.trim()) params.set('q', search.trim());

      const res = await fetch(`/admin/api/loans?${params}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
        setPagination(data.pagination);
      }
    } catch {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications]);

  const updateStatus = async (id: string, status: string, notes?: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/admin/api/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes, reviewedBy: 'Admin' }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, ...data.application } : app))
        );
        if (selectedApp?.id === id) {
          setSelectedApp({ ...selectedApp, ...data.application });
        }
      }
    } catch {
      console.error('Failed to update');
    } finally {
      setUpdating(false);
    }
  };

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText size={28} className="text-secondary" />
            <h1 className="text-2xl font-black">Dashboard Pratiche</h1>
          </div>
          <p className="text-white/60 text-sm">Gestione delle richieste di prestito</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          {['ALL', 'PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`p-4 rounded-xl border text-left transition-all ${
                statusFilter === s
                  ? 'border-secondary bg-secondary/5 shadow-md'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                {s === 'ALL' ? 'Tutte' : STATUS_LABELS[s]}
              </p>
              <p className="text-2xl font-black text-primary mt-1">
                {s === 'ALL' ? pagination.total : '—'}
              </p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cerca per nome, email, CF o ID pratica..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchApplications(1)}
              />
            </div>
            <button
              onClick={() => fetchApplications(1)}
              className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-black hover:bg-slate-800 transition-colors"
            >
              Cerca
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-secondary" />
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={40} className="text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Nessuna pratica trovata</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400">Pratica</th>
                      <th className="text-left px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400">Cliente</th>
                      <th className="text-left px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400 hidden sm:table-cell">Importo</th>
                      <th className="text-left px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400 hidden md:table-cell">Data</th>
                      <th className="text-left px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400">Stato</th>
                      <th className="text-right px-4 py-3 font-black text-[11px] uppercase tracking-widest text-slate-400">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono text-xs text-secondary font-bold">{app.practiceId}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-black text-primary">{app.nome} {app.cognome}</p>
                          <p className="text-xs text-slate-400">{app.email}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="font-black text-primary">{formatCurrency(app.importo)}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs text-slate-500">{formatDate(app.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-1 rounded-full text-[11px] font-black border ${STATUS_COLORS[app.status]}`}>
                            {STATUS_LABELS[app.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                            aria-label="Dettagli"
                          >
                            <Eye size={14} className="text-slate-400" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
                  <p className="text-xs text-slate-400">
                    {pagination.total} risultati — pagina {pagination.page} di {pagination.pages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fetchApplications(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={() => fetchApplications(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="p-2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedApp(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-secondary">{selectedApp.practiceId}</span>
                  <h2 className="text-xl font-black text-white mt-1">{selectedApp.nome} {selectedApp.cognome}</h2>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact */}
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Contatti</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href={`mailto:${selectedApp.email}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <Mail size={16} className="text-secondary" />
                    <span className="text-sm text-primary">{selectedApp.email}</span>
                  </a>
                  <a href={`tel:${selectedApp.telefono}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <Phone size={16} className="text-secondary" />
                    <span className="text-sm text-primary">{selectedApp.telefono}</span>
                  </a>
                </div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Dettagli</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Importo</p>
                    <p className="text-lg font-black text-primary">{formatCurrency(selectedApp.importo)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Durata</p>
                    <p className="text-lg font-black text-primary">{selectedApp.durata} mesi</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Reddito</p>
                    <p className="text-lg font-black text-primary">{formatCurrency(selectedApp.reddito)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Impiego</p>
                    <p className="text-sm font-bold text-primary">{selectedApp.impiego}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Finalità</p>
                    <p className="text-sm font-bold text-primary">{selectedApp.finalita}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] font-black uppercase text-slate-400">Anzianità</p>
                    <p className="text-sm font-bold text-primary">{selectedApp.anzianita} anni</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 col-span-2 sm:col-span-3">
                    <p className="text-[10px] font-black uppercase text-slate-400">Codice Fiscale</p>
                    <p className="font-mono text-sm font-bold text-primary">{selectedApp.codiceFiscale}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Note</h3>
                <textarea
                  className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
                  rows={3}
                  placeholder="Aggiungi note..."
                  defaultValue={selectedApp.notes || ''}
                  onBlur={(e) => updateStatus(selectedApp.id, selectedApp.status, e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {selectedApp.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'APPROVED')}
                      disabled={updating}
                      className="flex items-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl text-sm font-black hover:bg-emerald-600 transition-colors min-h-[44px]"
                    >
                      <CheckCircle2 size={14} /> Approva
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'REJECTED')}
                      disabled={updating}
                      className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-black hover:bg-red-600 transition-colors min-h-[44px]"
                    >
                      <XCircle size={14} /> Rifiuta
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'CONTACTED')}
                      disabled={updating}
                      className="flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl text-sm font-black hover:bg-purple-600 transition-colors min-h-[44px]"
                    >
                      <Phone size={14} /> Contattato
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApp.id, 'REVIEWED')}
                      disabled={updating}
                      className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl text-sm font-black hover:bg-blue-600 transition-colors min-h-[44px]"
                    >
                      <Eye size={14} /> Esamina
                    </button>
                  </>
                )}
                {selectedApp.status !== 'PENDING' && (
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'PENDING')}
                    disabled={updating}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-200 text-slate-700 rounded-xl text-sm font-black hover:bg-slate-300 transition-colors min-h-[44px]"
                  >
                    <ArrowUpDown size={14} /> Ripristina a In attesa
                  </button>
                )}
              </div>

              {/* Meta */}
              <div className="text-[11px] text-slate-400 space-y-1">
                <p>Ricevuta: {formatDate(selectedApp.createdAt)}</p>
                {selectedApp.reviewedAt && <p>Esaminata: {formatDate(selectedApp.reviewedAt)}</p>}
                {selectedApp.reviewedBy && <p>Da: {selectedApp.reviewedBy}</p>}
                <p>Pagina: {selectedApp.sourcePage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
