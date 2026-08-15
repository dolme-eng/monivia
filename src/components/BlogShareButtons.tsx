'use client';

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function BlogShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.monivia.it/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
        <Share2 size={14} />
        Condividi
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-600"
        aria-label="Condividi su Facebook"
      >
        <Facebook size={14} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-sky-100 hover:text-sky-600"
        aria-label="Condividi su Twitter"
      >
        <Twitter size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-blue-100 hover:text-blue-700"
        aria-label="Condividi su LinkedIn"
      >
        <Linkedin size={14} />
      </a>
      <button
        onClick={handleCopy}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-secondary/10 hover:text-secondary"
        aria-label="Copia link"
      >
        <LinkIcon size={14} />
      </button>
      {copied && (
        <span className="text-xs font-bold text-green-600">Copiato!</span>
      )}
    </div>
  );
}
