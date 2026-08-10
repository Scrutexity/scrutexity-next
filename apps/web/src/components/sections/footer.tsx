import Link from "next/link";

const columns = [
  ["Product",[["How It Works","/#how-it-works"],["Decision Record","/#decision-record"],["Diagnostic","/#diagnostic"]]],
  ["Company",[["About","/about"],["Contact","/contact"]]],
  ["Principles",[["Independence","/#independence"],["Data Control","/#independence"]]],
  ["Legal",[["Privacy","/privacy"],["Terms","/terms"]]],
] as const;

export default function Footer(){return <footer className="bg-sx-bg px-4 pb-8 pt-24"><div className="sx-container"><div className="grid gap-14 border-t border-sx-border pt-12 lg:grid-cols-[1.3fr_.7fr]"><div><p className="text-sm font-semibold tracking-[.18em]">SCRUTEXITY</p><p className="mt-5 max-w-md text-3xl font-medium tracking-[-.04em]">Contractor-side production intelligence.</p><p className="mt-5 max-w-md text-sm leading-6 text-sx-muted">Scrutexity preserves prospective physical deployment records for specialty contractors.</p></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{columns.map(([title,links])=><div key={title}><p className="sx-mono text-sx-muted">{title}</p><ul className="mt-5 space-y-3">{links.map(([label,href])=><li key={label}><Link className="text-xs hover:underline" href={href}>{label}</Link></li>)}</ul></div>)}</div></div><div className="mt-16 grid gap-6 border-t border-sx-border pt-6 text-[10px] leading-5 text-sx-muted lg:grid-cols-[1.5fr_.5fr]"><p>Scrutexity provides observational production intelligence. It does not certify workfront readiness, direct field operations, determine legal responsibility, or provide legal advice. Contractors retain all operational decisions.</p><p className="lg:text-right">© {new Date().getFullYear()} Scrutexity. All rights reserved.</p></div></div></footer>}
