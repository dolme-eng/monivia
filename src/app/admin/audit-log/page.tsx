'use client';

import { useEffect, useState, useCallback } from 'react';
import { Shield, ArrowRight } from 'lucide-react';

type AuditLog = {
  id: string;
  entity: string;
  entityId: string;
  action: string;
  details: string | null;
  adminEmail: string;
  createdAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/admin/api/audit?page=${page}&limit=50`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs);
        setPagination(data.pagination);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">Audit Log</h1>
        <p className="text-sm text-slate-500">{pagination.total} azioni registrate</p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400">Caricamento...</div>
      ) : logs.length === 0 ? (
        <div className="py-12 text-center text-slate-400">Nessuna azione registrata</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-bold text-slate-600">Data</th>
                <th className="px-4 py-3 font-bold text-slate-600">Admin</th>
                <th className="px-4 py-3 font-bold text-slate-600">Entità</th>
                <th className="px-4 py-3 font-bold text-slate-600">Azione</th>
                <th className="px-4 py-3 font-bold text-slate-600">Dettagli</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                    {new Date(log.createdAt).toLocaleString('it-IT')}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700">{log.adminEmail}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                      {log.entity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary">
                      {log.action}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-slate-500">{log.details || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => fetchLogs(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            ← Prec
          </button>
          <span className="text-sm text-slate-500">
            Pagina {pagination.page} di {pagination.pages}
          </span>
          <button
            onClick={() => fetchLogs(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
            className="rounded-lg border px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            Succ →
          </button>
        </div>
      )}
    </div>
  );
}
