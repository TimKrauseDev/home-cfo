<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import InputDateWithPopover from '~/components/ui/InputDateWithPopover.vue'
import { useSelectStatus } from '@/composables/useSelectOptions'

const toast = useToast()

const { projectStatusOptions } = useSelectStatus()
const { createProject } = useProjectsStore()

const isModalOpen = ref(false)

const date = shallowRef<CalendarDate | null>(null)

const project = ref<Partial<Project>>({
  name: '',
  status: 'not-started',
  due_date: null,
  description: ''
})

const resetProjectForm = () => {
  project.value = {
    name: '',
    status: 'not-started',
    due_date: null,
    description: ''
  }
  date.value = null
}

const onSubmit = async () => {
  const year = date.value?.year || 0
  if (!DateUtils.validateYear(year)) date.value = null

  project.value.due_date = date.value
    ? DateUtils.calendarDateToUTCDateISO(date.value)
    : null

  const success = await createProject(project.value)
  if (!success) return

  toast.add({
    title: 'Project Created',
    description: 'The project has been created successfully.',
    color: 'success'
  })

  isModalOpen.value = false
  resetProjectForm()
}
</script>

<template>
  <UDrawer
    direction="right"
    :open="isModalOpen"
    title="Add New Project"
    :ui="{ container: 'w-96 p-10' }"
    :handle="false"
  >
    <UButton
      label="Add Project"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
      @click="isModalOpen = true"
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
              :items="projectStatusOptions"
              class="w-full"
            />
          </UFormField>
          <UFormField
            name="due_date"
            label="Due Date"
            class="flex flex-col items-start gap-2"
            :ui="{ container: 'w-full' }"
          >
            <InputDateWithPopover v-model="date" />
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
</template>
