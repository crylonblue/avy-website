import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Public client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey) 