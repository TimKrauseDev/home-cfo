<script setup lang="ts">
const pageTitle = ref('Recurring Transactions')
const pageDescription = ref('Manage recurring income and expenses')
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
      label="Add Recurring"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your recurring transactions will appear here.
      </p>
    </div>
  </UPageCard>
</template>
