/**
 * Supabase Client Setup (Optional)
 * For client-side Supabase operations if needed in the future
 * Currently using direct PostgreSQL connection for server-side
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ybouegujnwgidjdeoqjf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_6LPWYQHCmLK6ghlyf0QKSw_dazZBUlI'

// Client-side Supabase client (if needed for future features)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Note: For database operations, we're using direct PostgreSQL connection (pg)
 * via DATABASE_URL in lib/db.ts
 * 
 * The Supabase client above is available if you want to use Supabase features
 * like real-time subscriptions, storage, auth, etc.
 */

