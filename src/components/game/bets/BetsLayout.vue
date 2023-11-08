<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";

import { RollStep } from "@/enums/step";

import { classFromColor } from "@/helpers/color";

import BetCard from "@/components/game/bets/BetCard.vue";

const props = defineProps<{
  color: string;
  value: number;
}>();

const auth = useAuthStore();
const { isAuth, loading } = storeToRefs(auth);

const game = useGameStore();
const { step, bets } = storeToRefs(game);
const { makeBet } = game;

const isReady = computed(() => isAuth.value && !loading.value);
const isActive = computed(() => step.value === RollStep.BET);
const canBet = computed(() => isActive.value && isReady.value);

const colorBets = computed(() => bets.value[props.color].reverse());

const hovered = ref(false);

const handleMakeBet = () => {
  if (!canBet.value) {
    return;
  }

  makeBet(props.color);
};
</script>

<template>
  <div class="w-full grow h-80 md:h-auto flex flex-col space-y-4">
    <button
      :disable="() => !canBet"
      @click="handleMakeBet"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      class="py-4 w-full font-semibold rounded shadow transition-transform duration-300 ease-in-out cursor-default"
      :class="[classFromColor(color, canBet), { 'hover:scale-105 cursor-pointer': canBet }]"
    >
      x {{ value }}
    </button>

    <TransitionGroup
      tag="div"
      class="h-56 grow p-2 overflow-y-hidden space-y-2 bg-bkg-1 text-left text-xl rounded shadow shadow-gray-300 transition-transform duration-300 ease-in-out"
      :class="{ 'scale-105': canBet && hovered }"
      move-class="transition-all duration-500 ease-in-out"
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <BetCard v-for="bet in colorBets" :key="bet.user" :bet="bet" />
    </TransitionGroup>
  </div>
</template>
