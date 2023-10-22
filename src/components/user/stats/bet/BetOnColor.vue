<script setup lang="ts">
import { computed } from "vue";

import getClassFromColor from "@/helpers/color";
import { useNumberHelper } from "@/helpers/number";

const props = defineProps<{
  color: string;
  win: number;
  count: number;
}>();

const { percent } = useNumberHelper();

const winrate = computed(() => percent(props.win, props.count));
</script>

<template>
  <div class="p-2 w-full flex items-center space-x-4 bg-white rounded-lg shadow shadow-gray-300">
    <span class="p-6 xs:p-8 rounded shadow-md" :class="getClassFromColor(color)" />

    <div class="grow flex flex-row md:flex-col lg:flex-row justify-center lg:items-center">
      <div class="grow md:text-center space-x-1 text-xl">
        <span class="font-bold">{{ count }}</span>
        <span class="text-gray-800">{{ count > 1 ? "bets" : "bet" }}</span>
      </div>

      <div v-show="props.count > 0" class="grow text-center space-x-1 text-xl">
        <span class="font-bold">{{ winrate }}%</span>
        <span class="text-gray-800">wins</span>
      </div>
    </div>
  </div>
</template>
