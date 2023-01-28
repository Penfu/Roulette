<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import anime from "animejs";

import Color from "@/enums/color";

import { useUserStore } from "@/stores/user";
import { useGameStore } from "@/stores/game";

import { RollStep } from "@/enums/step";

import RollResultBanner from "@/components/game/result/RollResultBanner.vue";
import Roulette from "@/components/game/rolls/Roulette.vue";
import AmountButton from "@/components/game/AmountButton.vue";
import Bets from "@/components/game/bets/Bets.vue";

import RollProvider from "@/providers/roll";

import Bet from "@/models/bet";
import Roll from "@/models/roll";

import CrossIcon from "@/components/icons/CrossIcon.vue";

const auth = useUserStore();
const game = useGameStore();

watch(
  () => game.balance, (newBalance, oldBalance) => {
    if (newBalance > oldBalance) {
      anime({
        targets: balanceInput.value,
        value: [oldBalance, newBalance],
        round: 1,
        duration: 500,
        easing: "linear",
      });
    }
  }
);

const result = ref({} as Roll);
const message = ref("");

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

const balanceInput = ref(HTMLInputElement);

onMounted(async () => {
  game.histories = await RollProvider.fetchRolls();

  window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
    game.timer = e.timer;

    switch (e.status) {
      case "BET":
        message.value = Math.round(e.timer / 1000) + " seconds left";
        bets.value = {
          red: e.bets.red.map((bet: any) => new Bet(Color.RED, bet.amount, bet.user)),
          black: e.bets.black.map((bet: any) => new Bet(Color.BLACK, bet.amount, bet.user)),
          green: e.bets.green.map((bet: any) => new Bet(Color.GREEN, bet.amount, bet.user)),
        };

        if (game.step == RollStep.BET)
          return;

        game.step = RollStep.BET;
        break;
      case "ROLL":
        bets.value = e.bets; // For late bets

        if (game.step == RollStep.ROLL)
          return;

        game.step = RollStep.ROLL;
        message.value = "Rolling";
        break;
      case "ROLL_TO_RESULT":
        if (game.step == RollStep.ROLL_TO_RESULT)
          return;

        result.value = Roll.fromJson(e.result);
        game.step = RollStep.ROLL_TO_RESULT;

        break;
      case "DISPLAY_RESULT":
        if (game.step == RollStep.DISPLAY_RESULT) {
          if (game.timer == 0) {
            reset();
          }
          return;
        }

        game.step = RollStep.DISPLAY_RESULT;

        if (game.histories.length == 10) {
          game.histories.pop();
        }

        game.histories.unshift(result.value);

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

        break;
    }
  });
});

const reset = () => {
  game.step = RollStep.RESET;

  bets.value.red = [];
  bets.value.black = [];
  bets.value.green = [];

  myBets.value = {
    red: null,
    black: null,
    green: null,
  };
};
</script>

<template>
  <main class="grow flex flex-col">
    <Transition mode="out-in" enter-active-class="transition ease-out duration-1000"
      leave-active-class="transition ease-out duration-1000" enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100" leave-from-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 transform scale-95">

      <RollResultBanner class="mb-2" v-if="game.step == RollStep.DISPLAY_RESULT && hasBet" :bets="(myBets as any)"
        :roll="(result as Roll)" />
    </Transition>

    <div class="h-full grow flex flex-col space-y-8">
      <!-- Roll -->
      <div class="px-2 py-4 bg-white rounded-lg shadow shadow-gray-300">
        <Roulette :message="message" :result="(result as Roll)" />
      </div>

      <!-- Amount buttons -->
      <div>
        <h3 class="pb-1 text-xl font-bold uppercase">Choose a bet</h3>
        <div class="mt-2 min-h-20 bg-white rounded-lg shadow shadow-gray-300">
          <div class="w-full h-full px-4 py-2 flex text-xl">
            <div class="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              <AmountButton :value="1" />
              <AmountButton :value="10" />
              <AmountButton :value="100" />
              <AmountButton :value="1000" />
              <AmountButton />
              <input v-bind="{ value: game.balance }" ref="balanceInput" type="number" readonly
                class="px-4 h-12 w-full lg:w-32 outline outline-2 outline-gray-200 rounded shadow shadow-gray-300" />
            </div>
            <div class="grow flex justify-end">
              <button @click="game.resetBalance()"
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
        :class="{ 'scale-95': game.step !== RollStep.BET }">
        <Bets ref="betsRed" color="red" :value="2" :bets="(bets[Color.RED] as Bet[])" />
        <Bets ref="betsGreen" color="green" :value="13" :bets="(bets[Color.GREEN] as Bet[])" />
        <Bets ref="betsBlack" color="black" :value="2" :bets="(bets[Color.BLACK] as Bet[])" />
      </div>
    </div>
  </main>
</template>
