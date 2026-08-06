import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const MONO =
  'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.18em] text-clay"
      style={{ fontFamily: MONO }}
    >
      {children}
    </p>
  );
}

export function PageHero({
  kicker,
  title,
  subtitle,
  body,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-b border-sand-deep/30 bg-bone px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <Kicker>{kicker}</Kicker>
        <h1 className="mt-6 max-w-4xl font-display text-[2.5rem] leading-[1.07] text-espresso sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-bark">{subtitle}</p>
        ) : null}
        {body ? <p className="mt-4 max-w-3xl text-base leading-7 text-mist">{body}</p> : null}

        {primary || secondary ? (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primary ? (
              <Link
                href={primary.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
              >
                {primary.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-cream px-7 py-3 text-sm font-semibold text-espresso transition-colors hover:border-clay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
              >
                {secondary.label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Section({
  kicker,
  title,
  lede,
  children,
  tone = "cream",
  bordered = true,
}: {
  kicker?: string;
  title?: string;
  lede?: string;
  children?: React.ReactNode;
  tone?: "cream" | "bone";
  bordered?: boolean;
}) {
  return (
    <section
      className={`${bordered ? "border-b border-sand-deep/30" : ""} ${
        tone === "bone" ? "bg-bone" : "bg-cream"
      } px-5 py-20 sm:px-8 md:py-24`}
    >
      <div className="mx-auto max-w-6xl">
        {kicker || title || lede ? (
          <div className="mb-12 max-w-3xl">
            {kicker ? <Kicker>{kicker}</Kicker> : null}
            {title ? (
              <h2 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">
                {title}
              </h2>
            ) : null}
            {lede ? <p className="mt-6 text-base leading-7 text-mist">{lede}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/** Two-column list of short items. Used for "what we examine" style inventories. */
export function ItemGrid({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-xl border border-sand-deep/40 bg-sand-deep/40 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3 bg-cream px-6 py-5">
          <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-clay" />
          <span className="text-sm leading-6 text-bark">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered deliverable list — reads like a table of contents for a report. */
export function DeliverableList({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-sand-deep/35 overflow-hidden rounded-xl border border-sand-deep/50 bg-bone">
      {items.map((item, index) => (
        <li key={item} className="flex items-baseline gap-5 px-6 py-4 sm:px-8">
          <span
            className="text-[10px] font-semibold text-clay"
            style={{ fontFamily: MONO }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="py-1 text-sm leading-6 text-bark">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Explicit scope boundary. Every commercial page carries one. */
export function BoundaryNote({
  title = "Boundaries",
  lines,
  note,
}: {
  title?: string;
  lines: string[];
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-sand-deep/50 bg-cream p-8 sm:p-10">
      <Kicker>{title}</Kicker>
      <ul className="mt-6 grid gap-x-10 gap-y-3 text-sm leading-6 text-mist sm:grid-cols-2">
        {lines.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      {note ? <p className="mt-6 max-w-4xl text-sm leading-6 text-mist">{note}</p> : null}
    </div>
  );
}

export function CTABand({
  kicker = "Next step",
  title,
  body,
  primary,
  secondary,
}: {
  kicker?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-cream px-5 py-24 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-5 font-display text-4xl leading-tight text-espresso md:text-5xl">
          {title}
        </h2>
        {body ? (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-mist">{body}</p>
        ) : null}
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={primary.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-espresso px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-clay-deep"
          >
            {primary.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-sand-deep bg-bone px-8 py-3 text-sm font-semibold text-espresso transition-colors hover:border-clay"
            >
              {secondary.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Internal link rail — keeps the SEO link graph explicit and crawlable. */
export function RelatedRail({ links }: { links: { label: string; href: string }[] }) {
  return (
    <section className="border-t border-sand-deep/30 bg-bone px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Kicker>Continue</Kicker>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-espresso transition-colors hover:text-clay"
            >
              {label}
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
