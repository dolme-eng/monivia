import Link from 'next/link';
import { FileText, MessageSquare, Shield } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-black text-primary">
              Monivia Admin
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary"
              >
                <FileText size={16} />
                Pratiche
              </Link>
              <Link
                href="/admin/contatti"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary"
              >
                <MessageSquare size={16} />
                Contatti
              </Link>
              <Link
                href="/admin/audit-log"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary"
              >
                <Shield size={16} />
                Audit Log
              </Link>
            </nav>
          </div>
          <Link href="/" className="text-xs font-bold text-slate-400 hover:text-slate-600">
            Torna al sito
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
