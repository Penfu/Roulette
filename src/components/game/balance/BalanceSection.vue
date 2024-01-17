<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import anime from "animejs";

import { useSettingsStore } from "@/stores/settings";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game";

import AmountButton from "@/components/game/balance/AmountButton.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";

const { amountButtons } = useSettingsStore();

const auth = useAuthStore();
const { isAuth, loading } = storeToRefs(auth);

const game = useGameStore();
const { balance } = storeToRefs(game);
const { allInBalance, resetBalance } = game;

const isReady = computed(() => isAuth.value && !loading.value);

const balanceToDisplay = ref(0);
watch(
  () => balance.value,
  (newBalance, oldBalance) => {
    anime({
      targets: balanceToDisplay,
      value: [oldBalance, newBalance],
      round: 1,
      duration: 500,
      easing: "linear",
    });
  }
);

const handleAllIn = () => {
  if (!isReady.value) {
    return;
  }

  allInBalance();
};
</script>

<template>
  <div>
    <h3 class="pb-1 text-xl font-bold uppercase">Choose an amount</h3>
    <div class="mt-2 bg-bkg-1 rounded-lg shadow shadow-gray-300">
      <div class="px-4 py-2 flex flex-col xs:flex-row xs:justify-between gap-8 md:gap-16 text-xl">
        <div class="w-full flex flex-wrap gap-2">
          <AmountButton v-for="amount in amountButtons" :key="amount" :value="amount" />
        </div>

        <div class="w-auto flex flex-col lg:flex-row lg:justify-end gap-2">
          <span
            class="px-2 md:px-4 py-3 xs:min-w-[4rem] sm:min-w-[8rem] flex justify-center items-center rounded box-border border-3 border-gray-200 shadow shadow-gray-300"
          >
            {{ balanceToDisplay }}
          </span>
          <div class="flex space-x-2">
            <button
              :disabled="!isReady"
              @click="handleAllIn"
              class="btn basis-1/2 bg-gray-200 hover:bg-gray-300 whitespace-nowrap rounded shadow shadow-gray-300"
            >
              All In
            </button>
            <button
              :disabled="!isReady"
              @click="resetBalance"
              aria-label="Reset balance"
              class="btn basis-1/2 flex justify-center items-center bg-red hover:bg-red-dark text-white stroke-2 rounded border-red shadow shadow-red-300"
            >
              <CrossIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>