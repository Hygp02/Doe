<script setup lang="ts">
import { SearchX } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineProps<{
  title?: string
  description?: string
  showAction?: boolean
  actionLabel?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-16"
    role="status"
    aria-live="polite"
  >
    <div class="rounded-full bg-muted p-4">
      <SearchX
        class="h-8 w-8 text-muted-foreground"
        aria-hidden="true"
      />
    </div>
    <div class="text-center space-y-1">
      <p class="text-lg font-medium">
        {{ title ?? 'Nenhum resultado encontrado' }}
      </p>
      <p class="text-sm text-muted-foreground">
        {{ description ?? 'Tente ajustar os critérios de busca.' }}
      </p>
    </div>
    <Button
      v-if="showAction"
      variant="outline"
      @click="emit('action')"
    >
      {{ actionLabel ?? 'Limpar filtros' }}
    </Button>
  </div>
</template>
