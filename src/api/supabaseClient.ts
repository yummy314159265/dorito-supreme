import { createClient } from '@supabase/supabase-js'

const env = import.meta.env;
const supabaseUrl = env.VITE_SUPABASE_URL ?? "";
const anonKey = env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabaseClient = createClient(supabaseUrl, anonKey);