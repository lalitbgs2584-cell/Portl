CREATE TABLE public.staff_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    staff_id UUID REFERENCES public.staff(id) ON DELETE CASCADE,

    resident_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    rating INTEGER CHECK (
        rating >= 1 AND rating <= 5
    ),

    review TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);