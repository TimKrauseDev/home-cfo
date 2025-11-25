<script setup lang="ts">

</script>

<template>
  <UDashboardPanel id="freelance" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Freelance">
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
