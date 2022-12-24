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
  (e: 'addBet', color: any): void;
}>();

const hovered = ref(false);

const addBet = () => {
  if (props.active) {
    emit("addBet", props.color);
  }
};
</script>

<template>
  <div class="basis-1/3 flex flex-col space-y-4">
    <button
      :disable="() => !active"
      @click="addBet"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      class="py-4 font-semibold rounded shadow transition-transform duration-300 ease-in-out cursor-default"
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
    <div
      class="p-2 h-64 overflow-y-hidden space-y-2 bg-white text-left text-xl text-gray-800 rounded shadow shadow-gray-300 transition-transform duration-300 ease-in-out"
      :class="{ 'scale-105': active && hovered }"
    >
      <BetCard
        v-for="(bet, index) in bets"
        :key="index"
        :bet="bet"
      />
    </div>
  </div>
</template>
