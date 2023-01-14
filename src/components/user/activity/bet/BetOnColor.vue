<script setup lang="ts">
import Color from "@/enums/color";

const props = defineProps<{
  color: string,
  value: number,
}>();
</script>

<template>
  <div class="flex lg:flex-col items-center gap-2">
    <div class="p-6 rounded shadow-md" :class="{
      'bg-red-500 shadow-red-300': color === Color.RED,
      'bg-gray-900 shadow-gray-500': color === Color.BLACK,
      'bg-green-500 shadow-green-300': color === Color.GREEN,
    }">
  </div>

  <span class="text-xl font-semibold">{{ value }}</span>
</div>
</template>
