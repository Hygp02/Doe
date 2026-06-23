<script setup lang="ts">
import { AlertTriangle, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

defineProps<{
  message?: string
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-16"
    role="alert"
    aria-live="assertive"
  >
    <div class="rounded-full bg-destructive/10 p-4">
      <AlertTriangle
        class="h-8 w-8 text-destructive"
        aria-hidden="true"
      />
    </div>
    <div class="text-center space-y-1">
      <p class="text-lg font-medium">
        Algo deu errado
      </p>
      <p class="text-sm text-muted-foreground max-w-md">
        {{ message ?? 'Não foi possível carregar os dados.' }}
      </p>
    </div>
    <Button
      variant="outline"
      class="gap-2"
      @click="emit('retry')"
    >
      <RefreshCw
        class="h-4 w-4"
        aria-hidden="true"
      />
      Tentar novamente
    </Button>
  </div>
</template>
