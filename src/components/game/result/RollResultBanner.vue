<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import { useGameStore } from "@/stores/game";

import { Color } from "@/enums/color";
import { Result } from "@/enums/result";
import type Bet from "@/interfaces/bet";

import CrossIcon from "@/components/icons/CrossIcon.vue";

const props = defineProps<{
  bets: {
    red?: Bet;
    black?: Bet;
    green?: Bet;
  };
}>();
const { red, black, green } = props.bets;

const game = useGameStore();

const initialTimer = game.timer;
const duration = 5000;
const interval = 50;

const progress = ref(0);

let intervalId: number;

onMounted(() => {
  intervalId = setInterval(() => {
    if (initialTimer <= 0 || progress.value >= 100) {
      clearInterval(intervalId);
      return;
    }

    progress.value += duration / (interval * 100);
  }, interval);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const winsAmount = computed(() => {
  if (game.result?.color === Color.RED) {
    return red?.amount ?? 0;
  }

  if (game.result?.color === Color.BLACK) {
    return black?.amount ?? 0;
  }

  if (game.result?.color === Color.GREEN) {
    return green?.amount ?? 0 * 13;
  }
});

const lossesAmount = computed(() => {
  if (game.result?.color === Color.RED) {
    return (black?.amount ?? 0) + (green?.amount ?? 0);
  }

  if (game.result?.color === Color.BLACK) {
    return (red?.amount ?? 0) + (green?.amount ?? 0);
  }

  if (game.result?.color === Color.GREEN) {
    return (red?.amount ?? 0) + (black?.amount ?? 0);
  }
});

const totalAmount = computed(() => (winsAmount?.value || 0) - (lossesAmount?.value || 0));

const result = computed(() => {
  if (totalAmount?.value === 0) return Result.EQUAL;
  else if (totalAmount?.value > 0) return Result.WIN;
  else if (totalAmount?.value < 0) return Result.LOSE;
});

const active = ref(true);
</script>

<template>
  <div
    v-show="active"
    class="px-4 py-2 h-auto space-y-4 bg-white rounded-lg shadow shadow-gray-300"
  >
    <div class="flex">
      <div class="grow text-2xl">
        <span v-if="result == Result.EQUAL">😐 No wins no losses &nbsp</span>
        <div v-else>
          <span v-if="result == Result.WIN">😁 Congratulations you won &nbsp</span>
          <span v-else-if="result == Result.LOSE">😥 No luck you lost &nbsp</span>
          <span class="font-bold">{{ totalAmount }} <span>coins on this roll</span></span>
        </div>
      </div>
      <button @click="active = false" class="p-1 bg-gray-200 hover:bg-gray-300 rounded">
        <CrossIcon />
      </button>
    </div>

    <div class="h-5 bg-gray-300 rounded shadow-md shadow-gray-300">
      <div
        class="h-full bg-gray-800 rounded transition-width duration-75 ease-in-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>
