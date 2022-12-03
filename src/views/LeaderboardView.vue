<script lang="ts">
import axios from "axios";

export default {
  name: "LeaderboardView",
  data() {
    return {
      search: "" as string,
      users: [] as Array<{ name: string; balance: number; rank: number }>,
    };
  },
  computed: {
    podium() {
      return this.users.slice(0, 3);
    },
  },
  async mounted() {
    this.users = await this.getUsers();
  },
  methods: {
    async getUsers() {
      const response = await axios.get("http://localhost:8000/api/users");

      return response.data
        .sort((a: any, b: any) => b.balance - a.balance)
        .map((user: any, index: number) => {
          return {
            name: user.name,
            balance: user.balance,
            rank: index + 1,
          };
        });
    },

    filteredLeaderboard() {
      return this.users.slice(3).filter((user) =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
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
        class="w-full py-4 sm:py-8 lg:py-10 flex items-center justify-center bg-white first:bg-yellow-400 first:rounded-t-lg last:rounded-b-lg lg:first:rounded-none lg:last:rounded-none lg:first:rounded-l-lg lg:last:rounded-r-lg"
      >
        <div class="basis-1/2 flex items-center space-x-16">
          <span class="w-full basis-1/3 text-5xl font-bold">
            {{ user.rank }}
          </span>
          <div class="w-full flex flex-col basis-2/3">
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
        <span class="text-lg">{{ filteredLeaderboard().length }} / {{( users.length - 3)}}</span>
      </div>
    </div>

    <!-- Ranking -->
    <div
      class="h-auto px-4 py-4 flex flex-col space-y-2 items-center bg-white rounded-lg shadow shadow-gray-300 overflow-y-auto"
    >
      <div
        v-for="user in filteredLeaderboard()"
        :key="user.name"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <span class="w-6">{{ user.rank }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </div>

      <div
        v-if="search && !filteredLeaderboard().length"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <p>No users found</p>
      </div>
    </div>

    <!-- Footer -->
    <div></div>
  </main>
</template>
