'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { trackAnalyticsEvent } from '@/lib/analytics-client';

const WHATSAPP_MESSAGE = encodeURIComponent('Buongiorno, vorrei informazioni su un prestito Monivia. Grazie.');

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname.startsWith('/dashboard')) return null;

  const href = `${siteConfig.contact.whatsapp.link}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAnalyticsEvent({ eventType: 'whatsapp_click', page: pathname || '/' })}
      aria-label="Contattaci su WhatsApp"
      className="group fixed bottom-[5.5rem] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={26} fill="currentColor" strokeWidth={1.5} aria-hidden />

      {/* Tooltip desktop */}
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary opacity-0 shadow-card transition-opacity group-hover:opacity-100 sm:block">
        Chatta con noi
      </span>
    </a>
  );
}

