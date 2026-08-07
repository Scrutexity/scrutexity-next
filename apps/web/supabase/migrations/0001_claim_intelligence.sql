-- Scrutexity Claim Intelligence — core storage (Step 2)
-- Target: Supabase project (phvszentfaeishxdgxxl)
-- service_role bypasses RLS; anon reads are scoped to the public claim ledger only.
-- Apply with: supabase db push  (or paste into Supabase SQL Editor)

create extension if not exists "pgcrypto";

-- ── scans ──
-- The funnel scan record. full_package is the JSONB exhibit payload.
create table if not exists public.scans (
  id text primary key,
  target_url text not null,
  is_demo boolean not null default true,
  auth_level text not null default 'LOCKED',
  email text,
  full_package jsonb,
  provenance_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  purchased_at timestamptz
);

-- ── claim_risks ──
-- The ledger rows behind the Watch dashboard / live-claims endpoint.
create table if not exists public.claim_risks (
  id bigint generated always as identity primary key,
  scan_id text not null references public.scans(id) on delete cascade,
  claim_text text not null,
  severity_score integer not null,
  regulatory_triggers jsonb not null default '[]',
  visible_citation boolean not null default false,
  drift_detected boolean not null default false,
  drift_context text,
  safer_wording text
);
create index if not exists claim_risks_scan_id_idx on public.claim_risks(scan_id);
create index if not exists claim_risks_recent_idx on public.claim_risks(id desc);

-- ── unlocked_audits ──
-- Post-payment entitlements (mirrors lib/entitlements.ts schema).
create table if not exists public.unlocked_audits (
  id uuid primary key default gen_random_uuid(),
  public_id text not null,
  email text,
  stripe_session_id text unique not null,
  stripe_customer_id text,
  price_id text,
  amount_total integer,
  currency text default 'usd',
  status text not null default 'paid',
  entitlement text not null default 'full_report',
  unlocked_at timestamptz default now(),
  created_at timestamptz default now()
);
create index if not exists unlocked_audits_public_id_idx on public.unlocked_audits(public_id);
create index if not exists unlocked_audits_email_idx on public.unlocked_audits(email);

-- ── telemetry / leads / cms_audit_logs ──
-- Parity with the legacy sqlite schema (lib/db.ts) so no local-only table is lost.
create table if not exists public.telemetry (
  id bigint generated always as identity primary key,
  claim_health_score integer not null,
  unsupported_language_count integer not null,
  proof_artifacts_count integer not null,
  ai_answer_surfaces_count integer not null,
  recovery_workflows_count integer not null,
  updated_at timestamptz default now()
);

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  scan_id text references public.scans(id) on delete cascade,
  email text not null,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.cms_audit_logs (
  document_id text primary key,
  author_name text default 'unknown',
  author_role text default 'unknown',
  scanned_at timestamptz default now()
);

-- ── Row Level Security ──
alter table public.scans enable row level security;
alter table public.claim_risks enable row level security;
alter table public.unlocked_audits enable row level security;
alter table public.telemetry enable row level security;
alter table public.leads enable row level security;
alter table public.cms_audit_logs enable row level security;

-- anon may read the public claim-risk ledger (the dashboard feed)…
create policy "anon read claim risks" on public.claim_risks
  for select to anon using (true);

-- …and scan metadata, but never the email / PII columns.
create policy "anon read scans" on public.scans
  for select to anon using (true);
revoke select (email) on public.scans from anon;
grant select (id, target_url, is_demo, auth_level, full_package, provenance_hash, created_at, updated_at, purchased_at) on public.scans to anon;

-- Everything else (writes, entitlements, leads, telemetry) is service_role-only,
-- which bypasses RLS automatically. No anon write policies are granted.
