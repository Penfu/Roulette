<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";

const loading = ref(true);
const search = ref('');
const users = ref([] as { name: string; balance: number; rank: number }[]);

const podium = computed(() => users.value.slice(0, 3));

const filteredLeaderboard = computed(() => {
  return users.value
    .slice(3)
    .filter((user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase())
    );
});

onMounted(async () => {
  const response = await axios.get("http://localhost:8000/api/users");

  users.value = response.data
    .sort((a: any, b: any) => b.balance - a.balance)
    .map((user: any, index: number) => {
      return {
        name: user.name,
        balance: user.balance,
        rank: index + 1,
      };
    });

  loading.value = false;
});
</script>

<template>
  <main class="flex flex-col space-y-4">
    <!-- Podium -->
    <div
      class="h-64 lg:h-32 grid grid-flow-row lg:grid-flow-col bg-white rounded-lg overflow-hidden shadow shadow-gray-300 transition-all duration-300 ease-in-out "
    >
      <RouterLink
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 500 * (podium.length - (index + 1)) } }"
        v-for="(user, index) in podium"
        :key="user.name"
        :to="`/profile/${user.name}`"
        class="group px-12 sm:first:col-span-2 lg:first:col-span-1 flex items-center justify-center space-x-16 bg-white first:bg-yellow-400"
      >
          <span class="text-6xl font-bold">{{ index + 1}}</span>
          <div class="grow flex flex-col">
            <span class="font-semibold text-xl group-hover:text-3xl transform transition-all duration-300 ease-in-out">{{ user.name }}</span>
            <span>{{ user.balance }}</span>
        </div>
      </RouterLink>

      <div v-if="loading" class="grow bg-gray-500 rounded-xl animate-pulse" />
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
          {{ filteredLeaderboard.length }} / {{ users.length - podium.length }}
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
      <RouterLink
        v-for="user in filteredLeaderboard"
        :key="user.name"
        :to="`/profile/${user.name}`"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100  rounded"
      >
        <span class="w-6">{{ user.rank }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </RouterLink>

      <div
        v-if="search && !filteredLeaderboard.length"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <p>No users found</p>
      </div>
    </div>

  </main>
</template>
