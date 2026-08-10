"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { name: "Capabilities", href: "/#capabilities" },
  { name: "Intelligence", href: "/intelligence" },
  { name: "Industries", href: "/industries" },
  { name: "Field Notes", href: "/blog" },
  { name: "About", href: "/about" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled || isOpen ? "border-graphite/20 bg-concrete" : "border-graphite/10 bg-concrete/90 backdrop-blur-xl"}`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-4"
            aria-label="Scrutexity home"
          >
            <Image
              src="/logo-wordmark-black.png"
              alt="Scrutexity"
              width={160}
              height={32}
              priority
              className="h-[22px] w-auto"
            />
            <span className="hidden border-l border-graphite/25 pl-4 font-mono text-[9px] uppercase tracking-[0.16em] text-graphite/55 md:block">
              Built environment intelligence
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.1em] text-graphite/65 transition-colors hover:text-safety-orange"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact?intent=construction-brief"
              className="construction-button construction-button-primary py-3"
            >
              Request a brief <ArrowUpRight size={14} />
            </Link>
          </nav>

          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-40 bg-concrete px-5 pb-8 pt-24 sm:px-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="border-t border-graphite/20">
              {links.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between border-b border-graphite/20 py-5 font-display text-3xl font-semibold uppercase tracking-[-0.04em]"
                >
                  {link.name}
                  <span className="font-mono text-[9px] text-safety-orange">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>
            <Link
              href="/contact?intent=construction-brief"
              className="construction-button construction-button-primary mt-8 w-full justify-between"
            >
              Request a private brief <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
