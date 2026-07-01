'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Field } from '@/components/Field';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';

const serviceOptions = [
  'Website design & development',
  'SEO & content',
  'Paid ads',
  'Reputation management',
  'Social media',
  'Email & SMS marketing',
  'PR & brand strategy',
  'Other',
];

export default function PartnerOsApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      agencyName: String(formData.get('agencyName') || ''),
      website: String(formData.get('website') || ''),
      contactName: String(formData.get('contactName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      activeClientRange: String(formData.get('activeClientRange') || ''),
      services: formData.getAll('services').map(String),
      averageValue: String(formData.get('averageValue') || ''),
      interestReason: String(formData.get('interestReason') || ''),
      auditExperience: String(formData.get('auditExperience') || ''),
      auditDetails: String(formData.get('auditDetails') || ''),
      sampleClientUrl: String(formData.get('sampleClientUrl') || ''),
      additionalNotes: String(formData.get('additionalNotes') || ''),
    };

    try {
      const response = await fetch('/api/partner-os-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Application delivery failed');
      }

      setIsSubmitted(true);
    } catch {
      setError('We could not submit the application. Email nick@scrutexity.com with your agency name, website, and one client URL for a sample Claim Snapshot.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-sage-deep/20 bg-cream p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-deep">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="mt-5 text-base font-semibold leading-7 text-espresso">
          Application received. We review Partner OS beta applications within 48 hours. If selected, we will run a free sample snapshot on one client page and schedule a 20-minute call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Agency Name">
          <Input name="agencyName" type="text" required autoComplete="organization" />
        </Field>

        <Field label="Website">
          <Input name="website" type="url" required placeholder="https://agency.com" />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Primary Contact Name">
          <Input name="contactName" type="text" required autoComplete="name" />
        </Field>

        <Field label="Email">
          <Input name="email" type="email" required autoComplete="email" />
        </Field>
      </div>

      <Field label="Phone (optional)">
        <Input name="phone" type="tel" autoComplete="tel" />
      </Field>

      <Field label="How many active clients do you currently serve in med spa, wellness, aesthetic, or high-trust healthcare?">
        <Select name="activeClientRange" required defaultValue="">
          <option value="" disabled>Select range</option>
          <option value="1-5">1-5</option>
          <option value="6-15">6-15</option>
          <option value="16-30">16-30</option>
          <option value="30+">30+</option>
        </Select>
      </Field>

      <div className="space-y-3">
        <p className="text-sm font-medium text-espresso">What services do you primarily deliver?</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-sand-deep/60 bg-cream px-4 py-3 text-sm text-espresso"
            >
              <input
                name="services"
                type="checkbox"
                value={service}
                className="h-4 w-4 rounded border-sand-deep text-sage-deep accent-sage-deep"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>

      <Field label="Average client retainers or project value">
        <Input name="averageValue" type="text" required placeholder="$2k-$8k/month retainers" />
      </Field>

      <Field label="Why are you interested in Scrutexity Partner OS?">
        <Textarea
          name="interestReason"
          required
          rows={4}
          placeholder="What problem are you trying to solve for your clients or your agency?"
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-[180px_1fr]">
        <Field label="Prior claim, compliance, or trust audits?">
          <Select name="auditExperience" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </Field>

        <Field label="Optional details">
          <Input name="auditDetails" type="text" />
        </Field>
      </div>

      <Field label="One recent med spa or wellness client website URL (optional but strongly preferred)">
        <Input name="sampleClientUrl" type="url" placeholder="https://clientsite.com" />
      </Field>

      <Field label="Anything else we should know?">
        <Textarea name="additionalNotes" rows={3} />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sage-deep px-8 py-4 text-sm font-semibold text-cream transition-all duration-300 hover:bg-espresso focus:outline-none focus:ring-2 focus:ring-sage-deep focus:ring-offset-2 focus:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting
          </>
        ) : (
          'Apply for Founding Beta'
        )}
      </button>

      {error && (
        <p className="rounded-xl border border-clay/30 bg-cream p-3 text-sm leading-6 text-mist">
          {error}
        </p>
      )}
    </form>
  );
}
