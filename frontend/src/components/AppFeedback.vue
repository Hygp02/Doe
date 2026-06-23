<script setup lang="ts">
import { CheckCircle2, AlertCircle } from 'lucide-vue-next'

defineProps<{
  type: 'success' | 'error'
  message: string
}>()
</script>

<template>
  <div
    class="rounded-lg p-3 text-sm flex items-start gap-3"
    :class="type === 'success'
      ? 'bg-green-50 text-green-800 border border-green-200'
      : 'bg-destructive/10 text-destructive border border-destructive/20'"
    role="alert"
  >
    <CheckCircle2
      v-if="type === 'success'"
      class="h-5 w-5 mt-0.5 shrink-0"
      aria-hidden="true"
    />
    <AlertCircle
      v-else
      class="h-5 w-5 mt-0.5 shrink-0"
      aria-hidden="true"
    />
    <span>{{ message }}</span>
  </div>
</template>
