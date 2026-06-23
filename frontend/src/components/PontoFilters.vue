<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { OPCOES_TIPOS_DOACAO } from '@/constants/tipos-doacao'

const busca = defineModel<string>('busca', { default: '' })
const tipo = defineModel<string>('tipo', { default: '' })

const emit = defineEmits<{
  limpar: []
}>()

function handleLimpar() {
  busca.value = ''
  tipo.value = ''
  emit('limpar')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleLimpar()
  }
}
</script>

<template>
  <div
    class="flex flex-col sm:flex-row gap-3 rounded-xl border bg-card p-4 shadow-sm"
    role="search"
    aria-label="Filtros de busca"
  >
    <div class="relative flex-1">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        v-model="busca"
        type="text"
        placeholder="Buscar por nome, bairro ou tipo de doação..."
        class="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Buscar pontos de coleta"
        @keydown.escape="handleKeydown"
      >
    </div>
    <div class="flex gap-2">
      <select
        v-model="tipo"
        class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Filtrar por tipo de doação"
      >
        <option
          v-for="opcao in OPCOES_TIPOS_DOACAO"
          :key="opcao.value"
          :value="opcao.value"
        >
          {{ opcao.label }}
        </option>
      </select>
      <Button
        v-if="busca || tipo"
        variant="outline"
        aria-label="Limpar filtros"
        @click="handleLimpar"
      >
        <X
          class="h-4 w-4 sm:mr-1.5"
          aria-hidden="true"
        />
        <span class="hidden sm:inline">Limpar</span>
      </Button>
    </div>
  </div>
</template>
