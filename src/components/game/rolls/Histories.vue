<script setup lang="ts">
import type Roll from "@/models/roll";

import History from "@/components/game/rolls/History.vue";

defineProps<{
  rolls: Roll[];
}>();
</script>

<template>
  <div v-if="rolls.length === 0" class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <div
      v-for="x in 10"
      :key="x"
      class="flex justify-center items-center text-center h-12 w-12 bg-gray-800 rounded shadow-md animate-pulse"
    ></div>
  </div>
  <TransitionGroup
    v-else
    tag="div"
    move-class="transition-all duration-500 ease-in-out"
    enter-active-class="transition-all duration-500 ease-in-out"
    leave-active-class="transition-all duration-500 ease-in-out absolute"
    enter-from-class="opacity-0 -translate-x-4"
    leave-to-class="opacity-0 -translate-x-4"
    class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2"
  >
    <History
      v-for="roll in rolls"
      :key="roll.id"
      :roll="roll"
    />
  </TransitionGroup>
</template>
