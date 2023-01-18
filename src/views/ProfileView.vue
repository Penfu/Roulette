<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useUserStore } from "@/stores/user";
import { useNumberHelper } from "@/helpers/number";

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

const { pourcent } = useNumberHelper();

const auth = useUserStore();
const user = ref<User>();

const bets = ref([] as Bet[]);
const betsOffset = ref(0 as number);
const hasMoreBets = computed(() => bets.value.length >= betsOffset.value);

const userStats = ref({
  bets_on_red: 0,
  bets_on_black: 0,
  bets_on_green: 0,
  red_wins: 0,
  black_wins: 0,
  green_wins: 0,
  total_bet: 0,
});

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
  bets.value.push(...await user.value?.fetchBets(betsOffset.value) ?? []);
  betsOffset.value += 10;
};

onMounted(async () => {
  user.value = await UserProvider.fetchUser(props.name);
  userStats.value = await user.value.fetchStats();
  loadBets();
});
</script>

<template>
  <main class="flex flex-col space-y-8 md:space-y-10">
    <!-- User -->
    <div class="p-8 bg-white rounded-lg shadow shadow-gray-300">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="grow flex space-x-8">
          <!-- Avatar -->
          <div>
            <div class="w-32 h-32 bg-gray-600 rounded-lg"></div>
          </div>

          <!-- Description -->
          <div class="grow flex flex-col">
            <div class="grow">
              <div v-if="user">
                <h3 class="text-3xl font-bold">
                  {{ isMyProfile? "My profile " + user?.name : user?.name }}
                </h3>
                <h4>{{ user?.email }}</h4>
              </div>
              <div v-else class="space-y-2 animate-pulse">
                <div class="h-8 w-52 bg-gray-400 rounded"></div>
                <div class="h-4 w-52 bg-gray-400 rounded"></div>
              </div>
            </div>
            <span v-if="user">Joined {{ user?.formatedCreatedAt }}</span>
            <div v-else class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold">{{ user?.balance }} coins</span>
        </div>
      </div>
    </div>

    <!-- Global Stats -->
    <div v-if="userStats.total_bet" class="flex flex-col md:flex-row gap-4 justify-items-center">
      <div
        class="basis-1/3 py-4 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300">
        <span class="text-3xl font-bold">{{ betCount }}</span>
        <span class="text-xl text-gray-700">Bets</span>
      </div>
      <div
        class="basis-1/3 py-4 lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300">
        <span class="text-3xl font-bold">{{ betWinrate }}%</span>
        <span class="text-xl text-gray-700">Wins</span>
      </div>
      <div
        class="basis-1/3 py-4 lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300">
        <span class="text-3xl font-bold">{{ betAverage }}</span>
        <span class="text-xl text-gray-700">Average coins bet</span>
      </div>
    </div>
    <div v-else class="flex flex-col md:flex-row gap-4 justify-items-center">
      <div
        class="basis-1/3 py-4 flex flex-col justify-center items-center space-y-4 bg-white rounded-lg shadow shadow-gray-300">
        <div class="h-6 w-52 bg-gray-400 rounded animate-pulse"></div>
        <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
      </div>
      <div
        class="basis-1/3 py-4 flex flex-col justify-center items-center space-y-4 bg-white rounded-lg shadow shadow-gray-300">
        <div class="h-6 w-52 bg-gray-400 rounded animate-pulse"></div>
        <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
      </div>
      <div
        class="basis-1/3 py-4 flex flex-col justify-center items-center space-y-4 bg-white rounded-lg shadow shadow-gray-300">
        <div class="h-6 w-52 bg-gray-400 rounded animate-pulse"></div>
        <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
      </div>
    </div>

    <!-- Bets Stats -->
    <div v-if="userStats.total_bet" class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <BetStatsOnColor color="red" :win="userStats.red_wins" :count="userStats.bets_on_red" />
      <BetStatsOnColor color="black" :win="userStats.black_wins" :count="userStats.bets_on_black" />
      <BetStatsOnColor color="green" :win="userStats.green_wins" :count="userStats.bets_on_green" />
    </div>
    <!-- Bets Stats Skeleton -->
    <div v-else class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <div class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
        <div class="p-8 bg-gray-600 rounded shadow-md animate-pulse"></div>
        <div class="text-xl space-y-2">
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
        <div class="p-8 bg-gray-600 rounded shadow-md animate-pulse"></div>
        <div class="text-xl space-y-2">
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
      <div class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300">
        <div class="p-8 bg-gray-600 rounded shadow-md animate-pulse"></div>
        <div class="text-xl space-y-2">
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Bets Activity -->
    <div class="grow p-8 bg-white rounded-lg shadow shadow-gray-300 space-y-4">
      <h3 class="text-gray-700 font-medium text-xl">Bets History</h3>
      <div class="space-y-4 text-center">
        <div v-for="(bet, index) in bets" :key="index">
          <BetActivity :bet="(bet as Bet)" />
        </div>

        <button v-show="bets.length > 0 && hasMoreBets"
          class="px-6 py-3 md:py-2 w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white text-lg rounded-md shadow-md shadow-gray-300" @click="loadBets">
          Load more
        </button>
      </div>
    </div>
  </main>
</template>
