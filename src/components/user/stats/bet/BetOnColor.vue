<script setup lang="ts">
import { computed } from "vue";

import Color from "@/enums/color";
import { useNumberHelper } from "@/helpers/number";

const props = defineProps<{
  color: string;
  win: number;
  count: number;
}>();

const { pourcent } = useNumberHelper();

const winrate = computed(() => pourcent(props.win, props.count));
</script>

<template>
  <div class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
    <div
      class="p-8 rounded shadow-md"
      :class="{
        'bg-red-500 shadow-red-300': color === Color.RED,
        'bg-gray-900 shadow-gray-500': color === Color.BLACK,
        'bg-green-500 shadow-green-300': color === Color.GREEN,
      }"
    ></div>
    <div v-if="win">
      <div class="space-x-1 text-xl">
        <span class="font-bold">{{ winrate }}%</span>
        <span class="text-gray-800">wins</span>
      </div>
      <div class="space-x-1 text-xl">
        <span class="font-bold">{{ count }}</span>
        <span class="text-gray-800">{{ count > 1 ? "bets" : "bet" }}</span>
      </div>
    </div>
    <div v-else class="space-y-4 animate-pulse">
      <div class="h-4 w-52 bg-gray-400 rounded"></div>
      <div class="h-4 w-52 bg-gray-400 rounded"></div>
    </div>
  </div>
</template>
