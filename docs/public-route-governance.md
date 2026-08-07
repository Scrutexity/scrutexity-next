# Public route governance

Last reviewed: 2026-08-04

Scrutexity is the public company. AuditGPT is an internal review-engine brand, not a standalone public application. Only routes marked `INDEX` belong in navigation or the XML sitemap.

## Customer-facing routes

| Route | Purpose | Treatment | Canonical destination | Navigation | Sitemap | Reason |
|---|---|---|---|---|---|---|
| `/` | Company overview and primary review entry | INDEX | `/` | Yes | Yes | Primary public surface |
| `/pricing` | Canonical public offers | INDEX | `/pricing` | Yes | Yes | Single pricing source of truth |
| `/what-we-do` | Service overview | INDEX | `/what-we-do` | Footer | Yes | Intentional product explanation |
| `/methodology` | Current review method | INDEX | `/methodology` | Yes | Yes | Public method and boundaries |
| `/methodology/v1` | Versioned method record | INDEX | `/methodology/v1` | From methodology | Yes | Stable citation target |
| `/sample-report` | Clearly labeled fictional report fixture | INDEX | `/sample-report` | Yes | Yes | Demonstrates paid output without implying customers |
| `/contact` | Canonical inquiry flow | INDEX | `/contact` | Yes | Yes | Conversion route |
| `/agency` | Active Agency Claim QA audience page | INDEX | `/agency` | Yes | Yes | Canonical active agency offer |
| `/about` | Founder and company identity | INDEX | `/about` | Yes | Yes | Public credibility page |
| `/data-handling` | Data handling policy | INDEX | `/data-handling` | Footer | Yes | Customer policy |
| `/terms` | Terms | INDEX | `/terms` | Footer | Yes | Legal document |
| `/privacy` | Privacy policy | INDEX | `/privacy` | Footer | Yes | Legal document |
| `/checkout/success` | Post-checkout status | NOINDEX | `/checkout/success` | No | No | Transactional state, not acquisition content |

## Retired and consolidated page routes

| Route | Purpose | Treatment | Canonical destination | Navigation | Sitemap | Reason |
|---|---|---|---|---|---|---|
| `/aesthetic-device-claim-audit` | Legacy device vertical | REDIRECT | `/pricing` | No | No | Delivery is not an active standalone vertical |
| `/glp-1-weight-loss-claim-audit` | Legacy GLP-1 vertical | REDIRECT | `/pricing` | No | No | Retires fear-framed copy and legacy pricing |
| `/insights/glp-1-claim-audit` | Legacy GLP-1 teardown | REDIRECT | `/methodology` | No | No | Unsupported sample claims are not published |
| `/medical-wellness` | Legacy wellness workflow page | REDIRECT | `/pricing` | No | No | Archived from acquisition; fictional telemetry removed from source |
| `/medical-wellness/med-spas` | Legacy med-spa vertical | REDIRECT | `/pricing` | No | No | Not sold as a distinct current offer |
| `/new-york-med-spa-claim-audit` | Legacy regional vertical | REDIRECT | `/pricing` | No | No | Retires enforcement-led copy and historical prices |
| `/regenerative-medicine-claims` | Legacy regenerative vertical | REDIRECT | `/pricing` | No | No | Not sold as a distinct current offer |
| `/private-equity/claim-diligence` | Strategic PE inventory | REDIRECT | `/pricing` | No | No | No verified active diligence offer |
| `/private-equity/report` | Legacy PE sample | REDIRECT | `/sample-report` | No | No | Consolidates fictional examples into labeled sample |
| `/benchmarks` | Former benchmark collection root | REDIRECT | `/methodology` | No | No | No public benchmark dataset exists |
| `/benchmarks/state-of-medspa-claims` | Former internal planning memo | REDIRECT | `/methodology` | No | No | Source removed; unsupported percentages archived privately |
| `/proof` | Legacy proof library | REDIRECT | `/sample-report` | No | No | Avoids fictional artifacts presented as live proof |
| `/proof/sealed-audit-trail` | Legacy sealed-record demo | REDIRECT | `/sample-report` | No | No | No live production receipt is asserted |
| `/verify` | Legacy archetype badge registry | REDIRECT | `/sample-report` | No | No | Records are fixtures, not verified companies |
| `/verify-receipt` | Legacy receipt verifier | REDIRECT | `/methodology` | No | No | Not an active customer-facing verification product |
| `/claim-audit` | Legacy intake | REDIRECT | `/sample-report` | No | No | Replaced by canonical contact flow |
| `/claim-audit/[publicId]` | Fictional archetype report fixtures | REDIRECT | `/sample-report` | No | No | Prevents fixtures appearing as customer records |
| `/snapshot/[publicId]` | Legacy snapshot alias | REDIRECT | `/sample-report` | No | No | Removes chained fixture route |
| `/claim-receipt` | Legacy receipt demo | REDIRECT | `/sample-report` | No | No | Consolidates samples |
| `/sample-owner-brief` | Legacy illustrative brief | REDIRECT | `/sample-report` | No | No | One clearly labeled sample destination |
| `/agency/claim-receipt` | Legacy agency receipt | REDIRECT | `/agency` | No | No | Agency offer is canonical |
| `/agent-audit` | Legacy self-serve agent audit | REDIRECT | `/pricing` | No | No | Agent Evidence Pack is the current offer |
| `/ai-visibility` | Legacy AI visibility product | REDIRECT | `/what-we-do` | No | No | Not a standalone current offer |
| `/company` | Old company page | REDIRECT | `/about` | No | No | Canonical identity route |
| `/enterprise` | Legacy enterprise page | REDIRECT | `/pricing` | No | No | No separate enterprise ladder |
| `/for-multi-location` | Legacy multi-location page | REDIRECT | `/pricing` | No | No | No separate current package |
| `/partner-os` | Legacy partner product | REDIRECT | `/agency` | No | No | Agency QA is the active partner path |
| `/partners` | Legacy partner page | REDIRECT | `/agency` | No | No | Consolidated agency path |
| `/safety-architecture` | Legacy architecture page | REDIRECT | `/methodology` | No | No | Methodology owns public boundaries |
| `/tracker` | Legacy enforcement tracker | REDIRECT | `/methodology` | No | No | No maintained public dataset |
| `/use-cases/agency-white-label-audits` | Legacy agency use case | REDIRECT | `/agency` | No | No | Consolidated agency route |

## Redirect-only aliases

The following routes have no active page component and are intentionally governed by `next.config.ts`: `/snapshot`, `/pilot`, `/auditgpt`, `/contento`, `/radar`, `/dashboard-test`, `/techweek`, `/agency/claim-intelligence-receipt`, `/about/*` legacy routes, `/versus/*`, `/claim-intelligence`, `/audit`, `/ai-readiness-index`, `/governance`, `/infrastructure-brief`, `/intelligence`, `/intelligence/*` legacy routes, `/personal-brand-audit`, `/partners/agency-console`, `/remediation`, `/roadmap`, `/security`, `/security-brief`, `/terms-of-pilot`, `/thesis`, `/trust`, `/compliance`, `/certified-agency-program`, `/dscsa-compliance`, `/iv-therapy-compliance`, `/baa`, legacy revenue-recovery routes, `/sample-snapshot`, `/platform`, `/demo`, `/radar-pilot/*`, `/roi`, `/flow`, `/diagnostic`, `/architecture-visual`, `/case-studies`, `/for-pe`, `/private-equity`, `/comparison/zenoti`, `/zenoti-alternative-without-migration`, `/modules/*`, and `/mri`.

`/pilot` permanently redirects in one hop to `/agency`. `/snapshot` permanently redirects to the canonical Claim Support Review inquiry. `auditgpt.ai` must redirect externally to `https://www.scrutexity.com/` without routing back to an AuditGPT product surface.

## API and utility routes

All routes below are `API/UTILITY`, absent from navigation and sitemap, and disallowed under `/api/` in `robots.txt`:

| Route | Purpose | Treatment |
|---|---|---|
| `/api/auditgpt/scan` | Internal scan handler | API/UTILITY |
| `/api/auditgpt/transcript` | Internal transcript handler | API/UTILITY |
| `/api/claim-audit` | Legacy audit intake | API/UTILITY |
| `/api/claim-receipt` | Receipt generation | API/UTILITY |
| `/api/create-checkout-session` | Checkout session creation | API/UTILITY |
| `/api/ingest/cms` | CMS ingestion | API/UTILITY |
| `/api/inquiries` | Inquiry persistence and notification | API/UTILITY |
| `/api/leak-report` | Legacy report endpoint | API/UTILITY |
| `/api/ledger` | Internal record endpoint | API/UTILITY |
| `/api/live-claims` | Claim-data endpoint | API/UTILITY |
| `/api/partner-os-application` | Legacy partner application | API/UTILITY |
| `/api/pilot-application` | Legacy pilot application | API/UTILITY |
| `/api/pilot` | Legacy pilot handler | API/UTILITY |
| `/api/remediation/proposals` | Internal proposal endpoint | API/UTILITY |
| `/api/report-request` | Report request endpoint | API/UTILITY |
| `/api/snapshot` | Legacy snapshot endpoint | API/UTILITY |
| `/api/vanta/evidence` | Evidence integration endpoint | API/UTILITY |
| `/api/verify/[hash]` | Record verification endpoint | API/UTILITY |
| `/api/webhooks/stripe` | Stripe webhook | API/UTILITY |
| `/api/webhooks/twilio` | Twilio webhook | API/UTILITY |

## Sitemap rule

The sitemap is an allowlist, not a reflection of every route that returns HTTP 200. Only the twelve `INDEX` routes above are emitted. Redirects, transaction pages, fixture routes, public utilities, and APIs remain excluded.
