CREATE TABLE public.trusted_visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),


    resident_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,


    visitor_name TEXT NOT NULL,


    visitor_phone TEXT,


    company_name TEXT,


    valid_from DATE NOT NULL,


    valid_until DATE,


    allowed_days TEXT[],
    -- example:
    -- {"Monday","Tuesday","Wednesday"}


    start_time TIME,


    end_time TIME,


    requires_notification BOOLEAN DEFAULT TRUE,


    is_active BOOLEAN DEFAULT TRUE,


    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),


    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);