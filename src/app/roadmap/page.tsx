import { Zap, Camera, Leaf } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Roadmap — Scrutexity',
  description: 'What comes after lead recovery: Yield Engine, Post-Care Triage, and GLP-1 Bridge.',
};

const modules = [
  {
    icon: Zap,
    title: 'Yield Engine',
    status: 'Phase 2',
    description:
      'Fill dead chairs and burn expiring inventory at full margin — no public discounting, no race to the bottom. Timed outreach to your existing patient list when a cancellation opens a high-value slot.',
  },
  {
    icon: Camera,
    title: 'Post-Care Triage',
    status: 'Phase 2',
    description:
      'Secure photo intake that routes urgent post-procedure concerns to your care team within minutes. Clinical questions never touch the AI — everything escalates to a licensed staff member.',
  },
  {
    icon: Leaf,
    title: 'GLP-1 Bridge',
    status: 'Phase 2',
    description:
      'Support GLP-1 patients through facial volume changes with timed, physician-guided outreach. Keeps patients in your practice rather than losing them to confusion or inaction.',
  },
];

export default function RoadmapPage() {
  return (
    <main className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="section-kicker">What comes next</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-[#221f1b] md:text-6xl">
          Lead recovery is the foundation.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#6b6259] max-w-2xl">
          These three modules are in development. They unlock after the core recovery layer is verified and running. None are available yet — this page exists so you can see where the product is headed.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {modules.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="luxury-panel p-7 opacity-80">
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10">
                  <Icon className="h-5 w-5 text-terracotta" />
                </div>
                <span className="inline-block rounded-full border border-[#e1d4c5] bg-[#f3eadf] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#9b6a51] mb-3">
                  {item.status}
                </span>
                <h2 className="font-display text-xl text-[#221f1b] mb-2">{item.title}</h2>
                <p className="text-sm leading-7 text-[#5f574f]">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-[1.75rem] border border-[#e1d4c5] bg-[#f3eadf] p-8 text-center">
          <p className="text-lg font-semibold text-[#221f1b] mb-3">
            The pilot comes first.
          </p>
          <p className="text-sm leading-7 text-[#6b6259] max-w-lg mx-auto mb-6">
            None of these modules are available until the lead recovery pilot is running and verified at your clinic. Start there — it takes 14 days and costs nothing if it doesn&apos;t deliver.
          </p>
          <Link
            href="/pilot"
            className="inline-flex items-center justify-center rounded-full bg-[#b9825f] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Start with the free report →
          </Link>
        </div>
      </div>
    </main>
  );
}
