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
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <!-- Podium -->
    <div class="flex flex-col lg:flex-row">
      <div
        v-for="user in podium"
        :key="user.name"
        class="w-full py-10 flex items-center justify-center bg-gray-100 first:bg-yellow-400"
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
    <div class="mt-10 mx-4 flex flex-col space-y-2 items-center">
      <div
        v-for="user in others"
        :key="user.name"
        class="w-full flex space-x-8"
      >
        <span class="w-6">{{ others.indexOf(user) + 4 }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </div>
    </div>
  </main>
</template>
