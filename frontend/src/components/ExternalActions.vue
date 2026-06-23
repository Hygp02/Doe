<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Copy, MapPin, Phone } from 'lucide-vue-next'
import type { PontoColeta } from '@/types/ponto-coleta'
import { copyToClipboard } from '@/lib/clipboard'
import { buildMapUrl } from '@/lib/maps'

const props = defineProps<{
  ponto: PontoColeta
}>()

const enderecoCompleto = computed(() => {
  return `${props.ponto.endereco}, ${props.ponto.bairro}, ${props.ponto.cidade}`
})

const telefoneHref = computed(() => {
  if (!props.ponto.telefone) return undefined
  const numero = props.ponto.telefone.replace(/\D/g, '')
  return numero ? `tel:${numero}` : undefined
})

async function handleCopyAddress(event: MouseEvent) {
  const button = event.currentTarget as HTMLButtonElement
  const ok = await copyToClipboard(enderecoCompleto.value)
  if (ok && button) {
    button.classList.add('text-green-600')
    setTimeout(() => button.classList.remove('text-green-600'), 1500)
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Button
      variant="outline"
      size="sm"
      class="gap-2"
      @click="handleCopyAddress"
    >
      <Copy
        class="h-4 w-4"
        aria-hidden="true"
      />
      Copiar endereço
    </Button>

    <Button
      v-if="telefoneHref"
      variant="outline"
      size="sm"
      class="gap-2"
      as="a"
      :href="telefoneHref"
    >
      <Phone
        class="h-4 w-4"
        aria-hidden="true"
      />
      Ligar
    </Button>

    <Button
      variant="default"
      size="sm"
      class="gap-2"
      as="a"
      :href="buildMapUrl(enderecoCompleto)"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MapPin
        class="h-4 w-4"
        aria-hidden="true"
      />
      Ver no mapa
    </Button>
  </div>
</template>
