-- 1. Organizations (Tenants)
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'trialing',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users & Memberships
CREATE TABLE public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 3. Domains (Monitored Targets)
CREATE TABLE public.domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    hostname TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, hostname)
);

-- 4. Scans (Exhibit Packages)
CREATE TABLE public.scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id UUID REFERENCES public.domains(id) ON DELETE CASCADE,
    scan_timestamp TIMESTAMPTZ DEFAULT NOW(),
    full_dom_hash TEXT NOT NULL, -- SHA-256 of the raw payload
    raw_payload JSONB, -- The full JSON result of the crawler
    severity_score TEXT CHECK (severity_score IN ('HIGH', 'MEDIUM', 'LOW', 'CLEAN')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Identified Claims & Drift Events
CREATE TABLE public.claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    claim_text TEXT NOT NULL,
    claim_hash TEXT NOT NULL, -- Cryptographic hash of the exact string
    vector_category TEXT NOT NULL, -- e.g., 'FTC_SEC_5_DECEPTIVE'
    severity TEXT,
    status TEXT CHECK (status IN ('new', 'persistent', 'remediated')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_scans_domain_id ON public.scans(domain_id);
CREATE INDEX idx_claims_scan_id ON public.claims(scan_id);
CREATE INDEX idx_org_members_user_id ON public.organization_members(user_id);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can only read Organizations they are a member of
CREATE POLICY "org_member_read" ON public.organizations
FOR SELECT USING (
    id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

-- Organization Members: Users can read their own membership and memberships of their orgs
CREATE POLICY "org_member_self_read" ON public.organization_members
FOR SELECT USING (
    user_id = auth.uid() OR
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

-- Domains: Users can only read Domains belonging to their Organizations
CREATE POLICY "domain_member_read" ON public.domains
FOR SELECT USING (
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
);

-- Scans: Users can only read Scans belonging to Domains in their Organizations
CREATE POLICY "scan_member_read" ON public.scans
FOR SELECT USING (
    domain_id IN (
        SELECT id FROM public.domains 
        WHERE organization_id IN (
            SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
        )
    )
);

-- Claims: Users can only read Claims belonging to Scans they have access to
CREATE POLICY "claim_member_read" ON public.claims
FOR SELECT USING (
    scan_id IN (
        SELECT id FROM public.scans
        WHERE domain_id IN (
            SELECT id FROM public.domains 
            WHERE organization_id IN (
                SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()
            )
        )
    )
);
