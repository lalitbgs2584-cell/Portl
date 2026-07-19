CREATE TABLE public.amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    image_path TEXT,

    capacity INTEGER CHECK (capacity > 0),

    opening_time TIME,

    closing_time TIME,

    booking_duration_minutes INTEGER,

    advance_booking_days INTEGER,

    rules TEXT,

    status public.amenity_status NOT NULL DEFAULT 'active',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ,

    UNIQUE(society_id, name)
);

CREATE INDEX idx_amenities_society_id
ON public.amenities(society_id);

CREATE INDEX idx_amenities_status
ON public.amenities(status);