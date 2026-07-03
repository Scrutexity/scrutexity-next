# AuditGPT Med-Spa Claim Receipts MVP

This is a contained launch kit for the 90-day Scrutexity / AuditGPT wedge:
med-spa and GLP-1 claim-risk receipts sold through agencies, with every audit
feeding the proprietary Claim Record Dataset.

## Masterclass Play

### Phase 1: Days 1-30 - Sell the Receipt

**Objective**

Get the first 5 paid claim audits and prove that agencies or clinic operators
will pay for a reviewed receipt before any dashboard exists.

**Key actions**

- Freeze broad product changes for 90 days.
- Use AuditGPT as the front-door diagnostic and Scrutexity as the receipt and
  cleanup layer.
- Launch the single landing page in `web/`.
- Sell the free Claim Snapshot and $497 Reviewed Claim Audit only.
- Run 100 agency outbound touches per week.
- Manually review the first claims with a conservative language checklist.
- Store every reviewed claim in the Claim Record schema.

**Deliverables**

- Live Claim Snapshot page.
- Working intake form and SQLite lead capture.
- PDF Claim Snapshot receipt.
- Agency outbound sequence.
- 5 completed paid audits.

**Success metric**

At least 5 paid $497 audits, 2 agency conversations with repeat-client
potential, and a reviewed dataset of 25+ structured claim records.

### Phase 2: Days 31-60 - Productize Fulfillment

**Objective**

Reduce delivery time, improve trust quality, and turn one-off audits into a
repeatable agency offer.

**Key actions**

- Create one standard receipt format and do not customize except agency logo.
- Add source categories for FDA, FTC, state board, ad platform, review sites,
  and AI-answer surfaces.
- Build a weekly agency batch workflow: intake CSV, claim review, PDF bundle.
- Recruit one compliance reviewer before hiring engineering help.
- Publish anonymized "Claim Watch" content using only public, sourced examples.

**Deliverables**

- Agency batch receipt workflow.
- Claim Record Dataset v1 with risk categories and evidence-gap labels.
- 3 anonymized claim teardown posts.
- White-label portal mockup for sales calls.
- First agency pilot contract.

**Success metric**

10 paid audits total, one agency pilot, delivery time below 90 minutes per
receipt, and 75+ claim records.

### Phase 3: Days 61-90 - Make the Channel Repeatable

**Objective**

Convert agencies into recurring distribution and turn receipts into a data moat.

**Key actions**

- Sell Agency Plan tiers at $799, $1,497, and $1,997 per month.
- Build monthly portfolio risk summaries for agency clients.
- Track conversion from free snapshot to paid audit to cleanup sprint.
- Add lightweight QA: second reviewer for high-risk claims.
- Create the first vertical benchmark memo from anonymized dataset patterns.

**Deliverables**

- Agency Plan sales deck.
- Monthly portfolio receipt summary template.
- 150+ structured claim records.
- 2 agency pilots or 1 paid agency plan.
- Decision memo: continue wedge, adjust pricing, or narrow ICP further.

**Success metric**

$10k+ collected revenue or signed commitments, 150+ claim records, and at least
one repeatable agency workflow with paid clients behind it.

## Local Run

```bash
cd mvp/auditgpt-claim-receipts/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

Open `http://localhost:8080`.

The app stores leads and claim records in `backend/auditgpt.db`. If email
credentials are not configured, submissions are still saved and the generated
PDF path is returned in the response.

## Directory

- `web/` - conversion landing page for free snapshots and $497 audits
- `backend/` - Flask intake API, SQLite storage, email sending, PDF generation
- `portal/` - dark-theme agency white-label portal prototype
- `artifacts/` - outreach sequence and launch checklist

## Language Rules

Use:

- reviewed
- receipt
- evidence gap
- safer rewrite
- risk category
- source reference

Avoid:

- compliant
- certified
- approved
- guaranteed
- regulatory immunity
- legal clearance
