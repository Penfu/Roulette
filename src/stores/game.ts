import { ref } from "vue";
import { defineStore } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { RollStep } from "@/enums/step";

import type Roll from "@/interfaces/roll";
import Bet from "@/models/bet";

import BetProvider from "@/providers/bet";

export const useGameStore = defineStore("game", () => {
  const auth = useAuthStore();

  const step = ref(RollStep.DEFAULT);
  const timer = ref(0);
  const balance = ref(0);
  const result = ref<Roll>();
  const histories = ref<Roll[]>([]);

  function addBalance(amount: number) {
     if (auth.user.balance < amount) {
       console.log("You don't have enough money!");
       return;
     }

     auth.user.balance -= amount;
     balance.value += amount;
  };

  function allInBalance() {
    addBalance(auth.user.balance);
  };

  function resetBalance() {
    auth.user.balance += balance.value;
    balance.value = 0;
  };

  async function makeBet(color: string) {
      if (step.value !== RollStep.BET) {
        console.log("Bets are closed!");
        return;
      }
      if (balance.value === 0) {
        console.log("Select an amount to bet!");
        return;
      }

      const bet = new Bet(color, balance.value, auth.user.name);
      balance.value = 0;

      await BetProvider.addBet(bet);
  }

  return {
    step,
    timer,
    balance, addBalance, allInBalance, resetBalance,
    makeBet,
    result,
    histories,
  };
});
