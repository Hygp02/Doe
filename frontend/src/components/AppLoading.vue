<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  message?: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3 py-16"
    role="status"
    aria-live="polite"
  >
    <Loader2
      class="h-8 w-8 animate-spin text-primary"
      aria-hidden="true"
    />
    <p class="text-muted-foreground">
      {{ message ?? 'Carregando...' }}
    </p>
  </div>
</template>
