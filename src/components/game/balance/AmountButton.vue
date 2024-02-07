<script setup lang="ts">
import { useGameStore } from "@/stores/game";

const props = defineProps<{
  onSelect: () => void;
  enabled: boolean;
  value: number;
}>();

const game = useGameStore();
const { addBalance } = game;

const handleAddAmountToBalance = (amount: number) => {
  props.onSelect();
  addBalance(amount);
};
</script>

<template>
  <button
    :disabled="!enabled"
    @click="handleAddAmountToBalance(value)"
    class="btn grow h-max bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300"
  >
    {{ value }}
  </button>
</template>
