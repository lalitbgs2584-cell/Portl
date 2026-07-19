ALTER TABLE public.societies
ADD COLUMN primary_admin_id UUID
REFERENCES public.profiles(id)
ON DELETE SET NULL;