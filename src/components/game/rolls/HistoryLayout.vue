<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { useGameStore } from '@/stores/game';

import HistoryCard from '@/components/game/rolls/HistoryCard.vue';

const game = useGameStore();
const { history } = storeToRefs(game);

const breakpoints = useBreakpoints(breakpointsTailwind);
const md = breakpoints.smaller('md');
</script>

<template>
  <div class="p-2 flex gap-2">
    <template v-if="history">
      <HistoryCard v-for="roll in history.slice(0, md ? 5 : 10)" :key="roll.id" :roll="roll" />
    </template>
    <template v-else>
      <!-- Skeleton -->
      <span
        v-for="x in md ? 5 : 10"
        :key="x"
        class="w-10 sm:w-12 h-10 sm:h-12 flex justify-center items-center text-center bg-skeleton rounded shadow animate-pulse"
      />
    </template>
  </div>
</template>
