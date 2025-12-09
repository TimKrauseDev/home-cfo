<script setup lang="ts">
import ProjectsTableCard from '~/components/planner/ProjectsTableCard.vue'

const pageTitle = ref('Projects')
const pageDescription = ref('Manage and track your projects here.')
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
      label="Add Project"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <ProjectsTableCard />
</template>
