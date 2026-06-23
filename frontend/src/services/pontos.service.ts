import { http } from './http'
import type { PontoColeta, PontoColetaInput, ResumoSistema } from '../types/ponto-coleta'

export function listarAtivos(): Promise<PontoColeta[]> {
  return http.get<PontoColeta[]>('/pontos')
}

export function listarTodos(): Promise<PontoColeta[]> {
  return http.get<PontoColeta[]>('/pontos?incluirInativos=true')
}

export function buscar(query: { busca?: string; tipo?: string }): Promise<PontoColeta[]> {
  const params = new URLSearchParams()
  if (query.busca) params.set('busca', query.busca)
  if (query.tipo) params.set('tipo', query.tipo)
  return http.get<PontoColeta[]>(`/pontos?${params.toString()}`)
}

export function buscarPorId(id: string): Promise<PontoColeta> {
  return http.get<PontoColeta>(`/pontos/${id}`)
}

export function criar(ponto: PontoColetaInput): Promise<PontoColeta> {
  return http.post<PontoColeta>('/pontos', ponto)
}

export function atualizar(id: string, ponto: PontoColetaInput): Promise<PontoColeta> {
  return http.put<PontoColeta>(`/pontos/${id}`, ponto)
}

export function remover(id: string): Promise<void> {
  return http.delete<void>(`/pontos/${id}`)
}

export function getResumo(): Promise<ResumoSistema> {
  return http.get<ResumoSistema>('/resumo')
}
