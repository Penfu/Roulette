<script setup lang="ts">
import { computed } from "vue";

import Color from "@/enums/color";
import type Bet from "@/models/bet";
import { useNumberHelper } from "@/helpers/number";

import BetOnColor from "@/components/user/activity/bet/BetOnColor.vue";

const props = defineProps<{
  bet: Bet;
}>();

const { pourcent } = useNumberHelper();

const roll = await props.bet.roll();
const winrate = computed(() =>  pourcent(roll?.win, roll?.betCount));
</script>

<template>
  <div class="border-t border-gray-300">
    <div class="mx-6 lg:mx-0 my-2 lg:h-48 flex flex-col lg:flex-row gap-4">
      <!-- Colors -->
      <div class="py-6 basis-1/3 flex justify-center items-center gap-2">
        <BetOnColor :count="roll.redBetCount" :color="Color.RED" :color-win="roll.color"  />
        <BetOnColor :count="roll.blackBetCount" :color="Color.BLACK" :color-win="roll.color"  />
        <BetOnColor :count="roll.greenBetCount" :color="Color.GREEN" :color-win="roll.color"  />
      </div>

      <!-- Count -->
      <div class="py-6 basis-1/3 flex flex-col border-y lg:border-y-0 lg:border-x border-gray-300 justify-center items-center space-y-2">
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
      <div class="py-6 basis-1/3 flex flex-col justify-center items-center space-y-2">
        <span class="text-4xl font-bold">{{ roll.amount }}</span>
        <div class="h-20">
          <span class="text-xl font-bold text-gray-700">Coins was bet</span>
        </div>
      </div>
    </div>
  </div>
</template>
