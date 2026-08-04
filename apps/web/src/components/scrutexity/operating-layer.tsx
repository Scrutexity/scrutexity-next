import Link from 'next/link';
import { ArrowRight, FileText, Network, ShieldCheck } from 'lucide-react';

type Artifact = {
  name: string;
  type: string;
  detail: string;
};

type ConnectedLayer = {
  label: string;
  href: string;
};

export type OperatingLayer = {
  id: 'find' | 'fix' | 'monitor' | 'recover' | 'prove' | 'deliver';
  name: string;
  product: string;
  input: string;
  output: string;
  next: string;
  href: string;
};

type OperatingLayerProps = {
  layer: OperatingLayer;
  artifacts: Artifact[];
  connected: ConnectedLayer[];
  eyebrow?: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

const OS_LAYERS: OperatingLayer[] = [
  { id: 'find', name: 'Find', product: 'AuditGPT', input: 'Public claim surface', output: 'Claim intake', next: 'Scrutexity', href: '/auditgpt' },
  { id: 'fix', name: 'Match', product: 'Claim Bureau', input: 'Observed claims', output: 'Evidence + risk map', next: 'CRT Ledger', href: '/methodology' },
  { id: 'monitor', name: 'Monitor', product: 'Pattern Registry', input: 'Claim signals', output: 'FTC/FDA/AG alerts', next: 'Proof Ledger', href: '/proof' },
  { id: 'recover', name: 'Record', product: 'CRT Proof Ledger', input: 'Review records', output: 'Dated proof artifacts', next: 'Review', href: '/verify' },
  { id: 'prove', name: 'Review', product: 'Review Record', input: 'Sealed digest', output: 'Public review artifact', next: 'Agency', href: '/proof' },
  { id: 'deliver', name: 'Deliver', product: 'Review Artifact', input: 'Trust package', output: 'Receipt packet', next: 'AuditGPT', href: '/enterprise' },
];

function LayerRail({ current }: { current: OperatingLayer['id'] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {OS_LAYERS.map((item) => {
        const active = item.id === current;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`group relative min-h-[88px] border p-3 transition-colors ${
              active
                ? 'border-sage-deep bg-espresso text-cream'
                : 'border-sand-deep/30 bg-bone text-espresso hover:border-sage-deep/45'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`font-mono text-[9px] uppercase tracking-[0.16em] ${active ? 'text-sage-soft' : 'text-mist'}`}>
                {item.name}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-sage-soft' : 'bg-sand-deep/60 group-hover:bg-sage-deep'}`} />
            </div>
            <p className="mt-4 font-display text-lg leading-none">{item.product}</p>
            <p className={`mt-2 text-[10px] leading-snug ${active ? 'text-cream/65' : 'text-mist'}`}>
              {item.output}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

function ArtifactDock({ artifacts }: { artifacts: Artifact[] }) {
  return (
    <div className="relative overflow-hidden border border-sand-deep/30 bg-bone shadow-[0_24px_70px_-55px_rgba(28,24,20,0.55)]">
      <div className="flex items-center justify-between border-b border-sand-deep/25 bg-cream/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-clay/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-sand-deep" />
          <span className="h-2.5 w-2.5 rounded-full bg-sage-deep/75" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">Artifact Dock</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {artifacts.map((artifact, index) => (
          <div
            key={artifact.name}
            className="group min-h-[132px] border border-sand-deep/25 bg-cream p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sage-deep/50 hover:shadow-[0_16px_40px_-28px_rgba(28,24,20,0.55)]"
          >
            <div className="flex items-center justify-between gap-3">
              <FileText size={16} className="text-sage-deep" />
              <span className="font-mono text-[9px] text-mist">0{index + 1}</span>
            </div>
            <p className="mt-4 break-words font-mono text-[12px] font-semibold leading-snug text-espresso">{artifact.name}</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-sage-deep">{artifact.type}</p>
            <p className="mt-3 text-xs leading-relaxed text-mist opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {artifact.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OperatingLayerHero({
  layer,
  artifacts,
  connected,
  eyebrow = 'Scrutexity Operating System',
  title,
  body,
  cta,
}: OperatingLayerProps) {
  return (
    <section className="relative border-b border-sand-deep/15 bg-cream px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 inline-flex items-center gap-2 border border-sand-deep/35 bg-bone px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-sage-deep">
          <Network size={13} />
          {eyebrow}
        </div>

        <LayerRail current={layer.id} />

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <div className="border border-sand-deep/30 bg-bone p-5">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">Current Layer</p>
                  <p className="mt-1 font-display text-2xl text-espresso">{layer.product}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">Mode</p>
                  <p className="mt-1 font-display text-2xl text-espresso">{layer.name}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">Input</p>
                  <p className="mt-1 text-sm text-espresso">{layer.input}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">Output</p>
                  <p className="mt-1 text-sm text-espresso">{layer.output}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-sand-deep/20 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mist">Connected Layers</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {connected.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center gap-1.5 border border-sand-deep/30 bg-cream px-3 py-1.5 text-xs text-espresso transition-colors hover:border-sage-deep/50"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border border-sage-deep/25 bg-sage/10 px-4 py-3 text-xs text-sage-deep">
              <ShieldCheck size={15} />
              <span className="font-mono uppercase tracking-[0.14em]">Operating Layer</span>
              <span className="text-espresso">{layer.name}</span>
              <span className="ml-auto hidden text-mist sm:inline">Connected to {layer.next}</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sage-deep">{layer.name} Layer</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-espresso md:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg">{body}</p>
            {cta && (
              <Link
                href={cta.href}
                className="mt-7 inline-flex items-center gap-2 bg-sage-deep px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-espresso"
              >
                {cta.label}
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10">
          <ArtifactDock artifacts={artifacts} />
        </div>
      </div>
    </section>
  );
}

export function DeveloperFooter({
  layer,
  artifacts,
  connected,
  version = 'OS-1',
}: {
  layer: OperatingLayer;
  artifacts: Artifact[];
  connected: ConnectedLayer[];
  version?: string;
}) {
  return (
    <section className="border-t border-sand-deep/20 bg-espresso px-6 py-8 text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 font-mono text-[10px] uppercase tracking-[0.14em] md:grid-cols-5">
        <div>
          <p className="text-cream/40">Input</p>
          <p className="mt-2 text-cream">{layer.input}</p>
        </div>
        <div>
          <p className="text-cream/40">Output</p>
          <p className="mt-2 text-cream">{layer.output}</p>
        </div>
        <div>
          <p className="text-cream/40">Connected</p>
          <p className="mt-2 text-cream">{connected.map((item) => item.label).join(' / ')}</p>
        </div>
        <div>
          <p className="text-cream/40">Version</p>
          <p className="mt-2 text-cream">{version}</p>
        </div>
        <div>
          <p className="text-cream/40">Artifact Types</p>
          <p className="mt-2 text-cream">{artifacts.map((item) => item.type).join(' / ')}</p>
        </div>
      </div>
    </section>
  );
}
