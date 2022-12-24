<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import anime, { type AnimeParams } from "animejs";

import Color from "@/enums/color";
import ColorHelper from "@/helpers/color";

import { useUserStore } from "@/stores/user";
import { RollStatus } from "@/enums/rollStatus";

import Histories from "@/components/game/rolls/Histories.vue";
import AmountButton from "@/components/game/AmountButton.vue";
import Bets from "@/components/game/bets/Bets.vue";

import type Bet from "@/models/bet";
import Roll from "@/models/roll";

import IconCross from "@/components/icons/IconCross.vue";

const auth = useUserStore();
const status = ref(RollStatus.LOADING);
const result = ref({} as Roll);

const infoMessage = ref("");

const balance = ref(0 as number);

const bets = ref({
  red: [] as Bet[],
  black: [] as Bet[],
  green: [] as Bet[],
});
const histories = ref([] as Roll[]);

const wheel = ref(HTMLInputElement);
const balanceInput = ref(HTMLInputElement);

onMounted(async () => {
  histories.value = (await axios.get("http://localhost:8000/api/rolls")).data;

  let wheelSpin: AnimeParams = anime({
    targets: wheel.value,
    rotate: 360 * 5,
    duration: 6000,
    easing: "linear",
    autoplay: false,
  });

  window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
    switch (e.status) {
      case "OPEN":
        infoMessage.value = Math.round(e.timer / 1000) + " seconds left";
        bets.value = e.bets;

        if (status.value == RollStatus.OPEN) return;

        console.log("Bets are open");

        // Reset the wheel
        anime({
          targets: wheel.value,
          rotate: 0,
          duration: 0,
        });

        status.value = RollStatus.OPEN;
        break;
      case "CLOSE":
        bets.value = e.bets; // For late bets

        if (status.value == RollStatus.CLOSE) return;

        console.log("Rolling...");
        wheelSpin.restart();

        status.value = RollStatus.CLOSE;
        infoMessage.value = "Rolling";
        break;
      case "RESULT":
        if (status.value == RollStatus.RESULT) return;

        console.log("Result: " + e.result.color + " " + e.result.value);
        wheelSpin.pause();

        status.value = RollStatus.RESULT;
        result.value = e.result;
        infoMessage.value = e.result.value + " " + e.result.color + " won";

        bets.value.red = [];
        bets.value.black = [];
        bets.value.green = [];

        histories.value.unshift(new Roll(e.result.value, e.result.color));

        if (histories.value.length > 10) {
          histories.value.pop();
        }
        break;
    }
  });
});

const addBalance = (value: number) => {
  if (auth.user.balance < value) {
    console.log("You don't have enough money!");
    return;
  }

  auth.user.balance -= value;
  balance.value += value;

  if (value <= 1) {
    return;
  }

  anime({
    targets: balanceInput.value,
    value: [balance.value - value, balance.value],
    round: 1,
    duration: 500,
    easing: "linear",
  });
};

const resetBalance = () => {
  auth.user.balance += balance.value;
  balance.value = 0;
};

const addBet = async (color: string) => {
  if (status.value !== RollStatus.OPEN) {
    console.log("Bets are closed!");
    return;
  }

  if (balance.value === 0) {
    console.log("Select an amount to bet!");
    return;
  }

  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  axios.post(
    "/bets",
    {
      color: color,
      value: balance.value,
    },
    {
      headers: {
        "X-Socket-ID": window.Echo.socketId(),
      },
    }
  );

  balance.value = 0;
};
</script>

<template>
  <main class="flex flex-col space-y-12">
    <!-- Roll -->
    <div class="py-4 bg-white rounded-lg shadow shadow-gray-300">
      <div class="flex flex-col xl:flex-row items-center xl:items-stretch">
        <img
          ref="wheel"
          src="@/assets/roulette.png"
          alt="Roulette"
          class="py-2 basis-2/3 h-80 w-80 object-contain"
        />
        <div class="flex flex-col justify-end">
          <div
            class="h-20 my-8 flex grow justify-center items-center text-center text-2xl font-semibold uppercase"
          >
            <p v-show="status === RollStatus.OPEN">{{ infoMessage }}</p>
            <p v-show="status === RollStatus.CLOSE">ROLLING...</p>
            <div
              v-show="status === RollStatus.RESULT"
              class="flex items-center justify-center space-x-4"
            >
              <p>Result</p>
              <span
                class="block px-3 py-1 text-white bg-red-500 rounded text-center"
                :class="ColorHelper.getClassFromColor(result.color)"
                >{{ result.value }}</span
              >
            </div>
          </div>
          <div class="justify-end items-center xl:items-end">
            <Histories class="basis-1/3" :histories="histories" />
          </div>
        </div>
      </div>
    </div>

    <!-- Amount buttons -->
    <div>
      <h3 class="pb-1 text-xl font-bold uppercase">Choose a bet</h3>
      <div class="mt-2 min-h-20 bg-white rounded-lg shadow shadow-gray-300">
        <div class="w-full h-full px-4 py-2 flex text-xl">
          <div
            class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          >
            <AmountButton @add-balance="addBalance" :value="1" />
            <AmountButton @add-balance="addBalance" :value="10" />
            <AmountButton @add-balance="addBalance" :value="100" />
            <AmountButton @add-balance="addBalance" :value="1000" />
            <AmountButton @add-balance="addBalance(auth.user.balance)" />
            <input
              v-bind="{ value: balance }"
              ref="balanceInput"
              type="number"
              readonly
              class="px-4 h-12 w-full lg:w-32 outline outline-2 outline-gray-200 rounded shadow shadow-gray-300"
            />
          </div>
          <div class="grow flex justify-end">
            <button
              @click="resetBalance"
              class="h-12 px-12 xl:px-4 ml-2 bg-red-500 hover:bg-red-600 text-white rounded shadow shadow-red-300"
            >
              <IconCross />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bet buttons -->
    <div
      class="flex w-full space-x-4 text-center text-white text-2xl transition-all duration-300"
      :class="{ 'scale-95': status !== RollStatus.OPEN }"
    >
      <Bets
        ref="betsRed"
        :active="status === RollStatus.OPEN"
        color="red"
        :value="2"
        :bets="bets[Color.RED] as Bet[]"
        @add-bet="addBet"
      />
      <Bets
        ref="betsGreen"
        :active="status === RollStatus.OPEN"
        color="green"
        :value="13"
        :bets="bets[Color.GREEN] as Bet[]"
        @add-bet="addBet"
      />
      <Bets
        ref="betsBlack"
        :active="status === RollStatus.OPEN"
        color="black"
        :value="2"
        :bets="bets[Color.BLACK] as Bet[]"
        @add-bet="addBet"
      />
    </div>
  </main>
</template>
