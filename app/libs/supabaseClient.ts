import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../database/database.types'

let supabaseClientInstance: ReturnType<typeof createClient<Database>> | null = null

export const createSupabaseClient = () => {
  if (supabaseClientInstance) {
    return supabaseClientInstance
  }

  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const supabasePublishableKey = config.public.supabasePublishableKey as string

  supabaseClientInstance = createClient<Database>(supabaseUrl, supabasePublishableKey)

  return supabaseClientInstance
}
