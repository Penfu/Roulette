<script setup lang="ts">
import { ref, watch } from "vue";
import anime from "animejs";

import type Bet from "@/models/Bet";

const props = defineProps<{
  bet: Bet;
}>();

const amount = ref(props.bet.amount);

watch(
  () => props.bet.amount, (newAmount, oldAmount) => {
    anime({
      targets: amount,
      value: [oldAmount, newAmount],
      round: 1,
      duration: 500,
      easing: "linear",
    });
  }
);
</script>

<template>
  <RouterLink :to="'/profile/' + bet.user"
    class="py-1 px-4 flex bg-gray-200 rounded shadow-md shadow-gray-300 hover:cursor-pointer hover:bg-gray-300">
    <label class="grow pointer-events-none">{{ bet.user }}</label>
    <label class="pointer-events-none">{{ amount }}</label>
  </RouterLink>
</template>
