import { useSupabase } from '@/composables/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// export const getInstrumentsQuery = () => {
//   const supabase = useSupabase();
//   return supabase.from('instruments').select()
// }

// export type Instruments = QueryData<ReturnType<typeof getInstrumentsQuery>>

/** Get All Projects */
export const getProjectsQuery = () => {
  const supabase = useSupabase()
  return supabase.from('projects').select('*')
}
export type Projects = QueryData<ReturnType<typeof getProjectsQuery>>

/** Get Single Project by ID */
export const getProjectQuery = (id: string) => {
  const supabase = useSupabase()
  return supabase.from('projects').select('*').eq('id', id).single()
}
export type Project = QueryData<ReturnType<typeof getProjectQuery>>

/** Update Project by ID */
export const updateProjectQuery = (id: string, data: Project) => {
  console.log('Updating project with data:', data)
  const supabase = useSupabase()
  return supabase.from('projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
}
export type UpdateProject = QueryData<ReturnType<typeof updateProjectQuery>>

/** Delete Project by ID */
export const deleteProjectQuery = (id: string) => {
  const supabase = useSupabase()
  return supabase.from('projects').delete().eq('id', id)
}
export type DeleteProject = QueryData<ReturnType<typeof deleteProjectQuery>>
