CREATE TABLE public.guards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    employee_code TEXT UNIQUE,

    shift_type public.shift_type NOT NULL,

    joining_date DATE,

    status public.guard_status DEFAULT 'active',


    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);