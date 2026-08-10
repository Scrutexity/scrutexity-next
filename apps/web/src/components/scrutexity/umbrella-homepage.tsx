import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  Cpu,
  FileSearch,
  Radar,
  ShieldCheck,
} from "lucide-react";

const sectors = [
  "Construction robotics",
  "Smart-site systems",
  "Digital twins + BIM",
  "Embodied intelligence",
  "Policy + procurement",
];

const capabilities = [
  {
    number: "01",
    icon: Radar,
    title: "Market intelligence",
    copy: "Track vendors, deployments, tenders, standards, subsidies, and capital flows across fast-moving construction technology markets.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Technical diligence",
    copy: "Separate production-ready capability from laboratory theater with source-linked reviews of throughput, autonomy, integration, and field evidence.",
  },
  {
    number: "03",
    icon: ChartNoAxesCombined,
    title: "Deployment strategy",
    copy: "Translate intelligence into a ranked action plan: where to pilot, what to buy, which partners to approach, and what must be proven first.",
  },
];

const signals = [
  [
    "ROB",
    "Robotics",
    "Trade-specific systems moving into commercial deployment",
  ],
  [
    "DTW",
    "Digital twin",
    "BIM-linked operating layers connecting site reality to plans",
  ],
  [
    "POL",
    "Policy",
    "Standards, directories, and incentives shaping procurement",
  ],
  [
    "AI",
    "Embodied AI",
    "Perception and planning stacks crossing into field equipment",
  ],
] as const;

export default function UmbrellaHomepage() {
  return (
    <div className="construction-shell min-h-screen overflow-hidden bg-concrete text-graphite">
      <section className="relative border-b border-graphite/20 px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div
          className="construction-grid absolute inset-0 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between border-y border-graphite/25 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/60">
            <span>Scrutexity / Built Environment Intelligence</span>
            <span className="hidden sm:block">New York · Global coverage</span>
          </div>

          <div className="grid gap-12 py-14 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:py-20">
            <div>
              <p className="mb-7 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-safety-orange">
                <span className="h-2 w-2 bg-safety-orange" aria-hidden />
                Intelligence for construction’s next operating system
              </p>
              <h1 className="max-w-5xl font-display text-[clamp(3.6rem,8.7vw,8.8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em]">
                Build with
                <span className="block text-safety-orange">better signal.</span>
              </h1>
            </div>

            <div className="border-l-2 border-safety-orange pl-6 lg:mb-2">
              <p className="max-w-md text-lg leading-relaxed text-graphite/75">
                Scrutexity helps construction leaders understand emerging
                technology, verify what is ready, and make higher-conviction
                deployment decisions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact?intent=construction-brief"
                  className="construction-button construction-button-primary"
                >
                  Request an intelligence brief <ArrowRight size={16} />
                </Link>
                <Link
                  href="#capabilities"
                  className="construction-button construction-button-secondary"
                >
                  Explore capabilities <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid border border-graphite/25 bg-concrete/90 sm:grid-cols-2 lg:grid-cols-5">
            {sectors.map((sector, index) => (
              <div
                key={sector}
                className="border-b border-graphite/20 p-4 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <span className="font-mono text-[9px] text-safety-orange">
                  0{index + 1}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em]">
                  {sector}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite px-5 py-20 text-concrete sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="construction-kicker text-safety-orange">
              The decision gap
            </p>
            <h2 className="mt-5 max-w-xl font-display text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.045em] sm:text-7xl">
              The market moves faster than the evidence.
            </h2>
          </div>
          <div className="grid gap-px self-end bg-concrete/20 sm:grid-cols-2">
            {signals.map(([code, title, copy]) => (
              <article
                key={code}
                className="min-h-56 bg-graphite p-7 transition-colors hover:bg-concrete/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-concrete/45">
                    SIGNAL / {code}
                  </span>
                  <span className="h-2 w-2 bg-safety-orange" aria-hidden />
                </div>
                <h3 className="mt-14 text-xl font-semibold uppercase tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-concrete/60">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="capabilities"
        className="border-b border-graphite/20 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-b border-graphite/25 pb-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="construction-kicker">What we do</p>
              <h2 className="mt-5 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.045em] sm:text-7xl">
                From noise to field decision.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-graphite/65 lg:justify-self-end">
              Focused research and decision support for owners, developers,
              contractors, technology companies, investors, and public-sector
              teams navigating intelligent construction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3">
            {capabilities.map(({ number, icon: Icon, title, copy }) => (
              <article
                key={number}
                className="group border-b border-graphite/20 py-10 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-safety-orange">
                    {number} / 03
                  </span>
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-graphite/55 transition-transform duration-300 group-hover:-translate-y-1"
                  />
                </div>
                <h3 className="mt-16 font-display text-3xl font-semibold uppercase tracking-[-0.035em]">
                  {title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-graphite/65">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="construction-dossier grid overflow-hidden border border-graphite/25 bg-steel-mist lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex min-h-[420px] flex-col justify-between border-b border-graphite/20 p-8 lg:border-b-0 lg:border-r sm:p-12">
              <div className="flex items-center justify-between">
                <Building2 size={30} strokeWidth={1.4} />
                <span className="font-mono text-[10px] tracking-[0.18em]">
                  FIELD NOTE / 2026
                </span>
              </div>
              <div>
                <p className="construction-kicker text-safety-orange">
                  Current focus
                </p>
                <h2 className="mt-5 font-display text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.045em] sm:text-6xl">
                  Intelligent construction in China.
                </h2>
              </div>
            </div>
            <div className="p-8 sm:p-12">
              <p className="max-w-2xl text-xl leading-relaxed tracking-[-0.015em] sm:text-2xl">
                A live intelligence lens on specialty-trade robotics, smart-site
                platforms, embodied AI, digital twins, policy incentives, and
                enterprise deployment signals.
              </p>
              <div className="mt-12 grid gap-px bg-graphite/20 sm:grid-cols-3">
                {[
                  "Vendor landscape",
                  "Deployment evidence",
                  "Policy catalyst",
                ].map((item, index) => (
                  <div key={item} className="bg-steel-mist p-5">
                    <span className="font-mono text-[9px] text-safety-orange">
                      0{index + 1}
                    </span>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.08em]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/contact?intent=china-construction-intelligence"
                className="mt-10 inline-flex items-center gap-2 border-b border-graphite pb-1 text-sm font-semibold uppercase tracking-[0.08em]"
              >
                Ask for the market brief <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-graphite/20 bg-safety-orange px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
          <div>
            <p className="construction-kicker">Start with one decision</p>
            <h2 className="mt-5 max-w-5xl font-display text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              What do you need to know before you build?
            </h2>
          </div>
          <div>
            <div className="mb-8 flex items-start gap-3 text-sm leading-relaxed">
              <ShieldCheck size={20} className="mt-0.5 shrink-0" />
              <p>
                Source-linked intelligence. Clear confidence levels. No vendor
                theater and no guaranteed outcomes.
              </p>
            </div>
            <Link
              href="/contact?intent=construction-brief"
              className="construction-button w-full justify-between bg-graphite text-concrete hover:bg-graphite/90"
            >
              Request a private brief <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
