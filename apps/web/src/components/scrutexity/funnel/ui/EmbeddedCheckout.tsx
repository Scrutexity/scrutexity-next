"use client";

import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { useScanToken } from "../hooks/useScanToken";

// TODO: Replace with real publishable key
const stripePromise = loadStripe("pk_test_placeholder");

interface EmbeddedCheckoutProps {
  onSuccess: () => void;
  scanId: string;
}

function CheckoutForm({ onSuccess, clientSecret, scanId }: { onSuccess: () => void; clientSecret?: string; scanId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (!clientSecret) {
      // Mocking success for vertical slice without backend
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        setTimeout(onSuccess, 600);
      }, 1500);
      return;
    }

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/verify-receipt`,
      },
      redirect: "if_required", // Prevent redirect to keep in-place animation
    });

    setIsProcessing(false);
    if (!error) {
      setIsSuccess(true);
      setTimeout(onSuccess, 600); // Allow checkmark to render before LayoutGroup unmounts
    } else {
      // TODO: Handle shake animation and display error
      console.error(error);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-4 relative">
      <div className="min-h-[120px] rounded relative z-10">
        {clientSecret ? (
          <PaymentElement />
        ) : (
          <div className="h-full w-full flex items-center justify-center border border-dashed border-sand-deep/40 rounded bg-paper/50 text-muted text-sm p-4 text-center">
            [Stripe Payment Element (Night Theme)]<br/>
            (Waiting for clientSecret from backend)
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isProcessing || isSuccess}
        className={`w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
          isSuccess 
            ? "bg-paper border border-bureau-sage text-bureau-sage" 
            : "bg-bureau-sage text-[#070708] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] disabled:opacity-50"
        }`}
      >
        {isProcessing ? "Processing..." : isSuccess ? (
          <>
            <CheckCircle2 size={16} /> Verified
          </>
        ) : (
          <>
            <Lock size={14} /> Pay $99
          </>
        )}
      </button>
    </form>
  );
}

export function EmbeddedCheckout({ onSuccess, scanId }: EmbeddedCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const { token } = useScanToken();

  useEffect(() => {
    let mounted = true;
    async function fetchIntent() {
      if (!token) return;
      try {
        const res = await fetch("/api/funnel/checkout/intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ scanId })
        });
        if (res.ok) {
          const data = await res.json();
          if (mounted) setClientSecret(data.clientSecret);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchIntent();
    return () => { mounted = false; };
  }, [scanId, token]);

  const appearance = {
    theme: "night" as const,
    variables: {
      colorPrimary: "#00E5FF", // bureau-sage
      colorBackground: "#0A0A0B", // paper-light
      colorText: "#FCFCFA", // ink
      colorDanger: "#FF4D4D", // exposure-red
      fontFamily: 'Inter Tight, system-ui, sans-serif',
      spacingUnit: "4px",
      borderRadius: "8px",
    },
    rules: {
      ".Input": {
        borderColor: "rgba(138, 143, 152, 0.4)", // sand-deep/40
      },
    },
  };

  return (
    <div className="bg-paper-light border border-sand-deep/60 rounded-xl p-6 shadow-xl relative overflow-hidden">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink">Unlock Full Domain Record — $99</h3>
        <p className="text-xs text-muted mt-2">
          Secure the complete Exhibit Package. Includes all flagged claims, counsel-ready replacement language, and your timestamped audit receipt.
        </p>
      </div>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm onSuccess={onSuccess} clientSecret={clientSecret} scanId={scanId} />
        </Elements>
      ) : (
        // Fallback for vertical slice (if Stripe isn't configured, we still allow demo click)
        <CheckoutForm onSuccess={onSuccess} scanId={scanId} />
      )}
    </div>
  );
}
