<script setup lang="ts">
import { storeToRefs } from "pinia";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import { useGameStore } from "@/stores/game";

import HistoryCard from "@/components/game/rolls/HistoryCard.vue";

const game = useGameStore();
const { history } = storeToRefs(game);

const breakpoints = useBreakpoints(breakpointsTailwind);
const md = breakpoints.smaller("md");
</script>

<template>
  <div class="p-2 flex space-x-2">
    <template v-if="!history">
      <div
        v-for="x in md ? 5 : 10"
        :key="x"
        class="flex justify-center items-center text-center h-12 w-12 bg-black rounded shadow animate-pulse"
      />
    </template>
    <template v-else>
      <HistoryCard
        v-for="roll in md ? history.slice(0, 5) : history.slice(0, 10)"
        :key="roll.id"
        :roll="roll"
      />
    </template>
  </div>
</template>
