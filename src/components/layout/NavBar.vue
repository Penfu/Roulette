<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import { CubeIcon, TrophyIcon, BanknotesIcon, UserIcon } from "@heroicons/vue/24/outline";

import Dropdown from "@/components/Dropdown.vue";
import DarkModeSwitch from "@/components/DarkModeSwitch.vue";

const auth = useAuthStore();
</script>

<template>
  <nav class="rounded-b-lg py-2 text-gray-700 bg-bkg-1 shadow shadow-gray-300">
    <div class="px-4 flex flex-row justify-center items-center gap-4">
      <!-- Title -->
      <RouterLink to="/" class="flex justify-center items-center space-x-2 text-lg">
        <CubeIcon class="w-6 h-6" />
        <span class="hidden md:block text-2xl font-bold uppercase">Roll</span>
      </RouterLink>

      <!-- Links -->
      <div class="grow w-full">
        <div class="px-4 w-full flex flex-row items-center space-x-4 border-l border-gray-300">
          <RouterLink
            to="/leaderboard"
            class="p-3 flex justify-center items-center space-x-2 text-lg hover:bg-gray-200 rounded"
          >
            <TrophyIcon class="w-6 h-6" />
            <span class="hidden md:block text-xl font-medium">Leaderboard</span>
          </RouterLink>
        </div>
      </div>

      <div class="flex items-center gap-2 md:gap-4">
        <!-- Balance -->
        <label v-show="auth.isAuth" class="hidden sm:flex p-3 justify-center items-center gap-2">
          <BanknotesIcon class="h-8 w-8 text-green" />
          <span class="text-xl">{{ auth.user.balance }}</span>
        </label>

        <DarkModeSwitch />

        <!-- User Profile Dropdown -->
        <Dropdown v-if="auth.isAuth">
          <template #trigger>
            <div class="btn p-2 flex items-center justify-center bg-gray-200 hover:bg-gray-300">
              <UserIcon class="w-6 h-6" />
            </div>
          </template>
          <template #content>
            <div
              class="z-20 absolute right-0 mt-2 py-4 flex flex-col justify-end items-center transition-all transition-slowest duration-500 ease"
            >
              <div
                class="w-36 bg-bkg-1 dark:bg-gray-200 rounded-lg shadow shadow-gray-300 drop-shadow"
              >
                <div class="m-2 flex flex-col">
                  <RouterLink
                    :to="'/profile/' + auth.user.name"
                    class="py-2 hover:bg-gray-100 rounded text-left"
                  >
                    <span class="ml-4">{{ auth.user.name }}</span>
                  </RouterLink>
                  <RouterLink to="/settings" class="py-2 hover:bg-gray-100 rounded text-left">
                    <span class="ml-4">Settings</span>
                  </RouterLink>

                  <button
                    @click="auth.logout"
                    class="py-2 hover:bg-red hover:text-white rounded text-left"
                  >
                    <span class="ml-4">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Dropdown>

        <!-- Login btn -->
        <RouterLink v-else to="/login" class="btn py-2 bg-gray-200 hover:bg-gray-300">
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
