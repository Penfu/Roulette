<script setup lang="ts">
import { computed, ref } from "vue";

import type Bet from "@/models/bet";
import type Roll from "@/models/roll";
import Color from "@/enums/color";
import Result from "@/enums/result";

import CrossIcon from "@/components/icons/CrossIcon.vue";

const props = defineProps<{
  timer: number;
  bets: {
    red: Bet;
    black: Bet;
    green: Bet;
  };
  roll: Roll;
}>();

const wins = computed(() => {
  const { red, black, green } = props.bets;

  switch (props.roll.color) {
    case Color.RED:
      return red;
    case Color.BLACK:
      return black;
    case Color.GREEN:
      return green;
  }
});

const losses = computed(() => {
  const { red, black, green } = props.bets;

  switch (props.roll.color) {
    case Color.RED:
      return [black, green];
    case Color.BLACK:
      return [red, green];
    case Color.GREEN:
      return [red, black];
  }
});

const winsAmount = computed(() => {
 return wins ? wins.value?.color === Color.GREEN ? wins.value?.amount * 13 : wins.value?.amount : 0;
});
const lossesAmount = computed(() => {
  if (!losses?.value) return 0;
  return losses.value.reduce((acc, curr) => {
    return curr !== null ? acc + curr.amount : acc
  }, 0);
});

const totalAmount = computed(() => (winsAmount?.value || 0) - (lossesAmount?.value || 0));

const result = computed(() => {
  if (totalAmount?.value === 0) return Result.EQUAL;
  else if (totalAmount?.value > 0) return Result.WIN;
  else if (totalAmount?.value < 0) return Result.LOSE;
});

const active = ref(true);

console.log("WIN BET: ", wins?.value);
console.log("WIN AMOUNT: ", winsAmount?.value);

console.log("LOSS BETS: ", losses?.value);
console.log("LOSS AMOUNT: ", lossesAmount?.value);

console.log("TOTAL AMOUNT: ", totalAmount?.value);
</script>

<template>
  <div v-show="active"
    class="px-4 py-2 h-auto space-y-4 bg-white rounded-lg shadow shadow-gray-300">
    <div class="flex">
      <div class="grow text-2xl">
        <span v-if="result == Result.EQUAL">😐 No wins no losses &nbsp</span>
        <div v-else>
          <span v-if="result == Result.WIN">😁 Congratulations you won &nbsp</span>
          <span v-else-if="result == Result.LOSE">😥 No luck you lost &nbsp</span>
          <span class="font-bold">{{ totalAmount }}&nbsp</span>
          <span>coins on this roll</span>
        </div>
      </div>
      <button @click="active = false" class="p-1 bg-gray-200 hover:bg-gray-300 rounded">
        <CrossIcon />
      </button>
    </div>

    <div class="h-5 bg-gray-300 rounded shadow-md shadow-gray-300">
      <div
        class="h-full bg-gray-800 rounded transition-width duration-500"
        :style="{ width: 100 - (timer / 5000) * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>
