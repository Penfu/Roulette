<script lang="ts">
import History from "../components/History.vue";

export default {
  components: {
    History,
  },
  props: {
    histories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="p-2 grid grid-flow-col grid-rows-2 lg:grid-rows-1 gap-2">
    <History v-for="(history, index) in histories" :key="index" :color="history.color" :value="history.value" />
  </div>
</template>
