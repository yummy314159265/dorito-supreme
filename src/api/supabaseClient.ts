import { createClient } from '@supabase/supabase-js'

const env = process.env;
const supabaseUrl = process.env.SUPABASE_URL ?? "";
const anonKey = process.env.SUPABASE_ANON_KEY ?? "";

console.log("supabaseUrl:", supabaseUrl, env);

export const supabaseClient = createClient(supabaseUrl, anonKey);