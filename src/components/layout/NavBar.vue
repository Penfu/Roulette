<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import {
  CubeIcon,
  TrophyIcon,
  BanknotesIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

import Dropdown from "@/components/Dropdown.vue";

const auth = useAuthStore();
</script>

<template>
  <nav class="rounded-b-lg py-4 text-gray-700 bg-white shadow shadow-gray-300">
    <div class="px-4 flex flex-row justify-center items-center gap-4">

      <!-- Title -->
      <RouterLink to="/" class="flex justify-center items-center space-x-2 text-lg">
        <CubeIcon class="w-6 h-6" />
        <span class="hidden md:block text-lg font-bold">Roll</span>
      </RouterLink>

      <!-- Links -->
      <div class="grow w-full">
        <div class="px-4 w-full flex flex-row items-center space-x-4 border-l border-gray-300">
          <RouterLink to="/leaderboard" class="p-3 flex justify-center items-center text-lg hover:bg-gray-200 rounded">
            <TrophyIcon class="lg:mx-2 w-6 h-6" />
            <span class="hidden md:block grow font-medium">Leaderboard</span>
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center gap-8">
        <!-- Balance -->
        <label v-show="auth.isAuth"
          class="p-3 flex justify-center items-center gap-2 bg-white border border-gray-300 shadow-sm rounded">
          <BanknotesIcon class="h-6 w-6 text-green-500" />
          <span>{{ auth.user.balance }}</span>
        </label>

        <!-- User Profile Dropdown -->
        <Dropdown v-if="auth.isAuth">
          <template #trigger>
            <div class="p-3 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded">
              <UserIcon class="w-6 h-6" />
              <span class="hidden font-medium">{{ auth.user.name }}</span>
            </div>
          </template>
          <template #content>
            <div
              class="z-20 absolute right-0 mt-2 py-4 flex flex-col justify-end items-center transition-all transition-slowest duration-500 ease">              <div class="w-36 bg-white rounded-lg shadow shadow-gray-300 drop-shadow">
                <div class="m-2 flex flex-col">
                  <RouterLink :to="'/profile/' + auth.user.name" class="py-2 hover:bg-gray-200 rounded text-left">
                    <span class="ml-4">Profile</span>
                  </RouterLink>
                  <button @click="auth.logout" class="py-2 hover:bg-red-500 hover:text-white rounded text-left">
                    <span class="ml-4">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Dropdown>

        <!-- Login btn -->
        <RouterLink v-else to="/login"
          class="p-3 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded">
          <ArrowRightOnRectangleIcon class="w-6 h-6" />
          <span class="hidden font-medium">Login</span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
