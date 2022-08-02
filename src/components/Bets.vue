<script lang="ts">
import Bet from "../components/Bet.vue";

export default {
  components: {
    Bet,
  },
  emits: ["add-bet"],
  props: {
    color: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    bets : {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      bet: Bet,
    };
  },
};
</script>

<template>
  <div class="basis-1/3 flex flex-col space-y-4">
    <button @click="$emit('add-bet', color)" class="py-4 font-semibold rounded shadow" :class="{
      'bg-red-500 hover:bg-red-600 shadow-red-300': color == 'red',
      'bg-green-500 hover:bg-green-600 shadow-green-300': color == 'green',
      'bg-gray-900 hover:bg-black shadow-gray-500': color == 'black',
    }">
      x {{ value}}
    </button>
    <div
      class="p-2 h-64 overflow-y-hidden space-y-2 bg-gray-100 text-left text-xl text-gray-800 rounded shadow shadow-gray-300">
      <Bet v-for="(bet, index) in bets" :key="index" :name="bet.user" :value="bet.value" />
    </div>
  </div>
</template>
