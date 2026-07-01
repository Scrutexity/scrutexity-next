'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, EyeOff, Clock } from 'lucide-react';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';

export default function PilotApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get('fullName') || ''),
      email: String(formData.get('email') || ''),
      clinicName: String(formData.get('clinicName') || ''),
      currentPms: String(formData.get('currentPms') || ''),
    };

    try {
      const response = await fetch('/api/pilot-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Application delivery failed');
      }

      setIsSubmitted(true);
    } catch {
      setError('We could not submit the application. Email nick@scrutexity.com and include your clinic name, PMS, and monthly inquiry volume.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-[#2F5D4A]/20 bg-cream p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-deep">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="mt-5 text-base font-semibold leading-7 text-espresso">
          Application received. We review submissions daily and will reach out within 24 hours if your clinic qualifies for the current cohort.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 3-icon safety assurances row */}
      <div className="grid grid-cols-3 gap-2.5 mb-8 text-center bg-[#F5F1EB]/50 border border-sand-deep/20 rounded-xl p-3.5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
            <ShieldCheck size={14} />
          </div>
          <div className="text-[10px] font-sans font-bold text-ink leading-tight">BAA Signed</div>
          <div className="text-[8px] font-sans text-mist leading-tight">Before connection</div>
        </div>
        
        <div className="flex flex-col items-center gap-1 border-x border-sand-deep/20 px-1">
          <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
            <EyeOff size={14} />
          </div>
          <div className="text-[10px] font-sans font-bold text-ink leading-tight">PHI-Stripped</div>
          <div className="text-[8px] font-sans text-mist leading-tight">At clinic edge</div>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-sage/12 flex items-center justify-center text-sage-deep">
            <Clock size={14} />
          </div>
          <div className="text-[10px] font-sans font-bold text-ink leading-tight">Cancel Anytime</div>
          <div className="text-[8px] font-sans text-mist leading-tight">Keep your report</div>
        </div>
      </div>

      <Field label="Full Name">
        <Input name="fullName" type="text" required autoComplete="name" />
      </Field>

      <Field label="Email">
        <Input name="email" type="email" required autoComplete="email" />
      </Field>

      <Field label="Clinic / Group Name">
        <Input name="clinicName" type="text" required autoComplete="organization" />
      </Field>

      <Field label="Current PMS">
        <Select name="currentPms" required defaultValue="">
          <option value="" disabled>Select your PMS</option>
          <option value="Boulevard">Boulevard</option>
          <option value="Mangomint">Mangomint</option>
          <option value="Zenoti">Zenoti</option>
          <option value="Other">Other</option>
        </Select>
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-deep px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-[#4A6347] hover:shadow-[0_8px_30px_-8px_rgba(94,122,90,0.4)] focus:outline-none focus:ring-2 focus:ring-sage-deep focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Reviewing
          </>
        ) : (
          'Submit Application'
        )}
      </button>

      {error && (
        <p className="rounded-xl border border-[#B87D6B]/30 bg-cream p-3 text-sm leading-6 text-mist">
          {error}
        </p>
      )}
    </form>
  );
}
