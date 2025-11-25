<script setup lang="ts">
const pageTitle = ref('Overview')
const pageDescription = ref('Get a complete overview of your financial status')
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
        Your budgeting overview will appear here.
      </p>
    </div>
  </UPageCard>
</template>
