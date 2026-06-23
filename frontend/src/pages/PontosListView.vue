<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { SearchX } from 'lucide-vue-next'
import { usePontos } from '@/composables/usePontos'
import PontoCard from '@/components/PontoCard.vue'
import PontoFilters from '@/components/PontoFilters.vue'
import AppSkeleton from '@/components/AppSkeleton.vue'
import AppError from '@/components/AppError.vue'
import PageHeader from '@/components/PageHeader.vue'
import MapaMaceio from '@/components/MapaMaceio.vue'

const router = useRouter()

const { pontos, loading, error, busca, tipo, hasFilters, carregar, setFilters, limparFiltros } =
  usePontos()

function handleLimpar() {
  limparFiltros()
}

function verDetalhes(id: string) {
  router.push(`/pontos/${id}`)
}

watch([busca, tipo], () => {
  setFilters(busca.value, tipo.value)
})
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Pontos de Coleta"
      description="Confira os locais disponíveis para realizar doações em Maceió."
    />

    <PontoFilters
      v-model:busca="busca"
      v-model:tipo="tipo"
      @limpar="handleLimpar"
    />

    <AppSkeleton
      v-if="loading"
      :rows="6"
    />

    <MapaMaceio
      v-else-if="pontos.length > 0"
      :pontos="pontos"
      :interactive="true"
      class="animate-fade-in-up"
      @select="verDetalhes"
    />

    <AppError
      v-else-if="error"
      :message="error"
      @retry="carregar"
    />

    <div
      v-else-if="pontos.length === 0"
      class="flex flex-col items-center justify-center gap-4 py-16 text-center"
      role="status"
    >
      <div class="rounded-full bg-muted p-4">
        <SearchX
          class="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <div class="space-y-1">
        <p class="text-lg font-medium">
          Nenhum ponto encontrado
        </p>
        <p class="text-sm text-muted-foreground">
          Tente ajustar os termos de busca ou limpar os filtros.
        </p>
      </div>
      <Button
        v-if="hasFilters"
        variant="outline"
        @click="handleLimpar"
      >
        Limpar filtros
      </Button>
      <Button
        v-else
        as-child
        variant="outline"
      >
        <RouterLink to="/">
          Voltar para a página inicial
        </RouterLink>
      </Button>
    </div>

    <section
      v-else
      class="space-y-4"
    >
      <p class="text-sm text-muted-foreground">
        {{ pontos.length }} ponto{{ pontos.length === 1 ? '' : 's' }} encontrado{{ pontos.length === 1 ? '' : 's' }}
      </p>
      <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <PontoCard
          v-for="ponto in pontos"
          :key="ponto.id"
          :ponto="ponto"
        />
      </div>
    </section>
  </div>
</template>
