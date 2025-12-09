<script setup lang="ts">
import type { Tasks } from '~/utils/supabaseQueries'
import { h, resolveComponent } from 'vue'
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const tasks = ref<Tasks | null>(null)
const router = useRouter()

const getTasks = async () => {
  const { data, error } = await getTasksQuery()

  if (error) {
    console.error('Error fetching projects:', error.message)
    return
  }

  tasks.value = data
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { dateStyle: 'medium' })
}

const columns: TableColumn<Tasks[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'font-medium' }, 'Task Name'),
    cell: ({ row }) => {
      return h('div', { class: 'truncate' }, row.getValue('name'))
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
    header: () => h('div', { class: 'font-medium text-center' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, formatDate(row.getValue('due_date')))
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'font-medium text-center' }, 'Status'),
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
        case 'repeating':
          color = 'primary'
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

function getRowItems(row: Row<Tasks[0]>): DropdownMenuItem[] {
  return [
    {
      label: 'Edit',
      onClick() {
        router.push(`/planner/tasks/${row.original.id}`)
      }
    },
    {
      label: 'Delete',
      onClick() {
        console.log('Delete', row.original.name)
        toast.add({
          title: 'Delete action clicked!',
          color: 'warning',
          icon: 'i-lucide-trash-2'
        })
      }
    }
  ]
}

onMounted(() => {
  getTasks()
})
</script>

<template>
  <UPageCard variant="subtle" class="overflow-scroll">
    <UTable
      :data="tasks ?? []"
      :columns="columns"
      class="flex-1"
    />
  </UPageCard>
</template>
