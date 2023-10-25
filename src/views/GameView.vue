<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import anime from "animejs";

import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";

import { useRoll } from "@/composables/useRoll";

import { Color } from "@/enums/color";
import { RollStep } from "@/enums/step";
import type Bet from "@/interfaces/bet";

import RollResultBanner from "@/components/game/result/RollResultBanner.vue";
import Roulette from "@/components/game/rolls/Roulette.vue";
import AmountButton from "@/components/game/AmountButton.vue";
import Bets from "@/components/game/bets/Bets.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

const auth = useAuthStore();
const game = useGameStore();

const { rolls, fetchRolls } = useRoll();

const amountButtons = [1, 10, 100, 1000];
const balanceToDisplay = ref(0);
watch(
  () => game.balance,
  (newBalance, oldBalance) => {
    anime({
      targets: balanceToDisplay,
      value: [oldBalance, newBalance],
      round: 1,
      duration: 500,
      easing: "linear",
    });
  }
);

const message = ref("");

const bets = ref({
  red: [] as Bet[],
  black: [] as Bet[],
  green: [] as Bet[],
});

const myBetOnRed = computed(
  () => bets.value.red.find((bet: Bet) => bet.user == auth.user.name) as Bet
);
const myBetOnBlack = computed(
  () => bets.value.black.find((bet: Bet) => bet.user == auth.user.name) as Bet
);
const myBetOnGreen = computed(
  () => bets.value.green.find((bet: Bet) => bet.user == auth.user.name) as Bet
);

const hasBet = computed(() => myBetOnRed.value || myBetOnBlack.value || myBetOnGreen.value);

onMounted(async () => {
  await fetchRolls();
  game.histories = rolls.value;

  window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
    game.timer = e.timer;
    bets.value = {
      red: e.bets.red.map((bet: Bet) => {
        return { color: Color.RED, amount: bet.amount, user: bet.user };
      }),
      black: e.bets.black.map((bet: Bet) => {
        return { color: Color.BLACK, amount: bet.amount, user: bet.user };
      }),
      green: e.bets.green.map((bet: Bet) => {
        return { color: Color.GREEN, amount: bet.amount, user: bet.user };
      }),
    };
    game.result = e.result;

    switch (e.status) {
      case "BET":
        message.value = Math.round(e.timer / 1000) + " seconds left";

        if (game.step == RollStep.BET) return;

        game.step = RollStep.BET;
        break;
      case "ROLL":
        if (game.step == RollStep.ROLL) return;

        game.step = RollStep.ROLL;
        message.value = "Rolling";
        break;
      case "ROLL_TO_RESULT":
        if (game.step == RollStep.ROLL_TO_RESULT) return;

        game.step = RollStep.ROLL_TO_RESULT;

        break;
      case "DISPLAY_RESULT":
        if (game.step == RollStep.DISPLAY_RESULT) {
          if (game.timer == 0) {
            reset();
          }
          return;
        }

        if (!game.result) {
          return;
        }

        game.step = RollStep.DISPLAY_RESULT;

        if (game.histories.length >= 10) {
          game.histories.pop();
        }
        game.histories.unshift(game.result);

        // Give money if the player won
        switch (game.result.color) {
          case Color.RED:
            if (myBetOnRed.value) auth.user.balance += myBetOnRed.value.amount * 2;
            break;
          case Color.BLACK:
            if (myBetOnBlack.value) auth.user.balance += myBetOnBlack.value.amount * 2;
            break;
          case Color.GREEN:
            if (myBetOnGreen.value) auth.user.balance += myBetOnGreen.value.amount * 14;
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
};
</script>

<template>
  <main class="flex flex-col">
    <RollResultBanner
      v-motion
      :initial="{ opacity: 0, y: -100 }"
      :enter="{ opacity: 1, y: 0 }"
      :leave="{ opacity: 0, y: 100 }"
      class="mb-2"
      v-if="game.step == RollStep.DISPLAY_RESULT && hasBet"
      :bets="{ red: myBetOnRed, black: myBetOnBlack, green: myBetOnGreen }"
    />

    <div class="grow flex flex-col space-y-8">
      <!-- Roll -->
      <div class="px-2 py-4 bg-white rounded-lg shadow shadow-gray-300">
        <Roulette :message="message" />
      </div>

      <!-- Amount buttons -->
      <div>
        <h3 class="pb-1 text-xl font-bold uppercase">Choose a bet</h3>
        <div class="mt-2 bg-white rounded-lg shadow shadow-gray-300">
          <div
            class="px-4 py-2 flex flex-col xs:flex-row xs:justify-between gap-8 md:gap-16 text-xl"
          >
            <div class="w-full flex flex-wrap gap-2">
              <AmountButton v-for="amount in amountButtons" :key="amount" :value="amount" />
            </div>

            <div class="w-auto flex flex-col lg:flex-row lg:justify-end gap-2">
              <label
                class="px-2 md:px-4 h-12 xs:min-w-[4rem] sm:min-w-[8rem] flex justify-center items-center rounded outline outline-2 outline-gray-200 shadow shadow-gray-300"
              >
                {{ balanceToDisplay }}
              </label>
              <div class="flex space-x-2">
                <button
                  @click="game.allInBalance()"
                  class="basis-1/2 px-4 h-12 bg-gray-100 hover:bg-gray-300 font-semibold whitespace-nowrap rounded shadow-md shadow-gray-300"
                >
                  {{ "All In" }}
                </button>
                <button
                  @click="game.resetBalance()"
                  class="basis-1/2 px-4 h-12 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white stroke-2 rounded shadow-md shadow-red-300"
                >
                  <CrossIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bet buttons -->
      <div
        class="grow flex flex-col md:flex-row gap-x-4 gap-y-8 text-center text-white text-2xl transition-all duration-300"
        :class="{ 'scale-95': game.step !== RollStep.BET }"
      >
        <Bets ref="betsRed" color="red" :value="2" :bets="bets[Color.RED]" />
        <Bets ref="betsGreen" color="green" :value="13" :bets="bets[Color.GREEN]" />
        <Bets ref="betsBlack" color="black" :value="2" :bets="bets[Color.BLACK]" />
      </div>
    </div>
  </main>
</template>
