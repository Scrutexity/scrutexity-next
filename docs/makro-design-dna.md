# Makro Design DNA — Clone Reference

> **Source:** https://makro.framer.website/home-alt (Framer template "Makro: Responsive AI Website Template" by Nick Stepuk)
> **Captured:** 2026-08-07 from rendered HTML (`/tmp/makro.html`, 1.16MB)
> **Purpose:** Reference for rebuilding this design as a Scrutexity page at a new route (e.g. `/redesign`).
> **Status:** Founder-approved literal palette override of `DESIGN_SYSTEM.md` — see "Palette decision" below.

---

## 0. Build constraints (locked)

- **Target:** `apps/web/src/app/<route>/page.tsx` — do NOT touch the live homepage (`UmbrellaHomepage`).
- **Palette:** LITERAL Makro values (founder override of DESIGN_SYSTEM.md). Scope all hardcoded colors to this component only — never touch global `@theme` tokens.
- **Copy:** Write ORIGINAL Scrutexity copy in Makro's skeleton. Their text is Framer-template placeholder content — do not lift it.
- **Fonts:** Makro uses Inter. Project locks Instrument Serif (display) / Geist (body) / JetBrains Mono (labels). Decide: either add Inter via `next/font/google` for this page, or map to Geist (closest match). Default recommendation: Geist body + Instrument Serif display for headlines to keep the Scrutexity voice.
- **Verification:** `npm run build` must exit 0; route appears in build output.

---

## 1. Palette (literal Makro tokens)

> CORRECTED 2026-08-07 against the live page. The canvas is the painted
> `#ebeff5` (hero section background), with `#ffffff` as the panel stacked on
> top. `#14142d` is the ink, not the background. Verified by sampling what is
> painted behind the hero rather than reading `document.body`, which computes
> to white but is never visible.

| Role | Hex | Usage |
|---|---|---|
| Ink navy | `#14142d` | PRIMARY TEXT (ink). Corrected: this is not the background. |
| Panel navy | `#33335e` | Card surfaces, panels (22 refs) |
| Near-black | `#1a1a1a` | Dark bands |
| Panel deep | `#242426` / `#35363b` / `#4d4f57` | Secondary fills (token-resolved) |
| Text lavender | `#ebedfa` | Headings + body on dark (11 refs) |
| Muted periwinkle | `#9391b8` | Secondary/muted text (9 refs) |
| Light gray-blue | `#ebeff5` | Light surfaces (6 refs) |
| **Lime accent** | `#d9ff5c` | **Signature move** — CTAs, glows, highlights (59 token refs, 2 literal) |
| Periwinkle | `#c0adff` | Secondary accent |
| Ice blue | `#b8deff` | Tertiary accent |
| Blush | `#e0c5b6` | Warm accent |
| Pale lavender | `#a5b2cf` | Muted accent |
| Dark indigo | `#14142d` → `#33335e` | Gradient direction for panel fills |

Opacity variants seen: `#242426bf` (75%), `#24242680` (50%), `#24242640` (25%), `#ffffffbf` (75%), `#ffffff80` (50%) — cards layer translucent fills over the navy base.

Gradients: `linear-gradient(180deg, …)` — panels stack white-translucent (`#ffffffbf`/`#ffffff80`) over navy. Glass-card look, not flat.

---

## 2. Typography

- **Font family:** Inter (Framer default — `var(--framer-font-family, Inter, Inter …)`).
- Text colors: `#ebedfa` (primary), `#9391b8` (muted).
- Headline treatment: large, tight leading, bold weight; `--framer-text-transform` used for uppercase kicker labels.

---

## 3. Page structure — 14 sections in exact order

1. **Nav** — sticky; links Home / Company / Blog / Updates / Contact; CTA "Get started" (×2 — desktop + mobile).
2. **Hero** — uppercase badge "AI-Powered Finance" → huge display headline "Know your cash. Plan with AI." → sub "Stay on top of every transaction, invoice, and forecast in one clean view." → "Get started" CTA (×4 in DOM = desktop/mobile/hover states).
3. **Trusted-by strip** — "Trusted by solopreneurs, startups and enterprise" (logo row).
4. **Case study feature** — "Latest case study" label + one-line product intro.
5. **Feature tab grid** — 4 tabs/columns: "Predict your income" (Cashflow forecast) / "Control spending" (Smart Expense Sorting) / "See what matters" (Insights & Signals) / "Progress over time".
6. **Product showcase band** — the UI-heavy section, 6 mini-modules of mock dashboard cards:
   - **Sort / Smart Expenses** — AI groups transactions: Operations, Income, Software, Marketing, Rent, Utility, Taxes & Fees
   - **Connect / Bank Sync** — auto-imported: "Wire Transfer · 1 min ago · +$1,250.00"
   - **Control / Daily AI Insights** — "+15% Balance Increase"
   - **Track / Invoice Status** — invoice rows (#002-12 Paid · Mira Studio · $1,200; #003-12 Overdue · Silver Desk · $550; pending/paid variants)
   - **Plan / Upcoming Bills** — recurring: $320 Design Tool, $220 Cloud Hosting, $18 Productivity
   - **Protect / Anomaly Detection** — "Stripe fee spike — Now: $486, Avg: $120, Mark as expected"
7. **Built for Clarity band** — "Financial insight, finally simple." + "Master your cash flow." → 3 cards: **Visibility** / **Forecasting** / **Automation**, each with one-line description + "Get started".
8. **Pricing** — 3 tiers + toggle (Annual/Monthly):
   - Makro Free — $0/mo — 5 features
   - Makro Pro — $49/mo — "Everything in Free" + 3
   - Makro Premium — $149/mo — "Everything in Pro" + 4
9. **Enterprise** — "Get custom pricing" → "Contact sales" band.
10. **Testimonials** — "Customer Spotlight" — 4 cards, each: quote / role ("Founder & CEO") / name / "Monthly revenue tracked" metric / "Use cases" list. (Atlas Labs $150–250k, Northway Studio $80–120k, Brightline Tech $200–350k, Kinetic Agency $60–90k.)
11. **FAQ** — "We have the answers" — tabs (General / Forecasting / Setup & integrations / Security and privacy) + 6 accordion Q&As.
12. **Blog** — "Latest insights" — 3 article cards (category / date / title / "Read article").
13. **Final CTA** — "Ready to take control of your numbers?" + "Get Started".
14. **Footer** — © 2026 + columns: Index (Features/Pricing/Testimonials/FAQ), Company (About/Updates/Contact/Blog), Social (X/Facebook/Instagram/Discord), Legal (Terms/Privacy/Cookie). Plus hidden Framer "Get Template" watermark.

---

## 4. Motion & responsiveness (from HTML analysis)

- **Animations are Framer Motion JS-driven** — no CSS `@keyframes` in the dump. Scroll-reveal pattern: 342 elements start `opacity: 0`, 169 use transforms (`translateY`/`translateX`/`scale`). Port as: IntersectionObserver reveal (fade-up 24px, ~0.75s ease-out), or framer-motion if already in deps.
- **Hover states:** cards lift / glow; CTA lime accent brightens. Buttons `border-radius` heavy (rounded pill).
- **Count-up numbers:** "+15% Balance Increase", "$150–250k" revenue metrics — animate on scroll into view.
- **Breakpoints (39 media-query sets each):**
  - Desktop: `max-width: 1439px` + `min-width: 1024px`
  - Tablet: `max-width: 1023px` + `min-width: 810px`
  - Mobile: `max-width: 809px`
  - Secondary set: 1200px / 810px / 809.98px
  - → Design responsive at ~1440, 1024, 810, and mobile-first below 810.
- **Backdrop filter:** only 2 occurrences — minimal glass-blur; most glass effect is translucent fill + border, not blur.

---

## 5. Signature visual recipes (for the port)

1. **Dark canvas:** `#14142d` full-bleed page bg; sections separated by panels `#33335e` or translucent overlays (`#242426` at 25–75%).
2. **Lime accent discipline:** `#d9ff5c` reserved for the one CTA + key highlight numbers — don't spread it thin.
3. **Glass cards:** `bg-[#ffffff0d]`-style translucent fill + `border border-white/10` + rounded corners; no heavy blur.
4. **Kicker labels:** uppercase, letter-spaced, muted periwinkle `#9391b8` above headlines.
5. **Display headline:** near-white `#ebedfa`, tight tracking, generous scale (hero ~text-6xl/7xl).
6. **Metric emphasis:** lime or periwinkle on numbers inside mock-UI cards.

---

## 6. Files & evidence

- Captured HTML: `/tmp/makro.html` (1.16MB — full rendered Framer output; may be cleared on reboot — re-capture via `curl -sL "https://makro.framer.website/home-alt" -o /tmp/makro.html` if needed).
- This file: `docs/makro-design-dna.md`.
- Vision QA now works (NVIDIA `meta/llama-3.2-11b-vision-instruct` via `auxiliary.vision`) — next session can screenshot-compare the port against the live site.

---

## 7. Copy mapping notes (write original Scrutexity copy)

| Makro slot | Scrutexity concept |
|---|---|
| AI-Powered Finance badge | Forensic Intelligence / Public Claim Intelligence |
| "Know your cash. Plan with AI." | Claim-review one-liner (e.g. "Know what's claimed. See what's proven.") |
| Cashflow forecast | Claim Exposure Diagnostic |
| Smart Expense Sorting | Evidence gap detection |
| Insights & Signals | Claim drift / distortion signals |
| Invoice status | Claim status / review pipeline |
| Upcoming bills | Watch subscription / renewal monitoring |
| Anomaly detection | Distortion snapshot alerts |
| Pricing tiers | Snapshot FREE / Review $99 / Watch $1,500-mo (per live pricing 8/2026) |
| Testimonials | **Illustrative** only — never fabricated named clients (FTC rule) |
| FAQ | Boundary statement required: not a law firm, not legal advice |
