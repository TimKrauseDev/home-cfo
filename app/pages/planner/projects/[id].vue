<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import InputDateWithPopover from '~/components/ui/InputDateWithPopover.vue'
import { useSelectStatus } from '@/composables/useSelectOptions'
import { useProjectsStore } from '~/stores/projectsStore'

const pageTitle = ref('Project Details')
const id = useRoute().params.id as string

const router = useRouter()
const toast = useToast()

const projectStore = useProjectsStore()
const { project } = storeToRefs(projectStore)
const { getProject, updateProject, deleteProject } = projectStore

const { projectStatusOptions } = useSelectStatus()

const date = shallowRef<CalendarDate | null>(null)

const deleteModalOpen = ref(false)

const onSubmit = async () => {
  if (!project.value) return

  const year = date.value?.year || 0
  if (!DateUtils.validateYear(year)) date.value = null

  project.value.due_date = date.value
    ? DateUtils.calendarDateToUTCDateISO(date.value)
    : null

  const success = await updateProject(project.value.id, project.value)

  if (!success) return

  toast.add({
    title: 'Project Updated',
    description: 'The project has been updated successfully.',
    color: 'success'
  })
}

const onDelete = async () => {
  await deleteProject(id)
  router.push('/planner/projects')
}

onMounted(async () => {
  await getProject(id)

  if (project.value?.due_date) {
    date.value = DateUtils.UTCDateISOToCalendarDate(project.value.due_date)
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
            :items="projectStatusOptions"
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
