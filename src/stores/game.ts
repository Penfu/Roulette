import { ref } from "vue";
import { defineStore } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useBet } from "@/composables/useBet";
import { RollStep } from "@/enums/step";

import type Roll from "@/interfaces/roll";
import type Bet from "@/interfaces/bet";

export const useGameStore = defineStore("game", () => {
  const auth = useAuthStore();
  const { addBet } = useBet();

  const step = ref(RollStep.DEFAULT);
  const timer = ref(0);
  const balance = ref(0);
  const result = ref<Roll>();
  const histories = ref<Roll[]>([]);

  const addBalance = (amount: number) => {
    if (auth.user.balance < amount) {
      console.log("You don't have enough money!");
      return;
    }

    auth.user.balance -= amount;
    balance.value += amount;
  }

  const allInBalance = () => {
    addBalance(auth.user.balance);
  }

  const resetBalance = () => {
    auth.user.balance += balance.value;
    balance.value = 0;
  }

  const makeBet = async (color: string) => {
    if (step.value !== RollStep.BET) {
      console.log("Bets are closed!");
      return;
    }
    if (balance.value === 0) {
      console.log("Select an amount to bet!");
      return;
    }

    const bet = { color, amount: balance.value, user: auth.user.name } as Bet;
    balance.value = 0;

    await addBet(bet);
  }

  return {
    step,
    timer,
    balance,
    addBalance,
    allInBalance,
    resetBalance,
    makeBet,
    result,
    histories,
  };
});
