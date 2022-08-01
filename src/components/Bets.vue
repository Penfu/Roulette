<script lang="ts">
import Bet from "../components/Bet.vue";

export default {
  components: {
    Bet,
  },
  emits: ["add-bet"],
  data() {
    return {
      bets: [] as typeof Bet[],
    };
  },
  methods: {
    displayBet(name: string, amount: number) {
      const bet = this.bets.find((b) => b.name === name);

      if (bet) {
        bet.amount += amount;
      } else {
        this.bets.push({ name, amount });
      }
    },
  },
};
</script>

<template>
  <div class="basis-1/3 flex flex-col space-y-4">
    <button
      @click="$emit('add-bet', this)"
      class="py-4 font-semibold rounded shadow"
    ></button>
    <div
      class="p-2 h-64 overflow-y-hidden space-y-2 bg-gray-100 text-left text-xl text-gray-800 rounded shadow shadow-gray-300"
    >
      <component
        v-for="(bet, index) in bets"
        :key="index"
        :is="Bet"
        :name="bet.name"
        :amount="bet.amount"
      />
    </div>
  </div>
</template>
