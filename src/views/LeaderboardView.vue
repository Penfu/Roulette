<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import axios from "@/axios.config";

import type User from "@/interfaces/user";

const search = ref("");

const fetchUsers = (): Promise<User[]> => axios.get("/users").then((res) => res.data);

const { isPending, data: users } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetchUsers(),
});

const rankedUsers = computed(() =>
  users.value
    ?.slice()
    ?.sort((a: User, b: User) => b.balance - a.balance)
    ?.map((user, index: number) => {
      return {
        name: user.name,
        balance: user.balance,
        rank: index + 1,
      };
    })
);

const podiumUsers = computed(() => rankedUsers.value?.slice(0, 3));
const searchUsers = computed(() =>
  rankedUsers.value
    ?.slice(3)
    ?.filter((user) => user.name.toLowerCase().includes(search.value.toLowerCase()))
);
</script>

<template>
  <main class="flex flex-col space-y-4">
    <!-- Podium -->
    <div
      class="h-48 lg:h-32 grid grid-flow-row lg:grid-flow-col bg-bkg-1 rounded-lg overflow-hidden shadow shadow-gray-300 transition-all duration-300 ease-in-out"
    >
      <div v-if="isPending" class="bg-skeleton animate-pulse" />
      <RouterLink
        v-else
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: 500 * (podiumUsers!.length - user.rank) },
        }"
        v-for="user in podiumUsers"
        :key="user.name"
        :to="`/profile/${user.name}`"
        class="group px-6 xs:px-8 sm:px-12 sm:first:col-span-2 lg:first:col-span-1 flex items-center justify-between sm:justify-center space-x-8 sm:space-x-16 bg-bkg-1 first:bg-green"
      >
        <span class="text-4xl md:text-6xl font-bold">{{ user.rank }}</span>
        <div class="grow flex flex-col">
          <span
            class="font-semibold text-lg sm:text-xl sm:group-hover:text-3xl transform transition-all duration-300 ease-in-out"
          >
            {{ user.name }}
          </span>
          <span>{{ user.balance }}</span>
        </div>
      </RouterLink>
    </div>

    <!-- Search bar -->
    <div
      class="flex items-center bg-bkg-1 rounded-lg shadow shadow-gray-300 border-3 border-gray-300 overflow-hidden"
    >
      <input
        v-model="search"
        type="text"
        class="bg-bkg-1 rounded-none outline-none text-ellipsis border-none"
        placeholder="Search for a user..."
      />
      <span class="px-2 py-3 bg-gray-200 text-center">
        <span v-if="isPending" class="text-xl animate-pulse">...</span>
        <span v-else class="text-lg font-semibold whitespace-nowrap">
          {{ searchUsers!.length }} / {{ users!.length - podiumUsers!.length }}
        </span>
      </span>
    </div>

    <!-- Ranking -->
    <div
      v-if="isPending"
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
        v-if="search && searchUsers!.length === 0"
        class="w-full px-4 py-2 sm:py-4 flex space-x-8 even:bg-gray-100 rounded"
      >
        <p>No users found</p>
      </div>
    </div>
  </main>
</template>
