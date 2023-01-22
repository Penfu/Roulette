<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import anime, { type AnimeParams } from "animejs";

import Color from "@/enums/color";
import ColorHelper from "@/helpers/color";

import { useUserStore } from "@/stores/user";
import { RollStatus } from "@/enums/rollStatus";

import FlashResult from "@/components/game/result/FlashResult.vue";
import Histories from "@/components/game/rolls/Histories.vue";
import AmountButton from "@/components/game/AmountButton.vue";
import Bets from "@/components/game/bets/Bets.vue";

import BetProvider from "@/providers/bet";
import RollProvider from "@/providers/roll";

import Bet from "@/models/bet";
import Roll from "@/models/roll";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

const auth = useUserStore();
const status = ref(RollStatus.LOADING);
const result = ref({} as Roll);
const timer = ref(0 as number);

const infoMessage = ref("");

const balance = ref(0 as number);

const bets = ref({
  red: [] as Bet[],
  black: [] as Bet[],
  green: [] as Bet[],
});
const myBets = ref({
  red: null as Bet | null,
  black: null as Bet | null,
  green: null as Bet | null,
});
const hasBet = computed(() => {
  return (
    myBets.value.red !== null ||
    myBets.value.black !== null ||
    myBets.value.green !== null
  );
});

const histories = ref([] as Roll[]);

const wheel = ref(HTMLInputElement);
const balanceInput = ref(HTMLInputElement);

onMounted(async () => {
  histories.value = await RollProvider.fetchRolls();

  let wheelSpin: AnimeParams = anime({
    targets: wheel.value,
    rotate: 360 * 6,
    duration: 6000,
    easing: "linear",
    autoplay: false,
  });

  window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
    timer.value = e.timer;

    switch (e.status) {
      case "OPEN":
        infoMessage.value = Math.round(e.timer / 1000) + " seconds left";
        bets.value = {
          red: e.bets.red.map((bet: any) => new Bet(Color.RED, bet.amount, bet.user)),
          black: e.bets.black.map((bet: any) => new Bet(Color.BLACK, bet.amount, bet.user)),
          green: e.bets.green.map((bet: any) => new Bet(Color.GREEN, bet.amount, bet.user)),
        };

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
        if (status.value == RollStatus.ROLL)
        {
          return;
        }

        if (status.value == RollStatus.CLOSE)
        {
          status.value = RollStatus.ROLL;
        }

        if (status.value == RollStatus.RESULT) {
          if (timer.value == 0) reset();
          return;
        }

        result.value = Roll.fromJson(e.result);

        const caseSize = 360 / 11; // 11 cases
        const halfCaseSize = caseSize / 2;
        const marge = caseSize / 10;

        let finalAngle = 0;

        if (result.value.color === Color.RED) {
          let caseNum = Math.floor(Math.random() * 5); // 5 possible cases for red
          finalAngle = halfCaseSize; // Add Green case before
          finalAngle += caseSize + (caseNum * 2 * caseSize); // Add Red(s) and Black(s) cases before
          finalAngle += anime.random(marge, caseSize - marge);
        }
        else if (result.value.color === Color.BLACK) {
          let caseNum = Math.floor(Math.random() * 5) + 1; // 5 possible cases for black
          finalAngle = halfCaseSize; // Add Green case before
          finalAngle += caseNum * 2 * caseSize; // Add Red(s) and Black(s) cases before
          finalAngle += anime.random(marge, caseSize - marge); // Add random size inside the range with marge
        }
        else if (result.value.color === Color.GREEN) {
          finalAngle = 360 + anime.random(-halfCaseSize + marge, halfCaseSize - marge);
        }

        const currentRotation = parseFloat(anime.get(wheel.value, "rotate") as string);
        const rotationToEndTheTurn = 360 - (currentRotation % 360);

        finalAngle += currentRotation + rotationToEndTheTurn;

        anime({
          targets: wheel.value,
          rotate: finalAngle,
          duration: 2000,
          easing: "linear",
          begin: function () {
            anime.set(wheel.value, { 'rotate': currentRotation });
          },
          complete: function () {
            showResult();
            wheelSpin.pause();
          }
        });
        break;
    }
  });
});

const showResult = () => {
  status.value = RollStatus.RESULT;

  if (histories.value.length == 10) histories.value.pop();
  histories.value.unshift(result.value);

  // List player bets
  bets.value.red
    .filter((bet: any) => bet.user == auth.user.name)
    .map((bet: any) => {
      myBets.value.red = bet;
    });
  bets.value.black
    .filter((bet: any) => bet.user == auth.user.name)
    .map((bet: any) => {
      myBets.value.black = bet;
    });
  bets.value.green
    .filter((bet: any) => bet.user == auth.user.name)
    .map((bet: any) => {
      myBets.value.green = bet;
    });

  // Give money if the player won
  switch (result.value.color) {
    case Color.RED:
      if (myBets.value.red != null)
        auth.user.balance += myBets.value.red.amount * 2;
      break;
    case Color.BLACK:
      if (myBets.value.black != null)
        auth.user.balance += myBets.value.black.amount * 2;
      break;
    case Color.GREEN:
      if (myBets.value.green != null)
        auth.user.balance += myBets.value.green.amount * 13;
      break;
  }
};
const reset = () => {
  status.value = RollStatus.LOADING;

  bets.value.red = [];
  bets.value.black = [];
  bets.value.green = [];

  myBets.value = {
    red: null,
    black: null,
    green: null,
  };
};

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

  const bet = new Bet(color, balance.value, auth.user.name);
  balance.value = 0;

  await BetProvider.addBet(bet);
};
</script>

<template>
  <main class="grow flex flex-col">
    <Transition mode="out-in" enter-active-class="transition ease-out duration-1000"
      leave-active-class="transition ease-out duration-1000" enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100" leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95">

      <FlashResult class="mb-2" v-if="status == RollStatus.RESULT && hasBet" :timer="timer" :bets="(myBets as any)"
        :roll="(result as Roll)" />
    </Transition>

    <div class="h-full grow flex flex-col space-y-8">
      <!-- Roll -->
      <div class="px-2 py-4 bg-white rounded-lg shadow shadow-gray-300">
        <div class="flex flex-col xl:flex-row items-center xl:items-stretch">
          <div class="py-2 basis-2/3 flex flex-col justify-center items-center space-y-2">
            <ChevronDownIcon />
            <img ref="wheel" src="@/assets/roulette.png" alt="Roulette" class="h-80 w-80 object-contain" />
          </div>
          <div class="basis-1/3 flex flex-col justify-end">
            <div class="h-20 my-8 flex grow justify-center items-center text-center text-2xl font-semibold uppercase">
              <p v-show="status === RollStatus.OPEN">{{ infoMessage }}</p>
              <p v-show="status === RollStatus.CLOSE || status === RollStatus.ROLL">ROLLING...</p>
              <div v-show="status === RollStatus.RESULT" class="flex items-center justify-center space-x-4">
                <p>Result</p>
                <span class="block px-3 py-1 text-white bg-red-500 rounded text-center shadow-md"
                  :class="ColorHelper.getClassFromColor(result.color)">{{ result.value }}</span>
              </div>
            </div>
            <div class="justify-end items-center xl:items-end">
              <Histories class="basis-1/3" :histories="(histories as Roll[])" />
            </div>
          </div>
        </div>
      </div>

      <!-- Amount buttons -->
      <div>
        <h3 class="pb-1 text-xl font-bold uppercase">Choose a bet</h3>
        <div class="mt-2 min-h-20 bg-white rounded-lg shadow shadow-gray-300">
          <div class="w-full h-full px-4 py-2 flex text-xl">
            <div class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              <AmountButton @add-balance="addBalance" :value="1" />
              <AmountButton @add-balance="addBalance" :value="10" />
              <AmountButton @add-balance="addBalance" :value="100" />
              <AmountButton @add-balance="addBalance" :value="1000" />
              <AmountButton @add-balance="addBalance(auth.user.balance)" />
              <input v-bind="{ value: balance }" ref="balanceInput" type="number" readonly
                class="px-4 h-12 w-full lg:w-32 outline outline-2 outline-gray-200 rounded shadow shadow-gray-300" />
            </div>
            <div class="grow flex justify-end">
              <button @click="resetBalance"
                class="h-12 px-12 xl:px-4 ml-2 bg-red-500 hover:bg-red-600 text-white rounded shadow-md shadow-red-300">
                <CrossIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bet buttons -->
      <div
        class="grow flex flex-col md:flex-row gap-x-4 gap-y-8 text-center text-white text-2xl transition-all duration-300"
        :class="{ 'scale-95': status !== RollStatus.OPEN }">
        <Bets ref="betsRed" :active="status === RollStatus.OPEN" color="red" :value="2"
          :bets="(bets[Color.RED] as Bet[])" @add-bet="addBet" />
        <Bets ref="betsGreen" :active="status === RollStatus.OPEN" color="green" :value="13"
          :bets="(bets[Color.GREEN] as Bet[])" @add-bet="addBet" />
        <Bets ref="betsBlack" :active="status === RollStatus.OPEN" color="black" :value="2"
          :bets="(bets[Color.BLACK] as Bet[])" @add-bet="addBet" />
      </div>
    </div>
  </main>
</template>
