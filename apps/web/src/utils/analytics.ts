// src/utils/analytics.ts
//
// Shared lightweight analytics event helper for Scrutexity.
// Safely logs in development and allows easy integration with Vercel Analytics, PostHog, Plausible, or GA4.

import { trackScrutexityEvent } from './telemetry';

export interface AnalyticsProperties {
  route?: string;
  cta_label?: string;
  destination?: string;
  plan_name?: string;
  section?: string;
  intent?: string;
  company_type?: string;
  timestamp?: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}): void {
  if (typeof window === 'undefined') return;

  const resolvedProperties = {
    route: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...properties,
  };

  // 1. Log safely in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `%c[Analytics] ${eventName}`,
      'color: #5E7A5A; font-weight: bold; font-size: 11px;',
      resolvedProperties
    );
  }

  // 2. Forward to core Telemetry (GEM)
  trackScrutexityEvent(eventName, resolvedProperties);

  // 3. Integration placeholders:
  //
  // For Vercel Analytics:
  // import { va } from '@vercel/analytics';
  // va.track(eventName, resolvedProperties);
  //
  // For PostHog:
  // window.posthog?.capture(eventName, resolvedProperties);
  //
  // For Plausible:
  // window.plausible?.(eventName, { props: resolvedProperties });
  //
  // For Google Analytics (GA4):
  // window.gtag?.('event', eventName, resolvedProperties);
}
