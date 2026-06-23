<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Check } from 'lucide-vue-next'
import type { PontoColetaInput, StatusPontoColeta, TipoDoacao } from '@/types/ponto-coleta'
import { TIPOS_DOACAO, corTipoDoacao } from '@/constants/tipos-doacao'

const props = defineProps<{
  initialData?: Partial<PontoColetaInput>
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PontoColetaInput]
}>()

const nome = ref(props.initialData?.nome ?? '')
const descricao = ref(props.initialData?.descricao ?? '')
const endereco = ref(props.initialData?.endereco ?? '')
const bairro = ref(props.initialData?.bairro ?? '')
const tiposDoacao = ref<TipoDoacao[]>(props.initialData?.tiposDoacao ?? [])
const horarioFuncionamento = ref(props.initialData?.horarioFuncionamento ?? '')
const telefone = ref(props.initialData?.telefone ?? '')
const status = ref<StatusPontoColeta>(props.initialData?.status ?? 'ativo')
const observacoes = ref(props.initialData?.observacoes ?? '')

const errors = ref<Record<string, string>>({})

watch(
  () => props.initialData,
  (data) => {
    if (data) {
      nome.value = data.nome ?? ''
      descricao.value = data.descricao ?? ''
      endereco.value = data.endereco ?? ''
      bairro.value = data.bairro ?? ''
      tiposDoacao.value = data.tiposDoacao ?? []
      horarioFuncionamento.value = data.horarioFuncionamento ?? ''
      telefone.value = data.telefone ?? ''
      status.value = data.status ?? 'ativo'
      observacoes.value = data.observacoes ?? ''
    }
  },
)

function toggleTipo(tipo: TipoDoacao) {
  const index = tiposDoacao.value.indexOf(tipo)
  if (index === -1) {
    tiposDoacao.value.push(tipo)
  } else {
    tiposDoacao.value.splice(index, 1)
  }
}

function validate(): boolean {
  errors.value = {}
  if (!nome.value.trim()) errors.value.nome = 'Nome é obrigatório.'
  if (!endereco.value.trim()) errors.value.endereco = 'Endereço é obrigatório.'
  if (!bairro.value.trim()) errors.value.bairro = 'Bairro é obrigatório.'
  if (tiposDoacao.value.length === 0) errors.value.tiposDoacao = 'Selecione ao menos um tipo de doação.'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    nome: nome.value.trim(),
    descricao: descricao.value.trim(),
    endereco: endereco.value.trim(),
    bairro: bairro.value.trim(),
    cidade: 'Maceio',
    tiposDoacao: tiposDoacao.value,
    horarioFuncionamento: horarioFuncionamento.value.trim(),
    telefone: telefone.value.trim(),
    status: status.value,
    observacoes: observacoes.value.trim(),
  })
}
</script>

<template>
  <form
    class="space-y-6"
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="space-y-2 sm:col-span-2">
        <Label for="nome">Nome *</Label>
        <Input
          id="nome"
          v-model="nome"
          type="text"
          placeholder="Ex: Centro Comunitário Ponta Verde"
          :class="{ 'border-destructive': errors.nome }"
          aria-required="true"
          :aria-invalid="!!errors.nome"
          :aria-describedby="errors.nome ? 'nome-error' : undefined"
        />
        <p
          v-if="errors.nome"
          id="nome-error"
          role="alert"
          class="text-sm text-destructive"
        >
          {{ errors.nome }}
        </p>
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label for="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          v-model="descricao"
          placeholder="Breve descrição do ponto de coleta"
          class="min-h-[80px]"
        />
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label for="endereco">Endereço *</Label>
        <Input
          id="endereco"
          v-model="endereco"
          type="text"
          placeholder="Rua, número e complemento"
          :class="{ 'border-destructive': errors.endereco }"
          aria-required="true"
          :aria-invalid="!!errors.endereco"
          :aria-describedby="errors.endereco ? 'endereco-error' : undefined"
        />
        <p
          v-if="errors.endereco"
          id="endereco-error"
          role="alert"
          class="text-sm text-destructive"
        >
          {{ errors.endereco }}
        </p>
      </div>

      <div class="space-y-2">
        <Label for="bairro">Bairro *</Label>
        <Input
          id="bairro"
          v-model="bairro"
          type="text"
          placeholder="Ex: Ponta Verde"
          :class="{ 'border-destructive': errors.bairro }"
          aria-required="true"
          :aria-invalid="!!errors.bairro"
          :aria-describedby="errors.bairro ? 'bairro-error' : undefined"
        />
        <p
          v-if="errors.bairro"
          id="bairro-error"
          role="alert"
          class="text-sm text-destructive"
        >
          {{ errors.bairro }}
        </p>
      </div>

      <div class="space-y-2">
        <Label for="telefone">Telefone</Label>
        <Input
          id="telefone"
          v-model="telefone"
          type="text"
          placeholder="Ex: (82) 3333-0000"
        />
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label>Tipos de doação *</Label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tipo in TIPOS_DOACAO"
            :key="tipo"
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all min-h-[2.25rem]"
            :class="
              tiposDoacao.includes(tipo)
                ? corTipoDoacao(tipo).bg + ' ' + corTipoDoacao(tipo).text + ' border-transparent shadow-sm'
                : 'bg-background text-muted-foreground hover:bg-muted border-input'
            "
            :aria-pressed="tiposDoacao.includes(tipo)"
            @click="toggleTipo(tipo)"
          >
            <Check
              v-if="tiposDoacao.includes(tipo)"
              class="h-3.5 w-3.5"
              aria-hidden="true"
            />
            {{ tipo }}
          </button>
        </div>
        <p
          v-if="errors.tiposDoacao"
          id="tiposDoacao-error"
          role="alert"
          class="text-sm text-destructive"
        >
          {{ errors.tiposDoacao }}
        </p>
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label for="horario">Horário de funcionamento</Label>
        <Input
          id="horario"
          v-model="horarioFuncionamento"
          type="text"
          placeholder="Ex: Segunda a sexta, das 8h às 17h"
        />
      </div>

      <div class="space-y-2">
        <Label for="status">Status</Label>
        <Select v-model="status">
          <SelectTrigger
            id="status"
            aria-label="Status do ponto"
          >
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ativo">
              Ativo
            </SelectItem>
            <SelectItem value="inativo">
              Inativo
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-2 sm:col-span-2">
        <Label for="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          v-model="observacoes"
          placeholder="Informações complementares sobre o ponto"
          class="min-h-[80px]"
        />
      </div>
    </div>

    <div class="pt-2">
      <Button
        type="submit"
        :disabled="loading"
        class="w-full sm:w-auto"
      >
        {{ loading ? 'Salvando...' : 'Salvar ponto' }}
      </Button>
    </div>
  </form>
</template>
