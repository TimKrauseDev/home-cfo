<script setup lang="ts">
const pageTitle = ref('Planner Overview')
const pageDescription = ref('Overview of your ongoing tasks and projects.')
</script>

<template>
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
        Overview of your projects will appear here...
      </p>
    </div>
  </UPageCard>
</template>
