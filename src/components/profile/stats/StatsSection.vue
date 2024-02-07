<script setup lang="ts">
import { computed } from "vue";

import { useNumberHelper } from "@/helpers/number";

import type Stats from "@/interfaces/stats";

import BetCard from "@/components/profile/stats/BetCard.vue";
import BetCardSkeleton from "@/components/profile/stats/BetCardSkeleton.vue";
import BetColorCard from "@/components/profile/stats/BetColorCard.vue";
import BetColorCardSkeleton from "@/components/profile/stats/BetColorCardSkeleton.vue";

const props = defineProps<{
  stats?: Stats;
}>();

const { percent } = useNumberHelper();

const hasBets = computed(() => props.stats?.bet.count && props.stats?.bet.count > 0);
const betWinrate = computed(() => percent(props.stats?.won.count, props.stats?.bet.count));
const betAverage = computed(() => percent(props.stats?.bet.amount, props.stats?.bet.count));
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-3xl font-bold">Stats</h2>

    <div class="space-y-4">
      <!-- Global Stats -->
      <div v-if="stats" class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <BetCard :stats="stats.bet.count" label="Bets" />
        <BetCard :stats="hasBets ? `${betWinrate}%` : 0" label="Wins" />
        <BetCard :stats="hasBets ? betAverage : 0" label="Average coins bet" />
      </div>
      <!-- Global Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <BetCardSkeleton v-for="x in 3" :key="x" />
      </div>

      <!-- Bets Stats -->
      <div v-if="stats" class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <BetColorCard color="red" :win="stats.red.won.count" :count="stats.red.bet.count" />
        <BetColorCard color="black" :win="stats.black.won.count" :count="stats.black.bet.count" />
        <BetColorCard color="green" :win="stats.green.won.count" :count="stats.green.bet.count" />
      </div>
      <!-- Bets Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row gap-2 lg:gap-4">
        <BetColorCardSkeleton v-for="x in 3" :key="x" />
      </div>
    </div>
  </section>
</template>
