"use client";

import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function CopyLinkButton({
  canonicalPath,
  anchor,
  label = "Copy link",
}: {
  canonicalPath: string;
  anchor: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  function copyWithSelection(value: string) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }

  async function copyLink() {
    const value = `https://www.scrutexity.com${canonicalPath}#${anchor}`;
    const confirmCopied = () => {
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else if (!copyWithSelection(value)) {
        throw new Error("Clipboard unavailable");
      }
      confirmCopied();
    } catch {
      if (copyWithSelection(value)) confirmCopied();
      else setStatus("error");
    }
  }

  const text = status === "copied" ? "Copied" : status === "error" ? "Copy failed" : label;

  return (
    <button
      type="button"
      data-print-hidden
      onClick={copyLink}
      className="inline-flex min-h-9 items-center gap-2 border-b border-transparent text-xs font-semibold text-mist transition-colors hover:border-sage-deep hover:text-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2"
      aria-label={`${label}: ${anchor}`}
    >
      {status === "copied" ? <Check size={13} aria-hidden="true" /> : <Link2 size={13} aria-hidden="true" />}
      <span aria-live="polite">{text}</span>
    </button>
  );
}
