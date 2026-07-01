'use client';

import { Users, Stethoscope, TrendingUp, Clock, Check } from 'lucide-react';
import { Reveal } from './Reveal';

const impacts = [
  {
    icon: Users,
    title: 'Front Desk Coordinators',
    hours: '0 hours of training.',
    body: 'They do not log into Scrutexity. They wake up, open Boulevard, and see new appointments tagged SCX-RECOVERED with deposits already paid. They spend 100% of their time on the patients physically in your lobby.',
    highlight: 'Zero new software to learn. Zero workflow changes.',
  },
  {
    icon: Stethoscope,
    title: 'Medical Providers & Injectors',
    hours: 'Zero scheduling noise.',
    body: 'They only interact with the system if a patient triggers a high-risk clinical keyword. They receive an instant Slack or SMS alert to take over the chat. Otherwise, they never hear about it.',
    highlight: 'AI schedules. Licensed staff decides. That line is never crossed.',
  },
  {
    icon: TrendingUp,
    title: 'Clinic Owner / Director',
    hours: '10 minutes per week.',
    body: 'You receive a weekly automated ledger showing exact ad-spend recovered, deposits collected, and zero HIPAA breaches. That\'s it. Review it on Monday morning with your coffee.',
    highlight: 'One email. Every Monday. Revenue recovered, compliance verified.',
  },
];

export default function StaffImpact() {
  return (
    <section className="bg-[#fcfaf7] px-5 py-24 sm:px-8 border-b border-sand-deep">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-14">
            <p className="section-kicker mb-3">Implementation Reality</p>
            <h2 className="font-display text-3xl leading-tight text-espresso md:text-4xl">
              Who does what?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mist">
              Scrutexity is infrastructure, not another app your team has to learn. Here&apos;s exactly how it changes — or doesn&apos;t change — each role in your clinic.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i}>
                <div className="rounded-[1.75rem] border border-sand-deep bg-cream p-8 h-full flex flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-clay/8">
                    <Icon className="h-6 w-6 text-clay" />
                  </div>

                  <h3 className="font-display text-xl text-espresso mb-1">{item.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-3.5 w-3.5 text-[#7f8f78]" />
                    <span className="text-sm font-semibold text-[#7f8f78]">{item.hours}</span>
                  </div>

                  <p className="text-[14px] leading-7 text-mist flex-1">{item.body}</p>

                  <div className="mt-5 pt-4 border-t border-sand-deep flex items-start gap-2">
                    <Check className="h-4 w-4 text-clay mt-0.5 shrink-0" />
                    <p className="text-[13px] font-medium text-espresso leading-6">{item.highlight}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
