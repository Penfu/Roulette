<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import moment from "moment";

import type Bet from "@/interfaces/bet";
import { classFromColor } from "@/helpers/color";

import RollActivityLoading from "@/components/user/activity/roll/RollActivityLoading.vue";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

defineProps<{
  bet: Bet;
}>();

const RollActivity = defineAsyncComponent(
  () => import("@/components/user/activity/roll/RollActivity.vue")
);

const isOpen = ref(false);
</script>

<template>
  <div class="flex flex-col bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
    <div
      @click="isOpen = !isOpen"
      class="px-2 sm:px-4 md:px-6 py-4 md:py-6 flex items-center gap-4 xs:gap-6 sm:gap-8 lg:gap-12 xl:gap-14 cursor-pointer"
    >
      <!-- Bet info -->
      <div class="grow flex items-center space-x-4">
        <div class="w-8 h-8 rounded shadow-md" :class="classFromColor(bet.color)" />
        <span>{{ bet.amount }}</span>
      </div>

      <!-- Bet result -->
      <span class="px-2 uppercase text-gray-800 font-bold rounded shadow-md"
        :class="{
          'bg-green-300  shadow-green-400': bet.isWin,
          'bg-red-300  shadow-red-500': !bet.isWin,
        }"
      >
        {{ bet.isWin ? "Win" : "Lose" }}
      </span>

      <!-- Bet date -->
      <span class="hidden sm:block md:hidden">{{ moment(bet.createdAt).format("DD/MM/YYYY") }}</span>
      <span class="hidden md:block">{{ moment(bet.createdAt).format("DD/MM/YYYY HH:mm:ss") }}</span>

      <button class="focus:outline-none">
        <ChevronDownIcon :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <!-- Roll Activity -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -100 }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: { type: 'keyframes', ease: 'easeInOut', duration: 150 },
      }"
      v-if="isOpen"
    >
      <Suspense>
        <template #default>
          <RollActivity :bet="bet" />
        </template>
        <template #fallback>
          <RollActivityLoading />
        </template>
      </Suspense>
    </div>
  </div>
</template>
