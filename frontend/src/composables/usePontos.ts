import { computed, ref, watch } from 'vue'
import { buscar } from '@/services/pontos.service'
import type { PontoColeta } from '@/types/ponto-coleta'
import { useQueryFilters } from './useQueryFilters'

export function usePontos() {
  const { busca, tipo, filters, updateQueryParams } = useQueryFilters()

  const pontos = ref<PontoColeta[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function carregar() {
    loading.value = true
    error.value = null
    try {
      pontos.value = await buscar({
        busca: busca.value || undefined,
        tipo: tipo.value || undefined,
      })
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar pontos de coleta.'
    } finally {
      loading.value = false
    }
  }

  function setFilters(novaBusca: string, novoTipo: string) {
    busca.value = novaBusca
    tipo.value = novoTipo
    updateQueryParams({ busca: novaBusca, tipo: novoTipo })
  }

  function limparFiltros() {
    setFilters('', '')
  }

  watch(
    filters,
    () => {
      carregar()
    },
    { immediate: true },
  )

  const hasFilters = computed(() => busca.value !== '' || tipo.value !== '')

  return {
    pontos,
    loading,
    error,
    busca,
    tipo,
    hasFilters,
    carregar,
    setFilters,
    limparFiltros,
  }
}
