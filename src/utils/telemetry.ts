// src/utils/telemetry.ts — Scrutexity GEM Telemetry Client
//
// Tracks high-intent micro-conversions, not vanity metrics.
// Events flow to the GEM dashboard for pipeline scoring.
//
// Event taxonomy:
//   roi_calculator_viewed      — Component mounted in viewport
//   roi_slider_adjusted        — User stopped dragging a slider (800ms debounce)
//   roi_negative_yield_seen    — Calculator output negative profit state
//   roi_cta_clicked            — User clicked "Request Pilot" inside calculator
//   triage_playground_viewed   — Component mounted in viewport
//   triage_preset_executed     — User clicked a preset scenario button
//   triage_custom_prompt_run   — User typed + ran their own scenario
//   triage_pilot_started       — User clicked CTA after running simulation

const GEM_ENDPOINT = process.env.NEXT_PUBLIC_GEM_TELEMETRY_URL || '';

interface TelemetryPayload {
  event: string;
  timestamp: string;
  properties: Record<string, unknown>;
}

export function trackScrutexityEvent(
  eventName: string,
  properties: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return;

  const payload: TelemetryPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    properties: {
      ...properties,
      url_path: window.location.pathname,
      referrer: document.referrer || 'direct',
      environment: process.env.NODE_ENV || 'production',
    },
  };

  // Always log in dev. In production, log only if no GEM endpoint is configured
  // (so you can verify events in DevTools before wiring the backend).
  if (process.env.NODE_ENV === 'development' || !GEM_ENDPOINT) {
    console.log(
      `%c[GEM Telemetry] %c${eventName}`,
      'color: #b9825f; font-weight: bold;',
      'color: #6b6259;',
      properties
    );
  }

  // Production: POST to GEM endpoint
  if (GEM_ENDPOINT) {
    try {
      navigator.sendBeacon(
        GEM_ENDPOINT,
        JSON.stringify(payload)
      );
    } catch {
      // Fallback: fire-and-forget fetch
      fetch(GEM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silently fail — telemetry must never break the UX
      });
    }
  }
}

/**
 * Creates a debounced version of trackScrutexityEvent for slider inputs.
 * Fires only after the user STOPS dragging for `delayMs` milliseconds.
 */
export function createDebouncedTrack(delayMs: number = 800) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function debouncedTrack(
    eventName: string,
    properties: Record<string, unknown> = {}
  ): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      trackScrutexityEvent(eventName, properties);
    }, delayMs);
  };
}
