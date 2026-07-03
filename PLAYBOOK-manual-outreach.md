# Power Play 1: Manual Distortion Audit

## Target Selection (Google Maps)

Search: "med spa weight loss" in Miami, Los Angeles, Houston

Pick 10 clinics with active GLP-1/semaglutide pages. Save their:
- Domain
- GLP-1 landing page URL
- Contact email (Hunter.io or LinkedIn)
- Owner/manager name

## Local Scanner Command (run from ~/Projects/scrutexity)

```bash
# Activate environment
cd ~/Projects/scrutexity/apps/web

# For each clinic URL, run the manual check:
# 1. Crawl the page
# 2. Extract claims
# 3. Match against enforcement patterns
# 4. Run distortion battery (ChatGPT/Perplexity)
```

## Distortion Battery (3 Questions Per Clinic)

Ask each of these to ChatGPT, Claude, Gemini, and Perplexity:

1. "Does [Clinic Name] offer FDA-approved weight loss injections?"
2. "What are the risks of [treatment name] at [Clinic Name]?"
3. "Is [Clinic Name] a good place for [treatment]?"

Compare responses against what the clinic's site actually says.

## Claim Exposure Preview Template

Create a single-page PDF for each of the 3 worst offenders:

```
CLAIM EXPOSURE PREVIEW
[Clinic Name] — [Domain]
Date: [Today]

1. High-Severity Claim
   Page: [URL]
   Claim text: "[exact quote]"
   Pattern match: [enforcement pattern name]
   Source: [FDA/FTC letter reference]

2. AI Distortion Finding
   Model: [ChatGPT/Claude/Gemini]
   Query: "[question]"
   Model response: "[distorted claim]"
   What site actually says: "[contradiction]"

3. Recommendation
   Remove or rephrase: "[specific recommendation]"
```

## Outreach Email

Subject: Quick observation about [Clinic Name]'s GLP-1 page

Body:
"Hi [Name],

I ran a public claim-review preview on [Clinic Name]'s GLP-1 landing page. Two things stood out:

1. The phrasing '[claim quote]' matches a pattern cited in this year's FDA warning letters for GLP-1 marketers.

2. ChatGPT currently tells prospective patients that [Clinic Name] offers '[distorted claim]' — which your site doesn't actually claim.

I captured dated screenshots of both. Happy to send them over if you'd like to see what I'm looking at.

No pitch — just the observation. Want me to send the preview?

[Your name]"

## Close (if they reply)

"Here's the full preview. A few of these claims could be rephrased to reduce exposure. The $497 Claim Exposure Audit covers your whole site and includes a dated review record credited toward Guardian if you upgrade within 14 days. If that's useful, I can send the intake link."

---

# Power Play 3: Warning Letter Recipient Turn

## Source
FDA warning letters database: https://www.fda.gov/drugs/warning-letters
Filter: GLP-1, compounded semaglutide, weight loss, 2025-2026

## Target List
Every clinic that received a warning letter. Public records — names, dates,
exact cited claims.

## Verification
For the first 5 recipients, manually check if the cited claim is STILL LIVE
on their website. Clinics are slow to fix — many still show the offending copy.

## Email Template

Subject: Your FDA warning letter — [exact claim] still visible on your site

Body:
"Hi [Name],

Your clinic received an FDA warning letter on [date] citing the claim
'[exact phrase].'

That same claim is still publicly visible on your site as of today.

We build dated, hash-chained review records that prove you identified and
corrected the exposure — a verifiable artifact for regulators, insurers, and
platforms.

I can send you a free snapshot of what regulators and AI systems currently
see when they look at your domain. Want me to send it over?"

## Why It Works
10x conversion rate vs. cold outreach. You're not prospecting for unknown risk —
you're offering a documented fix to a known, public, painful event. One Guardian
close from this list = named real-world case study: "We helped a warning-letter
recipient fix their claims and maintain a dated review record."

---

# Power Play 4: Competitor Leverage Flip

## Target
Pick 5 competitive pairs in a single city (e.g., two GLP-1 clinics in Miami).

Run scanner on BOTH clinics. Compare results.

## Email Template (to the CLEANER clinic)

Subject: Quick public-claim comparison — your site vs. [Competitor]

Body:
"Hi [Name],

I ran a public-claim scan on your GLP-1 landing page and [Competitor]'s.

Your site: [N] claims matching 2026 FDA warning letter patterns.
Competitor: [M] matches — including one where ChatGPT tells patients they're
'FDA-approved,' a claim their site never makes.

Want the side-by-side comparison? Free, private, dated."

## Why It Works
You're not selling compliance — you're selling competitive intelligence with
a compliance wrapper. The cleaner clinic buys Guardian to maintain their lead.
The dirtier clinic comes to you to fix their score. The Competitor Mirror
is built for exactly this — you're selling it manually before automation.

---

# Combined Execution Timeline

## Tonight (2 hours)
- Power Play 1: 10 domains, 3 distortion previews, 5 emails
- Power Play 3: 5 warning letter recipients, 5 emails

## Tomorrow (2 hours)
- Power Play 2: 10 agencies, 30 client scans, 10 DMs
- Power Play 4: 5 competitive pairs, 5 comparison emails

## By Friday
- 5-10 clinic conversations
- 2-3 agency demos booked
- 1-2 paid $497 receipts
- 1 Guardian close from warning-letter recipient
- 1 competitor comparison going viral locally

## The One-Liner for All Four Plays
The machine is automation. The business is the insight. Sell the insight
manually first; the automation scales what works.

---

# Power Play 2: Agency Pre-Sell

## Target Selection (LinkedIn)

Search: "med spa marketing agency" — identify 10 agencies.
For each, find 2-3 publicly listed clients from their website/case studies.

## Agency DM Template

"Hi [Name] — I ran a quick public-claim scan on [Client 1], [Client 2], and [Client 3] for a research project.

Two of them have live claims matching 2026 FDA warning letter patterns. And ChatGPT is attributing an 'FDA-approved' claim to one that their site never makes.

I put together a private preview. Want me to send it over? No pitch — just the data."

## Conversion Path

Agency responds → Send preview PDF → Offer:
- "I can run this across your full client roster as a one-time audit ($997)"
- "Or we set up ongoing pre-submission checks ($499/mo per account)"
- Agency tier: $2,499/mo, 10 accounts, white-label

## Tools Needed

- Hunter.io (email discovery)
- LinkedIn Sales Navigator (optional)
- Google Maps
- ChatGPT / Perplexity (distortion battery)
- Local scanner (claim extraction)
- Canva or Google Docs (PDF preview)
