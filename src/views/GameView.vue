<script lang="ts">
import axios from "axios";
import { useUserStore } from "../stores/user";

import Color from "./../enums/Color";
import RollStatus from "./../enums/RollStatus";

import ColorHelper from "./../helpers/Color";

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
      auth: useUserStore(),
      ColorHelper,
      Color,
      RollStatus,
      status: RollStatus.LOADING,
      result: {
        color: "" as string,
        value: 0 as number,
      },
      infoMessage: "" as string,
      balance: 0 as number,
      bets: {
        red: [] as Array<{ user: string; value: number }>,
        black: [] as Array<{ user: string; value: number }>,
        green: [] as Array<{ user: string; value: number }>,
      },
      myBets: {
        red: [] as Array<{ value: number }>,
        black: [] as Array<{ value: number }>,
        green: [] as Array<{ value: number }>,
      },
      histories: [] as Array<{ color: string; value: number }>,
    };
  },
  mounted() {
    this.getHistories();

    window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
      switch (e.status) {
        case "OPEN":
          this.status = RollStatus.OPEN;
          this.infoMessage = Math.round(e.timer / 1000) + " seconds left";

          this.bets = e.bets;
          break;
        case "CLOSE":
          // For late bets
          this.bets = e.bets;

          if (this.status = RollStatus.CLOSE) return;

          this.status = RollStatus.CLOSE;
          this.infoMessage = "Rolling";
          break;
        case "RESULT":
          if (this.status == RollStatus.RESULT) return;

          this.status = RollStatus.RESULT;
          this.result = e.result;
          this.infoMessage = e.result.value + " " + e.result.color + " won";

          this.bets.red = [];
          this.bets.black = [];
          this.bets.green = [];

          this.histories.unshift({
            color: e.result.color,
            value: e.result.value,
          });

          if (this.histories.length > 10) {
            this.histories.pop();
          }
          break;
      }
    });
  },
  methods: {
    async getHistories() {
      this.histories = await (await axios.get("http://localhost:8000/api/rolls")).data;
    },

    addBalance(value: number) {
      if (isNaN(value)) value = this.auth.user.balance;

      if (this.auth.user.balance < value) {
        console.log("You don't have enough money!");
        return;
      }

      this.balance += value;
      this.auth.user.balance -= value;
    },
    resetBalance() {
      this.auth.user.balance += this.balance;
      this.balance = 0;
    },

    async addBet(color: string) {
      if (this.balance === 0) {
        console.log("Select an amount to bet!");
        return;
      }

      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      axios.post("/bets",
        {
          user: this.auth.user.name,
          color: color,
          value: this.balance,
        },
        {
          headers: {
            "X-Socket-ID": window.Echo.socketId(),
          },
        });

      this.myBets[color].push({ value: this.balance });

      /*
      const bet = this.bets[color].find((b: { user: string; }) => b.user === this.auth.user.name);

      if (bet) {
        bet.value += this.balance;
      } else {
        this.bets[color].push({
          user: this.auth.user.name,
          color: color,
          value: this.balance,
        });
      }
      */

      this.balance = 0;
    },
  },
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="bg-gray-100 rounded shadow shadow-gray-300">
      <div class="flex flex-col xl:flex-row items-center xl:items-stretch">
        <img src="@/assets/roulette.png" alt="Roulette" class="py-2 basis-2/3 h-80 w-80 object-contain" />
        <div class="flex flex-col justify-end">
          <div class="h-20 my-8 flex grow justify-center items-center text-center text-2xl font-semibold uppercase">
            <p v-show="status === RollStatus.OPEN">{{ infoMessage }}</p>
            <p v-show="status === RollStatus.CLOSE">ROLLING...</p>
            <div v-show="status === RollStatus.RESULT" class="flex items-center justify-center space-x-4">
              <p>Result</p>
              <span class="block px-3 py-1 text-white bg-red-500 rounded text-center"
                :class="ColorHelper.getClassFromColor(result.color)">{{ result.value }}</span>
            </div>
          </div>
          <div class="justify-end items-center xl:items-end">
            <Histories class="basis-1/3" :histories="histories" />
          </div>
        </div>
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
      <Bets ref="betsRed" color="red" :value="2" :bets="bets[Color.RED]" :active="status === RollStatus.OPEN"
        @add-bet="addBet" />
      <Bets ref="betsGreen" color="green" :value="13" :bets="bets[Color.GREEN]" :active="status === RollStatus.OPEN"
        @add-bet="addBet" />
      <Bets ref="betsBlack" color="black" :value="2" :bets="bets[Color.BLACK]" :active="status === RollStatus.OPEN"
        @add-bet="addBet" />
    </div>
  </main>
</template>
