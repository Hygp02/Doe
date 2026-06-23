import type { TipoDoacao } from '@/types/ponto-coleta'

export interface OpcaoTipoDoacao {
  value: string
  label: string
}

export const TIPOS_DOACAO: TipoDoacao[] = [
  'alimentos',
  'roupas',
  'higiene',
  'brinquedos',
  'livros',
  'moveis',
]

export const OPCOES_TIPOS_DOACAO: OpcaoTipoDoacao[] = [
  { value: '', label: 'Todos os tipos' },
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'higiene', label: 'Higiene' },
  { value: 'brinquedos', label: 'Brinquedos' },
  { value: 'livros', label: 'Livros' },
  { value: 'moveis', label: 'Móveis' },
]

export function rotuloTipoDoacao(tipo: TipoDoacao): string {
  const opcao = OPCOES_TIPOS_DOACAO.find((o) => o.value === tipo)
  return opcao?.label ?? tipo
}

export function corTipoDoacao(tipo: TipoDoacao): { bg: string; text: string } {
  const map: Record<TipoDoacao, { bg: string; text: string }> = {
    alimentos: { bg: 'bg-orange-100', text: 'text-orange-800' },
    roupas: { bg: 'bg-blue-100', text: 'text-blue-800' },
    higiene: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
    brinquedos: { bg: 'bg-pink-100', text: 'text-pink-800' },
    livros: { bg: 'bg-amber-100', text: 'text-amber-800' },
    moveis: { bg: 'bg-stone-100', text: 'text-stone-800' },
  }
  return map[tipo] ?? { bg: 'bg-secondary', text: 'text-secondary-foreground' }
}
