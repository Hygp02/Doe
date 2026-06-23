<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PontoColeta } from '@/types/ponto-coleta'
import { corTipoDoacao } from '@/constants/tipos-doacao'

const props = withDefaults(defineProps<{
  pontos: PontoColeta[]
  highlightId?: string
  interactive?: boolean
  height?: number
}>(), {
  highlightId: undefined,
  interactive: true,
  height: undefined,
})

const emit = defineEmits<{
  select: [id: string]
}>()

const hoveredId = ref<string | null>(null)

// Coordenadas aproximadas para simulação visual dos bairros de Maceió
const posicoes: Record<string, { x: number; y: number }> = {
  'Ponta Verde': { x: 720, y: 320 },
  'Benedito Bentes': { x: 220, y: 420 },
  'Tabuleiro do Martins': { x: 380, y: 260 },
  'Farol': { x: 620, y: 180 },
}

const pontosMapeados = computed(() => {
  return props.pontos
    .filter((p) => p.status === 'ativo')
    .map((ponto) => ({
      ...ponto,
      ...posicoes[ponto.bairro] ?? { x: 500 + Math.random() * 200, y: 250 + Math.random() * 200 },
    }))
})

function handleClick(id: string) {
  if (props.interactive) {
    emit('select', id)
  }
}
</script>

<template>
  <div
    class="relative w-full rounded-2xl overflow-hidden border bg-[#e8f5f0] shadow-inner"
    :class="height ? '' : 'aspect-[4/3] sm:aspect-[16/9]'"
    :style="height ? { height: `${height}px` } : undefined"
  >
    <svg
      viewBox="0 0 1000 600"
      class="w-full h-full"
      role="img"
      aria-label="Mapa simulado de Maceió com pontos de coleta"
      preserveAspectRatio="xMidYMid slice"
    >
      <!-- Água -->
      <path
        d="M0,0 L1000,0 L1000,600 L0,600 Z"
        fill="#e0f2fe"
        opacity="0.5"
      />

      <!-- Silhueta simplificada da área urbana -->
      <path
        d="M150,120 
           C250,80 400,60 550,100 
           C680,135 780,160 850,220 
           C920,280 940,380 880,470 
           C820,560 650,580 500,560 
           C350,540 200,500 120,400 
           C60,320 80,200 150,120 Z"
        fill="#f0fdf4"
        stroke="#86efac"
        stroke-width="2"
      />

      <!-- Bairros estilizados -->
      <g opacity="0.6">
        <ellipse
          cx="720"
          cy="320"
          rx="90"
          ry="70"
          fill="#dcfce7"
        />
        <text
          x="720"
          y="325"
          text-anchor="middle"
          class="text-xs fill-primary/60 font-medium"
        >Ponta Verde</text>

        <ellipse
          cx="220"
          cy="420"
          rx="100"
          ry="80"
          fill="#dcfce7"
        />
        <text
          x="220"
          y="425"
          text-anchor="middle"
          class="text-xs fill-primary/60 font-medium"
        >Benedito Bentes</text>

        <ellipse
          cx="380"
          cy="260"
          rx="85"
          ry="65"
          fill="#dcfce7"
        />
        <text
          x="380"
          y="265"
          text-anchor="middle"
          class="text-xs fill-primary/60 font-medium"
        >Tabuleiro</text>

        <ellipse
          cx="620"
          cy="180"
          rx="75"
          ry="55"
          fill="#dcfce7"
        />
        <text
          x="620"
          y="185"
          text-anchor="middle"
          class="text-xs fill-primary/60 font-medium"
        >Farol</text>
      </g>

      <!-- Vias principais -->
      <g
        stroke="#bbf7d0"
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
      >
        <path d="M180,200 Q400,250 600,180" />
        <path d="M250,150 Q350,300 720,320" />
        <path d="M150,400 Q400,350 850,220" />
      </g>

      <!-- Pins dos pontos -->
      <g
        v-for="ponto in pontosMapeados"
        :key="ponto.id"
      >
        <!-- Anel pulsante -->
        <circle
          :cx="ponto.x"
          :cy="ponto.y"
          r="22"
          :fill="corTipoDoacao(ponto.tiposDoacao[0]).bg.replace('bg-', '').replace('100', '200')"
          class="animate-ping-slow opacity-40"
        />

        <!-- Pin -->
        <g
          class="cursor-pointer transition-transform duration-200"
          :class="interactive ? 'hover:scale-110' : ''"
          @mouseenter="hoveredId = ponto.id"
          @mouseleave="hoveredId = null"
          @click="handleClick(ponto.id)"
        >
          <path
            :d="`M${ponto.x},${ponto.y - 28} 
                   C${ponto.x - 16},${ponto.y - 28} ${ponto.x - 22},${ponto.y - 16} ${ponto.x - 22},${ponto.y - 8}
                   C${ponto.x - 22},${ponto.y + 6} ${ponto.x},${ponto.y + 26} ${ponto.x},${ponto.y + 26}
                   C${ponto.x},${ponto.y + 26} ${ponto.x + 22},${ponto.y + 6} ${ponto.x + 22},${ponto.y - 8}
                   C${ponto.x + 22},${ponto.y - 16} ${ponto.x + 16},${ponto.y - 28} ${ponto.x},${ponto.y - 28} Z`"
            :class="ponto.id === highlightId ? 'fill-primary stroke-primary-foreground' : 'fill-primary stroke-white'"
            stroke-width="3"
          />
          <circle
            :cx="ponto.x"
            :cy="ponto.y - 10"
            r="8"
            fill="white"
          />
          <text
            :x="ponto.x"
            :y="ponto.y - 7"
            text-anchor="middle"
            class="text-[10px] font-bold fill-primary"
          >
            {{ ponto.tiposDoacao.length }}
          </text>
        </g>

        <!-- Tooltip -->
        <g
          v-if="hoveredId === ponto.id"
          class="animate-fade-in"
        >
          <rect
            :x="ponto.x - 80"
            :y="ponto.y - 90"
            width="160"
            height="44"
            rx="8"
            fill="white"
            stroke="#e2e8f0"
            stroke-width="1"
          />
          <text
            :x="ponto.x"
            :y="ponto.y - 68"
            text-anchor="middle"
            class="text-xs font-semibold fill-foreground"
          >
            {{ ponto.nome }}
          </text>
          <text
            :x="ponto.x"
            :y="ponto.y - 54"
            text-anchor="middle"
            class="text-[10px] fill-muted-foreground"
          >
            {{ ponto.bairro }}
          </text>
        </g>
      </g>

      <!-- Legenda -->
      <g transform="translate(20, 20)">
        <rect
          x="0"
          y="0"
          width="160"
          height="72"
          rx="8"
          fill="white"
          stroke="#e2e8f0"
          stroke-width="1"
          opacity="0.95"
        />
        <text
          x="12"
          y="22"
          class="text-xs font-semibold fill-foreground"
        >Mapa simulado</text>
        <circle
          cx="22"
          cy="40"
          r="5"
          fill="hsl(162 76% 28%)"
        />
        <text
          x="34"
          y="44"
          class="text-[10px] fill-muted-foreground"
        >Ponto de coleta</text>
        <circle
          cx="22"
          cy="58"
          r="5"
          fill="#86efac"
        />
        <text
          x="34"
          y="62"
          class="text-[10px] fill-muted-foreground"
        >Área urbana</text>
      </g>
    </svg>
  </div>
</template>
