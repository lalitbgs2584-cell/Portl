CREATE TABLE public.delivery_preferences (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    resident_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    company_id UUID
        REFERENCES public.delivery_companies(id)
        ON DELETE CASCADE,

    is_allowed BOOLEAN DEFAULT TRUE,

    start_time TIME,

    end_time TIME,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(resident_id, company_id)

);