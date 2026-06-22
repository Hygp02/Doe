import * as repository from './pontos.repository.js'
import type { PontoColeta, ResumoSistema } from '../types/ponto-coleta.js'

export function listarAtivos(): PontoColeta[] {
  return repository.findAll(false)
}

export function getResumo(): ResumoSistema {
  const ativos = repository.findAll(false)
  const tiposSet = new Set<string>()
  for (const ponto of ativos) {
    for (const tipo of ponto.tiposDoacao) {
      tiposSet.add(tipo)
    }
  }
  return {
    totalPontosAtivos: ativos.length,
    totalTiposDoacao: tiposSet.size,
    tiposDisponiveis: [...tiposSet] as ResumoSistema['tiposDisponiveis'],
  }
}

export { repository }
