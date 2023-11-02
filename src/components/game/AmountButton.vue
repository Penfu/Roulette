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
    class="btn grow h-[3.45rem] bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300"
  >
    {{ value }}
  </button>
</template>
