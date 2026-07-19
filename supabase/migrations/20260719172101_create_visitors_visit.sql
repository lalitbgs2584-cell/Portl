CREATE TYPE public.visit_status AS ENUM (
    'pending',
    'approved',
    'rejected',
    'entered',
    'exited',
    'cancelled'
);

CREATE TABLE public.visitor_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    visitor_id UUID REFERENCES public.visitors(id) ON DELETE CASCADE,

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    resident_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    -- guard_id UUID REFERENCES public.guards(id) ON DELETE SET NULL,

    visit_type public.visit_type NOT NULL,

    status public.visit_status DEFAULT 'pending',

    purpose TEXT,

    vehicle_number TEXT,

    expected_at TIMESTAMP WITH TIME ZONE,

    arrived_at TIMESTAMP WITH TIME ZONE,

    entered_at TIMESTAMP WITH TIME ZONE,

    exited_at TIMESTAMP WITH TIME ZONE,

    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    approval_method public.approval_method,

    qr_code TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);