import Link from "next/link";

const columns = [
  ["Product", [["How It Works", "/#how-it-works"], ["Trades", "/#trades"], ["Diagnostic", "/#diagnostic"]]],
  ["Company", [["About", "/about"], ["Contact", "/contact"]]],
  ["Principles", [["Architecture", "/#architecture"], ["Decision Record", "/#decision-record"]]],
  ["Legal", [["Privacy", "/privacy"], ["Terms", "/terms"]]],
] as const;

export default function Footer() {
  return <footer className="bg-sx-bg px-4 pb-8 pt-24"><div className="sx-container"><div className="grid gap-14 border-t border-sx-border pt-12 lg:grid-cols-[1.3fr_.7fr]"><div><p className="text-sm font-semibold tracking-[.18em]">SCRUTEXITY</p><p className="mt-5 max-w-md text-3xl font-medium tracking-[-.04em]">Contractor-side production control.</p><p className="mt-5 max-w-md text-sm leading-6 text-sx-muted">Planned start. Observed state. Contractor decision. Sealed lineage.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{columns.map(([title, links]) => <div key={title}><p className="sx-mono text-sx-muted">{title}</p><ul className="mt-5 space-y-3">{links.map(([label, href]) => <li key={label}><Link className="text-xs hover:underline" href={href}>{label}</Link></li>)}</ul></div>)}</div></div><div className="mt-16 grid gap-6 border-t border-sx-border pt-6 text-[10px] leading-5 text-sx-muted lg:grid-cols-[1.5fr_.5fr]"><p>Scrutexity records observed field evidence and decision lineage. It does not certify site conditions, authorize deployment, direct field operations, determine legal responsibility, or provide legal advice. Contractors retain all operational decisions.</p><p className="lg:text-right">© {new Date().getFullYear()} Scrutexity. All rights reserved.</p></div></div></footer>;
}
