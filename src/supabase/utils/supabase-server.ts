// Supabase Server Utility - Backend/API Usage
// This module uses the SUPABASE_SERVICE_ROLE_KEY and MUST ONLY be used
// in server-side contexts (API routes, edge functions, Node.js scripts).
// NEVER import this file in client components or commit the service role
// key to the repository. Exposure requires immediate key rotation.

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The service role key has full database access and bypasses RLS.
// It should be injected via CI/CD secrets or environment variables that
// are NOT stored in .env.local or committed to git.
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseServiceRoleKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY is not set. This variable must be ' +
    'provided by the deployment environment (CI/CD, host secrets), ' +
    'never committed to the repository.'
  );
}

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set.');
}

// Create a Supabase client with the service role key.
// This client bypasses Row Level Security (RLS) and has full database access.
export const createSupabaseServerClient = (): SupabaseClient => {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    // Auth auto sign-in and session persistence are not needed for server usage
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Set order token helper (called from middleware)
export const setOrderTokenHelper = (token: string) => {
  // The token is accepted for compatibility;
  // the actual setting is done via the Next.js middleware setting
  // the X-Order-Token header, which the API routes read.
};

// Get order token from request helper
export const getOrderTokenFromRequestHelper = (request: Request): string | null => {
  try {
    const url = new URL(request.url);
    const tokenFromQuery = url.searchParams.get('order_token');
    const tokenFromHeader = request.headers.get('x-order-token');
    return tokenFromQuery || tokenFromHeader || null;
  } catch {
    return null;
  }
};

// Sanitize order for customer - uses typed data
export const sanitizeOrderForCustomerHelper = (
  data: {
    id: string;
    order_token: string;
    status: string;
    total_cents: number;
    payment_status: string;
    created_at: string;
  }
) => {
  return {
    id: data.id,
    order_token: data.order_token,
    status: data.status,
    total_cents: data.total_cents,
    payment_status: data.payment_status,
    created_at: data.created_at,
  };
};

// Sanitize payment for customer - uses typed data
export const sanitizePaymentForCustomerHelper = (
  data: {
    payment_status: string;
    created_at: string;
  }
) => {
  return {
    payment_status: data.payment_status,
    created_at: data.created_at,
  };
};