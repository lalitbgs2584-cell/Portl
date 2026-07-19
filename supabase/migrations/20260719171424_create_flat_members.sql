CREATE TABLE public.flat_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    flat_id UUID NOT NULL
        REFERENCES public.flats(id)
        ON DELETE CASCADE,

approved_by UUID
    REFERENCES public.profiles(id)
    ON DELETE SET NULL,

    approved_at TIMESTAMPTZ,

    rejected_by UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    rejected_at TIMESTAMPTZ,

    rejection_reason TEXT,
    
    member_type public.flat_member_type NOT NULL,

    move_in_date DATE NOT NULL,

    move_out_date DATE,

    is_primary_resident BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);



CREATE INDEX idx_flat_members_profile_id
ON public.flat_members(profile_id);

CREATE INDEX idx_flat_members_flat_id
ON public.flat_members(flat_id);

CREATE INDEX idx_flat_members_member_type
ON public.flat_members(member_type);