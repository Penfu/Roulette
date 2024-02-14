<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import axios from '@/configs/axios';

import { useAuthStore } from '@/stores/auth';
import { useGameStore } from '@/stores/game';

import { RollStep } from '@/enums/step';
import type Bet from '@/interfaces/bet';

import { classFromColor } from '@/helpers/color';

import BetCard from '@/components/game/bets/BetCard.vue';

const props = defineProps<{
  color: string;
  value: number;
}>();

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const game = useGameStore();
const { step, balance, bets } = storeToRefs(game);

const isActive = computed(() => step.value === RollStep.BET);
const hasBalance = computed(() => balance.value > 0);
const canBet = computed(() => isActive.value && user.value !== null && hasBalance.value);

const colorBets = computed(() => [...bets.value[props.color]].reverse());

const hovered = ref(false);

const { mutate } = useMutation({
  mutationFn: (bet: Bet) =>
    axios.post('/bets', bet, { headers: { 'X-Socket-ID': window.Echo.socketId() } }),
  onMutate: () => {
    balance.value = 0;
  },
});

const handleMakeBet = () => {
  if (!canBet.value) {
    return;
  }

  mutate({ color: props.color, amount: balance.value, user: user.value!.name });
};
</script>

<template>
  <div class="w-full grow h-80 md:h-auto flex flex-col space-y-4">
    <button
      @click="handleMakeBet"
      @mouseover="hovered = true"
      @mouseout="hovered = false"
      :disable="!canBet"
      class="py-3 w-full font-semibold text-white text-2xl rounded shadow transition-transform duration-300 ease-in-out cursor-default"
      :class="[classFromColor(color, canBet), { 'hover:scale-105 cursor-pointer': canBet }]"
    >
      x {{ value }}
    </button>

    <TransitionGroup
      tag="div"
      class="h-56 grow p-2 overflow-y-hidden space-y-2 bg-gray text-left rounded-lg shadow shadow-gray-300 transition-transform duration-300 ease-in-out"
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
