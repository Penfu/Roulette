<script setup lang="ts">
import type Bet from "@/models/Bet";

defineProps<{
  bet: Bet;
}>();
</script>

<template>
  <div class="py-1 px-4 flex bg-gray-200 rounded shadow shadow-gray-300">
    <label class="grow">{{ bet.user }}</label>
    <label>{{ bet.value }}</label>
  </div>
</template>
