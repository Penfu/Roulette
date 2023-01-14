<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";

import type User from "@/models/user";
import UserProvider from "@/providers/user";
import type Bet from "@/models/bet";

import BetStatsOnColor from "@/components/user/stats/bet/BetOnColor.vue";
import BetActivity from "@/components/user/activity/bet/BetActivity.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const auth = useUserStore();
const user = ref({} as User);
const bets = ref([] as Bet[]);

const isMyProfile = computed(() => auth.user?.name === props.name);
const userStats = ref({
	bets_on_red: 0,
	bets_on_black: 0,
	bets_on_green: 0,
	red_wins: 0,
	black_wins: 0,
	green_wins: 0,
	total_bet: 0,
	total_winnings: 0
});

const betCount = computed(() => userStats.value.bets_on_red + userStats.value.bets_on_black + userStats.value.bets_on_green);
const betWin = computed(() => userStats.value.red_wins + userStats.value.black_wins + userStats.value.green_wins);
const betWinrate = computed(() => (betWin.value / betCount.value * 100).toFixed(2));
const betAverage = computed(() => (userStats.value.total_bet / betCount.value).toFixed(2));

onMounted(async () => {;
  user.value = await UserProvider.fetchUser(props.name);
  userStats.value = await user.value.fetchStats();
  bets.value = await user.value.fetchBets();
});
</script>

<template>
  <main class="flex flex-col space-y-8 md:space-y-10">
    <!-- User -->
    <div class="p-8 bg-white rounded-lg shadow shadow-gray-300">
      <div class="flex space-x-8">
        <!-- Avatar -->
        <div>
          <div class="w-32 h-32 bg-gray-600 rounded-lg"></div>
        </div>

        <!-- Description -->
        <div class="grow flex flex-col">
          <div class="grow">
            <h3 class="text-3xl font-bold">{{ isMyProfile ? "My profile " + user?.name : user?.name }}</h3>
            <h4>{{ user?.email }}</h4>
          </div>
          <span>Joined {{ user?.formatedCreatedAt }}</span>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold">{{ user?.balance }}$</span>
          <span>Balance</span>
        </div>
      </div>
    </div>

    <!-- Global Stats -->
    <div
      class="lg:mx-8 xl:mx-32 grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center"
    >
      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">{{ betCount }}</span>
        <span class="text-xl text-gray-700">Bets</span>
      </div>

      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">{{ betWinrate }}%</span>
        <span class="text-xl text-gray-700">Wins</span>
      </div>

      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">{{ betAverage }}</span>
        <span class="text-xl text-gray-700">Average coins bet</span>
      </div>
    </div>

    <!-- Bets Stats -->
    <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <BetStatsOnColor color="red" :win="userStats.red_wins" :count="userStats.bets_on_red" />
      <BetStatsOnColor color="black" :win="userStats.black_wins" :count="userStats.bets_on_black" />
      <BetStatsOnColor color="green" :win="userStats.green_wins" :count="userStats.bets_on_green" />
    </div>

    <!-- Bets Activity -->
    <div class="grow p-8 bg-white rounded-lg shadow shadow-gray-300 space-y-8">
      <h3 class="text-gray-700 font-medium text-xl">Bets History</h3>
      <div class="space-y-4">
        <div v-for="(bet, index) in bets" :key="index">
          <BetActivity :bet="(bet as Bet)" />
        </div>
      </div>
    </div>
  </main>
</template>
