import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/database.types'

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const supabasePublishableKey = config.public.supabasePublishableKey as string

  return createClient<Database>(supabaseUrl, supabasePublishableKey)
}
