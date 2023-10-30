import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const amountButtons = ref([1, 10, 100, 1000]);

  const setAmounts = (amount: number[]) => {
    amountButtons.value = amount;
  }

  return {
    amountButtons,
    setAmounts,
  };
}, { persist: true });
