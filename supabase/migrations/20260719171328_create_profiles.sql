CREATE TABLE public.profiles (
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    role public.user_role NOT NULL,

    approval_status public.profile_approval_status
        NOT NULL DEFAULT 'pending',

    full_name VARCHAR(255) NOT NULL,

    phone VARCHAR(15) NOT NULL,

    gender public.gender,

    date_of_birth DATE,

    avatar_path TEXT,

    profession_id UUID,

    is_emergency_visible BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    is_profile_complete BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_society_id
ON public.profiles(society_id);

CREATE INDEX idx_profiles_role
ON public.profiles(role);

CREATE INDEX idx_profiles_approval_status
ON public.profiles(approval_status);

CREATE INDEX idx_profiles_phone
ON public.profiles(phone);