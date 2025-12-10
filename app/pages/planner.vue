<script setup lang="ts">
const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)
const { getProjects } = projectsStore

if (!projects.value) await getProjects()
</script>

<template>
  <UDashboardPanel id="planner" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UDashboardNavbar title="Planner">
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
