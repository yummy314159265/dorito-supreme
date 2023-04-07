import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URl;
const anonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, anonKey);