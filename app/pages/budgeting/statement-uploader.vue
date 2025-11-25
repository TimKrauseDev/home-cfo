<script setup lang="ts">
const pageTitle = ref('Statement Uploader')
const pageDescription = ref('Upload and process your bank statements')

const fileRef = ref<HTMLInputElement>()
const uploadedFiles = ref<string[]>([])

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  for (let i = 0; i < input.files.length; i++) {
    uploadedFiles.value.push(input.files[i]!.name)
  }
}

function onFileClick() {
  fileRef.value?.click()
}
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
    <div class="space-y-6">
      <div class="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-default">
        <UIcon name="i-lucide-upload" class="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 class="text-lg font-semibold mb-2">
          Upload Bank Statements
        </h3>
        <p class="text-sm text-muted-foreground mb-4">
          PDF, CSV, or Excel files supported
        </p>
        <UButton
          label="Choose Files"
          color="neutral"
          icon="i-lucide-file-plus"
          @click="onFileClick"
        />
        <input
          ref="fileRef"
          type="file"
          class="hidden"
          accept=".pdf,.csv,.xls,.xlsx"
          multiple
          @change="onFileChange"
        >
      </div>

      <div v-if="uploadedFiles.length > 0" class="space-y-2">
        <h4 class="font-semibold">
          Uploaded Files
        </h4>
        <ul class="space-y-2">
          <li
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="flex items-center gap-2 p-2 rounded bg-elevated/50"
          >
            <UIcon name="i-lucide-file" class="w-4 h-4" />
            <span class="text-sm">{{ file }}</span>
          </li>
        </ul>
      </div>
    </div>
  </UPageCard>
</template>
