import { useState, useEffect } from "react";
import { FunnelPayload, RedactedScanResult, PartialRevealResult, FullExhibitPackage } from "../types";

export function useFunnelResult(scanId: string | null, token: string | null, isDemo: boolean = false) {
  const [payload, setPayload] = useState<FunnelPayload>({ state: "LOADING" });

  useEffect(() => {
    let isMounted = true;

    if (!scanId) return;
    
    // In a real flow, a pure demo might bypass tokens entirely if the backend allows public reads for demo scans.
    // For this slice, we require a token if it's not a demo.
    if (!isDemo && !token) return;

    async function fetchResult() {
      setPayload({ state: "LOADING" });
      try {
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`/api/funnel/result/${scanId}`, { headers });
        if (!res.ok) throw new Error("Failed to fetch funnel result");
        
        const data = await res.json();
        if (!isMounted) return;

        // Route payload based on authorized projection level returned by backend
        if (data.authLevel === "LOCKED") {
          setPayload({ state: "LOCKED", data: data as RedactedScanResult });
        } else if (data.authLevel === "EMAIL_CAPTURED") {
          setPayload({ state: "PARTIAL", data: data as PartialRevealResult });
        } else if (data.authLevel === "PURCHASED" || data.authLevel === "DEMO") {
          setPayload({ state: "UNLOCKED", data: data as FullExhibitPackage });
        } else {
          throw new Error("Unknown auth level");
        }
      } catch (error) {
        if (isMounted) setPayload({ state: "ERROR", error: error as Error });
      }
    }

    fetchResult();

    return () => {
      isMounted = false;
    };
  }, [scanId, token, isDemo]);

  return { payload, setPayload };
}
