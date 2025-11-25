<script setup lang="ts">
const pageTitle = ref('Savings Sectioning')
const pageDescription = ref('Organize and manage your savings goals')
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
      label="Add Savings Section"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your savings sections will appear here.
      </p>
    </div>
  </UPageCard>
</template>
