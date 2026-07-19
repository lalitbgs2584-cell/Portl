CREATE TABLE public.complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    profile_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    image_path TEXT,

    status public.complaint_status NOT NULL DEFAULT 'open',

    resolved_by UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    resolved_at TIMESTAMPTZ,

    resolution_notes TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_complaints_society_id
ON public.complaints(society_id);

CREATE INDEX idx_complaints_profile_id
ON public.complaints(profile_id);

CREATE INDEX idx_complaints_status
ON public.complaints(status);