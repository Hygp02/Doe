<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-vue-next'
import { buscarPorId, criar, atualizar } from '@/services/pontos.service'
import type { PontoColeta, PontoColetaInput } from '@/types/ponto-coleta'
import PontoForm from '@/components/PontoForm.vue'
import AppLoading from '@/components/AppLoading.vue'
import AppError from '@/components/AppError.vue'
import AppFeedback from '@/components/AppFeedback.vue'
import PageHeader from '@/components/PageHeader.vue'

const route = useRoute()
const router = useRouter()

const isEditing = computed(() => !!route.params.id)
const pageTitle = computed(() => (isEditing.value ? 'Editar ponto de coleta' : 'Novo ponto de coleta'))

const ponto = ref<PontoColeta | null>(null)
const pageLoading = ref(false)
const formLoading = ref(false)
const error = ref<string | null>(null)
const feedback = ref<{ type: 'success' | 'error'; message: string } | null>(null)

async function carregar() {
  if (!isEditing.value) return
  pageLoading.value = true
  error.value = null
  try {
    ponto.value = await buscarPorId(route.params.id as string)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erro ao carregar ponto.'
  } finally {
    pageLoading.value = false
  }
}

onMounted(() => {
  carregar()
})

async function handleSubmit(data: PontoColetaInput) {
  formLoading.value = true
  feedback.value = null
  try {
    if (isEditing.value) {
      await atualizar(route.params.id as string, data)
      feedback.value = { type: 'success', message: 'Ponto atualizado com sucesso.' }
    } else {
      await criar(data)
      feedback.value = { type: 'success', message: 'Ponto criado com sucesso.' }
      setTimeout(() => {
        router.push('/admin')
      }, 1000)
    }
  } catch (e) {
    feedback.value = {
      type: 'error',
      message: e instanceof Error ? e.message : 'Erro ao salvar ponto.',
    }
  } finally {
    formLoading.value = false
  }
}

function voltar() {
  router.push('/admin')
}
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <Button
      variant="ghost"
      class="px-0 gap-2"
      @click="voltar"
    >
      <ArrowLeft
        class="h-4 w-4"
        aria-hidden="true"
      />
      Voltar
    </Button>

    <PageHeader :title="pageTitle" />

    <AppLoading
      v-if="pageLoading"
      message="Carregando..."
    />

    <AppError
      v-else-if="error"
      :message="error"
      @retry="carregar"
    />

    <section
      v-else
      class="rounded-xl border bg-card p-5 sm:p-6 shadow-sm"
    >
      <AppFeedback
        v-if="feedback"
        :type="feedback.type"
        :message="feedback.message"
        class="mb-5"
      />

      <PontoForm
        :initial-data="ponto ?? undefined"
        :loading="formLoading"
        @submit="handleSubmit"
      />
    </section>
  </div>
</template>
