import { createSupabaseClient } from '~/libs/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

/**
 * Supabase Queries for Projects
*/

/** Get All Projects */
export const getProjectsQuery = () => {
  const supabase = createSupabaseClient()
  return supabase.from('projects').select('*')
}
export type Projects = QueryData<ReturnType<typeof getProjectsQuery>>

/** Get Single Project by ID */
export const getProjectQuery = (id: string) => {
  const supabase = createSupabaseClient()
  return supabase.from('projects').select('*').eq('id', id).single()
}
export type Project = QueryData<ReturnType<typeof getProjectQuery>>

/** Create Project */
export const createProjectQuery = (data: Partial<Project>) => {
  const supabase = createSupabaseClient()
  if (!data.name) {
    return { code: '500', error: 'Project name is required' }
  }

  return supabase.from('projects').insert([{
    name: data.name,
    description: data.description || '',
    status: data.status || 'not-started',
    due_date: data.due_date
  }
  ])
}
export type CreateProject = QueryData<ReturnType<typeof createProjectQuery>>

/** Update Project by ID */
export const updateProjectQuery = (id: string, data: Project) => {
  const supabase = createSupabaseClient()
  console.log('Updating project with data:', data)
  return supabase.from('projects').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
}
export type UpdateProject = QueryData<ReturnType<typeof updateProjectQuery>>

/** Delete Project by ID */
export const deleteProjectQuery = (id: string) => {
  const supabase = createSupabaseClient()
  return supabase.from('projects').delete().eq('id', id)
}
export type DeleteProject = QueryData<ReturnType<typeof deleteProjectQuery>>

/**
 * Supabase Queries for Tasks
*/

/** Get All Tasks */
export const getTasksQuery = () => {
  const supabase = createSupabaseClient()
  return supabase.from('tasks').select('*')
}
export type Tasks = QueryData<ReturnType<typeof getTasksQuery>>

/** Get Single Task by ID */
export const getTaskQuery = (id: string) => {
  const supabase = createSupabaseClient()
  return supabase.from('tasks').select('*').eq('id', id).single()
}
export type Task = QueryData<ReturnType<typeof getTaskQuery>>

/** Create Task */
export const createTaskQuery = (data: Partial<Task>) => {
  const supabase = createSupabaseClient()
  if (!data.name) {
    return { code: '500', error: 'Task name is required' }
  }

  return supabase.from('tasks').insert([{
    name: data.name,
    description: data.description || '',
    status: data.status || 'not-started',
    due_date: data.due_date
  }
  ])
}
export type CreateTask = QueryData<ReturnType<typeof createTaskQuery>>

/** Update Task by ID */
export const updateTaskQuery = (id: string, data: Task) => {
  console.log('Updating task with data:', data)
  const supabase = createSupabaseClient()
  return supabase.from('tasks').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id)
}
export type UpdateTask = QueryData<ReturnType<typeof updateTaskQuery>>

/** Delete Task by ID */
export const deleteTaskQuery = (id: string) => {
  const supabase = createSupabaseClient()
  return supabase.from('tasks').delete().eq('id', id)
}
export type DeleteTask = QueryData<ReturnType<typeof deleteTaskQuery>>
