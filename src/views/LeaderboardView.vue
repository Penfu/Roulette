<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useUser } from "@/composables/useUser";

type Rank = {
  name: string;
  balance: number;
  rank: number;
};

const { users, fetchUsers } = useUser();
const loading = ref(true);
const search = ref("");

const rankedUsers = ref<Rank[]>([]);
const podiumUsers = computed(() => rankedUsers.value.slice(0, 3));
const searchUsers = computed(() =>
  rankedUsers.value
    .slice(3)
    .filter((user) => user.name.toLowerCase().includes(search.value.toLowerCase()))
);

onMounted(async () => {
  await fetchUsers();

  rankedUsers.value = users.value
    .sort((a, b) => b.balance - a.balance)
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
      class="h-48 lg:h-32 grid grid-flow-row lg:grid-flow-col bg-bkg-1 rounded-lg overflow-hidden shadow shadow-gray-300 transition-all duration-300 ease-in-out"
    >
      <RouterLink
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: 500 * (podiumUsers.length - (index + 1)) },
        }"
        v-for="(user, index) in podiumUsers"
        :key="user.name"
        :to="`/profile/${user.name}`"
        class="group px-6 xs:px-8 sm:px-12 sm:first:col-span-2 lg:first:col-span-1 flex items-center justify-between sm:justify-center space-x-8 sm:space-x-16 bg-bkg-1 first:bg-green"
      >
        <span class="text-4xl md:text-6xl font-bold">{{ index + 1 }}</span>
        <div class="grow flex flex-col">
          <span class="font-semibold text-lg sm:text-xl sm:group-hover:text-3xl transform transition-all duration-300 ease-in-out">
            {{ user.name }}
          </span>
          <span>{{ user.balance }}</span>
        </div>
      </RouterLink>

      <div v-if="loading" class="bg-skeleton animate-pulse" />
    </div>

    <!-- Search bar -->
    <div class="flex items-center bg-bkg-1 rounded-lg shadow shadow-gray-300 border-2 border-gray-300 overflow-hidden">
      <input
        v-model="search"
        type="text"
        class="bg-bkg-1 rounded-none outline-none text-ellipsis border-none"
        placeholder="Search for a user..."
      />
      <span class="px-2 py-3 bg-gray-200 text-center">
        <span v-if="loading" class="text-xl animate-pulse">...</span>
        <span v-else class="text-lg font-semibold whitespace-nowrap">
          {{ searchUsers.length }} / {{ rankedUsers.length - podiumUsers.length }}
        </span>
      </span>
    </div>

    <!-- Ranking -->
    <div
      v-if="loading"
      class="h-full px-4 py-4 flex flex-col space-y-2 items-center bg-bkg-1 rounded-lg shadow shadow-gray-300 overflow-y-auto"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded animate-pulse"
      >
        <span class="w-6 h-5 bg-skeleton rounded-xl"></span>
        <div class="grow flex">
          <span class="w-32 h-5 bg-skeleton rounded-xl"></span>
        </div>
        <span class="w-24 h-5 bg-skeleton rounded-xl"></span>
      </div>
    </div>
    <div
      v-else
      class="h-full px-4 py-4 flex flex-col space-y-2 items-center bg-bkg-1 rounded-lg shadow shadow-gray-300 overflow-y-auto"
    >
      <RouterLink
        v-for="user in searchUsers"
        :key="user.rank"
        :to="`/profile/${user.name}`"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded-lg hover:bg-green-200 dark:hover:bg-green-600"
      >
        <span class="w-6">{{ user.rank }}</span>
        <span class="grow">{{ user.name }}</span>
        <span class="">{{ user.balance }}</span>
      </RouterLink>

      <div
        v-if="search && !searchUsers.length"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <p>No users found</p>
      </div>
    </div>
  </main>
</template>
