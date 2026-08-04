'use client';

import { trackScrutexityEvent } from '@/utils/telemetry';

export function useFlowAnalytics() {
  const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
    trackScrutexityEvent(`flow_${eventName}`, properties);
  };

  return { trackEvent };
}
