export default function PageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ivory text-charcoal">
      <section className="px-7 pb-10 pt-36">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
            {kicker}
          </span>
          <h1 className="mt-4 max-w-[20ch] font-serif text-[2.4rem] font-semibold leading-[1.06] sm:text-[3.2rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-[58ch] text-[1.1rem] leading-relaxed text-charcoal/70">{intro}</p>
          )}
        </div>
      </section>
      {children}
    </div>
  );
}

export function CTARow() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <a
        href="/pilot"
        className="govbtn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition duration-300"
      >
        Request a portfolio audit →
      </a>
      <a
        href="/for-pe"
        className="text-[15px] font-semibold underline decoration-line underline-offset-[5px] hover:decoration-terracotta"
      >
        For PE buyers
      </a>
    </div>
  );
}
