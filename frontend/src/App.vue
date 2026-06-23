<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { MapPin, Menu, X, User } from 'lucide-vue-next'
import AppFooter from '@/components/AppFooter.vue'

const menuOpen = ref(false)
const route = useRoute()

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
    >
      Pular para o conteúdo principal
    </a>

    <header class="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-20">
      <nav class="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-lg font-bold text-primary hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <MapPin
            class="h-5 w-5"
            aria-hidden="true"
          />
          Mapa Solidário Maceió
        </RouterLink>

        <Button
          variant="ghost"
          size="icon"
          class="sm:hidden"
          :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >
          <Menu
            v-if="!menuOpen"
            class="h-5 w-5"
            aria-hidden="true"
          />
          <X
            v-else
            class="h-5 w-5"
            aria-hidden="true"
          />
        </Button>

        <div
          class="w-full sm:w-auto flex-col sm:flex-row items-start sm:items-center gap-2 text-sm"
          :class="[menuOpen ? 'flex' : 'hidden sm:flex']"
        >
          <RouterLink
            to="/pontos"
            class="block px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :class="isActive('/pontos') ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
            @click="menuOpen = false"
          >
            Pontos de Coleta
          </RouterLink>
          <Button
            variant="outline"
            size="sm"
            class="gap-2 w-full sm:w-auto"
            disabled
          >
            <User
              class="h-4 w-4"
              aria-hidden="true"
            />
            Entrar
          </Button>
        </div>
      </nav>
    </header>
    <main
      id="conteudo-principal"
      class="container mx-auto px-4 py-8 sm:py-10 flex-1"
      tabindex="-1"
    >
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
