import axios from "axios";

import type Bet from "@/models/bet";

export default class BetProvider {
  public static async addBet(bet: Bet) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
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
