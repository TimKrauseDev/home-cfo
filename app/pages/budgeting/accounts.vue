<script setup lang="ts">
import { getInstrumentsQuery } from '@/utils/supabaseQueries'
import type { Instruments } from '@/utils/supabaseQueries'

const pageTitle = ref('Accounts')
const pageDescription = ref('Manage your bank accounts and financial accounts')

const instruments = ref<Instruments | null>(null)

const getInstruments = async () => {
  const { data, error, status } = await getInstrumentsQuery()
  console.log('Data:', data)
  console.log('status:', status)

  if (error) throw new Error('Error fetching instruments')

  instruments.value = data

  console.log('Instruments:', instruments.value)
}
onMounted(async () => {
  await getInstruments()
})
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
      label="Add Account"
      color="neutral"
      icon="i-lucide-plus"
      class="w-fit lg:ms-auto"
    />
  </UPageCard>

  <UPageGrid>
    <UPageCard variant="subtle" class="md:col-span-2 lg:col-span-3">
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Add in Net Worth Graph with filters for graph timeline (mo, 6 mo, yr, ytd, all time )
        </p>
      </div>
    </UPageCard>
    <UPageCard variant="subtle" class="md:col-span-2 lg:col-span-2">
      <div class="space-y-4">
        <ul>
          <li v-for="instrument in instruments" :key="instrument.id" class="text-muted-foreground">
            {{ instrument.name }}
          </li>
        </ul>
        <p class="text-muted-foreground">
          List of all accounts and total in account
        </p>
      </div>
    </UPageCard>
    <UPageCard variant="subtle" class="md:col-span-2 lg:col-span-1">
      <div class="space-y-4">
        <p class="text-muted-foreground">
          Summary of all accounts as graph, with totals & Percentages
        </p>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
