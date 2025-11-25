<script setup lang="ts">
const pageTitle = ref('Inventory')
const pageDescription = ref('Track your plants, seeds, and gardening supplies')
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
      label="Add Item"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your garden inventory will appear here.
      </p>
    </div>
  </UPageCard>
</template>
