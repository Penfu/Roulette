<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import RollActivityLoading from "@/components/user/activity/roll/RollActivityLoading.vue";

import getClassFromColor from "@/helpers/color";
import type Bet from "@/models/bet";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

defineProps<{
  bet: Bet;
}>();

const RollActivity = defineAsyncComponent(() => import("@/components/user/activity/roll/RollActivity.vue"));

const isOpen = ref(false);
</script>

<template>
  <div class="flex flex-col bg-gray-50 rounded-lg border border-gray-300">
    <div @click="isOpen = !isOpen" class="p-6 flex items-center space-x-8 hover:cursor-pointer">
      <div class="grow flex items-center space-x-4">
        <div class="w-8 h-8 rounded shadow-md" :class="getClassFromColor(bet.color)" />
        <span>{{ bet.amount }}</span>
      </div>

      <span class="w-14 uppercase text-gray-800 font-bold rounded shadow-md" :class="{
        'bg-green-300  shadow-green-400': bet.isWin,
        'bg-red-300  shadow-red-500': !bet.isWin
      }">
        {{ bet.isWin ? 'Win' : 'Lose' }}
      </span>

      <span class="px-6">{{ bet.formattedCreatedAt }}</span>

      <button class="focus:outline-none">
        <ChevronDownIcon :class="{ 'rotate-180': isOpen }" />
      </button>
    </div>

    <Suspense v-if="isOpen">
      <template #default>
        <RollActivity :bet="bet" />
      </template>
      <template #fallback>
        <RollActivityLoading />
      </template>
    </Suspense>
  </div>
</template>
