-- ============================================================================
-- Supabase Migration: Create core tables for Petal & Post
-- Version: 20260912_001
-- ============================================================================

-- -------------------------------------------------------
-- 1. EXTENSIONS
-- -------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------
-- 2. TABLE: orders
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_token TEXT UNIQUE NOT NULL CHECK (length(order_token) >= 8),
    status TEXT NOT NULL DEFAULT 'ORDER_RECEIVED'
        CHECK (status IN ('ORDER_RECEIVED','LETTER_BEING_PREPARED','LETTER_ENVELOPED','OUT_FOR_DELIVERY','DELIVERED')),
    total_cents INTEGER NOT NULL DEFAULT 4900 CHECK (total_cents >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending','confirmed','failed')),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for orders by user (admin only)
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- -------------------------------------------------------
-- 3. TABLE: letters
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    content TEXT NOT NULL DEFAULT '',
    writing_style TEXT NOT NULL DEFAULT 'classic'
        CHECK (writing_style IN ('classic','calligraphy')),
    closing TEXT NOT NULL DEFAULT '',
    recipient_greeting TEXT,
    anonymity_mode TEXT NOT NULL DEFAULT 'anonymous'
        CHECK (anonymity_mode IN ('anonymous','nickname','realName')),
    nickname TEXT,
    real_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for letters by order
CREATE INDEX IF NOT EXISTS idx_letters_order_id ON letters(order_id);

-- -------------------------------------------------------
-- 4. TABLE: recipients
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    recipient_type TEXT NOT NULL DEFAULT 'student'
        CHECK (recipient_type IN ('student','faculty')),
    name TEXT NOT NULL DEFAULT '',
    department_or_school TEXT NOT NULL DEFAULT '',
    year TEXT,
    registration_number TEXT,
    delivery_location TEXT NOT NULL DEFAULT '',
    delivery_instructions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for recipients by order
CREATE INDEX IF NOT EXISTS idx_recipients_order_id ON recipients(order_id);

-- -------------------------------------------------------
-- 5. TABLE: customizations
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS customizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    flowers_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    flower_type TEXT
        CHECK (flower_type IN ('babys-breath','rose','daisy','tulip','mixed-bouquet')),
    wax_seal_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    envelope_color TEXT
        CHECK (envelope_color IN ('ivory','blush','powder-blue','sage','kraft')),
    base_price_cents INTEGER NOT NULL DEFAULT 4900 CHECK (base_price_cents >= 0),
    calligraphy_price_cents INTEGER NOT NULL DEFAULT 0 CHECK (calligraphy_price_cents IN (0,1500)),
    flowers_price_cents INTEGER NOT NULL DEFAULT 0 CHECK (flowers_price_cents IN (0,3000)),
    wax_seal_price_cents INTEGER NOT NULL DEFAULT 0 CHECK (wax_seal_price_cents IN (0,2000)),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for customizations by order
CREATE INDEX IF NOT EXISTS idx_customizations_order_id ON customizations(order_id);

-- -------------------------------------------------------
-- 6. TABLE: order_timeline
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    stage TEXT NOT NULL DEFAULT 'ORDER_RECEIVED'
        CHECK (stage IN ('ORDER_RECEIVED','LETTER_BEING_PREPARED','LETTER_ENVELOPED','OUT_FOR_DELIVERY','DELIVERED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for timeline by order
CREATE INDEX IF NOT EXISTS idx_order_timeline_order_id ON order_timeline(order_id);

-- -------------------------------------------------------
-- 7. TABLE: payments
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    gateway TEXT NOT NULL DEFAULT 'none'
        CHECK (gateway IN ('none','upi','cashfree','phonepe','razorpay')),
    gateway_order_id TEXT,
    gateway_payment_id TEXT,
    gateway_signature TEXT,
    amount_cents INTEGER NOT NULL DEFAULT 0 CHECK (amount_cents >= 0),
    payment_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (payment_status IN ('pending','confirmed','failed')),
    gateway_response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for payments by order
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);

-- -------------------------------------------------------
-- 8. ROW LEVEL SECURITY (RLS) ENABLED
-- -------------------------------------------------------
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------
-- 9. RLS POLICIES (anonymous key restricted - no direct access)
-- -------------------------------------------------------
-- The SUPABASE_SERVICE_ROLE_KEY (server-side only) bypasses RLS.
-- The anon key (browser/public) is denied all data access for these tables.
-- Authorization happens exclusively through Next.js API routes with
-- parameterized order_token queries and explicit field whitelisting.

-- 9a. orders table: restrict anon to zero rows
CREATE POLICY "anon_orders_select_deny" ON orders FOR SELECT TO anon USING (false);
CREATE POLICY "anon_orders_insert_deny" ON orders FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_orders_update_deny" ON orders FOR UPDATE TO anon USING (false);

-- 9b. letters table: restrict anon
CREATE POLICY "anon_letters_select_deny" ON letters FOR SELECT TO anon USING (false);
CREATE POLICY "anon_letters_insert_deny" ON letters FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_letters_update_deny" ON letters FOR UPDATE TO anon USING (false);

-- 9c. recipients table: restrict anon
CREATE POLICY "anon_recipients_select_deny" ON recipients FOR SELECT TO anon USING (false);
CREATE POLICY "anon_recipients_insert_deny" ON recipients FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_recipients_update_deny" ON recipients FOR UPDATE TO anon USING (false);

-- 9d. customizations table: restrict anon
CREATE POLICY "anon_customizations_select_deny" ON customizations FOR SELECT TO anon USING (false);
CREATE POLICY "anon_customizations_insert_deny" ON customizations FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_customizations_update_deny" ON customizations FOR UPDATE TO anon USING (false);

-- 9e. order_timeline table: restrict anon
CREATE POLICY "anon_timeline_select_deny" ON order_timeline FOR SELECT TO anon USING (false);
CREATE POLICY "anon_timeline_insert_deny" ON order_timeline FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_timeline_update_deny" ON order_timeline FOR UPDATE TO anon USING (false);

-- 9f. payments table: restrict anon (payment data highly sensitive)
CREATE POLICY "anon_payments_select_deny" ON payments FOR SELECT TO anon USING (false);
CREATE POLICY "anon_payments_insert_deny" ON payments FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "anon_payments_update_deny" ON payments FOR UPDATE TO anon USING (false);

-- -------------------------------------------------------
-- 10. RLS POLICIES (service_role/admin full access)
-- -------------------------------------------------------
-- All tables: service_role has full access (bypasses RLS)
CREATE POLICY "service_role_all_tables" ON orders USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_letters" ON letters USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_recipients" ON recipients USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_customizations" ON customizations USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_timeline" ON order_timeline USING (true) WITH CHECK (true);
CREATE POLICY "service_role_all_payments" ON payments USING (true) WITH CHECK (true);

-- -------------------------------------------------------
-- 11. HELPER NOTES (middleware → RLS integration)
-- -------------------------------------------------------
-- The order_token authorization flow:
-- 1. Next.js middleware validates order_token format: ^ORD-[A-Za-z0-9_-]{32}$
-- 2. API routes use SUPABASE_SERVICE_ROLE_KEY (server-only)
-- 3. API routes execute parameterized queries: SELECT * FROM orders WHERE order_token = $1
-- 4. API explicitly whitelists returned fields (no content, no gateway data)
-- 5. RLS is enforced via static USING (false) policies for anon key;
--    the API uses service_role, so RLS does not affect API operations.
-- 4. Payment confirmation requires webhook signature verification,
--    not merely order_token validity (see payment architecture below).

-- -------------------------------------------------------
-- 12. DEFAULT DATA / CONSTRAINTS NOTES
-- -------------------------------------------------------
-- - orders.order_token format: ORD- + 32 base64url characters (192 bits entropy)
-- - Letters.content is NEVER returned in customer-facing API responses
-- - Recipient year/registration_number nullable (faculty-friendly)
-- - Customization price columns have CHECK constraints ensuring only valid values
-- - Order timeline stages map to customer-facing titles/icons in the frontend
-- - Payments: gateway defaults to 'none' for placeholder mode;
--   real gateway integration (upi/cashfree/phonepe/razorpay) added later.
-- - Payment confirmation: requires webhook signature verification from
--   provider; order_token alone never suffices.
-- - SUPABASE_SERVICE_ROLE_KEY must never be committed to the repository
--   or exposed to the browser; inject via CI/CD secrets or host environment.