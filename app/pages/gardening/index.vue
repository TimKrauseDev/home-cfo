<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const pageTitle = ref('Overview')
const pageDescription = ref('Get a complete overview of your garden')
const links = [[{
  label: 'Overview',
  icon: 'i-lucide-layout-dashboard',
  to: '/gardening',
  exact: true
}, {
  label: 'Inventory',
  icon: 'i-lucide-package',
  to: '/gardening/inventory'
}, {
  label: 'Calendar',
  icon: 'i-lucide-calendar',
  to: '/gardening/calendar'
}, {
  label: 'Tasks',
  icon: 'i-lucide-list-todo',
  to: '/gardening/tasks'
}]] satisfies NavigationMenuItem[][]
</script>

<template>
  <UPageCard variant="naked" orientation="horizontal" class="mb-4">
    <UNavigationMenu :items="links" highlight class="-mx-1 flex-1" />
  </UPageCard>
  <UPageCard
    :title="pageTitle"
    :description="pageDescription"
    variant="naked"
    orientation="horizontal"
    class="mb-4"
  />

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your garden overview will appear here.
      </p>
    </div>
  </UPageCard>
</template>
