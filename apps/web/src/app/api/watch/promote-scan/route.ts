import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyScanToken } from '@/lib/funnel/auth';
import { getScanRecord } from '@/lib/funnel/db';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { scanToken } = body;

    if (!scanToken) {
      return NextResponse.json({ error: 'scanToken is required' }, { status: 400 });
    }

    const payload = await verifyScanToken(scanToken);
    
    if (!payload || !payload.scanId) {
      return NextResponse.json({ error: 'Invalid or expired scanToken' }, { status: 400 });
    }

    const scanRecord = await getScanRecord(payload.scanId);
    if (!scanRecord) {
      return NextResponse.json({ error: 'Scan record not found' }, { status: 404 });
    }

    // Get the user's organization
    const { data: member } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .single();

    if (!member) {
      return NextResponse.json({ error: 'User has no organization' }, { status: 400 });
    }

    // 1. Create or get Domain
    const hostname = new URL(scanRecord.targetUrl).hostname;
    
    let { data: domain } = await supabase
      .from('domains')
      .select('id')
      .eq('organization_id', member.organization_id)
      .eq('hostname', hostname)
      .single();

    if (!domain) {
      const { data: newDomain, error: domainError } = await supabase
        .from('domains')
        .insert({
          organization_id: member.organization_id,
          hostname
        })
        .select('id')
        .single();
      
      if (domainError) throw domainError;
      domain = newDomain;
    }

    // 2. Create Scan
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .insert({
        domain_id: domain.id,
        full_dom_hash: scanRecord.provenanceHash || crypto.randomUUID(), 
        severity_score: scanRecord.authLevel === 'PURCHASED' ? 'HIGH' : 'CLEAN',
        raw_payload: scanRecord.fullPackage as any,
      })
      .select('id')
      .single();

    if (scanError) throw scanError;

    // 3. Create Claims if available in payload
    if (scanRecord.fullPackage && scanRecord.fullPackage.exhibits && scanRecord.fullPackage.exhibits.length > 0) {
      const claimsToInsert = scanRecord.fullPackage.exhibits.map((c: any) => ({
        scan_id: scan.id,
        claim_text: c.originalClaimText || 'Redacted',
        claim_hash: crypto.randomUUID(),
        vector_category: c.vector?.id || 'UNKNOWN',
        severity: c.vector?.severity || 'HIGH',
        status: 'new'
      }));

      await supabase.from('claims').insert(claimsToInsert);
    }

    return NextResponse.json({ success: true, domainId: domain.id, scanId: scan.id });

  } catch (error) {
    console.error('Error promoting scan:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
