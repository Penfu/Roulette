<script setup lang="ts">
import { computed } from "vue";

import { classFromColor } from "@/helpers/color";
import { useNumberHelper } from "@/helpers/number";

const props = defineProps<{
  color: string;
  win?: number;
  count?: number;
}>();

const { percent } = useNumberHelper();

const winrate = computed(() => props.win && props.count ? `${ percent(props.win, props.count)}%` : 0);
</script>

<template>
  <div class="w-full p-2 flex items-center space-x-4 bg-gray-100 rounded-lg shadow">
    <span class="p-6 rounded shadow" :class="classFromColor(color)" />

    <div class="grow flex flex-row md:flex-col lg:flex-row justify-center lg:items-center text-lg md:text-xl lg:text-center">
      <div class="grow space-x-1">
        <span class="font-bold">{{ count }}</span>
        <span>{{ count > 1 ? "bets" : "bet" }}</span>
      </div>

      <div class="grow space-x-1">
        <span class="font-bold">{{ winrate }}</span>
        <span>wins</span>
      </div>
    </div>
  </div>
</template>
