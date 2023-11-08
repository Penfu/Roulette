<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";

import { useRoll } from "@/composables/useRoll";

import { Color } from "@/enums/color";
import { RollStep } from "@/enums/step";
import type Bet from "@/interfaces/bet";

import RollResultBanner from "@/components/game/result/RollResultBanner.vue";

import RouletteSection from "@/components/game/rolls/RouletteSection.vue";
import BalanceSection from "@/components/game/balance/BalanceSection.vue";
import BetSection from "@/components/game/bets/BetSection.vue";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const game = useGameStore();
const { bets, histories, timer, step, result } = storeToRefs(game);

const { rolls, fetchRolls } = useRoll();

const message = ref("");


const myBetOnRed = computed(
  () => bets.value.red.find((bet: Bet) => bet.user === user.value.name) as Bet
);
const myBetOnBlack = computed(
  () => bets.value.black.find((bet: Bet) => bet.user === user.value.name) as Bet
);
const myBetOnGreen = computed(
  () => bets.value.green.find((bet: Bet) => bet.user === user.value.name) as Bet
);

const hasBet = computed(() => myBetOnRed.value || myBetOnBlack.value || myBetOnGreen.value);

onMounted(async () => {
  await fetchRolls();
  histories.value = rolls.value;

  window.Echo.channel("roulette").listen("RollEvent", (e: any) => {
    timer.value = e.timer;
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
    result.value = e.result;

    switch (e.status) {
      case "BET":
        message.value = Math.round(e.timer / 1000) + " seconds left";

        if (step.value !== RollStep.BET) {
          step.value = RollStep.BET;
        }
        break;
      case "ROLL":
        if (game.step === RollStep.ROLL) {
          return;
        }

        step.value = RollStep.ROLL;
        message.value = "Rolling";
        break;
      case "ROLL_TO_RESULT":
        if (step.value !== RollStep.ROLL_TO_RESULT) {
          step.value = RollStep.ROLL_TO_RESULT;
        }
        break;
      case "DISPLAY_RESULT":
        if (step.value === RollStep.DISPLAY_RESULT) {
          if (timer.value === 0) {
            reset();
          }
          return;
        }

        if (!result) {
          return;
        }

        step.value = RollStep.DISPLAY_RESULT;

        if (histories.value.length >= 10) {
          histories.value.pop();
        }
        histories.value.unshift(result.value!);

        // Give money if the player won
        switch (result.value?.color) {
          case Color.RED:
            if (myBetOnRed.value) user.value.balance += myBetOnRed.value.amount * 2;
            break;
          case Color.BLACK:
            if (myBetOnBlack.value) user.value.balance += myBetOnBlack.value.amount * 2;
            break;
          case Color.GREEN:
            if (myBetOnGreen.value) user.value.balance += myBetOnGreen.value.amount * 14;
            break;
        }

        break;
    }
  });
});

const reset = () => {
  step.value = RollStep.RESET;

  bets.value.red = [];
  bets.value.black = [];
  bets.value.green = [];
};
</script>

<template>
  <main class="flex flex-col">
    <RollResultBanner
      v-if="step === RollStep.DISPLAY_RESULT && hasBet"
      :bets="{ red: myBetOnRed, black: myBetOnBlack, green: myBetOnGreen }"
    />

    <div class="grow flex flex-col space-y-8">
      <RouletteSection :message="message" />
      <BalanceSection />
      <BetSection />
    </div>
  </main>
</template>
