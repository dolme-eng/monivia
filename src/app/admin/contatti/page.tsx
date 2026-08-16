'use client';

import { useEffect, useState, useCallback } from 'react';
import { Trash2, Mail, MailOpen, User } from 'lucide-react';

type ContactMessage = {
  id: string;
  nome: string;
  email: string;
  oggetto: string;
  message: string;
  sourcePage: string;
  createdAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/admin/api/contacts?page=${page}&limit=20`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setPagination(data.pagination);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questo messaggio?')) return;
    const csrfToken = document.cookie.match(/csrf_token=([^;]+)/)?.[1] || '';
    await fetch(`/admin/api/contacts/${id}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': csrfToken },
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary">Messaggi di contatto</h1>
          <p className="text-sm text-slate-500">{pagination.total} messaggi ricevuti</p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400">Caricamento...</div>
      ) : messages.length === 0 ? (
        <div className="py-12 text-center text-slate-400">Nessun messaggio</div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`cursor-pointer rounded-xl border bg-white p-4 transition-all hover:shadow-sm ${
                selectedMessage?.id === msg.id ? 'border-secondary' : 'border-slate-100'
              }`}
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{msg.nome}</p>
                    <p className="text-sm text-slate-400">{msg.email}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg.id);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="mt-2 font-bold text-slate-700">{msg.oggetto}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{msg.message}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                <span>{new Date(msg.createdAt).toLocaleDateString('it-IT')}</span>
                <span>Pagina: {msg.sourcePage}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedMessage(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-primary">{selectedMessage.oggetto}</h2>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>Da:</strong> {selectedMessage.nome} ({selectedMessage.email})</p>
              <p><strong>Data:</strong> {new Date(selectedMessage.createdAt).toLocaleString('it-IT')}</p>
              <p><strong>Pagina:</strong> {selectedMessage.sourcePage}</p>
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <a href={`mailto:${selectedMessage.email}`} className="btn-cyan text-sm">
                <Mail size={14} className="mr-1 inline" /> Rispondi via email
              </a>
            </div>
          </div>
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => fetchMessages(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="rounded-lg border px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            ← Prec
          </button>
          <span className="text-sm text-slate-500">
            Pagina {pagination.page} di {pagination.pages}
          </span>
          <button
            onClick={() => fetchMessages(pagination.page + 1)}
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
