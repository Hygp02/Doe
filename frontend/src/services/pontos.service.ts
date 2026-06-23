import { pontosColetaMock } from '../mocks/pontos.mock'
import type { PontoColeta, PontoColetaInput, ResumoSistema, TipoDoacao } from '../types/ponto-coleta'

let pontos: PontoColeta[] = structuredClone(pontosColetaMock)
let nextId = pontos.length + 1

function clone<T>(value: T): T {
  return structuredClone(value)
}

function validate(input: PontoColetaInput): void {
  if (!input.nome?.trim()) throw new Error('Nome e obrigatorio.')
  if (!input.endereco?.trim()) throw new Error('Endereco e obrigatorio.')
  if (!input.bairro?.trim()) throw new Error('Bairro e obrigatorio.')
  if (!input.tiposDoacao?.length) throw new Error('Ao menos um tipo de doacao e obrigatorio.')
}

function matchesBusca(ponto: PontoColeta, busca: string): boolean {
  const query = busca.toLowerCase().trim()
  if (!query) return true

  return (
    ponto.nome.toLowerCase().includes(query) ||
    ponto.bairro.toLowerCase().includes(query) ||
    ponto.tiposDoacao.some((tipo) => tipo.toLowerCase().includes(query))
  )
}

export function listarAtivos(): Promise<PontoColeta[]> {
  return Promise.resolve(clone(pontos.filter((ponto) => ponto.status === 'ativo')))
}

export function listarTodos(): Promise<PontoColeta[]> {
  return Promise.resolve(clone(pontos))
}

export function buscar(query: { busca?: string; tipo?: string }): Promise<PontoColeta[]> {
  const result = pontos.filter(
    (ponto) =>
      ponto.status === 'ativo' &&
      matchesBusca(ponto, query.busca ?? '') &&
      (!query.tipo || ponto.tiposDoacao.includes(query.tipo as TipoDoacao)),
  )
  return Promise.resolve(clone(result))
}

export function buscarPorId(id: string): Promise<PontoColeta> {
  const ponto = pontos.find((item) => item.id === id)
  if (!ponto) return Promise.reject(new Error('Ponto de coleta nao encontrado.'))
  return Promise.resolve(clone(ponto))
}

export function criar(ponto: PontoColetaInput): Promise<PontoColeta> {
  validate(ponto)

  const created: PontoColeta = {
    id: `pc-${String(nextId++).padStart(3, '0')}`,
    nome: ponto.nome,
    descricao: ponto.descricao ?? '',
    endereco: ponto.endereco,
    bairro: ponto.bairro,
    cidade: 'Maceio',
    latitude: ponto.latitude,
    longitude: ponto.longitude,
    tiposDoacao: ponto.tiposDoacao,
    horarioFuncionamento: ponto.horarioFuncionamento ?? '',
    telefone: ponto.telefone ?? '',
    status: ponto.status,
    observacoes: ponto.observacoes ?? '',
  }

  pontos.push(created)
  return Promise.resolve(clone(created))
}

export function atualizar(id: string, ponto: PontoColetaInput): Promise<PontoColeta> {
  validate(ponto)

  const index = pontos.findIndex((item) => item.id === id)
  if (index === -1) return Promise.reject(new Error('Ponto de coleta nao encontrado.'))

  pontos[index] = {
    ...pontos[index],
    nome: ponto.nome,
    descricao: ponto.descricao ?? '',
    endereco: ponto.endereco,
    bairro: ponto.bairro,
    cidade: 'Maceio',
    latitude: ponto.latitude,
    longitude: ponto.longitude,
    tiposDoacao: ponto.tiposDoacao,
    horarioFuncionamento: ponto.horarioFuncionamento ?? '',
    telefone: ponto.telefone ?? '',
    status: ponto.status,
    observacoes: ponto.observacoes ?? '',
  }

  return Promise.resolve(clone(pontos[index]))
}

export function remover(id: string): Promise<void> {
  pontos = pontos.filter((ponto) => ponto.id !== id)
  return Promise.resolve()
}

export function getResumo(): Promise<ResumoSistema> {
  const ativos = pontos.filter((ponto) => ponto.status === 'ativo')
  const tiposDisponiveis = [...new Set(ativos.flatMap((ponto) => ponto.tiposDoacao))]

  return Promise.resolve({
    totalPontosAtivos: ativos.length,
    totalTiposDoacao: tiposDisponiveis.length,
    tiposDisponiveis,
  })
}
