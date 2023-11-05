import { ref } from "vue";
import axios from "axios";

import type Bet from "@/interfaces/bet";

export const useBet = () => {
  const error = ref(null);

  const addBet = async (bet: Bet) => {
    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
    await axios.post("/bets", bet, { headers: { "X-Socket-ID": window.Echo.socketId() } });
  }

  return { error, addBet };
}
