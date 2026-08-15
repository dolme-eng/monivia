import Image from 'next/image';

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-primary pb-16 pt-32 text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200"
          alt=""
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-secondary">
          Blog Monivia
        </p>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          Consigli, guide e{' '}
          <span className="text-secondary">aggiornamenti</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/60">
          Tutto quello che devi sapere sui prestiti, le finanze personali e come gestire al meglio il tuo budget.
        </p>
      </div>
    </section>
  );
}
