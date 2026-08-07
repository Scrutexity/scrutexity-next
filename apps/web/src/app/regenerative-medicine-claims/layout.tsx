import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regenerative Medicine Claim Review | Scrutexity",
  description:
    "Regenerative and stem cell marketing draws regulatory attention. Review which public claims your evidence supports and get safer replacement wording.",
  alternates: { canonical: "/regenerative-medicine-claims" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
