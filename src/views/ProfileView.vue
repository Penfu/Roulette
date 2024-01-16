<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import moment from "moment";

import { useProfile } from "@/composables/useProfile";

import { useNumberHelper } from "@/helpers/number";

import Avatar from "@/components/avatar/Avatar.vue";
import BetStatsOnColor from "@/components/user/stats/bet/BetOnColor.vue";
import BetActivity from "@/components/user/activity/bet/BetActivity.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { percent } = useNumberHelper();

const { user, fetchUser, stats, fetchUserStats, bets, fetchUserBets } = useProfile();

const betsOffset = ref(0 as number);
const betsAreLoad = ref(false);
const userStatsAreLoad = ref(false);

const betCount = computed(
  () => stats.value.bets_on_red + stats.value.bets_on_black + stats.value.bets_on_green
);
const betWin = computed(
  () => stats.value.red_wins + stats.value.black_wins + stats.value.green_wins
);
const betWinrate = computed(() => percent(betWin.value, betCount.value));
const betAverage = computed(() => percent(stats.value.total_bet, betCount.value));

const loadBets = async () => {
  await fetchUserBets(props.name, betsOffset.value);
  betsOffset.value += 10;
};

onMounted(async () => {
  await fetchUser(props.name);

  await fetchUserStats(props.name);
  userStatsAreLoad.value = true;

  loadBets();
  betsAreLoad.value = true;
});

const av = {
  backgroundColor: ["a7f3d0"],
  hair: ["short16"],
  hairColor: ["afafaf"],
  mouth: ["variant28"],
  eyes: ["variant24"],
  eyebrows: ["variant08"],
  skinColor: ["f2d3b1"],
  features: [],
  glasses: [],
  earrings: [],
};
</script>

<template>
  <main class="flex flex-col space-y-8 md:space-y-10">
    <!-- User info-->
    <div class="p-2 md:p-4 bg-bkg-1 rounded-lg shadow shadow-gray-300">
      <div v-if="user" class="flex flex-col md:flex-row gap-8">
        <div class="grow flex space-x-8">
          <!-- Avatar -->
          <div class="hidden sm:block">
            <Avatar class="w-44" :svg="createAvatar(adventurer, user.avatar).toString()" />
          </div>

          <!-- Description -->
          <div class="grow flex flex-col">
            <div class="grow">
              <h3 class="text-3xl font-bold">
                {{ user.name }}
              </h3>
              <h4>{{ user.email }}</h4>
            </div>
            <span>Joined {{ moment(user.created_at).fromNow() }}</span>
          </div>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold uppercase">{{ user?.balance }} coins</span>
        </div>
      </div>
      <!-- User Skeleton -->
      <div v-else class="w-full h-40 bg-skeleton rounded-lg animate-pulse"></div>
    </div>

    <!-- User stats -->
    <div class="space-y-4">
      <h2 class="text-3xl font-bold">Stats</h2>

      <!-- Global Stats -->
      <div v-if="userStatsAreLoad" class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <!-- Bet count -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-bkg-1 rounded-lg shadow shadow-gray-300"
        >
          <span class="text-2xl md:text-3xl font-bold">{{ betCount }}</span>
          <span class="text-lg md:text-xl text-gray-700">Bets</span>
        </div>
        <!-- Winrate -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-bkg-1 rounded-lg shadow shadow-gray-300"
        >
          <span v-if="betCount > 0" class="text-2xl md:text-3xl font-bold">{{ betWinrate }}%</span>
          <span v-else class="text-2xl md:text-3xl font-bold">0</span>

          <span class="text-lg md:text-xl text-gray-700">Wins</span>
        </div>
        <!-- Average bet -->
        <div
          class="w-full py-2 md:py-4 flex flex-col justify-center items-center bg-bkg-1 rounded-lg shadow shadow-gray-300"
        >
          <span v-if="betCount > 0" class="text-2xl md:text-3xl font-bold">{{ betAverage }}</span>
          <span v-else class="text-3xl font-bold">0</span>

          <span class="text-lg md:text-xl text-gray-700">Average coins bet</span>
        </div>
      </div>

      <!-- Global Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
        <div
          v-for="x in 3"
          :key="x"
          class="w-full py-4 flex flex-col justify-center items-center space-y-4 bg-bkg-1 rounded-lg shadow shadow-gray-300"
        >
          <div class="h-6 w-52 bg-skeleton rounded animate-pulse"></div>
          <div class="h-4 w-52 bg-skeleton rounded animate-pulse"></div>
        </div>
      </div>

      <!-- Bets Stats -->
      <div
        v-if="userStatsAreLoad"
        class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
      >
        <BetStatsOnColor color="red" :win="stats.red_wins" :count="stats.bets_on_red" />
        <BetStatsOnColor color="black" :win="stats.black_wins" :count="stats.bets_on_black" />
        <BetStatsOnColor color="green" :win="stats.green_wins" :count="stats.bets_on_green" />
      </div>
      <!-- Bets Stats Skeleton -->
      <div v-else class="flex flex-col md:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
        <div
          v-for="x in 3"
          :key="x"
          class="p-2 w-full flex items-center space-x-8 bg-bkg-1 rounded-lg shadow shadow-gray-300"
        >
          <div class="p-8 bg-gray-600 rounded shadow animate-pulse"></div>
          <div class="w-full text-xl space-y-2">
            <div class="h-4 w-2/3 bg-skeleton rounded animate-pulse"></div>
            <div class="h-4 w-2/3 bg-skeleton rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bet history -->
    <div class="flex flex-col space-y-4">
      <h2 class="text-3xl font-bold">Bets</h2>
      <div class="p-4 grow bg-bkg-1 rounded-lg shadow shadow-gray-300 space-y-6">
        <!-- Bets Activity -->
        <div v-if="betsAreLoad" class="space-y-3">
          <BetActivity v-for="(bet, index) in bets" :key="index" :bet="bet" />
        </div>

        <button
          v-show="bets.length > 0"
          class="btn w-full md:w-auto bg-black hover:bg-black-dark text-white"
          @click="loadBets()"
        >
          Load more
        </button>
      </div>
    </div>
  </main>
</template>
