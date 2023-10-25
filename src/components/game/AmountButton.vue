<script setup lang="ts">
import { useGameStore } from '@/stores/game';

defineProps<{
  value: number;
}>();

const game = useGameStore();
</script>

<template>
  <button
    @click="game.addBalance(value)"
    class="grow px-4 h-12 bg-gray-100 hover:bg-gray-300 font-semibold rounded shadow-md shadow-gray-300"
  >
    {{ value }}
  </button>
</template>
