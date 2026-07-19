CREATE TABLE public.family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    flat_member_id UUID NOT NULL
        REFERENCES public.flat_members(id)
        ON DELETE CASCADE,

    profile_id UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    full_name VARCHAR(255) NOT NULL,

    relationship public.family_relationship NOT NULL,

    gender public.gender,

    date_of_birth DATE,

    phone VARCHAR(15),

    email VARCHAR(255),

    avatar_path TEXT,

    is_emergency_contact BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_family_members_flat_member_id
ON public.family_members(flat_member_id);

CREATE INDEX idx_family_members_profile_id
ON public.family_members(profile_id);

CREATE INDEX idx_family_members_relationship
ON public.family_members(relationship);