<script setup lang="ts">
const pageTitle = ref('Cash Flow')
const pageDescription = ref('Track your income and expenses over time')
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
        Your cash flow analysis will appear here.
      </p>
    </div>
  </UPageCard>
</template>
