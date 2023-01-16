<script setup lang="ts">
import type Bet from "@/models/bet";

defineProps<{
  bet: Bet;
}>();
</script>

<template>
  <RouterLink :to="'/profile/' + bet.user" class="py-1 px-4 flex bg-gray-200 rounded shadow-md shadow-gray-300 hover:cursor-pointer hover:bg-gray-300">
    <label class="grow pointer-events-none">{{ bet.user }}</label>
    <label class="pointer-events-none">{{ bet.amount }}</label>
  </RouterLink>
</template>
