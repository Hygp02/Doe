<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

defineProps<{
  rows?: number
}>()
</script>

<template>
  <div
    class="space-y-4 py-8"
    role="status"
    aria-live="polite"
    aria-label="Carregando conteúdo"
  >
    <Skeleton class="h-8 w-3/4" />
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in rows ?? 6"
        :key="i"
        class="space-y-3 rounded-xl border bg-card p-4 shadow-sm"
      >
        <Skeleton class="h-5 w-[85%]" />
        <div class="flex gap-2">
          <Skeleton class="h-6 w-16 rounded-full" />
          <Skeleton class="h-6 w-16 rounded-full" />
        </div>
        <Skeleton class="h-4 w-[60%]" />
        <Skeleton class="h-4 w-[40%]" />
      </div>
    </div>
  </div>
</template>
