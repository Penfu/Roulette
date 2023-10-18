<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

import type Roll from "@/models/roll";

import History from "@/components/game/rolls/History.vue";

defineProps<{
  rolls: Roll[];
}>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const md = breakpoints.smaller("md");
</script>

<template>
  <div class="p-2 flex space-x-2">
    <template v-if="rolls.length === 0">
      <div
        v-for="x in md ? 5 : 10"
        :key="x"
        class="flex justify-center items-center text-center h-12 w-12 bg-gray-800 rounded shadow-md animate-pulse"
      ></div>
    </template>
    <template v-else>
      <History
        v-for="roll in md ? rolls.slice(0, 5) : rolls.slice(0, 10)"
        :key="roll.id"
        :roll="roll"
      />
    </template>
  </div>
</template>
