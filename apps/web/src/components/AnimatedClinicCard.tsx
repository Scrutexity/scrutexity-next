'use client';

/* Premium patient-style recovery card. Budget: single viewport sheen, four spring chips, no looping motion. */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, MessageSquareText, RotateCcw, SearchCheck } from 'lucide-react';
import { motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

const actions = [
  { label: 'Recover', icon: RotateCcw },
  { label: 'Re-engage', icon: MessageSquareText },
  { label: 'Follow-up', icon: FileText },
  { label: 'Verify', icon: SearchCheck },
];

const stats = [
  ['Last visit', '84d ago'],
  ['Lifetime value', '$4,850'],
  ['Next due', 'Consult'],
];

export default function AnimatedClinicCard() {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-10% 0px' });
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const pulseChip = async (label: string) => {
    if (reduceMotion) return;
    await controls.start((item) =>
      item === label
        ? {
            borderColor: ['#e1d4c5', '#b9825f', '#e1d4c5'],
            boxShadow: [
              '0 0 0 rgba(185,130,95,0)',
              '0 0 0 4px rgba(185,130,95,0.14)',
              '0 0 0 rgba(185,130,95,0)',
            ],
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }
        : {},
    );
  };

  return (
    <article className="mx-auto w-full max-w-md rounded-[1.5rem] border border-sand-deep bg-cream p-5 shadow-[0_18px_60px_rgba(85,62,41,0.10)]">
      <div className="flex items-start gap-4">
        <Image
          src="/owner.jpg"
          alt="Illustrative patient avatar"
          width={64}
          height={64}
          className="h-16 w-16 rounded-2xl border border-sand-deep object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl leading-tight text-espresso">Jessica A. Smith</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f8174]">
            Composite archetype · Not a real patient
          </p>
        </div>
        <span className="rounded-full border border-[#7f8f78]/30 bg-[#7f8f78]/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#496052]">
          Active
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-sand-deep bg-cream px-3 py-2.5">
            <dt className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#9a8775]">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-espresso">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {actions.map(({ label, icon: Icon }) => (
          <motion.button
            key={label}
            type="button"
            custom={label}
            animate={controls}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            onClick={() => pulseChip(label)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sand-deep bg-cream px-3 py-2.5 text-xs font-semibold text-[#4f473f] transition-colors hover:text-espresso"
          >
            <Icon className="h-3.5 w-3.5 text-clay" />
            {label}
          </motion.button>
        ))}
      </div>

      <div ref={rowRef} className="relative mt-5 overflow-hidden rounded-2xl border border-[#d8c9b7] bg-cream p-4">
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            initial={{ x: '-120%' }}
            animate={inView ? { x: '120%' } : undefined}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-[#b9825f]/12 to-transparent"
          />
        )}
        <div className="relative flex items-start gap-3">
          <div className="mt-1 rounded-full border border-[#7f8f78]/35 bg-[#7f8f78]/12 p-1.5 text-[#496052]">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a8775]">Active recovery</p>
            <p className="mt-1 text-sm font-semibold text-espresso">IG DM · “Still interested in Morpheus8…”</p>
            <p className="mt-2 text-xs leading-5 text-mist">
              Staff-approved follow-up sent. Deposit status: <span className="font-semibold text-[#496052]">$250 held</span>.
            </p>
          </div>
        </div>
      </div>

      <Link href="/sample-owner-brief" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8a533b] hover:text-[#5f3020]">
        View full ledger <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
