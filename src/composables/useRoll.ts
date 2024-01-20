import { ref } from "vue";
import axios from "@/axios.config";

import type Roll from "@/interfaces/roll";

export const useRoll = () => {
  const error = ref(null);
  const roll = ref<Roll>();

  const fetchRollFromBet = async (bet: number) => {
    const response = await axios.get(`/bets/${bet}/roll`);
    roll.value = response.data;
  };

  return { error, fetchRollFromBet, roll };
}
