<script setup lang="ts">
import { computed, ref } from "vue";

import { useGameStore } from "@/stores/game";

import getClassFromColor from "@/helpers/color";

import Color from "@/enums/color";
import BetCard from "@/components/game/bets/Bet.vue";

import type Bet from "@/models/bet";
import { RollStep } from "@/enums/step";

const props = defineProps<{
  color: string;
  value: number;
  bets: Bet[];
}>();

const game = useGameStore();
const isActive = computed(() => game.step === RollStep.BET);

const hovered = ref(false);

const makeBet = () => {
  if (!isActive) {
    return;
  }

  game.makeBet(props.color);
};
</script>

<template>
  <div class="w-full grow h-80 md:h-auto flex flex-col space-y-4">
    <button :disable="() => !isActive" @click="makeBet" @mouseover="hovered = true" @mouseout="hovered = false"
      class="py-4 w-full font-semibold rounded shadow-md transition-transform duration-300 ease-in-out cursor-default"
      :class="getClassFromColor(color, true),
        {
         'hover:scale-105 cursor-pointer': isActive,
        }">
      x {{ value }}
    </button>
    <TransitionGroup tag="div"
      class="grow p-2 overflow-y-hidden space-y-2 bg-white text-left text-xl text-gray-800 rounded shadow-md shadow-gray-300 transition-transform duration-300 ease-in-out"
      :class="{ 'scale-105': isActive && hovered }" move-class="transition-all duration-500 ease-in-out"
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out" enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4">
      <BetCard v-for="(bet, index) in bets.slice().reverse()" :key="index" :bet="bet" />
    </TransitionGroup>
  </div>
</template>
