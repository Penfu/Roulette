<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";

defineProps<{
  value: number;
}>();

const auth = useAuthStore();
const { isAuth, loading } = storeToRefs(auth);

const game = useGameStore();
const { addBalance } = game;

const isReady = computed(() => isAuth.value && !loading.value);

const handleAddAmountToBalance = (amount: number) => {
  if (!isReady.value) {
    return;
  }

  addBalance(amount);
};
</script>

<template>
  <button
    :disabled="!isReady"
    @click="handleAddAmountToBalance(value)"
    class="btn grow h-[3.45rem] bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300"
  >
    {{ value }}
  </button>
</template>
