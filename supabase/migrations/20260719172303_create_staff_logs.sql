CREATE TABLE public.staff_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    staff_id UUID REFERENCES public.staff(id) ON DELETE CASCADE,


    guard_id UUID REFERENCES public.guards(id) ON DELETE SET NULL,

    entry_time TIMESTAMP WITH TIME ZONE,

    exit_time TIMESTAMP WITH TIME ZONE,

    status public.staff_log_status DEFAULT 'inside',

    remarks TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);