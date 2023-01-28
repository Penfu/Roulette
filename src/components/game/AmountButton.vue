<script setup lang="ts">

import { useGameStore } from '@/stores/game';

const props = defineProps<{
  value?: number;
}>();

const add = useGameStore().addBalance;
const allIn = useGameStore().allInBalance;
</script>

<template>
  <button
    @click="value ? add(value) : allIn()"
    class="h-12 w-full lg:w-32 bg-gray-100 hover:bg-gray-300 font-semibold rounded shadow-md shadow-gray-300"
  >
    {{ value ?? "All In" }}
  </button>
</template>
