CREATE TABLE public.poll_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    poll_id UUID NOT NULL
        REFERENCES public.polls(id)
        ON DELETE CASCADE,

    option_text VARCHAR(255) NOT NULL,

    display_order INTEGER NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(poll_id, display_order)
);

CREATE INDEX idx_poll_options_poll_id
ON public.poll_options(poll_id);