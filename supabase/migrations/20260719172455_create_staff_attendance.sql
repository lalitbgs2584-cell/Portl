CREATE TABLE public.staff_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    staff_id UUID REFERENCES public.staff(id) ON DELETE CASCADE,

    shift_id UUID REFERENCES public.shifts(id) ON DELETE SET NULL,

    date DATE NOT NULL,

    check_in TIMESTAMP WITH TIME ZONE,

    check_out TIMESTAMP WITH TIME ZONE,

    verified_by_guard UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    remarks TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);