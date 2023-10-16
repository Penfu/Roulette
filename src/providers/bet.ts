import axios from "axios";

import { useAuthStore } from "@/stores/auth";
import type Bet from "@/models/bet";

const user = useAuthStore();

export default class BetProvider {
  public static async addBet(bet: Bet) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;

    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
    await axios.post(
      "/bets",
      {
        color: bet.color,
        amount: bet.amount,
      },
      {
        headers: {
          "X-Socket-ID": window.Echo.socketId(),
        },
      }
    );
  }
}
