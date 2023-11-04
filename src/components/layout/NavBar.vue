<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import { CubeIcon, TrophyIcon, BanknotesIcon } from "@heroicons/vue/24/outline";

import DarkModeSwitch from "@/components/layout/DarkModeSwitch.vue";
import DropdownMenu from "@/components/layout/DropdownMenu.vue";

const auth = useAuthStore();
</script>

<template>
  <div>
    <nav
      class="xs:rounded-b-lg px-4 py-2 flex flex-row justify-center items-center gap-4 text-gray-700 bg-bkg-1 shadow shadow-gray-300"
    >
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

      <!-- User Info / Actions -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Balance -->
        <label v-show="auth.isAuth" class="hidden sm:flex p-3 justify-center items-center gap-2">
          <BanknotesIcon class="h-8 w-8 text-green" />
          <span class="text-xl">{{ auth.user.balance }}</span>
        </label>

        <DarkModeSwitch />

        <!-- User Profile Dropdown -->
        <DropdownMenu v-if="auth.isAuth" />

        <!-- Login btn -->
        <RouterLink v-else to="/login" class="btn text-base bg-gray-200 hover:bg-gray-300">
          Login
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
