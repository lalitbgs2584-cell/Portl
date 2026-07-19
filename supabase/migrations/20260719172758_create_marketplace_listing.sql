CREATE TABLE public.marketplace_listings (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),


    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,


    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,


    title TEXT NOT NULL,


    description TEXT,


    price NUMERIC(10,2) NOT NULL,


    category public.marketplace_listing_category NOT NULL,



    condition public.marketplace_listing_condition NOT NULL,

    status public.marketplace_listing_status DEFAULT 'available',
    

    cover_image TEXT NOT NULL,


    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),


    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),


    sold_at TIMESTAMP WITH TIME ZONE

);