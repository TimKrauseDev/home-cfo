<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'

const dateModel = defineModel<CalendarDate | null>({
  default: null
})

const inputDateRef = useTemplateRef('inputDateRef')
</script>

<template>
  <UInputDate
    ref="inputDateRef"
    v-model="dateModel"
    class="w-full"
  >
    <template #trailing>
      <UPopover :reference="inputDateRef?.inputsRef[3]?.$el">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-calendar"
          aria-label="Select a date"
          class="px-0"
        />
        <template #content>
          <UCalendar v-model="dateModel" class="p-2" />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
