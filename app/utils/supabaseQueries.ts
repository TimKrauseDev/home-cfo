import { useSupabase } from '@/composables/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

export const getInstrumentsQuery = () => {
  const supabase = useSupabase()
  return supabase.from('instruments').select()
}

export type Instruments = QueryData<ReturnType<typeof getInstrumentsQuery>>
