CREATE TABLE public.lost_found (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    finder_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    type public.lost_found_type NOT NULL,

    title TEXT NOT NULL,

    description TEXT,

    category VARCHAR(255),

    location TEXT,

    image_url TEXT,

    status public.lost_found_status NOT NULL DEFAULT 'open',

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_lost_found_society_id ON public.lost_found(society_id);
CREATE INDEX idx_lost_found_type ON public.lost_found(type);
CREATE INDEX idx_lost_found_status ON public.lost_found(status);
CREATE INDEX idx_lost_found_category ON public.lost_found(category);
