<script setup lang="ts">
import Bet from "../components/Bet.vue";
</script>

<script lang="ts">
export enum Color {
  red = { color: "red", multiplier: 2 },
  green = { color: "green", multiplier: 13 },
  black = { color: "black", multiplier: 2 },
}

export default {
  props: {
    color: Color,
  },
  data() {
    return {
      bets: [] as Bet[],
    };
  },
  methods: {
    displayBet(name: string, amount: number) {
      this.bets.push({ name: name, amount: amount });
    },
  },
  components: {
    Bet,
  },
};
</script>

<template>
  <div class="basis-1/3 flex flex-col space-y-4">
    <button
      @click="$emit('add-bet', this)"
      class="py-4 font-semibold rounded shadow"
      :class="{
        'bg-red-500 hover:bg-red-600 shadow-red-300': color === Color.red,
        'bg-green-500 hover:bg-green-600 shadow-green-300':
          color === Color.green,
        'bg-gray-900 hover:bg-black shadow-gray-500': color === Color.black,
      }"
    >
      {{ color.multiplier }}
    </button>
    <div
      class="p-2 h-64 overflow-y-hidden space-y-2 bg-gray-100 text-left text-xl text-gray-800 rounded shadow shadow-gray-300"
    >
      <KeepAlive>
        <component
          v-for="(bet, index) in bets"
          :key="index"
          :is="Bet"
          :name="bet.name"
          :amount="bet.amount"
        />
      </KeepAlive>
    </div>
  </div>
</template>
