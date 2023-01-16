<script setup lang="ts">
import History from "@/components/game/rolls/History.vue";

const props = defineProps<{
  histories: Array<{ color: string; value: number }>;
}>();

</script>

<template>
  <div v-if="histories.length == 0" class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <div v-for="x in 10" :key="x"
      class="flex justify-center items-center text-center h-12 w-12 bg-gray-800 rounded shadow-md animate-pulse"></div>
  </div>
  <div v-else class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <History v-for="(history, index) in histories" :key="index" :color="history.color" :value="history.value" />
  </div>
</template>
