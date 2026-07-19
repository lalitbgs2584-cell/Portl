CREATE TABLE public.guest_passes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    resident_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    visitor_name TEXT NOT NULL,

    phone TEXT,

    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,

    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,

    number_of_entries INTEGER DEFAULT 1,

    pass_code TEXT UNIQUE NOT NULL,

    status public.guest_pass_status DEFAULT 'active',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);