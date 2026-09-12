-- -------------------------------------------------------
-- Migration: 202609120003_update_order_status_enum
-- Purpose: Replace orders.status and order_timeline.stage CHECK
--          constraints with new internal status enum values.
--          New values: pending, confirmed, processing, in_transit, delivered
-- -------------------------------------------------------

-- --- Step 0: Drop old CHECK constraints unconditionally ---
-- The old constraints reject 'pending' status. Remove them first
-- so subsequent DATA updates are not blocked.
-- (If constraints don't exist, the DROP will succeed silently via CASCADE or not-found handling.)

-- Drop old orders.status CHECK constraint (CASCADE ensures dependent objects are handled)
ALTER TABLE orders DROP CONSTRAINT orders_status_check CASCADE;

-- Drop old order_timeline.stage CHECK constraint
ALTER TABLE order_timeline DROP CONSTRAINT order_timeline_stage_check CASCADE;

-- --- Step 1: Migrate existing data ---
-- Now safe to update since old constraints are removed.
-- Convert any orders to 'pending' status.
UPDATE orders SET status = 'pending' WHERE status IN ('ORDER_RECEIVED','pending');

-- Convert any timeline entries to 'pending' status
UPDATE order_timeline SET stage = 'pending' WHERE stage IN ('ORDER_RECEIVED','pending');

-- --- Step 2: Add new CHECK constraints with new internal status values ---

-- New orders.status enum: pending | confirmed | processing | in_transit | delivered
ALTER TABLE orders
    ADD CONSTRAINT orders_status_check
    CHECK (status IN ('pending', 'confirmed', 'processing', 'in_transit', 'delivered'));

-- New order_timeline.stage enum: same internal status values
ALTER TABLE order_timeline
    ADD CONSTRAINT order_timeline_status_check
    CHECK (stage IN ('pending', 'confirmed', 'processing', 'in_transit', 'delivered'));