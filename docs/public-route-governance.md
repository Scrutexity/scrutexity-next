# Public Route Governance — scrutexity.com

> Maintained: 2026-08-04 (public-integrity + route-governance pass)
> Principle: the sitemap contains ONLY intentional indexable customer-facing pages.
> Every 200 route is deliberate: INDEX, NOINDEX, REDIRECT, INTERNAL/PROTECTED, REMOVE/410, or API/UTILITY.
> Canonical offers (single source of truth): Claim Support Review $99 · Founder's Audit from $750 ·
> Agency Claim QA from $1,500 · Agent Evidence Pack from $2,500 · Monitoring pilots (selected customers only).

## INDEX — canonical customer-facing (in sitemap)

| Route | Purpose | Treatment | Nav | Sitemap | Reason |
|---|---|---|---|---|---|
| `/` | Home — claim/positioning, offers, sample, methodology links | INDEX | ✅ | ✅ | Primary acquisition |
| `/pricing` | Canonical pricing ladder | INDEX | ✅ | ✅ | Money page |
| `/what-we-do` | Operating boundary | INDEX | ✅ | ✅ | Education |
| `/methodology` | Published method v1.0 | INDEX | ✅ | ✅ | Trust + education |
| `/sample-report` | Sample claim report (labeled fixture) | INDEX | ✅ | ✅ | Conversion proof |
| `/contact` | Intake / scoping | INDEX | ✅ | ✅ | Conversion |
| `/agency` | Agency Claim QA pilot | INDEX | ✅ | ✅ | Priority segment |
| `/data-handling` | Data integrity policy | INDEX | ✅ | ✅ | Trust/legal |
| `/terms` | Terms of service | INDEX | ✅ | ✅ | Legal |
| `/privacy` | Privacy policy | INDEX | ✅ | ✅ | Legal |

## NOINDEX — preserved source, accessible, not indexed, not in sitemap

| Route | Purpose | Treatment | Enforced via | Reason |
|---|---|---|---|---|
| `/medical-wellness` | Medical & wellness vertical page | NOINDEX (archive-from-acquisition) | page metadata | Legacy vertical offers; delivery uncertain; prices aligned to canonical |
| `/medical-wellness/med-spas` | Med-spa vertical | NOINDEX (archive) | page metadata | Same |
| `/aesthetic-device-claim-audit` | Device claim audit vertical | NOINDEX (archive) | layout | Same |
| `/glp-1-weight-loss-claim-audit` | GLP-1 vertical | NOINDEX (archive) | layout | Same |
| `/regenerative-medicine-claims` | Regenerative vertical | NOINDEX (archive) | layout | Same |
| `/new-york-med-spa-claim-audit` | NY/NJ vertical | NOINDEX (archive) | layout | Same |
| `/insights/glp-1-claim-audit` | GLP-1 teardown | NOINDEX | layout | Non-canonical content |
| `/proof` | Proof library (fixtures) | NOINDEX | layout | Trust infra; fixtures |
| `/proof/sealed-audit-trail` | Verify path | NOINDEX | parent layout | Utility |
| `/verify` | Badge standards | NOINDEX | page metadata | Trust infra |
| `/claim-audit` | AuditGPT intake | NOINDEX | layout + page metadata | Utility intake |
| `/claim-audit/[publicId]` | Archetype review records | NOINDEX | parent layout | Fictional fixtures — must not index as real |
| `/sample-owner-brief` | Sample owner brief (fixture) | NOINDEX | page metadata | Fictional fixture |
| `/partners` | Referral program | NOINDEX | page metadata | Non-canonical |
| `/partner-os` | Partner OS founding beta | NOINDEX | page metadata | Non-canonical |
| `/tracker` | Source-linked enforcement tracker | NOINDEX | page metadata | Reference data, static feed |
| `/company` | Company story | NOINDEX | page metadata | Non-canonical |
| `/enterprise` | Insurers & acquirers | NOINDEX | page metadata | Strategic inventory |
| `/for-multi-location` | Multi-location operators | NOINDEX | page metadata | Strategic inventory |
| `/ai-visibility` | AI visibility | NOINDEX | layout | Non-canonical |
| `/agent-audit` | Agent audit receipt | NOINDEX | page metadata | Utility |
| `/safety-architecture` | Safety architecture | NOINDEX | layout | Non-canonical |
| `/use-cases/agency-white-label-audits` | Agency white-label use case | NOINDEX | layout | Non-canonical |
| `/private-equity/claim-diligence` | PE/M&A diligence (prices removed) | NOINDEX | page metadata | Strategic inventory; not marketed publicly |

## REDIRECT — legacy consolidation (next.config.ts redirects)

| Route | → | Type | Reason |
|---|---|---|---|
| `/pilot` | `/agency` | 301 | Legacy pilot → agency pilot equivalent |
| `/snapshot` | `/contact?intent=claim-support-review&source=scrutexity-snapshot` | 307 | Legacy snapshot entry → canonical intake |
| `/radar` | `/claim-audit` | 301 | Intake renamed |
| `/radar-pilot` | `/` | 301 | Legacy |
| `/auditgpt` | `/contact?...` | 301 | Cross-brand consolidation |
| `/partners/agency-console` | `/partners` | 301 | Legacy |
| `/agency/claim-intelligence-receipt` | `/agency/claim-receipt` | 301 | Legacy |
| `/compliance`, `/certified-agency-program`, `/dscsa-compliance`, `/iv-therapy-compliance`, `/baa` | constraint-safe equivalents | 301 | Names asserted compliance/certification |
| ~50 further legacy `/about/*`, `/versus/*`, `/modules/*`, `/intelligence/*`, compare/recovery slugs | canonical equivalents | 301 | Preserve inbound links, prevent 404s |

## REMOVE / 410

| Route | Treatment | Reason |
|---|---|---|
| `/benchmarks/state-of-medspa-claims` | Removed this pass (route deleted) | Public internal strategy memo + unsupported percentages; source preserved in `docs/benchmarks-state-of-medspa-claims-INTERNAL.md` |
| `/methodology/v1` | 404 after deploy (not in local repo) | Duplicate route that existed only in the prior deployment |

## INTERNAL / PROTECTED — not public marketing (no index, no nav, no sitemap)

| Route | Purpose | Treatment |
|---|---|---|
| `/self-audit` | Self-audit tool (untracked user work) | INTERNAL — untouched this pass, not indexed |
| `/private-equity/report` | Diligence report surface | INTERNAL/PROTECTED — not linked publicly |
| `/checkout/success` | Post-payment landing | UTILITY — not linked from nav/sitemap |
| `/verify-receipt` | Post-verify receipt | UTILITY |
| `/claim-receipt` | Post-audit receipt | UTILITY |
| `/agency/claim-receipt` | Agency receipt | UTILITY |
| `/snapshot/[publicId]` | Snapshot receipt | UTILITY (robots disallows `/snapshot`) |

## API / UTILITY (robots disallowed)

- `/api/*` (all API routes) — robots disallow `/api/`
- `robots.ts`: `Disallow: /api/, /snapshot, /admin, /private, /internal`

## AuditGPT domain

- `auditgpt.ai` → 301/redirect to `https://www.scrutexity.com` — intended (AuditGPT = internal review-engine brand; Scrutexity = public company).
- Canonical host: `https://www.scrutexity.com` (non-www `scrutexity.com` → www redirect in next.config).
- No standalone AuditGPT application is marketed; footer "AuditGPT snapshot" link resolves through the redirect chain to the canonical intake.

## Re-publish gates

- Any archived route may return to INDEX only with: canonical pricing, no fabricated telemetry, no fear-based copy, evidence-labeled fixtures, and a documented dataset for any statistics.
- New routes must be classified in this table before deployment.
