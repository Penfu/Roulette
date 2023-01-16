<script setup lang="ts">
import Color from "@/enums/color";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

const props = defineProps<{
  count: number,
  color: string,
  colorWin: string,
}>();
</script>

<template>
  <div class="h-full flex items-center">
    <div class="h-28 flex lg:flex-col items-center justify-end gap-2">
      <ChevronDownIcon v-show="color === colorWin" />
      <div class="p-6 rounded shadow-md" :class="{
        'bg-red-500 shadow-red-300': color === Color.RED,
        'bg-gray-900 shadow-gray-500': color === Color.BLACK,
        'bg-green-500 shadow-green-300': color === Color.GREEN,
      }">
      </div>
      <span class="text-xl font-semibold">{{ count }}</span>
    </div>
  </div>
</template>
