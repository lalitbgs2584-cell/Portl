CREATE TABLE public.invoices (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID NOT NULL
        REFERENCES public.societies(id)
        ON DELETE CASCADE,

    flat_id UUID NOT NULL
        REFERENCES public.flats(id)
        ON DELETE CASCADE,

    invoice_number TEXT NOT NULL UNIQUE,

    billing_month SMALLINT NOT NULL,

    billing_year SMALLINT NOT NULL,

    amount NUMERIC(12,2) NOT NULL,

    due_date DATE NOT NULL,

    status public.invoices_status DEFAULT 'pending',

    invoice_pdf_url TEXT,

    generated_by UUID
        REFERENCES public.profiles(id)
        ON DELETE SET NULL,

    generated_at TIMESTAMPTZ DEFAULT NOW(),

    paid_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW()

);