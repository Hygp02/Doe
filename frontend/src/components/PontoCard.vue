<script setup lang="ts">
import type { PontoColeta } from '@/types/ponto-coleta'

defineProps<{
  ponto: PontoColeta
}>()
</script>

<template>
  <RouterLink
    :to="`/pontos/${ponto.id}`"
    class="block rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="p-4">
      <h3 class="font-semibold text-base mb-2">{{ ponto.nome }}</h3>
      <div class="flex flex-wrap gap-1.5 mb-2">
        <span
          v-for="tipo in ponto.tiposDoacao"
          :key="tipo"
          class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium bg-accent text-accent-foreground"
        >
          {{ tipo }}
        </span>
      </div>
      <p class="text-sm text-muted-foreground mb-1">
        <strong>Bairro:</strong> {{ ponto.bairro }}
      </p>
      <p v-if="ponto.horarioFuncionamento" class="text-sm text-muted-foreground">
        <strong>Horário:</strong> {{ ponto.horarioFuncionamento }}
      </p>
    </div>
  </RouterLink>
</template>
