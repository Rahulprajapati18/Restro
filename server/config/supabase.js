import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL)      throw new Error('SUPABASE_URL missing in .env');
if (!process.env.SUPABASE_ANON_KEY) throw new Error('SUPABASE_ANON_KEY missing in .env');

// Default client (anon key)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Client with user token for RLS
export const supabaseAs = (token) =>
  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } }
  });

// Service role client (bypasses RLS — admin operations)
export const supabaseAdmin = () =>
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
  );

export default supabase;
