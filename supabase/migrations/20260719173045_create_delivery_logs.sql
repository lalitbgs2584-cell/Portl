CREATE TABLE public.delivery_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    resident_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    guard_id UUID
        REFERENCES public.guards(id)
        ON DELETE SET NULL,

    company_id UUID
        REFERENCES public.delivery_companies(id)
        ON DELETE SET NULL,

    flat_id UUID
        REFERENCES public.flats(id)
        ON DELETE SET NULL,

    status public.delivery_log_status DEFAULT 'pending',

    entry_time TIMESTAMPTZ,

    exit_time TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW()

);