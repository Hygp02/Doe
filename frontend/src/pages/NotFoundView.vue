<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <FileQuestion
      class="h-16 w-16 text-muted-foreground"
      aria-hidden="true"
    />
    <div class="space-y-2">
      <h1 class="text-2xl font-bold">
        Página não encontrada
      </h1>
      <p class="text-muted-foreground">
        O endereço solicitado não existe ou foi removido.
      </p>
    </div>
    <Button as-child>
      <RouterLink to="/">
        Voltar para a página inicial
      </RouterLink>
    </Button>
  </div>
</template>
