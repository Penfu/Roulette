<script setup lang="ts">
import { ref } from "vue";
import Color from "@/enums/color";
import BetCard from "@/components/game/bets/Bet.vue";

import type Bet from "@/models/bet";

const props = defineProps<{
  active: boolean;
  color: any;
  value: number;
  bets: Bet[];
}>();

const emit = defineEmits<{
  (e: "addBet", color: any): void;
}>();

const hovered = ref(false);

const addBet = () => {
  if (props.active) {
    emit("addBet", props.color);
  }
};
</script>

<template>
  <div class="w-full h-80 xl:h-full flex flex-col space-y-4">
    <button
      :disable="() => !active"
      @click="addBet"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      class="py-4 w-full font-semibold rounded shadow-md transition-transform duration-300 ease-in-out cursor-default"
      :class="{
        'bg-red-500 shadow-red-300': color == Color.RED,
        'bg-green-500 shadow-green-300': color == Color.GREEN,
        'bg-gray-900 shadow-gray-500': color == Color.BLACK,
        'hover:bg-red-600': active && color == Color.RED,
        'hover:bg-green-600': active && color == Color.GREEN,
        'hover:bg-black': active && color == Color.BLACK,
        'hover:scale-105 hover:cursor-pointer': active,
      }"
    >
      x {{ value }}
    </button>
    <TransitionGroup
      tag="div"
      class="grow p-2 overflow-y-hidden space-y-2 bg-white text-left text-xl text-gray-800 rounded shadow-md shadow-gray-300 transition-transform duration-300 ease-in-out"
      :class="{ 'scale-105': active && hovered }"
      move-class="transition-all duration-500 ease-in-out"
      enter-active-class="transition-all duration-500 ease-in-out"
      leave-active-class="transition-all duration-500 ease-in-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <BetCard v-for="(bet, index) in bets.slice().reverse()" :key="index" :bet="bet" />
    </TransitionGroup>
  </div>
</template>
