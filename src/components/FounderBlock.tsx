import Image from 'next/image';

export default function FounderBlock() {
  return (
    <section className="bg-[#fffaf2] px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-4xl items-center gap-12 md:grid-cols-[240px_1fr]">
        <div className="relative mx-auto md:mx-0">
          <Image
            src="/founder.jpg"
            alt="Nick, Founder of Scrutexity"
            width={240}
            height={240}
            priority
            className="h-60 w-60 rounded-[1.5rem] border border-[#e1d4c5] object-cover shadow-[0_18px_50px_rgba(85,62,41,0.08)]"
          />
          <div className="absolute -bottom-2 left-4 right-4 flex items-center justify-center rounded-full bg-[#221f1b]/80 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#6B8576]" />
            Nick — Founder, Scrutexity
          </div>
        </div>
        <div>
          <p className="section-kicker">The operator</p>
          <h2 className="mt-3 font-display text-3xl text-[#221f1b]">Why I built the opposite of an agency</h2>
          <p className="mt-4 leading-relaxed text-[#5f574f]">
            I spent years watching premium NYC clinics pay agencies $5&ndash;10K a month
            for &ldquo;traffic&rdquo; while the consults they&rsquo;d already earned died in a missed call or a
            dead DM. Scrutexity installs the recovery system, proves it in 14 days, and hands
            you the keys. The report is yours forever. Every pilot follows the same documented, auditable process — here&rsquo;s the playbook.
          </p>
          <p className="mt-4 text-sm font-semibold text-[#221f1b]">
            Email me: <a href="mailto:nick@scrutexity.com" className="text-terracotta underline underline-offset-2 hover:text-[#a36b5d]">nick@scrutexity.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
