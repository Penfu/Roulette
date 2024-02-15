import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useAuthStore } from '@/stores/auth';

import { RollStep } from '@/enums/step';
import type Roll from '@/interfaces/roll';
import type Bet from '@/interfaces/bet';

export const useGameStore = defineStore('game', () => {
  const auth = useAuthStore();

  const step = ref(RollStep.DEFAULT);
  const timer = ref(0);
  const balance = ref(0);
  const result = ref<Roll>();
  const bets = ref({ red: [], black: [], green: [] } as Record<string, Bet[]>);
  const history = ref<Roll[]>();

  const addBalance = (amount: number) => {
    if (auth.user === null) {
      return;
    }

    if (auth.user.balance < amount) {
      return;
    }

    auth.user.balance -= amount;
    balance.value += amount;
  };

  const allInBalance = () => {
    if (auth.user === null) {
      return;
    }

    balance.value += auth.user.balance;
    auth.user.balance = 0;
  };

  const resetBalance = () => {
    if (auth.user === null) {
      return;
    }

    auth.user.balance += balance.value;
    balance.value = 0;
  };

  return {
    step,
    timer,
    balance,
    addBalance,
    allInBalance,
    resetBalance,
    bets,
    result,
    history,
  };
});
