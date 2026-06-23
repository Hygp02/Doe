import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MapaMaceio from '@/components/MapaMaceio.vue'
import type { PontoColeta } from '@/types/ponto-coleta'

const pontosMock: PontoColeta[] = [
  {
    id: 'pc-001',
    nome: 'Centro Comunitario Ponta Verde',
    descricao: 'Ponto de apoio comunitario.',
    endereco: 'Rua Jose Pontes de Magalhaes, 120',
    bairro: 'Ponta Verde',
    cidade: 'Maceio',
    tiposDoacao: ['alimentos', 'roupas'],
    horarioFuncionamento: 'Segunda a sexta, das 8h as 17h',
    telefone: '(82) 3333-0101',
    status: 'ativo',
    observacoes: '',
  },
]

function mountMapa(props = {}) {
  return mount(MapaMaceio, {
    props: { pontos: pontosMock, ...props },
  })
}

describe('MapaMaceio', () => {
  it('deve renderizar o SVG do mapa', () => {
    const wrapper = mountMapa()
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('deve renderizar um pin para cada ponto ativo', () => {
    const wrapper = mountMapa()
    const pins = wrapper.findAll('g[role="button"], g.cursor-pointer')
    expect(pins.length).toBeGreaterThan(0)
  })

  it('deve emitir evento select ao clicar em um pin quando interativo', async () => {
    const wrapper = mountMapa({ interactive: true })
    const pin = wrapper.findAll('g').find((g) => g.classes().includes('cursor-pointer'))
    expect(pin).toBeDefined()
    await pin!.trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual(['pc-001'])
  })

  it('nao deve emitir evento select quando nao interativo', async () => {
    const wrapper = mountMapa({ interactive: false })
    const pin = wrapper.findAll('g').find((g) => g.classes().includes('cursor-pointer'))
    expect(pin).toBeDefined()
    await pin!.trigger('click')
    expect(wrapper.emitted('select')).toBeFalsy()
  })

  it('deve aplicar altura fixa quando prop height for fornecida', () => {
    const wrapper = mountMapa({ height: 220 })
    const container = wrapper.find('div').element as HTMLElement
    expect(container.style.height).toBe('220px')
  })
})
