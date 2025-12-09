<script setup lang="ts">
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

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your project tasks will appear here.
      </p>
    </div>
  </UPageCard>
</template>
