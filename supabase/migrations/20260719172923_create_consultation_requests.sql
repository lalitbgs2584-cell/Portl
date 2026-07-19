CREATE TABLE public.consultation_requests (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    requester_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    professional_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    status public.consultation_request_status DEFAULT 'pending',

    message TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()

);