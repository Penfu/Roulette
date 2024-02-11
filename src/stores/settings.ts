import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const amounts = ref([1, 10, 100, 1000]);

    const setAmounts = (newAmounts: number[]) => {
      amounts.value = newAmounts;
    };

    return {
      amounts,
      setAmounts,
    };
  },
  { persist: true },
);
