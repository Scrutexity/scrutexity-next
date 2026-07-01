# Scrutexity Website

Canonical website for Scrutexity, deployed to `scrutexity.com` through the Vercel project `scrutexity`.

## Product direction

Scrutexity is positioned as an operational intelligence and growth infrastructure company for medical aesthetics and adjacent medical-wellness markets. The site supports multiple buyer journeys: independent operators, multi-location groups, agencies and strategic partners, and enterprise teams.

Truthful claims and compliance remain hard boundaries. Current offers, features, and evidence must be distinguished from roadmap or category vision. Compliance constrains execution and claims—not strategic ambition.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Structure

- `src/app/` — routes, metadata, and APIs
- `src/components/` — shared product and marketing components
- `src/data/` — structured site data
- `public/` — production static assets
- `docs/` — current claim, marketing, and design references
- `DESIGN_SYSTEM.md` — canonical brand, positioning, and claims guidance

Generated directories such as `.next/` and `out/`, TypeScript build caches, local environment files, and Vercel linkage are not source documentation and should not be committed.
