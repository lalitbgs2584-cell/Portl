CREATE TYPE public.staff_status AS ENUM (
    'active',
    'inactive',
    'on_leave'
);

CREATE TABLE public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    staff_type public.staff_type NOT NULL,

    full_name VARCHAR(255) NOT NULL,

    phone VARCHAR(15) NOT NULL,

    email VARCHAR(255),

    gender public.gender,

    date_of_birth DATE,

    cover_image_path TEXT,

    joining_date DATE NOT NULL,

    status public.staff_status NOT NULL DEFAULT 'active',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_staff_society_id
ON public.staff(society_id);

CREATE INDEX idx_staff_type
ON public.staff(staff_type);

CREATE INDEX idx_staff_status
ON public.staff(status);