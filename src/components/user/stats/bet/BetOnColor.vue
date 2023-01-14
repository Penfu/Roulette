<script setup lang="ts">
import { computed } from "vue";
import Color from "@/enums/color";

const props = defineProps<{
  color: string;
  win: number;
  count: number;
}>();

const winrate = computed(() => (props.win / props.count) * 100);
</script>

<template>
  <div class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
    <div class="p-8 rounded" :class="{
      'bg-red-500 shadow-red-300': color === Color.RED,
      'bg-gray-900 shadow-gray-500': color === Color.BLACK,
      'bg-green-500 shadow-green-300': color === Color.GREEN,
    }"></div>
    <div class="flex items-center space-x-4">
      <div class="grow flex flex-col">
        <span class="grow text-xl font-semibold">{{ winrate }}% wins</span>
        <span>{{ count }} {{ count > 1 ? "bets" : "bet" }}</span>
      </div>
    </div>
  </div>
</template>
