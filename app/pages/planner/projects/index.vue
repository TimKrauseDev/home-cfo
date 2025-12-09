<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import ProjectsTableCard from '~/components/planner/ProjectsTableCard.vue'

const pageTitle = ref('Projects')
const pageDescription = ref('Manage and track your projects here.')
const addModalOpen = ref(false)
const inputDateRef = useTemplateRef('inputDateRef')
const dateValue = shallowRef<CalendarDate | null>(null)
const tableRef = ref<InstanceType<typeof ProjectsTableCard> | null>(null)

const toast = useToast()
const statusOptions = ref([
  { label: 'Not Started', value: 'not-started' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' },
  { label: 'Perpetual', value: 'perpetual' }
])

const project = ref<Partial<Project>>({
  name: '',
  status: 'not-started',
  due_date: null,
  description: ''
})

const onSubmit = async () => {
  console.log('Project date:', dateValue.value)

  const year = dateValue.value?.year || 0
  if (year < 1900 || year > 2100) dateValue.value = null

  const dueDate = dateValue.value
    ? new Date(
        dateValue.value.year,
        dateValue.value.month - 1,
        dateValue.value.day
      ).toISOString()
    : null

  project.value.due_date = dueDate
  console.log('Form submitted:', project)

  const { error } = await createProjectQuery(project.value)

  if (error) {
    console.error('Error updating project:', error)
    return
  }

  toast.add({
    title: 'Project Created',
    description: 'The project has been created successfully.',
    color: 'success'
  })

  addModalOpen.value = false
  project.value = {
    name: '',
    status: 'not-started',
    due_date: null,
    description: ''
  }

  if (tableRef.value) tableRef.value.refreshProjects()
}
</script>

<template>
  <UPageCard
    :title="pageTitle"
    :description="pageDescription"
    variant="naked"
    orientation="horizontal"
    class="mb-4"
  >
    <UDrawer
      direction="right"
      :open="addModalOpen"
      title="Add New Project"
      :ui="{ container: 'w-96 p-10' }"
      :handle="false"
    >
      <UButton
        label="Add Project"
        color="neutral"
        icon="i-lucide-plus"
        class="w-fit lg:ms-auto"
        @click="addModalOpen = true"
      />
      <template #body>
        <UForm
          v-if="project"
          id="project-details"
          :state="project"
          @submit.prevent="onSubmit"
        >
          <div class="flex flex-col gap-6">
            <UFormField
              name="name"
              label="Name"
              required
              class="flex flex-col items-start gap-2"
              :ui="{ container: 'w-full' }"
            >
              <UInput
                v-model="project.name"
                autocomplete="off"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="status"
              label="Status"
              required
              class="flex flex-col items-start gap-2"
              :ui="{ container: 'w-full' }"
            >
              <USelect
                v-model="project.status"
                :items="statusOptions"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="due_date"
              label="Due Date"
              class="flex flex-col items-start gap-2"
              :ui="{ container: 'w-full' }"
            >
              <UInputDate
                ref="inputDateRef"
                v-model="dateValue"
                class="w-full"
              >
                <template #trailing>
                  <UPopover :reference="inputDateRef?.inputsRef[3]?.$el">
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      icon="i-lucide-calendar"
                      aria-label="Select a date"
                      class="px-0"
                    />
                    <template #content>
                      <UCalendar v-model="dateValue" class="p-2" />
                    </template>
                  </UPopover>
                </template>
              </UInputDate>
            </UFormField>
            <UFormField
              name="description"
              label="Description"
              class="flex flex-col items-start gap-2"
              :ui="{ container: 'w-full' }"
            >
              <UTextarea
                v-model="project.description"
                :rows="5"
                autoresize
                class="w-full"
              />
            </UFormField>
            <UButton
              label="Add Project"
              color="neutral"
              class="w-fit lg:me-auto"
              type="submit"
              @submit.prevent="onSubmit"
            />
          </div>
        </UForm>
      </template>
    </UDrawer>
  </UPageCard>

  <ProjectsTableCard ref="tableRef" />
</template>
