CREATE TABLE public.staff_leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    staff_id UUID REFERENCES public.staff(id) ON DELETE CASCADE,

    leave_type TEXT NOT NULL,

    reason TEXT,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    status public.staff_leave_status DEFAULT 'pending',
  

    approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    approved_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);