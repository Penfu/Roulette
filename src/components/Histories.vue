<script lang="ts">
import History from "../components/History.vue";

export default {
  components: {
    History,
  },
  props: {
    histories: {
      type: Array as () => Array<{ color: string; value: number }>,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="histories.length == 0" class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <div v-for="x in 10" :key="x"
      class="flex justify-center items-center text-center h-12 w-12 bg-gray-800 rounded shadow animate-pulse"></div>
  </div>
  <div v-else class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <History v-for="(history, index) in histories" :key="index" :color="history.color" :value="history.value" />
  </div>
</template>
