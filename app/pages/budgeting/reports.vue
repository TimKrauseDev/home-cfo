<script setup lang="ts">
const pageTitle = ref('Reports')
const pageDescription = ref('Generate and view financial reports')
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
      label="Generate Report"
      color="neutral"
      icon="i-lucide-file-text"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your reports will appear here.
      </p>
    </div>
  </UPageCard>
</template>
