<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="space-y-1 pb-2">
    <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">
      {{ title }}
    </h1>
    <p
      v-if="description"
      class="text-base text-muted-foreground max-w-2xl"
    >
      {{ description }}
    </p>
  </div>
</template>
