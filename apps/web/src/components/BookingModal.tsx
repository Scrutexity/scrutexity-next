'use client';

import { useState } from 'react';
import { Modal } from './Modal';
import { ArrowRight, Check } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [email, setEmail] = useState('');
  const [clinic, setClinic] = useState('');
  const [locations, setLocations] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/report-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, clinic, locations }),
      });
      if (res.ok) {
        setStatus('done');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  function handleClose() {
    setStatus('idle');
    setEmail('');
    setClinic('');
    setLocations('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="relative w-full bg-cream px-8 py-10 sm:px-12 sm:py-12">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cream/80 hover:bg-[#e1d4c5] text-espresso transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === 'done' ? (
          <div className="flex flex-col items-center text-center py-8 gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 border border-clay/25">
              <Check className="h-6 w-6 text-clay" />
            </span>
            <h2 className="font-display text-2xl text-espresso">Your audit is being prepared.</h2>
            <p className="text-mist max-w-sm leading-7">
              We&rsquo;ll send your demand audit report within 24 hours. No sales call required.
            </p>
            <button
              onClick={handleClose}
              className="btn-ghost btn-sm mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-clay-deep mb-3">Free 14-day demand audit</p>
            <h2 className="font-display text-2xl text-espresso mb-2">
              We&rsquo;ll find where your bookings are leaking.
            </h2>
            <p className="text-mist text-sm leading-7 mb-7">
              Enter your details below. We&rsquo;ll deliver your custom demand audit within 24 hours — missed calls, unworked forms, cold consults, stalled deposits. No sales call required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-mist mb-1.5">Email address <span className="text-clay">*</span></label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@yourclinic.com"
                  className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-espresso placeholder:text-[#b0a89e] focus:border-clay focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-mist mb-1.5">Clinic name <span className="text-[#b0a89e] font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={clinic}
                  onChange={e => setClinic(e.target.value)}
                  placeholder="NYC Aesthetics"
                  className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-espresso placeholder:text-[#b0a89e] focus:border-clay focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-mist mb-1.5">Number of locations <span className="text-[#b0a89e] font-normal">(optional)</span></label>
                <select
                  value={locations}
                  onChange={e => setLocations(e.target.value)}
                  className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-espresso focus:border-clay focus:outline-none focus:ring-2 focus:ring-terracotta/20 transition"
                >
                  <option value="">Select…</option>
                  <option value="1">1 location</option>
                  <option value="2">2 locations</option>
                  <option value="3+">3 or more</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-600">Something went wrong — email us directly at nick@scrutexity.com</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="clay-cta px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 transition-all w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending…' : 'Get Your Free Audit'}
                {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-[#9e8e7e]">
              Read-only connection only. No PHI stored. BAA available before any integration.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
