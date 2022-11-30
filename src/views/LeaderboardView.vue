<script lang="ts">
import axios from "axios";

export default {
  name: "LeaderboardView",
  setup() {
    return {};
  },
  data() {
    return {
      users: [] as Array<{ name: string; balance: number }>,
    };
  },
  computed: {
    sortedUsers() {
      return this.users.sort((a, b) => b.balance - a.balance);
    },
    podium() {
      return this.sortedUsers.slice(0, 3);
    },
    others() {
      return this.sortedUsers.slice(3);
    },
  },
  mounted() {
    this.setUsers();
  },
  methods: {
    async setUsers() {
      const response = await axios.get("http://localhost:8000/api/users");
      this.users = response.data.sort(
        (a: { balance: number }, b: { balance: number }) =>
          b.balance - a.balance
      );
    },
  },
};
</script>

<template>
  <main class="flex flex-col space-y-8">
    <!-- Podium -->
    <div class="flex flex-col lg:flex-row bg-white rounded-lg shadow shadow-gray-300">
      <div
        v-for="user in podium"
        :key="user.name"
        class="w-full py-4 sm:py-8 lg:py-10 flex items-center justify-center bg-white first:bg-yellow-400
        first:rounded-t-lg last:rounded-b-lg
        lg:first:rounded-none lg:last:rounded-none
        lg:first:rounded-l-lg lg:last:rounded-r-lg"
      >
        <div class="basis-1/2 flex items-center space-x-16">
          <span class="w-full basis-1/3 text-5xl font-bold">{{
            podium.indexOf(user) + 1
          }}</span>
          <div class="w-full flex flex-col basis-2/3">
            <span class="font-semibold">{{ user.name }}</span>
            <span class="">{{ user.balance }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scoring -->
    <div class="px-4 py-4 flex flex-col space-y-2 items-center bg-white rounded-lg shadow shadow-gray-300">
      <div
        v-for="user in others"
        :key="user.name"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <span class="w-6">{{ others.indexOf(user) + 4 }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </div>
    </div>
  </main>
</template>
