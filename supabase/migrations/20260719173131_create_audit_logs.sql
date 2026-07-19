CREATE TABLE public.audit_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    performed_by UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    action TEXT NOT NULL,

    entity_type TEXT NOT NULL,

    entity_id UUID,

    old_data JSONB,

    new_data JSONB,

    ip_address INET,

    device TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW()

);