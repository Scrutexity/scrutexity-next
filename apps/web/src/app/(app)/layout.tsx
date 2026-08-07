"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, ChevronRight } from "lucide-react";

const MONO = 'var(--font-jetbrains-mono), ui-monospace, "SF Mono", Menlo, Monaco, monospace';

// Only routes that exist. /dashboard/scans, /dashboard/domains,
// /dashboard/alerts and /dashboard/settings were all listed here but none were
// ever built, so every signed-in user hit a 404 on four of five nav items.
// Restore each entry as its page ships.
const NAV_ITEMS = [
  { name: "Watch Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper flex text-ink font-sans selection:bg-bureau-sage/30">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-sand-deep/20 bg-paper-light flex flex-col flex-shrink-0 relative z-20">
        
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sand-deep/20">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-bureau-sage/10 border border-bureau-sage flex items-center justify-center">
              <ShieldCheck size={14} className="text-bureau-sage" />
            </div>
            <span className="font-display font-medium text-sm">Scrutexity</span>
          </Link>
        </div>

        {/* Workspace Selector */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between bg-paper border border-sand-deep/40 px-3 py-2 rounded-lg cursor-pointer hover:border-bureau-sage/40 transition-colors">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>Workspace</span>
              <span className="text-sm font-medium">Acme Aesthetics</span>
            </div>
            <ChevronRight size={14} className="text-muted" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? "bg-bureau-sage/10 text-bureau-sage font-medium" 
                    : "text-muted hover:bg-paper hover:text-ink"
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="p-4 border-t border-sand-deep/20">
          <div className="flex items-center gap-2 px-3 py-2 bg-paper rounded-lg border border-sand-deep/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bureau-sage opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bureau-sage"></span>
            </span>
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest" style={{ fontFamily: MONO }}>
              System: Armed
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-sand-deep/20 bg-paper/50 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 relative z-10">
          <div className="flex items-center gap-4 text-sm font-mono text-muted" style={{ fontFamily: MONO }}>
            <span>app.scrutexity.com</span>
            <span>/</span>
            <span className="text-ink">Acme Aesthetics</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-sand-deep/30 flex items-center justify-center text-xs font-mono border border-sand-deep/60">
              GC
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-bureau-sage/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="p-8 max-w-6xl mx-auto relative z-10 pb-32">
            {children}
          </div>
        </div>
      </main>

    </div>
  );
}
