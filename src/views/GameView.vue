<script setup lang="ts">
import Bets, { Color } from "../components/Bets.vue";
import AmountButton from "../components/AmountButton.vue";

import IconCross from "../components/icons/IconCross.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      user: {
        name: "Penfu" as string,
        balance: 3000 as number,
      },
      balance: 0 as number,
    };
  },
  methods: {
    addBalance(amount: number) {
      if (isNaN(amount)) amount = this.user.balance;

      if (this.user.balance < amount) {
        console.log("You don't have enough money!");
        return;
      }

      this.balance += amount;
      this.user.balance -= amount;
    },
    resetBalance() {
      this.user.balance += this.balance;
      this.balance = 0;
    },

    addBet(bets: typeof Bets) {
      if (this.balance === 0) {
        console.log("Select an amount to bet!");
        return;
      }

      bets.displayBet(this.user.name, this.balance);
      this.balance = 0;
    },
  },
  components: {
    AmountButton,
    IconCross,
    Bets,
  },
};
</script>

<template>
  <main class="mx-4 sm:mx-8 md:mx-32">
    <div class="h-80 bg-gray-100 rounded shadow shadow-gray-300">
      <span class="absolute"
        >User: {{ user.name }} Balance: {{ user.balance }}</span
      >
      <div class="py-2 h-full">
        <img
          src="@/assets/roulette.png"
          alt="Roulette"
          class="h-full w-full object-contain"
        />
      </div>
    </div>

    <div class="my-4">
      <h3 class="text-xl font-bold uppercase">Choose a bet</h3>
      <div class="mt-2 min-h-20 bg-gray-100 rounded shadow shadow-gray-300">
        <div class="w-full h-full px-4 py-2 flex text-xl">
          <div
            class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          >
            <AmountButton @add-balance="addBalance" :value="1" />
            <AmountButton @add-balance="addBalance" :value="10" />
            <AmountButton @add-balance="addBalance" :value="100" />
            <AmountButton @add-balance="addBalance" :value="1000" />
            <AmountButton @add-balance="addBalance" />
            <input
              v-bind="{ value: balance }"
              type="number"
              readonly
              class="px-4 h-12 w-32 outline outline-2 outline-gray-200 rounded shadow shadow-gray-300"
            />
          </div>
          <div class="grow flex justify-end">
            <button
              @click="resetBalance"
              class="h-12 px-12 xl:px-4 bg-red-500 hover:bg-red-600 text-white rounded shadow shadow-red-300"
            >
              <IconCross />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full space-x-4 text-center text-white text-2xl">
      <Bets @add-bet="addBet" :color="Color.red" />
      <Bets @add-bet="addBet" :color="Color.green" />
      <Bets @add-bet="addBet" :color="Color.black" />
    </div>
  </main>
</template>
