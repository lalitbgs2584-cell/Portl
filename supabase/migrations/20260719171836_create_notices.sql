CREATE TABLE public.notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    created_by UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    description TEXT NOT NULL,

    attachment_path TEXT,

    expires_at TIMESTAMPTZ,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_notices_society_id
ON public.notices(society_id);

CREATE INDEX idx_notices_created_by
ON public.notices(created_by);