import { useSupabase } from '@/composables/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

/**
 * Supabase Queries for Projects
 */

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

/**
 * Supabase Queries for Tasks
 */

/** Get All Tasks */
export const getTasksQuery = () => {
  const supabase = useSupabase()
  return supabase.from('tasks').select('*')
}
export type Tasks = QueryData<ReturnType<typeof getTasksQuery>>

/** Get Single Task by ID */
export const getTaskQuery = (id: string) => {
  const supabase = useSupabase()
  return supabase.from('tasks').select('*').eq('id', id).single()
}
export type Task = QueryData<ReturnType<typeof getTaskQuery>>

/** Update Task by ID */
export const updateTaskQuery = (id: string, data: Task) => {
  console.log('Updating task with data:', data)
  const supabase = useSupabase()
  return supabase.from('tasks').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
}
export type UpdateTask = QueryData<ReturnType<typeof updateTaskQuery>>

/** Delete Task by ID */
export const deleteTaskQuery = (id: string) => {
  const supabase = useSupabase()
  return supabase.from('tasks').delete().eq('id', id)
}
export type DeleteTask = QueryData<ReturnType<typeof deleteTaskQuery>>
