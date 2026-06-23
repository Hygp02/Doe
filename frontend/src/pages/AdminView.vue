<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-vue-next'
import { listarTodos, remover } from '@/services/pontos.service'
import type { PontoColeta } from '@/types/ponto-coleta'
import AppLoading from '@/components/AppLoading.vue'
import AppError from '@/components/AppError.vue'
import AppFeedback from '@/components/AppFeedback.vue'
import PageHeader from '@/components/PageHeader.vue'

const router = useRouter()

const pontos = ref<PontoColeta[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const deleting = ref<string | null>(null)
const pontoParaRemover = ref<PontoColeta | null>(null)
const dialogOpen = ref(false)
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)

async function carregar() {
  loading.value = true
  error.value = null
  try {
    pontos.value = await listarTodos()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erro ao carregar pontos.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  carregar()
})

function abrirConfirmacao(ponto: PontoColeta) {
  pontoParaRemover.value = ponto
  dialogOpen.value = true
}

async function confirmarRemocao() {
  if (!pontoParaRemover.value) return
  const id = pontoParaRemover.value.id
  deleting.value = id
  try {
    await remover(id)
    pontos.value = pontos.value.filter((p) => p.id !== id)
    feedback.value = {
      type: 'success',
      message: `${pontoParaRemover.value.nome} foi removido com sucesso.`,
    }
  } catch (e) {
    feedback.value = {
      type: 'error',
      message: e instanceof Error ? e.message : 'Erro ao remover ponto.',
    }
  } finally {
    deleting.value = null
    pontoParaRemover.value = null
    dialogOpen.value = false
  }
}

function navigateToCreate() {
  router.push('/admin/novo')
}

function navigateToEdit(id: string) {
  router.push(`/admin/editar/${id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <PageHeader
        title="Administração"
        description="Gerencie os pontos de coleta de forma simulada."
      />
      <Button
        class="gap-2 shrink-0"
        @click="navigateToCreate"
      >
        <Plus
          class="h-4 w-4"
          aria-hidden="true"
        />
        Novo ponto
      </Button>
    </div>

    <div
      class="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-800"
      role="status"
    >
      <div class="flex items-start gap-3">
        <AlertTriangle
          class="h-5 w-5 mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <p>
          <strong>Atenção:</strong> Os dados são mockados e alterações serão perdidas ao reiniciar o servidor.
        </p>
      </div>
    </div>

    <AppFeedback
      v-if="feedback"
      :type="feedback.type"
      :message="feedback.message"
    />

    <AppLoading
      v-if="loading"
      message="Carregando pontos..."
    />

    <AppError
      v-else-if="error"
      :message="error"
      @retry="carregar"
    />

    <section v-else>
      <div class="hidden md:block rounded-xl border overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b bg-muted/50">
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-medium"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-medium"
                >
                  Bairro
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-medium"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-medium"
                >
                  Tipos
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-right font-medium"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ponto in pontos"
                :key="ponto.id"
                class="border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <td class="px-4 py-3 font-medium">
                  {{ ponto.nome }}
                </td>
                <td class="px-4 py-3 text-muted-foreground">
                  {{ ponto.bairro }}
                </td>
                <td class="px-4 py-3">
                  <Badge
                    :variant="ponto.status === 'ativo' ? 'default' : 'secondary'"
                    class="text-xs"
                  >
                    {{ ponto.status === 'ativo' ? 'Ativo' : 'Inativo' }}
                  </Badge>
                </td>
                <td class="px-4 py-3 text-muted-foreground">
                  {{ ponto.tiposDoacao.join(', ') }}
                </td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      class="gap-1.5"
                      :aria-label="`Editar ${ponto.nome}`"
                      @click="navigateToEdit(ponto.id)"
                    >
                      <Pencil
                        class="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      class="gap-1.5"
                      :disabled="deleting === ponto.id"
                      :aria-label="`Remover ${ponto.nome}`"
                      @click="abrirConfirmacao(ponto)"
                    >
                      <Trash2
                        class="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {{ deleting === ponto.id ? '...' : 'Remover' }}
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-if="pontos.length === 0"
          class="p-8 text-center text-muted-foreground"
        >
          Nenhum ponto cadastrado.
        </div>
      </div>

      <div class="md:hidden grid gap-4">
        <Card
          v-for="ponto in pontos"
          :key="ponto.id"
          class="shadow-sm"
        >
          <CardHeader class="pb-3">
            <div class="flex items-start justify-between gap-2">
              <CardTitle class="text-base leading-tight">
                {{ ponto.nome }}
              </CardTitle>
              <Badge
                :variant="ponto.status === 'ativo' ? 'default' : 'secondary'"
                class="text-xs"
              >
                {{ ponto.status === 'ativo' ? 'Ativo' : 'Inativo' }}
              </Badge>
            </div>
            <CardDescription>{{ ponto.bairro }}</CardDescription>
          </CardHeader>
          <CardContent class="pb-3 pt-0">
            <p class="text-sm text-muted-foreground">
              <span class="font-medium text-foreground">Tipos:</span>
              {{ ponto.tiposDoacao.join(', ') }}
            </p>
          </CardContent>
          <CardFooter class="flex gap-2 pt-0">
            <Button
              class="flex-1"
              variant="outline"
              size="sm"
              @click="navigateToEdit(ponto.id)"
            >
              <Pencil
                class="h-3.5 w-3.5 mr-1.5"
                aria-hidden="true"
              />
              Editar
            </Button>
            <Button
              class="flex-1"
              variant="destructive"
              size="sm"
              :disabled="deleting === ponto.id"
              @click="abrirConfirmacao(ponto)"
            >
              <Trash2
                class="h-3.5 w-3.5 mr-1.5"
                aria-hidden="true"
              />
              {{ deleting === ponto.id ? '...' : 'Remover' }}
            </Button>
          </CardFooter>
        </Card>
        <div
          v-if="pontos.length === 0"
          class="text-center text-muted-foreground py-8"
        >
          Nenhum ponto cadastrado.
        </div>
      </div>
    </section>

    <Dialog v-model:open="dialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar remoção</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja remover <strong>{{ pontoParaRemover?.nome }}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            @click="dialogOpen = false"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            :disabled="!!deleting"
            @click="confirmarRemocao"
          >
            {{ deleting ? 'Removendo...' : 'Remover' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
