<script setup lang="ts">
const route = useRoute()
const taskId = computed(() => route.params.id as string)
const taskTitle = computed(() => `Task #${taskId.value}`)

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar :title="taskTitle" />
        <UDashboardPanelContent>
          <div class="p-4">
            <p class="text-gray-500">
              Task details for ID: {{ taskId }}
            </p>
          </div>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </div>
</template>
