<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useNumberHelper } from "@/helpers/number";

import UserProvider from "@/providers/user";

import type User from "@/models/User";
import type Bet from "@/models/Bet";

import BetStatsOnColor from "@/components/user/stats/bet/BetOnColor.vue";
import BetActivity from "@/components/user/activity/bet/BetActivity.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { pourcent } = useNumberHelper();

const auth = useAuthStore();
const user = ref<User>();

const bets = ref([] as Bet[]);
const betsOffset = ref(0 as number);
const hasMoreBets = computed(() => bets.value.length >= betsOffset.value);
const betsAreLoad = ref(false);

const userStats = ref({
  bets_on_red: 0,
  bets_on_black: 0,
  bets_on_green: 0,
  red_wins: 0,
  black_wins: 0,
  green_wins: 0,
  total_bet: 0,
});
const userStatsAreLoad = ref(false);

const isMyProfile = computed(() => auth.user?.name === props.name);

const betCount = computed(
  () => userStats.value.bets_on_red + userStats.value.bets_on_black + userStats.value.bets_on_green
);
const betWin = computed(
  () => userStats.value.red_wins + userStats.value.black_wins + userStats.value.green_wins
);
const betWinrate = computed(() => pourcent(betWin.value, betCount.value));
const betAverage = computed(() => pourcent(userStats.value.total_bet, betCount.value));

const loadBets = async () => {
  const newBets = await user.value?.fetchBets(betsOffset.value) ?? [];
  bets.value.push(...newBets);
  betsOffset.value += 10;
};

onMounted(async () => {
  user.value = await UserProvider.fetchUser(props.name);

  userStats.value = await user.value.fetchStats();
  userStatsAreLoad.value = true;

  loadBets();
  betsAreLoad.value = true;
});
</script>

<template>
  <main class="flex flex-col space-y-8 md:space-y-10">
    <!-- User -->
    <div class="p-8 bg-white rounded-lg shadow shadow-gray-300">
      <div v-if="user" class="flex flex-col md:flex-row gap-8">
        <div class="grow flex space-x-8">
          <!-- Avatar -->
          <div>
            <div class="w-32 h-32 bg-gray-600 rounded-lg"></div>
          </div>

          <!-- Description -->
          <div class="grow flex flex-col">
            <div class="grow">
                <h3 class="text-3xl font-bold text-gray-800">
                  {{ user.name }}
                </h3>
                <h4>{{ user.email }}</h4>
            </div>
            <span>Joined {{ user?.formatedCreatedAt }}</span>
          </div>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold">{{ user?.balance }} coins</span>
        </div>
      </div>
      <!-- User Skeleton -->
      <div v-else>

      </div>
    </div>

    <!-- Stats -->
    <div class="space-y-4">
      <h2 class="text-3xl text-gray-800 font-bold">Stats</h2>

      <!-- Global Stats -->
      <div v-if="userStatsAreLoad" class="flex flex-col md:flex-row gap-4 items-center">
        <div
          class="w-full py-4 flex flex-col justify-center items-center space-y-1 bg-white rounded-lg shadow shadow-gray-300">
          <span class="text-3xl font-bold">{{ betCount }}</span>
          <span class="text-xl text-gray-700">Bets</span>
        </div>
        <div
          class="w-full py-4 flex flex-col justify-center items-center space-y-1 bg-white rounded-lg shadow shadow-gray-300">
          <span v-if="betCount > 0" class="text-3xl font-bold">{{ betWinrate }}%</span>
          <span v-else class="text-3xl font-bold">0</span>

          <span class="text-xl text-gray-700">Wins</span>
        </div>
        <div
          class="w-full py-4 flex flex-col justify-center items-center space-y-1 bg-white rounded-lg shadow shadow-gray-300">
          <span v-if="betCount > 0" class="text-3xl font-bold">{{ betAverage }}</span>
          <span v-else class="text-3xl font-bold">0</span>

          <span class="text-xl text-gray-700">Average coins bet</span>
        </div>
      </div>
      <!-- Global Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row gap-4 items-center">
        <div v-for="x in 3" :key="x"
          class="w-full py-4 flex flex-col justify-center items-center space-y-4 bg-white rounded-lg shadow shadow-gray-300">
          <div class="h-6 w-52 bg-gray-400 rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>

      <!-- Bets Stats -->
      <div v-if="userStatsAreLoad" class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <BetStatsOnColor color="red" :win="userStats.red_wins" :count="userStats.bets_on_red" />
        <BetStatsOnColor color="black" :win="userStats.black_wins" :count="userStats.bets_on_black" />
        <BetStatsOnColor color="green" :win="userStats.green_wins" :count="userStats.bets_on_green" />
      </div>
      <!-- Bets Stats Skeleton -->
      <div v-else class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <div v-for="x in 3" :key="x"
          class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
          <div  class="p-8 bg-gray-600 rounded shadow-md animate-pulse"></div>
          <div class="w-full text-xl space-y-2">
            <div class="h-4 w-2/3 bg-gray-400 rounded animate-pulse"></div>
            <div class="h-4 w-2/3 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity -->
    <div class="grow flex flex-col space-y-4">
      <h2 class="text-3xl text-gray-800 font-bold">Bets</h2>
      <div class="p-4 grow bg-white rounded-lg shadow shadow-gray-300 space-y-4">
        <!-- Bets Activity -->
        <div v-if="betsAreLoad" class="space-y-4 text-center">
          <div v-for="(bet, index) in bets" :key="index">
            <BetActivity :bet="(bet as Bet)" />
          </div>

          <button v-show="bets.length > 0 && hasMoreBets"
            class="px-6 py-3 md:py-2 w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white text-lg rounded-md shadow-md shadow-gray-300"
            @click="loadBets">
            Load more
          </button>
        </div>
      </div>
    </div>

  </main>
</template>
