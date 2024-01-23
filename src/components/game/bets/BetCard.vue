<script setup lang="ts">
import { ref, watch } from "vue";
import anime from "animejs";

import type Bet from "@/interfaces/bet";

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
    class="px-4 py-2 flex justify-between bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300 cursor-pointer">
    <label class="grow pointer-events-none">{{ bet.user }}</label>
    <label class="font-bold pointer-events-none">{{ amount }}</label>
  </RouterLink>
</template>
