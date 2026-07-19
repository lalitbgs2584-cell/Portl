ALTER TABLE public.profiles
ADD CONSTRAINT fk_profiles_profession
FOREIGN KEY (profession_id)
REFERENCES public.professions(id)
ON DELETE SET NULL;