import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URl ?? "";
const anonKey = process.env.SUPABASE_ANON_KEY ?? "";

console.log("supabaseUrl:", supabaseUrl);

export const supabaseClient = createClient(supabaseUrl, anonKey);