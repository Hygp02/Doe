import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PontoCard from '@/components/PontoCard.vue'
import type { PontoColeta } from '@/types/ponto-coleta'

const pontoMock: PontoColeta = {
  id: 'pc-001',
  nome: 'Centro Comunitario Ponta Verde',
  descricao: 'Ponto de apoio comunitario.',
  endereco: 'Rua Jose Pontes de Magalhaes, 120',
  bairro: 'Ponta Verde',
  cidade: 'Maceio',
  tiposDoacao: ['alimentos', 'roupas', 'higiene'],
  horarioFuncionamento: 'Segunda a sexta, das 8h as 17h',
  telefone: '(82) 3333-0101',
  status: 'ativo',
  observacoes: '',
}

function mountCard(routerStub = true) {
  return mount(PontoCard, {
    props: { ponto: pontoMock },
    global: {
      stubs: {
        RouterLink: routerStub
          ? {
              template: '<a><slot /></a>',
            }
          : {
              template: '<a :href="to"><slot /></a>',
              props: ['to'],
            },
      },
    },
  })
}

describe('PontoCard', () => {
  it('deve renderizar o nome do ponto', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Centro Comunitario Ponta Verde')
  })

  it('deve renderizar o bairro', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Ponta Verde')
  })

  it('deve renderizar todos os tipos de doacao como badges', () => {
    const wrapper = mountCard()
    const badges = wrapper.findAll('[data-testid="tipo-badge"]')
    const tiposTextos = badges.map((b) => b.text())
    expect(tiposTextos).toContain('alimentos')
    expect(tiposTextos).toContain('roupas')
    expect(tiposTextos).toContain('higiene')
  })

  it('deve renderizar o horario de funcionamento', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Segunda a sexta, das 8h as 17h')
  })

  it('deve ter link para a pagina de detalhes do ponto', () => {
    const wrapper = mountCard(false)
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/pontos/pc-001')
  })
})
