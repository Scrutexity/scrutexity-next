'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'METHODOLOGY', href: '/methodology' },
  { name: 'PROOF', href: '/proof' },
  { name: 'ENTERPRISE', href: '/enterprise' },
  { name: 'PRICING', href: '/pricing' },
  { name: 'AUDITGPT', href: '/audit' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-8 rounded-full border border-mist/30 bg-bone/90 px-6 py-3 shadow-sm backdrop-blur-md">
        {/* Brand Logo */}
        <Link href="/" className="mr-2 flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-espresso">
            <span className="font-sans text-[10px] font-bold text-espresso">
              S
            </span>
          </div>
          <span className="font-sans text-sm font-semibold uppercase tracking-widest text-espresso">
            Scrutexity
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-mono text-xs font-medium tracking-widest transition-colors ${
                  isActive ? 'text-espresso' : 'text-mist/70 hover:text-mist'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/audit"
          className="ml-2 rounded-full bg-espresso px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-bone shadow-sm transition-colors hover:bg-espresso/90"
        >
          RUN AUDITGPT &rarr;
        </Link>
      </nav>
    </div>
  );
}
