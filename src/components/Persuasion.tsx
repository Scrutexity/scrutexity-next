'use client';
import Image from 'next/image';
import { Reveal } from './Reveal';

/* "But my software already has AI" — the three questions that close it. */
const qs = [
  {
    q: 'Can you independently verify a single dollar it claims to have recovered?',
    a: 'Every recovery we log includes the source, transcript, and booking outcome — you can audit it yourself. Theirs is a dashboard that grades its own homework.',
  },
  {
    q: 'Who owns the transcripts, workflows, and data the day you cancel?',
    a: 'With us, you do — and you keep them. With them, it all stays behind the login you just left.',
  },
  {
    q: 'What stops their AI from answering a medical question it shouldn\u2019t?',
    a: 'We route every clinical question to your licensed staff. PHI never reaches the model. Ask them to put that in writing.',
  },
];

export function ObjectionHandler() {
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-[1160px] px-7">
        <Reveal className="max-w-[50ch]">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
            The objection we get most
          </span>
          <h2 className="mt-3 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-espresso sm:text-[2.6rem]">
            &ldquo;But my software already has an AI receptionist.&rdquo;
          </h2>
        </Reveal>
        <Reveal>
          <div className="mt-11 rounded-[24px] border border-sand-deep bg-cream px-11 py-12 shadow-[0_1px_2px_rgba(44,36,24,.04),0_14px_36px_-16px_rgba(44,36,24,.16)]">
            <div className="font-display text-[1.7rem] font-medium leading-tight text-espresso">
              Good. Turn it on.
            </div>
            <p className="mt-4 max-w-[62ch] text-[1.08rem] text-mist">
              Then ask the three questions their salesperson is hoping you won&apos;t. If the answers make you
              comfortable, you don&apos;t need us.{' '}
              <b className="text-espresso">They rarely do.</b>
            </p>
            <div className="mt-7 grid gap-4.5">
              {qs.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5 rounded-2xl border-l-[3px] border-clay bg-cream px-6 py-5"
                >
                  <span className="flex-none font-display text-2xl text-clay">
                    {i + 1}
                  </span>
                  <div className="text-base">
                    <b className="font-semibold text-espresso">{item.q}</b>
                    <br />
                    <span className="text-mist">{item.a}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 font-display text-[1.15rem] italic text-[#0F2C2C]">
              Anyone can text back a missed call. Almost no one will let you own the proof — or keep the AI out of the exam room.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Founder manifesto — the single high-contrast moment. */
export function Manifesto() {
  return (
    <section className="bg-charcoal py-28 text-[#F3E9D8]">
      <div className="mx-auto max-w-[1160px] px-7">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#d8b17a]">
          Why we exist
        </span>
        <h2 className="mt-3 max-w-[22ch] font-display text-[1.9rem] font-medium leading-[1.12] text-white sm:text-[2.7rem]">
          We built the recovery layer your existing booking system leaves open.
        </h2>
        <p className="mt-6 max-w-[60ch] text-[1.12rem] leading-relaxed text-[#D9CBB8]">
          Your team keeps Boulevard or Mangomint. We add the missed-demand recovery layer, prove it on a ledger{' '}
          <b className="font-semibold text-white">you can audit in 60 seconds</b>,
          and hand you the keys.{' '}
          <b className="font-semibold text-white">Own it. Cancel anytime and keep everything.</b> We
          don&apos;t need a contract to keep you — the results do.
        </p>
        <div className="mt-7 flex items-center gap-3.5">
          <Image
            src="/founder.jpg"
            alt="Nick, Founder"
            width={46}
            height={46}
            className="h-[46px] w-[46px] rounded-full object-cover border border-[#d8b17a]/40"
          />
          <div>
            <div className="font-semibold text-white">Nick — Founder</div>
            <div className="text-[0.86rem] text-[#C9BBA6]">
              I run every pilot personally. I cap concurrent pilots so yours gets my direct attention. The system is read-only and staff-approved — if I&apos;m sick for a day, your patient communication doesn&apos;t stop.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
