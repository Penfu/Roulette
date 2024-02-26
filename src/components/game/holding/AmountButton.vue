<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const props = defineProps<{
  onSelect: () => void;
  value: number;
}>();

const game = useGameStore();
const { addHolding } = game;

const handleAddHolding = (amount: number) => {
  props.onSelect();
  addHolding(amount);
};
</script>

<template>
  <button
    @click="handleAddHolding(value)"
    class="btn grow h-max bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300"
  >
    {{ value }}
  </button>
</template>
