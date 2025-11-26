import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl as string
  const supabasePublishableKey = config.public.supabasePublishableKey as string

  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Publishable Key:', supabasePublishableKey)

  return createClient(supabaseUrl, supabasePublishableKey)
}
