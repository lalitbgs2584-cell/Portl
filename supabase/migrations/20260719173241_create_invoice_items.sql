CREATE TABLE public.invoice_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    invoice_id UUID NOT NULL
        REFERENCES public.invoices(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    description TEXT,

    amount NUMERIC(12,2) NOT NULL,

    charge_type public.charge_type,
    -- maintenance
    -- amenity
    -- parking
    -- fine
    -- utility
    -- other

    reference_type public.reference_type,

    reference_id UUID,

    created_at TIMESTAMPTZ DEFAULT NOW()

);