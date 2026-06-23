import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TipoDoacao } from '@/types/ponto-coleta'
import { TIPOS_DOACAO } from '@/constants/tipos-doacao'

export interface QueryFilters {
  busca: string
  tipo: string
}

export function useQueryFilters() {
  const route = useRoute()
  const router = useRouter()

  const busca = ref<string>(normalizeBusca(route.query.busca))
  const tipo = ref<string>(normalizeTipo(route.query.tipo))

  function normalizeBusca(value: unknown): string {
    if (typeof value !== 'string') return ''
    return value.trim()
  }

  function normalizeTipo(value: unknown): string {
    if (typeof value !== 'string') return ''
    const trimmed = value.trim()
    if (trimmed === '') return ''
    return TIPOS_DOACAO.includes(trimmed as TipoDoacao) ? trimmed : ''
  }

  function updateQueryParams(filters: QueryFilters) {
    const query: Record<string, string> = {}
    if (filters.busca) query.busca = filters.busca
    if (filters.tipo) query.tipo = filters.tipo

    router.replace({ query: Object.keys(query).length ? query : undefined })
  }

  watch(
    () => route.query,
    (query) => {
      busca.value = normalizeBusca(query.busca)
      tipo.value = normalizeTipo(query.tipo)
    },
  )

  const filters = computed<QueryFilters>(() => ({
    busca: busca.value,
    tipo: tipo.value,
  }))

  return {
    busca,
    tipo,
    filters,
    updateQueryParams,
  }
}
