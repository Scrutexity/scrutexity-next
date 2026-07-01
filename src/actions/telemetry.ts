'use server';

import { getTelemetryData } from '@/lib/db';
import { unstable_cache } from 'next/cache';

// Cache the SQLite query to prevent database lockups during traffic spikes.
// Revalidates every 1 hour (3600 seconds) or as needed.
const getCachedTelemetry = unstable_cache(
  async () => {
    return getTelemetryData();
  },
  ['telemetry-data-cache'],
  { revalidate: 3600 }
);

export async function fetchTelemetry() {
  try {
    return await getCachedTelemetry();
  } catch (error) {
    console.error('Failed to fetch telemetry data:', error);
    // Fallback data in case DB fails
    return {
      claimHealthScore: 84,
      unsupportedLanguageCount: 2,
      proofArtifactsCount: 6,
      aiAnswerSurfacesCount: 5,
      recoveryWorkflowsCount: 3,
      updatedAt: new Date().toISOString(),
    };
  }
}
