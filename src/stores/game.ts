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
  const holding = ref(0);
  const result = ref<Roll>();
  const bets = ref({ red: [], black: [], green: [] } as Record<string, Bet[]>);
  const history = ref<Roll[]>();

  const addHolding = (amount: number) => {
    if (auth.user === null) {
      return;
    }

    if (amount > auth.user.balance) {
      return;
    }

    auth.user.balance -= amount;
    holding.value += amount;
  };

  const allInHolding = () => {
    if (auth.user === null) {
      return;
    }

    holding.value += auth.user.balance;
    auth.user.balance = 0;
  };

  const resetHolding = () => {
    if (auth.user === null) {
      return;
    }

    auth.user.balance += holding.value;
    holding.value = 0;
  };

  return {
    step,
    timer,
    holding,
    addHolding,
    allInHolding,
    resetHolding,
    bets,
    result,
    history,
  };
});
