<script setup lang="ts">
const pageTitle = ref('Invoice Generator')
const pageDescription = ref('Create and manage invoices for your clients')
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
      label="Create Invoice"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-4">
      <p class="text-muted-foreground">
        Your invoices will appear here.
      </p>
    </div>
  </UPageCard>
</template>
