CREATE TYPE public.visitor_notification_type AS ENUM (
    'approval_request',
    'arrival_alert',
    'entry_confirmation',
    'exit_alert'
);

CREATE TYPE public.visitor_notification_response AS ENUM (
    'approved',
    'rejected',
    'pending'
);

CREATE TABLE public.visitor_notifications (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    visit_id UUID REFERENCES public.visitor_visits(id) ON DELETE CASCADE,

    resident_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

    notification_type public.visitor_notification_type NOT NULL,

    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    responded_at TIMESTAMP WITH TIME ZONE,

    response public.visitor_notification_response NOT NULL,


    attempt INTEGER DEFAULT 1,


    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);

