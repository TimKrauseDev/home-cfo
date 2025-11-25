<script setup lang="ts">
const pageTitle = ref('Investments')
const pageDescription = ref('Track and manage your investment portfolio')
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
      label="Add Investment"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your investments will appear here.
      </p>
    </div>
  </UPageCard>
</template>
