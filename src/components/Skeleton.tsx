export function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 animate-pulse rounded bg-slate-200 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-slate-100 bg-white p-6 ${className}`} aria-hidden="true">
      <SkeletonBlock className="mb-4 h-6 w-1/3" />
      <SkeletonText lines={2} className="mb-4" />
      <SkeletonBlock className="h-10 w-full" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header skeleton */}
      <div className="fixed left-0 top-0 z-50 w-full border-b border-slate-100 bg-white">
        <div className="site-container flex h-[68px] items-center justify-between">
          <SkeletonBlock className="h-7 w-28" />
          <div className="hidden gap-4 md:flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonBlock key={i} className="h-4 w-16 rounded-full" />
            ))}
          </div>
          <SkeletonBlock className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-[68px]">
        <div className="bg-primary px-4 py-20 sm:py-28">
          <div className="site-container mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <SkeletonBlock className="mb-6 inline-flex h-7 w-48 rounded-full bg-white/10" />
              <SkeletonBlock className="mx-auto mb-4 h-16 w-full max-w-xl rounded-lg bg-white/10 lg:mx-0" />
              <SkeletonBlock className="mx-auto mb-6 h-6 w-full max-w-lg rounded bg-white/10 lg:mx-0" />
              <div className="mt-9 flex gap-3 lg:justify-start">
                <SkeletonBlock className="h-12 w-40 rounded-lg bg-white/10" />
                <SkeletonBlock className="h-12 w-32 rounded-lg bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="site-container mx-auto max-w-7xl py-16">
        <div className="mb-12 text-center">
          <SkeletonBlock className="mx-auto mb-4 h-4 w-24 rounded-full" />
          <SkeletonBlock className="mx-auto mb-3 h-10 w-80 max-w-full" />
          <SkeletonText lines={2} className="mx-auto max-w-2xl" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
