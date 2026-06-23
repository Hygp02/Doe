<script setup lang="ts">
import { Heart, MapPin } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t bg-muted/30 mt-auto">
    <div class="container mx-auto px-4 py-8 sm:py-10">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-primary">
          <MapPin
            class="h-5 w-5"
            aria-hidden="true"
          />
          <span class="font-semibold">Mapa Solidário Maceió</span>
        </div>
        <p class="text-sm text-muted-foreground text-center sm:text-right">
          Feito com
          <Heart
            class="inline h-4 w-4 text-destructive mx-0.5"
            aria-hidden="true"
          />
          para Maceió.
        </p>
      </div>
      <div class="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
        Protótipo acadêmico. Dados fictícios e sem persistência real.
      </div>
    </div>
  </footer>
</template>
