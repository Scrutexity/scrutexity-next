import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface UnlockAuditParams {
  publicId: string;
  email: string | null;
  stripeSessionId: string;
  stripeCustomerId: string | null;
  priceId: string | null;
  amountTotal: number | null;
  currency: string | null;
  entitlement?: string;
}

export async function unlockAudit(params: UnlockAuditParams) {
  const entitlement = params.entitlement || 'full_report';
  const supabase = getSupabaseAdmin();
  
  if (supabase) {
    const { error } = await supabase.from('unlocked_audits').upsert({
      public_id: params.publicId,
      email: params.email,
      stripe_session_id: params.stripeSessionId,
      stripe_customer_id: params.stripeCustomerId,
      price_id: params.priceId,
      amount_total: params.amountTotal,
      currency: params.currency,
      entitlement,
      status: 'paid',
      unlocked_at: new Date().toISOString()
    }, { onConflict: 'stripe_session_id' });

    if (error) {
      console.error('Failed to unlock audit in Supabase:', error);
    }
  } else {
    console.warn("Skipping unlockAudit execution: Supabase environment variables missing");
  }
}

export async function isAuditUnlocked(params: { publicId: string; email?: string }): Promise<boolean> {
  const ent = await getAuditEntitlement(params.publicId);
  return ent.unlocked;
}

export async function getAuditEntitlement(publicId: string): Promise<{
  unlocked: boolean;
  entitlement: 'snapshot' | 'full_report' | 'monitoring' | 'agency';
}> {
  if (!publicId) {
    return { unlocked: false, entitlement: 'snapshot' };
  }

  const supabase = getSupabaseAdmin();
  
  if (supabase) {
    const { data, error } = await supabase
      .from('unlocked_audits')
      .select('entitlement, status')
      .eq('public_id', publicId)
      .eq('status', 'paid')
      .limit(1)
      .maybeSingle();
      
    if (!error && data) {
      return {
        unlocked: true,
        entitlement: data.entitlement as any
      };
    }
  } else {
    console.warn("Skipping getAuditEntitlement execution: Supabase environment variables missing");
  }

  return {
    unlocked: false,
    entitlement: 'snapshot'
  };
}
