CREATE TABLE public.flats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,
    tower_id UUID NOT NULL
        REFERENCES public.towers(id)
        ON DELETE CASCADE,
    floor_id UUID NOT NULL
        REFERENCES public.floors(id)
        ON DELETE CASCADE,
    flat_number INTEGER NOT NULL
        CHECK (flat_number > 0),
    display_name VARCHAR(255) NOT NULL,
    configuration public.flat_configuration NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    status public.flat_status NOT NULL DEFAULT 'vacant',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE (floor_id, flat_number)
);

CREATE INDEX idx_flats_society_id
ON public.flats(society_id);

CREATE INDEX idx_flats_tower_id
ON public.flats(tower_id);

CREATE INDEX idx_flats_floor_id
ON public.flats(floor_id);

CREATE INDEX idx_flats_flat_number
ON public.flats(flat_number);

CREATE INDEX idx_flats_status
ON public.flats(status);