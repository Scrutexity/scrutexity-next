'use client';
import React from 'react';
import Link from 'next/link';

interface GovButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function GovButton({ label, onClick, href, className = '', children }: GovButtonProps) {
  const content = children ?? label;

  const inner = (
    <>
      {/* Animated conic border ring */}
      <span
        className="govbtn-ring pointer-events-none absolute rounded-full"
        style={{
          inset: '-1.5px',
          padding: '1.5px',
          WebkitMaskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      />

      {/* Top glare line */}
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Label */}
      <span className="relative z-10 flex items-center gap-2">
        {content}
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </span>
    </>
  );

  const base = `group relative px-8 py-3.5 rounded-full bg-[#0e0b07] text-sm font-medium tracking-wide text-white transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] ${className}`;

  if (href) {
    return <Link href={href} className={base}>{inner}</Link>;
  }

  return <button onClick={onClick} className={base}>{inner}</button>;
}
