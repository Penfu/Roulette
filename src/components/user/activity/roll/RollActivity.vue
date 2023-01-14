<script setup lang="ts">
import Color from "@/enums/color";

import BetOnColor from "@/components/user/activity/bet/BetOnColor.vue";
import { computed } from "vue";
import type Bet from "@/models/bet";

const props = defineProps<{
  bet: Bet;
}>();

const roll = await props.bet.roll();

const winrate = computed(() => (roll?.win / roll?.betCount * 100).toFixed(2));
</script>

<template>
  <div class="py-6 mx-6 border-t border-gray-300">
    <div class="my-2 h-48 grid grid-cols-3 gap-4">
      <!-- Colors -->
      <div class="flex flex-col lg:flex-row justify-center items-center gap-2">
        <BetOnColor :color="Color.RED" :value="roll.redBetCount" :max="roll.betCount" />
        <BetOnColor :color="Color.BLACK" :value="roll.blackBetCount" :max="roll.betCount" />
        <BetOnColor :color="Color.GREEN" :value="roll.greenBetCount" :max="roll.betCount" />
      </div>

      <!-- Count -->
      <div class="flex flex-col border-x border-gray-300 justify-center items-center space-y-2">
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
      <div class="flex flex-col justify-center items-center space-y-2">
        <span class="text-4xl font-bold">{{ roll.amount }}</span>
        <div class="h-20">
          <span class="text-xl font-bold text-gray-700">Coins was bet</span>
        </div>
      </div>
    </div>
  </div>
</template>
