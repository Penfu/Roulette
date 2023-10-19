import { ref } from "vue";
import axios from "axios";

import type User from "@/interfaces/user";
import type Bet from "@/interfaces/bet";

export function useProfile() {
  const error = ref(null);
  const user = ref<User>();
  const stats = ref({
    bets_on_red: 0,
    bets_on_black: 0,
    bets_on_green: 0,
    red_wins: 0,
    black_wins: 0,
    green_wins: 0,
    total_bet: 0,
  });
  const bets = ref<Bet[]>([]);

  async function fetchUser(name: string) {
    const response = await axios.get(`/users/${name}`);
    user.value = response.data;
  }

  async function fetchUserStats(name: string) {
    const response = await axios.get(`/users/${name}/stats`);
    stats.value = response.data;
  }

  async function fetchUserBets(name: string, offset: number, limit: number = 10) {
    const response = await axios.get(`/users/${name}/bets?offset=${offset}&limit=${limit}`);
    bets.value.push(...response.data.map((bet: any) => ({ ...bet, isWin: bet.is_win, createdAt: bet.created_at })));
  }

  return { error, fetchUser, user, fetchUserStats, stats, fetchUserBets, bets };
}
