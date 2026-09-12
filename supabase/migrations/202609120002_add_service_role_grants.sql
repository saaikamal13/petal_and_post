-- -------------------------------------------------------
-- Migration: 20260912_002_add_service_role_grants
-- Purpose: Grant service_role key permissions on all six application tables
-- -------------------------------------------------------

-- Grant service_role key permissions on the six application tables
-- The service_role key bypasses RLS but still needs PostgreSQL-level privileges

GRANT ALL PRIVILEGES ON public.orders TO service_role;
GRANT ALL PRIVILEGES ON public.letters TO service_role;
GRANT ALL PRIVILEGES ON public.recipients TO service_role;
GRANT ALL PRIVILEGES ON public.customizations TO service_role;
GRANT ALL PRIVILEGES ON public.order_timeline TO service_role;
GRANT ALL PRIVILEGES ON public.payments TO service_role;

-- Ensure service_role can also operate on sequences/triggers if needed
GRANT USAGE ON SCHEMA public TO service_role;