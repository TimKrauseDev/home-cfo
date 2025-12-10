<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import InputDateWithPopover from '~/components/ui/InputDateWithPopover.vue'

const pageTitle = ref('Project Details')
const id = useRoute().params.id as string

const project = ref<Project | null>(null)
const date = shallowRef<CalendarDate | null>(null)
const deleteModalOpen = ref(false)

const statusOptions = ref([
  { label: 'Not Started', value: 'not-started' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'On Hold', value: 'on-hold' },
  { label: 'Perpetual', value: 'perpetual' }
])

const onSubmit = async () => {
  if (!project.value) return
  console.log('Form submitted:', project.value)
  console.log('project date:', date.value)

  const year = date.value?.year || 0
  if (year < 1900 || year > 2100) date.value = null

  if (date.value) {
    const utcDate = new Date(Date.UTC(date.value.year, date.value.month - 1, date.value.day))
    project.value.due_date = utcDate.toISOString()
  } else {
    project.value.due_date = null
  }

  const { error } = await updateProjectQuery(project.value.id, project.value)

  if (error) {
    console.error('Error updating project:', error)
    return
  }
}

const onDelete = async () => {
  if (!project.value) return
  console.log('Delete project:', project.value)

  const { error } = await deleteProjectQuery(project.value.id)

  if (error) {
    console.error('Error deleting project:', error)
    return
  }

  const router = useRouter()
  router.push('/planner/projects')
}

onMounted(async () => {
  const { data, error } = await getProjectQuery(id)

  if (error) {
    console.error('Error fetching project:', error)
    return
  }
  if (data) {
    console.log('Fetched project data:', data)
    project.value = data

    if (data.due_date) {
      const currDate = new Date(data.due_date)
      date.value = new CalendarDate(
        currDate.getUTCFullYear(),
        currDate.getUTCMonth() + 1,
        currDate.getUTCDate()
      )
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-6 lg:gap-12 w-full lg:max-w-2xl mx-auto">
    <UForm
      v-if="project"
      id="project-details"
      :state="project"
      @submit.prevent="onSubmit"
    >
      <UPageCard
        :title="pageTitle"
        variant="naked"
        orientation="horizontal"
        class="mb-4"
      >
        <div class="flex items-end gap-4 ms-auto">
          <UButton
            label="Save Changes"
            color="neutral"
            icon="i-lucide-check-circle"
            class="w-fit lg:ms-auto"
            type="submit"
            @submit.prevent="onSubmit"
          />
          <UModal
            v-model:open="deleteModalOpen"
            title="Delete Project"
            :ui="{ footer: 'justify-end gap-4' }"
          >
            <UButton
              label="Delete Project"
              color="error"
              icon="i-lucide-trash-2"
              class="w-fit lg:ms-auto"
            />
            <template #body>
              <div class="flex flex-col gap-4 text-center">
                <p>
                  Please confirm you would like to delete the following project:
                </p>
                <p class="font-bold">
                  {{ project?.name }}
                </p>
              </div>
            </template>
            <template #footer>
              <UButton
                label="Delete"
                color="error"
                @click="onDelete()"
              />
              <UButton
                label="Cancel"
                color="neutral"
                @click="deleteModalOpen = false"
              />
            </template>
          </UModal>
        </div>
      </UPageCard>

      <UPageCard variant="subtle">
        <UFormField
          name="name"
          label="Name"
          required
          class="flex max-sm:flex-col justify-between items-start gap-4"
          :ui="{ container: 'w-1/2' }"
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
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <USelect
            v-model="project.status"
            :items="statusOptions"
          />
        </UFormField>
        <UFormField
          name="due_date"
          label="Due Date"
          class="flex max-sm:flex-col justify-between items-start gap-4"
        >
          <InputDateWithPopover v-model="date" />
        </UFormField>
        <UFormField
          name="description"
          label="Description"
          class="flex max-sm:flex-col justify-between items-start gap-4"
          :ui="{ container: 'w-2/3' }"
        >
          <UTextarea
            v-model="project.description"
            :rows="5"
            autoresize
            class="w-full"
          />
        </UFormField>
      </UPageCard>
    </UForm>
  </div>
</template>
