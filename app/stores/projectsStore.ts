export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  const getProjects = async () => {
    const { data, error } = await getProjectsQuery()

    if (error) {
      console.error('Error fetching projects:', error)
      return false
    }

    projects.value = data || []

    return true
  }

  const getProject = async (id: string) => {
    project.value = null

    const { data, error } = await getProjectQuery(id)

    if (error) {
      console.error('Error fetching project:', error)
      return false
    }

    project.value = data || null

    return true
  }

  const deleteProject = async (id: string) => {
    const { error } = await deleteProjectQuery(id)

    if (error) {
      console.error('Error deleting project:', error)
      return false
    }

    await getProjects()

    return true
  }

  const updateProject = async (id: string, data: Project) => {
    const { error } = await updateProjectQuery(id, data)

    if (error) {
      console.error('Error updating project:', error)
      return false
    }

    await getProjects()
    await getProject(id)

    return true
  }

  const createProject = async (data: Partial<Project>) => {
    const { error } = await createProjectQuery(data)

    if (error) {
      console.error('Error creating project:', error)
      return false
    }

    await getProjects()

    return true
  }

  return {
    project,
    projects,
    getProject,
    getProjects,
    deleteProject,
    updateProject,
    createProject
  }
})
