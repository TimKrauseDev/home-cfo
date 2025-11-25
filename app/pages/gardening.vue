<script setup lang="ts">

</script>

<template>
  <UDashboardPanel id="gardening" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Gardening">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="">
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
