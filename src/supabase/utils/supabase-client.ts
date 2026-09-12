/**
 * Supabase Client - Frontend Usage
 * 
 * This module is safe to import in client components.
 * Uses the public anon key for all operations.
 * 
 * RLS policies on the server enforce data privacy.
 * The browser NEVER has direct SELECT access to sensitive tables.
 */

import { createClient } from '@supabase/supabase-js';

// These values are safe to embed in the browser.
// Get them from: Supabase Dashboard > Settings > API > Project URL and anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  // auth: {
  //   autoSignIn: false,
  //   persistSession: false,
  // },
});