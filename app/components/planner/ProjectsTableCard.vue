<script setup lang="ts">
import type { Projects } from '~/utils/supabaseQueries'
import { h, resolveComponent } from 'vue'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const projects = ref<Projects | null>(null)
const router = useRouter()
const deleteModalOpen = ref(false)
const deleteProjectId = ref<string | null>(null)

const refreshProjects = async () => {
  await getProjects()
}

defineExpose({
  refreshProjects
})

const sortedProjects = computed(() => {
  if (!projects.value) return []

  return [...projects.value].sort((a, b) => {
    // Primary sort: due date (ascending, nulls last)
    const dateA = a.due_date ? new Date(a.due_date).getTime() : Number.MAX_SAFE_INTEGER
    const dateB = b.due_date ? new Date(b.due_date).getTime() : Number.MAX_SAFE_INTEGER

    if (dateA !== dateB) {
      return dateA - dateB
    }

    // Secondary sort: project name (alphabetically)
    return a.name.localeCompare(b.name)
  })
})

const getProjects = async () => {
  const { data, error } = await getProjectsQuery()

  if (error) {
    console.error('Error fetching projects:', error.message)
    return
  }

  projects.value = data
}

const onDelete = async (id: string) => {
  if (!id) return

  const projectToDelete = projects.value?.find(p => p.id === id)
  if (!projectToDelete) return

  console.log('Delete project:', projectToDelete.name)

  const { error } = await deleteProjectQuery(projectToDelete.id)

  if (error) {
    console.error('Error deleting project:', error)
    return
  }

  deleteModalOpen.value = false

  toast.add({
    title: `Deleted project: ${projectToDelete.name}`,
    color: 'error',
    icon: 'i-lucide-trash-2'
  })

  await getProjects()
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { dateStyle: 'medium' })
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
      return h('div', { class: 'text-center' }, formatDate(row.getValue('due_date')))
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
    // header: () => h('div', { class: 'font-medium text-center' }, 'Status'),
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
        // onDelete(row.original.id)
        // toast.add({
        //   title: `Deleted project: ${row.original.name}`,
        //   color: 'error',
        //   icon: 'i-lucide-trash-2'
        // })
        deleteModalOpen.value = true
        deleteProjectId.value = row.original.id
      }
    }
  ]
}

onMounted(() => {
  getProjects()
})
</script>

<template>
  <UPageCard variant="subtle" class="overflow-scroll">
    <UTable
      :data="sortedProjects"
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
          {{ projects?.find(p => p.id === deleteProjectId)?.name }}
        </p>
      </div>
    </template>
    <template #footer>
      <UButton
        label="Delete"
        color="error"
        @click="onDelete(deleteProjectId || '')"
      />
      <UButton
        label="Cancel"
        color="neutral"
        @click="deleteModalOpen = false"
      />
    </template>
  </UModal>
</template>
