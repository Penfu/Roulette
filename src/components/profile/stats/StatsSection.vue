<script setup lang="ts">
import { computed } from "vue";

import { useNumberHelper } from "@/helpers/number";

import type Stats from "@/interfaces/stats";

import BetStatsOnColor from "@/components/profile/stats/BetOnColor.vue";

const props = defineProps<{
  stats?: Stats;
}>();

const { percent } = useNumberHelper();

const hasBets = computed(() => props.stats?.bet.count && props.stats?.bet.count > 0);
const betWinrate = computed(() =>
  percent(props.stats?.won.count, props.stats?.bet.count)
);
const betAverage = computed(() =>
  percent(props.stats?.bet.amount, props.stats?.bet.count)
);
</script>

<template>
  <div class="space-y-4">
      <h2 class="text-3xl font-bold">Stats</h2>

      <!-- Global Stats -->
      <div v-if="stats" class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <!-- Bet count -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-gray rounded-lg shadow shadow-gray-300"
        >
          <span class="text-2xl md:text-3xl font-bold">{{ stats.bet.count }}</span>
          <span class="text-lg md:text-xl text-gray-700">Bets</span>
        </div>
        <!-- Winrate -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-gray rounded-lg shadow shadow-gray-300"
        >
          <span v-if="hasBets" class="text-2xl md:text-3xl font-bold">{{ betWinrate }}%</span>
          <span v-else class="text-2xl md:text-3xl font-bold">0</span>

          <span class="text-lg md:text-xl text-gray-700">Wins</span>
        </div>
        <!-- Average bet -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-gray rounded-lg shadow shadow-gray-300"
        >
          <span v-if="hasBets" class="text-2xl md:text-3xl font-bold">{{ betAverage }}</span>
          <span v-else class="text-3xl font-bold">0</span>

          <span class="text-lg md:text-xl text-gray-700">Average coins bet</span>
        </div>
      </div>

      <!-- Global Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <div
          v-for="x in 3"
          :key="x"
          class="w-full py-4 flex flex-col justify-center items-center space-y-4 bg-gray rounded-lg shadow shadow-gray-300"
        >
          <div class="h-6 w-52 bg-skeleton rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-skeleton rounded animate-pulse"></div>
        </div>
      </div>

      <!-- Bets Stats -->
      <div v-if="stats" class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <BetStatsOnColor
          color="red"
          :win="stats.red.won.count ?? 0"
          :count="stats.red.bet.count ?? 0"
        />
        <BetStatsOnColor
          color="black"
          :win="stats.black.won.count ?? 0"
          :count="stats.black.bet.count ?? 0"
        />
        <BetStatsOnColor
          color="green"
          :win="stats.green.won.count ?? 0"
          :count="stats.green.bet.count ?? 0"
        />
      </div>
      <!-- Bets Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
        <div
          v-for="x in 3"
          :key="x"
          class="p-2 w-full flex items-center space-x-8 bg-gray rounded-lg shadow shadow-gray-300"
        >
          <div class="p-8 bg-skeleton rounded shadow animate-pulse"></div>
          <div class="w-full text-xl space-y-2">
            <div class="h-4 w-2/3 bg-skeleton rounded animate-pulse"></div>
            <div class="h-4 w-2/3 bg-skeleton rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
</template>
