CREATE TYPE public.shift_status AS ENUM (
    'pending',
    'active',
    'completed',
    'cancelled'
);

CREATE TABLE public.shifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    guard_id UUID REFERENCES public.guards(id) ON DELETE SET NULL,


    scheduled_start TIMESTAMP WITH TIME ZONE,

    scheduled_end TIMESTAMP WITH TIME ZONE,

    actual_start TIMESTAMP WITH TIME ZONE,

    actual_end TIMESTAMP WITH TIME ZONE,

    status public.shift_status NOT NULL DEFAULT 'active',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);