# Launch Checklist

## 90-Day Lock Commitments

- Wedge: med-spa and GLP-1 claim-risk receipts.
- Channel: agencies first, clinics second.
- Offer: Free Snapshot -> $497 Reviewed Claim Audit -> $1,997 Cleanup Sprint -> $799-$1,997/mo Agency Plan.
- Interface: PDF/HTML receipts before dashboards.
- Language: reviewed, receipt, evidence gap, safer rewrite. Never compliant, certified, approved, guaranteed, or regulatory immunity.
- Moat: every audit creates structured Claim Record Dataset rows.
- No pivots before day 90 unless the offer creates legal risk or cannot collect payment after 300 targeted outbound touches.

## Pre-Launch

- [ ] Confirm domain or subdomain, for example `auditgpt.scrutexity.com`.
- [ ] Configure hosting for the Flask service or convert the endpoint to the main Next app.
- [ ] Add environment variables from `backend/.env.example`.
- [ ] Create a dedicated sender inbox, for example `receipts@scrutexity.com`.
- [ ] Verify SPF, DKIM, and DMARC for the sender domain.
- [ ] Test `/api/health`.
- [ ] Submit the landing page form with a real email.
- [ ] Confirm SQLite rows are created in `snapshot_requests`, `audits`, and `claim_records`.
- [ ] Confirm PDF generates and uses conservative language.
- [ ] Confirm email either sends or returns `email_skipped_missing_credentials`.
- [ ] Add privacy and terms links if using live traffic.
- [ ] Add payment link for the $497 audit.

## First 7 Days

- [ ] Send 100 agency emails.
- [ ] Send 50 LinkedIn agency DMs.
- [ ] Manually review 10 public client pages for sample receipts.
- [ ] Book 5 discovery calls.
- [ ] Close 1 paid $497 audit.
- [ ] Add every reviewed claim to the Claim Record Dataset.

## First 30 Days

- [ ] Close 5 paid audits.
- [ ] Complete 25+ structured claim records.
- [ ] Publish 2 anonymized claim teardown posts.
- [ ] Identify the first compliance reviewer candidate.
- [ ] Build one agency pilot offer page or PDF.

## Go / No-Go Questions at Day 90

- Did the offer collect at least $10k or create signed agency commitments?
- Did agencies understand the receipt without a long explanation?
- Did delivery time fall below 90 minutes per paid receipt?
- Did the dataset reach 150+ structured claim records?
- Did buyers ask for monitoring or more receipt volume?
