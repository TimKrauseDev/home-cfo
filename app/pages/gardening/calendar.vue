<script setup lang="ts">
const pageTitle = ref('Calendar')
const pageDescription = ref('Plan your planting and harvesting schedule')
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
      label="Add Event"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your gardening calendar will appear here.
      </p>
    </div>
  </UPageCard>
</template>
