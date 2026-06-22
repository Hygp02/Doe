<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { listarAtivos } from '@/services/pontos.service'
import type { PontoColeta } from '@/types/ponto-coleta'
import PontoCard from '@/components/PontoCard.vue'

const pontos = ref<PontoColeta[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    pontos.value = await listarAtivos()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erro ao carregar pontos de coleta.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Pontos de Coleta</h1>
      <p class="text-muted-foreground">
        Confira os locais disponíveis para realizar doações em Maceió.
      </p>
    </div>

    <section v-if="loading" class="text-center py-8">
      <p class="text-muted-foreground">Carregando pontos de coleta...</p>
    </section>

    <section v-else-if="error" class="text-center py-8">
      <p class="text-destructive">{{ error }}</p>
    </section>

    <section v-else-if="pontos.length === 0" class="text-center py-12">
      <p class="text-muted-foreground">Nenhum ponto de coleta encontrado.</p>
    </section>

    <section v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PontoCard v-for="ponto in pontos" :key="ponto.id" :ponto="ponto" />
    </section>
  </div>
</template>
