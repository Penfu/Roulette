<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useGameStore } from '@/stores/game';

import { Color } from '@/enums/color';
import { RollStep } from '@/enums/step';

import BetsLayout from '@/components/game/bets/BetsLayout.vue';

const game = useGameStore();
const { step } = storeToRefs(game);
</script>

<template>
  <div
    class="grow flex flex-col md:flex-row gap-x-4 gap-y-8 transition-all duration-300"
    :class="{ 'scale-95': step !== RollStep.BET }"
  >
    <BetsLayout :color="Color.RED" :value="2" />
    <BetsLayout :color="Color.GREEN" :value="13" />
    <BetsLayout :color="Color.BLACK" :value="2" />
  </div>
</template>
