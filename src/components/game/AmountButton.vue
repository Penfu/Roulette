<script setup lang="ts">

import { useGameStore } from '@/stores/game';

defineProps<{
  value?: number;
}>();

const game = useGameStore();
</script>

<template>
  <button
    @click="value ? game.addBalance(value) : game.allInBalance()"
    class="h-12 w-full lg:w-32 bg-gray-100 hover:bg-gray-300 font-semibold rounded shadow-md shadow-gray-300"
  >
    {{ value ?? "All In" }}
  </button>
</template>
