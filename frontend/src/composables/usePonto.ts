import { ref } from 'vue'
import { buscarPorId } from '@/services/pontos.service'
import type { PontoColeta } from '@/types/ponto-coleta'

export function usePonto() {
  const ponto = ref<PontoColeta | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notFound = ref(false)

  async function carregar(id: string) {
    loading.value = true
    error.value = null
    notFound.value = false
    try {
      ponto.value = await buscarPorId(id)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao carregar detalhes.'
      if (msg.toLowerCase().includes('nao encontrado') || msg.toLowerCase().includes('não encontrado')) {
        notFound.value = true
      } else {
        error.value = msg
      }
      ponto.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    ponto,
    loading,
    error,
    notFound,
    carregar,
  }
}
