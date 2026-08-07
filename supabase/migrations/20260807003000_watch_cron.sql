-- Enable necessary extensions
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Create a view for Claim Drift Alerts
-- An alert is triggered when a claim with HIGH severity appears in the latest scan of a domain,
-- but was either not present or not HIGH severity in the immediately preceding scan.
create or replace view claim_drift_alerts with (security_invoker = true) as
with ranked_scans as (
  select 
    id as scan_id,
    domain_id,
    created_at,
    row_number() over (partition by domain_id order by created_at desc) as rn
  from scans
),
latest_scan as (
  select * from ranked_scans where rn = 1
),
previous_scan as (
  select * from ranked_scans where rn = 2
),
latest_claims as (
  select c.*, ls.domain_id 
  from claims c 
  join latest_scan ls on c.scan_id = ls.scan_id
),
previous_claims as (
  select c.*, ps.domain_id 
  from claims c 
  join previous_scan ps on c.scan_id = ps.scan_id
)
select 
  lc.id as claim_id,
  lc.domain_id,
  lc.scan_id,
  lc.claim_text,
  lc.vector_category,
  lc.severity as current_severity,
  pc.severity as previous_severity,
  lc.created_at as detected_at
from latest_claims lc
left join previous_claims pc 
  on lc.domain_id = pc.domain_id 
  and lc.claim_hash = pc.claim_hash
where lc.severity = 'HIGH' 
  and (pc.severity is null or pc.severity != 'HIGH');

-- Create a function to invoke the Next.js Cron Webhook via pg_net
create or replace function invoke_watch_cron()
returns void as $$
declare
  webhook_url text;
  secret_key text;
begin
  -- In a real production system, these would be stored securely in Vault.
  -- We assume the Vercel API URL is passed here or stored in a secure table.
  -- For Scrutexity's live Vercel deployment:
  webhook_url := 'https://scrutexity.com/api/watch/cron-scan';
  secret_key := 'CRON_SECRET_LIVE_2026';
  
  perform net.http_post(
    url := webhook_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || secret_key
    ),
    body := jsonb_build_object('event', 'daily_scan')
  );
end;
$$ language plpgsql;

-- Schedule the cron job to run every day at midnight (UTC)
-- The job name is 'daily_watch_scan'
select cron.schedule('daily_watch_scan', '0 0 * * *', 'select invoke_watch_cron()');
