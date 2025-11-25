<script setup lang="ts">
const pageTitle = ref('Time Tracker')
const pageDescription = ref('Track time spent on projects and tasks')

const isTracking = ref(false)
const currentTask = ref('')

function toggleTracking() {
  isTracking.value = !isTracking.value
}
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
      :label="isTracking ? 'Stop Tracking' : 'Start Tracking'"
      :color="isTracking ? 'red' : 'green'"
      :icon="isTracking ? 'i-lucide-square' : 'i-lucide-play'"
      class="w-fit lg:ms-auto"
      @click="toggleTracking"
    />
  </UPageCard>

  <UPageCard variant="subtle">
    <div class="space-y-6">
      <div v-if="isTracking" class="p-4 rounded-lg bg-elevated border border-default">
        <div class="flex items-center gap-3 mb-3">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span class="text-sm font-medium">Tracking in progress</span>
          </div>
        </div>
        <UInput
          v-model="currentTask"
          placeholder="What are you working on?"
          class="mb-2"
        />
      </div>

      <div class="space-y-2">
        <h4 class="font-semibold">
          Time Entries
        </h4>
        <p class="text-sm text-muted-foreground">
          Your time entries will appear here.
        </p>
      </div>
    </div>
  </UPageCard>
</template>
