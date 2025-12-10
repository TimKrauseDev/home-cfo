<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { useProjectsStore } from '~/stores/projectsStore'
import type { Projects } from '~/utils/supabaseQueries'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)
const { deleteProject } = projectsStore

const toast = useToast()
const router = useRouter()

const deleteModalOpen = ref(false)
const deleteProjectId = ref<string | null>(null)
const deleteProjectName = ref<string | null>(null)

const onDelete = async (id: string | null, name: string | null) => {
  deleteModalOpen.value = false

  if (!id || !name) return

  const success = await deleteProject(id)
  if (!success) return

  toast.add({
    title: `Deleted project: ${name}`,
    color: 'success',
    icon: 'i-lucide-trash-2'
  })
}

const columns: TableColumn<Projects[0]>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Project Name',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    }
  },
  {
    accessorKey: 'description',
    header: () => h('div', { class: 'font-medium' }, 'Description'),
    cell: ({ row }) => {
      return h('div', { class: 'truncate max-w-64' }, row.getValue('description'))
    }
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Due Date',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, DateUtils.tableColumnDateFormat(row.getValue('due_date')))
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Status',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      let color = 'neutral'

      switch (status) {
        case 'not-started':
          color = 'neutral'
          break
        case 'in-progress':
          color = 'warning'
          break
        case 'completed':
          color = 'success'
          break
        case 'on-hold':
          color = 'error'
          break
        case 'perpetual':
          color = 'primary'
          break
      }

      return h(
        UBadge,
        { color, variant: 'subtle', class: 'capitalize text-center' },
        () => status.replace(/-/g, ' '))
    },
    meta: {
      class: {
        td: 'flex justify-center'
      }
    }
  },
  {
    id: 'actions',
    size: 80,
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            'content': {
              align: 'end'
            },
            'items': getRowItems(row),
            'aria-label': 'Actions dropdown'
          },
          () =>
            h(UButton, {
              'icon': 'i-lucide-ellipsis-vertical',
              'color': 'neutral',
              'variant': 'ghost',
              'class': 'ml-auto',
              'aria-label': 'Actions dropdown'
            })
        )
      )
    }
  }
]

function getRowItems(row: Row<Projects[0]>): DropdownMenuItem[] {
  return [
    {
      label: 'Edit',
      onClick() {
        router.push(`/planner/projects/${row.original.id}`)
      }
    },
    {
      label: 'Delete',
      onClick() {
        deleteModalOpen.value = true
        deleteProjectId.value = row.original.id
        deleteProjectName.value = row.original.name
      }
    }
  ]
}
</script>

<template>
  <UPageCard variant="subtle" class="overflow-scroll">
    <UTable
      :data="projects ?? []"
      :columns="columns"
      class="flex-1"
    />
  </UPageCard>

  <UModal
    v-model:open="deleteModalOpen"
    title="Delete Project"
    :ui="{ footer: 'justify-end gap-4' }"
  >
    <template #body>
      <div class="flex flex-col gap-4 text-center">
        <p>
          Please confirm you would like to delete the following project:
        </p>
        <p class="font-bold">
          {{ deleteProjectName }}
        </p>
      </div>
    </template>
    <template #footer>
      <UButton
        label="Delete"
        color="error"
        @click="onDelete(deleteProjectId, deleteProjectName)"
      />
      <UButton
        label="Cancel"
        color="neutral"
        @click="deleteModalOpen = false"
      />
    </template>
  </UModal>
</template>
