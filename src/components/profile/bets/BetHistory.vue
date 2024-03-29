<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import moment from 'moment';

import type Bet from '@/interfaces/bet';
import { classFromColor } from '@/helpers/color';

import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';

defineProps<{
  bet: Bet;
}>();

const RollHistory = defineAsyncComponent(() => import('@/components/profile/bets/RollHistory.vue'));

const isOpen = ref(false);
</script>

<template>
  <div class="bg-gray-100 rounded-lg border-3 border-gray-300 overflow-hidden">
    <div
      class="px-2 sm:px-4 md:px-6 py-2 md:py-3 flex items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-12 xl:gap-14 cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <!-- Bet info -->
      <div class="grow flex items-center space-x-4">
        <div class="w-8 h-8 rounded shadow" :class="classFromColor(bet.color)" />
        <span>{{ bet.amount }}</span>
      </div>

      <!-- Bet result -->
      <span
        class="tag lowercase text-black shadow"
        :class="{
          'bg-green shadow-green': bet.isWin,
          'bg-red shadow-red': !bet.isWin,
        }"
      >
        {{ bet.isWin ? 'Win' : 'Lose' }}
      </span>

      <!-- Bet date -->
      <span class="hidden sm:block md:hidden">
        {{ moment(bet.createdAt).format('DD/MM/YYYY') }}
      </span>
      <span class="hidden md:block">
        {{ moment(bet.createdAt).format('DD/MM/YYYY HH:mm:ss') }}
      </span>

      <button class="focus:outline-none">
        <ChevronDownIcon :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <RollHistory
      v-if="isOpen"
      v-motion
      :initial="{ opacity: 0, y: -100 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { type: 'keyframes', ease: 'easeInOut', duration: 150 },
      }"
      :bet="bet"
    />
  </div>
</template>
