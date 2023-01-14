<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import RollActivityLoading from "@/components/user/activity/roll/RollActivityLoading.vue";

import type Bet from "@/models/bet";
import Color from "@/enums/color";

const props = defineProps<{
  bet: Bet;
}>();

const RollActivity = defineAsyncComponent(() => import("@/components/user/activity/roll/RollActivity.vue"));

const detailed = ref(false);
</script>

<template>
  <div class="flex flex-col bg-gray-50 rounded-lg border border-gray-300">
    <div @click="detailed = !detailed" class="p-6 flex items-center space-x-8 hover:cursor-pointer">
      <div class="grow flex items-center space-x-4">
        <div
          class="w-8 h-8 rounded shadow-md"
          :class="{
            'bg-red-500 shadow-red-300': bet.color == Color.RED,
            'bg-gray-900 shadow-gray-500': bet.color == Color.BLACK,
            'bg-green-500 shadow-green-300': bet.color == Color.GREEN,
          }"
        ></div>
        <span>{{ bet.amount }}</span>
      </div>
      <span>{{ bet.isWin ? 'Win' : 'Lose' }}</span>
      <span>{{ bet.formattedCreatedAt }}</span>

      <button class="focus:outline-none">
        <svg
          v-if="detailed"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <Suspense v-if="detailed">
      <template #default>
        <RollActivity :bet="bet" />
      </template>
      <template #fallback>
        <RollActivityLoading />
      </template>
    </Suspense>
  </div>
</template>
