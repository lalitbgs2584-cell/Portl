-- ==========================================================
-- Portl Database
-- Migration: Add guard_id to visitor_visits
-- Description: Track which guard handled/approved the visit
-- ==========================================================

ALTER TABLE public.visitor_visits
ADD COLUMN guard_id UUID REFERENCES public.guards(id) ON DELETE SET NULL;

CREATE INDEX idx_visitor_visits_guard_id
ON public.visitor_visits(guard_id);