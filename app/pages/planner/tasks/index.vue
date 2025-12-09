<script setup lang="ts">
import TasksTableCard from '~/components/planner/TasksTableCard.vue'

const pageTitle = ref('Tasks')
const pageDescription = ref('Manage your project tasks and deadlines')
</script>

<template>
  <UPageCard
    :title="pageTitle"
    :description="pageDescription"
    variant="naked"
    orientation="horizontal"
    class="mb-4"
  >
    <UButton
      label="Add Task"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <TasksTableCard />
</template>
