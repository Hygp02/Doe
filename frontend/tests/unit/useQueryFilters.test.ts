import { describe, it, expect, vi, beforeEach } from 'vitest'
import { reactive, nextTick } from 'vue'

const mockRoute = reactive<{ query: Record<string, string> }>({ query: {} })
const mockRouterReplace = vi.fn()

vi.mock('vue-router', () => ({
  useRoute: () => mockRoute,
  useRouter: () => ({ replace: mockRouterReplace }),
}))

import { useQueryFilters } from '@/composables/useQueryFilters'

describe('useQueryFilters', () => {
  beforeEach(() => {
    mockRoute.query = {}
    mockRouterReplace.mockClear()
  })

  it('deve inicializar busca e tipo vazios quando query esta vazia', () => {
    const { busca, tipo } = useQueryFilters()
    expect(busca.value).toBe('')
    expect(tipo.value).toBe('')
  })

  it('deve normalizar busca e tipo validos da query', async () => {
    mockRoute.query = { busca: 'Ponta Verde', tipo: 'roupas' }
    const { busca, tipo } = useQueryFilters()
    await nextTick()

    expect(busca.value).toBe('Ponta Verde')
    expect(tipo.value).toBe('roupas')
  })

  it('deve ignorar tipo invalido na query', async () => {
    mockRoute.query = { tipo: 'invalido' }
    const { tipo } = useQueryFilters()
    await nextTick()

    expect(tipo.value).toBe('')
  })

  it('deve atualizar query params ao chamar updateQueryParams', () => {
    const { updateQueryParams } = useQueryFilters()
    updateQueryParams({ busca: 'Centro', tipo: 'alimentos' })

    expect(mockRouterReplace).toHaveBeenCalledWith({
      query: { busca: 'Centro', tipo: 'alimentos' },
    })
  })
})
