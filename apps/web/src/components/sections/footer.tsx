import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  ["Capabilities", "/#capabilities"],
  ["Intelligence", "/intelligence"],
  ["Industries", "/industries"],
  ["Field Notes", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export default function Footer() {
  return (
    <footer className="bg-graphite px-5 py-14 text-concrete sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 border-b border-concrete/20 pb-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <Image
              src="/logo-wordmark-green.png"
              alt="Scrutexity"
              width={190}
              height={40}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-6 max-w-xl font-display text-3xl font-semibold uppercase leading-[0.98] tracking-[-0.04em] sm:text-5xl">
              Intelligence for the systems reshaping how the world gets built.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 self-end sm:grid-cols-3">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between border-b border-concrete/20 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-concrete/65 transition-colors hover:border-safety-orange hover:text-safety-orange"
              >
                {label}
                <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 pt-8 text-[10px] leading-relaxed text-concrete/45 md:grid-cols-[1.3fr_.7fr]">
          <p>
            Scrutexity provides research and strategic intelligence, not
            engineering, legal, investment, procurement, or safety advice.
            Findings reflect available sources and stated confidence levels;
            field performance requires independent verification.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span>© {new Date().getFullYear()} Scrutexity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
