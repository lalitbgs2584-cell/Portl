CREATE TABLE public.amenity_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    amenity_id UUID NOT NULL
        REFERENCES public.amenities(id)
        ON DELETE CASCADE,

    profile_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    booking_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    purpose TEXT,

    status public.booking_status NOT NULL DEFAULT 'pending',

    approved_by UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    approved_at TIMESTAMPTZ,

    rejection_reason TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_amenity_bookings_amenity_id
ON public.amenity_bookings(amenity_id);

CREATE INDEX idx_amenity_bookings_profile_id
ON public.amenity_bookings(profile_id);

CREATE INDEX idx_amenity_bookings_date
ON public.amenity_bookings(booking_date);

CREATE INDEX idx_amenity_bookings_status
ON public.amenity_bookings(status);