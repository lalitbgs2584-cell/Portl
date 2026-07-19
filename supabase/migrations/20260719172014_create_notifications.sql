CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    type public.notification_type NOT NULL,

    reference_id UUID,

    reference_type public.notification_reference_type NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    read_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.notification_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    society_id UUID REFERENCES public.societies(id) ON DELETE CASCADE,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    type public.notification_type NOT NULL,

    created_by UUID REFERENCES public.profiles(id),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.notification_group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    group_id UUID REFERENCES public.notification_groups(id) ON DELETE CASCADE,

    receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    is_read BOOLEAN DEFAULT FALSE,

    read_at TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);