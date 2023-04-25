import { SupabaseClient, createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_URL = process.env.SUPABASE_PROJECT_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

export const supabase: SupabaseClient = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
