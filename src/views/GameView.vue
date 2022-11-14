<script lang="ts">
import axios from "axios";
import Colors from "@/enums/colors";

import Bets from "../components/Bets.vue";
import AmountButton from "../components/AmountButton.vue";

import IconCross from "../components/icons/IconCross.vue";
import Histories from "../components/Histories.vue";

export default {
  name: "GameView",
  components: {
    Histories,
    AmountButton,
    IconCross,
    Bets,
},
  data() {
    return {
      user: {
        name: "Penfu" as string,
        balance: 3000 as number,
      },
      balance: 0 as number,
      bets: {
        red: [] as Array<{ user: string; value: number }>,
        black: [] as Array<{ user: string; value: number }>,
        green: [] as Array<{ user: string; value: number }>,
      },
      histories: [] as Array<{ color: string, value: number }>,
    };
  },
  mounted() {
    this.getHistories();

    /*
    [
      { color: "black", value: 1 },
      { color: "red", value: 20 },
      { color: "red", value: 10 },
      { color: "red", value: 8 },
      { color: "green", value: 13 },
      { color: "black", value: 11 },
      { color: "black", value: 13 },
    ];
    */

    window.Echo.channel("roll").listen("RollEvent", (e: any) => {
      this.histories.unshift({
        color: e.color,
        value: e.value,
      });

      if (this.histories.length > 10) {
        this.histories.pop();
      }
    });

    window.Echo.channel("roulette").listen("BetEvent", (e: any) => {
      const bet = this.bets[e.color].find((b) => e.user === b.user);

      if (bet) {
        bet.value += e.value;
      } else {
        this.bets[e.color].push({
          user: e.user,
          value: e.value,
        });
      }
    });
  },
  methods: {
    addBalance(value: number) {
      if (isNaN(value)) value = this.user.balance;

      if (this.user.balance < value) {
        console.log("You don't have enough money!");
        return;
      }

      this.balance += value;
      this.user.balance -= value;
    },
    resetBalance() {
      this.user.balance += this.balance;
      this.balance = 0;
    },

    async addBet(color: string) {
      if (this.balance === 0) {
        console.log("Select an amount to bet!");
        return;
      }

      // await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      axios.post("http://localhost:8000/api/bets", {
        user: this.user.name,
        color: color,
        value: this.balance,
      });

      const bet = this.bets[color].find((b) => b.user === this.user.name);

      if (bet) {
        bet.value += this.balance;
      } else {
        this.bets[color].push({
          user: this.user.name,
          value: this.balance,
        });
      }

      // this.$refs.betsRed.displayBet(this.user.name, this.balance);
      this.balance = 0;
    },

    async getHistories() {
      this.histories = await (await axios.get("http://localhost:8000/api/rolls")).data;
    },
  },
};
</script>

<template>
  <main class="mx-4 sm:mx-8 md:mx-32">
    <span class="absolute">User: {{ user.name }} Balance: {{ user.balance }}</span>

    <div class="bg-gray-100 rounded shadow shadow-gray-300">
      <div class="flex flex-col lg:flex-row justify-center items-center lg:items-end">
        <img src="@/assets/roulette.png" alt="Roulette" class="py-2 basis-2/3 h-80 w-80 object-contain" />
        <Histories class="basis-1/3" :histories="this.histories" />
      </div>
    </div>

    <div class="my-4">
      <h3 class="text-xl font-bold uppercase">Choose a bet</h3>
      <div class="mt-2 min-h-20 bg-gray-100 rounded shadow shadow-gray-300">
        <div class="w-full h-full px-4 py-2 flex text-xl">
          <div class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            <AmountButton @add-balance="addBalance" :value="1" />
            <AmountButton @add-balance="addBalance" :value="10" />
            <AmountButton @add-balance="addBalance" :value="100" />
            <AmountButton @add-balance="addBalance" :value="1000" />
            <AmountButton @add-balance="addBalance" />
            <input v-bind="{ value: balance }" type="number" readonly
              class="px-4 h-12 w-full lg:w-32 outline outline-2 outline-gray-200 rounded shadow shadow-gray-300" />
          </div>
          <div class="grow flex justify-end">
            <button @click="resetBalance"
              class="h-12 px-12 xl:px-4 ml-2 bg-red-500 hover:bg-red-600 text-white rounded shadow shadow-red-300">
              <IconCross />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full space-x-4 text-center text-white text-2xl">
      <Bets ref="betsRed" color="red" :value="2" :bets="this.bets['red']" @add-bet="addBet" />
      <Bets ref="betsGreen" color="green" :value="13" :bets="this.bets['green']" @add-bet="addBet" />
      <Bets ref="betsBlack" color="black" :value="2" :bets="this.bets['black']" @add-bet="addBet" />
    </div>
  </main>
</template>
