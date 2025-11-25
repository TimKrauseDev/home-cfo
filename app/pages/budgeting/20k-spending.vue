<script setup lang="ts">
const pageTitle = ref('20k Spending')
const pageDescription = ref('Track your 20k spending limits and goals')
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
        Your 20k spending tracking will appear here.
      </p>
    </div>
  </UPageCard>
</template>
