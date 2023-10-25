<script setup lang="ts">
import { computed, ref } from "vue";

const selectedButtonIndex = ref(0);
const selectedButton = computed(() =>
  amountButtons.value.find((btn) => btn.index === selectedButtonIndex.value)
);

const amountButtons = ref([
  { index: 0, value: 1 },
  { index: 1, value: 10 },
  { index: 2, value: 100 },
  { index: 3, value: 1000 },
]);
const sortedAmountButtons = computed(() => amountButtons.value.sort((a, b) => a.value - b.value));

const error = computed(() => {
  if (amountButtons.value.some((btn) => btn.value <= 0)) {
    return "Amounts must be greater than 0";
  }

  if (
    amountButtons.value.some(
      (btn) => amountButtons.value.filter((b) => b.value === btn.value).length > 1
    )
  ) {
    return "Amounts must be unique";
  }

  return "";
});
</script>

<template>
  <main class="my-4 space-y-4">
    <h1 class="text-4xl font-bold">Settings</h1>

    <div class="px-8 py-6 bg-white rounded-lg space-y-4">
      <h2 class="text-2xl font-bold">Bet</h2>

      <div class="space-y-6">
        <div class="space-y-4">
          <h3 class="text-xl">Amount buttons</h3>
          <p v-if="error" class="text-red-500">{{ error }}</p>
          <div class="flex flex-wrap gap-2 xs:gap-x-6">
            <button
              v-for="amount in sortedAmountButtons"
              :key="amount.index"
              @click="selectedButtonIndex = amount.index"
              class="px-4 xs:px-6 sm:px-8 py-3 grow font-semibold bg-gray-100 hover:bg-gray-200 rounded shadow shadow-gray-300"
              :class="{
                'outline outline-2 outline-green-400': selectedButtonIndex === amount.index,
              }"
            >
              {{ amount.value }}
            </button>
          </div>

          <input
            v-model="selectedButton!.value"
            type="number"
            min="1"
            max="10000000000"
            class="block px-4 py-3 w-full border-2 border-gray-300 rounded-lg"
          />
        </div>

        <button
          class="px-6 py-3 text-white font-bold whitespace-nowrap bg-green-400 hover:bg-green-500 rounded-lg"
        >
          Save amounts
        </button>

        <p class="text-gray-500">
          The amount buttons are the buttons that you can click to bet a certain amount of coins.
        </p>
      </div>
    </div>
  </main>
</template>
