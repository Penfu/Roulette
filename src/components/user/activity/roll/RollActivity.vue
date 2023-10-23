<script setup lang="ts">
import { computed } from "vue";


import { useRoll } from "@/composables/useRoll";

import { Color } from "@/enums/color";
import type Bet from "@/interfaces/bet";

import { useNumberHelper } from "@/helpers/number";

import BetsOnColor from "@/components/user/activity/bet/BetsOnColor.vue";

const props = defineProps<{
  bet: Bet;
}>();

const { percent } = useNumberHelper();
const { roll, fetchRollFromBet } = useRoll();

const winrate = computed(() => percent(roll.value!.win, roll.value!.betCount));

await fetchRollFromBet(props.bet.id);
</script>

<template>
  <div class="border-t border-gray-300">
    <div v-if="roll" class="mx-6 lg:mx-0 my-2 lg:h-48 flex flex-col lg:flex-row gap-2">
      <!-- Colors -->
      <div class="py-2 xs:py-4 sm:py-6 basis-1/3 flex justify-center items-center gap-2">
        <BetsOnColor :count="roll.redBetCount" :color="Color.RED" :color-win="roll.color"  />
        <BetsOnColor :count="roll.blackBetCount" :color="Color.BLACK" :color-win="roll.color"  />
        <BetsOnColor :count="roll.greenBetCount" :color="Color.GREEN" :color-win="roll.color"  />
      </div>

      <!-- Count -->
      <div class="py-2 xs:py-4 sm:py-6 basis-1/3 flex flex-col border-y lg:border-y-0 lg:border-x border-gray-300 justify-center items-center space-y-2">
        <span class="text-4xl font-bold">{{ winrate }}%</span>
        <div class="w-56 h-20 flex flex-col">
          <span class="text-xl font-bold text-gray-700">Bet on the right color</span>
          <span>
            With a total of
            <strong>{{ roll.betCount }}</strong> {{ roll.betCount > 1 ? "bets" : "bet" }}
            on this roll.
          </span>
        </div>
      </div>

      <!-- Amount -->
      <div class="py-2 xs:py-4 sm:py-6 basis-1/3 flex flex-col justify-center items-center space-y-2">
        <span class="text-4xl font-bold">{{ roll.amount }}</span>
        <span class="text-xl font-bold text-gray-700">Coins was bet</span>
      </div>
    </div>
  </div>
</template>
