<script lang="ts">
import axios from "axios";

export default {
  name: "LeaderboardView",
  data() {
    return {
      loading: true,
      search: "" as string,
      users: [] as Array<{ name: string; balance: number; rank: number }>,
    };
  },
  computed: {
    podium() {
      if (this.loading)
        return [
          { name: "", balance: null, rank: 1 },
          { name: "", balance: null, rank: 2 },
          { name: "", balance: null, rank: 3 },
        ];
      else return this.users.slice(0, 3);
    },
    filteredLeaderboard() {
      return this.users
        .slice(3)
        .filter((user) =>
          user.name.toLowerCase().includes(this.search.toLowerCase())
        );
    },
  },
  async mounted() {
    const response = await axios.get("http://localhost:8000/api/users");

    this.users = response.data
      .sort((a: any, b: any) => b.balance - a.balance)
      .map((user: any, index: number) => {
        return {
          name: user.name,
          balance: user.balance,
          rank: index + 1,
        };
      });

    this.loading = false;
  },
};
</script>

<template>
  <main class="h-screen flex flex-col space-y-4">
    <!-- Podium -->
    <div
      class="flex flex-col lg:flex-row bg-white rounded-lg shadow shadow-gray-300"
    >
      <div
        v-for="user in podium"
        :key="user.name"
        class="w-full py-6 sm:py-8 lg:py-10 flex items-center justify-center bg-white first:bg-yellow-400 first:rounded-t-lg last:rounded-b-lg lg:first:rounded-none lg:last:rounded-none lg:first:rounded-l-lg lg:last:rounded-r-lg"
      >
        <div class="basis-1/2 flex items-center space-x-16">
          <span class="w-full basis-1/3 text-5xl font-bold">
            {{ user.rank }}
          </span>
          <div v-if="loading" class="w-full flex flex-col basis-2/3 space-y-2 animate-pulse">
            <span class="w-32 h-5 bg-gray-500 rounded-xl"></span>
            <span class="w-32 h-5 bg-gray-500 rounded-xl"></span>
          </div>
          <div v-else class="w-full flex flex-col basis-2/3">
            <span class="font-semibold">{{ user.name }}</span>
            <span class="">{{ user.balance }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Search bar -->
    <div class="flex items-center bg-white rounded-lg shadow shadow-gray-300">
      <input
        v-model="search"
        type="text"
        class="grow py-4 px-8 rounded-lg outline-none"
        placeholder="Search for a user..."
      />
      <div class="p-4 w-24 bg-gray-200 rounded-r-lg text-center">
        <span v-if="loading" class="text-xl animate-pulse">...</span>
        <span v-else class="text-lg font-semibold">
          {{ filteredLeaderboard.length }} / {{ users.length - 3 }}
        </span>
      </div>
    </div>

    <!-- Ranking -->
    <div v-if="loading"
      class="h-full px-4 py-4 flex flex-col space-y-2 items-center bg-white rounded-lg shadow shadow-gray-300 overflow-y-auto animate-pulse">
        <div
          v-for="i in 10"
          :key="i"
          class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
        >
          <span class="w-6 h-5 bg-gray-500 rounded-xl"></span>
          <div class="grow flex">
            <span class="w-32 h-5 bg-gray-500 rounded-xl"></span>
          </div>
          <span class="w-24 h-5 bg-gray-500 rounded-xl"></span>
        </div>
    </div>
    <div v-else
      class="h-full px-4 py-4 flex flex-col space-y-2 items-center bg-white rounded-lg shadow shadow-gray-300 overflow-y-auto"
    >
      <div
        v-for="user in filteredLeaderboard"
        :key="user.name"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <span class="w-6">{{ user.rank }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </div>

      <div
        v-if="search && !filteredLeaderboard.length"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <p>No users found</p>
      </div>
    </div>

  </main>
</template>
