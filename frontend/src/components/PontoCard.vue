<script setup lang="ts">
import { MapPin, Clock } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { PontoColeta } from '@/types/ponto-coleta'
import { corTipoDoacao } from '@/constants/tipos-doacao'

defineProps<{
  ponto: PontoColeta
}>()
</script>

<template>
  <RouterLink
    :to="`/pontos/${ponto.id}`"
    class="group flex flex-col h-full rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
  >
    <Card class="flex flex-col h-full border-0 shadow-none">
      <CardHeader class="pb-2">
        <h3 class="font-semibold text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
          {{ ponto.nome }}
        </h3>
      </CardHeader>
      <CardContent class="flex-1 flex flex-col gap-3 pt-0">
        <div class="flex flex-wrap gap-1.5">
          <Badge
            v-for="tipo in ponto.tiposDoacao"
            :key="tipo"
            data-testid="tipo-badge"
            variant="secondary"
            class="text-xs font-medium"
            :class="corTipoDoacao(tipo).bg + ' ' + corTipoDoacao(tipo).text + ' hover:' + corTipoDoacao(tipo).bg"
          >
            {{ tipo }}
          </Badge>
        </div>
        <div class="mt-auto space-y-1.5 text-sm text-muted-foreground">
          <p class="flex items-center gap-1.5">
            <MapPin
              class="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span class="truncate">{{ ponto.bairro }}</span>
          </p>
          <p
            v-if="ponto.horarioFuncionamento"
            class="flex items-center gap-1.5"
          >
            <Clock
              class="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span class="truncate">{{ ponto.horarioFuncionamento }}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  </RouterLink>
</template>
