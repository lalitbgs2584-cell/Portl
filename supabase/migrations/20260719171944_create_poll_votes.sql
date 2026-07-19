CREATE TABLE public.poll_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    poll_id UUID NOT NULL
        REFERENCES public.polls(id)
        ON DELETE CASCADE,

    option_id UUID NOT NULL
        REFERENCES public.poll_options(id)
        ON DELETE CASCADE,

    profile_id UUID NOT NULL
        REFERENCES public.profiles(id)
        ON DELETE CASCADE,

    voted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(poll_id, profile_id)
);

CREATE INDEX idx_poll_votes_poll_id
ON public.poll_votes(poll_id);

CREATE INDEX idx_poll_votes_option_id
ON public.poll_votes(option_id);

CREATE INDEX idx_poll_votes_profile_id
ON public.poll_votes(profile_id);