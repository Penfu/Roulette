<script setup lang="ts">
import { ref, computed } from "vue";
import { isEqual } from "lodash";

import { useSettingsStore } from "@/stores/settings";

const input = ref<HTMLInputElement | null>(null);

const store = useSettingsStore();

const selectedButtonIndex = ref(0);
const selectedButton = computed(() =>
  amountButtons.value.find((btn) => btn.index === selectedButtonIndex.value)
);

const amountButtons = ref([
  { index: 0, value: store.amounts[0] },
  { index: 1, value: store.amounts[1] },
  { index: 2, value: store.amounts[2] },
  { index: 3, value: store.amounts[3] },
]);
const sortedAmountButtons = computed(() => amountButtons.value.sort((a, b) => a.value - b.value));
const amounts = computed(() => amountButtons.value.map((btn) => btn.value));

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

const handleSelectAmountButton = (index: number) => {
  selectedButtonIndex.value = index;
  input.value?.focus();
};

const amountsHaveChanged = computed(() => !isEqual(amounts.value, store.amounts));
const canSave = computed(() => !error.value && amountsHaveChanged.value);

const handleSaveAmounts = () => {
  if (error.value) return;

  store.setAmounts(amounts.value);
};
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">Bet</h2>

    <div class="space-y-6">
      <div class="space-y-2">
        <h3>Amount buttons</h3>

        <p v-if="error" class="text-red">{{ error }}</p>
        <div class="flex flex-wrap gap-2 xs:gap-x-6">
          <button
            v-for="amount in sortedAmountButtons"
            :key="amount.index"
            @click="handleSelectAmountButton(amount.index)"
            class="px-4 xs:px-6 sm:px-8 py-2 grow font-semibold bg-gray-200 hover:bg-gray-300 rounded shadow shadow-gray-300"
            :class="{
              'outline outline-3 outline-green': selectedButtonIndex === amount.index,
            }"
          >
            {{ amount.value }}
          </button>
        </div>

        <input
          v-model="selectedButton!.value"
          ref="input"
          name="amount"
          type="number"
          min="1"
          max="10000000000"
        />
      </div>

      <button @click="handleSaveAmounts" :disabled="!canSave" class="btn-primary w-full sm:w-auto">
        Save amounts
      </button>

      <p class="text-gray-700">
        The amount buttons are the buttons that you can click to bet a certain amount of coins.
      </p>
    </div>
  </section>
</template>
