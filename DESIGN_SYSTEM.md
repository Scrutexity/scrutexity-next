# Scrutexity — Design System & Brand Guidelines

*The single source of truth for how this site looks, moves, and speaks. Read before adding or editing any component. If a change conflicts with this doc, fix the change — not the doc (unless the founder says otherwise).*

---

## 0. North Star
**Premium operational intelligence with clinical credibility.** Serve independent operators, multi-location groups, management teams, strategic partners, and enterprise buyers. Tone: calm, authoritative, ambitious, evidence-led, and anti-hype. The brand may feel intimate on operator pages and technically formidable on platform, partner, security, and enterprise pages.

> 🚫 **No dark mode. No cyberpunk. No SaaS blue.** That aesthetic belongs to the separate personal dashboard, not this marketing site.

---

## 1. Color tokens
Defined in `src/app/globals.css` under `@theme`. **Only use tokens that exist there.** Before using any `bg-x`/`text-x`/`border-x`, confirm the token is defined — undefined classes silently render nothing (this previously caused invisible white-on-cream text).

| Token | Hex | Use |
|---|---|---|
| `warm-bg` / `ivory` | `#fbf7ef` | Default page background |
| `warm-card` | `#fffaf2` | Card surfaces |
| (band) | `#f3eadf` / `#efe6d7` | Alternating section bands for rhythm |
| `charcoal` | `#221f1b` | Primary text/ink (NOT a section background) |
| `text-muted` | `#6b6259` | Body/secondary text |
| (soft) | `#7a7066` | Tertiary text |
| `terracotta` | `#b9825f` | **The only CTA color** + emphasis |
| (terracotta hover) | `#a36b5d` | Button hover |
| `soft-gold` | `#d8b17a` | Subtle accent |
| `sage-accent` | `#7f8f78` | Success/verify accents |
| `burgundy-accent` | `#6b1d2f` | Rare deep accent |
| `border-muted` | `#e1d4c5` | Borders/dividers |

**Rules:** Terracotta is the primary conversion color. Warm backgrounds remain the default for operator-facing journeys. Dark, high-contrast, or technical visual systems are allowed when they materially improve enterprise credibility, data storytelling, demonstrations, or product comprehension; keep them intentional and accessible.

---

## 2. Typography
- **Display / headlines:** Instrument Serif → `font-display`. Serif headlines are the core premium signal.
- **Body / UI:** Geist → `font-sans`.
- **Mono (rare, labels):** JetBrains Mono → `font-mono`.
- Headlines `tracking-tight`, generous `leading`. Don't mix in other fonts.

---

## 3. Layout & components
- Sections: `px-5 py-24 sm:px-8 lg:py-32`, inner `mx-auto max-w-7xl` (or `max-w-4xl`/`max-w-5xl` for text/pricing).
- Cards: `rounded-[1.75rem]`, `border border-[#e1d4c5]`, warm shadow `shadow-[0_22px_70px_rgba(85,62,41,0.08)]`.
- Reusable classes already in `globals.css`: `.section-kicker`, `.luxury-panel`, `.glass`, `.glass-card`. Prefer these over reinventing.
- Buttons: `rounded-full`, terracotta bg, white text, `hover:-translate-y-0.5`, terracotta-tinted shadow.
- Featured/highlighted cards should create clear hierarchy. Warm or dark treatments are both valid when consistent with the page's audience and purpose.

---

## 4. Motion (restrained — luxury whispers)
- Scroll reveal: the shared `reveal` fade-up variant (`opacity 0→1`, `y 24→0`, ~0.75s easeOut).
- Subtle float on floating cards; slow `animate-pulse` status dots.
- No flashy, fast, or attention-grabbing animation. If it announces itself, it's wrong.

---

## 5. Imagery
- Real NYC clinical interiors / owner photography, warmed and darkened for text contrast.
- **No generic stock, no emoji as UI** (replace placeholder avatars with real headshots).
- Founder section should carry a real photo of Nick, not a monogram.

---

## 6. 🔴 Copy & compliance discipline (LEGAL — overrides marketing instinct)
CPOM (NY/CA/TX/FL) + FTC. Describe **non-clinical infrastructure**, never revenue-share / patient-acquisition / outcome-based pricing. Full rules: `../docs/COPY_LANGUAGE_DISCIPLINE.md` and `../STRATEGIC_POSITIONING_LOCKED.md`.

**Allowed:** missed-demand recovery · estimated opportunity (requires manual verification) · surfaced · clinic-owned infrastructure · governed inquiry routing · $0 if missed-demand recovery isn't demonstrated · weekly owner brief.

**Forbidden:** "we recover $X" · guaranteed ROI/results · per patient / per booked consult · % of revenue · "stealing/intercepting patients" · "legally bulletproof" · 10x multiple/$50M exit · **fabricated or named-but-fake testimonials**.

**Proof rule (FTC):** Never present a result as real unless it's a **named, consented, verifiable** client. Otherwise label it **"Illustrative."** Keep signed testimonial + redaction releases on file. Figures are estimates "requiring verification."

---

## 7. Canonical facts (keep consistent everywhere)
- **Pricing:** Keep public pricing internally consistent, but do not treat today's tiers as a permanent strategic ceiling. Support pilot, multi-location, partner, platform, and enterprise offers when approved and accurately described.
- **Offers:** Use the smallest credible commitment that opens the highest-value relationship. A pilot is one acquisition path—not the identity or ceiling of the company.
- **Active positioning:** Scrutexity is the claim intelligence platform behind AuditGPT and Contento. AuditGPT diagnoses unsupported public claims, AI answer drift, proof gaps, and agent-claim risks; Contento turns approved findings into governed, proof-aware assets.
- **Archived positioning:** Missed-demand recovery is retained as strategic inventory and med-spa domain knowledge. Do not use it as the default live company one-liner unless Nick explicitly revives that offer.
- **Growth posture:** These rules prevent unsupported promises; they do not prohibit category expansion, enterprise positioning, partner packaging, or new product pages when clearly labeled as roadmap, pilot, internal, or founder-approved work.

---

## 9. 🧠 Lexical guardrails — operator funnel

These are awareness rules, not limits on ambition. Match language to evidence and audience. Operator pages should remain concrete; platform and enterprise pages may articulate the larger system, roadmap, and category vision when clearly distinguished from currently shipped capabilities.

**🚫 Not allowed in operator pages:**
- `dashboard` — implies a product surface that doesn't exist yet
- `history` — implies a persistent record the operator manages
- `ongoing tracking` — implies system expansion beyond the Snapshot
- `system of record` — implies the product is authoritative for the business
- `platform` — use when describing a genuine platform capability, architecture, or strategic direction; avoid it only when a more precise word is stronger

**✅ Allowed if context is clearly operational (light usage):**
- `traceable` — fine in small doses for individual artifacts
- `benchmark` — useful clarity language for comparison
- `standardized measurement` — describes the methodology, not the product
- `cross-location comparison` — describes a capability, not a system feature

**🧭 When in doubt:**
If the phrase adds clarity to a single artifact, keep it. If it implies a persistent system the operator manages, cut it.
The Snapshot is a trust artifact, not a SaaS surface. Let the language reflect that.

## 10. Don't list
- ❌ Dark section backgrounds / dark mode
- ❌ Color classes whose token isn't defined in `@theme` (check first)
- ❌ SaaS blue, pure black, gradients that read "techy"
- ❌ Emoji/stock as UI
- ❌ Forbidden compliance language (§6) or pricing that contradicts §7
- ❌ Duplicate sections (e.g., two heroes/calculators) — `PremiumHomepage` is the canonical homepage body
