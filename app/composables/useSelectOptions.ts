export const useSelectStatus = () => {
  const projectStatusOptions = ref([
    { label: 'Not Started', value: 'not-started' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'On Hold', value: 'on-hold' },
    { label: 'Perpetual', value: 'perpetual' }
  ])

  const taskStatusOptions = ref([
    { label: 'Not Started', value: 'not-started' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Repeating', value: 'repeating' },
    { label: 'Perpetual', value: 'perpetual' }
  ])

  const taskRepeatingTypeOptions = ref([
    { label: 'Daily', value: 'day' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
    { label: 'Yearly', value: 'year' }
  ])

  return {
    projectStatusOptions,
    taskStatusOptions,
    taskRepeatingTypeOptions
  }
}
