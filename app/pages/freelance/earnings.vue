<script setup lang="ts">
const pageTitle = ref('Earnings')
const pageDescription = ref('Track your freelance income and earnings')
</script>

<template>
  <UPageCard
    :title="pageTitle"
    :description="pageDescription"
    variant="naked"
    orientation="horizontal"
    class="mb-4"
  >
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your earnings tracking will appear here.
      </p>
    </div>
  </UPageCard>
</template>
