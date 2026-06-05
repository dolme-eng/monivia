import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={13} className="shrink-0 text-slate-300" aria-hidden />}
              {isLast || !item.href ? (
                <span className="font-bold text-primary" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="font-medium text-slate-500 transition-colors hover:text-secondary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
