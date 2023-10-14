<script setup lang="ts">
import getClassFromColor from "@/helpers/color";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

defineProps<{
  count: number,
  color: string,
  colorWin: string,
}>();
</script>

<template>
  <div class="h-full flex items-center">
    <div class="h-28 flex flex-col items-center justify-end gap-2">
      <ChevronDownIcon v-show="color === colorWin" />

      <div class="p-6 rounded shadow-md" :class="getClassFromColor(color)" />
      <span class="text-xl font-semibold">{{ count }}</span>
    </div>
  </div>
</template>
