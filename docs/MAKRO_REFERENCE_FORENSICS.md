# Makro `home-alt` reference forensics

Inspected live on 2026-08-10 at `https://makro.framer.website/home-alt`. Values below come from browser-computed styles at a 1363 × 936 viewport, not visual estimation.

## Semantic token map

| Reference role | Computed value | Scrutexity token |
|---|---:|---|
| Primary page shell | `rgb(235, 239, 245)` / `#EBEFF5` | `--sx-bg` |
| Elevated surface | `rgb(255, 255, 255)` / `#FFFFFF` | `--sx-surface` |
| Primary ink | `rgb(36, 36, 38)` / `#242426` | `--sx-ink` |
| Dark contrast surface | `rgb(53, 54, 59)` / `#35363B` | `--sx-dark` |
| Secondary dark surface | `rgb(77, 79, 87)` / `#4D4F57` | `--sx-dark-surface` |
| Signal accent | `rgb(217, 255, 92)` / `#D9FF5C` | `--sx-accent` |
| Muted ink | `rgba(36, 36, 38, 0.75)` | `--sx-muted` |
| Warm secondary card | `rgb(224, 197, 182)` | used only as reference evidence |
| Cool secondary card | `rgb(184, 222, 255)` | used only as reference evidence |

## Geometry and rhythm

- Desktop content rail: 1,200px.
- Horizontal page gutters: 40px; rail begins at x=74px in the measured viewport.
- Navbar: 56px high, 40px horizontal padding.
- Hero copy container: 1,200px wide; 180px top padding and 60px bottom padding.
- Hero product stage: 1,200 × 900px; major object radius 24px.
- Alternating feature frames: 1,200 × 720px with 8px outer inset, 24px outer radius, 16px inner radius, and 48px copy padding.
- Large contrast block: 16px outside gutter, 36px radius, near-black `#35363B`.
- Frequent radii: 12px controls, 16px inner surfaces, 24px product cards, 36px major dark block.
- Section choreography uses generous 180px headline bands and long sticky/product sequences rather than dense marketing stacks.

## Typography

- Reference family: Inter Display / Inter Variable.
- Hero: 72px size, 90px line height, weight 400, -2.88px tracking.
- Section H2: 48px size, 57.6px line height, weight 400, -1.92px tracking.
- Product H3: 32px size, 40px line height, weight 400, -0.96px tracking.
- Product H4: 28px size, 40.6px line height, weight 400, -0.84px tracking.
- Body clusters: 14px / 21px and 18px / 27px.

## Surface depth

- Primary product shadow family uses several low-alpha layers rather than one heavy drop shadow.
- Representative measured shadow: `0 0.64px 1.15px rgba(79,86,130,.11), 0 1.93px 3.48px rgba(79,86,130,.11), 0 5.11px 9.19px rgba(79,86,130,.10), 0 16px 28.8px rgba(79,86,130,.06)`.
- Elevated controls frequently use white surfaces with 12px radii and minimal or inset separation.

## Motion and interaction map

- The reference relies on smooth fade/translate entrances, subtle product parallax, long product-object scroll sequences, small hover shifts, and sticky viewport-height feature cards.
- Scrutexity equivalent uses the supplied `cubic-bezier(0.16, 1, 0.3, 1)`, 0.7–1.2s reveal timing, 40–100ms staged delays, a maximum 2°/3° Decision Record tilt, subtle cursor-follow highlight, and one lazy WebGL spatial field.
- All pointer depth is disabled for touch/coarse pointers and reduced-motion preferences.

## Breakpoint behavior observed and mapped

- Desktop reference max rail remains 1,200px.
- Scrutexity explicitly maps 1440/1280 desktop, 1024 compact desktop, 768 tablet, and 390 mobile.
- At 768 and below: feature pairs become one column, the timeline stacks, the bento becomes one column, dark principles stack, and WebGL is disabled.
- At 390: hero buttons become full-width, the Decision Record becomes a single column, labels stack above values, and the mobile sheet is the only navigation surface.
