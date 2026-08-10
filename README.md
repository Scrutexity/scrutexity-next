# Scrutexity Website

Canonical website for Scrutexity, deployed to `scrutexity.com` through the Vercel project `scrutexity`.

## Positioning

Scrutexity is a built-environment intelligence company. It helps owners, developers, contractors, technology companies, investors, and public-sector teams understand emerging construction technology, verify what is field-ready, and make higher-conviction deployment decisions.

Primary capabilities:

- Market intelligence across vendors, deployments, procurement, policy, and capital
- Technical diligence for construction robotics, smart-site systems, digital twins, and embodied AI
- Deployment strategy that converts research into pilots, partnerships, and buying decisions

Research must remain source-linked and evidence-calibrated. Scrutexity does not provide engineering, legal, investment, procurement, or safety advice and does not guarantee field performance.

## Local development

```bash
cd apps/web
npm install
npm run dev
```

## Verification

```bash
cd apps/web
npm run lint
npm run build
```

## Structure

- `apps/web/src/app/` — routes, metadata, and APIs
- `apps/web/src/components/` — shared product and marketing components
- `apps/web/public/` — production static assets
- `docs/` — research, positioning, and operating references
- `DESIGN_SYSTEM.md` — canonical visual and messaging guidance
