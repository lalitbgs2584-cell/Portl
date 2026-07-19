CREATE TABLE public.floors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    tower_id UUID NOT NULL
        REFERENCES public.towers(id)
        ON DELETE CASCADE,

    floor_number INTEGER NOT NULL,

    name TEXT NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ,

    UNIQUE (tower_id, floor_number)
);

CREATE INDEX idx_floors_tower_id
ON public.floors(tower_id);

CREATE INDEX idx_floors_floor_number
ON public.floors(floor_number);