-- Update the claim_drift_alerts view to explicitly use security_invoker = true
-- This ensures the view obeys the Row Level Security (RLS) policies of the user querying it
-- rather than bypassing RLS as the view owner.

ALTER VIEW claim_drift_alerts SET (security_invoker = true);
